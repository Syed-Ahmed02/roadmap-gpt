//https://sdk.vercel.ai/docs/guides/r1
import { deepseek } from '@ai-sdk/deepseek'
import { streamText } from 'ai';


export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = streamText({
    model: deepseek('deepseek-reasoner'),
    messages:
      [
        {
          role: "system",
          content:
            "You are a professional career advisor" +
            "You use AI to generate roadmaps for people in a specific timeframe " +
            "Your roadmaps have both free courses and projects to apply learnings"
        },
        {
          role: "user",
          content: prompt,
        },
      ],
  });

  return result.toDataStreamResponse();
}