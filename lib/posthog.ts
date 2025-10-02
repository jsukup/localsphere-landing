// PostHog helper utilities for LocalSphere validation testing - LAUNCH Framework
// Note: PostHog initialization is handled by PostHogProvider in lib/analytics/posthog-provider.tsx
// These are just helper functions for common tracking patterns

// Helper function to get cookies (client-side only)
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null

  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null
  }
  return null
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

export function getEngagementLevel(seconds: number): string {
  if (seconds < 30) return 'bounce_risk'
  if (seconds < 60) return 'low_engagement'
  if (seconds < 120) return 'medium_engagement'
  if (seconds < 300) return 'high_engagement'
  return 'very_high_engagement'
}
