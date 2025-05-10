"use client"

import { useState } from "react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js"
import {
  TOKEN_2022_PROGRAM_ID,
  createInitializeMintInstruction,
  createAssociatedTokenAccountInstruction,
  getMintLen,
  createInitializeMetadataPointerInstruction,
  getAssociatedTokenAddressSync,
  createMintToInstruction,
  ExtensionType,
} from "@solana/spl-token"
import { createInitializeInstruction, pack } from "@solana/spl-token-metadata"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Check } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface MintBadgeProps {
  badgeName: string
  badgeDescription: string
  badgeImage: string
  badgeSymbol?: string
  onMintSuccess?: (mintAddress: string, txId: string) => void
}

export function MintBadge({
  badgeName,
  badgeDescription,
  badgeImage,
  badgeSymbol = "BADGE",
  onMintSuccess,
}: MintBadgeProps) {
  const { connection } = useConnection()
  const wallet = useWallet()
  const [isMinting, setIsMinting] = useState(false)
  const [mintingComplete, setMintingComplete] = useState(false)
  const [showMintDialog, setShowMintDialog] = useState(false)
  const [mintAddress, setMintAddress] = useState("")
  const [txId, setTxId] = useState("")

  const handleMint = async () => {
    if (!wallet.publicKey || !wallet.signTransaction) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to mint an NFT badge",
        variant: "destructive",
      })
      return
    }

    try {
      setIsMinting(true)
      setShowMintDialog(true)

      const mintKeypair = Keypair.generate()
      setMintAddress(mintKeypair.publicKey.toString())

      const metadata = {
        mint: mintKeypair.publicKey,
        name: badgeName,
        symbol: badgeSymbol.padEnd(10).slice(0, 10),
        uri: badgeImage, 
        additionalMetadata: [
          ["description", badgeDescription],
          ["type", "badge"],
          ["created_at", new Date().toISOString()],
        ],
      }

      const mintLen = getMintLen([ExtensionType.MetadataPointer])
      const metadataLen = 2 + pack(metadata).length 

      const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen)

      const transaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: wallet.publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: mintLen,
          lamports,
          programId: TOKEN_2022_PROGRAM_ID,
        }),
        createInitializeMetadataPointerInstruction(
          mintKeypair.publicKey,
          wallet.publicKey,
          mintKeypair.publicKey,
          TOKEN_2022_PROGRAM_ID,
        ),
        createInitializeMintInstruction(
          mintKeypair.publicKey,
          0,
          wallet.publicKey,
          null, 
          TOKEN_2022_PROGRAM_ID,
        ),
        createInitializeInstruction({
          programId: TOKEN_2022_PROGRAM_ID,
          mint: mintKeypair.publicKey,
          metadata: mintKeypair.publicKey,
          name: metadata.name,
          symbol: metadata.symbol,
          uri: metadata.uri,
          mintAuthority: wallet.publicKey,
          updateAuthority: wallet.publicKey,
        }),
      )

      transaction.feePayer = wallet.publicKey
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

      transaction.partialSign(mintKeypair)

      const signedTransaction = await wallet.signTransaction(transaction)
      const txSignature = await connection.sendRawTransaction(signedTransaction.serialize())

      await connection.confirmTransaction(txSignature)

      console.log(`NFT mint created at ${mintKeypair.publicKey.toString()}`)

      const associatedToken = getAssociatedTokenAddressSync(
        mintKeypair.publicKey,
        wallet.publicKey,
        false,
        TOKEN_2022_PROGRAM_ID,
      )

      const createAtaTransaction = new Transaction().add(
        createAssociatedTokenAccountInstruction(
          wallet.publicKey,
          associatedToken,
          wallet.publicKey,
          mintKeypair.publicKey,
          TOKEN_2022_PROGRAM_ID,
        ),
      )

      createAtaTransaction.feePayer = wallet.publicKey
      createAtaTransaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

      const signedAtaTransaction = await wallet.signTransaction(createAtaTransaction)
      const ataTxSignature = await connection.sendRawTransaction(signedAtaTransaction.serialize())

      await connection.confirmTransaction(ataTxSignature)

      const mintToTransaction = new Transaction().add(
        createMintToInstruction(
          mintKeypair.publicKey,
          associatedToken,
          wallet.publicKey,
          1,
          [],
          TOKEN_2022_PROGRAM_ID,
        ),
      )

      mintToTransaction.feePayer = wallet.publicKey
      mintToTransaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

      const signedMintToTransaction = await wallet.signTransaction(mintToTransaction)
      const mintToTxSignature = await connection.sendRawTransaction(signedMintToTransaction.serialize())

      await connection.confirmTransaction(mintToTxSignature)

      setTxId(mintToTxSignature)
      console.log("NFT minted successfully!", mintToTxSignature)

      await fetch("/api/mint-nft/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          badgeName,
          mintAddress: mintKeypair.publicKey.toString(),
          txId: mintToTxSignature,
          walletAddress: wallet.publicKey.toString(),
        }),
      })

      setMintingComplete(true)

      toast({
        title: "NFT Minted Successfully",
        description: `Your ${badgeName} badge has been minted to your wallet`,
      })

      if (onMintSuccess) {
        onMintSuccess(mintKeypair.publicKey.toString(), mintToTxSignature)
      }
    } catch (error) {
      console.error("Error minting NFT:", error)
      toast({
        title: "Error",
        description: "Failed to mint NFT. Please try again.",
        variant: "destructive",
      })
      setShowMintDialog(false)
    } finally {
      setIsMinting(false)
    }
  }

  return (
    <>
      <Button onClick={handleMint} disabled={isMinting} className="w-full">
        {isMinting ? "Minting..." : "Mint Skill Badge NFT"}
      </Button>

      <Dialog open={showMintDialog} onOpenChange={setShowMintDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{mintingComplete ? "NFT Minted Successfully" : "Minting Your NFT"}</DialogTitle>
            <DialogDescription>
              {mintingComplete
                ? "Your skill badge has been minted to your wallet"
                : "Please approve the transactions in your wallet to mint your skill badge NFT"}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6">
            {mintingComplete ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold">{badgeName}</h3>
                  <p className="text-sm text-muted-foreground">
                    Transaction ID: {txId.slice(0, 4)}...{txId.slice(-4)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Mint Address: {mintAddress.slice(0, 4)}...{mintAddress.slice(-4)}
                  </p>
                </div>
                <Button onClick={() => setShowMintDialog(false)}>Close</Button>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <div className="h-20 w-20 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
                <p className="text-center text-sm text-muted-foreground">
                  Please confirm the transaction in your wallet
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
