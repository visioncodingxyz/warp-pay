import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { WalletProvider } from "@/components/providers/wallet-provider"
import { UserProvider } from "@/components/providers/user-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "WarpPay - Bridge Crypto to Everyday Spending",
  description: "Get your WarpPay prepaid Visa card. Reload with SOL instantly.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "WarpPay - Bridge Crypto to Everyday Spending",
    description: "Get your WarpPay prepaid Visa card. Reload with SOL instantly.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WarpPay - Bridge Crypto to Everyday Spending",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WarpPay - Bridge Crypto to Everyday Spending",
    description: "Get your WarpPay prepaid Visa card. Reload with SOL instantly.",
    images: ["/og-image.png"],
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <WalletProvider>
          <UserProvider>
            {children}
            <Toaster />
          </UserProvider>
        </WalletProvider>
        <Script
          id="channel-io"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(){var w=window;if(w.ChannelIO){return w.console.error("ChannelIO script included twice.");}var ch=function(){ch.c(arguments);};ch.q=[];ch.c=function(args){ch.q.push(args);};w.ChannelIO=ch;function l(){if(w.ChannelIOInitialized){return;}w.ChannelIOInitialized=true;var s=document.createElement("script");s.type="text/javascript";s.async=true;s.src="https://cdn.channel.io/plugin/ch-plugin-web.js";var x=document.getElementsByTagName("script")[0];if(x.parentNode){x.parentNode.insertBefore(s,x);}}if(document.readyState==="complete"){l();}else{w.addEventListener("DOMContentLoaded",l);w.addEventListener("load",l);}})();
              ChannelIO('boot', {
                "pluginKey": "722d5f3c-852e-434a-baff-9c6e908f6175"
              });
            `,
          }}
        />
      </body>
    </html>
  )
}
