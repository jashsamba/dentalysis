import { useState, useCallback } from "react";
import chatHistoryData from "@/mocks/chatHistory.json";

export interface ChatMessage {
  id: string;
  role: "user" | "ai";
  content: string;
}

export interface UseChatOptions {
  initialMessages?: ChatMessage[];
  // Add other options like API endpoint, onResponse, onError etc. later
}

export interface UseChatReturn {
  messages: ChatMessage[];
  input: string;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  // Add stream handling functions later
}

// Mock fetch function for chat response (simulates streaming)
const fetchMockChatResponse = async (
  prompt: string,
  onChunk: (chunk: string) => void,
): Promise<void> => {
  console.log("Sending prompt to mock backend:", prompt);
  await new Promise((resolve) => setTimeout(resolve, 500)); // Initial delay

  const response = `This is a simulated streaming response to "${prompt}". Here are some points: \n- Point one is important. \n- Point two requires action. \n- Point three is for information.`;
  const chunks = response.match(/.{1,10}/g) || []; // Split into small chunks

  for (const chunk of chunks) {
    await new Promise((resolve) => setTimeout(resolve, 50)); // Delay between chunks
    onChunk(chunk);
  }
};

// Custom hook for chat functionality
export function useChat(options: UseChatOptions = {}): UseChatReturn {
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO === "1";
  const initialMessages = isDemoMode
    ? (chatHistoryData.history as ChatMessage[])
    : options.initialMessages || [];
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInput(e.target.value);
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      if (!input.trim() || isLoading) return;

      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content: input,
      };
      setMessages((prev) => [...prev, userMessage]);
      const currentInput = input;
      setInput("");
      setIsLoading(true);

      let aiResponse = "";
      const aiMessageId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        { id: aiMessageId, role: "ai", content: "" },
      ]); // Add placeholder

      try {
        if (isDemoMode) {
          await fetchMockChatResponse(currentInput, (chunk) => {
            aiResponse += chunk;
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === aiMessageId ? { ...msg, content: aiResponse } : msg,
              ),
            );
          });
        } else {
          // TODO: Implement actual API call with Server-Sent Events (SSE)
          // const response = await fetch('/api/chat', { method: 'POST', body: JSON.stringify({ prompt: currentInput }) });
          // Handle streaming response here
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
          aiResponse = `(Real API response placeholder) You asked: "${currentInput}"`;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === aiMessageId ? { ...msg, content: aiResponse } : msg,
            ),
          );
        }
      } catch (error) {
        console.error("Chat API error:", error);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId
              ? { ...msg, content: "Error fetching response." }
              : msg,
          ),
        );
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading, isDemoMode],
  );

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  };
}
