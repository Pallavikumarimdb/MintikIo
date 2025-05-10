"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWallet } from "@solana/wallet-adapter-react"
import { Award, Code, Github, Share2, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MintBadge } from "@/components/badge/mint-badge"

interface RepoResultsProps {
  results: {
    name: string
    description: string
    stars: number
    languages: { name: string; percentage: number }[]
    commits: number
    contributors: number
    skillBadge: string
  }
}

export function RepoResults({ results }: RepoResultsProps) {
  const router = useRouter()
  const { publicKey, connected } = useWallet()
  const [mintingComplete, setMintingComplete] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showBlinkDialog, setShowBlinkDialog] = useState(false)
  const [blinkUrl, setBlinkUrl] = useState("")
  const [mintAddress, setMintAddress] = useState("")
  const [txId, setTxId] = useState("")

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user")
    setIsLoggedIn(!!user)
  }, [])

  const handleMintSuccess = async (mintAddress: string, txId: string) => {
    setMintAddress(mintAddress)
    setTxId(txId)
    setMintingComplete(true)
  }

  const handleCreateBlink = async () => {
    if (!mintAddress) return

    try {
      const response = await fetch("/api/blinks/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          badgeName: results.skillBadge,
          mintAddress,
          txId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create Solana Blink")
      }

      const data = await response.json()
      setBlinkUrl(data.url)
      setShowBlinkDialog(true)
    } catch (error) {
      console.error("Error creating Blink:", error)
      toast({
        title: "Error",
        description: "Failed to create Solana Blink. Please try again.",
        variant: "destructive",
      })
    }
  }

  const copyBlinkToClipboard = () => {
    navigator.clipboard.writeText(blinkUrl).then(() => {
      toast({
        title: "Copied to Clipboard",
        description: "Solana Blink URL has been copied to your clipboard",
      })
    })
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            {results.name}
          </CardTitle>
          <CardDescription>{results.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex flex-col items-center justify-center rounded-lg border border-border/50 bg-background p-4">
              <Star className="mb-2 h-5 w-5 text-yellow-500" />
              <div className="text-2xl font-bold">{results.stars}</div>
              <div className="text-sm text-muted-foreground">Stars</div>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border border-border/50 bg-background p-4">
              <Code className="mb-2 h-5 w-5 text-blue-500" />
              <div className="text-2xl font-bold">{results.commits}</div>
              <div className="text-sm text-muted-foreground">Commits</div>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border border-border/50 bg-background p-4">
              <Users className="mb-2 h-5 w-5 text-green-500" />
              <div className="text-2xl font-bold">{results.contributors}</div>
              <div className="text-sm text-muted-foreground">Contributors</div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Languages</h3>
            <div className="space-y-3">
              {results.languages.map((language) => (
                <div key={language.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{language.name}</span>
                    <span>{language.percentage}%</span>
                  </div>
                  <Progress value={language.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="flex flex-col items-center space-y-4 rounded-lg border border-border/50 bg-background p-6">
            <Award className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">Skill Badge</h3>
            <Badge variant="outline" className="text-lg px-3 py-1">
              {results.skillBadge}
            </Badge>
            <p className="text-center text-sm text-muted-foreground">
              Based on your repository analysis, we've assigned you this skill badge
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 sm:flex-row">
          {!connected ? (
            <Button
              onClick={() => {
                toast({
                  title: "Wallet Required",
                  description: "Please connect your wallet to mint an NFT badge",
                })
              }}
              className="w-full"
            >
              Connect Wallet to Mint
            </Button>
          ) : !mintingComplete ? (
            <MintBadge
              badgeName={results.skillBadge}
              badgeDescription={`${results.skillBadge} badge earned through verified contributions to ${results.name}`}
              badgeImage={`/placeholder.svg?height=300&width=300&text=${encodeURIComponent(results.skillBadge)}`}
              onMintSuccess={handleMintSuccess}
            />
          ) : (
            <Button onClick={handleCreateBlink} variant="outline" className="w-full">
              <Share2 className="mr-2 h-4 w-4" />
              Create Solana Blink
            </Button>
          )}
        </CardFooter>
      </Card>

      <Dialog open={showBlinkDialog} onOpenChange={setShowBlinkDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Your NFT Badge</DialogTitle>
            <DialogDescription>
              Use this Solana Blink to share your NFT badge on social media platforms like Twitter
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Share2 className="h-10 w-10 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">Solana Blink Created</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Share this link on social media to let others mint your NFT badge
                </p>
              </div>
              <div className="w-full">
                <div className="flex items-center gap-2 rounded-md border border-border/50 bg-muted p-2">
                  <code className="flex-1 overflow-x-auto text-xs">{blinkUrl}</code>
                  <Button variant="ghost" size="sm" onClick={copyBlinkToClipboard}>
                    Copy
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button onClick={() => setShowBlinkDialog(false)}>Close</Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open(
                      "https://twitter.com/intent/tweet?text=" +
                        encodeURIComponent(
                          `I just earned a ${results.skillBadge} badge on GitProof! Mint your own with this Solana Blink: ${blinkUrl}`,
                        ),
                    )
                  }
                >
                  Share on Twitter
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
