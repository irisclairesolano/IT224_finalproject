// app/middleware.js (or wherever you have your middleware)
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('next-auth.token'); // Check for session token

  // If the user is not authenticated and is not on the sign-in or API page
  if (!token && !req.url.includes('/auth/signin') && !req.url.includes('/api')) {
    // Redirect to the sign-in page
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  // Allow the request to go through if authenticated or if it's a sign-in or API request
  return NextResponse.next();
}
