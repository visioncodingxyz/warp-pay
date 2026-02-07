"use client"

import { useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useUser } from "@/components/providers/user-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCardNumber } from "@/lib/card-utils"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, Eye, EyeOff, Copy, Snowflake, AlertCircle, Download, DollarSign, Calendar } from "lucide-react"
import Link from "next/link"
import { WalletConnectOverlay } from "./wallet-connect-overlay"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function MyCardPage() {
  const { connected } = useWallet()
  const { user, updateUser } = useUser()
  const { toast } = useToast()
  const router = useRouter()
  const [showFullDetails, setShowFullDetails] = useState(false)

  const cardData = user?.cardData

  if (!connected) {
    return (
      <div className="relative">
        {/* Preview content with reduced opacity */}
        <div className="opacity-30 pointer-events-none select-none">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-white">My Card</h1>
              <p className="text-slate-300 mt-1">View and manage your WarpPay card</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="relative w-full max-w-md">
                  <div
                    className="relative aspect-[1.586/1] rounded-2xl p-6 shadow-2xl"
                    style={{ background: "linear-gradient(135deg, #5B6FDE 0%, #4DD0E1 100%)" }}
                  >
                    <div className="relative h-full flex flex-col justify-between text-white">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg" />
                          <span className="text-lg font-bold">WarpPay</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="text-2xl font-mono">•••• •••• •••• ••••</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">Available Balance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white">$0.00</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay */}
        <WalletConnectOverlay onClose={() => router.push("/dashboard")} />
      </div>
    )
  }

  if (user?.cardStatus === "none") {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">My Card</h1>
          <p className="text-slate-300 mt-1">View and manage your WarpPay card</p>
        </div>

        <Card className="border-2 border-dashed border-slate-600 bg-slate-800/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-slate-400" />
            </div>
            <CardTitle className="text-white">No Card Yet</CardTitle>
            <CardDescription className="text-slate-400">Preorder your WarpPay card to get started</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button asChild style={{ backgroundColor: "#049be5" }} className="text-white">
              <Link href="/dashboard">Preorder Card</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const copyCardNumber = () => {
    if (cardData) {
      navigator.clipboard.writeText(cardData.number)
      toast({
        title: "Copied!",
        description: "Card number copied to clipboard",
      })
    }
  }

  const toggleFreeze = () => {
    if (cardData) {
      const newStatus = cardData.status === "active" ? "frozen" : "active"
      updateUser({
        cardData: {
          ...cardData,
          status: newStatus,
        },
      })
      toast({
        title: newStatus === "frozen" ? "Card Frozen" : "Card Unfrozen",
        description:
          newStatus === "frozen" ? "Your card has been temporarily frozen" : "Your card is now active and ready to use",
      })
    }
  }

  const downloadCardDetails = () => {
    toast({
      title: "Download Started",
      description: "Card details PDF will be downloaded",
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">My Card</h1>
        <p className="text-slate-300 mt-1">View and manage your WarpPay card</p>
      </div>

      {/* Card Display */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Card Visual */}
        <div className="space-y-6">
          <div className="relative w-full max-w-md">
            <div
              className="relative aspect-[1.586/1] rounded-2xl bg-gradient-to-br from-slate-800 to-purple-900 p-6 shadow-2xl overflow-hidden"
              style={{ background: "linear-gradient(135deg, #5B6FDE 0%, #4DD0E1 100%)" }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 card-shimmer opacity-30" />

              {/* Frozen overlay */}
              {cardData?.status === "frozen" && (
                <div className="absolute inset-0 bg-blue-500/20 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center text-white">
                    <Snowflake className="w-12 h-12 mx-auto mb-2" />
                    <div className="font-semibold">Card Frozen</div>
                  </div>
                </div>
              )}

              {/* Card Content */}
              <div className="relative h-full flex flex-col justify-between text-white">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Image src="/images/warppay-logo.png" alt="WarpPay" width={40} height={40} className="w-10 h-10" />
                    <span className="text-lg font-bold">WarpPay</span>
                  </div>
                  <div className="w-12 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded opacity-80" />
                </div>

                <div className="space-y-4">
                  <div className="text-2xl font-mono tracking-wider">
                    {showFullDetails && cardData
                      ? formatCardNumber(cardData.number, true)
                      : formatCardNumber(cardData?.number || "")}
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-xs text-slate-300 mb-1">CARDHOLDER</div>
                      <div className="font-semibold">
                        {user?.firstName && user?.lastName
                          ? `${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}`
                          : user?.username.toUpperCase()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-300 mb-1">VALID THRU</div>
                      <div className="font-semibold">{showFullDetails && cardData ? cardData.expiry : "••/••"}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={copyCardNumber}
              disabled
              className="bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Number
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowFullDetails(!showFullDetails)}
              disabled
              className="bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700"
            >
              {showFullDetails ? (
                <>
                  <EyeOff className="w-4 h-4 mr-2" />
                  Hide
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Reveal
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Card Details */}
        <div className="space-y-6">
          {/* Full Details Card */}
          {showFullDetails && cardData && (
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg text-white">Card Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-xs text-slate-400 mb-1">Card Number</div>
                  <div className="font-mono text-sm text-white">{formatCardNumber(cardData.number, true)}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Expiry Date</div>
                    <div className="font-mono text-sm text-white">{cardData.expiry}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1">CVV</div>
                    <div className="font-mono text-sm text-white">{cardData.cvv}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Balance Card */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-white">
                <DollarSign className="w-5 h-5" />
                Available Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">${cardData?.balance.toFixed(2)}</div>
              <p className="text-sm text-slate-400 mt-1">Ready to spend</p>
            </CardContent>
          </Card>

          {/* Status Card */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-white">
                <CreditCard className="w-5 h-5" />
                Card Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Virtual Card</span>
                <span className="text-sm font-semibold text-amber-400">Pending</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Physical Card</span>
                <span className="text-sm font-semibold text-amber-400">Preparing for Delivery</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={toggleFreeze}
            disabled
            className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600"
          >
            <Snowflake className="w-4 h-4 mr-2" />
            {cardData?.status === "active" ? "Freeze Card" : "Unfreeze Card"}
          </Button>
          <Button variant="outline" disabled className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600">
            <AlertCircle className="w-4 h-4 mr-2" />
            Report Lost/Stolen
          </Button>
          <Button
            variant="outline"
            onClick={downloadCardDetails}
            disabled
            className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Details
          </Button>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Transactions</CardTitle>
          <CardDescription className="text-slate-400">Your latest card transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center mb-3">
              <Calendar className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-slate-300">No transactions yet</p>
            <p className="text-sm text-slate-500 mt-1">Transactions will appear here once you start using your card</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
