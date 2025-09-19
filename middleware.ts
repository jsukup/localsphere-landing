import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  
  // Handle root path routing to A/B test variants
  if (url.pathname === '/') {
    // Get or set variant cookie
    let variant = request.cookies.get('localsphere_variant')?.value
    
    if (!variant) {
      // Thompson Sampling-inspired variant assignment
      // For initial testing, use equal distribution
      const variants = [
        'timezone-freedom',
        'information-findability', 
        'unified-productivity'
      ]
      
      variant = variants[Math.floor(Math.random() * variants.length)]
      
      // Set cookie for returning users
      const response = NextResponse.redirect(new URL(`/validate/${variant}/variant-a`, request.url))
      response.cookies.set('localsphere_variant', variant, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
      })
      
      // Track variant assignment
      response.cookies.set('localsphere_session_id', 
        crypto.randomUUID(), 
        {
          maxAge: 60 * 60 * 24, // 24 hours
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production'
        }
      )
      
      return response
    } else {
      // Returning user - redirect to their assigned variant
      return NextResponse.redirect(new URL(`/validate/${variant}/variant-a`, request.url))
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