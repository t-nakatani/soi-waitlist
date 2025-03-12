"use client"

import { useState, useEffect } from "react"
import { WaitlistSignup } from "./components/waitlist-signup"
import { AppPreview } from "./components/app-preview"
import { Toaster } from "./components/ui/sonner"
import { getWaitlistSize } from "./actions/waitlist"

const backgroundStyle = `
  .bg-pattern {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px);
    background-size: 20px 20px;
    pointer-events: none;
    z-index: 1;
  }

  .content {
    position: relative;
    z-index: 2;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .fade-in {
    animation: fadeIn 0.6s ease-out forwards;
  }

  .fade-in-delay-1 {
    animation: fadeIn 0.6s ease-out 0.2s forwards;
    opacity: 0;
  }

  .fade-in-delay-2 {
    animation: fadeIn 0.6s ease-out 0.4s forwards;
    opacity: 0;
  }
`

export default function Home() {
  const [showPreview, setShowPreview] = useState(false)
  const [waitlistCount, setWaitlistCount] = useState(0)
  const [isWaitlistFull, setIsWaitlistFull] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch the initial waitlist size
  useEffect(() => {
    async function fetchWaitlistSize() {
      try {
        const { size, isFull } = await getWaitlistSize()
        setWaitlistCount(size)
        setIsWaitlistFull(isFull)
      } catch (error) {
        console.error("Failed to fetch waitlist size:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWaitlistSize()
  }, [])

  const handleSuccess = async (count: number, waitlistFull?: boolean) => {
    // Update waitlist full status if provided
    if (waitlistFull !== undefined) {
      setIsWaitlistFull(waitlistFull)
    }

    // If count is 0 (already registered or waitlist full), refresh the count
    if (count === 0) {
      const { size, isFull } = await getWaitlistSize()
      setWaitlistCount(size)
      setIsWaitlistFull(isFull)
    } else {
      // Otherwise, increment by the count (usually 1)
      setWaitlistCount((prev) => prev + count)
    }
  }

  const handlePreviewClick = () => {
    setShowPreview(true)
  }

  return (
    <main
      className="min-h-screen"
      style={{
        background: "radial-gradient(circle at center, #f8fafc, #ffffff)",
      }}
    >
      <style jsx global>
        {backgroundStyle}
      </style>
      <div className="bg-pattern"></div>
      <div className="content w-full">
        <div className="container mx-auto px-4 py-8">
          {!showPreview ? (
            // Initial centered layout without preview
            <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
              <div className="w-full max-w-xl fade-in">
                <WaitlistSignup
                  onPreviewClick={handlePreviewClick}
                  waitlistCount={waitlistCount}
                  isWaitlistFull={isWaitlistFull}
                  isLoading={isLoading}
                  onSuccess={handleSuccess}
                />
              </div>
            </div>
          ) : (
            // Layout with preview after button click
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="w-full lg:w-1/2 fade-in">
                <WaitlistSignup
                  onPreviewClick={handlePreviewClick}
                  waitlistCount={waitlistCount}
                  isWaitlistFull={isWaitlistFull}
                  isLoading={isLoading}
                  onSuccess={handleSuccess}
                  hidePreviewButton={true}
                />
              </div>

              <div className="w-full lg:w-1/2 fade-in-delay-1">
                <AppPreview isVisible={true} />
              </div>
            </div>
          )}
        </div>
      </div>
      <Toaster position="bottom-right" />
    </main>
  )
}

