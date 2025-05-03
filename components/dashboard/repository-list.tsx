"use client"

import { useState } from "react"
import Link from "next/link"
import { AlertCircle, Github, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Mock repository data
const initialRepos = [
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
    analyzed: true,
    skillBadge: "Full Stack Developer",
    addedAt: "2023-04-15T10:30:00Z",
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
    analyzed: true,
    skillBadge: "Frontend Expert",
    addedAt: "2023-01-20T14:45:00Z",
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
    analyzed: true,
    skillBadge: "API Developer",
    addedAt: "2023-03-10T09:15:00Z",
  },
  {
    id: 4,
    name: "data-visualization",
    url: "https://github.com/username/data-visualization",
    description: "Data visualization project using D3.js",
    stars: 8,
    languages: [
      { name: "JavaScript", percentage: 70 },
      { name: "HTML", percentage: 20 },
      { name: "CSS", percentage: 10 },
    ],
    analyzed: false,
    addedAt: "2023-05-05T16:20:00Z",
  },
]

export function RepositoryList() {
  const [repos, setRepos] = useState(initialRepos)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [newRepoUrl, setNewRepoUrl] = useState("")
  const [repoToDelete, setRepoToDelete] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"date" | "name" | "stars">("date")

  // Filter and sort repositories
  const filteredRepos = repos
    .filter(
      (repo) =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        repo.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name)
      } else if (sortBy === "stars") {
        return (b.stars || 0) - (a.stars || 0)
      }
      return 0
    })

  const handleAddRepo = () => {
    if (!newRepoUrl) {
      toast({
        title: "Error",
        description: "Please enter a repository URL",
        variant: "destructive",
      })
      return
    }

    // Extract repo name from URL
    const repoName = newRepoUrl.split("/").pop() || ""

    // Check if repo already exists
    if (repos.some((repo) => repo.name.toLowerCase() === repoName.toLowerCase())) {
      toast({
        title: "Error",
        description: "This repository has already been added",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Mock API call
    setTimeout(() => {
      const newRepo = {
        id: Date.now(),
        name: repoName,
        url: newRepoUrl,
        description: `Repository ${repoName}`,
        stars: Math.floor(Math.random() * 50),
        languages: [
          { name: "JavaScript", percentage: Math.floor(Math.random() * 60) + 20 },
          { name: "TypeScript", percentage: Math.floor(Math.random() * 40) + 10 },
          { name: "CSS", percentage: Math.floor(Math.random() * 30) },
        ],
        analyzed: false,
        addedAt: new Date().toISOString(),
      }

      setRepos([newRepo, ...repos])
      setNewRepoUrl("")
      setShowAddDialog(false)
      setIsLoading(false)

      toast({
        title: "Repository Added",
        description: "Your repository has been added successfully",
      })
    }, 1500)
  }

  const handleDeleteRepo = () => {
    if (repoToDelete === null) return

    setRepos(repos.filter((repo) => repo.id !== repoToDelete))
    setRepoToDelete(null)
    setShowDeleteDialog(false)

    toast({
      title: "Repository Removed",
      description: "The repository has been removed from your profile",
    })
  }

  const confirmDelete = (id: number) => {
    setRepoToDelete(id)
    setShowDeleteDialog(true)
  }

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'full stack developer':
        return 'bg-badge-frontend';
      case 'backend':
        return 'bg-badge-backend';
      case 'fullstack':
        return 'bg-badge-fullstack';
      case 'frontend expert':
        return 'bg-badge-devops';
      case 'mobile':
        return 'bg-badge-mobile';
      default:
        return 'bg-badge-default';
    }
  };


  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Github className="h-5 w-5" />
                Your Repositories
              </CardTitle>
              <CardDescription>Manage your GitHub repositories and their analysis status</CardDescription>
            </div>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Repository
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="relative w-full md:w-64">
              <Input
                placeholder="Search repositories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
              <Github className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <div className="flex gap-4">
                <Button variant={sortBy === "date" ? "default" : "ghost"} size="sm" onClick={() => setSortBy("date")}>
                  Newest
                </Button>
                <Button variant={sortBy === "name" ? "default" : "ghost"} size="sm" onClick={() => setSortBy("name")}>
                  Name
                </Button>
                <Button variant={sortBy === "stars" ? "default" : "ghost"} size="sm" onClick={() => setSortBy("stars")}>
                  Stars
                </Button>
              </div>
            </div>
          </div>

          {filteredRepos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Github className="mb-2 h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-medium">No repositories found</h3>
              <p className="text-sm text-muted-foreground">
                {searchTerm ? "Try a different search term" : "Add your first repository to get started"}
              </p>
              {!searchTerm && (
                <Button onClick={() => setShowAddDialog(true)} className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Repository
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRepos.map((repo) => (
                <div key={repo.id} className="rounded-lg border border-border/50 p-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{repo.name}</h3>
                      {repo.analyzed ? (
                        <Badge variant="outline" className="bg-green-500/10 text-green-500">
                          Analyzed
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
                          Not Analyzed
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {repo.analyzed ? (
                        <Badge
                          variant="secondary"
                          className={` rounded-full`}
                        >
                          <span className={`w-2 h-2 mr-2 rounded-full ${getBadgeColor(repo.skillBadge!.toLowerCase())}`}></span>
                          {repo.skillBadge}
                        </Badge>
                      ) : (
                        <Link href={`/analyze?repo=${repo.url}`}>
                          <Button size="sm" variant="outline">
                            Analyze Now
                          </Button>
                        </Link>
                      )}

                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => confirmDelete(repo.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">{repo.description}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Added {new Date(repo.addedAt).toLocaleDateString()}
                  </p>

                  {repo.analyzed && (
                    <>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {repo.languages.map((language, i) => (
                          <div key={language.name} className="space-y-1">
                            {/* <div className="flex justify-between text-sm">
                             <span>{language.name}</span>
                             <span>{language.percentage}%</span>
                           </div>
                           <Progress value={language.percentage} className="h-2" /> */}
                            <Badge key={i} variant="outline" className="flex gap-2 items-center">
                              <span className={`w-2 h-2 bg-[#7b3aec] shadow-[0_0_10px_rgba(123,58,236,0.8)] rounded-full`}></span>
                              <span>{language.name}</span>
                              <span>{language.percentage}%</span>
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Repository Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Repository</DialogTitle>
            <DialogDescription>Enter the URL of your GitHub repository to add it to your profile</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="repo-url">Repository URL</Label>
              <Input
                id="repo-url"
                placeholder="https://github.com/username/repository"
                value={newRepoUrl}
                onChange={(e) => setNewRepoUrl(e.target.value)}
              />
            </div>
            <div className="flex items-center rounded-md bg-muted p-3 text-sm">
              <AlertCircle className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-muted-foreground">Only public repositories can be analyzed for skill badges</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddRepo} disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Repository"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the repository from your profile. Any associated badges will remain in your collection.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteRepo} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
