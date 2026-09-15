"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { accessLabel, formatDate, hoursBetween, visibleStaff, STAFF } from "@/lib/attendhub/data"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { StatusBadge } from "./status-badge"
import { useAttendHub } from "./provider"

export function RecordsView() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, records, recordsFor } = useAttendHub()

  const people = visibleStaff(user)
  const filterId = searchParams.get("who")
  const selected =
    people.find((p) => p.id === filterId) || (user.access === "staff" ? user : null)

  const rowsSource = selected
    ? recordsFor(selected.id)
    : records.filter((r) => people.some((p) => p.id === r.staffId))

  const title = selected
    ? `${selected.name}'s attendance`
    : user.access === "admin"
      ? "All check-in / check-out"
      : `${user.dept} team attendance`

  function onFilterChange(value: string) {
    if (value && value !== "__all") router.push(`/records?who=${value}`)
    else router.push("/records")
  }

  return (
    <section className="rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            {accessLabel(user.access)}. Seed data covers the last 14 days. Live punches you make
            stay in this browser.
          </p>
        </div>
        {user.access !== "staff" && (
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">Filter person</label>
            <Select value={selected?.id ?? "__all"} onValueChange={onFilterChange}>
              <SelectTrigger className="h-9 w-[240px] bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[360px]">
                <SelectItem value="__all">Everyone I can see</SelectItem>
                {people.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    <span className="mr-1">{p.emoji}</span>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-5 py-3 font-medium">Date</th>
              {!selected && <th className="px-5 py-3 font-medium">Employee</th>}
              <th className="px-5 py-3 font-medium">Check in</th>
              <th className="px-5 py-3 font-medium">Check out</th>
              <th className="px-5 py-3 font-medium">Hours</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rowsSource.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-muted-foreground">
                  No rows in this view.
                </td>
              </tr>
            ) : (
              rowsSource.map((r) => {
                const person = STAFF.find((s) => s.id === r.staffId)!
                return (
                  <tr
                    key={r.id}
                    className="border-b border-border/60 transition-colors last:border-0 hover:bg-accent/40"
                  >
                    <td className="whitespace-nowrap px-5 py-3">{formatDate(r.date)}</td>
                    {!selected && (
                      <td className="whitespace-nowrap px-5 py-3">
                        <span className="inline-flex items-center gap-1.5">
                          <span aria-hidden>{person.emoji}</span>
                          {person.name}
                        </span>
                      </td>
                    )}
                    <td className="px-5 py-3 font-mono tabular-nums">{r.in || "—"}</td>
                    <td className="px-5 py-3 font-mono tabular-nums">{r.out || "—"}</td>
                    <td className="px-5 py-3 font-mono tabular-nums">{hoursBetween(r.in, r.out)}</td>
                    <td className="px-5 py-3">
                      <StatusBadge status={r.status} />
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
