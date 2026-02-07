import { neon } from "@neondatabase/serverless"
import { type NextRequest, NextResponse } from "next/server"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { walletAddress, username, email, profilePictureUrl } = body

    // Validate required fields
    if (!walletAddress || !username || !email) {
      return NextResponse.json({ error: "Wallet address, username, and email are required" }, { status: 400 })
    }

    // Validate username format (no special characters or spaces)
    const usernameRegex = /^[a-zA-Z0-9_]+$/
    if (!usernameRegex.test(username)) {
      return NextResponse.json(
        { error: "Username can only contain letters, numbers, and underscores" },
        { status: 400 },
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await sql`
      SELECT * FROM users WHERE wallet_address = ${walletAddress}
    `

    if (existingUser.length > 0) {
      return NextResponse.json({ error: "User with this wallet address already exists" }, { status: 409 })
    }

    // Check if username is taken
    const existingUsername = await sql`
      SELECT * FROM users WHERE username = ${username}
    `

    if (existingUsername.length > 0) {
      return NextResponse.json({ error: "Username is already taken" }, { status: 409 })
    }

    const existingEmail = await sql`
      SELECT * FROM users WHERE email = ${email}
    `

    if (existingEmail.length > 0) {
      return NextResponse.json({ error: "Email is already registered" }, { status: 409 })
    }

    // Create new user with email
    const result = await sql`
      INSERT INTO users (wallet_address, username, email, profile_picture_url)
      VALUES (${walletAddress}, ${username}, ${email}, ${profilePictureUrl || "/images/default-avatar.png"})
      RETURNING *
    `

    return NextResponse.json({ user: result[0] }, { status: 201 })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const walletAddress = searchParams.get("walletAddress")

    if (!walletAddress) {
      return NextResponse.json({ error: "Wallet address is required" }, { status: 400 })
    }

    const result = await sql`
      SELECT * FROM users WHERE wallet_address = ${walletAddress}
    `

    if (result.length === 0) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    return NextResponse.json({ user: result[0] }, { status: 200 })
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}
