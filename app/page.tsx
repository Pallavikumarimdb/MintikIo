import Link from "next/link"
import { ArrowRight, Award, Code, Github, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TopDevelopers } from "@/components/home/top-developers"
import { UpcomingChallenges } from "@/components/home/upcoming-challenges"
import { HotOffers } from "@/components/home/hot-offers"

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-background/80">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm">
                <span className="mr-2 rounded-md bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">New</span>
                <span className="text-muted-foreground">Introducing Solana Blinks for sharing badges</span>
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Turn Your Code Into Verified Skill Badges
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Mint your Proof of Work NFT by submitting your GitHub project. Get recognized for your coding skills
                  with verifiable on-chain credentials.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/analyze">
                  <Button size="lg" className="gap-2">
                    <Github className="h-5 w-5" />
                    Analyze Your Repo
                  </Button>
                </Link>
                <Link href="/leaderboard">
                  <Button size="lg" variant="outline" className="gap-2">
                    View Leaderboard
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[350px] w-[350px] md:h-[450px] md:w-[450px]">
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-purple-500 opacity-20 blur-3xl"></div>
                <div className="relative flex h-full w-full items-center justify-center rounded-xl border border-border/50 bg-background/50 p-4 backdrop-blur-sm">
                  <div className="grid gap-4 md:gap-8">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Code className="h-4 w-4" />
                        <span>Skill Badge NFT</span>
                      </div>
                      <div className="rounded-lg border border-border/50 bg-card p-4 shadow-sm">
                        <div className="aspect-square w-full rounded-md bg-gradient-to-br from-violet-500 to-purple-500 p-1">
                          <div className="flex h-full w-full flex-col items-center justify-center rounded bg-card p-4">
                            <Code className="h-16 w-16 mb-2" />
                            <h3 className="text-xl font-bold">Full Stack Developer</h3>
                            <p className="text-sm text-muted-foreground text-center mt-2">
                              Verified on-chain proof of coding skills
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform analyzes your GitHub repositories and mints NFT badges that verify your coding skills
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 md:gap-8">
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-border/50 bg-background p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Github className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Submit Repository</h3>
              <p className="text-center text-muted-foreground">
                Paste your GitHub repository URL to start the analysis process
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-border/50 bg-background p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Analyze Code</h3>
              <p className="text-center text-muted-foreground">
                Our system analyzes your contributions, languages, and coding patterns
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-border/50 bg-background p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Mint NFT Badge</h3>
              <p className="text-center text-muted-foreground">
                Receive a unique skill badge NFT on Solana that verifies your abilities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Developers Section */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none border-transparent bg-primary text-primary-foreground">
                Featured Developers
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Meet Our Top Developers</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                These developers have earned the most badges and recognition for their contributions
              </p>
            </div>
          </div>
          <TopDevelopers />
          <div className="flex justify-center mt-10">
            <Link href="/leaderboard">
              <Button variant="outline" size="lg" className="gap-2">
                View Full Leaderboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Challenges Section */}
      <section className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none border-transparent bg-primary text-primary-foreground">
                Earn More Badges
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Upcoming Challenges</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Participate in coding challenges to earn exclusive skill badges and recognition
              </p>
            </div>
          </div>
          <UpcomingChallenges />
          <div className="flex justify-center mt-10">
            <Link href="/challenges">
              <Button variant="outline" size="lg" className="gap-2">
                View All Challenges
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Hot Job Offers Section */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none border-transparent bg-primary text-primary-foreground">
                Career Opportunities
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Hot Job Offers</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Companies looking for developers with verified skill badges
              </p>
            </div>
          </div>
          <HotOffers />
          <div className="flex justify-center mt-10">
            <Link href="/jobs">
              <Button variant="outline" size="lg" className="gap-2">
                Browse All Jobs
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of developers showcasing their skills with verifiable badges
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="gap-2">
                  Create Account
                </Button>
              </Link>
              <Link href="/analyze">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Award className="h-5 w-5" />
                  Get Your First Badge
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
