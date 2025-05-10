"use client"
import { Wallet } from "lucide-react"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export function ConnectWallet() {
  const { publicKey, connected, disconnect } = useWallet()

  const handleDisconnect = () => {
    disconnect()
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    })
  }

  const formattedAddress = publicKey ? `${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}` : ""

  return (
    <div className="flex items-center">
      {connected ? (
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Wallet className="h-4 w-4" />
            {formattedAddress}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDisconnect}>
            Disconnect
          </Button>
        </div>
      ) : (
        <WalletMultiButton className="bg-primary hover:bg-primary/90 text-white rounded-md px-4 py-2 text-sm font-medium" />
      )}
    </div>
  )
}
