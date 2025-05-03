import { Leaderboard } from "@/components/leaderboard/leaderboard"

export default function LeaderboardPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Developer Leaderboard</h1>
          <p className="text-muted-foreground">Top developers ranked by their contributions and skill badges</p>
        </div>
        <Leaderboard />
      </div>
    </div>
  )
}
