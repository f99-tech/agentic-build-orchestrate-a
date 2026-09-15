import { Suspense } from "react"
import { RecordsView } from "@/components/attendhub/records-view"

export default function RecordsPage() {
  return (
    <Suspense fallback={null}>
      <RecordsView />
    </Suspense>
  )
}
