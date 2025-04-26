

import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"


export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  console.log("Middleware token:", token);

  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");

  if (isAuthPage) {
    return NextResponse.next(); // allow access to auth pages
  }

  if (!token) {
    const loginUrl = new URL("/auth/signin", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|auth|_next|favicon.ico).*)",
  ],
};


