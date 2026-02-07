import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function PUT(request: Request) {
  try {
    const {
      walletAddress,
      username,
      email,
      profilePictureUrl,
      firstName,
      lastName,
      cardNumber,
      expiryDate,
      securityCode,
      balance,
      orderDate,
    } = await request.json()

    if (!walletAddress) {
      return NextResponse.json({ error: "Wallet address is required" }, { status: 400 })
    }

    const sql = neon(process.env.DATABASE_URL!)

    // Check if username is taken by another user
    if (username) {
      const existingUser = await sql`
        SELECT wallet_address FROM users 
        WHERE LOWER(username) = LOWER(${username}) 
        AND wallet_address != ${walletAddress}
      `
      if (existingUser.length > 0) {
        return NextResponse.json({ error: "Username is already taken" }, { status: 400 })
      }
    }

    // Build update object with only defined fields
    const updateFields: Record<string, any> = {}
    if (username !== undefined) updateFields.username = username
    if (email !== undefined) updateFields.email = email
    if (profilePictureUrl !== undefined) updateFields.profile_picture_url = profilePictureUrl
    if (firstName !== undefined) updateFields.first_name = firstName
    if (lastName !== undefined) updateFields.last_name = lastName
    if (cardNumber !== undefined) updateFields.card_number = cardNumber
    if (expiryDate !== undefined) updateFields.expiry_date = expiryDate
    if (securityCode !== undefined) updateFields.security_code = securityCode
    if (balance !== undefined) updateFields.balance = balance
    if (orderDate !== undefined) updateFields.order_date = orderDate

    if (Object.keys(updateFields).length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 })
    }

    // Build SET clause parts
    const setClauses = Object.keys(updateFields)
      .map((key) => `${key} = '${updateFields[key]}'`)
      .join(", ")

    // Execute update using tagged template literal
    const result = await sql`
      UPDATE users 
      SET ${sql.unsafe(setClauses)}
      WHERE wallet_address = ${walletAddress}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user: result[0] })
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}
