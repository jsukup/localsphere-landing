// LAUNCH Framework behavioral tracking for fake door testing
// NOTE: This file is deprecated. Use usePostHog() hook directly in components for all tracking.
// See: lib/analytics/posthog-provider.tsx for PostHog initialization
// See validation pages for examples of usePostHog() usage

export interface LaunchTracker {
  trackPageLoad: (variant: string, source: string, utmParams: Record<string, string>) => void
  trackSectionEngagement: (variant: string, section: string, timeSpentMs: number) => void
  trackCTAInteraction: (variant: string, ctaId: string, hoverTimeMs: number, clicked: boolean) => void
  trackFormEngagement: (variant: string, field: string, action: 'focus' | 'input' | 'blur' | 'submit') => void
  trackExitIntent: (variant: string, reason?: string) => void
  trackConversion: (variant: string, email: string, source: string) => void
}

export class LaunchFrameworkTracker implements LaunchTracker {
  constructor(private variant: string, private testType: string = 'fake-door') {
    console.warn('[LaunchFrameworkTracker] Deprecated - use usePostHog() hook instead')
  }

  trackPageLoad() {
    console.warn('[LaunchFrameworkTracker] Deprecated - use posthog.capture() instead')
  }

  trackSectionEngagement() {
    console.warn('[LaunchFrameworkTracker] Deprecated - use posthog.capture() instead')
  }

  trackCTAInteraction() {
    console.warn('[LaunchFrameworkTracker] Deprecated - use posthog.capture() instead')
  }

  trackFormEngagement() {
    console.warn('[LaunchFrameworkTracker] Deprecated - use posthog.capture() instead')
  }

  trackExitIntent() {
    console.warn('[LaunchFrameworkTracker] Deprecated - use posthog.capture() instead')
  }

  trackConversion() {
    console.warn('[LaunchFrameworkTracker] Deprecated - use posthog.capture() instead')
  }
}
