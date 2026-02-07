import { type NextRequest, NextResponse } from "next/server"
import { Connection, Transaction } from "@solana/web3.js"

const RPC_ENDPOINT = "https://api.mainnet-beta.solana.com"

export async function POST(request: NextRequest) {
  try {
    const { signedTransaction } = await request.json()

    console.log("[v0] Broadcasting signed transaction")

    // Create connection to Solana
    const connection = new Connection(RPC_ENDPOINT, "confirmed")

    // Deserialize the signed transaction
    const transaction = Transaction.from(Buffer.from(signedTransaction, "base64"))

    // Send the transaction
    const signature = await connection.sendRawTransaction(transaction.serialize(), {
      skipPreflight: false,
      preflightCommitment: "confirmed",
    })

    console.log("[v0] Transaction sent:", signature)

    // Wait for confirmation
    const confirmation = await connection.confirmTransaction(signature, "confirmed")

    if (confirmation.value.err) {
      throw new Error("Transaction failed: " + JSON.stringify(confirmation.value.err))
    }

    console.log("[v0] Transaction confirmed:", signature)

    return NextResponse.json({
      success: true,
      signature,
    })
  } catch (error: any) {
    console.error("[v0] Broadcast error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to broadcast transaction",
      },
      { status: 500 },
    )
  }
}
