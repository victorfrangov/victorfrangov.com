"use client"

import { useEffect, useMemo, useState } from "react"
import { useTheme } from "next-themes"
import { MacOSDock } from "@/components/ui/shadcn-io/mac-os-dock"

type App = { id: string; icon: string; name?: string }

export default function DockController({ apps }: { apps: App[] }) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [openApps, setOpenApps] = useState<string[]>([]) // closed by default

  useEffect(() => setMounted(true), [])

  // Merge light/dark pairs into one logical app and pick the icon for the current theme.
  const themedApps = useMemo(() => {
    const map = new Map<
      string,
      { base: string; light?: App; dark?: App; neutral?: App; firstIndex: number }
    >()

    apps.forEach((a, i) => {
      const m = a.id.match(/^(.*?)-(light|dark)$/)
      const base = m ? m[1] : a.id
      const tone = m ? (m[2] as "light" | "dark") : "neutral"
      const entry = map.get(base) ?? { base, firstIndex: i }
      entry[tone] = a
      if (!map.has(base)) map.set(base, entry)
    })

    const wantDark = resolvedTheme === "dark"
    const out: App[] = []
    ;[...map.values()]
      .sort((a, b) => a.firstIndex - b.firstIndex)
      .forEach(({ base, light, dark, neutral }) => {
        const pick = (wantDark ? dark : light) ?? neutral ?? light ?? dark
        if (!pick) return
        out.push({ id: base, icon: pick.icon, name: pick.name ?? base })
      })
    return out
  }, [apps, resolvedTheme])

  if (!mounted) return null

  return (
    <div className="fixed bottom-6 left-0 right-0 z-[9999] flex justify-center pointer-events-none">
      <div className="pointer-events-auto">
        <MacOSDock
          apps={themedApps}
          openApps={openApps}
          onAppClick={(id: string) =>
            setOpenApps(prev =>
              prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
            )
          }
        />
      </div>
    </div>
  )
}