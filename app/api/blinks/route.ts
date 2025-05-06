import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const { badgeId, badgeName } = await request.json()

    if (!badgeId || !badgeName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const badge = await prisma.badge.findUnique({
      where: {
        id: badgeId,
      },
    })

    if (!badge) {
      return NextResponse.json({ error: "Badge not found" }, { status: 404 })
    }

    const userBadge = await prisma.userBadge.findUnique({
      where: {
        userId_badgeId: {
          userId,
          badgeId,
        },
      },
    })

    if (!userBadge) {
      return NextResponse.json({ error: "You don't have this badge" }, { status: 400 })
    }

    const blinkId = Math.random().toString(36).substring(2, 10)
    const url = `https://blinks.solana.com/mint/${blinkId}?badge=${encodeURIComponent(badgeName)}`

    // Create expiration date (3 months from now)
    const expiresAt = new Date()
    expiresAt.setMonth(expiresAt.getMonth() + 3)

    const blink = await prisma.solanaBlink.create({
      data: {
        url,
        expiresAt,
        userId,
        badgeId,
      },
    })

    await prisma.userBadge.update({
      where: {
        id: userBadge.id,
      },
      data: {
        shared: true,
      },
    })

    await prisma.notification.create({
      data: {
        userId,
        type: "blink",
        title: "Blink Created",
        description: `You've created a Solana Blink for your ${badgeName} badge!`,
      },
    })

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
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const { searchParams } = new URL(request.url)
    const badgeId = searchParams.get("badgeId")

    const whereClause = {
      userId,
      ...(badgeId ? { badgeId } : {}),
    }

    const blinks = await prisma.solanaBlink.findMany({
      where: whereClause,
      include: {
        badge: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(blinks)
  } catch (error) {
    console.error("Error fetching Solana Blinks:", error)
    return NextResponse.json({ error: "Failed to fetch Solana Blinks" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { id, action } = await request.json()

    if (!id || !action) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const blink = await prisma.solanaBlink.findUnique({
      where: {
        id,
      },
    })

    if (!blink) {
      return NextResponse.json({ error: "Blink not found" }, { status: 404 })
    }

  
    if (action === "click") {
      await prisma.solanaBlink.update({
        where: {
          id,
        },
        data: {
          clicks: {
            increment: 1,
          },
        },
      })
    } else if (action === "mint") {
      await prisma.solanaBlink.update({
        where: {
          id,
        },
        data: {
          mints: {
            increment: 1,
          },
        },
      })
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    const updatedBlink = await prisma.solanaBlink.findUnique({
      where: {
        id,
      },
      include: {
        badge: true,
      },
    })

    return NextResponse.json({
      success: true,
      blink: updatedBlink,
    })
  } catch (error) {
    console.error("Error updating Solana Blink:", error)
    return NextResponse.json({ error: "Failed to update Solana Blink" }, { status: 500 })
  }
}
