import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const featured = searchParams.get("featured")
    const badge = searchParams.get("badge")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const skip = (page - 1) * limit

    if (id) {
      const job = await prisma.job.findUnique({
        where: {
          id,
        },
        include: {
          requiredBadges: true,
          _count: {
            select: {
              applications: true,
            },
          },
        },
      })

      if (!job) {
        return NextResponse.json({ error: "Job not found" }, { status: 404 })
      }

      return NextResponse.json(job)
    }

    let whereClause = {}

    if (featured === "true") {
      whereClause = {
        ...whereClause,
        featured: true,
      }
    }

    if (badge) {
      whereClause = {
        ...whereClause,
        OR: [{ badges: { has: badge } }, { requiredBadges: { some: { name: badge } } }],
      }
    }

    const jobs = await prisma.job.findMany({
      where: whereClause,
      include: {
        requiredBadges: true,
        _count: {
          select: {
            applications: true,
          },
        },
      },
      orderBy: [{ featured: "desc" }, { postedAt: "desc" }],
      take: limit,
      skip,
    })

    const totalJobs = await prisma.job.count({
      where: whereClause,
    })

    return NextResponse.json({
      jobs,
      pagination: {
        total: totalJobs,
        pages: Math.ceil(totalJobs / limit),
        current: page,
        limit,
      },
    })
  } catch (error) {
    console.error("Failed to fetch jobs:", error)
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const { jobId, resume, coverLetter, contactEmail } = await request.json()

    if (!jobId || !contactEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
    })

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    const existingApplication = await prisma.jobApplication.findFirst({
      where: {
        userId,
        jobId,
      },
    })

    if (existingApplication) {
      return NextResponse.json({ error: "You have already applied to this job" }, { status: 400 })
    }

    const application = await prisma.jobApplication.create({
      data: {
        userId,
        jobId,
        resume,
        coverLetter,
        contactEmail,
      },
    })

    await prisma.notification.create({
      data: {
        userId,
        type: "job",
        title: "Job Application",
        description: `Your application to ${job.title} at ${job.company} has been submitted!`,
      },
    })

    return NextResponse.json({
      success: true,
      application,
      message: "Your application has been submitted successfully",
    })
  } catch (error) {
    console.error("Error applying for job:", error)
    return NextResponse.json({ error: "Failed to apply for job" }, { status: 500 })
  }
}
