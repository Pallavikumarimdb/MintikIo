import { ExternalLink, Github, Award } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface BadgeDetailsProps {
  badge: any
}

export function BadgeDetails({ badge }: BadgeDetailsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Badge Overview</h3>
        <p className="mt-1 text-muted-foreground">{badge.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border/50 p-4">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <h4 className="font-medium">Badge Details</h4>
          </div>
          <div className="mt-2 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Name:</span>
              <span className="font-medium">{badge.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Minted:</span>
              <span>{formatDate(badge.mintedAt)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Earned:</span>
              <span>{badge.stats.totalEarned} developers</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border/50 p-4">
          <div className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            <h4 className="font-medium">Repository Info</h4>
          </div>
          <div className="mt-2 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Repository:</span>
              <a
                href={badge.repository.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-primary hover:underline"
              >
                {badge.repository.name}
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Avg. Contributions:</span>
              <span>{badge.stats.averageContributions}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Avg. Stars:</span>
              <span>{badge.stats.averageRepoStars}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-medium">What This Badge Represents</h3>
        <p className="mt-1 text-muted-foreground">
          The {badge.name} badge recognizes developers who have demonstrated significant expertise in both frontend and
          backend technologies. It's awarded based on analysis of GitHub repositories that show a comprehensive
          understanding of full-stack development principles and practices.
        </p>
        <p className="mt-2 text-muted-foreground">
          This badge is a verifiable credential that showcases your ability to work across the entire development stack,
          making you valuable to teams looking for versatile developers.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge variant="outline">Full Stack</Badge>
        <Badge variant="outline">Web Development</Badge>
        <Badge variant="outline">Frontend</Badge>
        <Badge variant="outline">Backend</Badge>
        <Badge variant="outline">GitHub</Badge>
      </div>
    </div>
  )
}
