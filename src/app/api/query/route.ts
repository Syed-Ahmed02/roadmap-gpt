import { NextResponse } from "next/server"
import { Pinecone } from "@pinecone-database/pinecone"

export async function POST(req: Request) {
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY as string,
  })

  const body = await req.text()
  const { queryVector } = JSON.parse(body)

  const index = pinecone.index("roadmap-gpt")

  const queryResponse = await index.query({
    vector: queryVector,
    topK: 1,
    includeMetadata: true,
  })

  const metadata = queryResponse?.matches?.[0]?.metadata
  return NextResponse.json({ metadata })
}

