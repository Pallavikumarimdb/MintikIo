import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Mock validation
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Mock authentication (in a real app, you would validate against a database)
    if (email === "test@example.com" && password === "password") {
      return NextResponse.json({
        user: {
          id: "1",
          name: "Test User",
          email: "test@example.com",
        },
        token: "mock-jwt-token",
      })
    }

    // For demo purposes, accept any credentials
    return NextResponse.json({
      user: {
        id: "1",
        name: email.split("@")[0],
        email,
      },
      token: "mock-jwt-token",
    })
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
