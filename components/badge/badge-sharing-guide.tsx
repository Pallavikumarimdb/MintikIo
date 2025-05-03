"use client"

import { AlertCircle, Check, Copy, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"

interface BadgeSharingGuideProps {
  badge: any
  blinkUrl: string
}

export function BadgeSharingGuide({ badge, blinkUrl }: BadgeSharingGuideProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The text has been copied to your clipboard.",
    })
  }

  const tweetExamples = [
    `Just minted my "${badge.name}" badge for my work on ${badge.repository.name} using @GitProof! Check it out and see how you can earn yours: ${blinkUrl}`,
    `Excited to receive my verifiable "${badge.name}" skill badge as an NFT thanks to @GitProof. Learn more about the badges and how they recognize developer contributions: ${blinkUrl}`,
    `Proud to have my ${badge.repository.name} project recognized with a "${badge.name}" badge! See how @GitProof is changing developer recognition: ${blinkUrl}`,
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sharing Your Badge</CardTitle>
        <CardDescription>Tips for effectively sharing your achievement with your network</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Sharing Best Practices</AlertTitle>
          <AlertDescription>
            When sharing your badge, focus on your accomplishment and the skills it represents rather than just the NFT
            aspect. This helps your audience understand the value of your achievement.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Example Posts</h3>
          <p className="text-sm text-muted-foreground">
            Here are some examples of how you can share your badge on social media:
          </p>

          <div className="space-y-3">
            {tweetExamples.map((tweet, index) => (
              <div key={index} className="rounded-lg border border-border/50 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Twitter className="mt-1 h-5 w-5 text-[#1DA1F2]" />
                    <p className="text-sm">{tweet}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyToClipboard(tweet)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Effective Sharing Tips</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Check className="mt-1 h-4 w-4 text-green-500" />
              <p className="text-sm">
                <span className="font-medium">Highlight your achievement:</span> Focus on the skills and work that
                earned you the badge.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Check className="mt-1 h-4 w-4 text-green-500" />
              <p className="text-sm">
                <span className="font-medium">Mention the project:</span> Reference the repository or project that
                demonstrated your skills.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Check className="mt-1 h-4 w-4 text-green-500" />
              <p className="text-sm">
                <span className="font-medium">Explain the value:</span> Share what this badge means for your
                professional development.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Check className="mt-1 h-4 w-4 text-green-500" />
              <p className="text-sm">
                <span className="font-medium">Invite exploration:</span> Encourage others to learn more about the badge
                system rather than focusing on immediate minting.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-muted p-4">
          <h3 className="text-lg font-medium">Your Badge Link</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Share this link with your network to showcase your achievement:
          </p>
          <div className="mt-3 flex items-center gap-2">
            <code className="flex-1 overflow-x-auto rounded bg-muted-foreground/10 px-2 py-1 text-xs">{blinkUrl}</code>
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(blinkUrl)}>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
