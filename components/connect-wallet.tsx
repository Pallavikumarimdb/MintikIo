"use client"

import { useState } from "react"
import { Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

export function ConnectWallet() {
  const [connected, setConnected] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const handleConnect = () => {
    // Mock wallet connection
    setTimeout(() => {
      const mockAddress = "8xH5f...3kPn"
      setWalletAddress(mockAddress)
      setConnected(true)
      setIsOpen(false)
      toast({
        title: "Wallet Connected",
        description: `Successfully connected to ${mockAddress}`,
      })
    }, 1000)
  }

  const handleDisconnect = () => {
    setConnected(false)
    setWalletAddress("")
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2">
          <Wallet className="h-4 w-4" />
          {connected ? `${walletAddress}` : "Connect Wallet"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect your wallet</DialogTitle>
          <DialogDescription>Connect your Solana wallet to mint NFTs and track your badges.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          {!connected ? (
            <>
              <Button onClick={handleConnect} className="w-full">
                <img src="/placeholder.svg?height=24&width=24" alt="Phantom" className="mr-2 h-6 w-6" />
                Phantom
              </Button>
              <Button onClick={handleConnect} className="w-full">
                <img src="/placeholder.svg?height=24&width=24" alt="Solflare" className="mr-2 h-6 w-6" />
                Solflare
              </Button>
            </>
          ) : (
            <Button variant="destructive" onClick={handleDisconnect}>
              Disconnect Wallet
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
