import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        education: true,
        experience: true,
        skills: {
          include: {
            skill: true,
          },
        },
        badges: {
          include: {
            badge: true,
            transaction: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // For reference: password extracts the password property from user, ...userWithoutPassword collects the rest of the properties (everything except password) into a new object called userWithoutPassword.
    const { password, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error("Failed to fetch profile:", error)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const { name, bio, location, education, experience, skills } = await request.json()

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        bio,
        location,
      },
    })

    //(delete existing and create new)
    if (education && Array.isArray(education)) {
      await prisma.education.deleteMany({
        where: {
          userId,
        },
      })

      await prisma.education.createMany({
        data: education.map((edu: any) => ({
          school: edu.school,
          degree: edu.degree,
          year: edu.year,
          userId,
        })),
      })
    }

    if (experience && Array.isArray(experience)) {
      await prisma.experience.deleteMany({
        where: {
          userId,
        },
      })

      await prisma.experience.createMany({
        data: experience.map((exp: any) => ({
          company: exp.company,
          position: exp.position,
          duration: exp.duration,
          userId,
        })),
      })
    }

    if (skills && Array.isArray(skills)) {
      await prisma.userSkill.deleteMany({
        where: {
          userId,
        },
      })

      for (const skillName of skills) {
        let skill = await prisma.skill.findUnique({
          where: {
            name: skillName,
          },
        })

        if (!skill) {
          skill = await prisma.skill.create({
            data: {
              name: skillName,
            },
          })
        }

        await prisma.userSkill.create({
          data: {
            userId,
            skillId: skill.id,
          },
        })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to update profile:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
