"use client"

import Header from "@/components/landing-page/header"
import { EmailCaptureCTA } from "@/components/ui/email-capture-cta"
import { ProblemSection } from "@/components/landing/sections/problem-section"
import { SolutionSection } from "@/components/landing/sections/solution-section"
import { PricingSection } from "@/components/landing/sections/pricing-section"

export default function TimezoneFreedomV0() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#111111]">
      <Header />
      <div className="container pt-4">
        {/* Hero Section - Adapted with LocalSphere content */}
        <section id="hero" className="card my-8 relative overflow-hidden shadow-md">
          <div className="p-8 md:p-10 lg:p-12 flex flex-col md:flex-row items-start">
            {/* Text content */}
            <div className="w-full md:w-3/5 z-10">
              <h1 className="text-black dark:text-white text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
                Never Wake Up at
                <span className="block text-[#7A7FEE] dark:text-[#7A7FEE]">5 AM for Another</span>
                Meeting
              </h1>
              <p className="my-6 text-sm md:text-base max-w-md text-gray-700 dark:text-gray-300">
                Finally work in your timezone while staying perfectly synced with global teams. LocalSphere automatically coordinates across time zones, captures everything you miss, and keeps everyone updated—so you can work normal hours and still be a team player.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <EmailCaptureCTA variant="timezone-freedom" section="hero" />
              </div>
              {/* Trust elements */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>30-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Google Cloud secured</span>
                </div>
              </div>
            </div>

            {/* Image - hidden on mobile */}
            <div className="hidden md:block md:w-2/5 md:absolute md:right-0 md:top-0 md:bottom-0 md:flex md:items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/purple-circle-wave-static.png"
                alt="Purple Wave"
                className="w-full h-auto md:h-full md:w-auto md:object-cover md:object-left"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Problem Section - Full Width */}
      <ProblemSection variant="timezone-freedom" />

      {/* Solution Section - Full Width */}
      <SolutionSection variant="timezone-freedom" />

      <div className="container pt-4">
        {/* Services/Features Section */}
        <section id="features" className="my-16">
          <h2 className="section-subtitle text-center">How It Works</h2>
          <h3 className="section-title text-3xl md:text-4xl text-center mb-12">
            Asynchronous Coordination Made Simple
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-lg mb-2">Smart Time Zone Detection</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Automatically identifies when team members are in different time zones and schedules updates accordingly.
              </p>
            </div>
            <div className="card p-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-lg mb-2">Meeting Summaries</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Get AI-generated summaries of meetings you missed, with action items and decisions highlighted.
              </p>
            </div>
            <div className="card p-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h4 className="font-semibold text-lg mb-2">Async Updates</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Team members receive updates when they start their day, not at 3 AM. Stay in the loop on your schedule.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Pricing Section - Full Width */}
      <PricingSection variant="timezone-freedom" />

      <div className="container pt-4">
        {/* FAQ Section */}
        <section id="faq" className="my-16">
          <h2 className="section-subtitle text-center">FAQ</h2>
          <h3 className="section-title text-3xl md:text-4xl text-center mb-12">
            Frequently Asked Questions
          </h3>
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="card p-6">
              <h4 className="font-semibold text-lg mb-2">How does LocalSphere handle different time zones?</h4>
              <p className="text-gray-600 dark:text-gray-400">
                LocalSphere automatically detects team members&apos; time zones and schedules updates to arrive when they start their workday, ensuring everyone stays in sync without disrupting sleep schedules.
              </p>
            </div>
            <div className="card p-6">
              <h4 className="font-semibold text-lg mb-2">Do I need to install anything?</h4>
              <p className="text-gray-600 dark:text-gray-400">
                No installation required! LocalSphere works in your browser. 
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="card my-20 relative overflow-hidden shadow-md">
          <div className="p-8 md:p-10 lg:p-12 text-center">
            <h2 className="text-black dark:text-white mb-6 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
              Ready to <span className="text-[#7A7FEE] dark:text-[#7A7FEE]">Work Your Hours</span>?
            </h2>
            <p className="my-6 text-sm md:text-base max-w-md mx-auto text-gray-700 dark:text-gray-300">
              Join the waitlist and be among the first to experience timezone-free remote work.
            </p>
            <div className="flex justify-center">
              <EmailCaptureCTA variant="timezone-freedom" section="cta" />
            </div>
          </div>
        </section>
      </div>

      {/* Footer with trust elements */}
      <footer className="bg-gray-900 text-white py-12 px-4 mt-16">
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
