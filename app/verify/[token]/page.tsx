"use client"

import { useState, useEffect, use } from "react"
import { motion } from "framer-motion"
import { CheckCircle, AlertCircle, Loader2, ArrowRight, Mail } from "lucide-react"
import { useRouter } from "next/navigation"

interface VerificationResult {
  success: boolean;
  message: string;
  data?: {
    email: string;
    variant: string;
    verified_at: string;
    section?: string;
    already_verified?: boolean;
  };
  error?: string;
}

export default function VerifyEmailPage({ params }: { params: Promise<{ token: string }> }) {
  const [verificationState, setVerificationState] = useState<'loading' | 'success' | 'error'>('loading')
  const [result, setResult] = useState<VerificationResult | null>(null)
  const router = useRouter()
  const resolvedParams = use(params)

  useEffect(() => {
    async function verifyEmail() {
      try {
        const response = await fetch(`/api/verify-email/${resolvedParams.token}`)
        const data: VerificationResult = await response.json()
        
        setResult(data)
        
        if (data.success) {
          setVerificationState('success')
        } else {
          setVerificationState('error')
        }
      } catch (error) {
        console.error('Verification error:', error)
        setVerificationState('error')
        setResult({
          success: false,
          message: 'Failed to verify email',
          error: 'Network error occurred'
        })
      }
    }

    if (resolvedParams.token) {
      verifyEmail()
    }
  }, [resolvedParams.token])

  const variantStyles = {
    "timezone-freedom": {
      bgColor: "bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100",
      headerColor: "text-blue-900",
      subColor: "text-blue-700",
      accentColor: "blue-600",
      gradientFrom: "from-blue-600",
      gradientTo: "to-indigo-600"
    },
    "information-findability": {
      bgColor: "bg-gradient-to-br from-emerald-50 via-emerald-100 to-teal-100",
      headerColor: "text-emerald-900",
      subColor: "text-emerald-700",
      accentColor: "emerald-600",
      gradientFrom: "from-emerald-600", 
      gradientTo: "to-teal-600"
    },
    "unified-productivity": {
      bgColor: "bg-gradient-to-br from-purple-50 via-purple-100 to-violet-100",
      headerColor: "text-purple-900",
      subColor: "text-purple-700",
      accentColor: "purple-600",
      gradientFrom: "from-purple-600",
      gradientTo: "to-violet-600"
    }
  }

  const variant = result?.data?.variant as keyof typeof variantStyles || "timezone-freedom"
  const styles = variantStyles[variant]

  const handleReturnToSite = () => {
    const variantUrl = `/validate/${variant}/variant-a`
    router.push(variantUrl)
  }

  if (verificationState === 'loading') {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 ${styles.bgColor}`}>
        <motion.div 
          className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg max-w-md w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mb-6"
          >
            <Loader2 className={`w-12 h-12 text-${styles.accentColor} mx-auto`} />
          </motion.div>
          <h1 className={`text-2xl font-bold mb-4 ${styles.headerColor}`}>
            Verifying Your Email
          </h1>
          <p className={`${styles.subColor}`}>
            Please wait while we verify your email address...
          </p>
        </motion.div>
      </div>
    )
  }

  if (verificationState === 'success') {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 ${styles.bgColor}`}>
        <motion.div 
          className="text-center bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl max-w-lg w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-6"
          >
            <div className={`w-20 h-20 bg-gradient-to-br ${styles.gradientFrom} ${styles.gradientTo} rounded-full flex items-center justify-center mx-auto shadow-lg`}>
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <motion.h1 
            className={`text-3xl font-bold mb-4 ${styles.headerColor}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Email Verified Successfully!
          </motion.h1>

          <motion.p 
            className={`text-lg mb-6 ${styles.subColor}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {result?.data?.already_verified 
              ? "Your email was already verified. Welcome back!"
              : "Thank you for verifying your email address. You're all set!"
            }
          </motion.p>

          <motion.div 
            className="bg-gray-50 rounded-xl p-4 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">Verified Email:</span>
            </div>
            <p className="font-semibold text-gray-900">{result?.data?.email}</p>
          </motion.div>

          <motion.button
            className={`w-full bg-gradient-to-r ${styles.gradientFrom} ${styles.gradientTo} text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={handleReturnToSite}
          >
            Continue to LocalSphere
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          <motion.p 
            className="text-xs text-gray-500 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            We&apos;ll keep you updated on LocalSphere&apos;s progress and early access opportunities.
          </motion.p>
        </motion.div>
      </div>
    )
  }

  // Error state
  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${styles.bgColor}`}>
      <motion.div 
        className="text-center bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl max-w-lg w-full border border-red-200"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-6"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <AlertCircle className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        <motion.h1 
          className="text-3xl font-bold mb-4 text-red-900"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Verification Failed
        </motion.h1>

        <motion.p 
          className="text-lg mb-6 text-red-700"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {result?.error || result?.message || "Unable to verify your email address."}
        </motion.p>

        <motion.div 
          className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-red-800">
            This could happen if:
          </p>
          <ul className="text-sm text-red-700 mt-2 list-disc list-inside space-y-1">
            <li>The verification link has expired (valid for 24 hours)</li>
            <li>The link has already been used</li>
            <li>The verification token is invalid</li>
          </ul>
        </motion.div>

        <motion.button
          className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 mb-4"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={handleReturnToSite}
        >
          Return to LocalSphere
          <ArrowRight className="w-4 h-4" />
        </motion.button>

        <motion.p 
          className="text-xs text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          You can try signing up again to receive a new verification email.
        </motion.p>
      </motion.div>
    </div>
  )
}