"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Briefcase, GraduationCap, Plus, Share2, Trash2, Upload, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function ProfileForm() {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showBlinkDialog, setShowBlinkDialog] = useState(false)
  const [selectedBadge, setSelectedBadge] = useState<any>(null)
  const [blinkUrl, setBlinkUrl] = useState("")

  // Personal Info
  const [name, setName] = useState("John Doe")
  const [bio, setBio] = useState("Full Stack Developer with 5 years of experience")
  const [location, setLocation] = useState("San Francisco, CA")

  // Education
  const [education, setEducation] = useState([
    { id: 1, school: "Stanford University", degree: "BS Computer Science", year: "2018-2022" },
  ])
  const [newSchool, setNewSchool] = useState("")
  const [newDegree, setNewDegree] = useState("")
  const [newYear, setNewYear] = useState("")

  // Experience
  const [experience, setExperience] = useState([
    { id: 1, company: "Tech Corp", position: "Senior Developer", duration: "2022-Present" },
  ])
  const [newCompany, setNewCompany] = useState("")
  const [newPosition, setNewPosition] = useState("")
  const [newDuration, setNewDuration] = useState("")

  // Skills
  const [skills, setSkills] = useState(["JavaScript", "React", "Node.js", "TypeScript", "Next.js"])
  const [newSkill, setNewSkill] = useState("")

  // NFT Badges
  const [badges, setBadges] = useState([
    { id: 1, name: "Full Stack Developer", date: "April 2023", shared: false },
    { id: 2, name: "Frontend Expert", date: "January 2023", shared: true },
  ])

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/login")
      return
    }

    setIsLoggedIn(true)

    // Load profile data from API
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })

        if (response.ok) {
          const data = await response.json()

          // Update state with fetched data
          if (data.name) setName(data.name)
          if (data.bio) setBio(data.bio)
          if (data.location) setLocation(data.location)
          if (data.education) setEducation(data.education)
          if (data.experience) setExperience(data.experience)
          if (data.skills) setSkills(data.skills)
          if (data.badges) setBadges(data.badges)
        }
      } catch (error) {
        console.error("Failed to fetch profile data", error)
      }
    }

    fetchProfile()
  }, [router])

  const addEducation = () => {
    if (!newSchool || !newDegree || !newYear) {
      toast({
        title: "Error",
        description: "Please fill in all education fields",
        variant: "destructive",
      })
      return
    }

    setEducation([...education, { id: Date.now(), school: newSchool, degree: newDegree, year: newYear }])

    setNewSchool("")
    setNewDegree("")
    setNewYear("")
  }

  const removeEducation = (id: number) => {
    setEducation(education.filter((item) => item.id !== id))
  }

  const addExperience = () => {
    if (!newCompany || !newPosition || !newDuration) {
      toast({
        title: "Error",
        description: "Please fill in all experience fields",
        variant: "destructive",
      })
      return
    }

    setExperience([
      ...experience,
      { id: Date.now(), company: newCompany, position: newPosition, duration: newDuration },
    ])

    setNewCompany("")
    setNewPosition("")
    setNewDuration("")
  }

  const removeExperience = (id: number) => {
    setExperience(experience.filter((item) => item.id !== id))
  }

  const addSkill = () => {
    if (!newSkill) return
    if (skills.includes(newSkill)) {
      toast({
        title: "Error",
        description: "This skill already exists",
        variant: "destructive",
      })
      return
    }

    setSkills([...skills, newSkill])
    setNewSkill("")
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const handleSave = async () => {
    setIsSaving(true)

    try {
      // Mock API call
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name,
          bio,
          location,
          education,
          experience,
          skills,
          badges,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update profile")
      }

      toast({
        title: "Success",
        description: "Your profile has been updated",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleCreateBlink = (badge: any) => {
    setSelectedBadge(badge)

    // Generate a mock Solana Blink URL
    const mockBlinkId = Math.random().toString(36).substring(2, 10)
    const url = `https://blinks.solana.com/mint/${mockBlinkId}?badge=${encodeURIComponent(badge.name)}`
    setBlinkUrl(url)

    setShowBlinkDialog(true)

    // Mark the badge as shared
    setBadges(badges.map((b) => (b.id === badge.id ? { ...b, shared: true } : b)))
  }

  const copyBlinkToClipboard = () => {
    navigator.clipboard.writeText(blinkUrl).then(() => {
      toast({
        title: "Copied to Clipboard",
        description: "Solana Blink URL has been copied to your clipboard",
      })
    })
  }

  if (!isLoggedIn) {
    return null
  }

  return (
    <>
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="skills">Skills & Badges</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and public profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="resume">Resume</Label>
                <div className="flex items-center gap-2">
                  <Input id="resume" type="file" className="hidden" />
                  <Button variant="outline" className="w-full" asChild>
                    <label htmlFor="resume" className="flex cursor-pointer items-center justify-center gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Resume (PDF)
                    </label>
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isSaving} className="ml-auto">
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
              <CardDescription>Add your educational background and qualifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="flex items-start justify-between rounded-lg border border-border/50 p-4">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{edu.school}</h3>
                      <p className="text-sm text-muted-foreground">{edu.degree}</p>
                      <p className="text-xs text-muted-foreground">{edu.year}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeEducation(edu.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Add New Education</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="school">School/University</Label>
                    <Input
                      id="school"
                      value={newSchool}
                      onChange={(e) => setNewSchool(e.target.value)}
                      placeholder="Harvard University"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="degree">Degree</Label>
                    <Input
                      id="degree"
                      value={newDegree}
                      onChange={(e) => setNewDegree(e.target.value)}
                      placeholder="BS Computer Science"
                    />
                  </div>
                </div>
                <div className="flex items-end gap-4">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="year">Years</Label>
                    <Input
                      id="year"
                      value={newYear}
                      onChange={(e) => setNewYear(e.target.value)}
                      placeholder="2018-2022"
                    />
                  </div>
                  <Button onClick={addEducation}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isSaving} className="ml-auto">
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Work Experience</CardTitle>
              <CardDescription>Add your professional experience and work history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="flex items-start justify-between rounded-lg border border-border/50 p-4">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{exp.company}</h3>
                      <p className="text-sm text-muted-foreground">{exp.position}</p>
                      <p className="text-xs text-muted-foreground">{exp.duration}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeExperience(exp.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Add New Experience</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={newCompany}
                      onChange={(e) => setNewCompany(e.target.value)}
                      placeholder="Google"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      value={newPosition}
                      onChange={(e) => setNewPosition(e.target.value)}
                      placeholder="Senior Developer"
                    />
                  </div>
                </div>
                <div className="flex items-end gap-4">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={newDuration}
                      onChange={(e) => setNewDuration(e.target.value)}
                      placeholder="2020-Present"
                    />
                  </div>
                  <Button onClick={addExperience}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isSaving} className="ml-auto">
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Skills & Badges</CardTitle>
              <CardDescription>Manage your skills and view your earned NFT badges</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                      {skill}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 p-0"
                        onClick={() => removeSkill(skill)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex items-end gap-4">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="skill">Add Skill</Label>
                    <Input
                      id="skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Python"
                    />
                  </div>
                  <Button onClick={addSkill}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">NFT Badges</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {badges.map((badge) => (
                    <div key={badge.id} className="flex flex-col items-center rounded-lg border border-border/50 p-4">
                      <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-500 p-1">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-card">
                          <Code className="h-8 w-8" />
                        </div>
                      </div>
                      <h3 className="text-center font-medium">{badge.name}</h3>
                      <p className="text-center text-xs text-muted-foreground">Minted: {badge.date}</p>
                      <Button
                        variant={badge.shared ? "outline" : "default"}
                        size="sm"
                        className="mt-2"
                        onClick={() => handleCreateBlink(badge)}
                      >
                        <Share2 className="mr-2 h-4 w-4" />
                        {badge.shared ? "Shared" : "Create Blink"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isSaving} className="ml-auto">
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showBlinkDialog} onOpenChange={setShowBlinkDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Your NFT Badge</DialogTitle>
            <DialogDescription>
              Use this Solana Blink to share your NFT badge on social media platforms like Twitter
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Share2 className="h-10 w-10 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">{selectedBadge?.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Share this link on social media to let others mint your NFT badge
                </p>
              </div>
              <div className="w-full">
                <div className="flex items-center gap-2 rounded-md border border-border/50 bg-muted p-2">
                  <code className="flex-1 overflow-x-auto text-xs">{blinkUrl}</code>
                  <Button variant="ghost" size="sm" onClick={copyBlinkToClipboard}>
                    Copy
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button onClick={() => setShowBlinkDialog(false)}>Close</Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open(
                      "https://twitter.com/intent/tweet?text=" +
                        encodeURIComponent(
                          `I just earned a ${selectedBadge?.name} badge on GitProof! Mint your own with this Solana Blink: ${blinkUrl}`,
                        ),
                    )
                  }
                >
                  Share on Twitter
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
