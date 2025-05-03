import { GithubForm } from "@/components/analyze/github-form"

export default function AnalyzePage() {
  return (
    <div className="container max-w-5xl py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Analyze Your GitHub Repository
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Submit your GitHub repository to analyze your contributions and mint a skill badge NFT
          </p>
        </div>
      </div>
      <div className="mx-auto mt-8 w-full max-w-2xl">
        <GithubForm />
      </div>
    </div>
  )
}
