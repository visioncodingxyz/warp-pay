import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get("username")

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    const sql = neon(process.env.DATABASE_URL!)
    const result = await sql`
      SELECT username FROM users WHERE LOWER(username) = LOWER(${username})
    `

    return NextResponse.json({ available: result.length === 0 })
  } catch (error) {
    console.error("Error checking username:", error)
    return NextResponse.json({ error: "Failed to check username availability" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { username } = await request.json()

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    const sql = neon(process.env.DATABASE_URL!)
    const result = await sql`
      SELECT username FROM users WHERE LOWER(username) = LOWER(${username})
    `

    return NextResponse.json({ available: result.length === 0 })
  } catch (error) {
    console.error("Error checking username:", error)
    return NextResponse.json({ error: "Failed to check username availability" }, { status: 500 })
  }
}
