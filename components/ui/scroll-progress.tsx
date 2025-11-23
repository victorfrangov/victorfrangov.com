"use client"

import { motion, useScroll, useSpring } from "framer-motion"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface ScrollProgressProps {
  className?: string
  barClassName?: string
}

export function ScrollProgress({ className, barClassName }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()
  // Smooth spring
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  // Hide until mounted to avoid hydration mismatch
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return (
    <div
      className={cn(
        "absolute inset-x-0 bottom-0 h-1 w-full overflow-hidden bg-transparent",
        className
      )}
    >
      {mounted && (
        <motion.div
          style={{ scaleX }}
          className={cn(
            "origin-left h-full",
            barClassName
          )}
        />
      )}
    </div>
  )
}
