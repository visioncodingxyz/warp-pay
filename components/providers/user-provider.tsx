"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useWallet } from "@solana/wallet-adapter-react"

interface UserProfile {
  walletAddress: string
  username: string
  email?: string
  firstName?: string
  lastName?: string
  profilePicture?: string
  createdAt: number
  cardStatus: "none" | "ordered" | "active"
  cardData?: CardData
  orderDate?: string
}

interface CardData {
  number: string
  expiry: string
  cvv: string
  balance: number
  status: "active" | "frozen"
  deliveryDate: number
  orderedAt: number
}

interface UserContextType {
  user: UserProfile | null
  setUser: (user: UserProfile | null) => void
  updateUser: (updates: Partial<UserProfile>) => void
  isNewUser: boolean
  isLoading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const { publicKey, connected } = useWallet()
  const [user, setUserState] = useState<UserProfile | null>(null)
  const [isNewUser, setIsNewUser] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Clear any old localStorage data from previous implementation
    const keysToRemove = ["warppay_user", "user", "userProfile"]
    keysToRemove.forEach((key) => {
      if (localStorage.getItem(key)) {
        console.log("[v0] Removing old localStorage key:", key)
        localStorage.removeItem(key)
      }
    })
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      if (connected && publicKey) {
        setIsLoading(true)
        const walletAddress = publicKey.toBase58()

        console.log("[v0] Fetching user for wallet:", walletAddress)

        try {
          const response = await fetch(`/api/users?walletAddress=${walletAddress}`)

          if (!response.ok) {
            throw new Error("Failed to fetch user")
          }

          const { user: dbUser } = await response.json()

          console.log("[v0] Database response:", dbUser ? "User found" : "No user found")

          if (dbUser) {
            // User exists in database
            setUserState({
              walletAddress: dbUser.wallet_address,
              username: dbUser.username,
              email: dbUser.email,
              firstName: dbUser.first_name,
              lastName: dbUser.last_name,
              profilePicture: dbUser.profile_picture_url,
              createdAt: new Date(dbUser.created_at).getTime(),
              cardStatus: dbUser.card_number ? "active" : "none",
              orderDate: dbUser.order_date,
              cardData: dbUser.card_number
                ? {
                    number: dbUser.card_number,
                    expiry: dbUser.expiry_date,
                    cvv: dbUser.security_code,
                    balance: Number.parseFloat(dbUser.balance),
                    status: "active",
                    deliveryDate: 0,
                    orderedAt: 0,
                  }
                : undefined,
            })
            setIsNewUser(false)
            console.log("[v0] User loaded from database")
          } else {
            // New user
            setUserState(null)
            setIsNewUser(true)
            console.log("[v0] New user detected - should show signup modal")
          }
        } catch (error) {
          console.error("[v0] Error fetching user:", error)
          setUserState(null)
          setIsNewUser(true)
          console.log("[v0] Error occurred - treating as new user")
        } finally {
          setIsLoading(false)
        }
      } else {
        setUserState(null)
        setIsNewUser(false)
        setIsLoading(false)
        console.log("[v0] Wallet disconnected - clearing user state")
      }
    }

    fetchUser()
  }, [connected, publicKey])

  const setUser = (newUser: UserProfile | null) => {
    setUserState(newUser)
    if (newUser) {
      setIsNewUser(false)
    }
  }

  const updateUser = (updates: Partial<UserProfile>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUserState(updatedUser)
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, updateUser, isNewUser, isLoading }}>{children}</UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
