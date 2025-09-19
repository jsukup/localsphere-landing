import { AnimatedSection, AnimatedStagger, AnimatedStaggerItem } from "@/components/ui/animated-section"
import { motion } from "framer-motion"
import { Bot, Zap, Link, Search, Database, Layers, Clock, Target } from "lucide-react"
import { EmailCaptureCTA } from "@/components/ui/email-capture-cta"

interface SolutionSectionProps {
  variant: "timezone-freedom" | "information-findability" | "unified-productivity"
}

const solutionContent = {
  "timezone-freedom": {
    title: "Work Your Hours. Stay Connected.",
    subtitle: "LocalSphere automatically coordinates across time zones so your team stays synced without sacrificing sleep",
    mainBenefit: "Finally work in your timezone while staying perfectly synced with global teams",
    color: "text-blue-600",
    bgColor: "bg-blue-50", 
    gradientFrom: "from-blue-600",
    gradientTo: "to-indigo-600",
    features: [
      {
        title: "AI Twin Representation",
        description: "Your AI twin attends meetings, captures decisions, and keeps everyone updated on your progress—even when you're offline.",
        icon: Bot
      },
      {
        title: "Smart Timezone Coordination", 
        description: "Automatic scheduling and async updates ensure nothing important is missed, regardless of when team members are online.",
        icon: Clock
      },
      {
        title: "Context-Aware Summaries",
        description: "Wake up to personalized briefings of everything that happened while you were sleeping, tailored to your role and projects.",
        icon: Target
      }
    ]
  },
  "information-findability": {
    title: "Ask Any Question. Get Instant Answers.",
    subtitle: "LocalSphere's AI indexes all your communication channels so you can find any decision, update, or file in seconds",
    mainBenefit: "Stop digging through Slack threads, email chains, and shared drives forever",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    gradientFrom: "from-emerald-600", 
    gradientTo: "to-teal-600",
    features: [
      {
        title: "Universal Search Intelligence",
        description: "Ask natural language questions like 'What's our Q3 budget?' and get instant, accurate answers from all your communication channels.",
        icon: Search
      },
      {
        title: "Smart Context Linking",
        description: "Every piece of information is automatically connected to related discussions, decisions, and documents across all platforms.",
        icon: Link
      },
      {
        title: "Always-Current Knowledge Base",
        description: "AI continuously updates your company knowledge base, ensuring information never becomes stale or outdated.",
        icon: Database
      }
    ]
  },
  "unified-productivity": {
    title: "One Platform. Infinite Possibilities.",
    subtitle: "LocalSphere brings together email, chat, tasks, and knowledge sharing into one intelligent command center",
    mainBenefit: "No more juggling 10 different apps or missing important messages",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    gradientFrom: "from-purple-600",
    gradientTo: "to-violet-600", 
    features: [
      {
        title: "Unified Communication Hub",
        description: "All your team's communication—email, chat, video calls, project updates—flows through one intelligent interface.",
        icon: Layers
      },
      {
        title: "Smart Priority Management", 
        description: "AI automatically surfaces what needs your attention and handles routine communication so you can focus on meaningful work.",
        icon: Target
      },
      {
        title: "Seamless Tool Integration",
        description: "Connect all your existing tools while eliminating the need to constantly switch between applications throughout your day.",
        icon: Zap
      }
    ]
  }
}

export function SolutionSection({ variant }: SolutionSectionProps) {
  const content = solutionContent[variant]
  
  return (
    <section className="py-20 px-4 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-64 bg-gradient-to-b from-gray-50 to-transparent rounded-b-full opacity-60"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedSection direction="up" delay={0.2}>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {content.title}
            </h2>
          </AnimatedSection>
          
          <AnimatedSection direction="up" delay={0.4}>
            <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto mb-8 font-medium">
              {content.subtitle}
            </p>
          </AnimatedSection>
          
          <AnimatedSection direction="up" delay={0.6}>
            <div className={`${content.bgColor} border-2 border-white rounded-2xl p-8 max-w-4xl mx-auto shadow-lg backdrop-blur-sm`}>
              <p className={`text-lg md:text-xl font-bold ${content.color}`}>
                ✨ {content.mainBenefit}
              </p>
            </div>
          </AnimatedSection>
        </div>
        
        {/* Features Grid */}
        <AnimatedStagger className="grid md:grid-cols-3 gap-8 mb-16" staggerDelay={0.15}>
          {content.features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <AnimatedStaggerItem key={index}>
                <motion.div 
                  className="text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Icon */}
                  <div className={`w-20 h-20 bg-gradient-to-br ${content.gradientFrom} ${content.gradientTo} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <IconComponent className="text-white" size={32} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </AnimatedStaggerItem>
            )
          })}
        </AnimatedStagger>

        {/* Bottom CTA */}
        <AnimatedSection direction="up" delay={1.0} className="text-center">
          <div className="max-w-md mx-auto">
            <p className="text-lg font-medium text-gray-700 mb-6">
              Ready to transform your remote team&apos;s productivity?
            </p>
            <EmailCaptureCTA variant={variant} section="solution" />
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}