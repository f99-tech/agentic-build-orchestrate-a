import { cn } from "@/lib/utils"

export function EmojiAvatar({
  emoji,
  color,
  size = "md",
  className,
}: {
  emoji: string
  color: string
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  const dims = {
    sm: "size-9 text-lg rounded-lg",
    md: "size-11 text-xl rounded-xl",
    lg: "size-14 text-2xl rounded-2xl",
  }[size]

  return (
    <span
      className={cn(
        "inline-grid place-items-center ring-1 ring-inset ring-border/60 shadow-sm",
        dims,
        className,
      )}
      style={{
        backgroundColor: `color-mix(in oklch, ${color} 14%, var(--card))`,
        boxShadow: `inset 0 0 0 1px color-mix(in oklch, ${color} 30%, transparent)`,
      }}
      aria-hidden
    >
      {emoji}
    </span>
  )
}
