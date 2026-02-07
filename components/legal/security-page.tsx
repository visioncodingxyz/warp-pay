"use client"

import type React from "react"
import { useState } from "react"
import { Footer } from "@/components/landing/footer"
import Image from "next/image"
import Link from "next/link"
import { Shield, Lock, Key, Eye, AlertTriangle, CheckCircle, Server, FileText, ChevronDown } from "lucide-react"

export function SecurityPage() {
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
            <span>Security</span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">Security at WarpPay</h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Your security is our top priority. Learn about the measures we take to protect your funds and data.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl space-y-12">
          <Section title="Our Security Commitment" icon={<Shield />}>
            <p className="text-slate-300 leading-relaxed mb-4">
              At WarpPay, we implement industry-leading security practices to ensure your funds and personal information
              remain safe. Our multi-layered security approach combines blockchain technology, encryption, and proactive
              monitoring to protect against threats.
            </p>
            <p className="text-slate-300 leading-relaxed">
              We continuously update our security measures to stay ahead of emerging threats and comply with the highest
              industry standards.
            </p>
          </Section>

          <Section title="Blockchain Security" icon={<Server />}>
            <div className="space-y-6">
              <p className="text-slate-300 leading-relaxed">
                WarpPay leverages the Solana blockchain's robust security features to protect your transactions:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <SecurityFeature
                  icon={<CheckCircle />}
                  title="Proof of Stake"
                  description="Solana's PoS consensus mechanism ensures transaction integrity and network security."
                />
                <SecurityFeature
                  icon={<CheckCircle />}
                  title="Immutable Records"
                  description="All transactions are permanently recorded on the blockchain and cannot be altered."
                />
                <SecurityFeature
                  icon={<CheckCircle />}
                  title="Decentralized Network"
                  description="Distributed validator network prevents single points of failure."
                />
                <SecurityFeature
                  icon={<CheckCircle />}
                  title="Fast Finality"
                  description="Transactions are confirmed in seconds, reducing exposure to double-spend attacks."
                />
              </div>
            </div>
          </Section>

          <Section title="Data Encryption" icon={<Lock />}>
            <p className="text-slate-300 leading-relaxed mb-4">
              We use military-grade encryption to protect your sensitive information:
            </p>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-white">TLS 1.3 Encryption:</strong> All data transmitted between your device
                  and our servers is encrypted using the latest TLS protocol.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-white">AES-256 Encryption:</strong> Sensitive data at rest is encrypted using
                  AES-256, the same standard used by banks and governments.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-white">End-to-End Protection:</strong> Your card details are encrypted from
                  the moment they're generated until they reach your device.
                </div>
              </li>
            </ul>
          </Section>

          <Section title="Wallet Security" icon={<Key />}>
            <p className="text-slate-300 leading-relaxed mb-4">
              WarpPay operates as a non-custodial service, meaning you maintain full control of your wallet:
            </p>
            <ul className="space-y-2 text-slate-300 list-disc list-inside">
              <li>We never have access to your private keys or seed phrase</li>
              <li>You authorize all transactions through your wallet</li>
              <li>Your funds remain in your wallet until you choose to transfer them</li>
              <li>Compatible with hardware wallets for enhanced security</li>
              <li>Support for multi-signature wallets (coming soon)</li>
            </ul>
            <div className="mt-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 flex gap-3">
              <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div className="text-sm leading-relaxed">
                <strong>Important:</strong> Never share your private keys or seed phrase with anyone, including WarpPay
                support. We will never ask for this information.
              </div>
            </div>
          </Section>

          <Section title="Card Security Features" icon={<Shield />}>
            <div className="space-y-6">
              <p className="text-slate-300 leading-relaxed">
                Your WarpPay card includes multiple security features to prevent unauthorized use:
              </p>
              <div className="space-y-4">
                <SecurityFeature
                  icon={<Eye />}
                  title="Real-Time Monitoring"
                  description="We monitor all transactions for suspicious activity and alert you immediately of any concerns."
                />
                <SecurityFeature
                  icon={<Lock />}
                  title="Instant Freeze"
                  description="Freeze your card instantly from the dashboard if you suspect unauthorized activity."
                />
                <SecurityFeature
                  icon={<CheckCircle />}
                  title="Transaction Notifications"
                  description="Receive instant notifications for every transaction to stay informed of card activity."
                />
                <SecurityFeature
                  icon={<Shield />}
                  title="Spending Limits"
                  description="Daily and monthly spending limits help protect against large unauthorized transactions."
                />
                <SecurityFeature
                  icon={<Key />}
                  title="CVV Protection"
                  description="Your CVV is securely stored and only revealed when you explicitly request it."
                />
              </div>
            </div>
          </Section>

          <Section title="Fraud Prevention" icon={<AlertTriangle />}>
            <p className="text-slate-300 leading-relaxed mb-4">
              We employ advanced fraud detection systems to protect your account:
            </p>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-white">Machine Learning:</strong> AI-powered systems analyze transaction
                  patterns to detect anomalies and potential fraud.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-white">Behavioral Analysis:</strong> We monitor for unusual spending patterns
                  and geographic anomalies.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-white">24/7 Monitoring:</strong> Our security team monitors transactions
                  around the clock to identify and prevent fraud.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-white">Automatic Blocks:</strong> Suspicious transactions are automatically
                  blocked pending verification.
                </div>
              </li>
            </ul>
          </Section>

          <Section title="Infrastructure Security" icon={<Server />}>
            <p className="text-slate-300 leading-relaxed mb-4">
              Our infrastructure is built with security at its core:
            </p>
            <ul className="space-y-2 text-slate-300 list-disc list-inside">
              <li>Hosted on enterprise-grade cloud infrastructure with 99.9% uptime</li>
              <li>Regular security audits by independent third-party firms</li>
              <li>Automated vulnerability scanning and penetration testing</li>
              <li>DDoS protection and rate limiting to prevent attacks</li>
              <li>Secure API endpoints with authentication and authorization</li>
              <li>Regular backups with encrypted storage</li>
              <li>Incident response plan with 24/7 security team</li>
            </ul>
          </Section>

          <Section title="Best Security Practices" icon={<FileText />}>
            <p className="text-slate-300 leading-relaxed mb-4">
              Follow these best practices to keep your account secure:
            </p>
            <div className="space-y-4">
              <BestPractice
                title="Use a Hardware Wallet"
                description="Store your private keys on a hardware wallet like Ledger or Trezor for maximum security."
              />
              <BestPractice
                title="Enable 2FA"
                description="Enable two-factor authentication on your wallet for an extra layer of protection."
              />
              <BestPractice
                title="Keep Software Updated"
                description="Always use the latest version of your wallet software and browser."
              />
              <BestPractice
                title="Verify Addresses"
                description="Always double-check wallet addresses before sending transactions."
              />
              <BestPractice
                title="Monitor Activity"
                description="Regularly review your transaction history for any unauthorized activity."
              />
              <BestPractice
                title="Use Strong Passwords"
                description="Create unique, complex passwords for your wallet and email accounts."
              />
              <BestPractice
                title="Beware of Phishing"
                description="Never click suspicious links or provide your seed phrase to anyone."
              />
              <BestPractice
                title="Freeze When Suspicious"
                description="Immediately freeze your card if you notice any suspicious activity."
              />
            </div>
          </Section>

          <Section title="Reporting Security Issues" icon={<AlertTriangle />}>
            <p className="text-slate-300 leading-relaxed mb-4">
              If you discover a security vulnerability or experience suspicious activity:
            </p>
            <div className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50 space-y-4">
              <div>
                <h4 className="text-white font-semibold mb-2">For Security Vulnerabilities:</h4>
                <p className="text-slate-300 text-sm">
                  Email: <span className="text-indigo-400">security@warppay.com</span>
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  Please include detailed information about the vulnerability and steps to reproduce.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">For Suspicious Activity:</h4>
                <p className="text-slate-300 text-sm">
                  Telegram:{" "}
                  <a
                    href="https://t.me/warp_pay"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300"
                  >
                    @warp_pay
                  </a>
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  Our support team is available 24/7 to assist with security concerns.
                </p>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed mt-4">
              We take all security reports seriously and will investigate promptly. Responsible disclosure is
              appreciated, and we may offer rewards for valid security findings.
            </p>
          </Section>

          <Section title="Compliance & Certifications" icon={<CheckCircle />}>
            <p className="text-slate-300 leading-relaxed mb-4">
              WarpPay complies with industry standards and regulations:
            </p>
            <ul className="space-y-2 text-slate-300 list-disc list-inside">
              <li>PCI DSS Level 1 compliant for card data security</li>
              <li>GDPR compliant for data protection and privacy</li>
              <li>SOC 2 Type II certified for security controls</li>
              <li>Regular third-party security audits</li>
              <li>AML/KYC compliance for financial regulations</li>
            </ul>
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

function SecurityFeature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
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

function BestPractice({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex gap-3">
      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
      <div>
        <h4 className="text-white font-semibold mb-1">{title}</h4>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
    </div>
  )
}
