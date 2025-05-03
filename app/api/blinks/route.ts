import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { badgeId, badgeName } = await request.json()

    // Check for authorization header
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Mock delay to simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate a unique ID for the blink
    const blinkId = Math.random().toString(36).substring(2, 10)

    // Mock Solana Blink creation response
    return NextResponse.json({
      success: true,
      blink: {
        id: blinkId,
        url: `https://blinks.solana.com/mint/${blinkId}?badge=${encodeURIComponent(badgeName)}`,
        created: new Date().toISOString(),
        badgeId,
        badgeName,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create Solana Blink" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  // Check for authorization header
  const authHeader = request.headers.get("Authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Mock blinks data
  const blinks = [
    {
      id: "a1b2c3d4",
      url: "https://blinks.solana.com/mint/a1b2c3d4?badge=Full%20Stack%20Developer",
      created: "2023-04-15T10:30:00Z",
      badgeId: 1,
      badgeName: "Full Stack Developer",
      clicks: 24,
      mints: 3,
    },
    {
      id: "e5f6g7h8",
      url: "https://blinks.solana.com/mint/e5f6g7h8?badge=Frontend%20Expert",
      created: "2023-01-20T14:45:00Z",
      badgeId: 2,
      badgeName: "Frontend Expert",
      clicks: 42,
      mints: 7,
    },
  ]

  return NextResponse.json(blinks)
}
