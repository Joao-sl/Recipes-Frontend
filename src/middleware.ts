import { NextRequest, NextResponse } from 'next/server';
import { REFRESH_COOKIE } from './lib/auth/manage-user-session';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const refreshToken = request.cookies.get(REFRESH_COOKIE);
  const isAuthenticated = Boolean(refreshToken);
  const isAuthPage = Boolean(path === '/login' || path === '/register');

  if (isAuthenticated && isAuthPage) {
    const homeURL = new URL('/', request.url);
    return NextResponse.redirect(homeURL);
  }

  if (!isAuthenticated && !isAuthPage) {
    const loginURL = new URL('/login', request.url);
    loginURL.searchParams.set('next', path);
    return NextResponse.redirect(loginURL);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login/:path*', '/register/:path*', '/profile/:path*'],
};
