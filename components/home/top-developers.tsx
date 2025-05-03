"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Award, Github, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// Mock top developers data
const topDevelopersData = [
  {
    id: 1,
    name: "Alex Johnson",
    username: "alexj",
    avatar: "/placeholder.svg?height=80&width=80",
    title: "Full Stack Developer",
    badges: 12,
    stars: 342,
    topSkills: ["React", "Node.js", "TypeScript"],
    featured: true,
  },
  {
    id: 2,
    name: "Sarah Chen",
    username: "sarahc",
    avatar: "/placeholder.svg?height=80&width=80",
    title: "Frontend Engineer",
    badges: 9,
    stars: 287,
    topSkills: ["Vue.js", "CSS", "UI Design"],
    featured: false,
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    username: "mrodriguez",
    avatar: "/placeholder.svg?height=80&width=80",
    title: "Backend Developer",
    badges: 8,
    stars: 256,
    topSkills: ["Python", "Django", "PostgreSQL"],
    featured: false,
  },
]

export function TopDevelopers() {
  const [developers, setDevelopers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock API call
    const fetchDevelopers = async () => {
      try {
        // In a real app, you would fetch from an API
        // const response = await fetch('/api/developers/top')
        // const data = await response.json()

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setDevelopers(topDevelopersData)
      } catch (error) {
        console.error("Failed to fetch top developers", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDevelopers()
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col items-center p-6">
                <Skeleton className="h-20 w-20 rounded-full" />
                <div className="mt-4 space-y-2 text-center">
                  <Skeleton className="h-6 w-32 mx-auto" />
                  <Skeleton className="h-4 w-24 mx-auto" />
                </div>
                <div className="mt-4 flex justify-center gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <div className="mt-6">
                  <Skeleton className="h-9 w-28" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {developers.map((dev) => (
        <Card key={dev.id} className={`overflow-hidden ${dev.featured ? "border-primary/50 shadow-md" : ""}`}>
          <CardContent className="p-0">
            <div className="flex flex-col items-center p-6">
              {dev.featured && (
                <div className="absolute top-2 right-2">
                  <Badge variant="default" className="bg-primary text-primary-foreground">
                    Featured
                  </Badge>
                </div>
              )}
              <Avatar className="h-20 w-20">
                <AvatarImage src={dev.avatar || "/placeholder.svg"} alt={dev.name} />
                <AvatarFallback>{dev.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-bold">{dev.name}</h3>
                <p className="text-sm text-muted-foreground">{dev.title}</p>
              </div>
              <div className="mt-4 flex justify-center gap-4">
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="text-sm">{dev.badges}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">{dev.stars}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Github className="h-4 w-4" />
                  <span className="text-sm">@{dev.username}</span>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {dev.topSkills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
              <div className="mt-6">
                <Link href={`/portfolio/${dev.id}`}>
                  <Button variant={dev.featured ? "default" : "outline"}>View Profile</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
