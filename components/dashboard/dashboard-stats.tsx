import { Award, Code, Github, Users } from "lucide-react"

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="flex items-center gap-4 rounded-lg border border-border/50 p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Award className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Badges</p>
          <h3 className="text-2xl font-bold">2</h3>
        </div>
      </div>
      <div className="flex items-center gap-4 rounded-lg border border-border/50 p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Github className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Repositories</p>
          <h3 className="text-2xl font-bold">5</h3>
        </div>
      </div>
      <div className="flex items-center gap-4 rounded-lg border border-border/50 p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Code className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Contributions</p>
          <h3 className="text-2xl font-bold">247</h3>
        </div>
      </div>
      <div className="flex items-center gap-4 rounded-lg border border-border/50 p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Users className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Leaderboard Rank</p>
          <h3 className="text-2xl font-bold">#14</h3>
        </div>
      </div>
    </div>
  )
}
