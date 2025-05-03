import { Check, Code, Github, Server, Database, Cloud } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface BadgeRequirementsProps {
  badge: any
}

export function BadgeRequirements({ badge }: BadgeRequirementsProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">How to Earn This Badge</h3>
        <p className="mt-1 text-muted-foreground">
          The {badge.name} badge is awarded to developers who demonstrate expertise across multiple areas of software
          development. Here's what we look for:
        </p>
      </div>

      <div className="space-y-3">
        {badge.requirements.map((requirement: string, index: number) => (
          <div key={index} className="flex items-start gap-3 rounded-lg border border-border/50 p-3">
            <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">{requirement}</p>
            </div>
          </div>
        ))}
      </div>

      <Alert className="mt-6">
        <Github className="h-4 w-4" />
        <AlertTitle>Repository Analysis</AlertTitle>
        <AlertDescription>
          Our platform analyzes your GitHub repositories to verify these skills. We look at code quality, project
          structure, technologies used, and overall architecture to determine if you meet the criteria for this badge.
        </AlertDescription>
      </Alert>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border/50 p-4">
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5 text-blue-500" />
            <h4 className="font-medium">Frontend Skills</h4>
          </div>
          <ul className="mt-2 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              Modern JavaScript frameworks (React, Vue, Angular)
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              CSS and responsive design
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              State management
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              Frontend performance optimization
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-border/50 p-4">
          <div className="flex items-center gap-2">
            <Server className="h-5 w-5 text-purple-500" />
            <h4 className="font-medium">Backend Skills</h4>
          </div>
          <ul className="mt-2 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              Server-side languages (Node.js, Python, etc.)
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              API design and implementation
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              Authentication and authorization
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              Server-side performance
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-border/50 p-4">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-green-500" />
            <h4 className="font-medium">Database Skills</h4>
          </div>
          <ul className="mt-2 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              Database design and modeling
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              SQL or NoSQL database experience
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              Data migration and management
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              Query optimization
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-border/50 p-4">
          <div className="flex items-center gap-2">
            <Cloud className="h-5 w-5 text-cyan-500" />
            <h4 className="font-medium">DevOps Skills</h4>
          </div>
          <ul className="mt-2 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              Deployment strategies
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              CI/CD pipelines
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              Cloud services knowledge
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              Infrastructure as code
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
