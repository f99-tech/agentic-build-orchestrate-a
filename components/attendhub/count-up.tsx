"use client"

import { useEffect, useRef, useState } from "react"

/** Animate a number from 0 up to `value` whenever `value` changes. */
export function CountUp({ value, className }: { value: number; className?: string }) {
  const [display, setDisplay] = useState(0)
  const frame = useRef<number | null>(null)

  useEffect(() => {
    const start = performance.now()
    const from = 0
    const duration = 900

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(from + (value - from) * eased))
      if (t < 1) frame.current = requestAnimationFrame(tick)
    }

    frame.current = requestAnimationFrame(tick)
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [value])

  return <span className={className}>{display}</span>
}
