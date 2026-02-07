"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { useWallet } from "@solana/wallet-adapter-react"
import { useUser } from "@/components/providers/user-provider"
import { useEffect, useState } from "react"
import { ProfileSetupModal } from "@/components/modals/profile-setup-modal"
import {
  CreditCard,
  Rocket,
  Shield,
  Wallet,
  Package,
  Zap,
  ChevronDown,
  ArrowRight,
  Copy,
  Check,
  Menu,
  X,
  DollarSign,
  Award,
  TrendingUp,
  Coins,
  Users,
} from "lucide-react"
import { Footer } from "./footer"
import Image from "next/image"
import { useRouter } from "next/navigation"

export function LandingPage() {
  const { connected } = useWallet()
  const { isNewUser, isLoading } = useUser()
  const [showProfileSetup, setShowProfileSetup] = useState(false)
  const [showResourcesDropdown, setShowResourcesDropdown] = useState(false)
  const [copied, setCopied] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    console.log("[v0] Landing page state:", { connected, isNewUser, isLoading, showProfileSetup })

    if (connected && isNewUser && !isLoading) {
      console.log("[v0] Showing profile setup modal")
      setShowProfileSetup(true)
    } else {
      setShowProfileSetup(false)
    }
  }, [connected, isNewUser, isLoading])

  const handleNavigateToDashboard = () => {
    router.push("/dashboard")
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const copyContractAddress = async () => {
    const contractAddress = "wARPySVJg8c5db7mwDt79BjzkNxXJuV9Jg3TfGrLZM5"
    try {
      await navigator.clipboard.writeText(contractAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 gradient-animate">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/images/warppay-logo.png" alt="WarpPay" width={32} height={32} className="w-8 h-8" />
            <span className="text-xl font-bold text-white">WarpPay</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-slate-300 hover:text-white transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-slate-300 hover:text-white transition-colors"
            >
              How it Works
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-slate-300 hover:text-white transition-colors"
            >
              FAQ
            </button>
            <button
              onClick={() => router.push("/whitepaper")}
              className="text-slate-300 hover:text-white transition-colors"
            >
              Whitepaper
            </button>

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
                    <a
                      href="/docs"
                      className="block px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                    >
                      Documentation
                    </a>
                    <a
                      href="/whitepaper#tokenomics"
                      className="block px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                    >
                      Tokenomics
                    </a>
                    <a
                      href="/whitepaper#roadmap"
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
                      Get Support
                    </a>
                  </div>
                </div>
              )}
            </div>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Dashboard Button */}
          <button
            onClick={handleNavigateToDashboard}
            className="hidden md:block relative h-12 px-8 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#049be5]/50"
            style={{ backgroundColor: "#049be5" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0388cc")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#049be5")}
          >
            Dashboard
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-slate-900/95 backdrop-blur-lg">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <button
                onClick={() => {
                  scrollToSection("features")
                  setMobileMenuOpen(false)
                }}
                className="text-slate-300 hover:text-white transition-colors text-left py-2"
              >
                Features
              </button>
              <button
                onClick={() => {
                  scrollToSection("how-it-works")
                  setMobileMenuOpen(false)
                }}
                className="text-slate-300 hover:text-white transition-colors text-left py-2"
              >
                How it Works
              </button>
              <button
                onClick={() => {
                  scrollToSection("faq")
                  setMobileMenuOpen(false)
                }}
                className="text-slate-300 hover:text-white transition-colors text-left py-2"
              >
                FAQ
              </button>
              <button
                onClick={() => {
                  router.push("/whitepaper")
                  setMobileMenuOpen(false)
                }}
                className="text-slate-300 hover:text-white transition-colors text-left py-2"
              >
                Whitepaper
              </button>

              {/* Resources submenu */}
              <div className="border-t border-white/10 pt-4">
                <div className="text-slate-400 text-sm font-semibold mb-2">Resources</div>
                <a
                  href="/docs"
                  className="block text-slate-300 hover:text-white transition-colors py-2 pl-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Documentation
                </a>
                <a
                  href="/whitepaper#tokenomics"
                  className="block text-slate-300 hover:text-white transition-colors py-2 pl-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Tokenomics
                </a>
                <a
                  href="/whitepaper#roadmap"
                  className="block text-slate-300 hover:text-white transition-colors py-2 pl-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Roadmap
                </a>
                <a
                  href="https://t.me/warp_pay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-slate-300 hover:text-white transition-colors py-2 pl-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Support
                </a>
              </div>

              <button
                onClick={() => {
                  handleNavigateToDashboard()
                  setMobileMenuOpen(false)
                }}
                className="mt-4 h-12 px-8 rounded-lg font-semibold text-white transition-all duration-300"
                style={{ backgroundColor: "#049be5" }}
              >
                Dashboard
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm">
                <Image src="/images/solana-logo.png" alt="Solana" width={16} height={16} className="w-4 h-4" />
                <span>Powered by Solana</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">Bridge Crypto to Fiat Currency</h1>

              <p className="text-xl text-slate-300 leading-relaxed">
                Get your WarpPay prepaid Visa card. Reload with SOL instantly and spend anywhere Visa is accepted.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={handleNavigateToDashboard}
                  className="h-12 px-8 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#049be5]/50"
                  style={{ backgroundColor: "#049be5" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0388cc")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#049be5")}
                >
                  Get Started
                </button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 font-semibold border-2 border-white/20 text-white bg-transparent hover:bg-transparent hover:border-white hover:text-white hover:scale-105 transition-all duration-300"
                  onClick={() => router.push("/docs")}
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Right Content - Card Mockup */}
            <div className="relative float-animation">
              <div className="relative w-full max-w-md mx-auto">
                {/* Card */}
                <div
                  className="relative aspect-[1.586/1] rounded-2xl p-6 shadow-2xl overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #5B6FDE 0%, #4DD0E1 100%)" }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 card-shimmer opacity-50" />

                  {/* Card Content */}
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
                      <div className="text-xl sm:text-2xl font-mono tracking-wider">•••• •••• •••• 8742</div>

                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-[10px] sm:text-xs text-slate-200 mb-1">CARDHOLDER</div>
                          <div className="text-sm sm:text-base font-semibold">YOUR NAME</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] sm:text-xs text-slate-200 mb-1">VALID THRU</div>
                          <div className="text-sm sm:text-base font-semibold">••/••</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 right-4 md:right-8 z-10 flex flex-row items-center gap-2">
            {/* Buy $WARP Button */}
            <a
              href="https://jup.ag/swap?sell=So11111111111111111111111111111111111111112&buy=wARPySVJg8c5db7mwDt79BjzkNxXJuV9Jg3TfGrLZM5"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 md:px-4 h-9 md:h-10 rounded-lg bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 hover:border-[#049be5] hover:bg-slate-800 transition-all group shadow-lg whitespace-nowrap"
            >
              <span className="text-xs md:text-sm font-semibold text-white">Buy $WARP</span>
              <ArrowRight className="w-3.5 md:w-4 h-3.5 md:h-4 text-slate-400 group-hover:text-[#049be5] group-hover:translate-x-0.5 transition-all" />
            </a>

            {/* Contract Address Copy Box */}
            <button
              onClick={copyContractAddress}
              className="inline-flex items-center gap-1.5 px-3 md:px-4 h-9 md:h-10 rounded-lg bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 hover:border-[#049be5] hover:bg-slate-800 transition-all group shadow-lg"
            >
              {/* Full address on desktop, truncated on mobile */}
              <span className="hidden sm:inline text-xs font-mono text-slate-300 group-hover:text-white transition-colors">
                wARPySVJg8c5db7mwDt79BjzkNxXJuV9Jg3TfGrLZM5
              </span>
              <span className="sm:hidden text-[10px] font-mono text-slate-300 group-hover:text-white transition-colors">
                wARP...LZM5
              </span>
              {copied ? (
                <Check className="w-3.5 md:w-4 h-3.5 md:h-4 text-green-400" />
              ) : (
                <Copy className="w-3.5 md:w-4 h-3.5 md:h-4 text-slate-400 group-hover:text-[#049be5] transition-colors" />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          {/* Title and Description for Features Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose WarpPay</h2>
            <p className="text-xl text-slate-400">Powerful features and exclusive $WARP token benefits</p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <FeatureCard
              icon={<Rocket className="w-6 h-6" />}
              title="Quick Issuance"
              description="Get your virtual card within 48 hours after preorder. Then start spending right away."
            />
            <FeatureCard
              icon={<CreditCard className="w-6 h-6" />}
              title="Crypto Reloading"
              description="Reload your card balance instantly with SOL, USDC, or USDT."
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Solana Speed"
              description="Powered by Solana blockchain for lightning-fast transactions."
            />
          </div>

          {/* $WARP Token Benefits Section */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">Unlock Exclusive Benefits</h3>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Hold $WARP tokens to access exclusive benefits and rewards within the WarpPay ecosystem
              </p>
            </div>

            {/* Current Benefits */}
            <div className="mb-12">
              <h4 className="text-xl font-semibold text-white mb-6 text-center">Current Benefits</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <BenefitCard
                  icon={<DollarSign className="w-6 h-6" />}
                  title="Fee Discounts"
                  description="Save 50% on all WarpPay card fees by holding $WARP tokens. Reduce your costs on card orders, reloads, and transactions."
                />
                <BenefitCard
                  icon={<Award className="w-6 h-6" />}
                  title="Holder Rewards"
                  description="Earn automatic $SOL airdrops every 15 minutes when you hold 1M+ $WARP tokens. Passive income for loyal holders."
                />
              </div>
            </div>

            {/* Upcoming Benefits */}
            <div>
              <h4 className="text-xl font-semibold text-white mb-6 text-center">Upcoming Benefits (Q1 2026)</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <BenefitCard
                  icon={<TrendingUp className="w-6 h-6" />}
                  title="Tiered Cashback"
                  description="Earn cashback on every purchase based on your $WARP holdings. Higher tiers unlock better rates up to 5%."
                />
                <BenefitCard
                  icon={<Coins className="w-6 h-6" />}
                  title="Staking Rewards"
                  description="Stake your $WARP tokens to earn 15-30% APY. Lock your tokens for higher rewards."
                />
                <BenefitCard
                  icon={<Users className="w-6 h-6" />}
                  title="DAO Governance"
                  description="Vote on platform decisions including fee structures, new features, and partnerships."
                />
              </div>
            </div>

            {/* Cashback Tiers */}
            <div className="mt-12 p-8 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30">
              <h4 className="text-2xl font-bold text-white mb-6 text-center">Cashback Tier System</h4>
              <div className="grid md:grid-cols-4 gap-4">
                <TierCard tier="Bronze" requirement="100K - 999K $WARP" cashback="1%" />
                <TierCard tier="Silver" requirement="1M - 4.9M $WARP" cashback="2%" />
                <TierCard tier="Gold" requirement="5M - 9.9M $WARP" cashback="3%" />
                <TierCard tier="Platinum" requirement="10M+ $WARP" cashback="5%" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-slate-400">Get started with WarpPay in four simple steps</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <StepCard
              icon={<Wallet className="w-8 h-8" />}
              title="Connect Wallet"
              description="Connect your Solana wallet to get started with WarpPay"
            />
            <StepCard
              icon={<CreditCard className="w-8 h-8" />}
              title="Preorder Card"
              description="Pay $50 to preorder your WarpPay prepaid Visa card"
            />
            <StepCard
              icon={<Package className="w-8 h-8" />}
              title="Receive Card"
              description="Get your physical card delivered within 7 days"
            />
            <StepCard
              icon={<Zap className="w-8 h-8" />}
              title="Reload & Spend"
              description="Reload with SOL and spend anywhere Visa is accepted"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-slate-900/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-400">Everything you need to know about WarpPay</p>
          </div>

          <div className="space-y-4">
            <FAQItem
              question="What is WarpPay?"
              answer="WarpPay is a crypto-to-fiat payment solution that allows you to preorder prepaid Visa cards and reload them instantly with Solana (SOL) or other cryptocurrencies. Spend your crypto anywhere Visa is accepted."
            />
            <FAQItem
              question="How much does the card cost?"
              answer="The WarpPay card costs $50 to preorder. This one-time fee covers card issuance and delivery. There are no monthly fees or hidden charges."
            />
            <FAQItem
              question="How long does delivery take?"
              answer="Physical cards are delivered within 7 business days after ordering. If you preordered your Warp card, you will receive your virtual card within 24-48 hours."
            />
            <FAQItem
              question="Which cryptocurrencies can I use?"
              answer="Currently, you can reload your WarpPay card with SOL (Solana), USDC, and USDT. We're working on adding support for more cryptocurrencies in the future."
            />
            <FAQItem
              question="Are there any transaction fees?"
              answer="WarpPay charges minimal transaction fees for crypto-to-fiat conversions. Standard Visa merchant fees may apply when making purchases, just like any other prepaid card."
            />
            <FAQItem
              question="Is WarpPay secure?"
              answer="Yes! WarpPay is built on Solana blockchain technology, ensuring fast and secure transactions. Your card details are encrypted, and you have full control over freezing/unfreezing your card anytime."
            />
          </div>
        </div>
      </section>

      {/* Footer Component */}
      <Footer />

      {/* Profile Setup Modal */}
      {showProfileSetup && <ProfileSetupModal open={showProfileSetup} onClose={() => setShowProfileSetup(false)} />}
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-indigo-500/50 transition-colors">
      <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
  )
}

// StepCard component for How It Works section
function StepCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="relative">
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Icon */}
        <div className="w-16 h-16 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-cyan-400">
          {icon}
        </div>

        {/* Content */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Connector line (hidden on last item) */}
      <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-slate-700 to-transparent" />
    </div>
  )
}

// FAQItem component for FAQ section
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 overflow-hidden transition-all hover:border-indigo-500/30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors hover:bg-slate-800/70"
      >
        <span className="text-lg font-semibold text-white pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-6 pb-5 text-slate-300 leading-relaxed">{answer}</div>
      </div>
    </div>
  )
}

// BenefitCard component for $WARP Token Benefits section
function BenefitCard({
  icon,
  title,
  description,
  badge,
  badgeColor,
}: {
  icon: React.ReactNode
  title: string
  description: string
  badge?: string
  badgeColor?: string
}) {
  return (
    <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-indigo-500/50 transition-colors">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            {badge && (
              <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${badgeColor}`}>{badge}</span>
            )}
          </div>
        </div>
      </div>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
  )
}

// TierCard component for Cashback Tiers section
function TierCard({ tier, requirement, cashback }: { tier: string; requirement: string; cashback: string }) {
  return (
    <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 text-center">
      <div className="text-2xl font-bold text-white mb-2">{tier}</div>
      <div className="text-sm text-slate-400 mb-4">{requirement}</div>
      <div className="text-3xl font-bold text-green-400">{cashback}</div>
      <div className="text-sm text-slate-300 mt-1">Cashback</div>
    </div>
  )
}
