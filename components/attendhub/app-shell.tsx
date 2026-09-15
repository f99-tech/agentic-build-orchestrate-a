"use client"

import { Loader2 } from "lucide-react"
import { RoleBanner } from "./role-banner"
import { Topbar } from "./topbar"
import { useAttendHub } from "./provider"

export function AppShell({ children }: { children: React.ReactNode }) {
  const { ready } = useAttendHub()

  return (
    <div className="flex min-h-svh flex-col">
      <Topbar />
      {ready ? (
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <div className="animate-fade-up space-y-6">
            <RoleBanner />
            {children}
          </div>
        </main>
      ) : (
        <main className="mx-auto grid w-full max-w-6xl flex-1 place-items-center px-4 py-24">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </main>
      )}
      <footer className="border-t border-border/70">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-1 px-4 py-6 text-center text-xs text-muted-foreground sm:px-6">
          <p>
            AttendHub demo · runs entirely in your browser · roles change what you can see · 30
            employees + 1 manager
          </p>
        </div>
      </footer>
    </div>
  )
}
