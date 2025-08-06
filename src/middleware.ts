import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: any) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  // Refresh session if expired - required for Server Components
  const { data: { session } } = await supabase.auth.getSession();

  // Define public and auth routes
  const isAuthRoute = request.nextUrl.pathname.startsWith('/auth');
  const isApiRoute = request.nextUrl.pathname.startsWith('/api');
  const isPublicFile = /\.(.*)$/.test(request.nextUrl.pathname);
  const isAuthCallback = request.nextUrl.pathname.startsWith('/api/auth/callback');

  // Allow public files and API routes
  if (isPublicFile || isApiRoute || isAuthCallback) {
    return response;
  }

  // Redirect to login if not authenticated and trying to access protected route
  if (!session && !isAuthRoute) {
    const redirectUrl = new URL('/auth/login', request.url);
    redirectUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Redirect to dashboard if authenticated and trying to access auth route
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Set user role in headers for RLS policies
  if (session) {
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (userData) {
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-role', userData.role);
      response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/auth/callback).*)',
  ],
};
