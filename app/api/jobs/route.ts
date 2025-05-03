import { NextResponse } from "next/server"

// Mock job offers data
const jobOffers = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    company: "TechCorp",
    logo: "/placeholder.svg?height=40&width=40",
    location: "San Francisco, CA (Remote)",
    salary: "$120K - $160K",
    description:
      "We're looking for a Senior Full Stack Developer to join our team and help build innovative web applications. You'll work on challenging projects using the latest technologies.",
    responsibilities: [
      "Design and implement scalable web applications",
      "Work with both frontend and backend technologies",
      "Collaborate with cross-functional teams",
      "Mentor junior developers",
      "Participate in code reviews and technical discussions",
    ],
    requirements: [
      "5+ years of experience in full stack development",
      "Proficiency in React, Node.js, and TypeScript",
      "Experience with cloud platforms (AWS, GCP, or Azure)",
      "Strong problem-solving skills",
      "Excellent communication skills",
    ],
    badges: ["Full Stack", "React", "Node.js"],
    requiredBadges: ["Full Stack Developer"],
    featured: true,
    postedAt: "2023-05-28T10:30:00Z",
    companyDescription:
      "TechCorp is a leading technology company specializing in enterprise software solutions. We're dedicated to creating innovative products that solve real-world problems.",
    applicationUrl: "https://techcorp.com/careers",
    contactEmail: "jobs@techcorp.com",
  },
  {
    id: 2,
    title: "Frontend Engineer",
    company: "DesignLabs",
    logo: "/placeholder.svg?height=40&width=40",
    location: "New York, NY (Hybrid)",
    salary: "$100K - $130K",
    description:
      "Join our team as a Frontend Engineer and help create beautiful, responsive user interfaces. You'll work closely with designers and backend developers to implement pixel-perfect designs.",
    responsibilities: [
      "Implement responsive user interfaces",
      "Collaborate with designers to ensure visual consistency",
      "Optimize applications for maximum performance",
      "Write clean, maintainable code",
      "Participate in user testing and feedback sessions",
    ],
    requirements: [
      "3+ years of experience in frontend development",
      "Strong proficiency in React and TypeScript",
      "Experience with modern CSS frameworks",
      "Knowledge of web performance optimization",
      "Eye for design and attention to detail",
    ],
    badges: ["Frontend", "React", "TypeScript"],
    requiredBadges: ["Frontend Expert"],
    featured: false,
    postedAt: "2023-05-30T14:45:00Z",
    companyDescription:
      "DesignLabs is a design-focused technology company creating beautiful digital experiences. We believe in the power of design to transform how people interact with technology.",
    applicationUrl: "https://designlabs.io/careers",
    contactEmail: "careers@designlabs.io",
  },
  {
    id: 3,
    title: "Blockchain Developer",
    company: "CryptoInnovate",
    logo: "/placeholder.svg?height=40&width=40",
    location: "Remote",
    salary: "$130K - $180K",
    description:
      "We're seeking a talented Blockchain Developer to join our team and help build the future of decentralized applications. You'll work on cutting-edge projects using Solana and other blockchain technologies.",
    responsibilities: [
      "Design and implement smart contracts",
      "Develop decentralized applications (dApps)",
      "Integrate blockchain solutions with existing systems",
      "Stay up-to-date with the latest blockchain technologies",
      "Contribute to technical discussions and architecture decisions",
    ],
    requirements: [
      "3+ years of experience in blockchain development",
      "Proficiency in Rust and JavaScript",
      "Experience with Solana or other blockchain platforms",
      "Understanding of cryptographic principles",
      "Strong problem-solving skills",
    ],
    badges: ["Blockchain", "Solana", "Rust"],
    requiredBadges: ["Blockchain Developer"],
    featured: true,
    postedAt: "2023-05-29T09:15:00Z",
    companyDescription:
      "CryptoInnovate is at the forefront of blockchain innovation, building the infrastructure for the decentralized future. We're passionate about creating technology that empowers individuals and transforms industries.",
    applicationUrl: "https://cryptoinnovate.io/jobs",
    contactEmail: "talent@cryptoinnovate.io",
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const featured = searchParams.get("featured")
  const badge = searchParams.get("badge")

  if (id) {
    // Get job by ID
    const job = jobOffers.find((j) => j.id === Number.parseInt(id))
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }
    return NextResponse.json(job)
  }

  // Filter jobs
  let filteredJobs = [...jobOffers]

  if (featured === "true") {
    filteredJobs = filteredJobs.filter((j) => j.featured)
  }

  if (badge) {
    filteredJobs = filteredJobs.filter(
      (j) =>
        j.badges.some((b) => b.toLowerCase() === badge.toLowerCase()) ||
        j.requiredBadges.some((b) => b.toLowerCase() === badge.toLowerCase()),
    )
  }

  // Sort by featured and then by posted date
  filteredJobs.sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
  })

  return NextResponse.json(filteredJobs)
}

export async function POST(request: Request) {
  try {
    // Check for authorization header
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { jobId, userId, resume, coverLetter, contactEmail } = await request.json()

    // Validate required fields
    if (!jobId || !userId || !contactEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if job exists
    const job = jobOffers.find((j) => j.id === jobId)
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    // Create application
    const application = {
      id: Date.now(),
      jobId,
      userId,
      resume,
      coverLetter,
      contactEmail,
      appliedAt: new Date().toISOString(),
      status: "submitted", // submitted, reviewed, interviewed, offered, rejected
    }

    // In a real app, you would save this to a database

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
