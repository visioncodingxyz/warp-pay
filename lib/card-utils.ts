export function generateCardNumber(): string {
  // Generate a valid-looking card number (not real, for demo only)
  const prefix = "4" // Visa prefix
  let number = prefix

  for (let i = 0; i < 15; i++) {
    number += Math.floor(Math.random() * 10)
  }

  return number
}

export function formatCardNumber(number: string, reveal = false): string {
  if (!reveal) {
    const last4 = number.slice(-4)
    return `•••• •••• •••• ${last4}`
  }

  return number.match(/.{1,4}/g)?.join(" ") || number
}

export function generateExpiry(): string {
  const now = new Date()
  const year = now.getFullYear() + 4
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")
  return `${month}/${String(year).slice(-2)}`
}

export function generateCVV(): string {
  return String(Math.floor(Math.random() * 900) + 100)
}

export function calculateDeliveryDate(): number {
  const now = Date.now()
  const sevenDays = 7 * 24 * 60 * 60 * 1000
  return now + sevenDays
}

export function formatTimeRemaining(targetDate: number): string {
  const now = Date.now()
  const diff = targetDate - now

  if (diff <= 0) return "Delivered"

  const days = Math.floor(diff / (24 * 60 * 60 * 1000))
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000))

  if (days > 0) return `${days}d ${hours}h`
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}

export function encryptCardData(data: string): string {
  // Simple encoding for demo (NOT secure for production)
  return btoa(data)
}

export function decryptCardData(encrypted: string): string {
  // Simple decoding for demo (NOT secure for production)
  try {
    return atob(encrypted)
  } catch {
    return ""
  }
}
