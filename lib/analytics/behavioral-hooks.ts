// React hooks for automated behavioral tracking in validation projects
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

  // Track scroll depth milestones
  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return

      const element = elementRef.current
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate visibility percentage
      const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
      const percentage = Math.round((visibleHeight / rect.height) * 100)

      // Track 25%, 50%, 75%, 100% milestones
      if (percentage >= 25 && percentage % 25 === 0) {
        tracker.trackScrollMilestone(variant, percentage)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [variant, tracker, trackingId])

  // Track section engagement time using intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startTime.current = Date.now()
        } else if (startTime.current > 0) {
          const timeSpent = Date.now() - startTime.current
          if (timeSpent > 1000) { // Only track if viewed for >1 second
            tracker.trackSectionEngagement(variant, trackingId, timeSpent)
            setTimeOnSection(prev => prev + timeSpent)
          }
        }
      },
      { threshold: 0.5 } // 50% visible
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [variant, tracker, trackingId])

  return {
    timeOnSection
  }
}

interface UseCTATrackingProps {
  variant: string
  ctaId: string
  tracker: LaunchFrameworkTracker
}

export function useCTATracking({
  variant,
  ctaId,
  tracker
}: UseCTATrackingProps) {
  const hoverStartTime = useRef(0)
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseEnter = () => {
    hoverStartTime.current = Date.now()
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    if (hoverStartTime.current > 0) {
      const hoverTime = Date.now() - hoverStartTime.current
      tracker.trackCTAInteraction(variant, ctaId, hoverTime, false)
    }
    setIsHovering(false)
  }

  const handleClick = () => {
    const hoverTime = hoverStartTime.current > 0 
      ? Date.now() - hoverStartTime.current 
      : 0
    tracker.trackCTAInteraction(variant, ctaId, hoverTime, true)
  }

  return {
    isHovering,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick
  }
}

interface UseFormTrackingProps {
  variant: string
  formId: string
  tracker: LaunchFrameworkTracker
}

export function useFormTracking({
  variant,
  formId,
  tracker
}: UseFormTrackingProps) {
  const trackFieldEvent = (field: string, action: 'focus' | 'input' | 'blur' | 'submit') => {
    tracker.trackFormEngagement(variant, `${formId}.${field}`, action)
  }

  const createFieldHandlers = (fieldName: string) => ({
    onFocus: () => trackFieldEvent(fieldName, 'focus'),
    onInput: () => trackFieldEvent(fieldName, 'input'),
    onBlur: () => trackFieldEvent(fieldName, 'blur')
  })

  const handleSubmit = () => {
    trackFieldEvent('form', 'submit')
  }

  return {
    createFieldHandlers,
    handleSubmit
  }
}

// Exit intent detection hook
export function useExitIntent(variant: string, tracker: LaunchFrameworkTracker) {
  useEffect(() => {
    let exitDetected = false

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse is leaving from the top of the page
      if (e.clientY <= 0 && !exitDetected) {
        exitDetected = true
        tracker.trackExitIntent(variant, 'mouse_exit_top')
      }
    }

    const handleBeforeUnload = () => {
      if (!exitDetected) {
        exitDetected = true
        tracker.trackExitIntent(variant, 'page_unload')
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [variant, tracker])
}

// Time milestone tracking hook
export function useTimeMilestones(variant: string, tracker: LaunchFrameworkTracker) {
  useEffect(() => {
    const milestones = [30, 60, 120, 300] // 30s, 1m, 2m, 5m
    const triggered = new Set<number>()

    const checkMilestones = () => {
      const currentTime = Math.floor((Date.now() - performance.timeOrigin) / 1000)
      
      milestones.forEach(milestone => {
        if (currentTime >= milestone && !triggered.has(milestone)) {
          triggered.add(milestone)
          tracker.trackTimeMilestone(variant, milestone)
        }
      })
    }

    const interval = setInterval(checkMilestones, 5000) // Check every 5 seconds
    return () => clearInterval(interval)
  }, [variant, tracker])
}