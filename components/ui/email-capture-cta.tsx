"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { initPostHog } from "@/lib/posthog"

interface EmailCaptureCTAProps {
  variant: "timezone-freedom" | "timezone-freedom-v0" | "information-findability" | "unified-productivity"
  size?: "default" | "lg"
  className?: string
  section?: string
}

const variantConfig = {
  "timezone-freedom": {
    primary: "Join Waitlist",
    secondary: "Join Waitlist",
    placeholder: "Enter your work email",
    colors: "from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700",
    focusColors: "focus:ring-blue-500 border-blue-300"
  },
  "timezone-freedom-v0": {
    primary: "Join Waitlist",
    secondary: "Join Waitlist",
    placeholder: "Enter your work email",
    colors: "from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700",
    focusColors: "focus:ring-blue-500 border-blue-300"
  },
  "information-findability": {
    primary: "Join Waitlist", 
    secondary: "Join Waitlist",
    placeholder: "Your email address",
    colors: "from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700",
    focusColors: "focus:ring-emerald-500 border-emerald-300"
  },
  "unified-productivity": {
    primary: "Join Waitlist",
    secondary: "Join Waitlist", 
    placeholder: "Work email address",
    colors: "from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700",
    focusColors: "focus:ring-purple-500 border-purple-300"
  }
}

export function EmailCaptureCTA({
  variant,
  size = "default",
  className,
  section = "hero"
}: EmailCaptureCTAProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const config = variantConfig[variant]
  const ctaText = section === "hero" ? config.primary : config.secondary

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setError("Please enter your email address")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      // Track email capture attempt
      const posthog = initPostHog()
      if (posthog) {
        posthog.capture('fake_door_email_capture_attempt', {
          variant,
          section,
          email_domain: email.split('@')[1],
          cta_text: ctaText,
          launch_metric: 'email_conversion',
          conversion_type: 'email_signup'
        })
      }

      // Call real email capture API
      const response = await fetch('/api/email-capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          variant,
          section,
          cta_text: ctaText
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to capture email')
      }

      // Track successful email capture
      const posthogSuccess = initPostHog()
      if (posthogSuccess) {
        posthogSuccess.capture('fake_door_conversion', {
          variant,
          conversion_type: 'secondary_goal',
          launch_metric: 'email_signup',
          has_email: true,
          section,
          email_domain: email.split('@')[1]
        })
      }

      setIsSuccess(true)
      setEmail("")
    } catch (error) {
      console.error('Email capture error:', error)

      // Track failed email capture
      const posthogError = initPostHog()
      if (posthogError) {
        posthogError.capture('fake_door_email_capture_failed', {
          variant,
          section,
          email_domain: email.split('@')[1],
          cta_text: ctaText,
          error: error instanceof Error ? error.message : 'Unknown error',
          launch_metric: 'email_conversion',
          conversion_type: 'email_signup_failed'
        })
      }
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg"
      >
        <CheckCircle className="w-6 h-6 text-green-600" />
        <div className="text-center">
          <p className="font-medium text-green-800">Verification email sent!</p>
          <p className="text-sm text-green-600">Check your inbox and click the verification link</p>
        </div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn("w-full max-w-md", className)}>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError("")
            }}
            placeholder={config.placeholder}
            className={cn(
              "w-full px-4 rounded-lg border-2 transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-offset-2",
              "bg-white placeholder-gray-600 text-gray-900 font-medium",
              config.focusColors,
              error ? "border-red-300 focus:ring-red-500" : "border-gray-300",
              size === "lg" ? "text-lg py-4 h-14" : "py-3 h-11"
            )}
            disabled={isSubmitting}
          />
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-1 text-sm text-red-600"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        
        <Button
          type="submit"
          size={size}
          disabled={isSubmitting}
          className={cn(
            "bg-gradient-to-r text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg",
            config.colors,
            size === "lg" ? "px-8 py-4 text-lg" : "px-6 py-3"
          )}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Joining...
            </>
          ) : (
            <>
              {ctaText}
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
      
      <p className="mt-2 text-xs text-gray-500 text-center">
        No spam, unsubscribe anytime. We respect your privacy.
      </p>
    </form>
  )
}