"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Code2, Github, LineChart, LogIn, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ConnectWallet } from "@/components/connect-wallet"
import { ModeToggle } from "@/components/mode-toggle"
import { useToast } from "@/components/ui/use-toast"

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")

  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = localStorage.getItem("user")
    if (user) {
      const userData = JSON.parse(user)
      setIsLoggedIn(true)
      setUsername(userData.name || userData.email.split("@")[0])
    }
  }, [pathname])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    })
    router.push("/")
  }

  const navItems = [
    { href: "/", label: "Home", icon: <Code2 className="mr-2 h-4 w-4" /> },
    { href: "/analyze", label: "Analyze", icon: <Github className="mr-2 h-4 w-4" /> },
    ...(isLoggedIn
      ? [
          { href: "/dashboard", label: "Dashboard", icon: <User className="mr-2 h-4 w-4" /> },
          { href: "/profile", label: "Profile", icon: <User className="mr-2 h-4 w-4" /> },
        ]
      : []),
    { href: "/leaderboard", label: "Leaderboard", icon: <LineChart className="mr-2 h-4 w-4" /> },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Code2 className="h-6 w-6" />
            <span className="text-xl font-bold">GitProof</span>
          </Link>
          <nav className="hidden md:flex md:gap-2 ml-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  size="sm"
                  className="flex items-center"
                >
                  {item.icon}
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <ConnectWallet />
          {isLoggedIn ? (
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Link href="/login">
              <Button variant="outline" size="sm" className="gap-2">
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
