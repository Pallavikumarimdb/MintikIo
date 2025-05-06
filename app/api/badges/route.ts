import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const category = searchParams.get("category")
    const userId = searchParams.get("userId")

    if (id) {
      const badge = await prisma.badge.findUnique({
        where: {
          id,
        },
        include: {
          users: {
            include: {
              user: true,
              transaction: true,
            },
          },
        },
      })

      if (!badge) {
        return NextResponse.json({ error: "Badge not found" }, { status: 404 })
      }

      return NextResponse.json(badge)
    }

    const whereClause = {
      ...(category ? { category } : {}),
      ...(userId ? { users: { some: { userId } } } : {}),
    }

    const badges = await prisma.badge.findMany({
      where: whereClause,
      include: {
        _count: {
          select: {
            users: true,
          },
        },
      },
    })

    return NextResponse.json(badges)
  } catch (error) {
    console.error("Failed to fetch badges:", error)
    return NextResponse.json({ error: "Failed to fetch badges" }, { status: 500 })
  }
}
