import { AnimatedSection, AnimatedStagger, AnimatedStaggerItem } from "@/components/ui/animated-section"
import { motion } from "framer-motion"
import { Clock, Search, Layers, Users, Calendar, Zap, MessageSquare, Target, Bot } from "lucide-react"
import { EmailCaptureCTA } from "@/components/ui/email-capture-cta"
import { ParticleField, GradientOrb, GlassMorphicCard, FloatingIcon } from "@/components/ui/enhanced-backgrounds"

interface FeaturesSectionProps {
  variant: "timezone-freedom" | "information-findability" | "unified-productivity"
}

const featuresContent = {
  "timezone-freedom": [
    {
      title: "Never Wake Up at 5 AM for Another Meeting",
      description: "Finally work in your timezone while staying perfectly synced with global teams. LocalSphere automatically coordinates across time zones, captures everything you miss, and keeps everyone updated—so you can work normal hours and still be a team player.",
      icon: Clock,
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      title: "Find Any Decision, Update, or File in Seconds", 
      description: "Stop digging through Slack threads, email chains, and shared drives. Ask LocalSphere any question about your work and get instant, accurate answers from all your communication channels.",
      icon: Search,
      gradient: "from-blue-400 to-cyan-500"
    },
    {
      title: "One Inbox for Everything—Email, Chat, Tasks, All of It",
      description: "No more juggling 10 different apps or missing important messages. LocalSphere brings together all your communication tools into one intelligent command center.",
      icon: Layers,
      gradient: "from-indigo-500 to-purple-600"
    },
    {
      title: "Cut Your Meetings in Half, Keep All the Value",
      description: "Reclaim 40% of your week without missing important decisions. LocalSphere attends routine meetings for you and delivers personalized summaries of only what matters to your work.",
      icon: Calendar,
      gradient: "from-blue-600 to-indigo-700"
    },
    {
      title: "Work Your Own Hours Without Leaving Anyone Hanging", 
      description: "Take control of your schedule while keeping your team informed. LocalSphere maintains your presence and lets colleagues know exactly when you'll respond.",
      icon: Users,
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      title: "Your Communication, Automated Your Way",
      description: "Let LocalSphere handle the repetitive 60% so you can focus on the meaningful 40%. From status updates to routine responses, LocalSphere learns your style.",
      icon: Bot,
      gradient: "from-indigo-600 to-blue-700"
    }
  ],
  "information-findability": [
    {
      title: "Find Any Decision, Update, or File in Seconds",
      description: "Stop digging through Slack threads, email chains, and shared drives. Ask LocalSphere any question about your work—'What's our Q3 budget?' or 'What did Mark decide about the redesign?'—and get instant, accurate answers from all your communication channels.",
      icon: Search,
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      title: "Never Wake Up at 5 AM for Another Meeting",
      description: "Finally work in your timezone while staying perfectly synced with global teams. LocalSphere automatically coordinates across time zones and captures everything you miss.",
      icon: Clock,
      gradient: "from-teal-500 to-emerald-600"
    },
    {
      title: "One Inbox for Everything—Email, Chat, Tasks, All of It", 
      description: "No more juggling 10 different apps or missing important messages. LocalSphere brings together all your communication tools into one intelligent command center.",
      icon: Layers,
      gradient: "from-emerald-600 to-green-700"
    },
    {
      title: "Cut Your Meetings in Half, Keep All the Value",
      description: "Reclaim 40% of your week without missing important decisions. LocalSphere attends routine meetings for you and delivers personalized summaries.",
      icon: Target,
      gradient: "from-teal-600 to-cyan-700"
    },
    {
      title: "Work Your Own Hours Without Leaving Anyone Hanging",
      description: "Take control of your schedule while keeping your team informed. LocalSphere maintains your presence and answers routine questions automatically.",
      icon: Users,
      gradient: "from-emerald-400 to-teal-500"
    },
    {
      title: "Your Communication, Automated Your Way",
      description: "Let LocalSphere handle the repetitive 60% so you can focus on the meaningful 40%. AI learns your communication style and handles busywork.",
      icon: Bot,
      gradient: "from-green-600 to-emerald-700"
    }
  ],
  "unified-productivity": [
    {
      title: "One Inbox for Everything—Email, Chat, Tasks, All of It",
      description: "No more juggling 10 different apps or missing important messages. LocalSphere brings together all your communication tools into one intelligent command center that prioritizes what needs your attention and handles the routine stuff automatically.",
      icon: Layers,
      gradient: "from-purple-500 to-violet-600"
    },
    {
      title: "Find Any Decision, Update, or File in Seconds",
      description: "Stop digging through Slack threads, email chains, and shared drives. Ask LocalSphere any question about your work and get instant, accurate answers.",
      icon: Search,
      gradient: "from-violet-500 to-purple-600"
    },
    {
      title: "Never Wake Up at 5 AM for Another Meeting", 
      description: "Finally work in your timezone while staying perfectly synced with global teams. LocalSphere automatically coordinates across time zones.",
      icon: Clock,
      gradient: "from-purple-600 to-indigo-700"
    },
    {
      title: "Cut Your Meetings in Half, Keep All the Value",
      description: "Reclaim 40% of your week without missing important decisions. LocalSphere attends routine meetings for you and delivers personalized summaries.",
      icon: Zap,
      gradient: "from-violet-600 to-purple-700"
    },
    {
      title: "Work Your Own Hours Without Leaving Anyone Hanging",
      description: "Take control of your schedule while keeping your team informed. LocalSphere maintains your presence and handles routine communication.",
      icon: MessageSquare,
      gradient: "from-purple-400 to-violet-500"
    },
    {
      title: "Your Communication, Automated Your Way", 
      description: "Let LocalSphere handle the repetitive 60% so you can focus on the meaningful 40%. From status updates to routine responses, LocalSphere learns your style and takes care of communication busywork.",
      icon: Bot,
      gradient: "from-indigo-600 to-purple-700"
    }
  ]
}

const variantStyles = {
  "timezone-freedom": {
    bgColor: "bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800",
    headerColor: "text-white",
    subColor: "text-white/90"
  },
  "information-findability": {
    bgColor: "bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800",
    headerColor: "text-white", 
    subColor: "text-white/90"
  },
  "unified-productivity": {
    bgColor: "bg-gradient-to-br from-purple-600 via-purple-700 to-violet-800",
    headerColor: "text-white",
    subColor: "text-white/90"
  }
}

export function FeaturesSection({ variant }: FeaturesSectionProps) {
  const features = featuresContent[variant]
  const styles = variantStyles[variant]
  
  return (
    <section className={`py-20 px-4 ${styles.bgColor} relative overflow-hidden`}>
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="features-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="0.5" fill="white" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#features-pattern)" />
        </svg>
      </div>
      
      {/* Enhanced Visual Elements */}
      <ParticleField variant={variant} />
      <GradientOrb variant={variant} className="-top-40 -right-40" />
      <GradientOrb variant={variant} className="-bottom-40 -left-40" size="small" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl opacity-30"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedSection direction="up" delay={0.2}>
            <h2 className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${styles.headerColor}`}>
              Everything Your Remote Team Needs
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.4}>
            <p className={`text-lg md:text-xl max-w-4xl mx-auto mb-8 ${styles.subColor} font-medium`}>
              Stop switching between apps. Start working asynchronously without missing anything important.
            </p>
          </AnimatedSection>
        </div>
        
        {/* Features Grid */}
        <AnimatedStagger className="grid md:grid-cols-2 gap-8 mb-16" staggerDelay={0.1}>
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <AnimatedStaggerItem key={index}>
                <GlassMorphicCard className="p-8 h-full group">
                  {/* Icon */}
                  <FloatingIcon delay={index * 0.2}>
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <IconComponent className="text-white" size={28} />
                    </motion.div>
                  </FloatingIcon>
                  
                  {/* Content */}
                  <motion.h3 
                    className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight"
                    initial={{ opacity: 0.9 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p 
                    className="text-white/80 leading-relaxed"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {feature.description}
                  </motion.p>

                  {/* Hover indicator */}
                  <motion.div
                    className={`mt-6 w-0 h-1 bg-gradient-to-r ${feature.gradient} rounded-full`}
                    whileHover={{ width: "100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                </GlassMorphicCard>
              </AnimatedStaggerItem>
            )
          })}
        </AnimatedStagger>

        {/* Bottom CTA */}
        <AnimatedSection direction="up" delay={1.2} className="text-center">
          <div className="max-w-lg mx-auto">
            <p className={`text-lg font-medium mb-6 ${styles.subColor}`}>
              Ready to streamline your remote team&apos;s workflow?
            </p>
            <EmailCaptureCTA variant={variant} section="features" />
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}