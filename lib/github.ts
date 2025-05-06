import { Octokit } from "@octokit/rest"

// Initialize Octokit with GitHub token if available
export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

// Extract owner and repo from GitHub URL
export function extractRepoInfo(url: string): { owner: string; repo: string } | null {
  try {
    const parsedUrl = new URL(url)
    if (parsedUrl.hostname !== "github.com") {
      return null
    }

    const pathParts = parsedUrl.pathname.split("/").filter(Boolean)
    if (pathParts.length < 2) {
      return null
    }

    return {
      owner: pathParts[0],
      repo: pathParts[1],
    }
  } catch (error) {
    console.error("Failed to parse GitHub URL:", error)
    return null
  }
}

// Get repository details
export async function getRepositoryDetails(owner: string, repo: string) {
  try {
    const [repoData, languagesData, contributorsData, commitsData] = await Promise.all([
      octokit.repos.get({ owner, repo }),
      octokit.repos.listLanguages({ owner, repo }),
      octokit.repos.listContributors({ owner, repo, per_page: 100 }),
      octokit.repos.listCommits({ owner, repo, per_page: 1 }),
    ])

    // Calculate total bytes for language percentage calculation
    const languages = languagesData.data
    const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + (bytes as number), 0)

    // Format languages with percentages
    const formattedLanguages = Object.entries(languages).map(([name, bytes]) => ({
      name,
      percentage: Math.round(((bytes as number) / totalBytes) * 100),
    }))

    // Get total commits count using the last commit's count
    let totalCommits = 0
    if (commitsData.headers.link) {
      const lastPageMatch = commitsData.headers.link.match(/page=(\d+)>; rel="last"/)
      if (lastPageMatch && lastPageMatch[1]) {
        totalCommits = Number.parseInt(lastPageMatch[1], 10)
      }
    } else {
      totalCommits = commitsData.data.length
    }

    return {
      name: repoData.data.name,
      description: repoData.data.description || "No description provided",
      stars: repoData.data.stargazers_count,
      languages: formattedLanguages,
      commits: totalCommits,
      contributors: contributorsData.data.length,
      url: repoData.data.html_url,
      owner: repoData.data.owner.login,
      createdAt: repoData.data.created_at,
      updatedAt: repoData.data.updated_at,
      topics: repoData.data.topics || [],
      forks: repoData.data.forks_count,
      openIssues: repoData.data.open_issues_count,
      watchers: repoData.data.watchers_count,
      defaultBranch: repoData.data.default_branch,
      license: repoData.data.license?.name,
    }
  } catch (error) {
    console.error("Error fetching repository details:", error)
    throw new Error("Failed to fetch repository details")
  }
}

// Determine skill badge based on repository analysis
export function determineSkillBadge(repoDetails: any) {
  const { languages, description, topics } = repoDetails

  // Check if it's primarily a frontend project
  const frontendLanguages = ["JavaScript", "TypeScript", "HTML", "CSS", "Vue", "React", "Angular", "Svelte"]
  const isFrontendHeavy = languages.some(
    (lang: { name: string; percentage: number }) => frontendLanguages.includes(lang.name) && lang.percentage > 50,
  )

  // Check if it's primarily a backend project
  const backendLanguages = ["Python", "Java", "Ruby", "PHP", "Go", "Rust", "C#", "C++"]
  const isBackendHeavy = languages.some(
    (lang: { name: string; percentage: number }) => backendLanguages.includes(lang.name) && lang.percentage > 50,
  )

  // Check for DevOps indicators
  const devopsKeywords = ["infrastructure", "pipeline", "ci/cd", "docker", "kubernetes", "terraform"]
  const hasDevopsKeywords =
    description
      ?.toLowerCase()
      .split(" ")
      .some((word: string) => devopsKeywords.includes(word)) ||
    topics?.some((topic: string) => devopsKeywords.includes(topic.toLowerCase()))

  // Check for data science indicators
  const dataScienceKeywords = ["machine learning", "data science", "ai", "tensorflow", "pytorch", "pandas"]
  const hasDataScienceKeywords =
    description
      ?.toLowerCase()
      .split(" ")
      .some((word: string) => dataScienceKeywords.includes(word)) ||
    topics?.some((topic: string) => dataScienceKeywords.includes(topic.toLowerCase()))

  // Determine badge based on analysis
  if (hasDataScienceKeywords) {
    return "Data Scientist"
  } else if (hasDevopsKeywords) {
    return "DevOps Engineer"
  } else if (isFrontendHeavy && isBackendHeavy) {
    return "Full Stack Developer"
  } else if (isFrontendHeavy) {
    return "Frontend Expert"
  } else if (isBackendHeavy) {
    return "Backend Developer"
  } else {
    return "Software Engineer" // Default badge
  }
}
