import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle URL-encoded "à propos" (%C3%A0%20propos)
  if (pathname.includes('%C3%A0%20propos') || pathname.includes('%C3%A0-propos')) {
    return NextResponse.redirect(new URL('/a-propos', request.url))
  }

  // Handle URL-encoded "faq" if needed
  if (pathname.includes('%C3%A0')) {
    const decoded = pathname.replace(/%C3%A0/g, 'a')
    return NextResponse.redirect(new URL(decoded, request.url))
  }

  return NextResponse.next()
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
}
