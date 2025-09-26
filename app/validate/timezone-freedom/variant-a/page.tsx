"use client"

import { HeroSection } from "@/components/landing/sections/hero-section"
import { ProblemSection } from "@/components/landing/sections/problem-section"
import { SolutionSection } from "@/components/landing/sections/solution-section" 
import { FeaturesSection } from "@/components/landing/sections/features-section"
import { PricingSection } from "@/components/landing/sections/pricing-section"
import { EmailCaptureCTA } from "@/components/ui/email-capture-cta"

export default function TimezoneFreedомVariantA() {
  const handleCtaClick = () => {
    // Track demo request event
    console.log("Demo request clicked - Timezone Freedom Variant A")
    // In real implementation, this would trigger PostHog event and show demo form
    alert("Demo request - Timezone Freedom focus")
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