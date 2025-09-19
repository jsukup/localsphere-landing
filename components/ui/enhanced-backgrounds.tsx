"use client"

import { motion } from "framer-motion"

interface EnhancedBackgroundProps {
  variant: "timezone-freedom" | "information-findability" | "unified-productivity"
  className?: string
}

const variantColors = {
  "timezone-freedom": {
    primary: "rgba(59, 130, 246, 0.1)", // blue-500
    secondary: "rgba(99, 102, 241, 0.08)", // indigo-500
    accent: "rgba(147, 197, 253, 0.06)" // blue-300
  },
  "information-findability": {
    primary: "rgba(34, 197, 94, 0.1)", // green-500
    secondary: "rgba(20, 184, 166, 0.08)", // teal-500
    accent: "rgba(110, 231, 183, 0.06)" // emerald-300
  },
  "unified-productivity": {
    primary: "rgba(168, 85, 247, 0.1)", // purple-500
    secondary: "rgba(139, 92, 246, 0.08)", // violet-500
    accent: "rgba(196, 181, 253, 0.06)" // purple-300
  }
}

export function ParticleField({ variant, className = "" }: EnhancedBackgroundProps) {
  const colors = variantColors[variant]
  
  // Use deterministic positions based on index to avoid hydration issues
  const getPosition = (index: number, seed: number) => {
    const hash = (index * 31 + seed * 17) % 100
    return hash
  }
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.secondary : colors.accent,
            left: `${getPosition(i, 13)}%`,
            top: `${getPosition(i, 37)}%`,
          }}
          animate={{
            y: [-20, -100, -20],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + (i % 3) + 2,
            repeat: Infinity,
            delay: (i % 5) * 0.4,
          }}
        />
      ))}
    </div>
  )
}

export function GradientOrb({ variant, className = "", size = "large" }: EnhancedBackgroundProps & { size?: "small" | "large" }) {
  const colors = variantColors[variant]
  const sizeClasses = size === "large" ? "w-96 h-96" : "w-48 h-48"
  
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${sizeClasses} ${className}`}
      style={{
        background: `radial-gradient(circle, ${colors.primary} 0%, ${colors.secondary} 50%, transparent 100%)`,
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}

export function GlassMorphicCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={`backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl ${className}`}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.15)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  )
}

export function FloatingIcon({ 
  children, 
  delay = 0,
  className = "" 
}: { 
  children: React.ReactNode
  delay?: number
  className?: string 
}) {
  return (
    <motion.div
      className={`${className}`}
      animate={{
        y: [-5, 5, -5],
        rotate: [-2, 2, -2],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

export function RippleEffect({ variant, className = "" }: EnhancedBackgroundProps) {
  const colors = variantColors[variant]
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{
            borderColor: colors.primary,
          }}
          animate={{
            scale: [0, 2, 0],
            opacity: [1, 0.2, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1,
            ease: "easeOut",
          }}
          initial={{ width: "100px", height: "100px" }}
        />
      ))}
    </div>
  )
}