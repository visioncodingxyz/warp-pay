"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useUser } from "@/components/providers/user-provider"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Upload, Loader2 } from "lucide-react"
import Image from "next/image"

interface ProfileSetupModalProps {
  open: boolean
  onClose?: () => void
}

export function ProfileSetupModal({ open, onClose }: ProfileSetupModalProps) {
  const { publicKey, disconnect } = useWallet()
  const { setUser } = useUser()
  const router = useRouter()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [profilePicture, setProfilePicture] = useState<File | null>(null)
  const [profilePicturePreview, setProfilePicturePreview] = useState<string>("/images/default-avatar.png")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null)

  useEffect(() => {
    const checkUsername = async () => {
      if (!username.trim() || username.length < 3) {
        setUsernameAvailable(null)
        return
      }

      const usernameRegex = /^[a-zA-Z0-9_]+$/
      if (!usernameRegex.test(username)) {
        setUsernameAvailable(null)
        return
      }

      setIsCheckingUsername(true)
      try {
        const response = await fetch("/api/users/check-username", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: username.trim() }),
        })
        const data = await response.json()
        setUsernameAvailable(data.available)
      } catch (error) {
        console.error("Error checking username:", error)
      } finally {
        setIsCheckingUsername(false)
      }
    }

    const timeoutId = setTimeout(checkUsername, 500)
    return () => clearTimeout(timeoutId)
  }, [username])

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      })
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB.",
        variant: "destructive",
      })
      return
    }

    setProfilePicture(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setProfilePicturePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleClose = async () => {
    if (onClose) {
      // Disconnect wallet when canceling signup
      await disconnect()
      onClose()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username.trim()) {
      toast({
        title: "Username required",
        description: "Please enter a username to continue.",
        variant: "destructive",
      })
      return
    }

    const usernameRegex = /^[a-zA-Z0-9_]+$/
    if (!usernameRegex.test(username)) {
      toast({
        title: "Invalid username",
        description: "Username can only contain letters, numbers, and underscores.",
        variant: "destructive",
      })
      return
    }

    if (usernameAvailable === false) {
      toast({
        title: "Username taken",
        description: "This username is already taken. Please choose another one.",
        variant: "destructive",
      })
      return
    }

    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter an email address to continue.",
        variant: "destructive",
      })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    if (!publicKey) return

    setIsSubmitting(true)

    try {
      let profilePictureUrl = "/images/default-avatar.png"

      if (profilePicture) {
        const formData = new FormData()
        formData.append("file", profilePicture)

        const uploadResponse = await fetch("/api/upload-avatar", {
          method: "POST",
          body: formData,
        })

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload profile picture")
        }

        const uploadData = await uploadResponse.json()
        profilePictureUrl = uploadData.url
      }

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress: publicKey.toBase58(),
          username: username.trim(),
          email: email.trim(),
          profilePictureUrl,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to create profile")
      }

      const { user: newUser } = await response.json()

      setUser({
        walletAddress: newUser.wallet_address,
        username: newUser.username,
        email: newUser.email,
        firstName: newUser.first_name,
        lastName: newUser.last_name,
        profilePicture: newUser.profile_picture_url,
        createdAt: new Date(newUser.created_at).getTime(),
        cardStatus: newUser.card_number ? "active" : "none",
        cardData: newUser.card_number
          ? {
              number: newUser.card_number,
              expiry: newUser.expiry_date,
              cvv: newUser.security_code,
              balance: Number.parseFloat(newUser.balance),
              status: "active",
              deliveryDate: 0,
              orderedAt: 0,
            }
          : undefined,
      })

      toast({
        title: "Profile created!",
        description: "Welcome to WarpPay.",
      })

      if (onClose) onClose()
    } catch (error) {
      console.error("Error creating profile:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow alphanumeric characters and underscores
    const filtered = value.replace(/[^a-zA-Z0-9_]/g, "")
    setUsername(filtered)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="sm:max-w-md bg-slate-800 border-slate-700"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-white">Complete Your Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <div
              className={`relative w-32 h-32 rounded-full overflow-hidden cursor-pointer transition-all ${
                isDragging ? "ring-4 ring-[#049be5] scale-105" : "hover:ring-2 hover:ring-[#049be5]/50"
              }`}
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <Image src={profilePicturePreview || "/placeholder.svg"} alt="Profile" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Upload className="w-8 h-8 text-white" />
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFileSelect(file)
              }}
            />
            <p className="text-sm text-slate-400">Click or drag to upload profile picture (optional)</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username" className="text-slate-300">
              Username *
            </Label>
            <div className="relative">
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={handleUsernameChange}
                maxLength={50}
                className={`bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 ${
                  usernameAvailable === false ? "border-red-500" : usernameAvailable === true ? "border-green-500" : ""
                }`}
              />
              {isCheckingUsername && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-slate-400" />
              )}
            </div>
            <p className="text-xs text-slate-400">Letters, numbers, and underscores only</p>
            {usernameAvailable === false && <p className="text-xs text-red-400">This username is already taken</p>}
            {usernameAvailable === true && <p className="text-xs text-green-400">Username is available</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={255}
              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || usernameAvailable === false}
            style={{ backgroundColor: "#049be5" }}
          >
            {isSubmitting ? "Creating Profile..." : "Create Profile"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
