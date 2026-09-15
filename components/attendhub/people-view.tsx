"use client"

import Link from "next/link"
import { ArrowRight, Mail } from "lucide-react"
import { accessLabel, roleTag, statusMeta, visibleStaff, STAFF } from "@/lib/attendhub/data"
import { EmojiAvatar } from "./emoji-avatar"
import { StatusBadge } from "./status-badge"
import { useAttendHub } from "./provider"

export function PeopleView() {
  const { user, recordsFor, todayRecord } = useAttendHub()
  const list = visibleStaff(user)
  const locked = STAFF.length - list.length

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-lg font-semibold tracking-tight">
          {user.access === "staff" ? "Your staff card" : "People in your access"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {accessLabel(user.access)}. Showing <b className="text-foreground">{list.length}</b> of{" "}
          {STAFF.length} people.{" "}
          {locked
            ? `${locked} profiles are hidden because of your role.`
            : "Manager view — nothing is hidden."}
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => {
          const recs = recordsFor(p.id).filter((r) => r.status !== "weekend")
          const present = recs.filter((r) => r.in).length
          const today = todayRecord(p.id)
          const meta = today ? statusMeta(today.status) : statusMeta("absent")
          return (
            <article
              key={p.id}
              className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                <EmojiAvatar emoji={p.emoji} color={p.color} size="lg" />
                <div className="min-w-0">
                  <strong className="block truncate font-semibold">{p.name}</strong>
                  <p className="truncate text-sm text-muted-foreground">{p.title}</p>
                  <span
                    className="mt-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium"
                    style={{
                      color: p.color,
                      backgroundColor: `color-mix(in oklch, ${p.color} 12%, transparent)`,
                    }}
                  >
                    {p.dept} · {roleTag(p.access)}
                  </span>
                </div>
              </div>

              <p className="mt-4 flex items-center gap-1.5 truncate text-xs text-muted-foreground">
                <Mail className="size-3.5 shrink-0" />
                {p.email}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <StatusBadge
                  status={today ? today.status : "absent"}
                  label={`Today: ${today && today.in ? today.in : meta.label}`}
                />
                <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-border">
                  {present} days present
                </span>
              </div>

              <Link
                href={`/records?who=${p.id}`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                Open records
                <ArrowRight className="size-4" />
              </Link>
            </article>
          )
        })}
      </div>
    </div>
  )
}
