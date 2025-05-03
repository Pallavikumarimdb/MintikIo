"use client"

import { useState } from "react"
import { Download, FileText, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export function ResumeViewer() {
  const [hasResume, setHasResume] = useState(true)
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = () => {
    setIsUploading(true)

    // Mock upload process
    setTimeout(() => {
      setHasResume(true)
      setIsUploading(false)
      toast({
        title: "Resume Uploaded",
        description: "Your resume has been uploaded successfully",
      })
    }, 2000)
  }

  if (!hasResume) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Resume
          </CardTitle>
          <CardDescription>Upload your resume to showcase your skills and experience</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <FileText className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-medium">No Resume Uploaded</h3>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Upload your resume to make it easier for recruiters to find you
          </p>
          <div className="mt-6">
            <Button onClick={handleUpload} disabled={isUploading}>
              <Upload className="mr-2 h-4 w-4" />
              {isUploading ? "Uploading..." : "Upload Resume"}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Resume
            </CardTitle>
            <CardDescription>Your uploaded resume and extracted information</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button size="sm" onClick={handleUpload} disabled={isUploading}>
              <Upload className="mr-2 h-4 w-4" />
              {isUploading ? "Uploading..." : "Update"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="preview">
          <TabsList className="mb-4">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="extracted">Extracted Data</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="space-y-4">
            <div className="aspect-[8.5/11] w-full rounded-md border border-border/50 bg-white p-4 shadow-sm">
              <div className="h-full w-full bg-white">
                {/* Mock resume preview */}
                <div className="space-y-6 p-4">
                  <div className="border-b border-gray-200 pb-4 text-center">
                    <h1 className="text-2xl font-bold">John Doe</h1>
                    <p className="text-gray-600">Full Stack Developer</p>
                    <p className="text-sm text-gray-500">San Francisco, CA • john.doe@example.com • (555) 123-4567</p>
                  </div>

                  <div>
                    <h2 className="mb-2 text-lg font-semibold text-gray-800">Summary</h2>
                    <p className="text-sm text-gray-600">
                      Full Stack Developer with 5 years of experience building web applications using React, Node.js,
                      and TypeScript. Passionate about creating clean, efficient, and user-friendly applications.
                    </p>
                  </div>

                  <div>
                    <h2 className="mb-2 text-lg font-semibold text-gray-800">Experience</h2>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="font-medium text-gray-800">Senior Developer</h3>
                          <span className="text-sm text-gray-500">2022-Present</span>
                        </div>
                        <p className="text-sm font-medium text-gray-600">Tech Corp</p>
                        <ul className="mt-1 list-disc pl-5 text-xs text-gray-600">
                          <li>Led development of a React-based dashboard application</li>
                          <li>Implemented CI/CD pipelines using GitHub Actions</li>
                          <li>Mentored junior developers and conducted code reviews</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="mb-2 text-lg font-semibold text-gray-800">Education</h2>
                    <div>
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-800">BS Computer Science</h3>
                        <span className="text-sm text-gray-500">2018-2022</span>
                      </div>
                      <p className="text-sm text-gray-600">Stanford University</p>
                    </div>
                  </div>

                  <div>
                    <h2 className="mb-2 text-lg font-semibold text-gray-800">Skills</h2>
                    <p className="text-sm text-gray-600">
                      JavaScript, React, Node.js, TypeScript, Next.js, HTML, CSS, Git, AWS
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="extracted" className="space-y-6">
            <div className="rounded-md border border-border/50 p-4">
              <h3 className="mb-2 font-medium">Contact Information</h3>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium">Name</p>
                  <p className="text-sm text-muted-foreground">John Doe</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">(555) 123-4567</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">San Francisco, CA</p>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-border/50 p-4">
              <h3 className="mb-2 font-medium">Work Experience</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">Senior Developer</p>
                    <p className="text-sm text-muted-foreground">2022-Present</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Tech Corp</p>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-border/50 p-4">
              <h3 className="mb-2 font-medium">Education</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">BS Computer Science</p>
                    <p className="text-sm text-muted-foreground">2018-2022</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Stanford University</p>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-border/50 p-4">
              <h3 className="mb-2 font-medium">Skills</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">JavaScript</Badge>
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">Node.js</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="secondary">Next.js</Badge>
                <Badge variant="secondary">HTML</Badge>
                <Badge variant="secondary">CSS</Badge>
                <Badge variant="secondary">Git</Badge>
                <Badge variant="secondary">AWS</Badge>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <span>Last updated: April 15, 2023</span>
        <span>PDF • 2 pages • 245KB</span>
      </CardFooter>
    </Card>
  )
}
