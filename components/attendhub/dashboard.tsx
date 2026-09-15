"use client"

import { CalendarCheck, Clock, Eye, LogIn, LogOut, RotateCcw, UserX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { hoursBetween, statusMeta, visibleStaff } from "@/lib/attendhub/data"
import { EmojiAvatar } from "./emoji-avatar"
import { LiveClock } from "./live-clock"
import { StatusBadge } from "./status-badge"
import { useAttendHub } from "./provider"

function StatCard({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode
  value: number
  label: string
  color: string
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <span
        className="inline-grid size-9 place-items-center rounded-lg"
        style={{
          color,
          backgroundColor: `color-mix(in oklch, ${color} 14%, transparent)`,
        }}
      >
        {icon}
      </span>
      <p className="mt-3 text-2xl font-semibold tabular-nums tracking-tight">{value}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
    </div>
  )
}

export function Dashboard() {
  const { user, recordsFor, todayRecord, checkIn, checkOut, resetDemo } = useAttendHub()

  const today = todayRecord(user.id)
  const mine = recordsFor(user.id).filter((r) => r.status !== "weekend")
  const presentish = mine.filter((r) => r.in)
  const late = mine.filter((r) => r.status === "late").length
  const absent = mine.filter((r) => r.status === "absent").length
  const team = visibleStaff(user)
  const teamToday = team.map((p) => ({ p, r: todayRecord(p.id) }))
  const inOffice = teamToday.filter(
    (x) => x.r && (x.r.status === "checked-in" || x.r.in) && x.r.status !== "absent" && x.r.status !== "weekend",
  ).length

  const scopeNote =
    user.access === "admin"
      ? "You can see every department."
      : user.access === "supervisor"
        ? `You can see the ${user.dept} team (${team.length} people).`
        : "You can only see your own punches."

  const dateLabel = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  })

  const showCheckIn = !today || !today.in
  const showCheckOut = !!(today && today.in && (!today.out || today.status === "checked-in"))
  const done = !!(today && today.in && today.out && today.status !== "checked-in")

  return (
    <div className="space-y-6">
      {/* Hero */}
      <section
        className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
        style={{
          backgroundImage: `radial-gradient(120% 120% at 0% 0%, color-mix(in oklch, ${user.color} 16%, var(--card)), var(--card) 60%)`,
        }}
      >
        <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <EmojiAvatar emoji={user.emoji} color={user.color} size="lg" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Good day
              </p>
              <h1 className="text-2xl font-semibold tracking-tight">{user.name}</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {user.title} · {user.dept} — {scopeNote}
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-border/70 bg-background/60 px-5 py-3 text-center backdrop-blur-sm">
            <LiveClock className="block font-mono text-2xl font-semibold tabular-nums" />
            <small className="text-xs text-muted-foreground">{dateLabel}</small>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard icon={<CalendarCheck className="size-4" />} value={presentish.length} label="Days present (14-day sample)" color="#0d9488" />
        <StatCard icon={<Clock className="size-4" />} value={late} label="Late days" color="#d97706" />
        <StatCard icon={<UserX className="size-4" />} value={absent} label="Absent days" color="#e11d48" />
        <StatCard icon={<Eye className="size-4" />} value={team.length} label="People in your view" color={user.color} />
      </section>

      {/* Today's punch */}
      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Today&apos;s punch</h2>
          {today ? (
            <StatusBadge status={today.status} />
          ) : (
            <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-border">
              Not started
            </span>
          )}
        </div>

        {today ? (
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { label: "In", value: today.in || "—" },
              { label: "Out", value: today.out || "—" },
              { label: "Hours", value: hoursBetween(today.in, today.out) },
            ].map((cell) => (
              <div key={cell.label} className="rounded-xl border border-border bg-background/50 px-4 py-3">
                <p className="text-xs text-muted-foreground">{cell.label}</p>
                <p className="mt-1 font-mono text-lg font-semibold tabular-nums">{cell.value}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">No punch yet today. Use the button below.</p>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-3">
          {showCheckIn && (
            <Button onClick={checkIn}>
              <LogIn className="size-4" />
              Check in now
            </Button>
          )}
          {showCheckOut && (
            <Button onClick={checkOut} className="bg-amber-600 text-white hover:bg-amber-600/90">
              <LogOut className="size-4" />
              Check out now
            </Button>
          )}
          {done && (
            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
              You already closed today&apos;s shift. Nice work.
            </p>
          )}
          <Button variant="ghost" onClick={resetDemo} className="text-muted-foreground">
            <RotateCcw className="size-4" />
            Reset demo punches
          </Button>
        </div>
      </section>

      {/* Team today */}
      {user.access !== "staff" && (
        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">
              {user.access === "admin" ? "Who is in today" : "My team today"}
            </h2>
            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
              {inOffice} punched in
            </span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {teamToday.map(({ p, r }) => {
              const meta = r ? statusMeta(r.status) : statusMeta("absent")
              return (
                <article
                  key={p.id}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background/40 p-3"
                >
                  <EmojiAvatar emoji={p.emoji} color={p.color} size="sm" />
                  <div className="min-w-0">
                    <strong className="block truncate text-sm font-medium">{p.name}</strong>
                    <p className="truncate text-xs text-muted-foreground">{p.title}</p>
                  </div>
                  <StatusBadge
                    className="ml-auto"
                    status={r ? r.status : "absent"}
                    label={r && r.in ? r.in : meta.label}
                  />
                </article>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
