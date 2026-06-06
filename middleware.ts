import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Paths requiring global authentication
  const isProtectedPath = pathname.startsWith('/dashboard') || 
                          pathname.startsWith('/builder') || 
                          pathname.startsWith('/create-invitation') || 
                          pathname.startsWith('/invitations');

  // Paths requiring Admin privileges
  const isAdminPath = pathname.startsWith('/admin');

  // Attempt to read token from standard auth cookie
  const token = request.cookies.get('auth_token')?.value;

  if (isProtectedPath || isAdminPath) {
    if (!token) {
      // Redirect to login page if token is missing
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Match against protected routing zones
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/builder/:path*',
    '/create-invitation/:path*',
    '/invitations/:path*',
    '/admin/:path*'
  ],
};
