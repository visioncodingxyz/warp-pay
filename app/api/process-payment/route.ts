import { type NextRequest, NextResponse } from "next/server"
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js"
import {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token"

const RECIPIENT_WALLET = "BJ2h6pEn5xJr3bBFCDN6pCsioYGPxwNz4RWf8urL61qd"
const RPC_ENDPOINT = process.env.NEXT_PUBLIC_SOLANA_RPC_URL!

const TOKEN_MINTS = {
  USDC: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  USDT: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
}

export async function POST(request: NextRequest) {
  try {
    const { paymentMethod, amount, fromWallet } = await request.json()

    console.log("[v0] Processing payment:", { paymentMethod, amount, fromWallet })

    // Create connection to Solana
    const connection = new Connection(RPC_ENDPOINT, "confirmed")

    // Get the sender's public key
    const fromPubkey = new PublicKey(fromWallet)
    const toPubkey = new PublicKey(RECIPIENT_WALLET)

    // Create transaction based on payment method
    let transaction: Transaction

    if (paymentMethod === "SOL") {
      // Create SOL transfer transaction
      const lamports = Math.floor(amount * LAMPORTS_PER_SOL)

      transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey,
          toPubkey,
          lamports,
        }),
      )
    } else if (paymentMethod === "USDC" || paymentMethod === "USDT") {
      const mintAddress = new PublicKey(TOKEN_MINTS[paymentMethod])

      // Get associated token accounts
      const fromTokenAccount = await getAssociatedTokenAddress(mintAddress, fromPubkey)

      const toTokenAccount = await getAssociatedTokenAddress(mintAddress, toPubkey)

      // Check if recipient token account exists
      const toAccountInfo = await connection.getAccountInfo(toTokenAccount)

      transaction = new Transaction()

      // If recipient doesn't have a token account, create it
      if (!toAccountInfo) {
        console.log("[v0] Creating associated token account for recipient")
        transaction.add(
          createAssociatedTokenAccountInstruction(
            fromPubkey, // payer
            toTokenAccount, // associated token account
            toPubkey, // owner
            mintAddress, // mint
            TOKEN_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID,
          ),
        )
      }

      // Add token transfer instruction
      // USDC and USDT have 6 decimals
      const tokenAmount = Math.floor(amount * 1_000_000)

      transaction.add(
        createTransferInstruction(
          fromTokenAccount, // source
          toTokenAccount, // destination
          fromPubkey, // owner
          tokenAmount, // amount
          [], // multi-signers
          TOKEN_PROGRAM_ID,
        ),
      )

      console.log("[v0] SPL token transfer prepared:", {
        token: paymentMethod,
        amount: tokenAmount,
        from: fromTokenAccount.toBase58(),
        to: toTokenAccount.toBase58(),
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: `${paymentMethod} is not supported. Please use SOL, USDC, or USDT.`,
        },
        { status: 400 },
      )
    }

    // Get recent blockhash
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash("confirmed")

    transaction.recentBlockhash = blockhash
    transaction.feePayer = fromPubkey

    // Serialize the transaction for the client to sign
    const serializedTransaction = transaction
      .serialize({
        requireAllSignatures: false,
        verifySignatures: false,
      })
      .toString("base64")

    console.log("[v0] Transaction prepared successfully")

    return NextResponse.json({
      success: true,
      transaction: serializedTransaction,
      blockhash,
      lastValidBlockHeight,
    })
  } catch (error: any) {
    console.error("[v0] Payment processing error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to process payment",
      },
      { status: 500 },
    )
  }
}
