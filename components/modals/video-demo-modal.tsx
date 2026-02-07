"use client"

import { X } from "lucide-react"
import { useEffect, useRef } from "react"

interface VideoDemoModalProps {
  isOpen: boolean
  onClose: () => void
}

export function VideoDemoModal({ isOpen, onClose }: VideoDemoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (backdropRef.current && event.target === backdropRef.current) {
        onClose()
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-5xl bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-2xl overflow-hidden"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-slate-900/80 backdrop-blur-sm flex items-center justify-center hover:bg-slate-900 transition-colors text-slate-300 hover:text-white border border-slate-700"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Video container */}
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <video
            className="absolute inset-0 w-full h-full"
            controls
            autoPlay
            playsInline
            src="https://pw7i5mkou3gfguhl.public.blob.vercel-storage.com/warp-demo.mov"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Title bar */}
        <div className="px-6 py-4 bg-slate-900/50 border-t border-slate-700">
          <h3 className="text-lg font-semibold text-white">WarpPay Demo</h3>
          <p className="text-sm text-slate-400 mt-1">See how our platform works in action</p>
        </div>
      </div>
    </div>
  )
}
