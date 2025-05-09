import { anthropic } from "@ai-sdk/anthropic";
import { streamObject,streamText } from "ai";
import { RoadmapSchema } from "./schema";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { augmentedPrompt } = await req.json();
  console.log('Server received prompt:', augmentedPrompt);

  const result = streamObject({
    schema: RoadmapSchema,
    model: anthropic("claude-3-7-sonnet-20250219"),
    prompt: augmentedPrompt,
    system: `You are a professional career advisor.
       You use AI to generate roadmaps for people based on how many hours they have per week to dedicate. 
       Your roadmaps have both free courses and projects to apply learnings. 
       Use the provided context to give specific and relevant recommendations.
       The roadmap should not be longer then 12 weeks. 
       A single week can have multiple courses and resources,
       The output should be in the following JSON format:
       {
         "1": {
           "title": "Week 1 Title",
           "content": "Week 1 Content"
         },
         "2": {
           "title": "Week 2 Title",
           "content": "Week 2 Content"
         }
       }
       The title field is a string and the content field should be Markdown string of the content
      `,
      onError(event) {
        console.log(event.error)
      },
      onFinish(event){
        console.log(event.object)
      }
  });
  
  return result.toTextStreamResponse();
}
