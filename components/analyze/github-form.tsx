"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RepoResults } from "@/components/analyze/repo-results"
import { toast } from "@/components/ui/use-toast"
import { useSession } from "next-auth/react"

export function GithubForm() {
  const searchParams = useSearchParams()
  const repoParam = searchParams.get("repo")

  const [repoUrl, setRepoUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<any>(null)

  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (repoParam) {
      setRepoUrl(`https://github.com/username/${repoParam}`)
    }
  }, [repoParam])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!repoUrl) {
      toast({
        title: "Error",
        description: "Please enter a GitHub repository URL",
        variant: "destructive",
      })
      return
    }

    if (!session) {
      toast({
        title: "Login required",
        description: "Please sign in to analyze a repository.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    setIsAnalyzing(true)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken || ""}`,
        },
        body: JSON.stringify({ repoUrl }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze repository")
      }

      const data = await response.json()
      setResults(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze repository. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>GitHub Repository</CardTitle>
          <CardDescription>Enter the URL of your GitHub repository to analyze your contributions</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="repo-url">Repository URL</Label>
              <div className="flex gap-2">
                <Input
                  id="repo-url"
                  placeholder="https://github.com/username/repository"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                />
                <Button type="submit" disabled={isAnalyzing}>
                  {isAnalyzing ? "Analyzing..." : "Analyze"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <Github className="mr-2 h-4 w-4" />
            We only analyze public repositories
          </div>
        </CardFooter>
      </Card>

      {results && <RepoResults results={results} />}
    </div>
  )
}
