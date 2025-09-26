"use client"

import { HeroSection } from "@/components/landing/sections/hero-section"
import { ProblemSection } from "@/components/landing/sections/problem-section"
import { SolutionSection } from "@/components/landing/sections/solution-section" 
import { FeaturesSection } from "@/components/landing/sections/features-section"
import { PricingSection } from "@/components/landing/sections/pricing-section"

export default function InformationFindabilityVariantA() {
  const handleCtaClick = () => {
    // Track demo request event
    console.log("Demo request clicked - Information Findability Variant A")
    // In real implementation, this would trigger PostHog event and show demo form
    alert("Demo request - Information Findability focus")
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
            <button 
              onClick={handleCtaClick}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </footer>
    </main>
  )
}