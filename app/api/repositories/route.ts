import { sk } from "date-fns/locale"
import { NextResponse } from "next/server"

// Mock repositories data
const repositories = [
  {
    id: 1,
    name: "next-auth-example",
    url: "https://github.com/username/next-auth-example",
    description: "An example app with NextAuth.js",
    stars: 45,
    languages: [
      { name: "TypeScript", percentage: 65 },
      { name: "JavaScript", percentage: 25 },
      { name: "CSS", percentage: 10 },
    ],
    analyzed: true,
    skillBadge: "Full Stack Developer",
    addedAt: "2023-04-15T10:30:00Z",
  },
  {
    id: 2,
    name: "react-portfolio",
    url: "https://github.com/username/react-portfolio",
    description: "My personal portfolio website",
    stars: 12,
    languages: [
      { name: "JavaScript", percentage: 55 },
      { name: "CSS", percentage: 35 },
      { name: "HTML", percentage: 10 },
    ],
    analyzed: true,
    skillBadge: "Frontend Expert",
    addedAt: "2023-01-20T14:45:00Z",
  },
  {
    id: 3,
    name: "api-service",
    url: "https://github.com/username/api-service",
    description: "RESTful API service built with Node.js",
    stars: 28,
    languages: [
      { name: "JavaScript", percentage: 80 },
      { name: "JSON", percentage: 15 },
      { name: "Markdown", percentage: 5 },
    ],
    analyzed: true,
    skillBadge: "API Developer",
    addedAt: "2023-03-10T09:15:00Z",
  },
]

export async function GET(request: Request) {
  // Check for authorization header
  const authHeader = request.headers.get("Authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Get search params
  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search")?.toLowerCase() || ""
  const sortBy = searchParams.get("sortBy") || "date"

  // Filter repositories
  let filteredRepos = [...repositories]
  if (search) {
    filteredRepos = filteredRepos.filter(
      (repo) => repo.name.toLowerCase().includes(search) || repo.description.toLowerCase().includes(search),
    )
  }

  // Sort repositories
  if (sortBy === "name") {
    filteredRepos.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy === "stars") {
    filteredRepos.sort((a, b) => b.stars - a.stars)
  } else {
    // Default sort by date
    filteredRepos.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
  }

  return NextResponse.json(filteredRepos)
}

export async function POST(request: Request) {
  try {
    // Check for authorization header
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { url } = await request.json()

    // Extract repo name from URL
    const repoName = url.split("/").pop() || ""

    // Check if repo already exists
    if (repositories.some((repo) => repo.name.toLowerCase() === repoName.toLowerCase())) {
      return NextResponse.json({ error: "Repository already exists" }, { status: 400 })
    }

    // Create new repository
    const newRepo = {
      id: repositories.length + 1,
      name: repoName,
      url,
      description: `Repository ${repoName}`,
      stars: Math.floor(Math.random() * 50),
      languages: [
        { name: "JavaScript", percentage: Math.floor(Math.random() * 60) + 20 },
        { name: "TypeScript", percentage: Math.floor(Math.random() * 40) + 10 },
        { name: "CSS", percentage: Math.floor(Math.random() * 30) },
      ],
      skillBadge: "Full Stack Developer",
      analyzed: false,
      addedAt: new Date().toISOString(),
    }

    // In a real app, you would save this to a database
    repositories.push(newRepo)

    return NextResponse.json(newRepo)
  } catch (error) {
    return NextResponse.json({ error: "Failed to add repository" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    // Check for authorization header
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Repository ID is required" }, { status: 400 })
    }

    // In a real app, you would delete from a database
    const index = repositories.findIndex((repo) => repo.id === Number.parseInt(id))

    if (index === -1) {
      return NextResponse.json({ error: "Repository not found" }, { status: 404 })
    }

    repositories.splice(index, 1)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete repository" }, { status: 500 })
  }
}
