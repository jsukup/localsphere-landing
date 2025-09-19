"use client"

import { EmailCaptureCTA } from "@/components/ui/email-capture-cta"
import { AnimatedSection, AnimatedStagger, AnimatedStaggerItem } from "@/components/ui/animated-section"
import { FloatingElements, GeometricPattern } from "@/components/ui/background-patterns"

interface HeroSectionProps {
  variant: "timezone-freedom" | "information-findability" | "unified-productivity"
  headline: string
  subheadline: string
  onCtaClick?: () => void
}

const variantStyles = {
  "timezone-freedom": {
    bgColor: "bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100",
    headlineColor: "text-blue-900",
    subheadlineColor: "text-blue-800",
    iconColor: "text-blue-600"
  },
  "information-findability": {
    bgColor: "bg-gradient-to-br from-emerald-50 via-emerald-100 to-teal-100", 
    headlineColor: "text-emerald-900",
    subheadlineColor: "text-emerald-800",
    iconColor: "text-emerald-600"
  },
  "unified-productivity": {
    bgColor: "bg-gradient-to-br from-purple-50 via-purple-100 to-violet-100",
    headlineColor: "text-purple-900", 
    subheadlineColor: "text-purple-800",
    iconColor: "text-purple-600"
  }
}

export function HeroSection({ variant, headline, subheadline }: HeroSectionProps) {
  const styles = variantStyles[variant]
  
  // Select background based on variant
  let backgroundMedia;
  if (variant === 'timezone-freedom') {
    backgroundMedia = '/images/hero/beach-laptop-woman.jpg';
  } else if (variant === 'information-findability') {
    backgroundMedia = 'video'; // Flag for video background
  } else if (variant === 'unified-productivity') {
    backgroundMedia = '/images/hero/universal_upscale_0_a4e423e9-0924-4d99-81c6-f5c0c0a8e8e8_0.jpg';
  } else {
    // Default image for other variants
    backgroundMedia = '/images/hero/universal_upscale_0_ada67899-9a54-4f99-9977-ef58d1585e7d_0.jpg';
  }
  
  return (
    <section 
      className="relative min-h-[85vh] flex items-center justify-start py-20 px-4 overflow-hidden"
      style={backgroundMedia !== 'video' ? {
        backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.90) 30%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0) 85%, rgba(0,0,0,0) 100%), url(${backgroundMedia})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      } : {}}
    >
      {/* Video Background for information-findability */}
      {backgroundMedia === 'video' && (
        <>
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute inset-0 w-full h-full object-cover -z-10"
            onLoadedData={(e) => {
              const video = e.target as HTMLVideoElement;
              if (video && video.readyState >= 2) {
                video.playbackRate = 0.50;
              }
            }}
            onCanPlay={(e) => {
              const video = e.target as HTMLVideoElement;
              if (video) {
                setTimeout(() => {
                  video.playbackRate = 0.50;
                }, 100);
              }
            }}
            onPlay={(e) => {
              const video = e.target as HTMLVideoElement;
              if (video) {
                video.playbackRate = 0.50;
              }
            }}
            onTimeUpdate={(e) => {
              const video = e.target as HTMLVideoElement;
              if (video && video.playbackRate !== 0.50) {
                video.playbackRate = 0.50;
              }
            }}
          >
            <source src="/videos/hero/hero-video.mp4" type="video/mp4" />
          </video>
          <div 
            className="absolute inset-0 -z-5"
            style={{
              background: 'linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.90) 30%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0) 85%, rgba(0,0,0,0) 100%)'
            }}
          />
        </>
      )}
      {/* Background Elements */}
      <FloatingElements variant={variant} />
      <GeometricPattern className={styles.iconColor} />
      
      <div className="w-full pl-8 md:pl-12 lg:pl-20 text-left relative z-10">
        {/* Headline */}
        <AnimatedSection direction="up" delay={0.4}>
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-5xl text-white text-shadow-lg text-gradient-light leading-tight`}>
            {headline}
          </h1>
        </AnimatedSection>

        {/* Subheadline */}
        <AnimatedSection direction="up" delay={0.6}>
          <p className={`text-lg md:text-xl lg:text-2xl mb-8 text-white/90 max-w-4xl text-shadow-lg leading-relaxed font-medium`}>
            {subheadline}
          </p>
        </AnimatedSection>

        {/* Email Capture CTA */}
        <AnimatedSection direction="up" delay={0.8}>
          <div className="mb-8 flex justify-start">
            <EmailCaptureCTA variant={variant} size="lg" section="hero" />
          </div>
        </AnimatedSection>

        {/* Trust Elements */}
        <AnimatedStagger delay={1.0} staggerDelay={0.1}>
          <div className="flex flex-wrap justify-start items-center gap-6 text-sm text-white/80">
            <AnimatedStaggerItem>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>30-day free trial</span>
              </div>
            </AnimatedStaggerItem>
            <AnimatedStaggerItem>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>No credit card required</span>
              </div>
            </AnimatedStaggerItem>
            <AnimatedStaggerItem>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Google Cloud secured</span>
              </div>
            </AnimatedStaggerItem>
          </div>
        </AnimatedStagger>
      </div>
    </section>
  )
}