"use client"

import { ReactNode, useEffect, useId, useRef, useState } from "react"
import { createPortal } from "react-dom"

type Props = {
  children: ReactNode
  group: string | number
  offsetX?: number // px from the left of the wrapped text
  offsetY?: number // px from the top of the wrapped text
  scale?: number   // uniform scale
  angle?: number   // deg
  color?: string
  over?: boolean   // multiply blend
  spriteSrc?: string
  spriteViewBox?: string // must match your marker-lines.svg
}

export function Highlight({
  children,
  group,
  offsetX = 0,
  offsetY = 0,
  scale = 1,
  angle = 0,
  color = "rgba(234,179,8,0.7)",
  over = true,
  spriteSrc = "/marker-lines.svg",
  spriteViewBox = "0 0 600 450",
}: Props) {
  const anchorRef = useRef<HTMLSpanElement | null>(null)
  const [rect, setRect] = useState<DOMRect | null>(null)
  const [mounted, setMounted] = useState(false)
  const maskId = useId().replace(/:/g, "_")
  const groupId = typeof group === "number" ? `line-${group}` : group

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const el = anchorRef.current
    if (!el) return

    const measure = () => {
      const r = el.getBoundingClientRect()
      setRect(r)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener("resize", measure, { passive: true })
    window.addEventListener("scroll", measure, { passive: true })
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measure)
      window.removeEventListener("scroll", measure)
    }
  }, [])

  const [,_vbY,_vbW,_vbH] = spriteViewBox.split(/[\s,]+/).map(Number)
  const vbW = Number.isFinite(_vbW) ? _vbW : 600
  const vbH = Number.isFinite(_vbH) ? _vbH : 450

  const overlay =
    rect &&
    createPortal(
      <svg
        aria-hidden
        viewBox={spriteViewBox}
        preserveAspectRatio="none"
        style={{
          position: "fixed",
          left: `${Math.round(rect.left + offsetX)}px`,
          top: `${Math.round(rect.top + offsetY)}px`,
          width: `${vbW * scale}px`,
          height: `${vbH * scale}px`,
          transform: `rotate(${angle}deg)`,
          transformOrigin: "top left",
          pointerEvents: "none",
          zIndex: 2147483647,
          mixBlendMode: over ? ("multiply" as const) : undefined,
        }}
      >
        <defs>
          <mask id={maskId}>
            <use href={`${spriteSrc}#${groupId}`} fill="#fff" />
          </mask>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill={color} mask={`url(#${maskId})`} />
      </svg>,
      document.body
    )

  return (
    <span ref={anchorRef} style={{ position: "relative" }}>
      {children}
      {mounted && overlay}
    </span>
  )
}