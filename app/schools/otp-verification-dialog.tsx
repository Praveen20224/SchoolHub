// components/otp-verification-dialog.tsx
"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

interface OtpVerificationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onVerified: () => void
  email: string
}

export function OtpVerificationDialog({ open, onOpenChange, onVerified, email }: OtpVerificationDialogProps) {
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP code.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    
    try {
      // Here you would verify the OTP with your backend
      // This is a mock implementation - replace with actual API call
      const isValid = await verifyOtp(email, otp)
      
      if (isValid) {
        toast({
          title: "Verification Successful",
          description: "Your email has been verified.",
        })
        onVerified()
        onOpenChange(false)
      } else {
        toast({
          title: "Verification Failed",
          description: "The OTP code is invalid or expired.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during verification. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    setIsLoading(true)
    try {
      // Resend OTP logic here
      await sendOtp(email)
      toast({
        title: "OTP Resent",
        description: "A new OTP has been sent to your email.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend OTP. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Verify Your Email</DialogTitle>
          <DialogDescription>
            We've sent a 6-digit verification code to {email}. Please enter it below to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Enter 6-digit code"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            className="text-center text-xl tracking-widest"
            disabled={isLoading}
          />
          <div className="flex flex-col gap-2">
            <Button onClick={handleVerify} disabled={isLoading || otp.length !== 6}>
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
            <Button variant="outline" onClick={handleResend} disabled={isLoading}>
              Resend Code
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Mock functions - replace with actual implementations
async function verifyOtp(email: string, otp: string): Promise<boolean> {
  // Implement your OTP verification logic here
  return new Promise((resolve) => setTimeout(() => resolve(otp === "123456"), 1000))
}

async function sendOtp(email: string): Promise<void> {
  // Implement your OTP sending logic here
  return new Promise((resolve) => setTimeout(resolve, 1000))
}
