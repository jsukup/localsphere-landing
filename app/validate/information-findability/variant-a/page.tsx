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

export default function InformationFindabilityVariantA() {
  const posthog = usePostHog()

  // Register variant super properties
  useVariantRegistration()

  useEffect(() => {
    if (!posthog) {
      console.log('[Information Findability] PostHog not ready yet')
      return
    }

    console.log('[Information Findability] PostHog ready, tracking events')

    const isNewUser = document.cookie.includes('localsphere_new_user=true')

    if (isNewUser) {
      posthog.capture('variant_assigned', {
        variant: 'information-findability',
        assignment_type: 'new_user',
        source: 'middleware'
      })

      document.cookie = 'localsphere_new_user=; Max-Age=0; path=/;'
    }

    posthog.capture('$pageview', {
      variant: 'information-findability',
      page: 'variant-a',
      source: 'validation_landing',
      is_new_user: isNewUser,
      $current_url: window.location.href
    })

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
            variant: 'information-findability',
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
      posthog.capture('fake_door_cta_interaction', {
        variant: 'information-findability',
        source: 'hero',
        conversion_type: 'primary_goal',
        launch_metric: 'cta_conversion',
        cta_type: 'demo_request'
      })
      console.log('[Information Findability] CTA clicked and tracked')
    }

    alert("Demo request tracked! Information Findability variant")
  }


  return (
    <main className="min-h-screen">
      <HeroSection
        variant="information-findability"
        headline="Find Any Decision, Update, or File in Seconds"
        subheadline="Stop digging through Slack threads, email chains, and shared drives forever. Ask LocalSphere any question about your work—'What's our Q3 budget?' or 'What did Mark decide about the redesign?'—and get instant, accurate answers from all your communication channels."
        onCtaClick={handleCtaClick}
      />

      <ProblemSection variant="information-findability" />

      <SolutionSection variant="information-findability" />

      <FeaturesSection variant="information-findability" />

      <PricingSection variant="information-findability" />

      {/* Footer with trust elements */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded"></div>
              <span>Powered by Google Cloud Platform</span>
            </div>
            <div>30-Day Free Trial</div>
            <div>Money-Back Guarantee</div>
            <div>99.9% Uptime SLA</div>
          </div>

          <p className="text-gray-400 mb-4">
            Join remote-first teams who&apos;ve eliminated information chaos with LocalSphere
          </p>

          <div className="max-w-md mx-auto">
            <EmailCaptureCTA variant="information-findability" section="footer" />
          </div>
        </div>
      </footer>
    </main>
  )
}
