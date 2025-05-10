import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { SessionWrapper } from "@/components/SessionWrapper"
import { SolanaWalletProvider } from "@/components/solana/wallet-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GitProof - Proof of Work NFT Platform",
  description: "Mint your Proof of Work NFT by submitting your GitHub project",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const session = await getServerSession(authOptions)

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background`}>
      <SolanaWalletProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <SessionWrapper session={session}>
            <Navbar />
            </SessionWrapper>
            <main className="flex-1">{children}</main>
            <Toaster />
          </div>
        </ThemeProvider>
        </SolanaWalletProvider>
      </body>
    </html>
  )
}
