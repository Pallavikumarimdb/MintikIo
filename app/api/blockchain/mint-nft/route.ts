import { NextResponse } from "next/server"

// Mock blockchain transaction data
interface Transaction {
  id: string
  status: "pending" | "confirmed" | "failed"
  timestamp: string
  blockHeight?: number
  confirmations?: number
  fee?: number
  signature?: string
}

// Mock NFT data
interface NFT {
  id: number
  name: string
  description: string
  image: string
  attributes: { trait_type: string; value: string }[]
  mintAddress: string
  owner: string
  createdAt: string
  metadata: {
    symbol: string
    uri: string
    sellerFeeBasisPoints: number
  }
}

// Mock blockchain service
class MockSolanaBlockchainService {
  private static instance: MockSolanaBlockchainService
  private transactions: Map<string, Transaction> = new Map()
  private nfts: Map<number, NFT> = new Map()
  private nftCounter = 1000

  public static getInstance(): MockSolanaBlockchainService {
    if (!MockSolanaBlockchainService.instance) {
      MockSolanaBlockchainService.instance = new MockSolanaBlockchainService()
    }
    return MockSolanaBlockchainService.instance
  }

  public async mintNFT(
    walletAddress: string,
    badgeName: string,
    badgeDescription: string,
    attributes: { trait_type: string; value: string }[],
  ): Promise<{ transaction: Transaction; nft: NFT }> {
    // Generate a random transaction ID
    const txId = `${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`

    // Create a pending transaction
    const transaction: Transaction = {
      id: txId,
      status: "pending",
      timestamp: new Date().toISOString(),
    }

    this.transactions.set(txId, transaction)

    // Simulate blockchain delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create NFT
    const nftId = this.nftCounter++
    const mintAddress = `${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`

    const nft: NFT = {
      id: nftId,
      name: badgeName,
      description: badgeDescription,
      image: `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(badgeName)}`,
      attributes,
      mintAddress,
      owner: walletAddress,
      createdAt: new Date().toISOString(),
      metadata: {
        symbol: "BADGE",
        uri: `https://arweave.net/${Math.random().toString(36).substring(2, 10)}`,
        sellerFeeBasisPoints: 0,
      },
    }

    this.nfts.set(nftId, nft)

    // Update transaction to confirmed
    const updatedTransaction: Transaction = {
      ...transaction,
      status: "confirmed",
      blockHeight: 12345678 + Math.floor(Math.random() * 1000),
      confirmations: 32,
      fee: 0.000005,
      signature: `${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
    }

    this.transactions.set(txId, updatedTransaction)

    return {
      transaction: updatedTransaction,
      nft,
    }
  }

  public getTransaction(txId: string): Transaction | undefined {
    return this.transactions.get(txId)
  }

  public getNFT(nftId: number): NFT | undefined {
    return this.nfts.get(nftId)
  }

  public getNFTsByOwner(walletAddress: string): NFT[] {
    return Array.from(this.nfts.values()).filter((nft) => nft.owner === walletAddress)
  }
}

export async function POST(request: Request) {
  try {
    const { walletAddress, skillBadge, repoName, repoUrl } = await request.json()

    // Check for authorization header
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Validate required fields
    if (!walletAddress || !skillBadge) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const blockchainService = MockSolanaBlockchainService.getInstance()

    // Create NFT attributes
    const attributes = [
      { trait_type: "Badge Type", value: skillBadge },
      { trait_type: "Repository", value: repoName || "Unknown" },
      { trait_type: "Verified", value: "Yes" },
      { trait_type: "Rarity", value: "Uncommon" },
      { trait_type: "Issued", value: new Date().toISOString().split("T")[0] },
    ]

    // Mint the NFT
    const result = await blockchainService.mintNFT(
      walletAddress,
      skillBadge,
      `${skillBadge} badge earned through verified contributions to ${repoName || "GitHub repositories"}`,
      attributes,
    )

    // Create a Solana Blink URL
    const blinkId = Math.random().toString(36).substring(2, 10)
    const blinkUrl = `https://blinks.solana.com/mint/${blinkId}?badge=${encodeURIComponent(skillBadge)}`

    return NextResponse.json({
      success: true,
      transaction: result.transaction,
      nft: {
        ...result.nft,
        blink: {
          url: blinkUrl,
          created: new Date().toISOString(),
        },
      },
    })
  } catch (error) {
    console.error("Error minting NFT:", error)
    return NextResponse.json({ error: "Failed to mint NFT" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    // Check for authorization header
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const walletAddress = searchParams.get("wallet")
    const txId = searchParams.get("txId")
    const nftId = searchParams.get("nftId")

    const blockchainService = MockSolanaBlockchainService.getInstance()

    if (txId) {
      // Get transaction by ID
      const transaction = blockchainService.getTransaction(txId)
      if (!transaction) {
        return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
      }
      return NextResponse.json(transaction)
    } else if (nftId) {
      // Get NFT by ID
      const nft = blockchainService.getNFT(Number.parseInt(nftId))
      if (!nft) {
        return NextResponse.json({ error: "NFT not found" }, { status: 404 })
      }
      return NextResponse.json(nft)
    } else if (walletAddress) {
      // Get NFTs by wallet address
      const nfts = blockchainService.getNFTsByOwner(walletAddress)
      return NextResponse.json(nfts)
    } else {
      return NextResponse.json({ error: "Missing query parameters" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error fetching blockchain data:", error)
    return NextResponse.json({ error: "Failed to fetch blockchain data" }, { status: 500 })
  }
}
