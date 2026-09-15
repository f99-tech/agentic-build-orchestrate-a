"use client"

import { Activity } from "lucide-react"
import { statusMeta, visibleStaff } from "@/lib/attendhub/data"
import { useAttendHub } from "./provider"

/** Infinite marquee of the current user's visible team + today's status. */
export function LiveTicker() {
  const { user, todayRecord } = useAttendHub()
  const team = visibleStaff(user)

  const items = team.map((p) => {
    const r = todayRecord(p.id)
    const meta = r ? statusMeta(r.status) : statusMeta("absent")
    const time = r && r.in ? r.in : meta.label
    return { id: p.id, emoji: p.emoji, name: p.name, time, label: meta.label }
  })

  if (items.length === 0) return null

  // Duplicate the list so the -50% marquee loop is seamless.
  const loop = [...items, ...items]

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/70 py-2.5 backdrop-blur-sm">
      <div className="pointer-events-none absolute left-0 top-0 z-10 flex h-full items-center gap-1.5 bg-gradient-to-r from-card via-card/90 to-transparent pl-3 pr-8 text-xs font-semibold text-primary">
        <Activity className="size-3.5 animate-pulse-dot" />
        <span className="hidden sm:inline">LIVE</span>
      </div>
      <div className="animate-marquee flex w-max items-center gap-6 whitespace-nowrap pl-20">
        {loop.map((it, i) => (
          <span key={it.id + "-" + i} className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="text-sm">{it.emoji}</span>
            <span className="font-medium text-foreground">{it.name}</span>
            <span className="text-muted-foreground/70">·</span>
            <span className="font-mono tabular-nums">{it.time}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
