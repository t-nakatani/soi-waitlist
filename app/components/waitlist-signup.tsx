"use client"

import { WaitlistForm } from "./waitlist-form"
import { Button } from "@/components/ui/button"
import { ArrowRight, Loader2 } from "lucide-react"
import { Avatar } from "./avatar"

interface WaitlistSignupProps {
  onPreviewClick: () => void
  waitlistCount: number
  isWaitlistFull?: boolean
  isLoading?: boolean
  onSuccess: (count: number, waitlistFull?: boolean) => void
  hidePreviewButton?: boolean
}

export function WaitlistSignup({
  onPreviewClick,
  waitlistCount,
  isWaitlistFull = false,
  isLoading = false,
  onSuccess,
  hidePreviewButton = false,
}: WaitlistSignupProps) {
  return (
    <div className="w-full max-w-xl mx-auto p-4 md:p-8">
      <div className="flex flex-col justify-center items-center text-center">
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-gray-700 to-gray-900">
            あなたが読んだ記事をAIが整理
          </h2>
        </div>
        <div>
          <p className="text-base md:text-lg lg:text-xl mb-8 text-gray-600">
            Soiは、あなたが読んだ記事をAIが自動的にテーマごとに整理し、必要な時にすぐに見つけられるようにするツールです。
          </p>
        </div>
        <div className="w-full">
          <WaitlistForm onSuccess={onSuccess} isWaitlistFull={isWaitlistFull} />
        </div>
        <div className="flex items-center justify-center mt-8">
          <div className="flex -space-x-2 mr-4">
            <Avatar index={0} />
            <Avatar index={1} />
            <Avatar index={2} />
          </div>
          {isLoading ? (
            <div className="flex items-center text-gray-600">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              <span>読み込み中...</span>
            </div>
          ) : (
            <p className="text-gray-800 font-semibold">{waitlistCount}人のユーザーがいます</p>
          )}
        </div>

        {!hidePreviewButton && (
          <div className="mt-8">
            <Button
              onClick={onPreviewClick}
              variant="outline"
              className="group border-gray-300 hover:border-blue-500 transition-colors"
            >
              <span>プレビューを見る</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

