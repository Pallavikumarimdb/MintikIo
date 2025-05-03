"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, MessageSquare, Share2, Twitter, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export function BadgeEngagement() {
  const [comment, setComment] = useState("")
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(24)

  const handleLike = () => {
    if (!isLiked) {
      setLikeCount(likeCount + 1)
      setIsLiked(true)
      toast({
        title: "Thanks for your support!",
        description: "Your like has been recorded.",
      })
    } else {
      setLikeCount(likeCount - 1)
      setIsLiked(false)
    }
  }

  const handleComment = () => {
    if (!comment.trim()) {
      toast({
        title: "Comment cannot be empty",
        description: "Please enter a comment before submitting.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Comment submitted",
      description: "Your comment has been submitted successfully.",
    })
    setComment("")
  }

  const handleSubscribe = () => {
    if (!email.trim()) {
      toast({
        title: "Email cannot be empty",
        description: "Please enter your email address.",
        variant: "destructive",
      })
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    setIsSubscribed(true)
    toast({
      title: "Subscribed successfully",
      description: "You'll receive updates about new badges and challenges.",
    })
  }

  const handleShare = (platform: string) => {
    const shareText =
      "Check out this amazing Full Stack Developer badge on GitProof! Learn how you can earn your own verifiable skill badges."
    const shareUrl = window.location.href

    let shareLink = ""
    switch (platform) {
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
        break
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
        break
      case "email":
        shareLink = `mailto:?subject=${encodeURIComponent("Check out this developer badge")}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`
        break
    }

    if (shareLink) {
      window.open(shareLink, "_blank")
    }

    toast({
      title: "Thanks for sharing!",
      description: `You're helping spread the word about skill badges.`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Engage and Show Your Support</CardTitle>
        <CardDescription>Support the developer and engage with the community without needing a wallet</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Button variant={isLiked ? "default" : "outline"} size="sm" className="gap-2" onClick={handleLike}>
                <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                {isLiked ? "Liked" : "Like"} ({likeCount})
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => handleShare("twitter")}>
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => handleShare("linkedin")}>
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => handleShare("email")}>
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Leave a Comment</h3>
              <Textarea
                placeholder="Share your thoughts about this badge..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
              />
              <Button onClick={handleComment} className="mt-2">
                <MessageSquare className="mr-2 h-4 w-4" />
                Submit Comment
              </Button>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Follow the Developer</h3>
              <p className="text-sm text-muted-foreground">
                Show your support by following the developer who earned this badge
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Github className="h-4 w-4" />
                  Follow on GitHub
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Twitter className="h-4 w-4" />
                  Follow on Twitter
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border border-border/50 p-4">
              <h3 className="text-lg font-medium">Stay Updated</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Subscribe to receive updates about new badges, challenges, and platform features
              </p>
              {!isSubscribed ? (
                <div className="mt-3 flex gap-2">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button onClick={handleSubscribe}>Subscribe</Button>
                </div>
              ) : (
                <div className="mt-3 rounded-md bg-primary/10 p-3 text-center text-sm">
                  Thanks for subscribing! You'll receive updates about new badges and challenges.
                </div>
              )}
            </div>

            <div className="rounded-lg border border-border/50 p-4">
              <h3 className="text-lg font-medium">Share This Badge</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Help spread the word about skill badges and support the developer
              </p>
              <div className="mt-3">
                <Button variant="outline" className="w-full gap-2" onClick={() => handleShare("twitter")}>
                  <Share2 className="h-4 w-4" />
                  Share on Social Media
                </Button>
              </div>
            </div>

            <div className="rounded-lg border border-border/50 p-4">
              <h3 className="text-lg font-medium">Explore More</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Discover more about our platform and how you can participate
              </p>
              <div className="mt-3 space-y-2">
                <Link href="/challenges">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    View Upcoming Challenges
                  </Button>
                </Link>
                <Link href="/leaderboard">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Explore Developer Leaderboard
                  </Button>
                </Link>
                <Link href="/analyze">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Analyze Your Repository
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
