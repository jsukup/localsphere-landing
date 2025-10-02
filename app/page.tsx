"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { initPostHog, trackValidationEvent } from "@/lib/posthog"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Initialize PostHog immediately
    const posthog = initPostHog()

    // Track the landing on root before redirect
    if (posthog) {
      trackValidationEvent('landing_page_visit', {
        source: 'root',
        path: '/',
        timestamp: new Date().toISOString()
      })
    }

    // Get variant from cookie or let middleware handle assignment
    const variant = document.cookie
      .split('; ')
      .find(row => row.startsWith('localsphere_variant='))
      ?.split('=')[1]

    if (variant) {
      // Variant already assigned, redirect to it
      router.push(`/validate/${variant}/variant-a`)
    } else {
      // Let middleware handle variant assignment
      // This refresh will trigger middleware which will set cookie and redirect
      router.refresh()
    }
  }, [router])

  // Show loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">Loading LocalSphere...</h2>
        <p className="text-gray-500 mt-2">Preparing your experience</p>
      </div>
    </div>
  )
}
