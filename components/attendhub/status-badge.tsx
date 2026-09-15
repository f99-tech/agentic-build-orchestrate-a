import { CheckCircle2, Clock, DoorOpen, Flag, Moon, Radio, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { statusMeta } from "@/lib/attendhub/data"
import type { RecordStatus } from "@/lib/attendhub/types"

const toneStyles: Record<string, string> = {
  ok: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-400 ring-emerald-500/25",
  late: "bg-amber-500/12 text-amber-700 dark:text-amber-400 ring-amber-500/25",
  warn: "bg-orange-500/12 text-orange-700 dark:text-orange-400 ring-orange-500/25",
  bad: "bg-rose-500/12 text-rose-700 dark:text-rose-400 ring-rose-500/25",
  mute: "bg-muted text-muted-foreground ring-border",
  live: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-400 ring-emerald-500/25",
}

function ToneIcon({ status, tone }: { status: RecordStatus; tone: string }) {
  const cls = "size-3.5 shrink-0"
  if (status === "checked-in") return <Radio className={cn(cls, "animate-pulse-dot")} />
  if (status === "complete") return <Flag className={cls} />
  if (tone === "ok") return <CheckCircle2 className={cls} />
  if (tone === "late") return <Clock className={cls} />
  if (tone === "warn") return <DoorOpen className={cls} />
  if (tone === "bad") return <XCircle className={cls} />
  return <Moon className={cls} />
}

export function StatusBadge({
  status,
  label,
  className,
}: {
  status: RecordStatus
  label?: string
  className?: string
}) {
  const meta = statusMeta(status)
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
        toneStyles[meta.tone],
        className,
      )}
    >
      <ToneIcon status={status} tone={meta.tone} />
      {label ?? meta.label}
    </span>
  )
}
