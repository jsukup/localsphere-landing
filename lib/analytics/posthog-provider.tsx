'use client'

import { PostHogProvider } from 'posthog-js/react'
import { ReactNode } from 'react'

export function PHProvider({ children }: { children: ReactNode }) {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.posthog.com'

  if (!posthogKey) {
    console.error('[PostHog] Missing NEXT_PUBLIC_POSTHOG_KEY environment variable')
    return <>{children}</>
  }

  return (
    <PostHogProvider
      apiKey={posthogKey}
      options={{
        api_host: posthogHost,
        person_profiles: 'identified_only',

        // LAUNCH Framework optimizations
        autocapture: true,
        capture_pageview: false, // Manual control for variant tracking
        capture_pageleave: true,

        // Privacy compliance
        respect_dnt: true,

        // Debug mode in development
        debug: process.env.NODE_ENV === 'development',

        // Initialization callback
        loaded: (posthog) => {
          console.log('[PostHog] Successfully initialized via official provider')
          if (process.env.NODE_ENV === 'development') {
            posthog.debug()
          }
        }
      }}
    >
      {children}
    </PostHogProvider>
  )
}
