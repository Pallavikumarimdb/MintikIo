"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Award, Code, FileText, Github, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { ResumeViewer } from "@/components/dashboard/resume-viewer"
import { RepositoryList } from "@/components/dashboard/repository-list"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    if (status === "loading") return

    console.log("session", session)

    if (!session) {
      router.push("/login")
    } else {
      setUser(session.user)
      setIsLoading(false)
    }
  }, [session, status, router])


  if (isLoading) {
    return (
      <div className="container py-10 flex items-center justify-center">
        <div className="h-20 w-20 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {user?.name || "Developer"}</h1>
            <p className="text-muted-foreground">Manage your projects, view your badges, and track your progress</p>
          </div>
          <div className="flex gap-2">
            <Link href="/profile">
              <Button variant="outline" size="sm">
                Edit Profile
              </Button>
            </Link>
            <Link href={`/portfolio/${user?.id || "dev"}`}>
              <Button size="sm">View Public Profile</Button>
            </Link>
          </div>
        </div>

        <DashboardStats />

        <Tabs defaultValue="repositories" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="repositories">
              <Github className="mr-2 h-4 w-4" />
              Repositories
            </TabsTrigger>
            <TabsTrigger value="badges">
              <Award className="mr-2 h-4 w-4" />
              Skill Badges
            </TabsTrigger>
            <TabsTrigger value="resume">
              <FileText className="mr-2 h-4 w-4" />
              Resume
            </TabsTrigger>
          </TabsList>

          <TabsContent value="repositories" className="mt-6">
            <RepositoryList />
          </TabsContent>

          <TabsContent value="badges" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Your Skill Badges
                </CardTitle>
                <CardDescription>NFT badges you've earned through your work</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      id: 1,
                      name: "Full Stack Developer",
                      date: "April 2023",
                      shared: false,
                      repo: "next-auth-example",
                    },
                    { id: 2, name: "Frontend Expert", date: "January 2023", shared: true, repo: "react-portfolio" },
                    { id: 3, name: "API Developer", date: "March 2023", shared: false, repo: "api-service" },
                  ].map((badge) => (
                    <div key={badge.id} className="flex flex-col items-center rounded-lg border border-border/50 p-4">
                      <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-500 p-1">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-card">
                          <Code className="h-8 w-8" />
                        </div>
                      </div>
                      <h3 className="text-center font-medium">{badge.name}</h3>
                      <p className="text-center text-xs text-muted-foreground">Minted: {badge.date}</p>
                      <p className="text-center text-xs text-muted-foreground mt-1">From: {badge.repo}</p>
                      <Button variant={badge.shared ? "outline" : "default"} size="sm" className="mt-3">
                        <Share2 className="mr-2 h-4 w-4" />
                        {badge.shared ? "Shared" : "Create Blink"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resume" className="mt-6">
            <ResumeViewer />
          </TabsContent>
        </Tabs>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent actions and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentActivity />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Profile Completion</CardTitle>
              <CardDescription>Complete your profile to increase visibility</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Profile Completion</span>
                  <span>85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Missing Items:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mr-2"></span>
                    Add more work experience
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mr-2"></span>
                    Connect more repositories
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <Link href="/profile">
                  <Button variant="outline" size="sm" className="w-full">
                    Complete Your Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
