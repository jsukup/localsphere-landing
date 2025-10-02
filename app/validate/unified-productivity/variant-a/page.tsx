"use client"

import { useEffect } from "react"
import { HeroSection } from "@/components/landing/sections/hero-section"
import { ProblemSection } from "@/components/landing/sections/problem-section"
import { SolutionSection } from "@/components/landing/sections/solution-section"
import { FeaturesSection } from "@/components/landing/sections/features-section"
import { PricingSection } from "@/components/landing/sections/pricing-section"
import { EmailCaptureCTA } from "@/components/ui/email-capture-cta"
import { initPostHog, trackDemoRequest, trackValidationEvent, trackScrollDepth } from "@/lib/posthog"

export default function UnifiedProductivityVariantA() {
  useEffect(() => {
    // Initialize PostHog for this page
    const posthog = initPostHog()

    if (posthog) {
      // Check if this is a new user (from middleware)
      const isNewUser = document.cookie.includes('localsphere_new_user=true')

      if (isNewUser) {
        // Track variant assignment for new users
        trackValidationEvent('variant_assigned', {
          variant: 'unified-productivity',
          assignment_type: 'new_user',
          source: 'middleware'
        })

        // Remove the temporary cookie
        document.cookie = 'localsphere_new_user=; Max-Age=0; path=/;'
      }

      // Track pageview
      trackValidationEvent('validation_page_view', {
        variant: 'unified-productivity',
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
            trackScrollDepth('unified-productivity', milestone)
          }
        })
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleCtaClick = () => {
    // Track demo request with PostHog
    trackDemoRequest('unified-productivity', 'hero')

    // Show demo form (for now, just alert)
    alert("Demo request tracked! Unified Productivity variant")
  }


  return (
    <main className="min-h-screen">
      <HeroSection 
        variant="unified-productivity"
        headline="One Inbox for Everything—Email, Chat, Tasks, All of It"
        subheadline="No more juggling 10 different apps or missing important messages. LocalSphere brings together all your communication tools into one intelligent command center that prioritizes what needs your attention and handles the routine stuff automatically."
        onCtaClick={handleCtaClick}
      />
      
      <ProblemSection variant="unified-productivity" />
      
      <SolutionSection variant="unified-productivity" />
      
      <FeaturesSection variant="unified-productivity" />
      
      <PricingSection variant="unified-productivity" />
      
      {/* Footer with trust elements */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-600 rounded"></div>
              <span>Powered by Google Cloud Platform</span>
            </div>
            <div>30-Day Free Trial</div>
            <div>Money-Back Guarantee</div>
            <div>99.9% Uptime SLA</div>
          </div>
          
          <p className="text-gray-400 mb-4">
            Join remote-first teams who&apos;ve unified their workflow with LocalSphere
          </p>
          
          <div className="max-w-md mx-auto">
            <EmailCaptureCTA variant="unified-productivity" section="footer" />
          </div>
        </div>
      </footer>
    </main>
  )
}