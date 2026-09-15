import type { AttendanceRecord, Access, Department, RecordStatus, Staff } from "./types"

export const ATTEND_HUB = {
  company: "AttendHub",
  workStart: "09:00",
  workEnd: "17:30",
}

export const DEPT_COLORS: Record<Department, string> = {
  Management: "#7c3aed",
  Sales: "#2563eb",
  Operations: "#0d9488",
  IT: "#db2777",
  Finance: "#d97706",
  HR: "#e11d48",
  Support: "#0284c7",
  Admin: "#4f46e5",
  Marketing: "#c026d3",
}

export const STAFF: Staff[] = [
  { id: "mgr", name: "Victoria Hale", title: "Office Manager", dept: "Management", access: "admin", emoji: "👑", color: DEPT_COLORS.Management, email: "victoria.hale@attendhub.demo" },
  { id: "e01", name: "Priya Sharma", title: "Sales Supervisor", dept: "Sales", access: "supervisor", emoji: "📈", color: DEPT_COLORS.Sales, email: "priya.sharma@attendhub.demo" },
  { id: "e02", name: "Noah Williams", title: "Sales Executive", dept: "Sales", access: "staff", emoji: "🤝", color: DEPT_COLORS.Sales, email: "noah.williams@attendhub.demo" },
  { id: "e03", name: "Fatima Ali", title: "Sales Executive", dept: "Sales", access: "staff", emoji: "💬", color: DEPT_COLORS.Sales, email: "fatima.ali@attendhub.demo" },
  { id: "e04", name: "Daniel Kim", title: "Sales Executive", dept: "Sales", access: "staff", emoji: "📞", color: DEPT_COLORS.Sales, email: "daniel.kim@attendhub.demo" },
  { id: "e05", name: "Elena Vargas", title: "Sales Coordinator", dept: "Sales", access: "staff", emoji: "🗂️", color: DEPT_COLORS.Sales, email: "elena.vargas@attendhub.demo" },
  { id: "e06", name: "Omar Hassan", title: "Operations Supervisor", dept: "Operations", access: "supervisor", emoji: "🧭", color: DEPT_COLORS.Operations, email: "omar.hassan@attendhub.demo" },
  { id: "e07", name: "Sofia Rossi", title: "Operations Coordinator", dept: "Operations", access: "staff", emoji: "📋", color: DEPT_COLORS.Operations, email: "sofia.rossi@attendhub.demo" },
  { id: "e08", name: "Ahmed Khan", title: "Operations Coordinator", dept: "Operations", access: "staff", emoji: "🧱", color: DEPT_COLORS.Operations, email: "ahmed.khan@attendhub.demo" },
  { id: "e09", name: "Maya Patel", title: "Operations Staff", dept: "Operations", access: "staff", emoji: "🛠️", color: DEPT_COLORS.Operations, email: "maya.patel@attendhub.demo" },
  { id: "e10", name: "Jack Thompson", title: "Warehouse Associate", dept: "Operations", access: "staff", emoji: "📦", color: DEPT_COLORS.Operations, email: "jack.thompson@attendhub.demo" },
  { id: "e11", name: "Mei Wong", title: "Warehouse Associate", dept: "Operations", access: "staff", emoji: "🏷️", color: DEPT_COLORS.Operations, email: "mei.wong@attendhub.demo" },
  { id: "e12", name: "Carlos Diaz", title: "Logistics Officer", dept: "Operations", access: "staff", emoji: "🚚", color: DEPT_COLORS.Operations, email: "carlos.diaz@attendhub.demo" },
  { id: "e13", name: "Samir Nasser", title: "Facilities Officer", dept: "Operations", access: "staff", emoji: "🔧", color: DEPT_COLORS.Operations, email: "samir.nasser@attendhub.demo" },
  { id: "e14", name: "Emily Chen", title: "IT Supervisor", dept: "IT", access: "supervisor", emoji: "💻", color: DEPT_COLORS.IT, email: "emily.chen@attendhub.demo" },
  { id: "e15", name: "Liam O'Brien", title: "IT Support Specialist", dept: "IT", access: "staff", emoji: "🎧", color: DEPT_COLORS.IT, email: "liam.obrien@attendhub.demo" },
  { id: "e16", name: "Yuki Tanaka", title: "Software Developer", dept: "IT", access: "staff", emoji: "⌨️", color: DEPT_COLORS.IT, email: "yuki.tanaka@attendhub.demo" },
  { id: "e17", name: "Chloe Dubois", title: "Software Developer", dept: "IT", access: "staff", emoji: "🧩", color: DEPT_COLORS.IT, email: "chloe.dubois@attendhub.demo" },
  { id: "e18", name: "Hassan Malik", title: "Network Administrator", dept: "IT", access: "staff", emoji: "🌐", color: DEPT_COLORS.IT, email: "hassan.malik@attendhub.demo" },
  { id: "e19", name: "Lucas Silva", title: "Finance Analyst", dept: "Finance", access: "staff", emoji: "📊", color: DEPT_COLORS.Finance, email: "lucas.silva@attendhub.demo" },
  { id: "e20", name: "Isabella Garcia", title: "Finance Analyst", dept: "Finance", access: "staff", emoji: "💹", color: DEPT_COLORS.Finance, email: "isabella.garcia@attendhub.demo" },
  { id: "e21", name: "Ryan Brooks", title: "Accountant", dept: "Finance", access: "staff", emoji: "🧮", color: DEPT_COLORS.Finance, email: "ryan.brooks@attendhub.demo" },
  { id: "e22", name: "Nora Ibrahim", title: "Payroll Officer", dept: "Finance", access: "staff", emoji: "💵", color: DEPT_COLORS.Finance, email: "nora.ibrahim@attendhub.demo" },
  { id: "e23", name: "Aisha Rahman", title: "HR Officer", dept: "HR", access: "staff", emoji: "🌸", color: DEPT_COLORS.HR, email: "aisha.rahman@attendhub.demo" },
  { id: "e24", name: "Tom Hughes", title: "Support Team Lead", dept: "Support", access: "supervisor", emoji: "🩺", color: DEPT_COLORS.Support, email: "tom.hughes@attendhub.demo" },
  { id: "e25", name: "Layla Haddad", title: "Support Agent", dept: "Support", access: "staff", emoji: "📨", color: DEPT_COLORS.Support, email: "layla.haddad@attendhub.demo" },
  { id: "e26", name: "Ben Foster", title: "Support Agent", dept: "Support", access: "staff", emoji: "🔔", color: DEPT_COLORS.Support, email: "ben.foster@attendhub.demo" },
  { id: "e27", name: "Amira Said", title: "Support Agent", dept: "Support", access: "staff", emoji: "💡", color: DEPT_COLORS.Support, email: "amira.said@attendhub.demo" },
  { id: "e28", name: "Hannah Berg", title: "Receptionist", dept: "Admin", access: "staff", emoji: "🎀", color: DEPT_COLORS.Admin, email: "hannah.berg@attendhub.demo" },
  { id: "e29", name: "Olivia Grant", title: "Marketing Specialist", dept: "Marketing", access: "staff", emoji: "📣", color: DEPT_COLORS.Marketing, email: "olivia.grant@attendhub.demo" },
  { id: "e30", name: "Kenji Sato", title: "Marketing Specialist", dept: "Marketing", access: "staff", emoji: "🎨", color: DEPT_COLORS.Marketing, email: "kenji.sato@attendhub.demo" },
]

function seeded(id: string, day: string): number {
  let h = 0
  const s = id + "-" + day
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}

function pad(n: number): string {
  return String(n).padStart(2, "0")
}

function minutesToTime(mins: number): string {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return pad(h) + ":" + pad(m)
}

/** Build last 14 calendar days of mock punches (weekends off). */
export function buildSeedRecords(): AttendanceRecord[] {
  const records: AttendanceRecord[] = []
  const today = new Date()
  today.setHours(12, 0, 0, 0)

  for (let d = 13; d >= 0; d--) {
    const date = new Date(today)
    date.setDate(today.getDate() - d)
    const iso = date.toISOString().slice(0, 10)
    const dow = date.getDay()
    const weekend = dow === 0 || dow === 6

    STAFF.forEach((person) => {
      if (weekend) {
        records.push({
          id: person.id + "-" + iso,
          staffId: person.id,
          date: iso,
          in: null,
          out: null,
          status: "weekend",
        })
        return
      }

      const n = seeded(person.id, iso)
      const roll = n % 100
      let status: RecordStatus
      let inn: string | null
      let out: string | null

      if (roll < 6) {
        status = "absent"
        inn = null
        out = null
      } else if (roll < 22) {
        status = "late"
        inn = minutesToTime(9 * 60 + 8 + (n % 42))
        out = minutesToTime(17 * 60 + 20 + (n % 55))
      } else if (roll < 30) {
        status = "early-leave"
        inn = minutesToTime(8 * 60 + 40 + (n % 25))
        out = minutesToTime(16 * 60 + (n % 40))
      } else {
        status = "on-time"
        inn = minutesToTime(8 * 60 + 35 + (n % 24))
        out = minutesToTime(17 * 60 + 28 + (n % 40))
      }

      records.push({
        id: person.id + "-" + iso,
        staffId: person.id,
        date: iso,
        in: inn,
        out,
        status,
      })
    })
  }
  return records
}

/* ---------- access rules ---------- */

export function visibleStaff(user: Staff): Staff[] {
  if (user.access === "admin") return STAFF.slice()
  if (user.access === "supervisor") {
    return STAFF.filter((s) => s.dept === user.dept || s.id === user.id)
  }
  return STAFF.filter((s) => s.id === user.id)
}

export function canSeePerson(user: Staff, personId: string): boolean {
  return visibleStaff(user).some((s) => s.id === personId)
}

export function accessLabel(access: Access): string {
  if (access === "admin") return "Manager · sees everyone"
  if (access === "supervisor") return "Supervisor · sees own department"
  return "Staff · sees own attendance only"
}

export function roleTag(access: Access): string {
  if (access === "admin") return "Manager"
  if (access === "supervisor") return "Lead"
  return "Staff"
}

/* ---------- formatting helpers ---------- */

export interface StatusMeta {
  label: string
  cls: RecordStatus | "ok" | "mute"
  tone: "ok" | "late" | "warn" | "bad" | "mute" | "live"
}

export function statusMeta(status: RecordStatus): StatusMeta {
  const map: Record<string, StatusMeta> = {
    "on-time": { label: "On time", cls: "ok", tone: "ok" },
    late: { label: "Late", cls: "late", tone: "late" },
    "early-leave": { label: "Left early", cls: "early-leave", tone: "warn" },
    absent: { label: "Absent", cls: "absent", tone: "bad" },
    weekend: { label: "Weekend", cls: "weekend", tone: "mute" },
    "checked-in": { label: "Checked in", cls: "checked-in", tone: "live" },
    complete: { label: "Complete", cls: "complete", tone: "ok" },
  }
  return map[status] || { label: status, cls: "mute", tone: "mute" }
}

export function formatDate(iso: string): string {
  const d = new Date(iso + "T12:00:00")
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })
}

export function hoursBetween(a: string | null, b: string | null): string {
  if (!a || !b) return "—"
  const [ah, am] = a.split(":").map(Number)
  const [bh, bm] = b.split(":").map(Number)
  const mins = bh * 60 + bm - (ah * 60 + am)
  if (mins <= 0) return "—"
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return h + "h " + String(m).padStart(2, "0") + "m"
}

export function punchStatus(inn: string | null): RecordStatus {
  if (!inn) return "absent"
  const [h, m] = inn.split(":").map(Number)
  return h * 60 + m > 9 * 60 ? "late" : "on-time"
}
