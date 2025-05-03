import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { skillBadge } = await request.json()

    // Check for authorization header
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Mock delay to simulate blockchain transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock NFT minting response
    return NextResponse.json({
      success: true,
      transaction: {
        id: `tx_${Math.random().toString(36).substring(2, 10)}`,
        status: "confirmed",
        timestamp: new Date().toISOString(),
      },
      nft: {
        id: Math.floor(Math.random() * 1000),
        name: skillBadge,
        image: "/placeholder.svg?height=300&width=300",
        attributes: [
          { trait_type: "Category", value: skillBadge },
          { trait_type: "Rarity", value: "Uncommon" },
          { trait_type: "Verified", value: "Yes" },
        ],
        blink: {
          url: `https://blinks.solana.com/mint/${Math.random().toString(36).substring(2, 10)}`,
          created: new Date().toISOString(),
        },
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to mint NFT" }, { status: 500 })
  }
}
