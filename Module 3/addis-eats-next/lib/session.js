import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

function getSecret() {
  const secret = process.env.SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "SESSION_SECRET must be set to a secret of at least 32 characters.",
    );
  }

  return secret;
}

export function createSessionToken(session) {
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");

  const signature = createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");

  return `${payload}.${signature}`;
}

export function verifySessionToken(token) {
  if (!token || typeof token !== "string") {
    return null;
  }

  const parts = token.split(".");

  if (parts.length !== 2) {
    return null;
  }

  const [payload, signature] = parts;

  try {
    const expectedSignature = createHmac("sha256", getSecret())
      .update(payload)
      .digest();

    const actualSignature = Buffer.from(signature, "base64url");

    if (
      actualSignature.length !== expectedSignature.length ||
      !timingSafeEqual(actualSignature, expectedSignature)
    ) {
      return null;
    }

    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    );

    if (
      !session ||
      typeof session.userId !== "string" ||
      typeof session.email !== "string" ||
      typeof session.role !== "string"
    ) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  if (!sessionCookie) {
    return null;
  }

  return verifySessionToken(sessionCookie.value);
}
