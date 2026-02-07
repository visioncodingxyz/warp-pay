"use client"

import type React from "react"
import { useState } from "react"
import { Footer } from "@/components/landing/footer"
import Image from "next/image"
import Link from "next/link"
import { FileText, AlertCircle, CheckCircle, XCircle, Scale, CreditCard, ChevronDown } from "lucide-react"

export function TermsPage() {
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
            <Scale className="w-4 h-4" />
            <span>Terms of Service</span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">Terms of Service</h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Please read these terms carefully before using WarpPay services.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl space-y-12">
          <Section title="Agreement to Terms" icon={<FileText />}>
            <p className="text-slate-300 leading-relaxed mb-4">
              By accessing or using WarpPay ("Service"), you agree to be bound by these Terms of Service ("Terms"). If
              you disagree with any part of these terms, you may not access the Service.
            </p>
            <p className="text-slate-300 leading-relaxed">
              These Terms apply to all users of the Service, including but not limited to cardholders, visitors, and
              others who access or use the Service.
            </p>
          </Section>

          <Section title="Eligibility" icon={<CheckCircle />}>
            <p className="text-slate-300 leading-relaxed mb-4">To use WarpPay, you must:</p>
            <ul className="space-y-2 text-slate-300 list-disc list-inside">
              <li>Be at least 18 years of age</li>
              <li>Have the legal capacity to enter into binding contracts</li>
              <li>Not be prohibited from using the Service under applicable laws</li>
              <li>Provide accurate and complete registration information</li>
              <li>Maintain a compatible Solana wallet</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              We reserve the right to refuse service to anyone for any reason at any time.
            </p>
          </Section>

          <Section title="Account Registration" icon={<FileText />}>
            <p className="text-slate-300 leading-relaxed mb-4">
              When you create an account with us, you must provide information that is accurate, complete, and current
              at all times. You are responsible for:
            </p>
            <ul className="space-y-2 text-slate-300 list-disc list-inside">
              <li>Maintaining the security of your wallet and private keys</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
              <li>Ensuring your contact information is up to date</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              You may not use another person's account without permission. Accounts are non-transferable.
            </p>
          </Section>

          <Section title="Card Services" icon={<CreditCard />}>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Card Issuance</h3>
                <ul className="space-y-2 text-slate-300 list-disc list-inside">
                  <li>WarpPay issues prepaid Visa cards powered by Solana blockchain</li>
                  <li>A one-time preorder fee of $50 (in SOL, USDC, or USDT) is required</li>
                  <li>Virtual cards are issued within 48 hours of payment confirmation</li>
                  <li>Physical cards are delivered within 7 business days</li>
                  <li>Card issuance is subject to verification and approval</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Card Usage</h3>
                <ul className="space-y-2 text-slate-300 list-disc list-inside">
                  <li>Cards can be used anywhere Visa is accepted</li>
                  <li>Daily spending limit: $5,000</li>
                  <li>Monthly spending limit: $50,000</li>
                  <li>You must maintain sufficient balance for transactions</li>
                  <li>Declined transactions may incur fees from merchants</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Card Reloading</h3>
                <ul className="space-y-2 text-slate-300 list-disc list-inside">
                  <li>Reload your card using SOL, USDC, or USDT</li>
                  <li>Minimum reload amount: $10</li>
                  <li>Maximum reload amount: $10,000 per transaction</li>
                  <li>Funds are available immediately after blockchain confirmation</li>
                  <li>Reload fees may apply based on network conditions</li>
                </ul>
              </div>
            </div>
          </Section>

          <Section title="Fees and Charges" icon={<FileText />}>
            <p className="text-slate-300 leading-relaxed mb-4">WarpPay charges the following fees:</p>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">Card Preorder Fee</span>
                  <span className="text-indigo-400">$50 (one-time)</span>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">Card Reload Fee</span>
                  <span className="text-indigo-400">Network fees only</span>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">Monthly Maintenance</span>
                  <span className="text-indigo-400">$0</span>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">Transaction Fees</span>
                  <span className="text-indigo-400">$0</span>
                </div>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed mt-4">
              Additional fees may be charged by third parties (e.g., ATM operators, currency conversion). We reserve the
              right to modify fees with 30 days' notice.
            </p>
          </Section>

          <Section title="Prohibited Activities" icon={<XCircle />}>
            <p className="text-slate-300 leading-relaxed mb-4">You agree not to use WarpPay for:</p>
            <ul className="space-y-2 text-slate-300 list-disc list-inside">
              <li>Illegal activities or transactions</li>
              <li>Money laundering or terrorist financing</li>
              <li>Purchasing illegal goods or services</li>
              <li>Fraudulent or deceptive practices</li>
              <li>Circumventing transaction limits or fees</li>
              <li>Reselling or transferring cards to others</li>
              <li>Using cards for business purposes without authorization</li>
              <li>Violating any applicable laws or regulations</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              Violation of these prohibitions may result in immediate account termination and legal action.
            </p>
          </Section>

          <Section title="Refunds and Cancellations" icon={<AlertCircle />}>
            <p className="text-slate-300 leading-relaxed mb-4">
              The $50 card preorder fee is non-refundable once payment is confirmed. However, you may be eligible for a
              refund if:
            </p>
            <ul className="space-y-2 text-slate-300 list-disc list-inside">
              <li>We are unable to issue your card due to technical issues</li>
              <li>Your card application is rejected during verification</li>
              <li>We discontinue the Service before card issuance</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              Card reload transactions are final and cannot be reversed. Unused card balances can be withdrawn to your
              wallet (subject to minimum balance requirements).
            </p>
          </Section>

          <Section title="Account Termination" icon={<XCircle />}>
            <p className="text-slate-300 leading-relaxed mb-4">
              We may terminate or suspend your account immediately, without prior notice, for any reason, including:
            </p>
            <ul className="space-y-2 text-slate-300 list-disc list-inside">
              <li>Violation of these Terms</li>
              <li>Fraudulent or suspicious activity</li>
              <li>Failure to provide required information</li>
              <li>Extended period of inactivity</li>
              <li>Legal or regulatory requirements</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              You may close your account at any time through the dashboard. Upon termination, your card will be
              deactivated, and any remaining balance will be returned to your wallet (minus applicable fees).
            </p>
          </Section>

          <Section title="Limitation of Liability" icon={<AlertCircle />}>
            <p className="text-slate-300 leading-relaxed mb-4">
              WarpPay and its affiliates shall not be liable for any indirect, incidental, special, consequential, or
              punitive damages, including but not limited to:
            </p>
            <ul className="space-y-2 text-slate-300 list-disc list-inside">
              <li>Loss of profits, revenue, or data</li>
              <li>Cryptocurrency price fluctuations</li>
              <li>Unauthorized access to your account</li>
              <li>Service interruptions or delays</li>
              <li>Third-party actions or failures</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              Our total liability shall not exceed the amount of fees you paid to WarpPay in the 12 months preceding the
              claim.
            </p>
          </Section>

          <Section title="Dispute Resolution" icon={<Scale />}>
            <p className="text-slate-300 leading-relaxed mb-4">
              Any disputes arising from these Terms or your use of WarpPay shall be resolved through:
            </p>
            <ol className="space-y-2 text-slate-300 list-decimal list-inside">
              <li>Informal negotiation with our support team</li>
              <li>Mediation by a mutually agreed third party</li>
              <li>Binding arbitration under applicable arbitration rules</li>
            </ol>
            <p className="text-slate-300 leading-relaxed mt-4">
              You agree to waive your right to participate in class action lawsuits or class-wide arbitration.
            </p>
          </Section>

          <Section title="Changes to Terms" icon={<FileText />}>
            <p className="text-slate-300 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify you of material changes by posting
              the updated Terms on this page and updating the "Last updated" date. Your continued use of WarpPay after
              changes are posted constitutes acceptance of the new Terms. If you do not agree to the modified Terms, you
              must stop using the Service.
            </p>
          </Section>

          <Section title="Governing Law" icon={<Scale />}>
            <p className="text-slate-300 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which
              WarpPay operates, without regard to conflict of law principles. Any legal action or proceeding arising
              under these Terms shall be brought exclusively in the courts of that jurisdiction.
            </p>
          </Section>

          <Section title="Contact Us" icon={<FileText />}>
            <p className="text-slate-300 leading-relaxed mb-4">
              If you have questions about these Terms of Service, please contact us:
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
