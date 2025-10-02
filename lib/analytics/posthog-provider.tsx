'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect, useState } from 'react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Only initialize on client side
    if (typeof window === 'undefined') return

    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.posthog.com'

    if (!key) {
      console.error('[PostHog] Missing NEXT_PUBLIC_POSTHOG_KEY environment variable')
      return
    }

    // Initialize PostHog with proper configuration
    posthog.init(key, {
      api_host: host,

      // LAUNCH Framework optimizations
      autocapture: true,
      capture_pageview: false, // We'll manually capture with variant data
      capture_pageleave: true,

      // Privacy compliance
      respect_dnt: true,

      // Performance
      loaded: (posthogInstance) => {
        console.log('[PostHog] Successfully initialized')

        // Set LAUNCH Framework properties
        const variant = getCookie('localsphere_variant')
        if (variant) {
          posthogInstance.register({
            localsphere_variant: variant,
            validation_test: true,
            test_start_date: new Date().toISOString().split('T')[0]
          })
          console.log('[PostHog] Registered variant:', variant)
        }

        setIsInitialized(true)
      },

      // Debug mode in development
      debug: process.env.NODE_ENV === 'development',
    })

    // Ensure events are flushed on page unload
    const handleBeforeUnload = () => {
      console.log('[PostHog] Flushing events before unload')
      posthog.capture('$pageleave')
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  // Helper function to get cookies
  function getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null

    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null
    }
    return null
  }

  // Use official PostHogProvider to make posthog available via usePostHog hook
  return (
    <PHProvider client={posthog}>
      {children}
    </PHProvider>
  )
}