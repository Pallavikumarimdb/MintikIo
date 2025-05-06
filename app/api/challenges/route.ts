import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import { Prisma } from "@prisma/client"

type ChallengeWhereInput = Prisma.ChallengeWhereInput

let whereClause: ChallengeWhereInput = {}


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const category = searchParams.get("category")
    const status = searchParams.get("status")

    if (id) {

      const challenge = await prisma.challenge.findUnique({
        where: {
          id,
        },
        include: {
          badge: true,
          _count: {
            select: {
              submissions: true,
            },
          },
        },
      })

      if (!challenge) {
        return NextResponse.json({ error: "Challenge not found" }, { status: 404 })
      }

      return NextResponse.json(challenge)
    }


    if (category) {
      whereClause.category = category
    }
    
    const now = new Date()
    if (status) {
      if (status === "active") {
        whereClause.startDate = { lte: now }
        whereClause.endDate = { gte: now }
      } else if (status === "upcoming") {
        whereClause.startDate = { gt: now }
      } else if (status === "past") {
        whereClause.endDate = { lt: now }
      }
    }
    
    

    const challenges = await prisma.challenge.findMany({
      where: whereClause,
      include: {
        badge: true,
        _count: {
          select: {
            submissions: true,
          },
        },
      },
      orderBy: {
        startDate: "asc",
      },
    })

    return NextResponse.json(challenges)
  } catch (error) {
    console.error("Failed to fetch challenges:", error)
    return NextResponse.json({ error: "Failed to fetch challenges" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const { challengeId, repositoryUrl, description } = await request.json()

    // Validate required fields
    if (!challengeId || !repositoryUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if challenge exists
    const challenge = await prisma.challenge.findUnique({
      where: {
        id: challengeId,
      },
    })

    if (!challenge) {
      return NextResponse.json({ error: "Challenge not found" }, { status: 404 })
    }

    // Check if challenge is active
    const now = new Date()
    if (now < challenge.startDate) {
      return NextResponse.json({ error: "Challenge has not started yet" }, { status: 400 })
    }

    if (now > challenge.endDate) {
      return NextResponse.json({ error: "Challenge has ended" }, { status: 400 })
    }

    // Check if user already submitted
    const existingSubmission = await prisma.challengeSubmission.findFirst({
      where: {
        userId,
        challengeId,
      },
    })

    if (existingSubmission) {
      return NextResponse.json({ error: "You have already submitted to this challenge" }, { status: 400 })
    }

    // Create submission
    const submission = await prisma.challengeSubmission.create({
      data: {
        userId,
        challengeId,
        repositoryUrl,
        description,
      },
    })

    // Update challenge participants count
    await prisma.challenge.update({
      where: {
        id: challengeId,
      },
      data: {
        participants: {
          increment: 1,
        },
      },
    })

    // Create notification
    await prisma.notification.create({
      data: {
        userId,
        type: "challenge",
        title: "Challenge Submission",
        description: `Your submission to ${challenge.title} has been received!`,
      },
    })

    return NextResponse.json({
      success: true,
      submission,
    })
  } catch (error) {
    console.error("Error submitting to challenge:", error)
    return NextResponse.json({ error: "Failed to submit to challenge" }, { status: 500 })
  }
}
