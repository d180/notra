"use client";

import { PaintBoardIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@notra/ui/components/ui/button";
import { Textarea } from "@notra/ui/components/ui/textarea";
import { TitleCard } from "@notra/ui/components/ui/title-card";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface AiChatSidebarProps {
  contentTitle: string;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function AiChatSidebar({ contentTitle }: AiChatSidebarProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "system-1",
      role: "assistant",
      content: `I'm here to help you with "${contentTitle}". Ask me anything about this content!`,
    },
  ]);

  const chatMutation = useMutation({
    mutationFn: async (allMessages: ChatMessage[]) => {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: allMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to get response");
      }
      return res.json();
    },
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: data.message || "Sorry, I couldn't process that request.",
        },
      ]);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: "AI chat is not yet connected. This feature is coming soon!",
        },
      ]);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || chatMutation.isPending) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    chatMutation.mutate([...messages, userMessage]);
  };

  return (
    <TitleCard
      className="flex h-full flex-col"
      contentClassName="flex-1 overflow-hidden"
      heading={
        <span className="flex items-center gap-2">
          <HugeiconsIcon icon={PaintBoardIcon} />
          AI Assistant
        </span>
      }
    >
      <div className="grid h-full grid-rows-[1fr_auto] gap-4 overflow-hidden p-1">
        <div className="-m-1 space-y-4 overflow-y-auto p-1">
          {messages.map((message) => (
            <div
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              key={message.id}
            >
              <div
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 text-foreground"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {chatMutation.isPending && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-lg bg-muted/50 px-3 py-2 text-sm">
                <span className="animate-pulse">Thinking...</span>
              </div>
            </div>
          )}
        </div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <Textarea
            className="min-h-[60px] resize-none"
            disabled={chatMutation.isPending}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about this content..."
            value={input}
          />
          <Button
            className="w-full"
            disabled={chatMutation.isPending || !input.trim()}
            type="submit"
          >
            {chatMutation.isPending ? "Sending..." : "Send"}
          </Button>
        </form>
      </div>
    </TitleCard>
  );
}
