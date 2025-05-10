import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { badgeName, mintAddress, txId, walletAddress } = await request.json()


    if (!mintAddress || !txId || !badgeName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    let badge = await prisma.badge.findUnique({
      where: {
        name: badgeName,
      },
    })

    if (!badge) {
      badge = await prisma.badge.create({
        data: {
          name: badgeName,
          description: `Badge for ${badgeName} skills`,
          requirements: [
            "Demonstrated expertise in relevant technologies",
            "Quality code contributions",
            "Consistent coding patterns",
            "Proper documentation",
          ],
          benefits: [
            "Industry recognition of technical expertise",
            "Verifiable proof of skills on the blockchain",
            "Enhanced visibility to potential employers",
            "Access to exclusive developer communities",
          ],
          category: badgeName.includes("Frontend")
            ? "Frontend"
            : badgeName.includes("Backend")
              ? "Backend"
              : badgeName.includes("DevOps")
                ? "DevOps"
                : badgeName.includes("Data")
                  ? "Data Science"
                  : "Full Stack",
        },
      })
    }

    const existingUserBadge = await prisma.userBadge.findUnique({
      where: {
        userId_badgeId: {
          userId: session.user.id,
          badgeId: badge.id,
        },
      },
    })

    if (existingUserBadge) {
      return NextResponse.json({ error: "User already has this badge" }, { status: 400 })
    }

    if (walletAddress) {
      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          walletAddress,
        },
      })
    }

    const userBadge = await prisma.userBadge.create({
      data: {
        userId: session.user.id,
        badgeId: badge.id,
        mintAddress,
      },
    })

    const txRecord = await prisma.transaction.create({
      data: {
        txHash: txId,
        status: "confirmed",
        timestamp: new Date(),
        blockHeight: 0,
        confirmations: 1,
        fee: 0, 
        signature: txId,
        userBadgeId: userBadge.id,
      },
    })

    await prisma.notification.create({
      data: {
        userId: session.user.id,
        type: "badge",
        title: "Badge Minted",
        description: `You've successfully minted the ${badgeName} badge!`,
      },
    })

    return NextResponse.json({
      success: true,
      userBadge,
      transaction: txRecord,
    })
  } catch (error) {
    console.error("Error recording NFT mint:", error)
    return NextResponse.json({ error: "Failed to record NFT mint" }, { status: 500 })
  }
}
