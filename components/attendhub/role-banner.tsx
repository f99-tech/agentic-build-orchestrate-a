"use client"

import { ShieldCheck } from "lucide-react"
import { accessLabel } from "@/lib/attendhub/data"
import { EmojiAvatar } from "./emoji-avatar"
import { useAttendHub } from "./provider"

export function RoleBanner() {
  const { user } = useAttendHub()

  return (
    <div
      className="animate-fade-up flex items-center gap-3 rounded-2xl border border-border bg-card/70 p-3 pr-4 shadow-sm backdrop-blur-sm"
      style={{
        backgroundImage: `linear-gradient(to right, color-mix(in oklch, ${user.color} 16%, transparent), transparent 55%)`,
      }}
    >
      <EmojiAvatar emoji={user.emoji} color={user.color} size="md" />
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold">Signed in as {user.name}</p>
        <p className="truncate text-xs text-muted-foreground">
          {user.title} · {user.dept}
        </p>
      </div>
      <span
        className="ml-auto hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ring-1 ring-inset sm:inline-flex"
        style={{
          color: user.color,
          backgroundColor: `color-mix(in oklch, ${user.color} 12%, transparent)`,
          boxShadow: `inset 0 0 0 1px color-mix(in oklch, ${user.color} 25%, transparent)`,
        }}
      >
        <ShieldCheck className="size-3.5" />
        {accessLabel(user.access)}
      </span>
    </div>
  )
}
