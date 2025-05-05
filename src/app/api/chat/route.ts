import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from "ai"

export const maxDuration = 60;

export async function POST(req: Request) {
  const { augmentedPrompt } = await req.json()
  const result = streamText({
    model: anthropic("claude-3-7-sonnet-20250219"),
    prompt: augmentedPrompt,
    system:
      `You are a professional career advisor.
       You use AI to generate roadmaps for people based on how many hours they have per week to dedicate. 
       Your roadmaps have both free courses and projects to apply learnings. 
       Use the provided context to give specific and relevant recommendations.
       The roadmap should not be longer then 12 weeks.
      `,
  })

  return result.toDataStreamResponse()
}