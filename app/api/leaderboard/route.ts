import { NextResponse } from "next/server"

// Mock leaderboard data
const leaderboardData = [
  {
    id: 1,
    name: "Alex Johnson",
    username: "alexj",
    avatar: "/placeholder.svg?height=40&width=40",
    badges: 12,
    stars: 342,
    repos: 28,
    skills: ["Full Stack", "Frontend", "Backend"],
  },
  {
    id: 2,
    name: "Sarah Chen",
    username: "sarahc",
    avatar: "/placeholder.svg?height=40&width=40",
    badges: 9,
    stars: 287,
    repos: 15,
    skills: ["Frontend", "UI/UX", "Mobile"],
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    username: "mrodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    badges: 8,
    stars: 256,
    repos: 22,
    skills: ["Backend", "DevOps", "Database"],
  },
  {
    id: 4,
    name: "Emily Wilson",
    username: "emilyw",
    avatar: "/placeholder.svg?height=40&width=40",
    badges: 7,
    stars: 198,
    repos: 17,
    skills: ["AI/ML", "Data Science", "Python"],
  },
  {
    id: 5,
    name: "David Kim",
    username: "davidk",
    avatar: "/placeholder.svg?height=40&width=40",
    badges: 6,
    stars: 176,
    repos: 14,
    skills: ["Mobile", "React Native", "Flutter"],
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category") || "all"
  const sortBy = searchParams.get("sortBy") || "badges"

  // Filter by category if needed
  let filtered = [...leaderboardData]
  if (category !== "all") {
    const categoryMap: Record<string, string[]> = {
      frontend: ["Frontend", "UI/UX"],
      backend: ["Backend", "Database"],
      fullstack: ["Full Stack"],
      mobile: ["Mobile", "React Native", "Flutter"],
      aiml: ["AI/ML", "Data Science"],
      devops: ["DevOps", "Infrastructure"],
    }

    filtered = filtered.filter((dev) => dev.skills.some((skill) => categoryMap[category]?.includes(skill)))
  }

  // Sort by the requested field
  filtered.sort((a, b) => {
    if (sortBy === "badges") return b.badges - a.badges
    if (sortBy === "stars") return b.stars - a.stars
    return b.repos - a.repos
  })

  return NextResponse.json(filtered)
}
