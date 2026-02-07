"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/landing/footer"
import Image from "next/image"
import Link from "next/link"
import {
  FileText,
  Coins,
  TrendingUp,
  Users,
  Shield,
  Zap,
  Globe,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  Rocket,
  Target,
  Award,
  DollarSign,
  PieChart,
} from "lucide-react"

export function WhitepaperPage() {
  const [showResourcesDropdown, setShowResourcesDropdown] = useState(false)

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
                    <Link
                      href="/whitepaper"
                      className="block px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                    >
                      Whitepaper
                    </Link>
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
            <FileText className="w-4 h-4" />
            <span>Whitepaper</span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">$WARP Token Whitepaper</h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            The utility token powering the WarpPay ecosystem. Earn rewards, save on fees, and participate in governance.
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6">
            <TOCCard icon={<FileText />} title="Introduction" href="#introduction" />
            <TOCCard icon={<Coins />} title="Token Information" href="#token-info" />
            <TOCCard icon={<PieChart />} title="Tokenomics" href="#tokenomics" />
            <TOCCard icon={<Award />} title="Utility & Benefits" href="#utility" />
            <TOCCard icon={<Rocket />} title="Roadmap" href="#roadmap" />
            <TOCCard icon={<Target />} title="Vision" href="#vision" />
          </div>
        </div>
      </section>

      {/* Whitepaper Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl space-y-16">
          {/* Introduction */}
          <DocSection id="introduction" title="Introduction" icon={<FileText />}>
            <div className="space-y-6">
              <p className="text-slate-300 leading-relaxed">
                WarpPay is revolutionizing the way people spend cryptocurrency by bridging the gap between digital
                assets and everyday purchases. The $WARP token is the native utility token of the WarpPay ecosystem,
                designed to provide holders with exclusive benefits, rewards, and governance rights.
              </p>

              <p className="text-slate-300 leading-relaxed">
                Built on the Solana blockchain, $WARP leverages the speed, security, and low transaction costs of one of
                the most advanced blockchain networks. Our mission is to make cryptocurrency spending as easy and
                accessible as using a traditional debit card, while rewarding our community for their participation and
                loyalty.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <StatBox icon={<Users />} value="1B" label="Total Supply" />
                <StatBox icon={<Zap />} value="10%" label="Transaction Tax" />
                <StatBox icon={<TrendingUp />} value="5%" label="Buyback & Burn" />
              </div>
            </div>
          </DocSection>

          {/* Token Information */}
          <DocSection id="token-info" title="Token Information" icon={<Coins />}>
            <div className="space-y-6">
              <p className="text-slate-300 leading-relaxed">
                The $WARP token is designed with a deflationary model to ensure long-term value appreciation for
                holders. Here are the key details:
              </p>

              <div className="space-y-4">
                <InfoCard
                  title="Token Name"
                  value="WarpPay"
                  description="The official name of the utility token"
                  icon={<Coins />}
                />
                <InfoCard
                  title="Token Symbol"
                  value="$WARP"
                  description="The ticker symbol used on exchanges and wallets"
                  icon={<DollarSign />}
                />
                <InfoCard
                  title="Total Supply"
                  value="1,000,000,000"
                  description="Fixed maximum supply with no additional minting"
                  icon={<PieChart />}
                />
                <InfoCard
                  title="Blockchain"
                  value="Solana"
                  description="Built on Solana for fast, low-cost transactions"
                  icon={<Zap />}
                />
              </div>

              <InfoBox type="info">
                <strong>Deflationary Model:</strong> With 5% of every transaction allocated to buyback and burn, the
                total supply of $WARP will decrease over time, making each token more scarce and potentially more
                valuable.
              </InfoBox>
            </div>
          </DocSection>

          {/* Tokenomics */}
          <DocSection id="tokenomics" title="Tokenomics" icon={<PieChart />}>
            <div className="space-y-6">
              <p className="text-slate-300 leading-relaxed">
                $WARP implements a 10% tax on every buy, sell, and transfer transaction. This tax is strategically
                allocated to ensure the long-term sustainability and growth of the WarpPay ecosystem.
              </p>

              <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-indigo-500/30">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Tax Allocation Breakdown</h3>

                <div className="space-y-4">
                  <TaxAllocationBar percentage={50} label="Buyback & Burns" color="bg-red-500" />
                  <TaxAllocationBar percentage={40} label="Marketing & Development" color="bg-blue-500" />
                  <TaxAllocationBar percentage={10} label="Holder Rewards" color="bg-green-500" />
                </div>
              </div>

              <div className="space-y-4 mt-8">
                <h3 className="text-xl font-semibold text-white">Tax Allocation Details</h3>

                <div className="space-y-4">
                  <TaxCard
                    percentage="5%"
                    title="Buyback & Burns"
                    description="Automatically buys back $WARP tokens from the market and permanently removes them from circulation, reducing supply and increasing scarcity."
                    icon={<TrendingUp />}
                    color="text-red-400"
                  />
                  <TaxCard
                    percentage="4%"
                    title="Marketing & Development"
                    description="Funds marketing campaigns, partnerships, platform development, and ecosystem expansion to drive adoption and increase utility."
                    icon={<Rocket />}
                    color="text-blue-400"
                  />
                  <TaxCard
                    percentage="1%"
                    title="Holder Rewards"
                    description="Distributed as $SOL rewards to holders every 15 minutes. Requires minimum 1M+ $WARP tokens for eligibility. Coming soon!"
                    icon={<Award />}
                    color="text-green-400"
                  />
                </div>
              </div>

              <InfoBox type="success">
                <strong>Passive Income:</strong> Hold 1M+ $WARP tokens to automatically receive $SOL rewards every 15
                minutes, creating a sustainable passive income stream for long-term holders.
              </InfoBox>
            </div>
          </DocSection>

          {/* Utility & Benefits */}
          <DocSection id="utility" title="Utility & Benefits" icon={<Award />}>
            <div className="space-y-6">
              <p className="text-slate-300 leading-relaxed">
                $WARP is more than just a token - it's your key to unlocking exclusive benefits within the WarpPay
                ecosystem. The more $WARP you hold, the more value you receive.
              </p>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Current Benefits</h3>

                <BenefitCard
                  icon={<DollarSign />}
                  title="Fee Discounts"
                  description="Save 50% on all WarpPay card fees by holding $WARP tokens. Reduce your costs on card orders, reloads, and transactions."
                  badge="Live Now"
                  badgeColor="bg-green-500"
                />

                <BenefitCard
                  icon={<Award />}
                  title="Holder Rewards"
                  description="Earn automatic $SOL airdrops every 15 minutes when you hold 1M+ $WARP tokens. Passive income for loyal holders."
                  badge="Live Now"
                  badgeColor="bg-green-500"
                />
              </div>

              <div className="space-y-4 mt-8">
                <h3 className="text-xl font-semibold text-white">Upcoming Benefits (Q1 2026)</h3>

                <BenefitCard
                  icon={<TrendingUp />}
                  title="Tiered Cashback System"
                  description="Earn cashback on every purchase based on your $WARP holdings. Higher tiers unlock better cashback rates up to 5%."
                  badge="Q1 2026"
                  badgeColor="bg-indigo-500"
                />

                <BenefitCard
                  icon={<Coins />}
                  title="Staking Rewards"
                  description="Stake your $WARP tokens to earn 15-30% APY. Lock your tokens for higher rewards and help secure the ecosystem."
                  badge="Q1 2026"
                  badgeColor="bg-indigo-500"
                />

                <BenefitCard
                  icon={<Users />}
                  title="DAO Governance"
                  description="Vote on platform decisions including fee structures, new features, and partnership opportunities. Your voice matters."
                  badge="Q1 2026"
                  badgeColor="bg-indigo-500"
                />
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 mt-8">
                <h3 className="text-xl font-bold text-white mb-4">Cashback Tier System (Coming Q1 2026)</h3>
                <div className="space-y-3">
                  <TierRow tier="Bronze" requirement="100K - 999K $WARP" cashback="1% Cashback" />
                  <TierRow tier="Silver" requirement="1M - 4.9M $WARP" cashback="2% Cashback" />
                  <TierRow tier="Gold" requirement="5M - 9.9M $WARP" cashback="3% Cashback" />
                  <TierRow tier="Platinum" requirement="10M+ $WARP" cashback="5% Cashback" />
                </div>
              </div>
            </div>
          </DocSection>

          {/* Roadmap */}
          <DocSection id="roadmap" title="Roadmap" icon={<Rocket />}>
            <div className="space-y-8">
              <p className="text-slate-300 leading-relaxed">
                Our roadmap outlines the strategic development and expansion of the WarpPay ecosystem over the next 18
                months. Each phase builds upon the previous one to create a comprehensive crypto spending solution.
              </p>

              {/* Phase 1 */}
              <RoadmapPhase
                phase="Phase 1"
                title="Launch 🚀"
                timeline="Q4 2025"
                status="In Progress"
                statusColor="bg-green-500"
              >
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">WarpPay Cards Launch:</strong> Virtual and physical prepaid Visa
                      cards go live, enabling crypto-to-fiat spending worldwide
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">$WARP Token Launch:</strong> Official token launch on Solana with
                      initial liquidity and exchange listings
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Basic Utility:</strong> 50% fee discount for $WARP holders on all
                      card-related fees
                    </span>
                  </li>
                </ul>
              </RoadmapPhase>

              {/* Phase 2 */}
              <RoadmapPhase
                phase="Phase 2"
                title="Growth 📈"
                timeline="Q1 2026"
                status="Planned"
                statusColor="bg-amber-500"
              >
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-amber-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Tiered Cashback System:</strong> Launch cashback rewards based on
                      $WARP holdings (1-5% cashback depending on tier)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-amber-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">$WARP Staking Pool:</strong> Stake tokens to earn 15-30% APY and
                      support ecosystem security
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-amber-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">DAO Governance:</strong> Token holders vote on fees, features, and
                      partnerships through decentralized governance
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-amber-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">WarpPay for Business:</strong> Dedicated dashboard for businesses
                      to accept crypto payments and manage expenses
                    </span>
                  </li>
                </ul>
              </RoadmapPhase>

              {/* Phase 3 */}
              <RoadmapPhase
                phase="Phase 3"
                title="Scale 🌍"
                timeline="Q2 2026 and Beyond"
                status="Future"
                statusColor="bg-indigo-500"
              >
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-indigo-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Global Expansion:</strong> Multi-currency support and partnerships
                      with international payment processors
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-indigo-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Credit Cards & Lending:</strong> Launch WarpPay credit cards with
                      crypto-backed lending options
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-indigo-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">White-Label Solution:</strong> WarpPay API for partners and
                      developers to integrate crypto card functionality
                    </span>
                  </li>
                </ul>
              </RoadmapPhase>

              <InfoBox type="info">
                <strong>Flexible Roadmap:</strong> While we're committed to these milestones, we remain agile and
                responsive to community feedback and market conditions. Additional features may be added based on user
                demand.
              </InfoBox>
            </div>
          </DocSection>

          {/* Vision */}
          <DocSection id="vision" title="Vision & Conclusion" icon={<Target />}>
            <div className="space-y-6">
              <p className="text-slate-300 leading-relaxed">
                Our vision is to create a world where spending cryptocurrency is as easy and natural as using
                traditional payment methods. WarpPay bridges the gap between the crypto economy and everyday commerce,
                making digital assets truly useful for daily life.
              </p>

              <p className="text-slate-300 leading-relaxed">
                The $WARP token is central to this vision, providing holders with tangible benefits while supporting the
                growth and sustainability of the ecosystem. Through our deflationary tokenomics, holder rewards, and
                expanding utility, we're building a token that grows in value alongside the platform.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <VisionCard
                  icon={<Globe />}
                  title="Mass Adoption"
                  description="Make crypto spending accessible to millions of users worldwide through simple, user-friendly products."
                />
                <VisionCard
                  icon={<Shield />}
                  title="Security First"
                  description="Maintain the highest security standards to protect user funds and personal information at all times."
                />
                <VisionCard
                  icon={<Users />}
                  title="Community Driven"
                  description="Empower our community through DAO governance, allowing token holders to shape the platform's future."
                />
                <VisionCard
                  icon={<TrendingUp />}
                  title="Sustainable Growth"
                  description="Build a sustainable ecosystem with deflationary tokenomics and real utility that drives long-term value."
                />
              </div>
            </div>
          </DocSection>

          {/* Support Section */}
          <div className="p-8 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-indigo-500/30">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-white">Questions About $WARP?</h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                Join our Telegram community to learn more about the $WARP token, ask questions, and connect with other
                holders.
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
                <Link href="/docs">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    Read Documentation
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

function StatBox({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 text-center">
      <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto mb-3">
        {icon}
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-slate-400">{label}</div>
    </div>
  )
}

function InfoCard({
  title,
  value,
  description,
  icon,
}: {
  title: string
  value: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <div className="text-sm text-slate-400 mb-1">{title}</div>
          <div className="text-2xl font-bold text-white mb-2">{value}</div>
          <div className="text-sm text-slate-300">{description}</div>
        </div>
      </div>
    </div>
  )
}

function TaxAllocationBar({ percentage, label, color }: { percentage: number; label: string; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-white font-medium">{label}</span>
        <span className="text-slate-300">{percentage}%</span>
      </div>
      <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

function TaxCard({
  percentage,
  title,
  description,
  icon,
  color,
}: {
  percentage: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
}) {
  return (
    <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-lg bg-slate-700/50 flex items-center justify-center ${color} flex-shrink-0`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className={`text-2xl font-bold ${color}`}>{percentage}</span>
            <span className="text-xl font-semibold text-white">{title}</span>
          </div>
          <p className="text-sm text-slate-300">{description}</p>
        </div>
      </div>
    </div>
  )
}

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
  badge: string
  badgeColor: string
}) {
  return (
    <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="text-lg font-semibold text-white">{title}</h4>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${badgeColor}`}>{badge}</span>
          </div>
          <p className="text-sm text-slate-300">{description}</p>
        </div>
      </div>
    </div>
  )
}

function TierRow({ tier, requirement, cashback }: { tier: string; requirement: string; cashback: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-green-400" />
        <span className="font-semibold text-white">{tier}</span>
      </div>
      <div className="text-sm text-slate-300">{requirement}</div>
      <div className="font-semibold text-green-400">{cashback}</div>
    </div>
  )
}

function RoadmapPhase({
  phase,
  title,
  timeline,
  status,
  statusColor,
  children,
}: {
  phase: string
  title: string
  timeline: string
  status: string
  statusColor: string
  children: React.ReactNode
}) {
  return (
    <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-sm text-slate-400 mb-1">{phase}</div>
          <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
          <div className="text-sm text-slate-300">{timeline}</div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${statusColor}`}>{status}</span>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  )
}

function VisionCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
      <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
        {icon}
      </div>
      <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
      <p className="text-sm text-slate-300">{description}</p>
    </div>
  )
}

function InfoBox({ type, children }: { type: "info" | "warning" | "success"; children: React.ReactNode }) {
  const styles = {
    info: "bg-blue-500/10 border-blue-500/30 text-blue-300",
    warning: "bg-amber-500/10 border-amber-500/30 text-amber-300",
    success: "bg-green-500/10 border-green-500/30 text-green-300",
  }

  return (
    <div className={`p-4 rounded-lg border ${styles[type]} flex gap-3`}>
      <div className="flex-1 text-sm leading-relaxed">{children}</div>
    </div>
  )
}
