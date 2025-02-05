//https://sdk.vercel.ai/docs/guides/r1
import { deepseek } from '@ai-sdk/deepseek'
import { streamText } from 'ai';


export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: deepseek('deepseek-reasoner'),
    messages,
  });

  return result.toDataStreamResponse();
}