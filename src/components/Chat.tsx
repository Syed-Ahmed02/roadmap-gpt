"use client";

import { CornerDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat-message-list";
import { ChatInput } from "@/components/ui/chat-input";
import { useEffect, useState } from "react";
import StyledMarkdown from "./StyledMarkdown";
import {
  generatePromptEmbedding,
  getEmbeddingMetadata,
} from "@/utils/apiCalls";
import { RoadmapSchema } from "@/app/api/chat/schema";
import { experimental_useObject as useObject } from "@ai-sdk/react";

type ChatProps = {
  initialPrompt: string;
};

export function Chat({ initialPrompt }: ChatProps) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { object, submit } = useObject({
    api: "/api/chat",
    schema: RoadmapSchema,
  });

  useEffect(() => {
    console.log("Raw object:", object);
    console.log("Object type:", typeof object);
    console.log("Is array?", Array.isArray(object));
  }, [object]);

  const processPrompt = async (prompt: string) => {
    if (prompt.trim().length === 0) return;

    try {
      setIsLoading(true);
      const embedding = await generatePromptEmbedding(prompt);
      if (!embedding.error) {
        const metadata = await getEmbeddingMetadata(embedding.embedding!);

        const formattedContexts =
          metadata.length > 0
            ? metadata
                .map(
                  (context: { source: string; text: string }) => `
            Source: ${context?.source}
            Text: ${context?.text}
          `
                )
                .join("\n")
            : "No relevant context found.";

        const augmentedPrompt = `
        Context from knowledge base:
        ${formattedContexts}

        User query:
        ${prompt}

        Based on the above context and the user's query, provide a detailed response.
        `;

        submit({ augmentedPrompt });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialPrompt) {
      setInput(initialPrompt);
      processPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  const handleEnhancedSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await processPrompt(input);
    setInput("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="border bg-background flex flex-col w-full mx-auto h-screen">
      <div className="flex-1 overflow-hidden">
      <ChatMessageList smooth={true}  >
          {object?.weekNumber?.map((message,index) => (
            <ChatBubble key={index} variant={ "received"}>
              <ChatBubbleAvatar
                className="h-8 w-8 shrink-0"
                src={
                 
                     `https://avatar.iran.liara.run/public/10`
                }
                fallback={ "AI"}
              />
              <ChatBubbleMessage variant={"received"}>
                <StyledMarkdown content={message?.content || ""} />
              </ChatBubbleMessage>
            </ChatBubble>
          ))}
          {isLoading && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar
                className="h-8 w-8 shrink-0"
                src="https://avatar.iran.liara.run/public/10"
                fallback="AI"
              />
              <ChatBubbleMessage isLoading />
            </ChatBubble>
          )}
        </ChatMessageList>
      </div>
      <div className="p-4 border-t">
        <form
          onSubmit={handleEnhancedSubmit}
          className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
        >
          <ChatInput
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center p-3 pt-0 justify-between">
            <Button
              type="submit"
              size="sm"
              className="ml-auto gap-1.5"
              disabled={isLoading || input.trim().length === 0}
            >
              Send Message
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
