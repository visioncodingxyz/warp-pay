"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

export function DemoHandler({ onOpenDemo }: { onOpenDemo: () => void }) {
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get("demo") === "true") {
      onOpenDemo()
      // Clean up the URL by removing the query parameter
      window.history.replaceState({}, "", "/dashboard")
    }
  }, [searchParams, onOpenDemo])

  return null
}
