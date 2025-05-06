"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Award, Check, Code, ExternalLink, Github, Info, Lightbulb, ThumbsUp, Trophy, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"
import { BadgeDetails } from "@/components/badge/badge-details"
import { BadgeEducation } from "@/components/badge/badge-education"
import { BadgeEngagement } from "@/components/badge/badge-engagement"
import { BadgeRequirements } from "@/components/badge/badge-requirements"

// Mock badge data
const badgeData = {
  id: "a1b2c3d4",
  name: "Full Stack Developer",
  description: "Awarded to developers who demonstrate proficiency in both frontend and backend technologies",
  image: "/placeholder.svg?height=300&width=300&text=Full%20Stack%20Developer",
  earnedBy: {
    id: 1,
    name: "Alex Johnson",
    username: "alexj",
    avatar: "/placeholder.svg?height=80&width=80",
    title: "Senior Developer at TechCorp",
  },
  repository: {
    name: "next-auth-example",
    url: "https://github.com/username/next-auth-example",
    description: "An example app with NextAuth.js",
  },
  mintedAt: "2023-04-15T10:30:00Z",
  requirements: [
    "Demonstrated expertise in frontend technologies (React, Vue, Angular)",
    "Proficiency in backend development (Node.js, Python, Java)",
    "Experience with database design and management",
    "Understanding of API design and implementation",
    "Knowledge of deployment and DevOps practices",
  ],
  benefits: [
    "Industry recognition of full-stack development skills",
    "Verifiable proof of technical expertise",
    "Enhanced visibility to potential employers",
    "Access to exclusive full-stack developer communities",
  ],
  stats: {
    totalEarned: 128,
    averageRepoStars: 45,
    averageContributions: 247,
  },
  relatedBadges: ["Frontend Expert", "Backend Developer", "API Developer"],
}

export default function BadgeShowcasePage() {
  const params = useParams()
  const [badge, setBadge] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showSupportMessage, setShowSupportMessage] = useState(false)

  useEffect(() => {
    // Mock API call to fetch badge data
    const fetchBadge = async () => {
      try {
        // In a real app, you would fetch from an API using the badge ID
        // const response = await fetch(`/api/badges/${params.id}`)
        // const data = await response.json()

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Use mock data
        setBadge(badgeData)
      } catch (error) {
        console.error("Failed to fetch badge data", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBadge()
  }, [params.id])

  const handleSupport = () => {
    setShowSupportMessage(true)
    toast({
      title: "Thanks for your support!",
      description: "Your encouragement helps motivate developers in our community.",
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (isLoading) {
    return (
      <div className="container py-10 flex items-center justify-center">
        <div className="h-20 w-20 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    )
  }

  if (!badge) {
    return (
      <div className="container py-10 flex flex-col items-center justify-center">
        <Award className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold">Badge Not Found</h1>
        <p className="text-muted-foreground mt-2">The badge you're looking for doesn't exist</p>
        <Link href="/" className="mt-6">
          <Button>Return to Home</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        {/* Badge Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none border-transparent bg-primary text-primary-foreground">
            Skill Badge Showcase
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">{badge.name}</h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">{badge.description}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Badge Display */}
          <Card className="lg:col-span-1">
            <CardHeader className="text-center">
              <CardTitle>Skill Badge</CardTitle>
              <CardDescription>Verifiable proof of expertise</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="mb-6 flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-500 p-1">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-card">
                  <Code className="h-20 w-20" />
                </div>
              </div>
              <h2 className="text-2xl font-bold">{badge.name}</h2>
              <p className="mt-2 text-center text-sm text-muted-foreground">Minted on {formatDate(badge.mintedAt)}</p>
              <div className="mt-4 flex flex-col items-center gap-2">
                <Badge variant="outline" className="text-sm px-3 py-1">
                  <Trophy className="mr-1 h-3.5 w-3.5" />
                  {badge.stats.totalEarned} developers earned this
                </Badge>
                <Badge variant="outline" className="text-sm px-3 py-1">
                  <Github className="mr-1 h-3.5 w-3.5" />
                  {badge.stats.averageContributions} avg. contributions
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button variant="outline" className="w-full" onClick={handleSupport}>
                <ThumbsUp className="mr-2 h-4 w-4" />
                Support This Achievement
              </Button>
              {showSupportMessage && (
                <p className="text-center text-sm text-muted-foreground">
                  Thanks for your support! It means a lot to our community.
                </p>
              )}
            </CardFooter>
          </Card>

          {/* Badge Info Tabs */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>About This Badge</CardTitle>
              <CardDescription>Learn more about this skill badge and how it's earned</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  <TabsTrigger value="benefits">Benefits</TabsTrigger>
                  <TabsTrigger value="learn">Learn More</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="mt-4 space-y-4">
                  <BadgeDetails badge={badge} />
                </TabsContent>

                <TabsContent value="requirements" className="mt-4 space-y-4">
                  <BadgeRequirements badge={badge} />
                </TabsContent>

                <TabsContent value="benefits" className="mt-4 space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Benefits of Earning This Badge</h3>
                    <div className="grid gap-3">
                      {badge.benefits.map((benefit: string, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                            <Check className="h-3 w-3 text-primary" />
                          </div>
                          <p>{benefit}</p>
                        </div>
                      ))}
                    </div>

                    <Alert className="mt-6 bg-muted">
                      <Info className="h-4 w-4" />
                      <AlertTitle>Community Recognition</AlertTitle>
                      <AlertDescription>
                        Badges are a way for the community to recognize and verify your skills. They help you stand out
                        to potential employers and collaborators.
                      </AlertDescription>
                    </Alert>
                  </div>
                </TabsContent>

                <TabsContent value="learn" className="mt-4 space-y-4">
                  <BadgeEducation />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Earned By Section */}
        <Card>
          <CardHeader>
            <CardTitle>Earned By</CardTitle>
            <CardDescription>Developer who earned this badge through their contributions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="flex flex-col items-center text-center md:text-left">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={badge.earnedBy.avatar || "/placeholder.svg"} alt={badge.earnedBy.name} />
                  <AvatarFallback>{badge.earnedBy.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <h3 className="mt-2 text-xl font-bold">{badge.earnedBy.name}</h3>
                <p className="text-sm text-muted-foreground">@{badge.earnedBy.username}</p>
                <p className="text-sm text-muted-foreground">{badge.earnedBy.title}</p>
                <div className="mt-4 flex gap-2">
                  <Link href={`/portfolio/${badge.earnedBy.id}`}>
                    <Button variant="outline" size="sm">
                      <User className="mr-2 h-4 w-4" />
                      View Profile
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Repository</h3>
                  <div className="mt-2 rounded-lg border border-border/50 p-4">
                    <div className="flex items-center gap-2">
                      <Github className="h-5 w-5" />
                      <h4 className="font-medium">{badge.repository.name}</h4>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{badge.repository.description}</p>
                    <div className="mt-4">
                      <a
                        href={badge.repository.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-primary hover:underline"
                      >
                        View on GitHub
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>

                <Alert className="bg-primary/5 border-primary/20">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  <AlertTitle>Developer Achievement</AlertTitle>
                  <AlertDescription>
                    This badge was earned through significant contributions that demonstrated expertise in{" "}
                    {badge.name.toLowerCase()} skills. The developer's work was verified through our analysis process.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Engagement Section */}
        <BadgeEngagement />

        {/* Related Badges */}
        <Card>
          <CardHeader>
            <CardTitle>Related Badges</CardTitle>
            <CardDescription>Explore other skill badges you might be interested in</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {badge.relatedBadges.map((relatedBadge: string) => (
                <div key={relatedBadge} className="flex flex-col items-center rounded-lg border border-border/50 p-4">
                  <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-500 p-1">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-card">
                      <Code className="h-8 w-8" />
                    </div>
                  </div>
                  <h3 className="text-center font-medium">{relatedBadge}</h3>
                  <Button variant="outline" size="sm" className="mt-3">
                    <Info className="mr-2 h-4 w-4" />
                    Learn More
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="rounded-lg bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 p-6 text-center">
          <h2 className="text-2xl font-bold">Ready to Earn Your Own Badges?</h2>
          <p className="mx-auto mt-2 max-w-[600px] text-muted-foreground">
            Start showcasing your skills with verifiable NFT badges that highlight your expertise
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/analyze">
              <Button size="lg">
                <Github className="mr-2 h-5 w-5" />
                Analyze Your Repository
              </Button>
            </Link>
            <Link href="/challenges">
              <Button variant="outline" size="lg">
                <Trophy className="mr-2 h-5 w-5" />
                Join a Challenge
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
