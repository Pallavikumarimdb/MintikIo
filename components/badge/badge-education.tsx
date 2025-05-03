import { BookOpen, ExternalLink, Wallet, Lightbulb } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function BadgeEducation() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Understanding Skill Badges</h3>
        <p className="mt-1 text-muted-foreground">
          Skill badges are digital credentials that verify a developer's expertise in specific areas. Unlike traditional
          certifications, these badges are based on actual code contributions and real-world projects.
        </p>
      </div>

      <Alert className="bg-primary/5 border-primary/20">
        <Lightbulb className="h-4 w-4 text-primary" />
        <AlertTitle>No Immediate Action Required</AlertTitle>
        <AlertDescription>
          You don't need to mint anything right now. This page is for learning about the badge and the skills it
          represents. When you're ready to earn your own badges, you can analyze your repositories on our platform.
        </AlertDescription>
      </Alert>

      <div className="rounded-lg border border-border/50 p-4">
        <h3 className="flex items-center gap-2 text-lg font-medium">
          <BookOpen className="h-5 w-5 text-primary" />
          Educational Resources
        </h3>
        <div className="mt-4 space-y-3">
          <a
            href="https://solana.com/developers"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-md border border-border/50 p-3 hover:bg-muted/50"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Solana Developer Resources</span>
            </div>
            <ExternalLink className="h-4 w-4" />
          </a>
          <a
            href="https://docs.solana.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-md border border-border/50 p-3 hover:bg-muted/50"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Solana Documentation</span>
            </div>
            <ExternalLink className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/topics/full-stack"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-md border border-border/50 p-3 hover:bg-muted/50"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Full Stack Development Resources</span>
            </div>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is a Solana wallet?</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">
              A Solana wallet is a digital tool that allows you to store, send, and receive Solana tokens and NFTs. It's
              similar to a digital bank account for your cryptocurrency assets. Popular Solana wallets include Phantom,
              Solflare, and Backpack.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>How are skill badges verified?</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">
              Skill badges are verified through our platform's analysis of your GitHub repositories. We examine code
              quality, project structure, technologies used, and overall architecture to determine if you meet the
              criteria for specific badges. The verification process is transparent and based on objective metrics.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Do I need a wallet to view badges?</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">
              No, you don't need a wallet to view badges. Anyone can view and learn about the badges on our platform.
              You only need a wallet if you want to mint your own badges or collect badges from other developers.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-6 rounded-lg border border-border/50 p-4">
        <h3 className="flex items-center gap-2 text-lg font-medium">
          <Wallet className="h-5 w-5 text-primary" />
          About Wallets and NFTs
        </h3>
        <p className="mt-2 text-muted-foreground">
          NFTs (Non-Fungible Tokens) are unique digital assets stored on a blockchain. In our platform, skill badges are
          represented as NFTs on the Solana blockchain, making them verifiable and portable.
        </p>
        <p className="mt-2 text-muted-foreground">
          To mint or collect badges, you'll need a Solana wallet. However, you don't need one to browse and learn about
          badges or to support developers who have earned them.
        </p>
        <div className="mt-4 flex justify-center">
          <a
            href="https://solana.com/learn/wallets-guide"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Learn more about Solana wallets
            <ExternalLink className="ml-1 inline h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  )
}
