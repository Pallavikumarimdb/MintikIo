import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { repoUrl } = await request.json()

    // Mock delay to simulate API processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Extract repo name from URL for the mock data
    const repoName = repoUrl.split("/").pop() || "repository"

    // Mock response data
    const mockData = {
      name: repoName,
      description: "A modern web application built with Next.js and TypeScript",
      stars: Math.floor(Math.random() * 1000),
      languages: [
        { name: "TypeScript", percentage: 45 },
        { name: "JavaScript", percentage: 30 },
        { name: "CSS", percentage: 15 },
        { name: "HTML", percentage: 10 },
      ],
      commits: Math.floor(Math.random() * 500) + 100,
      contributors: Math.floor(Math.random() * 10) + 1,
      forks: Math.floor(Math.random() * 100) + 1,
      skillBadge: ["Full Stack Developer", "Frontend Expert", "Backend Developer", "DevOps Engineer"][
        Math.floor(Math.random() * 4)
      ],
    }

    return NextResponse.json(mockData)
  } catch (error) {
    return NextResponse.json({ error: "Failed to analyze repository" }, { status: 500 })
  }
}
