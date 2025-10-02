"use client"

import { HeroSection } from "@/components/landing/sections/hero-section"
import { ProblemSection } from "@/components/landing/sections/problem-section"
import { SolutionSection } from "@/components/landing/sections/solution-section"
import { FeaturesSection } from "@/components/landing/sections/features-section"
import { PricingSection } from "@/components/landing/sections/pricing-section"
import { EmailCaptureCTA } from "@/components/ui/email-capture-cta"

export default function UnifiedProductivityVariantA() {
  return (
    <main className="min-h-screen">
      <HeroSection
        variant="unified-productivity"
        headline="Stop Juggling 10 Different Apps to Stay Connected"
        subheadline="One platform for all your work communication—Slack, email, docs, tasks, and meetings. LocalSphere's AI organizes everything automatically so you can focus on actual work instead of hunting for information across scattered tools."
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
              <div className="w-8 h-8 bg-emerald-600 rounded"></div>
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
