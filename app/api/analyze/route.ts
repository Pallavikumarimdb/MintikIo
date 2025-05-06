import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import { extractRepoInfo, getRepositoryDetails, determineSkillBadge } from "@/lib/github"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    const { repoUrl } = await request.json()

    // Extract owner and repo from GitHub URL
    const repoInfo = extractRepoInfo(repoUrl)
    if (!repoInfo) {
      return NextResponse.json({ error: "Invalid GitHub repository URL" }, { status: 400 })
    }

    // Fetch repository details from GitHub API
    const repoDetails = await getRepositoryDetails(repoInfo.owner, repoInfo.repo)

    // Determine skill badge based on repository analysis
    const skillBadge = determineSkillBadge(repoDetails)

    // Prepare response data
    const responseData = {
      name: repoDetails.name,
      description: repoDetails.description,
      stars: repoDetails.stars,
      languages: repoDetails.languages,
      commits: repoDetails.commits,
      contributors: repoDetails.contributors,
      skillBadge,
    }

    // If user is logged in, update the repository in the database
    console.log("hdhhdhdh9929229  "+session)
    if (session?.user?.id) {
      const userId = session.user.id

      // Find or create the repository
      let repository = await prisma.repository.findFirst({
        where: {
          userId,
          name: repoDetails.name,
          url: repoUrl,
        },
      })

      if (!repository) {
        repository = await prisma.repository.create({
          data: {
            name: repoDetails.name,
            url: repoUrl,
            description: repoDetails.description,
            stars: repoDetails.stars,
            commits: repoDetails.commits,
            contributors: repoDetails.contributors,
            analyzed: true,
            userId,
          },
        })
      } else {
        repository = await prisma.repository.update({
          where: {
            id: repository.id,
          },
          data: {
            stars: repoDetails.stars,
            commits: repoDetails.commits,
            contributors: repoDetails.contributors,
            analyzed: true,
            updatedAt: new Date(),
          },
        })
      }

      // Delete existing languages and create new ones
      await prisma.language.deleteMany({
        where: {
          repositoryId: repository.id,
        },
      })

      // Create new languages
      await Promise.all(
        repoDetails.languages.map(async (lang: { name: string; percentage: number }) => {
          await prisma.language.create({
            data: {
              name: lang.name,
              percentage: lang.percentage,
              repositoryId: repository.id,
            },
          })
        }),
      )

      // Find or create the badge
      let badge = await prisma.badge.findUnique({
        where: {
          name: skillBadge,
        },
      })

      if (!badge) {
        badge = await prisma.badge.create({
          data: {
            name: skillBadge,
            description: `Badge for ${skillBadge} skills`,
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
            category: skillBadge.includes("Frontend")
              ? "Frontend"
              : skillBadge.includes("Backend")
                ? "Backend"
                : skillBadge.includes("DevOps")
                  ? "DevOps"
                  : skillBadge.includes("Data")
                    ? "Data Science"
                    : "Full Stack",
          },
        })
      }

      // Connect badge to repository
      await prisma.repository.update({
        where: {
          id: repository.id,
        },
        data: {
          badges: {
            connect: {
              id: badge.id,
            },
          },
        },
      })
    }

    return NextResponse.json(responseData)
  } catch (error) {
    console.error("Failed to analyze repository:", error)
    return NextResponse.json({ error: "Failed to analyze repository" }, { status: 500 })
  }
}
