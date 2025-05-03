"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Award, Calendar, Clock, Code, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

// Mock challenges data
const challengesData = [
  {
    id: 1,
    title: "AI Chatbot Challenge",
    description: "Build an AI-powered chatbot using any framework of your choice",
    startDate: "2023-06-15T00:00:00Z",
    endDate: "2023-06-30T23:59:59Z",
    badgeName: "AI Developer",
    difficulty: "Intermediate",
    participants: 128,
    category: "AI/ML",
  },
  {
    id: 2,
    title: "Web3 dApp Hackathon",
    description: "Create a decentralized application on Solana blockchain",
    startDate: "2023-07-01T00:00:00Z",
    endDate: "2023-07-15T23:59:59Z",
    badgeName: "Blockchain Developer",
    difficulty: "Advanced",
    participants: 86,
    category: "Blockchain",
  },
  {
    id: 3,
    title: "Responsive UI Challenge",
    description: "Design and implement a responsive UI for a given wireframe",
    startDate: "2023-06-10T00:00:00Z",
    endDate: "2023-06-20T23:59:59Z",
    badgeName: "UI Expert",
    difficulty: "Beginner",
    participants: 215,
    category: "Frontend",
  },
]

export function UpcomingChallenges() {
  const [challenges, setChallenges] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock API call
    const fetchChallenges = async () => {
      try {
        // In a real app, you would fetch from an API
        // const response = await fetch('/api/challenges/upcoming')
        // const data = await response.json()

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800))

        setChallenges(challengesData)
      } catch (error) {
        console.error("Failed to fetch upcoming challenges", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchChallenges()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate).getTime()
    const now = new Date().getTime()
    const daysRemaining = Math.ceil((end - now) / (1000 * 60 * 60 * 24))
    return daysRemaining > 0 ? daysRemaining : 0
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-9 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {challenges.map((challenge) => (
        <Card key={challenge.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{challenge.title}</CardTitle>
              <Badge variant="outline" className="bg-primary/10 text-primary">
                {challenge.category}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{challenge.description}</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                <Award className="mr-1 h-3.5 w-3.5" />
                {challenge.badgeName}
              </Badge>
              <Badge variant="secondary">
                <Code className="mr-1 h-3.5 w-3.5" />
                {challenge.difficulty}
              </Badge>
            </div>
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{formatDate(challenge.startDate)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{getDaysRemaining(challenge.endDate)} days left</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href={`/challenges/${challenge.id}`} className="w-full">
              <Button variant="default" className="w-full">
                Join Challenge
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
