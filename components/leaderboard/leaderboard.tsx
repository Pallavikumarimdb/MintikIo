"use client"

import { useState } from "react"
import Link from "next/link"
import { Award, Github, Star, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data
const developers = [
  {
    id: 1,
    name: "Alex Johnson",
    username: "alexj",
    avatar: "/img1.jpeg?height=40&width=40",
    badges: 12,
    stars: 342,
    repos: 28,
    skills: ["Full Stack", "Frontend", "Backend"],
  },
  {
    id: 2,
    name: "Sarah Chen",
    username: "sarahc",
    avatar: "/img2.jpeg?height=40&width=40",
    badges: 9,
    stars: 287,
    repos: 15,
    skills: ["Frontend", "UI/UX", "Mobile"],
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    username: "mrodriguez",
    avatar: "/img3.jpeg?height=40&width=40",
    badges: 8,
    stars: 256,
    repos: 22,
    skills: ["Backend", "DevOps", "Database"],
  },
  {
    id: 4,
    name: "Emily Wilson",
    username: "emilyw",
    avatar: "/img4.jpeg?height=40&width=40",
    badges: 7,
    stars: 198,
    repos: 17,
    skills: ["AI/ML", "Data Science", "Python"],
  },
  {
    id: 5,
    name: "David Kim",
    username: "davidk",
    avatar: "/img5.jpeg?height=40&width=40",
    badges: 6,
    stars: 176,
    repos: 14,
    skills: ["Mobile", "React Native", "Flutter"],
  },
]

// Categories
const categories = [
  { id: "all", name: "All Categories" },
  { id: "frontend", name: "Frontend" },
  { id: "backend", name: "Backend" },
  { id: "fullstack", name: "Full Stack" },
  { id: "mobile", name: "Mobile" },
  { id: "aiml", name: "AI/ML" },
  { id: "devops", name: "DevOps" },
]

export function Leaderboard() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("badges")

  // Filter developers by category
  const filteredDevelopers = developers.filter((dev) => {
    if (selectedCategory === "all") return true

    const categoryMap: Record<string, string[]> = {
      frontend: ["Frontend", "UI/UX"],
      backend: ["Backend", "Database"],
      fullstack: ["Full Stack"],
      mobile: ["Mobile", "React Native", "Flutter"],
      aiml: ["AI/ML", "Data Science"],
      devops: ["DevOps", "Infrastructure"],
    }

    return dev.skills.some((skill) => categoryMap[selectedCategory]?.includes(skill))
  })

  // Sort developers
  const sortedDevelopers = [...filteredDevelopers].sort((a, b) => {
    if (sortBy === "badges") return b.badges - a.badges
    if (sortBy === "stars") return b.stars - a.stars
    return b.repos - a.repos
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Developer Rankings</CardTitle>
            <CardDescription className="mt-2">Top developers ranked by badges, stars, and repositories</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant={sortBy === "badges" ? "default" : "outline"} size="sm" onClick={() => setSortBy("badges")}>
              <Award className="mr-2 h-4 w-4" />
              Badges
            </Button>
            <Button variant={sortBy === "stars" ? "default" : "outline"} size="sm" onClick={() => setSortBy("stars")}>
              <Star className="mr-2 h-4 w-4" />
              Stars
            </Button>
            <Button variant={sortBy === "repos" ? "default" : "outline"} size="sm" onClick={() => setSortBy("repos")}>
              <Github className="mr-2 h-4 w-4" />
              Repos
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="mb-6 flex flex-wrap gap-8 h-auto">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-4">
              {sortedDevelopers.map((dev, index) => (
                <div key={dev.id} className="flex items-center justify-between rounded-lg border border-border/50 p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {index === 0 ? (
                        <Trophy className="h-4 w-4" />
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                    </div>
                    <Link href={`/portfolio/${dev.id}`} className="flex items-center gap-4 hover:underline">
                      <Avatar>
                        <AvatarImage src={dev.avatar || "/placeholder.svg"} alt={dev.name} />
                        <AvatarFallback>{dev.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{dev.name}</h3>
                        <p className="text-sm text-muted-foreground">@{dev.username}</p>
                      </div>
                    </Link>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex flex-wrap gap-2">
                      {dev.skills.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="hidden md:flex items-center gap-6">
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4 text-primary" />
                        <span>{dev.badges}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{dev.stars}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Github className="h-4 w-4" />
                        <span>{dev.repos}</span>
                      </div>
                    </div>
                    <Link href={`/portfolio/${dev.id}`}>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
