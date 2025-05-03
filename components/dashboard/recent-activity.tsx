import { Award, Github, Share2 } from "lucide-react"

// Mock activity data
const activities = [
  {
    id: 1,
    type: "badge",
    title: "Earned Full Stack Developer Badge",
    description: "You earned a new skill badge for your contributions",
    timestamp: "2 days ago",
    icon: <Award className="h-4 w-4 text-primary" />,
  },
  {
    id: 2,
    type: "repo",
    title: "Analyzed next-auth-example",
    description: "Repository successfully analyzed",
    timestamp: "3 days ago",
    icon: <Github className="h-4 w-4" />,
  },
  {
    id: 3,
    type: "share",
    title: "Shared Frontend Expert Badge",
    description: "Created a Solana Blink for sharing",
    timestamp: "1 week ago",
    icon: <Share2 className="h-4 w-4 text-blue-500" />,
  },
  {
    id: 4,
    type: "badge",
    title: "Earned Frontend Expert Badge",
    description: "You earned a new skill badge for your contributions",
    timestamp: "1 week ago",
    icon: <Award className="h-4 w-4 text-primary" />,
  },
  {
    id: 5,
    type: "repo",
    title: "Analyzed react-portfolio",
    description: "Repository successfully analyzed",
    timestamp: "2 weeks ago",
    icon: <Github className="h-4 w-4" />,
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4 rounded-lg border border-border/50 p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">{activity.icon}</div>
          <div className="flex-1">
            <h4 className="text-sm font-medium">{activity.title}</h4>
            <p className="text-xs text-muted-foreground">{activity.description}</p>
            <p className="mt-1 text-xs text-muted-foreground">{activity.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
