"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { joinWaitlist } from "../actions/waitlist"
import { useState, useEffect, useRef } from "react"

interface WaitlistFormProps {
  onSuccess: (count: number, waitlistFull?: boolean) => void
  isWaitlistFull?: boolean
}

export function WaitlistForm({ onSuccess, isWaitlistFull = false }: WaitlistFormProps) {
  const [state, formAction, isPending] = useActionState(joinWaitlist, null)
  const [email, setEmail] = useState("")
  const processedStateRef = useRef<string | null>(null)

  // Handle form submission result
  useEffect(() => {
    // Skip if state is null or we've already processed this exact state
    if (!state || processedStateRef.current === JSON.stringify(state)) {
      return
    }

    // Mark this state as processed
    processedStateRef.current = JSON.stringify(state)

    if (state.success) {
      toast.success(state.message, {
        duration: 5000,
      })

      setEmail("")

      onSuccess(state.count || 0, state.waitlistFull)
    } else if (state.success === false) {
      toast.error(state.message, {
        duration: 5000,
      })
    }
  }, [state, onSuccess])

  return (
    <div className="w-full space-y-4 mb-8">
      <form action={formAction} className="w-full">
        <div className="flex overflow-hidden rounded-xl bg-white p-1 ring-1 ring-gray-200 focus-within:ring-2 focus-within:ring-blue-500">
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="メールアドレスを入力"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isWaitlistFull}
            className="w-full border-0 bg-transparent text-gray-800 placeholder:text-gray-400 focus:ring-0 focus:border-transparent focus-visible:border-transparent focus:outline-none active:ring-0 active:outline-none focus-visible:ring-0 focus-visible:outline-none active:border-transparent focus-visible:ring-offset-0"
          />
          <Button
            type="submit"
            disabled={isPending || isWaitlistFull}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 rounded-xl transition-all duration-300 ease-in-out focus:outline-none w-[120px]"
          >
            {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : isWaitlistFull ? "満員" : "登録する"}
          </Button>
        </div>
        {isWaitlistFull && (
          <p className="text-amber-600 text-sm mt-2">
            現在のウェイトリストは満員です。次の枠が解放されるまでお待ちください。
          </p>
        )}
      </form>
    </div>
  )
}

