"use client"
import { Chat } from "@/components/Chat"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

import { cn } from "@/lib/utils"

function ChatContent() {
  const params = useSearchParams()
  const skill = params.get("skill")
  const skillLevel = params.get("skillLevel")
  const time = params.get("time")

  const initialPrompt = `Generate a roadmap to learn ${skill} at a ${skillLevel} level in ${time}. The roadmap should be easy to follow and should be able to be completed in the given time frame.`

  return <Chat initialPrompt={initialPrompt} />
}

export default function ChatPage() {
 
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen",
      )}
    >

      <Suspense fallback={<div>Loading...</div>}>
        <ChatContent />
      </Suspense>
    </div>
  )
}

