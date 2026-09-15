"use client"

/**
 * Full-screen decorative background: drifting aurora blobs, a slowly panning
 * grid, and a few floating particles. Purely visual, pointer-events-none.
 */
export function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base wash */}
      <div className="absolute inset-0 bg-background" />

      {/* moving grid */}
      <div
        className="animate-grid-pan absolute inset-0 opacity-[0.06] dark:opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          color: "var(--primary)",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)",
        }}
      />

      {/* aurora blobs */}
      <div
        className="animate-aurora absolute -top-40 -left-32 size-[42rem] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in oklch, var(--primary) 55%, transparent), transparent 65%)",
          opacity: 0.5,
        }}
      />
      <div
        className="animate-aurora-slow absolute top-1/3 -right-40 size-[38rem] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in oklch, var(--chart-2) 55%, transparent), transparent 65%)",
          opacity: 0.4,
        }}
      />
      <div
        className="animate-aurora absolute -bottom-48 left-1/4 size-[40rem] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in oklch, var(--chart-3) 45%, transparent), transparent 65%)",
          opacity: 0.35,
          animationDelay: "-9s",
        }}
      />

      {/* floating particles */}
      {[
        { left: "12%", top: "22%", delay: "0s", size: 6 },
        { left: "78%", top: "18%", delay: "-2s", size: 8 },
        { left: "64%", top: "62%", delay: "-4s", size: 5 },
        { left: "30%", top: "72%", delay: "-1.5s", size: 7 },
        { left: "88%", top: "48%", delay: "-3s", size: 5 },
      ].map((p, i) => (
        <span
          key={i}
          className="animate-float absolute rounded-full bg-primary/40 blur-[1px]"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  )
}
