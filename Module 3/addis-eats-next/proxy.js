import { NextResponse } from "next/server";

export function proxy(request) {
  const session = request.cookies.get("session");
  const pathname = request.nextUrl.pathname;

  const protectedRoutes = ["/checkout", "/orders"];

  const isProtectedRoute = protectedRoutes.some((route) => {
    return pathname === route || pathname.startsWith(`${route}/`);
  });

  if (isProtectedRoute && !session) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("next", pathname);

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout/:path*", "/orders/:path*"],
};
