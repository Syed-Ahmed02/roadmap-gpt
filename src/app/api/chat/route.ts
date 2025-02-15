import { deepseek } from "@ai-sdk/deepseek"
import { streamText } from "ai"
import { Pinecone } from "@pinecone-database/pinecone"
import { openai } from "@ai-sdk/openai"
import { embed } from "ai"

export const runtime = "nodejs"

export async function POST(req: Request) {
  const { messages } = await req.json()
  const userMessage = messages[messages.length - 1].content

  // 1. Generate embedding for the user's query
  const { embedding } = await embed({
    model: openai.embedding("text-embedding-3-small"),
    value: userMessage,
  })

  // 2. Query Pinecone for relevant context
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY as string,
  })
  console.log("embedding", embedding)
  const index = pinecone.index("roadmap-gpt")
  const queryResponse = await index.query({
    vector: embedding,
    topK: 5,
    includeMetadata: true,
  })
  const relevantContexts = queryResponse.matches?.map(match => match.metadata) || []
console.log(relevantContexts)

// Format the relevant contexts
const formattedContexts = relevantContexts.length > 0
  ? relevantContexts.map(context => `
      Source: ${context?.source}
      Text: ${context?.text}
    `).join('\n')
  : "No relevant context found."

const augmentedPrompt = `
  Context from knowledge base:
  ${formattedContexts}

  User query:
  ${userMessage}

  Based on the above context and the user's query, provide a detailed response.
`
console.log(augmentedPrompt)
  const result = streamText({
    model: deepseek("deepseek-chat"),
    prompt: augmentedPrompt,
    system:
      "You are a professional career advisor. You use AI to generate roadmaps for people in a specific timeframe. Your roadmaps have both free courses and projects to apply learnings. Use the provided context to give specific and relevant recommendations.",
  })

  return result.toDataStreamResponse()
}