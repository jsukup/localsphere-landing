"use client"

import { useEffect } from "react"
import { usePostHog } from "posthog-js/react"
import { useVariantRegistration } from "@/lib/analytics/use-variant-registration"
import { HeroSection } from "@/components/landing/sections/hero-section"
import { ProblemSection } from "@/components/landing/sections/problem-section"
import { SolutionSection } from "@/components/landing/sections/solution-section"
import { FeaturesSection } from "@/components/landing/sections/features-section"
import { PricingSection } from "@/components/landing/sections/pricing-section"
import { EmailCaptureCTA } from "@/components/ui/email-capture-cta"

export default function TimezoneFreedомVariantA() {
  const posthog = usePostHog()

  // Register variant super properties
  useVariantRegistration()

  useEffect(() => {
    if (!posthog) {
      console.log('[Timezone Freedom] PostHog not ready yet')
      return
    }

    console.log('[Timezone Freedom] PostHog ready, tracking events')

    // Check if this is a new user (from middleware)
    const isNewUser = document.cookie.includes('localsphere_new_user=true')

    if (isNewUser) {
      // Track variant assignment for new users
      posthog.capture('variant_assigned', {
        variant: 'timezone-freedom',
        assignment_type: 'new_user',
        source: 'middleware'
      })

      // Remove the temporary cookie
      document.cookie = 'localsphere_new_user=; Max-Age=0; path=/;'
    }

    // Track pageview with variant context
    posthog.capture('$pageview', {
      variant: 'timezone-freedom',
      page: 'variant-a',
      source: 'validation_landing',
      is_new_user: isNewUser,
      $current_url: window.location.href
    })

    // Track scroll depth
    const scrollCheckpoints = new Set<number>()

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )

      const milestones = [25, 50, 75, 100]
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !scrollCheckpoints.has(milestone)) {
          scrollCheckpoints.add(milestone)
          posthog.capture('fake_door_section_engagement', {
            variant: 'timezone-freedom',
            depth_percentage: milestone,
            launch_metric: 'engagement_depth',
            engagement_type: 'scroll'
          })
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [posthog])

  const handleCtaClick = () => {
    if (posthog) {
      // Track demo request with PostHog
      posthog.capture('fake_door_cta_interaction', {
        variant: 'timezone-freedom',
        source: 'hero',
        conversion_type: 'primary_goal',
        launch_metric: 'cta_conversion',
        cta_type: 'demo_request'
      })
      console.log('[Timezone Freedom] CTA clicked and tracked')
    }

    // Show demo form (for now, just alert)
    alert("Demo request tracked! Timezone Freedom variant")
  }


  return (
    <main className="min-h-screen">
      <HeroSection
        variant="timezone-freedom"
        headline="Never Wake Up at 5 AM for Another Meeting"
        subheadline="Finally work in your timezone while staying perfectly synced with global teams. LocalSphere automatically coordinates across time zones, captures everything you miss, and keeps everyone updated—so you can work normal hours and still be a team player."
        onCtaClick={handleCtaClick}
      />

      <ProblemSection variant="timezone-freedom" />

      <SolutionSection variant="timezone-freedom" />

      <FeaturesSection variant="timezone-freedom" />

      <PricingSection variant="timezone-freedom" />

      {/* Footer with trust elements */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded"></div>
              <span>Powered by Google Cloud Platform</span>
            </div>
            <div>30-Day Free Trial</div>
            <div>Money-Back Guarantee</div>
            <div>99.9% Uptime SLA</div>
          </div>

          <p className="text-gray-400 mb-4">
            Join remote-first teams who&apos;ve reclaimed their schedules with LocalSphere
          </p>

          <div className="max-w-md mx-auto">
            <EmailCaptureCTA variant="timezone-freedom" section="footer" />
          </div>
        </div>
      </footer>
    </main>
  )
}
