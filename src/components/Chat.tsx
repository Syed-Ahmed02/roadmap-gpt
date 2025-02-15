"use client"
import type { FormSchema } from "./RoadmapForm"
import type { z } from "zod"
import { CornerDownLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/ui/chat-bubble"
import { ChatMessageList } from "@/components/ui/chat-message-list"
import { ChatInput } from "@/components/ui/chat-input"
import { useChat } from "ai/react"
import ReactMarkdown from "react-markdown"
import remarkGfm from 'remark-gfm'
import StyledMarkdown from "./StyledMarkdown"

import { generatePromptEmbedding, getEmbeddingMetadata } from "@/utils/apiCalls"
export function Chat({ formData }: { formData: z.infer<typeof FormSchema> }) {
  const initialPrompt = `Generate a roadmap to learn ${formData.skill} at a ${formData.skillLevel} level in ${formData.time}. The roadmap should be easy to follow and should be able to be completed in the given time frame.`

  const { messages, input, handleInputChange, handleSubmit: originalHandleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content: "Hello! I'll help you create a learning roadmap. What would you like to learn?",
      },
    ],
    initialInput: initialPrompt,
  })

  const handleEnhancedSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (input.trim().length === 0) {
      return
    }

    try {
      console.log('Submitting message:', input)

      // Embedding and Pinecone indexing logic
      const embedding = await generatePromptEmbedding(input);
      if (!embedding.error) {
        const metadata = await getEmbeddingMetadata(embedding.embedding!)

        const formattedContexts = metadata.length > 0
          ? metadata.map((context: { source: string; text: string }) => `
            Source: ${context?.source}
            Text: ${context?.text}
          `).join('\n')
          : "No relevant context found."

        const augmentedPrompt = `
        Context from knowledge base:
        ${formattedContexts}

        User query:
        ${input}

        Based on the above context and the user's query, provide a detailed response.
      `

        // Send the processed data to the API endpoint
        await originalHandleSubmit(e, { body: { augmentedPrompt } })
      }
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }
  return (
    <div className="h-[600px] border bg-background rounded-lg flex flex-col w-full min-w-[320px] md:min-w-full max-w-4xl mx-auto">
      <div className="flex-1 overflow-hidden ">
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
                <StyledMarkdown content={message.content} />
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
      <div className="p-4 border-t ">
        <form
          onSubmit={handleEnhancedSubmit}
          className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
        >
          <ChatInput
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center p-3 pt-0 justify-between">
            <Button
              type="submit"
              size="sm"
              className="ml-auto gap-1.5"
              disabled={isLoading || input.trim().length === 0}
            >
              Send Message
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}