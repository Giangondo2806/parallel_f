import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check for token in cookies (main source of truth for SSR)
  const token = request.cookies.get('auth-token')?.value;
  
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.') // static files like .css, .js, .ico, etc.
  ) {
    return NextResponse.next();
  }

  // Only handle login and root redirects - let AuthGuard handle dashboard protection
  if (pathname === '/login') {
    // If user has token in cookie, redirect to dashboard
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // Root path redirect
  if (pathname === '/') {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // For all other routes (including /dashboard), let the page handle authentication
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
