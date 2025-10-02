// PostHog configuration for LocalSphere validation testing - LAUNCH Framework Implementation
import posthog from 'posthog-js'

let posthogInstance: typeof posthog | null = null

export function initPostHog() {
  if (typeof window === 'undefined') return null

  if (!posthogInstance && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.posthog.com',

      // LAUNCH Framework optimizations - session recording enabled

      // Behavioral tracking for fake door testing
      autocapture: true,

      // Privacy compliance
      respect_dnt: true,
      capture_pageview: true,
      capture_pageleave: true,

      loaded: (posthog) => {
        // Set LAUNCH Framework properties
        const variant = getCookie('localsphere_variant')
        if (variant) {
          posthog.register({
            localsphere_variant: variant,
            validation_test: true,
            test_start_date: new Date().toISOString().split('T')[0]
          })
        }
      }
    })

    posthogInstance = posthog
  }

  return posthogInstance
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null

  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null
  }
  return null
}

// Validation-specific tracking functions
export function trackValidationEvent(
  event: string,
  properties: Record<string, unknown> = {}
) {
  const posthog = initPostHog()
  if (!posthog) return

  const variant = getCookie('localsphere_variant')
  const sessionId = getCookie('localsphere_session_id')

  posthog.capture(event, {
    ...properties,
    localsphere_variant: variant,
    localsphere_session_id: sessionId,
    validation_test: true,
    timestamp: new Date().toISOString()
  })
}

// LAUNCH Framework specific metrics
export function trackDemoRequest(variant: string, source: string = 'hero') {
  trackValidationEvent('fake_door_cta_interaction', {
    variant,
    source,
    conversion_type: 'primary_goal',
    launch_metric: 'cta_conversion',
    cta_type: 'demo_request'
  })
}

export function trackEmailCapture(variant: string, email?: string) {
  trackValidationEvent('fake_door_conversion', {
    variant,
    conversion_type: 'secondary_goal',
    launch_metric: 'email_signup',
    has_email: !!email
  })
}

export function trackPricingEngagement(
  variant: string,
  tier: string,
  action: 'view' | 'hover' | 'click'
) {
  trackValidationEvent('pricing_engagement', {
    variant,
    tier,
    action,
    launch_metric: 'pricing_interest',
    section: 'pricing'
  })
}

export function trackFeatureEngagement(
  variant: string,
  feature: string,
  action: 'view' | 'hover' | 'click'
) {
  trackValidationEvent('feature_engagement', {
    variant,
    feature,
    action,
    launch_metric: 'feature_interest',
    section: 'features'
  })
}

export function trackScrollDepth(variant: string, depth: number) {
  // Only track meaningful scroll milestones
  const milestones = [25, 50, 75, 100]
  if (milestones.includes(depth)) {
    trackValidationEvent('fake_door_section_engagement', {
      variant,
      depth_percentage: depth,
      launch_metric: 'engagement_depth',
      engagement_type: 'scroll'
    })
  }
}

export function trackTimeOnPage(variant: string, seconds: number) {
  // Track time milestones
  const milestones = [30, 60, 120, 300]
  if (milestones.includes(seconds)) {
    trackValidationEvent('time_milestone', {
      variant,
      seconds,
      launch_metric: 'time_engagement',
      engagement_level: getEngagementLevel(seconds)
    })
  }
}

function getEngagementLevel(seconds: number): string {
  if (seconds < 30) return 'bounce_risk'
  if (seconds < 60) return 'low_engagement'
  if (seconds < 120) return 'medium_engagement'
  if (seconds < 300) return 'high_engagement'
  return 'very_high_engagement'
}

// Customer Demand Score calculation helpers
export function calculateCDS(sessionData: Record<string, unknown>) {
  let score = 0

  // Engagement Score (25 points max)
  if (sessionData.ctr_from_ads) score += Math.min(Number(sessionData.ctr_from_ads) * 100, 5)
  if (sessionData.time_on_site) score += Math.min(Number(sessionData.time_on_site) / 60, 5) // max 5 for 5+ minutes
  if (sessionData.scroll_depth) score += Math.min(Number(sessionData.scroll_depth) / 20, 5) // max 5 for 100%
  if (sessionData.pages_per_session) score += Math.min(Number(sessionData.pages_per_session) * 2.5, 5)
  if (sessionData.return_visitor) score += 5

  // Conversion Score (35 points max)
  if (sessionData.cta_clicked) score += 10
  if (sessionData.email_captured) score += 10
  if (sessionData.demo_requested) score += 10
  if (sessionData.pricing_engaged) score += 5

  // Quality indicators would be added from interview data
  // Economic indicators would be calculated from ad spend vs conversions

  return Math.min(score, 100)
}

export { posthogInstance as posthog }
