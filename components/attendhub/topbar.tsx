"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { CalendarDays, Clock3, LayoutDashboard, Moon, Sun, User, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { STAFF, roleTag } from "@/lib/attendhub/data"
import { useAttendHub } from "./provider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-grid size-9 place-items-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      aria-label="Switch theme"
      title="Switch theme"
    >
      {mounted && isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  )
}

export function Topbar() {
  const pathname = usePathname()
  const { user, userId, setUserId } = useAttendHub()
  const canTeam = user.access !== "staff"

  const links = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/records", label: "Records", icon: CalendarDays },
    {
      href: "/people",
      label: canTeam ? "People" : "My card",
      icon: canTeam ? Users : User,
    },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="inline-grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Clock3 className="size-5" />
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <strong className="text-sm font-semibold tracking-tight">AttendHub</strong>
            <small className="text-[11px] text-muted-foreground">Role-based attendance</small>
          </span>
        </Link>

        <nav className="ml-2 flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors sm:px-3",
                  active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                )}
              >
                <Icon className="size-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <span className="text-xs font-medium text-muted-foreground">View as</span>
            <Select value={userId} onValueChange={setUserId}>
              <SelectTrigger className="h-9 w-[230px] bg-card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[360px]">
                {STAFF.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    <span className="mr-1">{s.emoji}</span>
                    {s.name}
                    <span className="text-muted-foreground"> · {roleTag(s.access)}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Compact role switcher for small screens */}
      <div className="border-t border-border/60 px-4 py-2 md:hidden">
        <Select value={userId} onValueChange={setUserId}>
          <SelectTrigger className="h-9 w-full bg-card">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="max-h-[360px]">
            {STAFF.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                <span className="mr-1">{s.emoji}</span>
                {s.name}
                <span className="text-muted-foreground"> · {roleTag(s.access)}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </header>
  )
}
