"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Box,
  Flex,
  VStack,
  Textarea,
  Button,
  IconButton,
  Avatar,
  useToast,
  Spinner,
  Heading,
  Icon,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import {
  Send,
  Paperclip,
  Copy,
  Check,
  Bot,
  User,
  Loader2,
  FolderKanban,
  Settings,
  FileText,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// import { toast } from "sonner"; // Removed sonner

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
}

type SendMessageFunction = (
  prompt: string,
) => Promise<{ answer?: string; error?: string }>;
const callChatApi: SendMessageFunction = async (prompt) => {
  console.log("Calling mock API with prompt:", prompt);
  await new Promise((resolve) => setTimeout(resolve, 1500));
  if (Math.random() > 0.8) {
    return { error: "Failed to get response from AI (mock error)." };
  } else {
    return {
      answer: `This is a **mock response** to your prompt: "${prompt}".\n\nHere's a list:\n- Item 1\n- Item 2\n\n\`\`\`javascript\nconsole.log("Hello, world!");\n\`\`\``,
    };
  }
};
export default function AiChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "ai",
      content:
        "Hello! How can I help you analyze your dental practice data today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const scrollBoxRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const toast = useToast(); // Chakra Toast

  useEffect(() => {
    if (scrollBoxRef.current) {
      scrollBoxRef.current.scrollTop = scrollBoxRef.current.scrollHeight;
    }
  }, [messages]);
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };
  const handleSendMessage = useCallback(async () => {
    const prompt = inputValue.trim();
    if (!prompt || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: prompt,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    requestAnimationFrame(() => {
      if (textAreaRef.current) {
        textAreaRef.current.style.height = "auto";
      }
    });

    const aiPlaceholderId = (Date.now() + 1).toString();
    const aiPlaceholder: Message = {
      id: aiPlaceholderId,
      role: "ai",
      content: "...",
    };
    setMessages((prev) => [...prev, aiPlaceholder]);

    const result = await callChatApi(prompt);

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === aiPlaceholderId
          ? {
              ...msg,
              content:
                result.answer || `Error: ${result.error || "Unknown error"}`,
            }
          : msg,
      ),
    );

    if (result.error) {
      toast({ title: "API Error", description: result.error, status: "error" });
    }

    setIsLoading(false);
  }, [inputValue, isLoading, toast]); // Added toast to dependency array

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopy = (textToCopy: string, messageId: string) => {
    if (!navigator.clipboard) {
      toast({
        title: "Clipboard Error",
        description: "Clipboard access not available or denied.",
        status: "error",
      });
      return;
    }
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopiedMessageId(messageId);
        toast({ title: "Copied!", status: "success", duration: 2000 });
        setTimeout(() => setCopiedMessageId(null), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        toast({
          title: "Copy Error",
          description: "Failed to copy message.",
          status: "error",
        });
      });
  };
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file);
      toast({
        title: "File Selected",
        description: `Selected file: ${file.name}. Upload logic TBD.`,
        status: "info",
      });
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <Flex h="100vh" bg="gray.100" _dark={{ bg: "gray.900" }}>
      {/* Main Chat Area */}
      <Flex direction="column" flexGrow={1} h="full">
        <Flex
          as="header"
          align="center"
          justify="space-between"
          h={16}
          px={6}
          borderBottomWidth="1px"
          bg="white"
          _dark={{ bg: "gray.800", borderColor: "gray.700" }}
        >
          <Heading size="md">Dentalysis AI Chat</Heading>
          {/* Add any header controls here if needed */}
        </Flex>

        {/* Chat History - Use Box with overflow */}
        <Box
          flexGrow={1}
          p={{ base: 4, md: 6 }}
          overflowY="auto"
          bg="gray.50"
          _dark={{ bg: "gray.850" }} // Custom color if needed
          ref={scrollBoxRef}
        >
          <VStack spacing={6} maxW="4xl" mx="auto" pb={4}>
            {messages.map((message) => (
              <Flex
                key={message.id}
                w="full"
                justify={message.role === "user" ? "flex-end" : "flex-start"}
              >
                <Flex maxW="75%" alignItems="flex-start" gap={3}>
                  {message.role === "ai" && (
                    <Avatar
                      size="sm"
                      icon={<Icon as={Bot} boxSize={4} />}
                      bg="blue.500"
                    />
                  )}
                  <Box
                    position="relative"
                    className="group" // Keep group for potential hover effects
                    rounded="lg"
                    p={3}
                    shadow="sm"
                    bg={message.role === "user" ? "blue.600" : "white"}
                    color={message.role === "user" ? "white" : undefined}
                    _dark={{
                      bg: message.role === "user" ? "blue.500" : "gray.700",
                      color: message.role === "user" ? "white" : "gray.50",
                    }}
                  >
                    {message.role === "ai" &&
                      message.content === "..." &&
                      isLoading && <Spinner size="sm" />}
                    {message.content !== "..." && (
                      <Box
                        fontSize="sm"
                        sx={{
                          "& p": { my: 1 },
                          "& ul": { my: 1, pl: 4 },
                          "& li": { mb: 0.5 },
                        }}
                      >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {message.content}
                        </ReactMarkdown>
                      </Box>
                    )}
                    {message.role === "ai" && message.content !== "..." && (
                      <IconButton
                        aria-label="Copy message"
                        icon={
                          copiedMessageId === message.id ? (
                            <Icon as={Check} color="green.500" />
                          ) : (
                            <Icon as={Copy} />
                          )
                        }
                        size="xs"
                        isRound
                        variant="ghost"
                        position="absolute"
                        top={-1}
                        right={-1}
                        opacity={0}
                        _groupHover={{ opacity: 1 }}
                        transition="opacity 0.2s"
                        onClick={() => handleCopy(message.content, message.id)}
                        bg="gray.200"
                        _hover={{ bg: "gray.300" }}
                        _dark={{ bg: "gray.600", _hover: { bg: "gray.500" } }}
                      />
                    )}
                  </Box>
                  {message.role === "user" && (
                    <Avatar
                      size="sm"
                      icon={<Icon as={User} boxSize={4} />}
                      bg="gray.300"
                      color="gray.800"
                    />
                  )}
                </Flex>
              </Flex>
            ))}
          </VStack>
        </Box>

        {/* Input Zone */}
        <Box
          p={{ base: 4, md: 6 }}
          borderTopWidth="1px"
          bg="white"
          _dark={{ bg: "gray.800", borderColor: "gray.700" }}
        >
          <Box
            maxW="4xl"
            mx="auto"
            bg="white"
            rounded="xl"
            borderWidth="1px"
            shadow="sm"
            position="relative"
            p={2}
            pr="calc(3.5rem + 0.75rem)"
            _dark={{
              bg: "gray.700",
              borderColor: "gray.600",
            }}
          >
            {/* Adjust padding for buttons */}
            <Textarea
              ref={textAreaRef}
              placeholder="Ask about patient data, financial trends, or practice SOPs... (Shift+Enter for newline)"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              isDisabled={isLoading}
              rows={1}
              variant="unstyled" // Remove default border/focus rings
              p={2} // Internal padding
              pl={10} // Padding left for potential icon
              minH="52px" // Ensure min height
              maxH="200px" // Limit max height
              resize="none"
              _focusVisible={{ boxShadow: "none" }} // Remove focus ring
              fontSize="sm"
              _dark={{ color: "gray.50" }}
            />
            {/* Absolute positioning for buttons inside the padded Box */}
            <Flex position="absolute" bottom={2} right={2} gap={1}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                accept=".pdf,.csv,.xlsx,.txt,image/*"
              />
              <IconButton
                aria-label="Attach file"
                icon={<Icon as={Paperclip} boxSize={5} />}
                size="sm"
                variant="ghost"
                isRound
                color="gray.500"
                _hover={{ bg: "blue.100", color: "blue.600" }}
                _dark={{
                  color: "gray.400",
                  _hover: { bg: "gray.600", color: "blue.300" },
                }}
                onClick={handleUploadClick}
                isDisabled={isLoading}
                title="Attach file"
              />
              <IconButton
                aria-label="Send message"
                icon={<Icon as={Send} boxSize={5} />}
                size="sm"
                isRound
                colorScheme="blue"
                onClick={handleSendMessage}
                isDisabled={isLoading || !inputValue.trim()}
                title="Send message"
              />
            </Flex>
          </Box>
        </Box>
      </Flex>

      {/* Right Sidebar */}
      <Flex
        as="aside"
        direction="column"
        w={72}
        borderLeftWidth="1px"
        bg="white"
        _dark={{ bg: "gray.800", borderColor: "gray.700" }}
        display={{ base: "none", md: "flex" }}
      >
        <CardHeader
          p={4}
          borderBottomWidth="1px"
          _dark={{ borderColor: "gray.700" }}
        >
          <Heading size="sm">Workspaces / Context</Heading>
        </CardHeader>
        <Box flexGrow={1} overflowY="auto">
          <CardBody p={2}>
            <VStack spacing={1} align="stretch">
              {/* Replace placeholder Buttons */}
              <Button
                variant="ghost"
                justifyContent="flex-start"
                gap={2}
                bg="blue.100"
                color="blue.600"
                fontWeight="semibold"
                _dark={{
                  bg: "blue.900",
                  color: "blue.300",
                }}
              >
                <Icon as={FolderKanban} boxSize={4} /> Current Chat
              </Button>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                gap={2}
                _hover={{ bg: "gray.100" }}
                _dark={{ _hover: { bg: "gray.700" } }}
              >
                <Icon as={FileText} boxSize={4} /> Document Collection A
              </Button>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                gap={2}
                _hover={{ bg: "gray.100" }}
                _dark={{ _hover: { bg: "gray.700" } }}
              >
                <Icon as={FolderKanban} boxSize={4} /> Financial Analysis Chat
              </Button>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                gap={2}
                _hover={{ bg: "gray.100" }}
                _dark={{ _hover: { bg: "gray.700" } }}
              >
                <Icon as={FileText} boxSize={4} /> SOP Manual v3
              </Button>
            </VStack>
          </CardBody>
        </Box>
        <Box
          mt="auto"
          p={2}
          borderTopWidth="1px"
          _dark={{ borderColor: "gray.700" }}
        >
          <Button
            variant="ghost"
            w="full"
            justifyContent="flex-start"
            gap={2}
            _hover={{ bg: "gray.100" }}
            _dark={{ _hover: { bg: "gray.700" } }}
          >
            <Icon as={Settings} boxSize={4} /> Settings
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
}
