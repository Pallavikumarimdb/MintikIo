import { NextResponse } from "next/server"

// Mock challenges data
const challenges = [
  {
    id: 1,
    title: "AI Chatbot Challenge",
    description: "Build an AI-powered chatbot using any framework of your choice",
    longDescription:
      "Create an intelligent chatbot that can understand natural language, respond appropriately, and learn from interactions. Your chatbot should be able to handle basic conversations, answer questions, and provide helpful responses.",
    startDate: "2023-06-15T00:00:00Z",
    endDate: "2023-06-30T23:59:59Z",
    badgeName: "AI Developer",
    badgeDescription: "Awarded to developers who demonstrate proficiency in AI and natural language processing",
    difficulty: "Intermediate",
    participants: 128,
    category: "AI/ML",
    requirements: [
      "Chatbot must understand and respond to natural language",
      "Must handle at least 5 different conversation topics",
      "Include a web interface for interaction",
      "Document your approach and technologies used",
    ],
    prizes: ["AI Developer NFT Badge", "Featured profile on leaderboard", "Access to exclusive AI workshops"],
  },
  {
    id: 2,
    title: "Web3 dApp Hackathon",
    description: "Create a decentralized application on Solana blockchain",
    longDescription:
      "Design and implement a decentralized application (dApp) on the Solana blockchain. Your dApp should solve a real-world problem and demonstrate the advantages of blockchain technology. Focus on creating a user-friendly interface that abstracts away the complexity of blockchain interactions.",
    startDate: "2023-07-01T00:00:00Z",
    endDate: "2023-07-15T23:59:59Z",
    badgeName: "Blockchain Developer",
    badgeDescription: "Awarded to developers who demonstrate expertise in blockchain technology and dApp development",
    difficulty: "Advanced",
    participants: 86,
    category: "Blockchain",
    requirements: [
      "Must be built on Solana blockchain",
      "Include wallet integration",
      "Implement at least one smart contract",
      "Provide a user-friendly interface",
      "Include comprehensive documentation",
    ],
    prizes: ["Blockchain Developer NFT Badge", "500 SOL in prizes", "Opportunity to pitch to blockchain investors"],
  },
  {
    id: 3,
    title: "Responsive UI Challenge",
    description: "Design and implement a responsive UI for a given wireframe",
    longDescription:
      "Transform provided wireframes into a fully responsive user interface that works flawlessly across all device sizes. Your implementation should focus on accessibility, performance, and visual fidelity to the design. Use modern CSS techniques and demonstrate your understanding of responsive design principles.",
    startDate: "2023-06-10T00:00:00Z",
    endDate: "2023-06-20T23:59:59Z",
    badgeName: "UI Expert",
    badgeDescription:
      "Awarded to developers who demonstrate excellence in creating responsive and accessible user interfaces",
    difficulty: "Beginner",
    participants: 215,
    category: "Frontend",
    requirements: [
      "Implement the provided wireframe with pixel-perfect accuracy",
      "Ensure responsiveness across mobile, tablet, and desktop",
      "Meet WCAG 2.1 AA accessibility standards",
      "Optimize for performance (90+ Lighthouse score)",
    ],
    prizes: ["UI Expert NFT Badge", "Featured in our showcase gallery", "1-year subscription to design tools"],
  },
]

// Mock user challenge submissions
const submissions = new Map<number, any[]>()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const category = searchParams.get("category")
  const status = searchParams.get("status")

  if (id) {
    // Get challenge by ID
    const challenge = challenges.find((c) => c.id === Number.parseInt(id))
    if (!challenge) {
      return NextResponse.json({ error: "Challenge not found" }, { status: 404 })
    }
    return NextResponse.json(challenge)
  }

  // Filter challenges
  let filteredChallenges = [...challenges]

  if (category) {
    filteredChallenges = filteredChallenges.filter((c) => c.category.toLowerCase() === category.toLowerCase())
  }

  if (status) {
    const now = new Date()
    if (status === "active") {
      filteredChallenges = filteredChallenges.filter((c) => {
        const startDate = new Date(c.startDate)
        const endDate = new Date(c.endDate)
        return startDate <= now && endDate >= now
      })
    } else if (status === "upcoming") {
      filteredChallenges = filteredChallenges.filter((c) => {
        const startDate = new Date(c.startDate)
        return startDate > now
      })
    } else if (status === "past") {
      filteredChallenges = filteredChallenges.filter((c) => {
        const endDate = new Date(c.endDate)
        return endDate < now
      })
    }
  }

  return NextResponse.json(filteredChallenges)
}

export async function POST(request: Request) {
  try {
    // Check for authorization header
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { challengeId, userId, repositoryUrl, description } = await request.json()

    // Validate required fields
    if (!challengeId || !userId || !repositoryUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if challenge exists
    const challenge = challenges.find((c) => c.id === challengeId)
    if (!challenge) {
      return NextResponse.json({ error: "Challenge not found" }, { status: 404 })
    }

    // Check if challenge is active
    const now = new Date()
    const startDate = new Date(challenge.startDate)
    const endDate = new Date(challenge.endDate)

    if (now < startDate) {
      return NextResponse.json({ error: "Challenge has not started yet" }, { status: 400 })
    }

    if (now > endDate) {
      return NextResponse.json({ error: "Challenge has ended" }, { status: 400 })
    }

    // Get existing submissions for this challenge
    const challengeSubmissions = submissions.get(challengeId) || []

    // Check if user already submitted
    const existingSubmission = challengeSubmissions.find((s) => s.userId === userId)
    if (existingSubmission) {
      return NextResponse.json({ error: "You have already submitted to this challenge" }, { status: 400 })
    }

    // Create new submission
    const submission = {
      id: Date.now(),
      challengeId,
      userId,
      repositoryUrl,
      description,
      submittedAt: new Date().toISOString(),
      status: "pending", // pending, approved, rejected
    }

    // Add submission
    challengeSubmissions.push(submission)
    submissions.set(challengeId, challengeSubmissions)

    return NextResponse.json({
      success: true,
      submission,
    })
  } catch (error) {
    console.error("Error submitting to challenge:", error)
    return NextResponse.json({ error: "Failed to submit to challenge" }, { status: 500 })
  }
}
