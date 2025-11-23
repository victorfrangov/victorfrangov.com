"use client"

import React, {
  ComponentPropsWithoutRef,
  FC,
  ReactNode,
  useRef
} from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { cn } from "@/lib/utils"

export interface TextRevealProps extends ComponentPropsWithoutRef<"span"> {
  children: ReactNode
  noBlur?: boolean
}

export const TextReveal: FC<TextRevealProps> = ({
  children,
  className,
  noBlur = false,
  ...rest
}) => {
  // Observe a plain span (stable for IntersectionObserver)
  const ref = useRef<HTMLSpanElement | null>(null)
  const inView = useInView(ref, { once: true, margin: "-25% 0px -10% 0px" })

  const variants = {
    hidden: {
      opacity: 0.2,
      y: 12,
      filter: noBlur ? "brightness(0.6)" : "blur(4px) brightness(0.6)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px) brightness(1)",
      transition: { duration: 1.1, ease: [0.25, 0.8, 0.25, 1] }
    }
  }

  return (
    <span ref={ref} className={cn(className)} {...rest}>
      <motion.span
        className="contents"
        variants={variants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {children}
      </motion.span>
    </span>
  )
}
