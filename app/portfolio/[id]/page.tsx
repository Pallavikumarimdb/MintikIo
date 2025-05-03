"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  Award,
  Briefcase,
  Code,
  Download,
  FileText,
  Github,
  GraduationCap,
  Mail,
  MapPin,
  Share2,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function PortfolioPage() {
  const params = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [developer, setDeveloper] = useState<any>(null)

  useEffect(() => {
    // Mock API call to fetch developer data
    const fetchDeveloper = async () => {
      try {
        // In a real app, you would fetch data from your API
        // const response = await fetch(`/api/developers/${params.id}`)
        // const data = await response.json()

        // Mock data
        const mockDeveloper = {
          id: params.id,
          name: "John Doe",
          title: "Full Stack Developer",
          avatar: "/placeholder.svg?height=128&width=128",
          location: "San Francisco, CA",
          email: "john.doe@example.com",
          bio: "Full Stack Developer with 5 years of experience building web applications using React, Node.js, and TypeScript. Passionate about creating clean, efficient, and user-friendly applications.",
          skills: ["JavaScript", "React", "Node.js", "TypeScript", "Next.js", "HTML", "CSS", "Git", "AWS"],
          education: [{ id: 1, school: "Stanford University", degree: "BS Computer Science", year: "2018-2022" }],
          experience: [{ id: 1, company: "Tech Corp", position: "Senior Developer", duration: "2022-Present" }],
          badges: [
            { id: 1, name: "Full Stack Developer", date: "April 2023", repo: "next-auth-example" },
            { id: 2, name: "Frontend Expert", date: "January 2023", repo: "react-portfolio" },
            { id: 3, name: "API Developer", date: "March 2023", repo: "api-service" },
          ],
          repositories: [
            {
              id: 1,
              name: "next-auth-example",
              url: "https://github.com/username/next-auth-example",
              description: "An example app with NextAuth.js",
              stars: 45,
              languages: [
                { name: "TypeScript", percentage: 65 },
                { name: "JavaScript", percentage: 25 },
                { name: "CSS", percentage: 10 },
              ],
              skillBadge: "Full Stack Developer",
            },
            {
              id: 2,
              name: "react-portfolio",
              url: "https://github.com/username/react-portfolio",
              description: "My personal portfolio website",
              stars: 12,
              languages: [
                { name: "JavaScript", percentage: 55 },
                { name: "CSS", percentage: 35 },
                { name: "HTML", percentage: 10 },
              ],
              skillBadge: "Frontend Expert",
            },
            {
              id: 3,
              name: "api-service",
              url: "https://github.com/username/api-service",
              description: "RESTful API service built with Node.js",
              stars: 28,
              languages: [
                { name: "JavaScript", percentage: 80 },
                { name: "JSON", percentage: 15 },
                { name: "Markdown", percentage: 5 },
              ],
              skillBadge: "API Developer",
            },
          ],
          leaderboardRank: 14,
          contributions: 247,
          hasResume: true,
        }

        setDeveloper(mockDeveloper)
      } catch (error) {
        console.error("Failed to fetch developer data", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDeveloper()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="container py-10 flex items-center justify-center">
        <div className="h-20 w-20 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    )
  }

  if (!developer) {
    return (
      <div className="container py-10 flex flex-col items-center justify-center">
        <User className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold">Developer Not Found</h1>
        <p className="text-muted-foreground mt-2">The developer profile you're looking for doesn't exist</p>
        <Link href="/" className="mt-6">
          <Button>Return to Home</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex flex-col items-center md:items-start gap-4 md:flex-row">
            <Avatar className="h-24 w-24">
              <AvatarImage src={developer.avatar || "/placeholder.svg"} alt={developer.name} />
              <AvatarFallback>{developer.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{developer.name}</h1>
              <p className="text-xl text-muted-foreground">{developer.title}</p>
              <div className="flex flex-wrap gap-4 mt-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  {developer.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="mr-1 h-4 w-4" />
                  {developer.email}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Award className="mr-1 h-4 w-4" />
                  Rank #{developer.leaderboardRank}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 ml-auto">
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share Profile
            </Button>
            <Button>
              <Mail className="mr-2 h-4 w-4" />
              Contact
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{developer.bio}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {developer.skills.map((skill: string) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {developer.education.map((edu: any) => (
                  <div key={edu.id} className="flex gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{edu.school}</h3>
                      <p className="text-sm text-muted-foreground">{edu.degree}</p>
                      <p className="text-xs text-muted-foreground">{edu.year}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {developer.experience.map((exp: any) => (
                  <div key={exp.id} className="flex gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{exp.company}</h3>
                      <p className="text-sm text-muted-foreground">{exp.position}</p>
                      <p className="text-xs text-muted-foreground">{exp.duration}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <Tabs defaultValue="badges">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="badges">
                  <Award className="mr-2 h-4 w-4" />
                  Skill Badges
                </TabsTrigger>
                <TabsTrigger value="repositories">
                  <Github className="mr-2 h-4 w-4" />
                  Repositories
                </TabsTrigger>
                <TabsTrigger value="resume">
                  <FileText className="mr-2 h-4 w-4" />
                  Resume
                </TabsTrigger>
              </TabsList>

              <TabsContent value="badges" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Skill Badges</CardTitle>
                    <CardDescription>Verified NFT badges earned through code contributions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {developer.badges.map((badge: any) => (
                        <div
                          key={badge.id}
                          className="flex flex-col items-center rounded-lg border border-border/50 p-4"
                        >
                          <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-500 p-1">
                            <div className="flex h-full w-full items-center justify-center rounded-full bg-card">
                              <Code className="h-8 w-8" />
                            </div>
                          </div>
                          <h3 className="text-center font-medium">{badge.name}</h3>
                          <p className="text-center text-xs text-muted-foreground">Minted: {badge.date}</p>
                          <p className="text-center text-xs text-muted-foreground mt-1">From: {badge.repo}</p>
                          <Button variant="outline" size="sm" className="mt-3">
                            <Share2 className="mr-2 h-4 w-4" />
                            View Badge
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="repositories" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>GitHub Repositories</CardTitle>
                    <CardDescription>Public repositories with verified contributions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {developer.repositories.map((repo: any) => (
                      <div key={repo.id} className="rounded-lg border border-border/50 p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div>
                            <h3 className="font-medium">{repo.name}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">{repo.description}</p>
                          </div>
                          <Badge variant="secondary">{repo.skillBadge}</Badge>
                        </div>

                        <div className="mt-3 space-y-2">
                          {repo.languages.map((lang: any) => (
                            <div key={lang.name} className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span>{lang.name}</span>
                                <span>{lang.percentage}%</span>
                              </div>
                              <Progress value={lang.percentage} className="h-1" />
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 flex justify-end">
                          <Button variant="outline" size="sm" asChild>
                            <a href={repo.url} target="_blank" rel="noopener noreferrer">
                              <Github className="mr-2 h-4 w-4" />
                              View on GitHub
                            </a>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resume" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle>Resume</CardTitle>
                        <CardDescription>Professional resume and experience</CardDescription>
                      </div>
                      {developer.hasResume && (
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {developer.hasResume ? (
                      <div className="aspect-[8.5/11] w-full rounded-md border border-border/50 bg-white p-4 shadow-sm">
                        <div className="h-full w-full bg-white">
                          {/* Mock resume preview */}
                          <div className="space-y-6 p-4">
                            <div className="border-b border-gray-200 pb-4 text-center">
                              <h1 className="text-2xl font-bold">{developer.name}</h1>
                              <p className="text-gray-600">{developer.title}</p>
                              <p className="text-sm text-gray-500">
                                {developer.location} • {developer.email}
                              </p>
                            </div>

                            <div>
                              <h2 className="mb-2 text-lg font-semibold text-gray-800">Summary</h2>
                              <p className="text-sm text-gray-600">{developer.bio}</p>
                            </div>

                            <div>
                              <h2 className="mb-2 text-lg font-semibold text-gray-800">Experience</h2>
                              <div className="space-y-3">
                                {developer.experience.map((exp: any) => (
                                  <div key={exp.id}>
                                    <div className="flex justify-between">
                                      <h3 className="font-medium text-gray-800">{exp.position}</h3>
                                      <span className="text-sm text-gray-500">{exp.duration}</span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-600">{exp.company}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h2 className="mb-2 text-lg font-semibold text-gray-800">Education</h2>
                              {developer.education.map((edu: any) => (
                                <div key={edu.id}>
                                  <div className="flex justify-between">
                                    <h3 className="font-medium text-gray-800">{edu.degree}</h3>
                                    <span className="text-sm text-gray-500">{edu.year}</span>
                                  </div>
                                  <p className="text-sm text-gray-600">{edu.school}</p>
                                </div>
                              ))}
                            </div>

                            <div>
                              <h2 className="mb-2 text-lg font-semibold text-gray-800">Skills</h2>
                              <p className="text-sm text-gray-600">{developer.skills.join(", ")}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <FileText className="mb-2 h-12 w-12 text-muted-foreground" />
                        <h3 className="text-lg font-medium">No Resume Available</h3>
                        <p className="text-sm text-muted-foreground">This developer hasn't uploaded their resume yet</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
