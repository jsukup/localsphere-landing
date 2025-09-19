"use client"

import { HeroSection } from "@/components/landing/sections/hero-section"
import { ProblemSection } from "@/components/landing/sections/problem-section"
import { SolutionSection } from "@/components/landing/sections/solution-section" 
import { FeaturesSection } from "@/components/landing/sections/features-section"
import { PricingSection } from "@/components/landing/sections/pricing-section"

export default function UnifiedProductivityVariantA() {
  const handleCtaClick = () => {
    // Track demo request event
    console.log("Demo request clicked - Unified Productivity Variant A")
    // In real implementation, this would trigger PostHog event and show demo form
    alert("Demo request - Unified Productivity focus")
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
            <button 
              onClick={handleCtaClick}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold"
            >
              Request Demo - Unify Your Team
            </button>
          </div>
        </div>
      </footer>
    </main>
  )
}