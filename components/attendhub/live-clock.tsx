"use client"

import { useEffect, useState } from "react"

export function LiveClock({ className }: { className?: string }) {
  const [time, setTime] = useState<string>("--:--:--")

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-GB"))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className={className} suppressHydrationWarning>
      {time}
    </span>
  )
}
