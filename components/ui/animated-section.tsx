"use client"

import { motion, useInView } from "framer-motion"
import { ReactNode, useRef } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'
  stagger?: boolean
  once?: boolean
}

export function AnimatedSection({ 
  children, 
  className = "", 
  delay = 0,
  direction = 'up',
  // stagger = false,
  once = true
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-100px" })

  const directionVariants = {
    up: {
      initial: { opacity: 0, y: 60 },
      animate: { opacity: 1, y: 0 }
    },
    down: {
      initial: { opacity: 0, y: -60 },
      animate: { opacity: 1, y: 0 }
    },
    left: {
      initial: { opacity: 0, x: -60 },
      animate: { opacity: 1, x: 0 }
    },
    right: {
      initial: { opacity: 0, x: 60 },
      animate: { opacity: 1, x: 0 }
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 }
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 }
    }
  }

  const variant = directionVariants[direction]

  return (
    <motion.div
      ref={ref}
      initial={variant.initial}
      animate={isInView ? variant.animate : variant.initial}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.21, 1.11, 0.81, 0.99]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface AnimatedStaggerProps {
  children: ReactNode
  className?: string
  delay?: number
  staggerDelay?: number
}

export function AnimatedStagger({ 
  children, 
  className = "",
  delay = 0,
  staggerDelay = 0.1
}: AnimatedStaggerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedStaggerItem({ 
  children, 
  className = "" 
}: { 
  children: ReactNode
  className?: string 
}) {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 40 },
        animate: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.21, 1.11, 0.81, 0.99]
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}