"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useUser } from "@/components/providers/user-provider"
import { useWallet } from "@solana/wallet-adapter-react"
import { useToast } from "@/hooks/use-toast"
import { generateCardNumber, generateExpiry, generateCVV, calculateDeliveryDate } from "@/lib/card-utils"
import { Loader2, CheckCircle2, Copy, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react"
import { formatCardNumber } from "@/lib/card-utils"
import { Connection, Transaction } from "@solana/web3.js"
import { Buffer } from "buffer"
import Image from "next/image"

interface PreorderModalProps {
  open: boolean
  onClose: () => void
}

type PaymentMethod = "SOL" | "USDC" | "USDT"
type Step = "payment-method" | "personal-info" | "processing" | "success" | "card-reveal"

const RECIPIENT_WALLET = "BJ2h6pEn5xJr3bBFCDN6pCsioYGPxwNz4RWf8urL61qd"
const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL!

export function PreorderModal({ open, onClose }: PreorderModalProps) {
  const { user, updateUser } = useUser()
  const { publicKey, sendTransaction } = useWallet()
  const { toast } = useToast()

  const [step, setStep] = useState<Step>("payment-method")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("SOL")
  const [isProcessing, setIsProcessing] = useState(false)
  const [solPrice, setSolPrice] = useState<number | null>(null)
  const [isLoadingPrice, setIsLoadingPrice] = useState(true)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [generatedCard, setGeneratedCard] = useState<{
    number: string
    expiry: string
    cvv: string
  } | null>(null)
  const [showFullDetails, setShowFullDetails] = useState(false)

  useEffect(() => {
    const fetchSolPrice = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd")
        const data = await response.json()
        setSolPrice(data.solana.usd)
        console.log("[v0] Fetched SOL price:", data.solana.usd)
      } catch (error) {
        console.error("[v0] Error fetching SOL price:", error)
        setSolPrice(200)
      } finally {
        setIsLoadingPrice(false)
      }
    }

    if (open) {
      fetchSolPrice()
    }
  }, [open])

  const solAmount = solPrice ? (50 / solPrice).toFixed(4) : "0.25"

  const paymentAmounts = {
    SOL: solAmount,
    USDC: "50.00",
    USDT: "50.00",
  }

  const handleNextStep = () => {
    setStep("personal-info")
  }

  const handleProceedToPayment = async () => {
    // Validate personal info
    if (!firstName.trim() || !lastName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your first and last name",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    setStep("processing")
    setPaymentError(null)

    try {
      await processSolanaPayment()

      // Payment successful, show success state
      setStep("success")
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate card details
      const cardNumber = generateCardNumber()
      const expiry = generateExpiry()
      const cvv = generateCVV()

      setGeneratedCard({ number: cardNumber, expiry, cvv })

      // Save to database
      await saveCardToDatabase(cardNumber, expiry, cvv)

      setStep("card-reveal")
      setIsProcessing(false)

      toast({
        title: "Card Generated!",
        description: "Your WarpPay card is ready to use.",
      })
    } catch (error: any) {
      console.error("[v0] Payment error:", error)
      setPaymentError(error.message || "Payment failed. Please try again.")
      setStep("personal-info")
      setIsProcessing(false)
      toast({
        title: "Payment Failed",
        description: error.message || "Please try again",
        variant: "destructive",
      })
    }
  }

  const processSolanaPayment = async () => {
    if (!publicKey || !sendTransaction) {
      throw new Error("Wallet not connected")
    }

    try {
      console.log("[v0] Preparing payment transaction...")

      const paymentAmount = paymentMethod === "SOL" ? Number.parseFloat(solAmount) : 50.0

      // Step 1: Get transaction from server
      const prepareResponse = await fetch("/api/process-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentMethod,
          amount: paymentAmount,
          fromWallet: publicKey.toBase58(),
        }),
      })

      if (!prepareResponse.ok) {
        const error = await prepareResponse.json()
        throw new Error(error.error || "Failed to prepare transaction")
      }

      const { transaction: serializedTransaction } = await prepareResponse.json()

      console.log("[v0] Transaction prepared, requesting signature...")

      // Step 2: Deserialize and sign transaction
      const transaction = Transaction.from(Buffer.from(serializedTransaction, "base64"))

      const connection = new Connection(SOLANA_RPC_URL, "confirmed")
      const signature = await sendTransaction(transaction, connection, {
        skipPreflight: false,
        preflightCommitment: "confirmed",
      })

      console.log("[v0] Transaction signed and sent:", signature)

      // Step 3: Poll for confirmation instead of using WebSocket
      const maxAttempts = 30 // 30 attempts * 2 seconds = 60 seconds max
      let attempts = 0
      let confirmed = false

      while (attempts < maxAttempts && !confirmed) {
        try {
          const status = await connection.getSignatureStatus(signature)

          if (status?.value?.confirmationStatus === "confirmed" || status?.value?.confirmationStatus === "finalized") {
            confirmed = true
            console.log("[v0] Transaction confirmed!")
            break
          }

          if (status?.value?.err) {
            throw new Error("Transaction failed: " + JSON.stringify(status.value.err))
          }

          // Wait 2 seconds before next check
          await new Promise((resolve) => setTimeout(resolve, 2000))
          attempts++
          console.log(`[v0] Checking confirmation status... (${attempts}/${maxAttempts})`)
        } catch (error) {
          console.error("[v0] Error checking status:", error)
          // Continue polling even if one check fails
          await new Promise((resolve) => setTimeout(resolve, 2000))
          attempts++
        }
      }

      if (!confirmed) {
        throw new Error("Transaction confirmation timeout. Please check your wallet for the transaction status.")
      }
    } catch (error: any) {
      console.error("[v0] Solana payment error:", error)
      throw new Error(error.message || "Failed to process Solana payment")
    }
  }

  const saveCardToDatabase = async (cardNumber: string, expiry: string, cvv: string) => {
    try {
      const response = await fetch("/api/users/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: publicKey?.toBase58(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          cardNumber,
          expiryDate: expiry,
          securityCode: cvv,
          balance: 50.0,
          orderDate: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save card to database")
      }

      // Update local user state
      updateUser({
        cardStatus: "active",
        cardData: {
          number: cardNumber,
          expiry,
          cvv,
          balance: 50,
          status: "active",
          deliveryDate: calculateDeliveryDate(),
          orderedAt: Date.now(),
        },
      })
    } catch (error) {
      console.error("[v0] Error saving to database:", error)
      throw error
    }
  }

  const copyCardNumber = () => {
    if (generatedCard) {
      navigator.clipboard.writeText(generatedCard.number)
      toast({
        title: "Copied!",
        description: "Card number copied to clipboard",
      })
    }
  }

  const handleClose = () => {
    setStep("payment-method")
    setPaymentMethod("SOL")
    setFirstName("")
    setLastName("")
    setPaymentError(null)
    setGeneratedCard(null)
    setShowFullDetails(false)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-slate-800 border-slate-700">
        {step === "payment-method" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-white">Preorder Your WarpPay Card</DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="p-4 rounded-lg bg-slate-700/50 border border-slate-600">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-slate-400">Total Cost</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">$50.00</div>
                    <div className="text-xs text-slate-500">USD</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-slate-300">Select Payment Method</Label>
                <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-slate-600 bg-slate-700/30 hover:border-[#049be5] transition-colors cursor-pointer">
                    <RadioGroupItem value="SOL" id="sol" />
                    <Label htmlFor="sol" className="flex-1 cursor-pointer text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">Solana (SOL)</div>
                          <div className="text-sm text-slate-400">Fast and low fees</div>
                        </div>
                        <div className="text-right ml-4">
                          {isLoadingPrice ? (
                            <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                          ) : (
                            <>
                              <div className="font-semibold whitespace-nowrap">{paymentAmounts.SOL} SOL</div>
                              <div className="text-xs text-slate-500">≈ $50.00</div>
                            </>
                          )}
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-slate-600 bg-slate-700/30 hover:border-[#049be5] transition-colors cursor-pointer">
                    <RadioGroupItem value="USDC" id="usdc" />
                    <Label htmlFor="usdc" className="flex-1 cursor-pointer text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">USD Coin (USDC)</div>
                          <div className="text-sm text-slate-400">Stablecoin</div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="font-semibold whitespace-nowrap">{paymentAmounts.USDC} USDC</div>
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-slate-600 bg-slate-700/30 hover:border-[#049be5] transition-colors cursor-pointer">
                    <RadioGroupItem value="USDT" id="usdt" />
                    <Label htmlFor="usdt" className="flex-1 cursor-pointer text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">Tether (USDT)</div>
                          <div className="text-sm text-slate-400">Stablecoin</div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="font-semibold whitespace-nowrap">{paymentAmounts.USDT} USDT</div>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handleNextStep}
                style={{ backgroundColor: "#049be5" }}
                disabled={isLoadingPrice}
              >
                {isLoadingPrice ? "Loading..." : "Next Step"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </>
        )}

        {step === "personal-info" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-white">Confirm Personal Info</DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {paymentError && (
                <div className="p-4 rounded-lg bg-red-900/30 border border-red-700 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-red-300">{paymentError}</div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="firstName" className="text-slate-300">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    className="mt-1.5 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <Label htmlFor="lastName" className="text-slate-300">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    className="mt-1.5 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-700/50 border border-slate-600">
                <div className="text-sm font-medium text-white mb-2">Order Summary</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Payment Method</span>
                    <span className="font-medium text-white">{paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Amount</span>
                    <span className="font-medium text-white">
                      {paymentAmounts[paymentMethod]} {paymentMethod}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-600">
                    <span className="text-white font-medium">Total Cost</span>
                    <span className="font-semibold text-white">$50.00 USD</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep("payment-method")}
                  className="flex-1 bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600"
                >
                  Back
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleProceedToPayment}
                  style={{ backgroundColor: "#049be5" }}
                  disabled={isProcessing || !firstName.trim() || !lastName.trim()}
                >
                  Proceed to Payment
                </Button>
              </div>
            </div>
          </>
        )}

        {step === "processing" && (
          <div className="py-12">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="w-16 h-16 text-[#049be5] animate-spin" />
              <div className="text-center">
                <div className="text-lg font-semibold text-white">Processing Payment</div>
                <div className="text-sm text-slate-400 mt-1">Please approve the transaction in your wallet...</div>
              </div>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="py-12">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-900/30 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-400" />
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-white">Payment Confirmed!</div>
                <div className="text-sm text-slate-400 mt-1">Generating your card...</div>
              </div>
            </div>
          </div>
        )}

        {step === "card-reveal" && generatedCard && (
          <>
            <DialogHeader>
              <DialogTitle className="text-white">Your WarpPay Card is Ready!</DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="relative w-full max-w-sm mx-auto">
                <div
                  className="relative aspect-[1.586/1] rounded-2xl p-6 shadow-2xl border border-white/10 overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #5B6FDE 0%, #4DD0E1 100%)" }}
                >
                  <div className="absolute inset-0 card-shimmer opacity-30" />

                  <div className="relative h-full flex flex-col justify-between text-white">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Image
                          src="/images/warppay-logo.png"
                          alt="WarpPay"
                          width={40}
                          height={40}
                          className="w-10 h-10"
                        />
                        <span className="text-lg font-bold">WarpPay</span>
                      </div>
                      <div className="w-12 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded opacity-80" />
                    </div>

                    <div className="space-y-4">
                      <div className="text-2xl font-mono tracking-wider">
                        {showFullDetails
                          ? formatCardNumber(generatedCard.number, true)
                          : formatCardNumber(generatedCard.number)}
                      </div>

                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-xs text-slate-300 mb-1">CARDHOLDER</div>
                          <div className="font-semibold">
                            {firstName.toUpperCase()} {lastName.toUpperCase()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-slate-300 mb-1">VALID THRU</div>
                          <div className="font-semibold">{showFullDetails ? generatedCard.expiry : "••/••"}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600"
                  onClick={copyCardNumber}
                  disabled
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Number
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600"
                  onClick={() => setShowFullDetails(!showFullDetails)}
                  disabled
                >
                  {showFullDetails ? (
                    <>
                      <EyeOff className="w-4 h-4 mr-2" />
                      Hide Details
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Show Details
                    </>
                  )}
                </Button>
              </div>

              {showFullDetails && (
                <div className="p-4 rounded-lg bg-slate-700/50 border border-slate-600 space-y-3">
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Card Number</div>
                    <div className="font-mono text-sm text-white">{formatCardNumber(generatedCard.number, true)}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Expiry Date</div>
                      <div className="font-mono text-sm text-white">{generatedCard.expiry}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">CVV</div>
                      <div className="font-mono text-sm text-white">{generatedCard.cvv}</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-4 rounded-lg bg-green-900/20 border border-green-700/50">
                <div className="text-sm text-green-300 space-y-1">
                  <p className="font-medium">Your virtual card is active!</p>
                  <p className="text-green-400/80">Physical card will arrive in 7 days</p>
                  <p className="text-green-400/80">Balance: $50.00</p>
                </div>
              </div>

              <Button
                className="w-full"
                onClick={() => {
                  window.location.href = "/dashboard"
                }}
                style={{ backgroundColor: "#049be5" }}
              >
                Back to Dashboard
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
