"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useRouter } from "next/navigation"
import { useUser } from "@/components/providers/user-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { User, Shield, Bell, Wallet, Info, Upload, Loader2 } from "lucide-react"
import { WalletConnectOverlay } from "./wallet-connect-overlay"
import Image from "next/image"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function SettingsPage() {
  const { connected } = useWallet()
  const router = useRouter()
  const { user, setUser } = useUser()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const wallet = useWallet()

  const [username, setUsername] = useState(user?.username || "")
  const [email, setEmail] = useState(user?.email || "")
  const [firstName, setFirstName] = useState(user?.firstName || "")
  const [lastName, setLastName] = useState(user?.lastName || "")
  const [profilePicture, setProfilePicture] = useState<File | null>(null)
  const [profilePicturePreview, setProfilePicturePreview] = useState<string>(
    user?.profilePicture || "/images/default-avatar.png",
  )
  const [isUpdating, setIsUpdating] = useState(false)
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null)
  const [usernameError, setUsernameError] = useState("")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [transactionAlerts, setTransactionAlerts] = useState(true)
  const [securityAlerts, setSecurityAlerts] = useState(true)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const checkUsername = async () => {
      const trimmedUsername = username.trim()

      if (!trimmedUsername || trimmedUsername === user?.username) {
        setUsernameAvailable(null)
        setUsernameError("")
        setIsCheckingUsername(false)
        return
      }

      if (!/^[a-zA-Z0-9_]+$/.test(trimmedUsername)) {
        setUsernameError("Username can only contain letters, numbers, and underscores")
        setUsernameAvailable(false)
        setIsCheckingUsername(false)
        return
      }

      if (trimmedUsername.length < 3) {
        setUsernameError("Username must be at least 3 characters")
        setUsernameAvailable(false)
        setIsCheckingUsername(false)
        return
      }

      setIsCheckingUsername(true)
      setUsernameError("")

      try {
        const response = await fetch(`/api/users/check-username?username=${encodeURIComponent(trimmedUsername)}`)
        const data = await response.json()

        if (data.available) {
          setUsernameAvailable(true)
          setUsernameError("")
        } else {
          setUsernameAvailable(false)
          setUsernameError("Username is already taken")
        }
      } catch (error) {
        console.error("Error checking username:", error)
        setUsernameError("Failed to check username availability")
        setUsernameAvailable(false)
      } finally {
        setIsCheckingUsername(false)
      }
    }

    const timeoutId = setTimeout(checkUsername, 500)
    return () => clearTimeout(timeoutId)
  }, [username, user?.username])

  if (!connected) {
    return (
      <div className="relative">
        <div className="opacity-30 pointer-events-none select-none">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Settings</h1>
              <p className="text-slate-300 mt-1">Manage your account settings and preferences</p>
            </div>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <User className="w-5 h-5" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500" />
                  <div>
                    <div className="font-semibold text-white">Username</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Shield className="w-5 h-5" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-slate-600 bg-slate-700/30">
                    <div className="font-medium text-white">Two-Factor Authentication</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <WalletConnectOverlay onClose={() => router.push("/dashboard")} />
      </div>
    )
  }

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

  const handleUpdateProfile = async () => {
    if (!user?.walletAddress) return

    setIsUpdating(true)

    try {
      let profilePictureUrl = user.profilePicture

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

      const response = await fetch("/api/users/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: user.walletAddress,
          username: username.trim(),
          email: email.trim(),
          profilePictureUrl,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to update profile")
      }

      const { user: updatedUser } = await response.json()

      setUser({
        ...user,
        username: updatedUser.username,
        email: updatedUser.email,
        profilePicture: updatedUser.profile_picture_url,
      })

      setProfilePicture(null)

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleNotificationChange = (type: string, value: boolean) => {
    switch (type) {
      case "email":
        setEmailNotifications(value)
        break
      case "transaction":
        setTransactionAlerts(value)
        break
      case "security":
        setSecurityAlerts(value)
        break
    }
    toast({
      title: "Notification Settings Updated",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} notifications ${value ? "enabled" : "disabled"}`,
    })
  }

  const handleDeleteAccount = async () => {
    if (!user?.walletAddress) return

    setIsDeleting(true)

    try {
      const response = await fetch("/api/users/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: user.walletAddress,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to delete account")
      }

      toast({
        title: "Account Deleted",
        description: "Your account has been permanently deleted",
      })

      setUser(null)

      if (wallet.disconnect) {
        await wallet.disconnect()
      }

      router.push("/")
    } catch (error) {
      console.error("Error deleting account:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete account",
        variant: "destructive",
      })
      setIsDeleting(false)
      setShowDeleteDialog(false)
    }
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow alphanumeric characters and underscores
    const filtered = value.replace(/[^a-zA-Z0-9_]/g, "")
    setUsername(filtered)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-slate-300 mt-1">Manage your account settings and preferences</p>
      </div>

      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <User className="w-5 h-5" />
            Profile
          </CardTitle>
          <CardDescription className="text-slate-400">Update your profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <div
              className="relative w-20 h-20 rounded-full overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#049be5]/50 transition-all"
              onClick={() => fileInputRef.current?.click()}
            >
              <Image
                src={profilePicturePreview || "/placeholder.svg"}
                alt={user?.username || "Profile"}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Upload className="w-6 h-6 text-white" />
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
            <div>
              <div className="font-semibold text-white">{user?.username}</div>
              <div className="text-sm text-slate-400">
                Member since {new Date(user?.createdAt || 0).toLocaleDateString()}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-sm text-[#049be5] hover:underline mt-1"
              >
                Change profile picture
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-slate-300">
                Username
              </Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={handleUsernameChange}
                maxLength={50}
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500"
              />
              {username.trim() && username.trim() !== user?.username && (
                <div className="flex items-center gap-2 text-sm">
                  {isCheckingUsername ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin text-slate-500" />
                      <span className="text-slate-600">Checking availability...</span>
                    </>
                  ) : usernameAvailable === true ? (
                    <>
                      <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-green-600">Username is available</span>
                    </>
                  ) : usernameAvailable === false ? (
                    <>
                      <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <span className="text-red-600">{usernameError}</span>
                    </>
                  ) : null}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">
                Email Address
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

            {user?.firstName && user?.lastName && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-slate-300">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="First name"
                    value={firstName}
                    disabled
                    className="bg-slate-700/30 border-slate-600 text-slate-400 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-slate-300">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Last name"
                    value={lastName}
                    disabled
                    className="bg-slate-700/30 border-slate-600 text-slate-400 cursor-not-allowed"
                  />
                </div>
              </>
            )}

            <Button
              onClick={handleUpdateProfile}
              disabled={
                isUpdating ||
                isCheckingUsername ||
                (usernameAvailable === false && username.trim() !== user?.username) ||
                (!profilePicture && username === user?.username && email === user?.email)
              }
              style={{ backgroundColor: "#049be5" }}
              className="text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Wallet className="w-5 h-5" />
            Connected Wallet
          </CardTitle>
          <CardDescription className="text-slate-400">Your Solana wallet information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-slate-300">Wallet Address</Label>
            <div className="p-3 rounded-lg bg-slate-700/50 border border-slate-600">
              <div className="font-mono text-sm break-all text-white">{user?.walletAddress}</div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-amber-900/20 border border-amber-700/50 flex gap-3">
            <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-200">
              <p className="font-medium mb-1">Wallet Security</p>
              <p>
                Never share your private keys or seed phrase with anyone. WarpPay will never ask for this information.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Shield className="w-5 h-5" />
            Security
          </CardTitle>
          <CardDescription className="text-slate-400">Manage your security preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border border-slate-600 bg-slate-700/30">
            <div>
              <div className="font-medium text-white">Two-Factor Authentication</div>
              <div className="text-sm text-slate-400">Add an extra layer of security to your account</div>
            </div>
            <Button variant="outline" disabled className="bg-slate-700/50 border-slate-600 text-white">
              Coming Soon
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-slate-600 bg-slate-700/30">
            <div>
              <div className="font-medium text-white">Biometric Authentication</div>
              <div className="text-sm text-slate-400">Use fingerprint or face recognition</div>
            </div>
            <Button variant="outline" disabled className="bg-slate-700/50 border-slate-600 text-white">
              Coming Soon
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-slate-600 bg-slate-700/30">
            <div>
              <div className="font-medium text-white">Login History</div>
              <div className="text-sm text-slate-400">View your recent login activity</div>
            </div>
            <Button variant="outline" disabled className="bg-slate-700/50 border-slate-600 text-white">
              View History
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
          <CardDescription className="text-slate-400">Configure your notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium text-white">Email Notifications</div>
              <div className="text-sm text-slate-400">Receive updates via email</div>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={(checked) => handleNotificationChange("email", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium text-white">Transaction Alerts</div>
              <div className="text-sm text-slate-400">Get notified of all card transactions</div>
            </div>
            <Switch
              checked={transactionAlerts}
              onCheckedChange={(checked) => handleNotificationChange("transaction", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium text-white">Security Alerts</div>
              <div className="text-sm text-slate-400">Important security notifications</div>
            </div>
            <Switch
              checked={securityAlerts}
              onCheckedChange={(checked) => handleNotificationChange("security", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium text-white">Marketing Updates</div>
              <div className="text-sm text-slate-400">News and promotional offers</div>
            </div>
            <Switch disabled />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-slate-400 mb-1">Account Created</div>
              <div className="font-medium text-white">{new Date(user?.createdAt || 0).toLocaleDateString()}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-1">Card Status</div>
              <div className="font-medium capitalize text-white">
                {user?.cardStatus === "none" ? "No Card" : "Pending"}
              </div>
            </div>
          </div>

          {user?.cardData && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-slate-400 mb-1">Card Ordered</div>
                <div className="font-medium text-white">
                  {user?.orderDate ? new Date(user.orderDate).toLocaleDateString() : "N/A"}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-400 mb-1">Current Balance</div>
                <div className="font-medium text-white">${user.cardData.balance.toFixed(2)}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-red-700 bg-red-950/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-red-400">Danger Zone</CardTitle>
          <CardDescription className="text-red-300/70">Irreversible actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-lg border border-red-700 bg-red-900/20">
            <div>
              <div className="font-medium text-red-300">Close Account</div>
              <div className="text-sm text-red-400/80">Permanently delete your account and all data</div>
            </div>
            <Button variant="destructive" onClick={() => setShowDeleteDialog(true)} disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Close Account"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p className="font-semibold">This action cannot be undone.</p>
              <p>This will permanently delete your account and remove all your data from our servers, including:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Your profile information</li>
                <li>Your card details and balance</li>
                <li>Your transaction history</li>
                <li>All associated data</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Yes, delete my account"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
