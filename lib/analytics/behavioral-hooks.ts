// React hooks for automated behavioral tracking in validation projects
// NOTE: This file is deprecated. Use usePostHog() hook directly in components.
// See validation pages for examples of proper PostHog usage

import { useEffect, useRef, useState } from 'react'
import { LaunchFrameworkTracker } from './launch-tracking'

interface UseBehavioralTrackingProps {
  variant: string
  elementRef: React.RefObject<HTMLElement>
  trackingId: string
  tracker: LaunchFrameworkTracker
}

export function useBehavioralTracking({
  variant,
  elementRef,
  trackingId,
  tracker
}: UseBehavioralTrackingProps) {
  const [timeOnSection, setTimeOnSection] = useState(0)
  const startTime = useRef(Date.now())

  // Deprecated - use usePostHog() instead
  useEffect(() => {
    console.warn('[useBehavioralTracking] Deprecated - use usePostHog() hook instead')
  }, [])

  return {
    timeOnSection,
    trackingId
  }
}
