import { deepseek } from "@ai-sdk/deepseek"
import { streamText } from "ai"

export const maxDuration = 60;

export async function POST(req: Request) {
  const { augmentedPrompt } = await req.json()
  const result = streamText({
    model: deepseek("deepseek-chat"),
    prompt: augmentedPrompt,
    system:
      "You are a professional career advisor. You use AI to generate roadmaps for people in a specific timeframe. Your roadmaps have both free courses and projects to apply learnings. Use the provided context to give specific and relevant recommendations.",
  })

  return result.toDataStreamResponse()
}