"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Award, ExternalLink, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// This is a redirect page for Solana Blinks
export default function BlinkRedirectPage() {
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlinkData = async () => {
      try {
        // In a real app, you would fetch blink data from an API
        // const response = await fetch(`/api/blinks/${params.id}`)
        // if (!response.ok) throw new Error("Blink not found")
        // const data = await response.json()

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Record the blink view
        // await fetch(`/api/blinks/${params.id}`, {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ action: "view" }),
        // })

        // Redirect to the badge page
        router.push(`/badge/${params.id}`)
      } catch (error) {
        console.error("Error fetching blink data:", error)
        setError("The blink you're looking for doesn't exist or has expired.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlinkData()
  }, [params.id, router])

  if (error) {
    return (
      <div className="container flex h-[calc(100vh-4rem)] items-center justify-center">
        <Card className="mx-auto w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Blink Not Found</CardTitle>
            <CardDescription className="text-center">
              The blink you're looking for doesn't exist or has expired.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Info className="h-16 w-16 text-muted-foreground" />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/">
              <Button>Return to Home</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container flex h-[calc(100vh-4rem)] items-center justify-center">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Redirecting to Badge</CardTitle>
          <CardDescription className="text-center">
            You're being redirected to view the skill badge details
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-12 rounded-full mx-auto" />
              <Skeleton className="h-4 w-3/4 mx-auto" />
              <Skeleton className="h-4 w-1/2 mx-auto" />
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Award className="h-16 w-16 text-primary animate-pulse" />
              <p className="mt-4 text-center text-muted-foreground">
                Please wait while we redirect you to the badge details page...
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href={`/badge/${params.id}`}>
            <Button variant="outline" className="gap-2">
              Go to Badge Now
              <ExternalLink className="h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
