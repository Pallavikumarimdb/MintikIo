"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Briefcase, Building2, DollarSign, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock job offers data
const offersData = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    company: "TechCorp",
    logo: "/placeholder.svg?height=40&width=40",
    location: "San Francisco, CA (Remote)",
    salary: "$120K - $160K",
    badges: ["Full Stack", "React", "Node.js"],
    requiredBadges: ["Full Stack Developer"],
    featured: true,
    postedAt: "2023-05-28T10:30:00Z",
  },
  {
    id: 2,
    title: "Frontend Engineer",
    company: "DesignLabs",
    logo: "/placeholder.svg?height=40&width=40",
    location: "New York, NY (Hybrid)",
    salary: "$100K - $130K",
    badges: ["Frontend", "React", "TypeScript"],
    requiredBadges: ["Frontend Expert"],
    featured: false,
    postedAt: "2023-05-30T14:45:00Z",
  },
  {
    id: 3,
    title: "Blockchain Developer",
    company: "CryptoInnovate",
    logo: "/placeholder.svg?height=40&width=40",
    location: "Remote",
    salary: "$130K - $180K",
    badges: ["Blockchain", "Solana", "Rust"],
    requiredBadges: ["Blockchain Developer"],
    featured: true,
    postedAt: "2023-05-29T09:15:00Z",
  },
]

export function HotOffers() {
  const [offers, setOffers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock API call
    const fetchOffers = async () => {
      try {
        // In a real app, you would fetch from an API
        // const response = await fetch('/api/jobs/hot-offers')
        // const data = await response.json()

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1200))

        setOffers(offersData)
      } catch (error) {
        console.error("Failed to fetch hot offers", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOffers()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return "Today"
    } else if (diffDays === 1) {
      return "Yesterday"
    } else {
      return `${diffDays} days ago`
    }
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-9 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {offers.map((offer) => (
        <Card key={offer.id} className={offer.featured ? "border-primary/50 shadow-md" : ""}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={offer.logo || "/placeholder.svg"} alt={offer.company} />
                  <AvatarFallback>{offer.company.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{offer.title}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Building2 className="mr-1 h-3.5 w-3.5" />
                    {offer.company}
                  </div>
                </div>
              </div>
              {offer.featured && (
                <Badge variant="default" className="bg-primary text-primary-foreground">
                  Featured
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center text-sm">
                <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                <span>{offer.location}</span>
              </div>
              <div className="flex items-center text-sm">
                <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                <span>{offer.salary}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {offer.badges.map((badge: string) => (
                <Badge key={badge} variant="outline">
                  {badge}
                </Badge>
              ))}
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Required badges:</p>
              <div className="flex flex-wrap gap-2">
                {offer.requiredBadges.map((badge: string) => (
                  <Badge key={badge} variant="secondary" className="bg-primary/10 text-primary">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Link href={`/jobs/${offer.id}`} className="w-full">
              <Button variant="default" className="w-full">
                <Briefcase className="mr-2 h-4 w-4" />
                Apply Now
              </Button>
            </Link>
            <p className="text-xs text-center text-muted-foreground">Posted {formatDate(offer.postedAt)}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
