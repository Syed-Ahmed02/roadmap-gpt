import { NextRequest, NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai"
import { embed } from "ai";

export const POST = async (req: NextRequest) => {
    const body = await req.text();
    const { prompt } = JSON.parse(body);
    const { embedding} = await embed({
        model: openai.embedding('text-embedding-3-small'),
        value: prompt,
    });
    return NextResponse.json({ embedding});
}