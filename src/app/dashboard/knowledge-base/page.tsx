"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  VStack,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  IconButton,
  useToast,
  Spinner,
  Icon, // For using lucide icons within Chakra components
} from "@chakra-ui/react";
import { Loader2, AlertCircle, Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// Remove sonner toast
// import { toast } from \"sonner\";

interface HistoryItem {
  id: number;
  question: string;
  answer?: string;
  error?: string;
}

export default function KnowledgeBasePage() {
  const [question, setQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [copiedAnswerId, setCopiedAnswerId] = useState<number | null>(null);
  const lastQuestionRef = useRef<HTMLDivElement>(null);
  const toast = useToast(); // Initialize Chakra toast

  useEffect(() => {
    lastQuestionRef.current?.scrollIntoView({ behavior: "smooth" });
    return;
  }, [history]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
    if (e.target.value.trim() !== "") {
      setCurrentAnswer(null);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) return;

    setIsLoading(true);
    setCurrentAnswer(null);
    setError(null);

    const newHistoryItem: HistoryItem = {
      id: Date.now(),
      question: trimmedQuestion,
    };
    setHistory((prev) => [...prev, newHistoryItem]);
    setQuestion("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmedQuestion }),
      });

      if (!response.ok) {
        let errorMsg = `Error: ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMsg = errorData.error || errorMsg;
        } catch (jsonError) {
          /* Ignore */
        }
        throw new Error(errorMsg);
      }

      const result = await response.json();
      const answer = result.answer;

      if (!answer) {
        throw new Error("Received empty answer from AI");
      }

      setCurrentAnswer(answer);
      setHistory((prev) =>
        prev.map((item) =>
          item.id === newHistoryItem.id ? { ...item, answer: answer } : item,
        ),
      );
    } catch (err: any) {
      console.error("Error calling chat API:", err);
      const errorMsg = err.message || "An unexpected error occurred.";
      setError(errorMsg);
      setHistory((prev) =>
        prev.map((item) =>
          item.id === newHistoryItem.id ? { ...item, error: errorMsg } : item,
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (textToCopy: string, historyId: number) => {
    if (!navigator.clipboard) {
      toast({
        title: "Clipboard Error",
        description: "Clipboard access is not available or denied.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopiedAnswerId(historyId);
        setTimeout(() => setCopiedAnswerId(null), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        toast({
          title: "Copy Error",
          description: "Failed to copy answer to clipboard.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex
      direction="column"
      h="calc(100vh - 100px)"
      className="container mx-auto p-4 md:p-6 lg:p-8"
    >
      <Card
        display="flex"
        flexDirection="column"
        flexGrow={1}
        variant="outline"
      >
        <CardHeader>
          {/* Use Chakra Heading for title */}
          <Heading size="lg">AI Knowledge Base</Heading>
          {/* Use Chakra Text for description */}
          <Text color="gray.500" mt={1}>
            Ask a question to get information from the AI assistant. History is
            shown below.
          </Text>
        </CardHeader>

        {/* Scrollable History Area - Use Box with overflowY */}
        <Box
          flexGrow={1}
          p={4}
          borderTopWidth="1px"
          borderBottomWidth="1px"
          overflowY="auto"
        >
          <VStack spacing={4} align="stretch">
            {history.map((item) => (
              <Box
                key={item.id}
                ref={history.at(-1)?.id === item.id ? lastQuestionRef : null}
              >
                {/* User Question - Use Flex and Box */}
                <Flex justify="flex-end" mb={2}>
                  <Box
                    bg="blue.500"
                    color="white"
                    px={3}
                    py={2}
                    rounded="lg"
                    maxW="75%"
                  >
                    <Text>{item.question}</Text>
                  </Box>
                </Flex>

                {/* AI Answer or Error */}
                {item.answer && (
                  <Flex
                    justify="flex-start"
                    alignItems="flex-start"
                    className="group"
                  >
                    <Box
                      bg="gray.100"
                      _dark={{ bg: "gray.700" }}
                      px={3}
                      py={2}
                      rounded="lg"
                      maxW="75%"
                      sx={{
                        // Basic prose-like styles, customize as needed
                        "& p": { my: 2 },
                        "& ul": { my: 2, pl: 4 },
                        "& li": { mb: 1 },
                      }}
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {item.answer}
                      </ReactMarkdown>
                    </Box>
                    <IconButton
                      aria-label="Copy answer"
                      variant="ghost"
                      size="sm"
                      ml={2}
                      // Chakra doesn't have group-hover directly on IconButton,
                      // opacity might need different approach or be always visible
                      // For simplicity, let's make it always visible for now
                      // opacity={0} _groupHover={{ opacity: 1 }} transition="opacity 0.2s"
                      onClick={() => handleCopy(item.answer!, item.id)}
                      icon={
                        copiedAnswerId === item.id ? (
                          <Icon as={Check} color="green.500" />
                        ) : (
                          <Icon as={Copy} />
                        )
                      }
                    />
                  </Flex>
                )}
                {item.error && (
                  <Alert status="error" mt={2} maxW="75%" borderRadius="md">
                    <AlertIcon />
                    <Box flex="1">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{item.error}</AlertDescription>
                    </Box>
                  </Alert>
                )}
                {/* Thinking indicator */}
                {isLoading &&
                  history.at(-1)?.id === item.id &&
                  !item.answer &&
                  !item.error && (
                    <Flex justify="flex-start" alignItems="center">
                      <Flex
                        bg="gray.100"
                        _dark={{ bg: "gray.700" }}
                        px={3}
                        py={2}
                        rounded="lg"
                        alignItems="center"
                      >
                        <Spinner size="sm" mr={2} />
                        <Text as="span">Thinking...</Text>
                      </Flex>
                    </Flex>
                  )}
              </Box>
            ))}
            {history.length === 0 && (
              <Text color="gray.500" textAlign="center">
                No questions asked yet.
              </Text>
            )}
          </VStack>
        </Box>

        {/* Input Area - Use CardFooter or Box */}
        <Box p={4}>
          {" "}
          {/* Changed from CardContent pt-4 */}
          {error && !isLoading && (
            <Alert status="error" mb={4} borderRadius="md">
              <AlertIcon />
              <Box flex="1">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Box>
            </Alert>
          )}
          <Flex as="form" onSubmit={handleSubmit} gap={2}>
            <Input
              placeholder="Ask DentAI..."
              value={question}
              onChange={handleInputChange}
              isDisabled={isLoading}
              flexGrow={1}
            />
            <Button
              type="submit"
              isDisabled={isLoading || !question.trim()}
              isLoading={isLoading}
              loadingText="Asking..."
              colorScheme="blue"
              spinnerPlacement="start"
            >
              Ask AI
            </Button>
          </Flex>
        </Box>
      </Card>
    </Flex>
  );
}
