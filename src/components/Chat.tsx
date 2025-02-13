"use client"

import type { FormSchema } from "./RoadmapForm"
import type { z } from "zod"
import { CornerDownLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/ui/chat-bubble"
import { ChatMessageList } from "@/components/ui/chat-message-list"
import { ChatInput } from "@/components/ui/chat-input"
import { useChat } from "ai/react"

export function Chat({ formData }: { formData: z.infer<typeof FormSchema> }) {
  const initialPrompt = `Generate a roadmap to learn ${formData.skill} at a ${formData.skillLevel} level in ${formData.time}. The roadmap should be easy to follow and should be able to be completed in the given time frame.`

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content: "Hello! I'll help you create a learning roadmap. What would you like to learn?",
      },
      {
        id: "2",
        role: "user",
        content: initialPrompt,
      },
    ],
  })

  return (
    <div className="h-[600px] border bg-background rounded-lg flex flex-col">
      <div className="flex-1 overflow-hidden">
        <ChatMessageList>
          {messages.map((message) => (
            <ChatBubble key={message.id} variant={message.role === "user" ? "sent" : "received"}>
              <ChatBubbleAvatar
                className="h-8 w-8 shrink-0"
                src={
                  message.role === "user"
                    ? `https://avatar.iran.liara.run/public/30`
                    : `https://avatar.iran.liara.run/public/10`
                }
                fallback={message.role === "user" ? "US" : "AI"}
              />
              <ChatBubbleMessage variant={message.role === "user" ? "sent" : "received"}>
                {message.content}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}

          {isLoading && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar
                className="h-8 w-8 shrink-0"
                src="https://avatar.iran.liara.run/public/10"
                fallback="AI"
              />
              <ChatBubbleMessage isLoading />
            </ChatBubble>
          )}
        </ChatMessageList>
      </div>

      <div className="p-4 border-t">
        <form
          onSubmit={handleSubmit}
          className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
        >
          <ChatInput
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center p-3 pt-0 justify-between">
            <Button type="submit" size="sm" className="ml-auto gap-1.5">
              Send Message
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

