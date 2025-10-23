"use client"

import {useEffect, useMemo, useState} from "react"
import dynamic from "next/dynamic"
import {useTheme} from "next-themes"

// Load the dock client-side only to avoid prod SSR bundling issues
const MacOSDock = dynamic(
  () => import("@/components/ui/shadcn-io/mac-os-dock").then(m => m.MacOSDock),
  {ssr: false}
)

type App = { id: string; icon: string; name?: string }

// Group apps by base id and select the themed icon
function selectThemedApps(apps: App[], isDark: boolean): App[] {
  const groups = new Map<string, {light?: App; dark?: App; neutral?: App; order: number}>()

  apps.forEach((a, i) => {
    const m = a.id.match(/^(.*?)-(light|dark)$/)
    const base = m ? m[1] : a.id
    const tone = (m ? m[2] : "neutral") as "light" | "dark" | "neutral"
    const g = groups.get(base) ?? {order: i}
    g[tone] = a
    if (!groups.has(base)) groups.set(base, g)
  })

  return [...groups.entries()]
    .sort((a, b) => a[1].order - b[1].order)
    .map(([base, g]) => {
      const pick = (isDark ? g.dark : g.light) ?? g.neutral ?? g.light ?? g.dark
      return {id: base, icon: pick?.icon ?? "", name: pick?.name ?? base}
    })
    .filter(a => a.icon)
}

export default function DockController({apps}: {apps: App[]}) {
  const {resolvedTheme} = useTheme()
  const [mounted, setMounted] = useState(false)
  const [openApps, setOpenApps] = useState<string[]>([])

  useEffect(() => setMounted(true), [])

  const themedApps = useMemo(() => {
    const isDark = resolvedTheme === "dark"
    return selectThemedApps(apps, isDark)
  }, [apps, resolvedTheme])

  const handleAppClick = (id: string) =>
    setOpenApps(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]))

  if (!mounted) return null

  return (
    <div className="fixed bottom-6 left-0 right-0 z-[9999] flex justify-center pointer-events-none">
      <div className="pointer-events-auto">
        <MacOSDock apps={themedApps} openApps={openApps} onAppClick={handleAppClick} />
      </div>
    </div>
  )
}