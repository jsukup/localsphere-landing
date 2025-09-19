// Analytics configuration for LocalSphere validation testing
// This will integrate with PostHog for behavioral tracking

export interface AnalyticsEvent {
  event: string
  properties?: Record<string, unknown>
  timestamp?: Date
}

export interface ValidationMetrics {
  sessionId: string
  variant: string
  source: string
  timestamp: Date
  events: AnalyticsEvent[]
}

class Analytics {
  private sessionId: string | null = null
  private variant: string | null = null
  private events: AnalyticsEvent[] = []

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeSession()
    }
  }

  private initializeSession() {
    // Get session ID and variant from cookies or generate new ones
    this.sessionId = this.getCookie('localsphere_session_id') || crypto.randomUUID()
    this.variant = this.getCookie('localsphere_variant') || 'unknown'
    
    // Track page view
    this.track('page_view', {
      variant: this.variant,
      url: window.location.href,
      referrer: document.referrer,
      user_agent: navigator.userAgent
    })
  }

  private getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null
    
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null
    }
    return null
  }

  track(event: string, properties: Record<string, unknown> = {}) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties: {
        ...properties,
        session_id: this.sessionId,
        variant: this.variant,
        timestamp: new Date().toISOString()
      },
      timestamp: new Date()
    }

    this.events.push(analyticsEvent)

    // Log to console for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', analyticsEvent)
    }

    // In production, this would send to PostHog
    // posthog.capture(event, analyticsEvent.properties)
  }

  // Track specific validation events
  trackDemoRequest(variant: string, source: string = 'hero') {
    this.track('demo_request', {
      variant,
      source,
      conversion_type: 'primary_goal'
    })
  }

  trackEmailCapture(variant: string, source: string = 'form') {
    this.track('email_capture', {
      variant,
      source,
      conversion_type: 'secondary_goal'
    })
  }

  trackPricingInteraction(variant: string, tier: string, action: string) {
    this.track('pricing_interaction', {
      variant,
      tier,
      action, // 'view', 'click', 'hover'
      section: 'pricing'
    })
  }

  trackFeatureInteraction(variant: string, feature: string, action: string) {
    this.track('feature_interaction', {
      variant,
      feature,
      action, // 'view', 'click', 'hover'
      section: 'features'
    })
  }

  trackScrollDepth(variant: string, depth: number) {
    this.track('scroll_depth', {
      variant,
      depth_percentage: depth,
      section: this.getCurrentSection()
    })
  }

  trackTimeOnPage(variant: string, seconds: number) {
    this.track('time_on_page', {
      variant,
      seconds,
      engagement_level: this.getEngagementLevel(seconds)
    })
  }

  private getCurrentSection(): string {
    // Simple implementation - could be enhanced with intersection observer
    const scrollY = window.scrollY
    const windowHeight = window.innerHeight
    
    if (scrollY < windowHeight * 0.5) return 'hero'
    if (scrollY < windowHeight * 1.5) return 'problem'
    if (scrollY < windowHeight * 2.5) return 'solution'
    if (scrollY < windowHeight * 3.5) return 'features'
    if (scrollY < windowHeight * 4.5) return 'pricing'
    return 'footer'
  }

  private getEngagementLevel(seconds: number): string {
    if (seconds < 30) return 'low'
    if (seconds < 120) return 'medium'
    if (seconds < 300) return 'high'
    return 'very_high'
  }

  // Get session summary for validation analysis
  getSessionSummary(): ValidationMetrics {
    return {
      sessionId: this.sessionId || 'unknown',
      variant: this.variant || 'unknown',
      source: document.referrer,
      timestamp: new Date(),
      events: this.events
    }
  }
}

// Export singleton instance
export const analytics = new Analytics()

// Export hook for React components
export function useAnalytics() {
  return analytics
}