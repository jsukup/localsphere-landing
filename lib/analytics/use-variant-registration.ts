'use client'

import { useEffect } from 'react'
import { usePostHog } from 'posthog-js/react'

/**
 * Hook to register variant properties with PostHog for LAUNCH Framework tracking.
 * Should be called once per user session to set super properties.
 */
export function useVariantRegistration() {
  const posthog = usePostHog()

  useEffect(() => {
    if (!posthog) return

    const variant = getCookie('localsphere_variant')
    if (variant) {
      posthog.register({
        localsphere_variant: variant,
        validation_test: true,
        test_start_date: new Date().toISOString().split('T')[0]
      })
      console.log('[PostHog] Registered variant super properties:', variant)
    }
  }, [posthog])
}

/**
 * Helper function to get cookie value
 */
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null

  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null
  }
  return null
}
