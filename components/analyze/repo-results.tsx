"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Award, Bookmark, Check, Code, GitFork, Github, Share2, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface RepoResultsProps {
  results: {
    name: string
    description: string
    stars: number
    languages: { name: string; percentage: number }[]
    commits: number
    contributors: number
    skillBadge: string
    forks: number
  }
}

export function RepoResults({ results }: RepoResultsProps) {
  const router = useRouter()
  const [isMinting, setIsMinting] = useState(false)
  const [mintingComplete, setMintingComplete] = useState(false)
  const [showMintDialog, setShowMintDialog] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showBlinkDialog, setShowBlinkDialog] = useState(false)
  const [blinkUrl, setBlinkUrl] = useState("")

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user")
    setIsLoggedIn(!!user)
  }, [])

  const handleMint = async () => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please login to mint NFT badges",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    setIsMinting(true)
    setShowMintDialog(true)

    try {
      // Mock minting process
      const response = await fetch("/api/mint-nft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ skillBadge: results.skillBadge }),
      })

      if (!response.ok) {
        throw new Error("Failed to mint NFT")
      }

      const data = await response.json()

      // Wait for 3 seconds to simulate blockchain transaction
      setTimeout(() => {
        setMintingComplete(true)
        toast({
          title: "NFT Minted Successfully",
          description: `Your ${results.skillBadge} skill badge has been minted to your wallet`,
        })
      }, 3000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mint NFT. Please try again.",
        variant: "destructive",
      })
      setShowMintDialog(false)
    }
  }

  const handleCreateBlink = () => {
    // Generate a mock Solana Blink URL
    const mockBlinkId = Math.random().toString(36).substring(2, 10)
    const url = `https://blinks.solana.com/mint/${mockBlinkId}?badge=${encodeURIComponent(results.skillBadge)}`
    setBlinkUrl(url)
    setShowBlinkDialog(true)
  }

  const copyBlinkToClipboard = () => {
    navigator.clipboard.writeText(blinkUrl).then(() => {
      toast({
        title: "Copied to Clipboard",
        description: "Solana Blink URL has been copied to your clipboard",
      })
    })
  }

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'frontend':
        return 'bg-badge-frontend';
      case 'backend':
        return 'bg-badge-backend';
      case 'fullstack':
        return 'bg-badge-fullstack';
      case 'devops':
        return 'bg-badge-devops';
      case 'mobile':
        return 'bg-badge-mobile';
      default:
        return 'bg-badge-default';
    }
  };


  return (
    <>
      <Card className="mx-auto max-w-2xl shadow-lg border-t-4 border-t-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            {results.name}
          </CardTitle>
          <CardDescription>{results.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="flex flex-row gap-2 items-center  rounded-lg border border-border/50 bg-background p-2">
              <Star className="mb-2 h-5 w-5 text-yellow-500" />
              <span className="text-xl font-bold">{results.stars}</span>
              <span className="text-sm text-muted-foreground">Stars</span>
            </div>
            <div className="flex flex-row gap-2 items-center rounded-lg border border-border/50 bg-background p-2">
              <Code className="mb-2 h-5 w-5 text-blue-500" />
              <span className="text-xl font-bold">{results.commits}</span>
              <span className="text-sm text-muted-foreground">Commits</span>
            </div>
            <div className="flex flex-row gap-2 items-center  rounded-lg border border-border/50 bg-background p-2">
              <Users className="mb-2 h-5 w-5 text-green-500" />
              <span className="text-xl font-bold">{results.contributors}</span>
              <span className="text-sm text-muted-foreground">Contributors</span>
            </div>
            <div className="flex flex-row gap-2 items-center rounded-lg border border-border/50 bg-background p-2">
            <GitFork className="h-4 w-4 text-muted-foreground" />
              <span className="text-xl font-bold">{results.forks}</span>
              <span className="text-sm text-muted-foreground">Forks</span>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {results.languages.map((language, i) => (
                <div key={language.name} className="space-y-1">
                  {/* <div className="flex justify-between text-sm">
                    <span>{language.name}</span>
                    <span>{language.percentage}%</span>
                  </div>
                  <Progress value={language.percentage} className="h-2" /> */}
                  <Badge key={i} variant="outline" className="flex gap-2 items-center">
                  <span className={`w-2 h-2 bg-[#7b3aec] shadow-[0_0_10px_rgba(123,58,236,0.8)] rounded-full ${getBadgeColor(language.name.toLowerCase())}`}></span>
                    <span>{language.name}</span>
                    <span>{language.percentage}%</span>
                  </Badge>
                </div>

              ))}
            </div>
          </div>

          <Separator />

          <div className="flex flex-row items-center justify-between  rounded-lg border border-border/50 bg-background p-6">
           <div className="flex items-center gap-2">
           <Award className="h-12 w-12 text-primary" />
           <h3 className=" text-xl font-bold">Skill Badge</h3>
           </div>
            <div className="px-3 py-1.5 rounded-lg bg-card border border-primary/50 relative z-10 flex items-center gap-2 inline-flex items-center px-4 py-2 rounded-lg text-white bg-[#0D0D12] shadow-[0_0_20px_rgba(139,92,246,0.6)]">
              <Bookmark className="h-4 w-4 text-primary" />
              <span className="text-sm">{results.skillBadge}</span>
            </div>
          </div>
          <div>
          <p className="text-center text-sm text-muted-foreground">
              Based on your repository analysis, we've assigned you this skill badge
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 sm:flex-row">
          <Button onClick={handleMint} disabled={isMinting && !mintingComplete} className="w-full">
            {isMinting && !mintingComplete ? "Minting..." : "Mint Skill Badge NFT"}
          </Button>
          {mintingComplete && (
            <Button onClick={handleCreateBlink} variant="outline" className="w-full">
              <Share2 className="mr-2 h-4 w-4" />
              Create Solana Blink
            </Button>
          )}
        </CardFooter>
      </Card>

      <Dialog open={showMintDialog} onOpenChange={setShowMintDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{mintingComplete ? "NFT Minted Successfully" : "Minting Your NFT"}</DialogTitle>
            <DialogDescription>
              {mintingComplete
                ? "Your skill badge has been minted to your wallet"
                : "Please wait while we mint your skill badge NFT on Solana"}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6">
            {mintingComplete ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold">{results.skillBadge}</h3>
                  <p className="text-sm text-muted-foreground">Transaction ID: 5Gn...7Uh</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => setShowMintDialog(false)}>Close</Button>
                  <Button variant="outline" onClick={handleCreateBlink}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Create Blink
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <div className="h-20 w-20 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
                <p className="text-center text-sm text-muted-foreground">This may take a few moments</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

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
