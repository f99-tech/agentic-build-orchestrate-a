"use client"

import { motion } from "motion/react"
import { CalendarCheck, Clock, Eye, LogIn, LogOut, RotateCcw, UserX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { hoursBetween, statusMeta, visibleStaff } from "@/lib/attendhub/data"
import { CountUp } from "./count-up"
import { EmojiAvatar } from "./emoji-avatar"
import { LiveClock } from "./live-clock"
import { LiveTicker } from "./live-ticker"
import { StatusBadge } from "./status-badge"
import { useAttendHub } from "./provider"

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 24 } },
}

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
    <motion.div
      variants={item}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card/80 p-4 shadow-sm backdrop-blur-sm"
    >
      {/* shimmer sweep on hover */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:animate-shimmer group-hover:opacity-100" />
      <span
        className="inline-grid size-10 place-items-center rounded-xl ring-1 ring-inset"
        style={{
          color,
          backgroundColor: `color-mix(in oklch, ${color} 16%, transparent)`,
          boxShadow: `inset 0 0 0 1px color-mix(in oklch, ${color} 30%, transparent), 0 0 22px color-mix(in oklch, ${color} 22%, transparent)`,
        }}
      >
        {icon}
      </span>
      <p className="mt-3 text-3xl font-semibold tabular-nums tracking-tight">
        <CountUp value={value} />
      </p>
      <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
    </motion.div>
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
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Hero */}
      <motion.section
        variants={item}
        className="relative overflow-hidden rounded-3xl border border-border bg-card/80 shadow-lg backdrop-blur-sm"
      >
        {/* animated glow */}
        <div
          className="animate-gradient-x pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage: `radial-gradient(120% 140% at 0% 0%, color-mix(in oklch, ${user.color} 30%, transparent), transparent 55%), radial-gradient(120% 140% at 100% 100%, color-mix(in oklch, var(--primary) 22%, transparent), transparent 55%)`,
          }}
        />
        <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
              className="relative"
            >
              <span className="absolute inset-0 rounded-2xl animate-ring-ping" style={{ background: `color-mix(in oklch, ${user.color} 40%, transparent)` }} />
              <EmojiAvatar emoji={user.emoji} color={user.color} size="lg" className="animate-float" />
            </motion.div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Good day</p>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{user.name}</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {user.title} · {user.dept} — {scopeNote}
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-border/70 bg-background/50 px-5 py-3 text-center backdrop-blur-md">
            <LiveClock className="block font-mono text-2xl font-semibold tabular-nums sm:text-3xl" />
            <small className="text-xs text-muted-foreground">{dateLabel}</small>
          </div>
        </div>
      </motion.section>

      {/* Live ticker */}
      <motion.div variants={item}>
        <LiveTicker />
      </motion.div>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard icon={<CalendarCheck className="size-5" />} value={presentish.length} label="Days present (14-day sample)" color="#2dd4bf" />
        <StatCard icon={<Clock className="size-5" />} value={late} label="Late days" color="#fbbf24" />
        <StatCard icon={<UserX className="size-5" />} value={absent} label="Absent days" color="#fb7185" />
        <StatCard icon={<Eye className="size-5" />} value={team.length} label="People in your view" color={user.color} />
      </section>

      {/* Today's punch */}
      <motion.section
        variants={item}
        className="relative overflow-hidden rounded-2xl border border-border bg-card/80 p-5 shadow-sm backdrop-blur-sm"
      >
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
            ].map((cell, i) => (
              <motion.div
                key={cell.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                className="rounded-xl border border-border bg-background/40 px-4 py-3"
              >
                <p className="text-xs text-muted-foreground">{cell.label}</p>
                <p className="mt-1 font-mono text-lg font-semibold tabular-nums">{cell.value}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">No punch yet today. Use the button below.</p>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-3">
          {showCheckIn && (
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Button onClick={checkIn} className="relative overflow-hidden shadow-[0_0_20px_-4px_var(--primary)]">
                <LogIn className="size-4" />
                Check in now
              </Button>
            </motion.div>
          )}
          {showCheckOut && (
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Button onClick={checkOut} className="bg-amber-500 text-black hover:bg-amber-400">
                <LogOut className="size-4" />
                Check out now
              </Button>
            </motion.div>
          )}
          {done && (
            <p className="text-sm font-medium text-emerald-400">You already closed today&apos;s shift. Nice work.</p>
          )}
          <Button variant="ghost" onClick={resetDemo} className="text-muted-foreground">
            <RotateCcw className="size-4" />
            Reset demo punches
          </Button>
        </div>
      </motion.section>

      {/* Team today */}
      {user.access !== "staff" && (
        <motion.section
          variants={item}
          className="rounded-2xl border border-border bg-card/80 p-5 shadow-sm backdrop-blur-sm"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">
              {user.access === "admin" ? "Who is in today" : "My team today"}
            </h2>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/12 px-2.5 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/25">
              <span className="relative grid size-2 place-items-center">
                <span className="absolute size-2 rounded-full bg-primary animate-ring-ping" />
                <span className="size-1.5 rounded-full bg-primary" />
              </span>
              {inOffice} punched in
            </span>
          </div>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {teamToday.map(({ p, r }) => {
              const meta = r ? statusMeta(r.status) : statusMeta("absent")
              return (
                <motion.article
                  key={p.id}
                  variants={item}
                  whileHover={{ y: -3, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
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
                </motion.article>
              )
            })}
          </motion.div>
        </motion.section>
      )}
    </motion.div>
  )
}
