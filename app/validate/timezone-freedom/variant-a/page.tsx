"use client"

import { useEffect } from "react"
import { HeroSection } from "@/components/landing/sections/hero-section"
import { ProblemSection } from "@/components/landing/sections/problem-section"
import { SolutionSection } from "@/components/landing/sections/solution-section"
import { FeaturesSection } from "@/components/landing/sections/features-section"
import { PricingSection } from "@/components/landing/sections/pricing-section"
import { EmailCaptureCTA } from "@/components/ui/email-capture-cta"
import { initPostHog, trackDemoRequest, trackValidationEvent, trackScrollDepth } from "@/lib/posthog"

export default function TimezoneFreedомVariantA() {
  useEffect(() => {
    // Initialize PostHog for this page
    const posthog = initPostHog()

    if (posthog) {
      // Check if this is a new user (from middleware)
      const isNewUser = document.cookie.includes('localsphere_new_user=true')

      if (isNewUser) {
        // Track variant assignment for new users
        trackValidationEvent('variant_assigned', {
          variant: 'timezone-freedom',
          assignment_type: 'new_user',
          source: 'middleware'
        })

        // Remove the temporary cookie
        document.cookie = 'localsphere_new_user=; Max-Age=0; path=/;'
      }

      // Track pageview
      trackValidationEvent('validation_page_view', {
        variant: 'timezone-freedom',
        page: 'variant-a',
        source: 'validation_landing',
        is_new_user: isNewUser
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
            trackScrollDepth('timezone-freedom', milestone)
          }
        })
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleCtaClick = () => {
    // Track demo request with PostHog
    trackDemoRequest('timezone-freedom', 'hero')

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