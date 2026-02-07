"use client"

import type React from "react"
import { useState } from "react"
import { Footer } from "@/components/landing/footer"
import Image from "next/image"
import Link from "next/link"
import { Shield, Lock, Eye, Database, UserCheck, FileText, ChevronDown } from "lucide-react"

export function PrivacyPage() {
  const [showResourcesDropdown, setShowResourcesDropdown] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 gradient-animate">
      {/* Header - Same as homepage */}
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
            <Shield className="w-4 h-4" />
            <span>Privacy Policy</span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">Privacy Policy</h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Your privacy matters to us. Learn how we collect, use, and protect your personal information.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl space-y-12">
          <Section title="Introduction" icon={<FileText />}>
            <p className="text-slate-300 leading-relaxed mb-4">
              WarpPay ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how
              we collect, use, disclose, and safeguard your information when you use our prepaid Visa card service
              powered by Solana blockchain technology.
            </p>
            <p className="text-slate-300 leading-relaxed">
              By using WarpPay, you agree to the collection and use of information in accordance with this policy. If
              you do not agree with our policies and practices, please do not use our services.
            </p>
          </Section>

          <Section title="Information We Collect" icon={<Database />}>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Personal Information</h3>
                <ul className="space-y-2 text-slate-300 list-disc list-inside">
                  <li>Username and email address</li>
                  <li>First and last name (for card personalization)</li>
                  <li>Profile picture (optional)</li>
                  <li>Wallet address (Solana blockchain)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Transaction Information</h3>
                <ul className="space-y-2 text-slate-300 list-disc list-inside">
                  <li>Card preorder and reload transactions</li>
                  <li>Payment method selections (SOL, USDC, USDT)</li>
                  <li>Transaction amounts and timestamps</li>
                  <li>Card usage and spending history</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Technical Information</h3>
                <ul className="space-y-2 text-slate-300 list-disc list-inside">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Usage data and analytics</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </Section>

          <Section title="How We Use Your Information" icon={<Eye />}>
            <p className="text-slate-300 leading-relaxed mb-4">We use the information we collect to:</p>
            <ul className="space-y-2 text-slate-300 list-disc list-inside">
              <li>Provide, operate, and maintain our prepaid card services</li>
              <li>Process your card preorders and reload transactions</li>
              <li>Personalize your card with your name</li>
              <li>Send you transaction confirmations and account updates</li>
              <li>Detect and prevent fraud and unauthorized activities</li>
              <li>Comply with legal obligations and regulatory requirements</li>
              <li>Improve our services and develop new features</li>
              <li>Communicate with you about updates, promotions, and support</li>
            </ul>
          </Section>

          <Section title="Data Security" icon={<Lock />}>
            <p className="text-slate-300 leading-relaxed mb-4">
              We implement industry-standard security measures to protect your personal information:
            </p>
            <ul className="space-y-2 text-slate-300 list-disc list-inside">
              <li>End-to-end encryption for sensitive data transmission</li>
              <li>Secure database storage with encryption at rest</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Blockchain-based transaction security via Solana</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              However, no method of transmission over the internet or electronic storage is 100% secure. While we strive
              to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
            </p>
          </Section>

          <Section title="Information Sharing" icon={<UserCheck />}>
            <p className="text-slate-300 leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information
              only in the following circumstances:
            </p>
            <ul className="space-y-2 text-slate-300 list-disc list-inside">
              <li>
                <strong className="text-white">Service Providers:</strong> With trusted third-party service providers
                who assist in operating our platform (e.g., card issuers, payment processors)
              </li>
              <li>
                <strong className="text-white">Legal Requirements:</strong> When required by law, court order, or
                government regulation
              </li>
              <li>
                <strong className="text-white">Business Transfers:</strong> In connection with a merger, acquisition, or
                sale of assets
              </li>
              <li>
                <strong className="text-white">Fraud Prevention:</strong> To protect against fraud, unauthorized
                transactions, and illegal activities
              </li>
            </ul>
          </Section>

          <Section title="Your Privacy Rights" icon={<Shield />}>
            <p className="text-slate-300 leading-relaxed mb-4">You have the right to:</p>
            <ul className="space-y-2 text-slate-300 list-disc list-inside">
              <li>Access and review your personal information</li>
              <li>Request corrections to inaccurate or incomplete data</li>
              <li>Request deletion of your account and personal data</li>
              <li>Opt-out of marketing communications</li>
              <li>Export your transaction history and account data</li>
              <li>Withdraw consent for data processing (where applicable)</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              To exercise these rights, please contact us through our support channels. We will respond to your request
              within 30 days.
            </p>
          </Section>

          <Section title="Cookies and Tracking" icon={<Eye />}>
            <p className="text-slate-300 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your experience on our platform. Cookies help
              us:
            </p>
            <ul className="space-y-2 text-slate-300 list-disc list-inside">
              <li>Remember your preferences and settings</li>
              <li>Analyze usage patterns and improve our services</li>
              <li>Provide personalized content and recommendations</li>
              <li>Detect and prevent fraudulent activities</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              You can control cookie preferences through your browser settings. However, disabling cookies may limit
              certain features of our platform.
            </p>
          </Section>

          <Section title="Data Retention" icon={<Database />}>
            <p className="text-slate-300 leading-relaxed">
              We retain your personal information for as long as necessary to provide our services and comply with legal
              obligations. Transaction records are retained for a minimum of 7 years as required by financial
              regulations. When you close your account, we will delete or anonymize your personal information within 90
              days, except where retention is required by law.
            </p>
          </Section>

          <Section title="Children's Privacy" icon={<UserCheck />}>
            <p className="text-slate-300 leading-relaxed">
              WarpPay is not intended for users under the age of 18. We do not knowingly collect personal information
              from children. If you believe we have inadvertently collected information from a minor, please contact us
              immediately, and we will take steps to delete such information.
            </p>
          </Section>

          <Section title="International Users" icon={<FileText />}>
            <p className="text-slate-300 leading-relaxed">
              WarpPay operates globally and may transfer your information to countries outside your residence. By using
              our services, you consent to the transfer of your information to countries that may have different data
              protection laws. We ensure appropriate safeguards are in place to protect your information in accordance
              with this Privacy Policy.
            </p>
          </Section>

          <Section title="Changes to This Policy" icon={<FileText />}>
            <p className="text-slate-300 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal
              requirements. We will notify you of any material changes by posting the new policy on this page and
              updating the "Last updated" date. Your continued use of WarpPay after changes are posted constitutes your
              acceptance of the updated policy.
            </p>
          </Section>

          <Section title="Contact Us" icon={<FileText />}>
            <p className="text-slate-300 leading-relaxed mb-4">
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <p className="text-slate-300">
                <strong className="text-white">Email:</strong> info@warppay.io
              </p>
              <p className="text-slate-300 mt-2">
                <strong className="text-white">Telegram:</strong>{" "}
                <a
                  href="https://t.me/warp_pay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  @warp_pay
                </a>
              </p>
            </div>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="scroll-mt-24">
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
