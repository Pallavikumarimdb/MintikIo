import { NextResponse } from "next/server"

// Mock blinks data
const blinks = [
  {
    id: "a1b2c3d4",
    badgeId: "a1b2c3d4",
    creatorId: 1,
    url: "https://blinks.solana.com/mint/a1b2c3d4?badge=Full%20Stack%20Developer",
    createdAt: "2023-04-15T10:30:00Z",
    expiresAt: "2023-07-15T10:30:00Z",
    views: 124,
    likes: 42,
    shares: 18,
    comments: 7,
  },
  {
    id: "e5f6g7h8",
    badgeId: "e5f6g7h8",
    creatorId: 2,
    url: "https://blinks.solana.com/mint/e5f6g7h8?badge=Frontend%20Expert",
    createdAt: "2023-01-20T14:45:00Z",
    expiresAt: "2023-04-20T14:45:00Z",
    views: 98,
    likes: 36,
    shares: 12,
    comments: 5,
  },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Find blink by ID
  const blink = blinks.find((b) => b.id === id)

  if (!blink) {
    return NextResponse.json({ error: "Blink not found" }, { status: 404 })
  }

  // Record view (in a real app)
  // await recordBlinkView(id)

  // In a real app, you would also fetch the associated badge data
  // const badge = await fetchBadge(blink.badgeId)

  return NextResponse.json({
    blink,
    // badge,
  })
}

// For tracking engagement
export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const { action, userId } = await request.json()

    // Find blink by ID
    const blink = blinks.find((b) => b.id === id)

    if (!blink) {
      return NextResponse.json({ error: "Blink not found" }, { status: 404 })
    }

    // In a real app, you would record different types of engagement
    switch (action) {
      case "view":
        // await recordBlinkView(id, userId)
        break
      case "like":
        // await recordBlinkLike(id, userId)
        break
      case "share":
        // await recordBlinkShare(id, userId, platform)
        break
      case "comment":
        // await addBlinkComment(id, userId, comment)
        break
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: `${action} recorded successfully`,
    })
  } catch (error) {
    console.error("Error recording blink engagement:", error)
    return NextResponse.json({ error: "Failed to record engagement" }, { status: 500 })
  }
}
