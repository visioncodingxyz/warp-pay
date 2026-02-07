"use client"

import { useUser } from "@/components/providers/user-provider"
import { useWallet } from "@solana/wallet-adapter-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, DollarSign, Clock, Package, ArrowRight, Zap, Wallet, Eye } from "lucide-react"
import Link from "next/link"
import { useState, Suspense } from "react"
import { PreorderModal } from "@/components/modals/preorder-modal"
import { CustomWalletButton } from "@/components/landing/custom-wallet-button"
import { VideoDemoModal } from "@/components/modals/video-demo-modal"
import { DemoHandler } from "./demo-handler"

export function DashboardHome() {
  const { user } = useUser()
  const { connected } = useWallet()
  const [showPreorderModal, setShowPreorderModal] = useState(false)
  const [showVideoDemo, setShowVideoDemo] = useState(false)

  if (!connected) {
    return (
      <>
        <Suspense fallback={null}>
          <DemoHandler onOpenDemo={() => setShowVideoDemo(true)} />
        </Suspense>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card
            className="max-w-md w-full border-2 bg-slate-800/50 backdrop-blur-sm"
            style={{ borderColor: "#06B6D4" }}
          >
            <CardHeader className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "linear-gradient(to right, #06B6D4, #A855F7)" }}
              >
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">Connect Your Wallet</CardTitle>
              <CardDescription className="text-base text-slate-300">
                Connect your Solana wallet to access your WarpPay dashboard and manage your prepaid card
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-3 justify-center">
              <CustomWalletButton />
              <button
                onClick={() => setShowVideoDemo(true)}
                className="h-12 px-8 text-base font-semibold rounded-lg bg-transparent border-2 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                style={{
                  borderImage: "linear-gradient(to right, #06B6D4, #A855F7) 1",
                  color: "#06B6D4",
                }}
              >
                <Eye className="w-4 h-4" />
                View Demo
              </button>
            </CardContent>
          </Card>
        </div>
        <VideoDemoModal isOpen={showVideoDemo} onClose={() => setShowVideoDemo(false)} />
      </>
    )
  }

  const hasCard = user?.cardStatus !== "none"
  const cardData = user?.cardData

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Welcome back, {user?.firstName || user?.username}!</h1>
        <p className="text-slate-300 mt-1">Manage your WarpPay card and transactions</p>
      </div>

      {/* Card Preorder CTA */}
      {!hasCard && (
        <Card className="border-2 bg-slate-800/50 backdrop-blur-sm" style={{ borderColor: "#06B6D4" }}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-2xl text-white">Preorder Your WarpPay Card</CardTitle>
                <CardDescription className="text-base text-slate-300">
                  Get instant access to your virtual card and receive your physical card in 7 days
                </CardDescription>
              </div>
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(to right, #06B6D4, #A855F7)" }}
              >
                <CreditCard className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-white">$50</span>
              <span className="text-slate-300">USD</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Zap className="w-4 h-4" style={{ color: "#06B6D4" }} />
                <span>Instant virtual card access</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Package className="w-4 h-4" style={{ color: "#06B6D4" }} />
                <span>Physical card shipped to your door</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <DollarSign className="w-4 h-4" style={{ color: "#06B6D4" }} />
                <span>$50 preloaded balance included</span>
              </div>
            </div>

            <Button size="lg" className="w-full sm:w-auto" onClick={() => setShowPreorderModal(true)}>
              Preorder Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Delivery Countdown */}
      {hasCard && cardData && (
        <Card className="border-2 bg-slate-800/50 backdrop-blur-sm" style={{ borderColor: "#06B6D4" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Clock className="w-5 h-5" style={{ color: "#06B6D4" }} />
              Card Delivery Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-slate-400 mb-1">Estimated delivery date:</div>
              <div className="text-2xl font-bold text-white">
                {user?.orderDate
                  ? new Date(new Date(user.orderDate).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Calculating..."}
              </div>
            </div>

            <div className="space-y-2">
              <DeliveryStep label="Payment received" completed />
              <DeliveryStep label="Card generated" completed />
              <DeliveryStep label="Card printing" completed={false} current />
              <DeliveryStep label="Shipping" completed={false} />
              <DeliveryStep label="Delivery" completed={false} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      {hasCard && (
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Total Balance</CardTitle>
              <DollarSign className="w-4 h-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${cardData?.balance.toFixed(2) || "0.00"}</div>
              <p className="text-xs text-slate-400 mt-1">Available to spend</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Card Status</CardTitle>
              <CreditCard className="w-4 h-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white capitalize">
                {user?.cardStatus === "none" ? "Not Ordered" : "Pending"}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {user?.cardStatus === "none" ? "Preorder your card" : "Virtual card pending"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Transactions</CardTitle>
              <Clock className="w-4 h-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">0</div>
              <p className="text-xs text-slate-400 mt-1">This month</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Actions */}
      {hasCard && (
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button
              asChild
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white bg-transparent"
            >
              <Link href="/dashboard/card">View Card Details</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white bg-transparent"
            >
              <Link href="/dashboard/transactions">View Transactions</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Preorder Modal */}
      <PreorderModal open={showPreorderModal} onClose={() => setShowPreorderModal(false)} />
    </div>
  )
}

function DeliveryStep({
  label,
  completed,
  current,
}: {
  label: string
  completed: boolean
  current?: boolean
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
          completed
            ? "bg-green-500 text-white"
            : current
              ? "bg-cyan-500 text-white animate-pulse"
              : "bg-slate-700 text-slate-500"
        }`}
      >
        {completed ? "✓" : current ? "•" : ""}
      </div>
      <span className={`text-sm ${completed || current ? "text-white font-medium" : "text-slate-500"}`}>{label}</span>
    </div>
  )
}
