import { AnimatedSection, AnimatedStagger, AnimatedStaggerItem } from "@/components/ui/animated-section"
import { motion } from "framer-motion"
import { AlertTriangle, Clock, Search, Zap, Brain, MessageSquareOff } from "lucide-react"

interface ProblemSectionProps {
  variant: "timezone-freedom" | "information-findability" | "unified-productivity"
}

const problemContent = {
  "timezone-freedom": {
    title: "Your Team Shouldn't Have to Choose Between Sleep and Success",
    subtitle: "Remote teams face daily productivity killers that traditional tools can't solve",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    problems: [
      {
        title: "3 AM Meetings Are Killing Your Team",
        description: "Remote workers sacrifice their health and personal time to accommodate global schedules, leading to burnout and turnover.",
        icon: Clock,
        stat: "67% higher turnover"
      },
      {
        title: "Important Decisions Happen While You Sleep", 
        description: "Critical discussions and updates occur across time zones, leaving team members out of the loop and behind on progress.",
        icon: AlertTriangle,
        stat: "4 hours average delay"
      },
      {
        title: "Productivity Dies in Translation",
        description: "Constant context switching between time zones disrupts deep work and reduces overall team effectiveness.",
        icon: Brain,
        stat: "40% productivity loss"
      }
    ]
  },
  "information-findability": {
    title: "Your Team's Knowledge Is Scattered and Inaccessible",
    subtitle: "Teams waste hours searching for information that should be instantly available",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    problems: [
      {
        title: "Hunt for Information, Not Solutions",
        description: "Teams waste 2+ hours daily searching through Slack threads, email chains, and shared drives for basic information.",
        icon: Search,
        stat: "2.5 hours wasted daily"
      },
      {
        title: "Critical Knowledge Lives in Someone's Head",
        description: "When the person with the answer is unavailable, entire projects grind to a halt waiting for simple clarification.",
        icon: MessageSquareOff,
        stat: "3x longer project delays"
      },
      {
        title: "Outdated Information Leads to Wrong Decisions",
        description: "Teams make costly mistakes using old information because the latest updates are buried in fragmented communication channels.",
        icon: AlertTriangle,
        stat: "$50K+ in rework costs"
      }
    ]
  },
  "unified-productivity": {
    title: "Tool Chaos Is Destroying Your Team's Focus",
    subtitle: "App fragmentation creates more problems than it solves for remote teams",
    color: "text-purple-600", 
    bgColor: "bg-purple-50",
    problems: [
      {
        title: "App Switching Burns Mental Energy",
        description: "Teams lose 40% of productive time juggling between 10+ different apps, never able to maintain deep focus on actual work.",
        icon: Zap,
        stat: "10+ apps per day"
      },
      {
        title: "Important Messages Get Lost in the Noise",
        description: "Critical communications disappear in the flood of notifications across email, Slack, Teams, and project management tools.",
        icon: MessageSquareOff,
        stat: "23% messages missed"
      },
      {
        title: "Context Dies Between Applications", 
        description: "Teams spend more time explaining what was already been discussed because conversations are spread across multiple platforms.",
        icon: Brain,
        stat: "2x communication overhead"
      }
    ]
  }
}

export function ProblemSection({ variant }: ProblemSectionProps) {
  const content = problemContent[variant]
  
  return (
    <section className={`py-20 px-4 ${content.bgColor} relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="problem-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="currentColor" className={content.color} opacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#problem-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedSection direction="up" delay={0.2}>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {content.title}
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.4}>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              {content.subtitle}
            </p>
          </AnimatedSection>
        </div>
        
        {/* Problem Cards */}
        <AnimatedStagger className="grid md:grid-cols-3 gap-8" staggerDelay={0.2}>
          {content.problems.map((problem, index) => {
            const IconComponent = problem.icon
            return (
              <AnimatedStaggerItem key={index}>
                <motion.div 
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 backdrop-blur-sm h-full"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Icon and Stat */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-xl ${content.bgColor} ${content.color} flex items-center justify-center`}>
                      <IconComponent size={24} />
                    </div>
                    <span className={`text-sm font-bold ${content.color} bg-white px-3 py-1 rounded-full border`}>
                      {problem.stat}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                    {problem.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {problem.description}
                  </p>
                </motion.div>
              </AnimatedStaggerItem>
            )
          })}
        </AnimatedStagger>

        {/* Bottom CTA Hint */}
        <AnimatedSection direction="up" delay={1.2} className="text-center mt-16">
          <p className="text-lg text-gray-700 font-medium">
            These problems cost your team <span className={`font-bold ${content.color}`}>thousands of dollars</span> every month
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}