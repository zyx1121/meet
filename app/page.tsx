"use client"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"


export default function Home() {
  const router = useRouter()
  const [meetingId, setMeetingId] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleJoinMeeting = () => {
    if (meetingId.length !== 6) return
    router.push(`/${meetingId}`)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Meeeeeet</h1>
          <p className="text-sm text-muted-foreground">
            join or create a meeting
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-4">
              <InputOTP
                maxLength={6}
                value={meetingId}
                onChange={setMeetingId}
                onComplete={handleJoinMeeting}
                pattern={REGEXP_ONLY_DIGITS}
                ref={inputRef}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
