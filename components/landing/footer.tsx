import { FaXTwitter, FaTelegram } from "react-icons/fa6"
import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-900/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image src="/images/warppay-logo.png" alt="WarpPay" width={32} height={32} className="w-8 h-8" />
              <span className="text-xl font-bold text-white">WarpPay</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Bridge crypto to everyday spending with prepaid Visa cards powered by Solana.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-slate-400 hover:text-white transition-colors text-sm">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-slate-400 hover:text-white transition-colors text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/whitepaper" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Whitepaper
                </Link>
              </li>
              <li>
                <a
                  href="https://t.me/warp_pay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <p className="text-slate-400 text-sm">© 2025 WarpPay. All rights reserved.</p>
            <span className="text-slate-600 text-sm">|</span>
            <a
              href="https://visioncoding.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm"
            >
              Built by
              <Image src="/images/vision-coding-logo.png" alt="Vision Coding" width={18} height={18} className="w-[18px] h-[18px] rounded-sm" />
              <span className="font-medium">Vision Coding</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <Link
              href="https://x.com/WarpPay"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              <FaXTwitter className="w-4 h-4" />
            </Link>
            <Link
              href="https://t.me/warp_pay"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              <FaTelegram className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
