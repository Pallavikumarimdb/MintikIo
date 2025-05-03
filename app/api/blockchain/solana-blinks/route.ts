import { NextResponse } from "next/server"

// Mock Solana Blinks data
interface SolanaBlink {
  id: string
  url: string
  badgeId: number
  badgeName: string
  createdAt: string
  expiresAt: string
  clicks: number
  mints: number
  creator: string
}

// Mock Solana Blinks service
class MockSolanaBlinkService {
  private static instance: MockSolanaBlinkService
  private blinks: Map<string, SolanaBlink> = new Map()

  public static getInstance(): MockSolanaBlinkService {
    if (!MockSolanaBlinkService.instance) {
      MockSolanaBlinkService.instance = new MockSolanaBlinkService()

      // Add some initial mock data
      const initialBlinks = [
        {
          id: "a1b2c3d4",
          url: "https://blinks.solana.com/mint/a1b2c3d4?badge=Full%20Stack%20Developer",
          badgeId: 1,
          badgeName: "Full Stack Developer",
          createdAt: "2023-04-15T10:30:00Z",
          expiresAt: "2023-07-15T10:30:00Z",
          clicks: 24,
          mints: 3,
          creator: "8xH5f...3kPn",
        },
        {
          id: "e5f6g7h8",
          url: "https://blinks.solana.com/mint/e5f6g7h8?badge=Frontend%20Expert",
          badgeId: 2,
          badgeName: "Frontend Expert",
          createdAt: "2023-01-20T14:45:00Z",
          expiresAt: "2023-04-20T14:45:00Z",
          clicks: 42,
          mints: 7,
          creator: "8xH5f...3kPn",
        },
      ]

      initialBlinks.forEach((blink) => {
        MockSolanaBlinkService.instance.blinks.set(blink.id, blink)
      })
    }
    return MockSolanaBlinkService.instance
  }

  public createBlink(badgeId: number, badgeName: string, creator: string): SolanaBlink {
    const id = Math.random().toString(36).substring(2, 10)
    const url = `https://blinks.solana.com/mint/${id}?badge=${encodeURIComponent(badgeName)}`

    // Create expiration date (3 months from now)
    const now = new Date()
    const expiresAt = new Date(now)
    expiresAt.setMonth(now.getMonth() + 3)

    const blink: SolanaBlink = {
      id,
      url,
      badgeId,
      badgeName,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      clicks: 0,
      mints: 0,
      creator,
    }

    this.blinks.set(id, blink)
    return blink
  }

  public getBlink(id: string): SolanaBlink | undefined {
    return this.blinks.get(id)
  }

  public getBlinksByCreator(creator: string): SolanaBlink[] {
    return Array.from(this.blinks.values()).filter((blink) => blink.creator === creator)
  }

  public recordClick(id: string): boolean {
    const blink = this.blinks.get(id)
    if (blink) {
      blink.clicks += 1
      this.blinks.set(id, blink)
      return true
    }
    return false
  }

  public recordMint(id: string): boolean {
    const blink = this.blinks.get(id)
    if (blink) {
      blink.mints += 1
      this.blinks.set(id, blink)
      return true
    }
    return false
  }
}

export async function POST(request: Request) {
  try {
    const { badgeId, badgeName, walletAddress } = await request.json()

    // Check for authorization header
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Validate required fields
    if (!badgeId || !badgeName || !walletAddress) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const blinkService = MockSolanaBlinkService.getInstance()
    const blink = blinkService.createBlink(badgeId, badgeName, walletAddress)

    return NextResponse.json({
      success: true,
      blink,
    })
  } catch (error) {
    console.error("Error creating Solana Blink:", error)
    return NextResponse.json({ error: "Failed to create Solana Blink" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    // Check for authorization header
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const blinkId = searchParams.get("id")
    const creator = searchParams.get("creator")

    const blinkService = MockSolanaBlinkService.getInstance()

    if (blinkId) {
      // Get blink by ID
      const blink = blinkService.getBlink(blinkId)
      if (!blink) {
        return NextResponse.json({ error: "Blink not found" }, { status: 404 })
      }
      return NextResponse.json(blink)
    } else if (creator) {
      // Get blinks by creator
      const blinks = blinkService.getBlinksByCreator(creator)
      return NextResponse.json(blinks)
    } else {
      return NextResponse.json({ error: "Missing query parameters" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error fetching Solana Blinks:", error)
    return NextResponse.json({ error: "Failed to fetch Solana Blinks" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { id, action } = await request.json()

    // Check for authorization header
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Validate required fields
    if (!id || !action) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const blinkService = MockSolanaBlinkService.getInstance()
    let success = false

    if (action === "click") {
      success = blinkService.recordClick(id)
    } else if (action === "mint") {
      success = blinkService.recordMint(id)
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    if (!success) {
      return NextResponse.json({ error: "Blink not found" }, { status: 404 })
    }

    const blink = blinkService.getBlink(id)
    return NextResponse.json({
      success: true,
      blink,
    })
  } catch (error) {
    console.error("Error updating Solana Blink:", error)
    return NextResponse.json({ error: "Failed to update Solana Blink" }, { status: 500 })
  }
}
