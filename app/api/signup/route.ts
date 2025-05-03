import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Mock validation
    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Mock user creation (in a real app, you would save to a database)
    return NextResponse.json({
      user: {
        id: "1",
        name,
        email,
      },
      token: "mock-jwt-token",
    })
  } catch (error) {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
