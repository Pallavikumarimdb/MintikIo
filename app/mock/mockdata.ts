let profile = {
    name: "John Doe",
    bio: "Full Stack Developer with 5 years of experience",
    location: "San Francisco, CA",
    education: [{ id: 1, school: "Stanford University", degree: "BS Computer Science", year: "2018-2022" }],
    experience: [{ id: 1, company: "Tech Corp", position: "Senior Developer", duration: "2022-Present" }],
    skills: ["JavaScript", "React", "Node.js", "TypeScript", "Next.js"],
    badges: [
      { id: 1, name: "Full Stack Developer", date: "April 2023", shared: false },
      { id: 2, name: "Frontend Expert", date: "January 2023", shared: true },
    ],
  }




  // Mock leaderboard data
const leaderboardData = [
  {
    id: 1,
    name: "Alex Johnson",
    username: "alexj",
    avatar: "/placeholder.svg?height=40&width=40",
    badges: 12,
    stars: 342,
    repos: 28,
    skills: ["Full Stack", "Frontend", "Backend"],
  },
  {
    id: 2,
    name: "Sarah Chen",
    username: "sarahc",
    avatar: "/placeholder.svg?height=40&width=40",
    badges: 9,
    stars: 287,
    repos: 15,
    skills: ["Frontend", "UI/UX", "Mobile"],
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    username: "mrodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    badges: 8,
    stars: 256,
    repos: 22,
    skills: ["Backend", "DevOps", "Database"],
  },
  {
    id: 4,
    name: "Emily Wilson",
    username: "emilyw",
    avatar: "/placeholder.svg?height=40&width=40",
    badges: 7,
    stars: 198,
    repos: 17,
    skills: ["AI/ML", "Data Science", "Python"],
  },
  {
    id: 5,
    name: "David Kim",
    username: "davidk",
    avatar: "/placeholder.svg?height=40&width=40",
    badges: 6,
    stars: 176,
    repos: 14,
    skills: ["Mobile", "React Native", "Flutter"],
  },
]


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

// Mock blinks data
const blinks = [
  {
    id: "a1b2c3d4",
    url: "https://blinks.solana.com/mint/a1b2c3d4?badge=Full%20Stack%20Developer",
    created: "2023-04-15T10:30:00Z",
    badgeId: 1,
    badgeName: "Full Stack Developer",
    clicks: 24,
    mints: 3,
  },
  {
    id: "e5f6g7h8",
    url: "https://blinks.solana.com/mint/e5f6g7h8?badge=Frontend%20Expert",
    created: "2023-01-20T14:45:00Z",
    badgeId: 2,
    badgeName: "Frontend Expert",
    clicks: 42,
    mints: 7,
  },
]