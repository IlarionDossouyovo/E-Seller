import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Country to locale mapping
const countryToLocale: Record<string, string> = {
  // Europe
  FR: 'fr',
  BE: 'fr',
  CH: 'fr',
  LU: 'fr',
  MC: 'fr',
  CA: 'fr',
  // English speaking countries
  US: 'en',
  GB: 'en',
  CA: 'en',
  AU: 'en',
  NZ: 'en',
  IE: 'en',
  ZA: 'en',
  // Spain
  ES: 'es',
  // Germany
  DE: 'de',
  AT: 'de',
  CH: 'de',
  // China
  CN: 'zh',
  HK: 'zh',
  TW: 'zh',
  // Japan
  JP: 'ja',
  // Portugal
  PT: 'pt',
  BR: 'pt',
  // Arabic countries
  SA: 'ar',
  AE: 'ar',
  EG: 'ar',
  MA: 'ar',
  DZ: 'ar',
  TN: 'ar',
  LY: 'ar',
  JO: 'ar',
  LB: 'ar',
  KW: 'ar',
  QA: 'ar',
  BH: 'ar',
  OM: 'ar',
}

// Default locale
const DEFAULT_LOCALE = 'fr'
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

  // Get country from headers (Vercel, Cloudflare, etc.)
  const country = request.geo?.country || 
    request.headers.get('x-vercel-ip-country') ||
    request.headers.get('cf-ipcountry') ||
    request.headers.get('cloudfront-viewer-country') ||
    'FR' // Default to France

  // Get locale from country
  const locale = countryToLocale[country] || DEFAULT_LOCALE

  // Redirect to locale-prefixed path
  // Skip for static files, API routes, and dashboard
  if (
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/_next') &&
    !pathname.startsWith('/dashboard') &&
    !pathname.includes('.')
  ) {
    const newUrl = new URL(`/${locale}${pathname}`, request.url)
    return NextResponse.redirect(newUrl)
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
