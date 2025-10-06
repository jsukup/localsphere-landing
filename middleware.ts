import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()

  // Handle root path routing to A/B test variants
  if (url.pathname === '/') {
    // Get or set variant cookie
    let variant = request.cookies.get('localsphere_variant')?.value
    let isNewUser = false

    if (!variant) {
      isNewUser = true
      // Thompson Sampling-inspired variant assignment
      // For initial testing, use equal distribution
      const variants = [
        'timezone-freedom',
        'information-findability',
        'unified-productivity'
      ]

      variant = variants[Math.floor(Math.random() * variants.length)]

      // Create response with redirect, preserving UTM parameters and other query strings
      const redirectUrl = new URL(`/validate/${variant}/variant-a`, request.url)
      // Preserve all query parameters (UTM tracking, etc.)
      url.searchParams.forEach((value, key) => {
        redirectUrl.searchParams.set(key, value)
      })
      const response = NextResponse.redirect(redirectUrl)

      // Set variant cookie for returning users (httpOnly=false so client JS can read it)
      response.cookies.set('localsphere_variant', variant, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        httpOnly: false, // Allow client-side PostHog to read this
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      })

      // Generate and set session ID
      const sessionId = crypto.randomUUID()
      response.cookies.set('localsphere_session_id', sessionId, {
        maxAge: 60 * 60 * 24, // 24 hours
        httpOnly: false, // Allow client-side PostHog to read this
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      })

      // Set flag to indicate this is a new user (for PostHog tracking)
      response.cookies.set('localsphere_new_user', 'true', {
        maxAge: 10, // Short-lived, just for the next page load
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      })

      return response
    } else {
      // Returning user - redirect to their assigned variant, preserving UTM parameters
      const redirectUrl = new URL(`/validate/${variant}/variant-a`, request.url)
      // Preserve all query parameters (UTM tracking, etc.)
      url.searchParams.forEach((value, key) => {
        redirectUrl.searchParams.set(key, value)
      })
      return NextResponse.redirect(redirectUrl)
    }
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
     * - validate (already specific variant paths)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|validate).*)',
  ],
}