// middleware.ts (or .js)

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token"); // your auth token cookie

  // List of protected paths
  const protectedPaths = ["/dashboard", "/profile", "/settings"];

  if (
    protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path)) &&
    !token
  ) {
    // Redirect to login if no token found
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Continue if authenticated or not a protected path
  return NextResponse.next();
}

// Apply middleware only for protected routes or all (see config)
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*"],
};
