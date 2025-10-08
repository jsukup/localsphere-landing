"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import ThemeToggle from "./theme-toggle"
import { useTheme } from "next-themes"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const router = useRouter()

  // Ensure component is mounted before rendering theme-dependent elements
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      // Update header background when scrolled
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Initial check in case page is loaded scrolled down
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Handle logo click with theme preservation
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()

    // Use router.push instead of Link's default behavior
    router.push("/")
  }

  // Determine which logo to show based on theme
  const logoSrc = mounted && resolvedTheme === "dark" ? "/logo-light.png" : "/logo-dark.png"

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled ? "bg-white/90 dark:bg-[#111111]/90 backdrop-blur-sm shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center" onClick={handleLogoClick}>
              {/* Use a div with the same dimensions during SSR to prevent layout shift */}
              {mounted ? (
                <Image
                  src={logoSrc || "/placeholder.svg"}
                  alt="LocalSphere Logo"
                  width={200}
                  height={50}
                  className="h-12 w-auto"
                  priority
                />
              ) : (
                <div className="h-12 w-[200px]" />
              )}
            </Link>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
