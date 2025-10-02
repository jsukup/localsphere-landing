"use client"

import { useState } from "react"
import { usePostHog } from "posthog-js/react"
import { AnimatedSection, AnimatedStagger, AnimatedStaggerItem } from "@/components/ui/animated-section"
import { motion } from "framer-motion"
import { Check, Star, Zap, Shield } from "lucide-react"
import { EmailCaptureCTA } from "@/components/ui/email-capture-cta"

interface PricingSectionProps {
  variant: "timezone-freedom" | "information-findability" | "unified-productivity"
}

const variantStyles = {
  "timezone-freedom": {
    bgColor: "bg-gradient-to-br from-blue-50 via-white to-indigo-50",
    headerColor: "text-blue-900",
    subColor: "text-blue-700",
    primaryGradient: "from-blue-600 to-indigo-600",
    accentColor: "blue-600"
  },
  "information-findability": {
    bgColor: "bg-gradient-to-br from-emerald-50 via-white to-teal-50",
    headerColor: "text-emerald-900",
    subColor: "text-emerald-700", 
    primaryGradient: "from-emerald-600 to-teal-600",
    accentColor: "emerald-600"
  },
  "unified-productivity": {
    bgColor: "bg-gradient-to-br from-purple-50 via-white to-violet-50",
    headerColor: "text-purple-900",
    subColor: "text-purple-700",
    primaryGradient: "from-purple-600 to-violet-600",
    accentColor: "purple-600"
  }
}

export function PricingSection({ variant }: PricingSectionProps) {
  const posthog = usePostHog()
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")
  const styles = variantStyles[variant]

  const plans = [
    {
      name: "Starter",
      teamSize: "Up to 10 employees",
      monthlyPrice: 449,
      annualPrice: 382,
      features: [
        "AI Twin for each team member",
        "Unified communication inbox", 
        "Basic timezone coordination",
        "Essential integrations",
        "Standard support"
      ],
      icon: Zap,
      popular: false,
      highlight: false
    },
    {
      name: "Professional",
      teamSize: "Up to 50 employees", 
      monthlyPrice: 4999,
      annualPrice: 4249,
      features: [
        "Everything in Starter",
        "Advanced AI meeting summaries",
        "Custom workflow automation",
        "Priority integrations",
        "Premium support",
        "Advanced analytics"
      ],
      icon: Star,
      popular: true,
      highlight: true
    },
    {
      name: "Enterprise",
      teamSize: "50+ employees",
      monthlyPrice: null,
      annualPrice: null, 
      features: [
        "Everything in Professional",
        "Custom AI training",
        "Advanced security controls",
        "Dedicated success manager",
        "Custom integrations",
        "SLA guarantee"
      ],
      icon: Shield,
      popular: false,
      highlight: false
    }
  ]

  return (
    <section className={`py-20 px-4 ${styles.bgColor} relative overflow-hidden`}>
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pricing-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="15" cy="15" r="1" fill="currentColor" className={styles.headerColor} opacity="0.1" />
              <circle cx="5" cy="5" r="0.5" fill="currentColor" className={styles.headerColor} opacity="0.05" />
              <circle cx="25" cy="5" r="0.5" fill="currentColor" className={styles.headerColor} opacity="0.05" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pricing-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedSection direction="up" delay={0.2}>
            <h2 className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${styles.headerColor}`}>
              Simple, Transparent Pricing
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.4}>
            <p className={`text-lg md:text-xl max-w-4xl mx-auto mb-8 ${styles.subColor} font-medium`}>
              Choose the plan that fits your team size. All plans include 30-day free trial.
            </p>
          </AnimatedSection>
          
          {/* Billing Toggle */}
          <AnimatedSection direction="up" delay={0.6}>
            <div className="flex items-center justify-center mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-white/50 shadow-lg">
                <button
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${billingCycle === 'monthly' ? `bg-gradient-to-r ${styles.primaryGradient} text-white shadow-lg` : 'text-gray-600 hover:text-gray-800'}`}
                  onClick={() => setBillingCycle('monthly')}
                >
                  Monthly
                </button>
                <button
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${billingCycle === 'annual' ? `bg-gradient-to-r ${styles.primaryGradient} text-white shadow-lg` : 'text-gray-600 hover:text-gray-800'}`}
                  onClick={() => setBillingCycle('annual')}
                >
                  Annual (Save 15%)
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Pricing Cards */}
        <AnimatedStagger className="grid md:grid-cols-3 gap-8 mb-16" staggerDelay={0.15}>
          {plans.map((plan, index) => {
            const IconComponent = plan.icon
            return (
              <AnimatedStaggerItem key={index}>
                <motion.div 
                  className={`relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl transition-all duration-300 border h-full flex flex-col ${
                    plan.highlight 
                      ? `border-${styles.accentColor} ring-2 ring-${styles.accentColor}/20 shadow-2xl` 
                      : 'border-white/50 hover:border-white/80'
                  }`}
                  whileHover={{ 
                    y: -8,
                    scale: 1.02,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onMouseEnter={() => {
                    if (posthog) {
                      posthog.capture('pricing_engagement', {
                        variant,
                        tier: plan.name.toLowerCase(),
                        action: 'hover',
                        launch_metric: 'pricing_interest',
                        section: 'pricing'
                      })
                    }
                  }}
                  onClick={() => {
                    if (posthog) {
                      posthog.capture('pricing_engagement', {
                        variant,
                        tier: plan.name.toLowerCase(),
                        action: 'click',
                        launch_metric: 'pricing_interest',
                        section: 'pricing'
                      })
                    }
                  }}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <motion.div 
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <span className={`bg-gradient-to-r ${styles.primaryGradient} text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg`}>
                        Most Popular
                      </span>
                    </motion.div>
                  )}
                  
                  {/* Icon */}
                  <div className="text-center mb-8">
                    <motion.div 
                      className={`w-20 h-20 bg-gradient-to-br ${styles.primaryGradient} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <IconComponent className="text-white" size={32} />
                    </motion.div>
                    
                    <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${styles.headerColor}`}>{plan.name}</h3>
                    <p className={`${styles.subColor} mb-4 font-medium`}>{plan.teamSize}</p>
                    
                    {/* Pricing */}
                    <div className="mb-6">
                      {plan.monthlyPrice ? (
                        <motion.div
                          key={billingCycle}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span className={`text-4xl md:text-5xl font-bold ${styles.headerColor}`}>
                            ${billingCycle === 'monthly' ? plan.monthlyPrice.toLocaleString() : plan.annualPrice.toLocaleString()}
                          </span>
                          <span className={`${styles.subColor} text-lg`}>
                            /{billingCycle === 'monthly' ? 'month' : 'month, billed annually'}
                          </span>
                        </motion.div>
                      ) : (
                        <span className={`text-3xl font-bold ${styles.headerColor}`}>Contact Us</span>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li 
                        key={featureIndex} 
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * featureIndex }}
                      >
                        <motion.div 
                          className={`w-6 h-6 bg-gradient-to-br ${styles.primaryGradient} rounded-full flex items-center justify-center mr-4 mt-0.5 shadow-sm`}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Check className="text-white" size={12} />
                        </motion.div>
                        <span className="text-gray-700 leading-relaxed font-medium">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA - Always at bottom */}
                  <div className="mt-auto pt-4">
                    <EmailCaptureCTA variant={variant} section="pricing" />
                  </div>
                </motion.div>
              </AnimatedStaggerItem>
            )
          })}
        </AnimatedStagger>

        {/* Bottom Information */}
        <AnimatedSection direction="up" delay={1.4} className="text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/50 max-w-4xl mx-auto shadow-lg">
            <p className={`${styles.subColor} mb-4 text-lg font-medium`}>
              All plans include Google Cloud Platform infrastructure and 99.9% uptime guarantee
            </p>
            <p className={`text-sm ${styles.subColor} opacity-80`}>
              30-day money-back guarantee for early adopters • No setup fees • Cancel anytime
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}