"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { List } from "lucide-react"
import { WalletConnectOverlay } from "./wallet-connect-overlay"

export function TransactionsPage() {
  const { connected } = useWallet()
  const router = useRouter()

  if (!connected) {
    return (
      <div className="relative">
        {/* Preview content with reduced opacity */}
        <div className="opacity-30 pointer-events-none select-none">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Transactions</h1>
              <p className="text-slate-300 mt-1">View your transaction history</p>
            </div>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Transaction History</CardTitle>
                <CardDescription className="text-slate-400">
                  All your card transactions will appear here
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center mb-4">
                    <List className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-300">No transactions yet</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Overlay */}
        <WalletConnectOverlay onClose={() => router.push("/dashboard")} />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Transactions</h1>
        <p className="text-slate-300 mt-1">View your transaction history</p>
      </div>

      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Transaction History</CardTitle>
          <CardDescription className="text-slate-400">All your card transactions will appear here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center mb-4">
              <List className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-300">No transactions yet</p>
            <p className="text-sm text-slate-500 mt-1">
              Your transactions will appear here once you start using your card
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
