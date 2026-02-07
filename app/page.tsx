"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWallet } from "@solana/wallet-adapter-react"
import { useUser } from "@/components/providers/user-provider"
import { LandingPage } from "@/components/landing/landing-page"

export default function Home() {
  const { connected } = useWallet()
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (connected && user) {
      router.push("/dashboard")
    }
  }, [connected, user, router])

  return <LandingPage />
}
