import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category") || "all"
    const sortBy = searchParams.get("sortBy") || "badges"
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const skip = (page - 1) * limit

    // Build query
    let whereClause = {}

    if (category !== "all") {
      whereClause = {
        skills: {
          some: {
            skill: {
              category,
            },
          },
        },
      }
    }

    const users = await prisma.user.findMany({
      where: whereClause,
      include: {
        _count: {
          select: {
            badges: true,
            repositories: true,
          },
        },
        skills: {
          include: {
            skill: true,
          },
          take: 5,
        },
      },
      orderBy:
        sortBy === "badges"
          ? { badges: { _count: "desc" } }
          : sortBy === "repos"
            ? { repositories: { _count: "desc" } }
            : { followers: { _count: "desc" } },
      take: limit,
      skip,
    })

    const transformedUsers = users.map((user) => {
      const { password, email, ...safeUser } = user
      return {
        ...safeUser,
        badgeCount: user._count.badges,
        repoCount: user._count.repositories,
        skills: user.skills.map((us) => us.skill.name),
      }
    })

    const totalUsers = await prisma.user.count({
      where: whereClause,
    })

    return NextResponse.json({
      users: transformedUsers,
      pagination: {
        total: totalUsers,
        pages: Math.ceil(totalUsers / limit),
        current: page,
        limit,
      },
    })
  } catch (error) {
    console.error("Failed to fetch leaderboard:", error)
    return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 })
  }
}
