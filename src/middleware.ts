import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Supported locales (for dashboard route handling)
const SUPPORTED_LOCALES = ['en', 'fr', 'es', 'de', 'zh', 'ja', 'pt', 'ar']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle URL-encoded "à propos" (%C3%A0%20propos)
  if (pathname.includes('%C3%A0%20propos') || pathname.includes('%C3%A0-propos')) {
    return NextResponse.redirect(new URL('/a-propos', request.url))
  }

  // Handle URL-encoded characters
  if (pathname.includes('%C3%A0')) {
    const decoded = pathname.replace(/%C3%A0/g, 'a')
    return NextResponse.redirect(new URL(decoded, request.url))
  }

  // Check if pathname already has a locale prefix
  const pathnameHasLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    // Remove locale prefix for dashboard routes
    const withoutLocale = pathname.replace(/^\/(en|fr|es|de|zh|ja|pt|ar)/, '')
    if (withoutLocale.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL(withoutLocale, request.url))
    }
    return NextResponse.next()
  }

  // Note: Locale is handled client-side via I18nProvider
  // No server-side redirects needed

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
