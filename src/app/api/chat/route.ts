//https://sdk.vercel.ai/docs/guides/r1
import { deepseek } from '@ai-sdk/deepseek'
import { streamText } from 'ai';



export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: deepseek('deepseek-chat'),
    prompt: messages[messages.length - 1].content,
    system:
      "You are a professional career advisor. You use AI to generate roadmaps for people in a specific timeframe. Your roadmaps have both free courses and projects to apply learnings.",
  })

  return result.toDataStreamResponse();
}