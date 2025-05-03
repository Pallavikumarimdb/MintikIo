import { NextResponse } from "next/server"

// Mock badges data
const badges = [
  {
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
  },
  {
    id: "e5f6g7h8",
    name: "Frontend Expert",
    description: "Awarded to developers who demonstrate exceptional frontend development skills",
    image: "/placeholder.svg?height=300&width=300&text=Frontend%20Expert",
    earnedBy: {
      id: 2,
      name: "Sarah Chen",
      username: "sarahc",
      avatar: "/placeholder.svg?height=80&width=80",
      title: "UI Developer at DesignLabs",
    },
    repository: {
      name: "react-portfolio",
      url: "https://github.com/username/react-portfolio",
      description: "A personal portfolio website built with React",
    },
    mintedAt: "2023-01-20T14:45:00Z",
    requirements: [
      "Demonstrated expertise in modern JavaScript frameworks",
      "Proficiency in CSS and responsive design",
      "Experience with state management",
      "Understanding of frontend performance optimization",
      "Knowledge of accessibility best practices",
    ],
    benefits: [
      "Recognition of frontend development expertise",
      "Verifiable proof of UI/UX skills",
      "Enhanced visibility to design-focused employers",
      "Access to frontend developer communities",
    ],
    stats: {
      totalEarned: 215,
      averageRepoStars: 32,
      averageContributions: 186,
    },
    relatedBadges: ["UI Designer", "Full Stack Developer", "Web Accessibility Expert"],
  },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Find badge by ID
  const badge = badges.find((b) => b.id === id)

  if (!badge) {
    return NextResponse.json({ error: "Badge not found" }, { status: 404 })
  }

  // Record view analytics (in a real app)
  // await recordBadgeView(id)

  return NextResponse.json(badge)
}

// For tracking engagement
export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const { action, userId } = await request.json()

    // Find badge by ID
    const badge = badges.find((b) => b.id === id)

    if (!badge) {
      return NextResponse.json({ error: "Badge not found" }, { status: 404 })
    }

    // In a real app, you would record different types of engagement
    switch (action) {
      case "like":
        // await recordBadgeLike(id, userId)
        break
      case "share":
        // await recordBadgeShare(id, userId, platform)
        break
      case "comment":
        // await addBadgeComment(id, userId, comment)
        break
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: `${action} recorded successfully`,
    })
  } catch (error) {
    console.error("Error recording badge engagement:", error)
    return NextResponse.json({ error: "Failed to record engagement" }, { status: 500 })
  }
}
