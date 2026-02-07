"use client"

import type React from "react"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { useUser } from "@/components/providers/user-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Home, CreditCard, List, Settings, ArrowLeft, Menu, X, Wallet } from "lucide-react"
import { ProfileSetupModal } from "@/components/modals/profile-setup-modal"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/card", label: "My Card", icon: CreditCard },
  { href: "/dashboard/transactions", label: "Transactions", icon: List },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { connected } = useWallet()
  const { setVisible } = useWalletModal()
  const { user, isNewUser, isLoading } = useUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const walletContext = useWallet()

  console.log("[v0] Dashboard layout state:", { connected, isNewUser, isLoading, hasUser: !!user })

  const handleBackToHome = async () => {
    if (connected) {
      await walletContext.disconnect()
    }
    router.push("/")
  }

  const handleConnectWallet = () => {
    setVisible(true)
  }

  const handleDisconnectWallet = async () => {
    await walletContext.disconnect()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 gradient-animate">
      <ProfileSetupModal
        open={connected && isNewUser && !isLoading}
        onClose={() => {
          // Modal can be closed, which will disconnect wallet
        }}
      />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col border-r border-white/10 bg-slate-900/80 backdrop-blur-lg">
        <div className="flex flex-col flex-1 min-h-0">
          {/* Logo */}
          <div className="flex items-center gap-2 px-6 py-6 border-b border-white/10">
            <Image src="/images/warppay-logo.png" alt="WarpPay" width={32} height={32} className="w-8 h-8" />
            <span className="text-xl font-bold text-white">WarpPay</span>
          </div>

          {/* User Info - only show if connected */}
          {connected && user && (
            <div className="px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-700 flex-shrink-0">
                  <Image
                    src={user.profilePicture || "/images/default-avatar.png"}
                    alt={user.username}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white truncate">{user.username}</div>
                  <div className="text-xs text-slate-400 truncate">
                    {user.walletAddress.slice(0, 4)}...{user.walletAddress.slice(-4)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive ? "bg-[#049be5]/20 text-[#049be5]" : "text-slate-300 hover:bg-slate-800 hover:text-white",
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Connect Wallet button/wallet address */}
          <div className="p-3">
            {!connected ? (
              <Button
                className="w-full h-12 text-base font-semibold text-white transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: "#049be5" }}
                onClick={handleConnectWallet}
              >
                <Wallet className="w-5 h-5 mr-2" />
                Connect Wallet
              </Button>
            ) : (
              <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">
                    {walletContext.publicKey
                      ? `${walletContext.publicKey.toBase58().slice(0, 6)}...${walletContext.publicKey.toBase58().slice(-4)}`
                      : ""}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                  onClick={handleDisconnectWallet}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            )}
          </div>

          {/* Back to Home button */}
          <div className="p-3 border-t border-white/10">
            <Button
              variant="ghost"
              className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800"
              onClick={handleBackToHome}
            >
              <ArrowLeft className="w-5 h-5 mr-3" />
              Back to Home
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Image src="/images/warppay-logo.png" alt="WarpPay" width={32} height={32} className="w-8 h-8" />
            <span className="text-xl font-bold text-white">WarpPay</span>
          </div>

          <Button variant="ghost" size="icon" className="text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-slate-900/95 backdrop-blur-lg">
            {connected && user && (
              <div className="px-4 py-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-700 flex-shrink-0">
                    <Image
                      src={user.profilePicture || "/images/default-avatar.png"}
                      alt={user.username}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white truncate">{user.username}</div>
                    <div className="text-xs text-slate-400 truncate">
                      {user.walletAddress.slice(0, 4)}...{user.walletAddress.slice(-4)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <nav className="px-2 py-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-[#049be5]/20 text-[#049be5]"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white",
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            {/* Connect Wallet button/wallet address */}
            <div className="p-2">
              {!connected ? (
                <Button
                  className="w-full h-12 text-base font-semibold text-white transition-all duration-300"
                  style={{ backgroundColor: "#049be5" }}
                  onClick={() => {
                    handleConnectWallet()
                    setMobileMenuOpen(false)
                  }}
                >
                  <Wallet className="w-5 h-5 mr-2" />
                  Connect Wallet
                </Button>
              ) : (
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">
                      {walletContext.publicKey
                        ? `${walletContext.publicKey.toBase58().slice(0, 6)}...${walletContext.publicKey.toBase58().slice(-4)}`
                        : ""}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                    onClick={handleDisconnectWallet}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </div>

            {/* Back to Home button */}
            <div className="p-2 border-t border-white/10">
              <Button
                variant="ghost"
                className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800"
                onClick={handleBackToHome}
              >
                <ArrowLeft className="w-5 h-5 mr-3" />
                Back to Home
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="lg:pl-64 pt-16 lg:pt-0">
        {connected && isNewUser && !isLoading ? (
          <div className="px-4 py-8 lg:px-8 lg:py-10 flex items-center justify-center min-h-screen">
            <div className="text-center text-slate-400">
              <p>Please complete your profile to continue</p>
            </div>
          </div>
        ) : (
          <div className="px-4 py-8 lg:px-8 lg:py-10">{children}</div>
        )}
      </main>
    </div>
  )
}
