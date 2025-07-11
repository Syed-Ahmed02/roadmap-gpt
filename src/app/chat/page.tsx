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
  const currentLevel = params.get("currentLevel")

  const timeMapping: { [key: string]: string } = {
    lessFive: "less than 5 hours",
    fiveToTen: "five to ten hours",
    tenToTwenty: "ten to twenty hours",
    twentyPlus: "more than 20 hours"
  }

  const readableTime = timeMapping[time || ""] || time

  const initialPrompt = `Create me a roadmap to learn ${skill} at a ${skillLevel} level. I only have ${readableTime} per week to learn. My current skills are ${currentLevel}. The roadmap should be easy to follow and I should be able to complete it within a maximum of 12 weeks.`

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