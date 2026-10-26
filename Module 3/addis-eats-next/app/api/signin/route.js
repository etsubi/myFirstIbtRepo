import { NextResponse } from "next/server";
import { createSessionToken } from "../../../lib/session";

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const { email, password } = body;

  if (email !== "user@example.com" || password !== "password123") {
    return NextResponse.json(
      { message: "Invalid email or password." },
      { status: 401 },
    );
  }

  const session = {
    userId: "user-1",
    email: "user@example.com",
    role: "customer",
  };

  const token = createSessionToken(session);

  const response = NextResponse.json({
    message: "Sign-in successful.",
  });

  response.cookies.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
