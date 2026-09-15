"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import type { AttendanceRecord, Staff } from "@/lib/attendhub/types"
import { STAFF, buildSeedRecords, punchStatus } from "@/lib/attendhub/data"

const STORE_USER = "attendhub_user"
const STORE_LIVE = "attendhub_live_records"

const SEED_RECORDS = buildSeedRecords()

function todayISO(): string {
  const d = new Date()
  return (
    d.getFullYear() +
    "-" +
    String(d.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(d.getDate()).padStart(2, "0")
  )
}

function nowHM(): string {
  const d = new Date()
  return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0")
}

interface AttendHubContextValue {
  ready: boolean
  user: Staff
  userId: string
  setUserId: (id: string) => void
  records: AttendanceRecord[]
  recordsFor: (staffId: string) => AttendanceRecord[]
  todayRecord: (staffId: string) => AttendanceRecord | undefined
  checkIn: () => void
  checkOut: () => void
  resetDemo: () => void
}

const AttendHubContext = createContext<AttendHubContextValue | null>(null)

export function AttendHubProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  const [userId, setUserIdState] = useState("mgr")
  const [live, setLive] = useState<AttendanceRecord[]>([])

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORE_USER)
      if (storedUser) setUserIdState(storedUser)
      const storedLive = localStorage.getItem(STORE_LIVE)
      if (storedLive) setLive(JSON.parse(storedLive))
    } catch {
      /* ignore */
    }
    setReady(true)
  }, [])

  const user = useMemo(() => STAFF.find((s) => s.id === userId) || STAFF[0], [userId])

  const setUserId = useCallback((id: string) => {
    setUserIdState(id)
    try {
      localStorage.setItem(STORE_USER, id)
    } catch {
      /* ignore */
    }
  }, [])

  const saveLive = useCallback((list: AttendanceRecord[]) => {
    setLive(list)
    try {
      localStorage.setItem(STORE_LIVE, JSON.stringify(list))
    } catch {
      /* ignore */
    }
  }, [])

  /** Merge seed history with live punches from this browser. */
  const records = useMemo(() => {
    const map = new Map<string, AttendanceRecord>()
    SEED_RECORDS.forEach((r) => map.set(r.id, r))
    live.forEach((r) => map.set(r.id, r))
    return Array.from(map.values()).sort((a, b) =>
      a.date < b.date ? 1 : a.date > b.date ? -1 : a.staffId.localeCompare(b.staffId),
    )
  }, [live])

  const recordsFor = useCallback(
    (staffId: string) => records.filter((r) => r.staffId === staffId),
    [records],
  )

  const todayRecord = useCallback(
    (staffId: string) => records.find((r) => r.staffId === staffId && r.date === todayISO()),
    [records],
  )

  const checkIn = useCallback(() => {
    const iso = todayISO()
    const id = user.id + "-" + iso
    const next = live.filter((r) => r.id !== id)
    next.push({ id, staffId: user.id, date: iso, in: nowHM(), out: null, status: "checked-in" })
    saveLive(next)
  }, [user.id, live, saveLive])

  const checkOut = useCallback(() => {
    const iso = todayISO()
    const id = user.id + "-" + iso
    const existing = todayRecord(user.id)
    const inn = existing && existing.in ? existing.in : nowHM()
    const out = nowHM()
    const late = punchStatus(inn) === "late"
    const [oh, om] = out.split(":").map(Number)
    const early = oh * 60 + om < 17 * 60 + 15
    let status: AttendanceRecord["status"] = "complete"
    if (late) status = "late"
    else if (early) status = "early-leave"
    else status = "on-time"

    const next = live.filter((r) => r.id !== id)
    next.push({ id, staffId: user.id, date: iso, in: inn, out, status })
    saveLive(next)
  }, [user.id, live, todayRecord, saveLive])

  const resetDemo = useCallback(() => {
    setLive([])
    try {
      localStorage.removeItem(STORE_LIVE)
    } catch {
      /* ignore */
    }
  }, [])

  const value: AttendHubContextValue = {
    ready,
    user,
    userId,
    setUserId,
    records,
    recordsFor,
    todayRecord,
    checkIn,
    checkOut,
    resetDemo,
  }

  return <AttendHubContext.Provider value={value}>{children}</AttendHubContext.Provider>
}

export function useAttendHub() {
  const ctx = useContext(AttendHubContext)
  if (!ctx) throw new Error("useAttendHub must be used within AttendHubProvider")
  return ctx
}
