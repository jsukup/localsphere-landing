"use client"

export function GeometricPattern({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="geometric-pattern"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="25" cy="25" r="1" fill="currentColor" opacity="0.1" />
            <circle cx="75" cy="75" r="1" fill="currentColor" opacity="0.1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#geometric-pattern)" />
      </svg>
    </div>
  )
}

export function GridBackground({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid-pattern"
            x="0"
            y="0"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.3"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
    </div>
  )
}

export function FloatingElements({ variant }: { variant: "timezone-freedom" | "information-findability" | "unified-productivity" }) {
  const colors = {
    "timezone-freedom": "from-blue-400/20 to-indigo-400/20",
    "information-findability": "from-emerald-400/20 to-teal-400/20", 
    "unified-productivity": "from-purple-400/20 to-violet-400/20"
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className={`absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br ${colors[variant]} rounded-full blur-3xl animate-pulse`} />
      <div className={`absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr ${colors[variant]} rounded-full blur-2xl animate-pulse`} style={{ animationDelay: '2s' }} />
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial ${colors[variant]} rounded-full blur-3xl opacity-30`} />
    </div>
  )
}