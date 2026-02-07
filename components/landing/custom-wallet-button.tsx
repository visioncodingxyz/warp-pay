"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function CustomWalletButton() {
  const { connected, publicKey } = useWallet()
  const { setVisible } = useWalletModal()
  const router = useRouter()

  useEffect(() => {
    if (connected && publicKey) {
      router.push("/dashboard")
    }
  }, [connected, publicKey, router])

  const handleClick = () => {
    setVisible(true)
  }

  return (
    <button
      onClick={handleClick}
      className="h-12 px-8 text-base font-semibold rounded-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
      style={{ background: "linear-gradient(to right, #06B6D4, #A855F7)" }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "linear-gradient(to right, #0891B2, #9333EA)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "linear-gradient(to right, #06B6D4, #A855F7)")}
    >
      Select Wallet
    </button>
  )
}
