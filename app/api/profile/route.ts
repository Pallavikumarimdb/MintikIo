import { NextResponse } from "next/server"

// Mock database
let profile = {
  name: "John Doe",
  bio: "Full Stack Developer with 5 years of experience",
  location: "San Francisco, CA",
  education: [{ id: 1, school: "Stanford University", degree: "BS Computer Science", year: "2018-2022" }],
  experience: [{ id: 1, company: "Tech Corp", position: "Senior Developer", duration: "2022-Present" }],
  skills: ["JavaScript", "React", "Node.js", "TypeScript", "Next.js"],
  badges: [
    { id: 1, name: "Full Stack Developer", date: "April 2023", shared: false },
    { id: 2, name: "Frontend Expert", date: "January 2023", shared: true },
  ],
}

export async function GET(request: Request) {
  // Check for authorization header
  const authHeader = request.headers.get("Authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.json(profile)
}

export async function POST(request: Request) {
  try {
    // Check for authorization header
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const updates = await request.json()

    // Update profile with new data
    profile = { ...profile, ...updates }

    return NextResponse.json(profile)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
