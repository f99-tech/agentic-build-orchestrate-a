export type Access = "admin" | "supervisor" | "staff"

export type Department =
  | "Management"
  | "Sales"
  | "Operations"
  | "IT"
  | "Finance"
  | "HR"
  | "Support"
  | "Admin"
  | "Marketing"

export interface Staff {
  id: string
  name: string
  title: string
  dept: Department
  access: Access
  emoji: string
  color: string
  email: string
}

export type RecordStatus =
  | "on-time"
  | "late"
  | "early-leave"
  | "absent"
  | "weekend"
  | "checked-in"
  | "complete"

export interface AttendanceRecord {
  id: string
  staffId: string
  date: string
  in: string | null
  out: string | null
  status: RecordStatus
}
