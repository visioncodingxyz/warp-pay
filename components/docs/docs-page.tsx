"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/landing/footer"
import Image from "next/image"
import Link from "next/link"
import {
  BookOpen,
  CreditCard,
  Shield,
  Zap,
  Wallet,
  Lock,
  RefreshCw,
  Globe,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  ChevronDown,
} from "lucide-react"

export function DocsPage() {
  const [showResourcesDropdown, setShowResourcesDropdown] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 gradient-animate">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/warppay-logo.png" alt="WarpPay" width={32} height={32} className="w-8 h-8" />
            <span className="text-xl font-bold text-white">WarpPay</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-slate-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/#how-it-works" className="text-slate-300 hover:text-white transition-colors">
              How it Works
            </Link>
            <Link href="/#faq" className="text-slate-300 hover:text-white transition-colors">
              FAQ
            </Link>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShowResourcesDropdown(true)}
              onMouseLeave={() => setShowResourcesDropdown(false)}
            >
              <button className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors">
                Resources
                <ChevronDown className="w-4 h-4" />
              </button>

              {showResourcesDropdown && (
                <div className="absolute top-full pt-2 right-0 w-48">
                  <div className="rounded-lg bg-slate-800 border border-slate-700 shadow-xl overflow-hidden">
                    <Link
                      href="/docs"
                      className="block px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                    >
                      Documentation
                    </Link>
                    <a
                      href="#"
                      className="block px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                    >
                      Tokenomics
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                    >
                      Roadmap
                    </a>
                    <a
                      href="https://t.me/warp_pay"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                    >
                      Join Telegram
                    </a>
                  </div>
                </div>
              )}
            </div>
          </nav>

          <Link href="/dashboard">
            <button
              className="relative h-12 px-8 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#049be5]/50"
              style={{ backgroundColor: "#049be5" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0388cc")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#049be5")}
            >
              Dashboard
            </button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm mb-6">
            <BookOpen className="w-4 h-4" />
            <span>Documentation</span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">WarpPay Documentation</h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about using WarpPay to bridge your crypto to everyday spending.
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6">
            <TOCCard icon={<Zap />} title="Getting Started" href="#getting-started" />
            <TOCCard icon={<CreditCard />} title="Card Features" href="#card-features" />
            <TOCCard icon={<Wallet />} title="Payment Methods" href="#payment-methods" />
            <TOCCard icon={<Shield />} title="Security & Privacy" href="#security" />
            <TOCCard icon={<RefreshCw />} title="Reloading Your Card" href="#reloading" />
            <TOCCard icon={<Globe />} title="Using Your Card" href="#using-card" />
          </div>
        </div>
      </section>

      {/* Documentation Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl space-y-16">
          {/* Getting Started */}
          <DocSection id="getting-started" title="Getting Started" icon={<Zap />}>
            <div className="space-y-6">
              <p className="text-slate-300 leading-relaxed">
                WarpPay makes it easy to spend your cryptocurrency in the real world. Follow these steps to get started
                with your WarpPay prepaid Visa card.
              </p>

              <div className="space-y-4">
                <StepItem
                  number={1}
                  title="Connect Your Wallet"
                  description="Connect your Solana wallet (Phantom, Solflare, or any Solana-compatible wallet) to the WarpPay platform."
                />
                <StepItem
                  number={2}
                  title="Complete Your Profile"
                  description="Provide your username, email address, and upload a profile picture to personalize your account."
                />
                <StepItem
                  number={3}
                  title="Preorder Your Card"
                  description="Pay a one-time fee of $50 (in SOL, USDC, or USDT) to preorder your WarpPay prepaid Visa card."
                />
                <StepItem
                  number={4}
                  title="Receive Your Card"
                  description="Get your virtual card within 48 hours and your physical card within 7 business days."
                />
                <StepItem
                  number={5}
                  title="Start Spending"
                  description="Reload your card with crypto and start spending anywhere Visa is accepted worldwide."
                />
              </div>

              <InfoBox type="info">
                <strong>Pro Tip:</strong> Your virtual card is available immediately after ordering, so you can start
                making online purchases right away while waiting for your physical card to arrive.
              </InfoBox>
            </div>
          </DocSection>

          {/* Card Features */}
          <DocSection id="card-features" title="Card Features" icon={<CreditCard />}>
            <div className="space-y-6">
              <p className="text-slate-300 leading-relaxed">
                Your WarpPay card comes with powerful features designed to give you full control over your spending.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <FeatureBox
                  icon={<CreditCard />}
                  title="Virtual & Physical Cards"
                  description="Get both a virtual card for online purchases and a physical card for in-person transactions."
                />
                <FeatureBox
                  icon={<Zap />}
                  title="Instant Reloading"
                  description="Reload your card balance instantly with SOL, USDC, or USDT using Solana's fast blockchain."
                />
                <FeatureBox
                  icon={<Lock />}
                  title="Freeze/Unfreeze"
                  description="Instantly freeze or unfreeze your card from the dashboard for added security."
                />
                <FeatureBox
                  icon={<Globe />}
                  title="Global Acceptance"
                  description="Use your card anywhere Visa is accepted - online, in-store, and internationally."
                />
              </div>

              <div className="space-y-4 mt-8">
                <h3 className="text-xl font-semibold text-white">Card Details</h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>16-digit card number with CVV and expiry date</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Personalized with your first and last name</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Real-time transaction notifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>View transaction history in your dashboard</span>
                  </li>
                </ul>
              </div>
            </div>
          </DocSection>

          {/* Payment Methods */}
          <DocSection id="payment-methods" title="Payment Methods" icon={<Wallet />}>
            <div className="space-y-6">
              <p className="text-slate-300 leading-relaxed">
                WarpPay accepts multiple cryptocurrencies for card preorders and reloading. All transactions are
                processed on the Solana blockchain for speed and low fees.
              </p>

              <div className="space-y-4">
                <PaymentMethodBox
                  name="Solana (SOL)"
                  description="Native Solana token with instant transfers and minimal fees."
                  address="BJ2h6pEn5xJr3bBFCDN6pCsioYGPxwNz4RWf8urL61qd"
                />
                <PaymentMethodBox
                  name="USD Coin (USDC)"
                  description="Stablecoin pegged to the US Dollar for predictable pricing."
                  address="EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
                />
                <PaymentMethodBox
                  name="Tether (USDT)"
                  description="Popular stablecoin for stable value transfers."
                  address="Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"
                />
              </div>

              <InfoBox type="warning">
                <strong>Important:</strong> Always verify the payment amount and recipient address before confirming
                transactions. Cryptocurrency transactions are irreversible.
              </InfoBox>
            </div>
          </DocSection>

          {/* Security & Privacy */}
          <DocSection id="security" title="Security & Privacy" icon={<Shield />}>
            <div className="space-y-6">
              <p className="text-slate-300 leading-relaxed">
                Your security is our top priority. WarpPay implements industry-leading security measures to protect your
                funds and personal information.
              </p>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Security Features</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Blockchain Security:</strong> All transactions are secured by
                      Solana's proof-of-stake blockchain technology.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Encrypted Data:</strong> Your card details and personal information
                      are encrypted and stored securely.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Instant Freeze:</strong> Freeze your card instantly from the
                      dashboard if you suspect unauthorized activity.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Non-Custodial:</strong> You maintain full control of your wallet
                      and private keys at all times.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="space-y-4 mt-8">
                <h3 className="text-xl font-semibold text-white">Best Practices</h3>
                <ul className="space-y-2 text-slate-300 list-disc list-inside">
                  <li>Never share your wallet private keys or seed phrase with anyone</li>
                  <li>Enable two-factor authentication on your wallet</li>
                  <li>Regularly monitor your transaction history</li>
                  <li>Keep your card details secure and never share them publicly</li>
                  <li>Report any suspicious activity immediately</li>
                </ul>
              </div>
            </div>
          </DocSection>

          {/* Reloading Your Card */}
          <DocSection id="reloading" title="Reloading Your Card" icon={<RefreshCw />}>
            <div className="space-y-6">
              <p className="text-slate-300 leading-relaxed">
                Reloading your WarpPay card is quick and easy. Follow these steps to add funds to your card balance.
              </p>

              <div className="space-y-4">
                <StepItem
                  number={1}
                  title="Navigate to Dashboard"
                  description="Log in to your WarpPay account and go to the dashboard."
                />
                <StepItem
                  number={2}
                  title="Select Reload Amount"
                  description="Choose how much you want to add to your card balance."
                />
                <StepItem
                  number={3}
                  title="Choose Payment Method"
                  description="Select SOL, USDC, or USDT as your payment method."
                />
                <StepItem
                  number={4}
                  title="Confirm Transaction"
                  description="Review the details and confirm the transaction in your wallet."
                />
                <StepItem
                  number={5}
                  title="Funds Available"
                  description="Your card balance updates instantly after blockchain confirmation."
                />
              </div>

              <InfoBox type="success">
                <strong>Fast Processing:</strong> Thanks to Solana's high-speed blockchain, your card balance is updated
                within seconds of transaction confirmation.
              </InfoBox>
            </div>
          </DocSection>

          {/* Using Your Card */}
          <DocSection id="using-card" title="Using Your Card" icon={<Globe />}>
            <div className="space-y-6">
              <p className="text-slate-300 leading-relaxed">
                Your WarpPay card works just like any other Visa prepaid card. Use it for online shopping, in-store
                purchases, and international transactions.
              </p>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Where You Can Use Your Card</h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Online shopping on any website that accepts Visa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>In-store purchases at millions of merchants worldwide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Subscription services (Netflix, Spotify, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>International purchases with automatic currency conversion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>ATM withdrawals (where supported)</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4 mt-8">
                <h3 className="text-xl font-semibold text-white">Transaction Limits</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                    <div className="text-sm text-slate-400 mb-1">Daily Spending Limit</div>
                    <div className="text-2xl font-bold text-white">$5,000</div>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                    <div className="text-sm text-slate-400 mb-1">Monthly Spending Limit</div>
                    <div className="text-2xl font-bold text-white">$50,000</div>
                  </div>
                </div>
              </div>

              <InfoBox type="info">
                <strong>Note:</strong> Transaction limits may vary based on your account verification level and card
                usage history. Contact support for higher limits.
              </InfoBox>
            </div>
          </DocSection>

          {/* Support Section */}
          <div className="p-8 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-indigo-500/30">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-white">Need Help?</h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                Can't find what you're looking for? Our support team is here to help you with any questions or issues.
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <Button
                  size="lg"
                  className="bg-[#049be5] hover:bg-[#0388cc] text-white"
                  onClick={() => window.open("https://t.me/warp_pay", "_blank")}
                >
                  Join Telegram
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Link href="/">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

// Helper Components
function TOCCard({ icon, title, href }: { icon: React.ReactNode; title: string; href: string }) {
  return (
    <a
      href={href}
      className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-indigo-500/50 transition-all hover:scale-105 group"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/30 transition-colors">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">{title}</h3>
      </div>
    </a>
  )
}

function DocSection({
  id,
  title,
  icon,
  children,
}: {
  id: string
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div id={id} className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
          {icon}
        </div>
        <h2 className="text-3xl font-bold text-white">{title}</h2>
      </div>
      <div className="pl-0 md:pl-15">{children}</div>
    </div>
  )
}

function StepItem({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500/20 border-2 border-indigo-500/50 flex items-center justify-center text-indigo-300 font-bold">
        {number}
      </div>
      <div className="flex-1">
        <h4 className="text-lg font-semibold text-white mb-1">{title}</h4>
        <p className="text-slate-300">{description}</p>
      </div>
    </div>
  )
}

function InfoBox({ type, children }: { type: "info" | "warning" | "success"; children: React.ReactNode }) {
  const styles = {
    info: "bg-blue-500/10 border-blue-500/30 text-blue-300",
    warning: "bg-amber-500/10 border-amber-500/30 text-amber-300",
    success: "bg-green-500/10 border-green-500/30 text-green-300",
  }

  const icons = {
    info: <AlertCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    success: <CheckCircle className="w-5 h-5" />,
  }

  return (
    <div className={`p-4 rounded-lg border ${styles[type]} flex gap-3`}>
      <div className="flex-shrink-0 mt-0.5">{icons[type]}</div>
      <div className="flex-1 text-sm leading-relaxed">{children}</div>
    </div>
  )
}

function FeatureBox({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0">
          {icon}
        </div>
        <div>
          <h4 className="text-white font-semibold mb-1">{title}</h4>
          <p className="text-sm text-slate-400">{description}</p>
        </div>
      </div>
    </div>
  )
}

function PaymentMethodBox({ name, description, address }: { name: string; description: string; address: string }) {
  return (
    <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
      <h4 className="text-white font-semibold mb-2">{name}</h4>
      <p className="text-sm text-slate-400 mb-3">{description}</p>
      <div className="text-xs text-slate-500 font-mono break-all">Contract: {address}</div>
    </div>
  )
}
