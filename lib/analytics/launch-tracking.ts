// LAUNCH Framework behavioral tracking for fake door testing
import { trackValidationEvent, trackDemoRequest, trackEmailCapture, trackPricingEngagement, trackFeatureEngagement, trackScrollDepth, trackTimeOnPage } from '@/lib/posthog'

export interface LaunchTracker {
  trackPageLoad: (variant: string, source: string, utmParams: Record<string, string>) => void
  trackSectionEngagement: (variant: string, section: string, timeSpentMs: number) => void
  trackCTAInteraction: (variant: string, ctaId: string, hoverTimeMs: number, clicked: boolean) => void
  trackFormEngagement: (variant: string, field: string, action: 'focus' | 'input' | 'blur' | 'submit') => void
  trackExitIntent: (variant: string, reason?: string) => void
  trackConversion: (variant: string, email: string, source: string) => void
}

export class LaunchFrameworkTracker implements LaunchTracker {
  constructor(private variant: string, private testType: string = 'fake-door') {}

  trackPageLoad(variant: string, source: string, utmParams: Record<string, string>) {
    trackValidationEvent('fake_door_page_load', {
      variant,
      test_type: this.testType,
      source,
      utm_source: utmParams.utm_source,
      utm_medium: utmParams.utm_medium,
      utm_campaign: utmParams.utm_campaign,
      timestamp: Date.now()
    })
  }

  trackSectionEngagement(variant: string, section: string, timeSpentMs: number) {
    trackValidationEvent('fake_door_section_engagement', {
      variant,
      section,
      time_spent_ms: timeSpentMs,
      engaged: timeSpentMs > 3000, // >3 seconds = engaged
      launch_metric: 'engagement_depth'
    })
  }

  trackCTAInteraction(variant: string, ctaId: string, hoverTimeMs: number, clicked: boolean) {
    trackValidationEvent('fake_door_cta_interaction', {
      variant,
      cta_id: ctaId,
      hover_time_ms: hoverTimeMs,
      clicked,
      hesitation: hoverTimeMs > 2000, // >2 seconds hover = hesitation
      launch_metric: 'cta_conversion'
    })
  }

  trackFormEngagement(variant: string, field: string, action: 'focus' | 'input' | 'blur' | 'submit') {
    trackValidationEvent('fake_door_form_engagement', {
      variant,
      field,
      action,
      timestamp: Date.now(),
      launch_metric: 'form_progression'
    })
  }

  trackExitIntent(variant: string, reason?: string) {
    trackValidationEvent('fake_door_exit_intent', {
      variant,
      reason,
      time_on_page: Date.now() - (performance.timeOrigin + performance.now()),
      launch_metric: 'exit_analysis'
    })
  }

  trackConversion(variant: string, email: string, source: string) {
    // Primary conversion goal
    trackEmailCapture(variant, email)
    
    // Additional conversion context
    trackValidationEvent('fake_door_conversion', {
      variant,
      action: 'email_capture',
      source,
      timestamp: Date.now(),
      launch_metric: 'primary_conversion'
    })
  }

  // Convenience methods for common LAUNCH Framework events
  trackDemoRequestClick(variant: string, source: string = 'hero') {
    trackDemoRequest(variant, source)
  }

  trackPricingView(variant: string, tier: string, action: 'view' | 'hover' | 'click') {
    trackPricingEngagement(variant, tier, action)
  }

  trackFeatureClick(variant: string, feature: string, action: 'view' | 'hover' | 'click') {
    trackFeatureEngagement(variant, feature, action)
  }

  trackScrollMilestone(variant: string, depth: number) {
    trackScrollDepth(variant, depth)
  }

  trackTimeMilestone(variant: string, seconds: number) {
    trackTimeOnPage(variant, seconds)
  }
}

// Global tracker instance
let globalTracker: LaunchFrameworkTracker | null = null

export function initializeLaunchTracker(variant: string, testType: string = 'fake-door') {
  globalTracker = new LaunchFrameworkTracker(variant, testType)
  return globalTracker
}

export function getLaunchTracker(): LaunchFrameworkTracker | null {
  return globalTracker
}

// React hook for components
export function useLaunchTracking(variant: string) {
  if (!globalTracker) {
    globalTracker = new LaunchFrameworkTracker(variant)
  }
  return globalTracker
}