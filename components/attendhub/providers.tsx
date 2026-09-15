"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { AttendHubProvider } from "./provider"
import { AppShell } from "./app-shell"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <AttendHubProvider>
        <AppShell>{children}</AppShell>
      </AttendHubProvider>
    </ThemeProvider>
  )
}
