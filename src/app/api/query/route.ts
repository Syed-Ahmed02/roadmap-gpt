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
    topK: 5,
    includeMetadata: true,
  })

  const metadata = queryResponse.matches?.map(match => match.metadata) || []
  return NextResponse.json({ metadata })
}

