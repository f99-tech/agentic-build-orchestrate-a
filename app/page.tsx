import { Crown, Star, User } from "lucide-react"
import { Dashboard } from "@/components/attendhub/dashboard"

const roleGuide = [
  {
    icon: Crown,
    title: "Manager",
    body: "Sees every check-in and check-out for all 30 employees plus their own card.",
  },
  {
    icon: Star,
    title: "Supervisor",
    body: "Sees only people in the same department (Sales, Operations, IT, or Support).",
  },
  {
    icon: User,
    title: "Staff",
    body: "Sees only their own punches. Switch roles at the top right to try each view.",
  },
]

export default function HomePage() {
  return (
    <div className="space-y-6">
      <Dashboard />

      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h2 className="text-sm font-semibold">How roles work</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {roleGuide.map(({ icon: Icon, title, body }) => (
            <article key={title} className="rounded-xl border border-border bg-background/40 p-4">
              <div className="flex items-center gap-2">
                <span className="inline-grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
                <h3 className="text-sm font-semibold">{title}</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
