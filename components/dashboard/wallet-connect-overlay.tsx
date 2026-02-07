"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, X, Eye } from "lucide-react"
import { CustomWalletButton } from "@/components/landing/custom-wallet-button"
import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

interface WalletConnectOverlayProps {
  onClose?: () => void
}

export function WalletConnectOverlay({ onClose }: WalletConnectOverlayProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        onClose?.()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  const handleViewDemo = () => {
    router.push("/dashboard?demo=true")
  }

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card ref={cardRef} className="max-w-md w-full relative bg-slate-800/90 backdrop-blur-xl border-slate-700">
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 h-8 w-8 rounded-full hover:bg-slate-700 text-slate-300 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <CardHeader className="text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: "linear-gradient(to right, #06B6D4, #A855F7)" }}
          >
            <Wallet className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-white">Connect Your Wallet</CardTitle>
          <CardDescription className="text-slate-400">
            Connect your Solana wallet to access your KairosPay dashboard and manage your prepaid card
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-3 justify-center">
          <CustomWalletButton />
          <button
            onClick={handleViewDemo}
            className="h-12 px-8 text-base font-semibold rounded-lg bg-transparent border-2 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            style={{
              borderImage: "linear-gradient(to right, #06B6D4, #A855F7) 1",
              color: "#06B6D4",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(to right, #06B6D4, #A855F7)"
              e.currentTarget.style.backgroundClip = "text"
              e.currentTarget.style.webkitBackgroundClip = "text"
              e.currentTarget.style.webkitTextFillColor = "transparent"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "none"
              e.currentTarget.style.color = "#06B6D4"
              e.currentTarget.style.webkitTextFillColor = "unset"
            }}
          >
            <Eye className="w-4 h-4" />
            View Demo
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
