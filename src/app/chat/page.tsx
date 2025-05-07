"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { useChat } from "@ai-sdk/react";
import {
  Box,
  Button,
  Input,
  Avatar,
  AvatarBadge,
  VStack,
  HStack,
  Text,
  Heading,
  Spinner,
  IconButton,
  useToast,
  Flex,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  useColorModeValue,
  Spacer,
  Select,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import {
  Bot,
  User,
  Loader2,
  BarChartHorizontalBig,
  Paperclip,
  Upload,
  Send,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SidebarSwitch from "@/components/SidebarSwitch";
import { setSidebarFromPrompt } from "@/lib/store/useSidebar";
import { supaBrowser } from "@/lib/supabase/browser";

// Placeholder for context data fetched from API
interface ContextCardData {
  id: string;
  title: string;
  snippet: string;
}

// Mock context data
const mockContextCards: ContextCardData[] = [
  {
    id: "ctx1",
    title: "Patient History: J. Doe",
    snippet:
      "Last visit: 6 months ago. No allergies reported. Mentioned sensitivity...",
  },
  {
    id: "ctx2",
    title: "Document: Recall Policy",
    snippet:
      "Patients should be recalled every 6 months for standard check-up...",
  },
  {
    id: "ctx3",
    title: "Financials: Q1 Summary",
    snippet: "Total revenue $450k. Top procedures: Cleaning, Fillings...",
  },
];

// Define Persona type and options
type Persona = 'Default' | 'Financial Analyst' | 'Operations Manager' | 'Clinical Efficiency Expert' | 'Marketing Specialist' | 'Patient Experience Advocate';

const personas: Persona[] = [
  'Default',
  'Financial Analyst',
  'Operations Manager',
  'Clinical Efficiency Expert',
  'Marketing Specialist',
  'Patient Experience Advocate',
];

export default function ChatPage() {
  const [selectedPersona, setSelectedPersona] = useState<Persona>('Default');

  const { messages: aiMessages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      api: "/api/chat",
      body: {
        persona: selectedPersona,
      },
      onFinish: (message) => {
        const lastUserMessage = [...aiMessages, message]
          .reverse()
          .find((m) => m.role === "user");
        if (lastUserMessage) {
          setSidebarFromPrompt(lastUserMessage.content);
        }
      },
    });

  const scrollBoxRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [supabaseToken, setSupabaseToken] = useState<string | null>(null);
  const toast = useToast();

  // --- Background Styling Logic --- 
  // Store only gradients now
  const personaGradients: Record<Persona, { light: string; dark: string }> = {
    'Default': { 
       light: 'linear-gradient(to bottom right, gray.50, gray.100)', 
       dark: 'linear-gradient(to bottom right, gray.700, gray.900)' 
    },
    'Financial Analyst': { 
      light: 'linear-gradient(to bottom right, green.50, green.100)', 
      dark: 'linear-gradient(to bottom right, green.800, green.900)' 
    },
    'Operations Manager': { 
       light: 'linear-gradient(to bottom right, blue.50, blue.100)', 
       dark: 'linear-gradient(to bottom right, blue.800, blue.900)' 
     },
    'Clinical Efficiency Expert': { 
       light: 'linear-gradient(to bottom right, purple.50, purple.100)', 
       dark: 'linear-gradient(to bottom right, purple.800, purple.900)' 
     },
    'Marketing Specialist': { 
       light: 'linear-gradient(to bottom right, orange.50, orange.100)', 
       dark: 'linear-gradient(to bottom right, orange.800, orange.900)' 
     },
    'Patient Experience Advocate': { 
       light: 'linear-gradient(to bottom right, pink.50, pink.100)', 
       dark: 'linear-gradient(to bottom right, pink.800, pink.900)' 
     },
  };
  
  // Get the current gradient based on persona and color mode
  const currentBgGradient = useColorModeValue(personaGradients[selectedPersona].light, personaGradients[selectedPersona].dark);

  const cardBg = useColorModeValue('white', 'gray.700');
  const inputBg = useColorModeValue('white', 'gray.600');
  // -----------------------------

  useEffect(() => {
    if (scrollBoxRef.current) {
      scrollBoxRef.current.scrollTop = scrollBoxRef.current.scrollHeight;
    }
  }, [aiMessages, isLoading]);

  useEffect(() => {
    const supabase = supaBrowser();
    const fetchToken = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      if (sessionError) {
        console.error("Error getting Supabase session:", sessionError);
        toast({
          title: "Authentication Error",
          description: "Could not verify user session. Please refresh.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else if (session?.access_token) {
        setSupabaseToken(session.access_token);
        console.log("Supabase token fetched successfully.");
      } else {
        console.warn(
          "User not logged in (or session expired), cannot get auth token for upload.",
        );
      }
    };
    fetchToken();
  }, [toast]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleAttachFile = () =>
    toast({ title: "Info", description: "File attach TBD", status: "info" });
  const handleEmoji = () =>
    toast({ title: "Info", description: "Emoji picker TBD", status: "info" });

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!supabaseToken) {
      toast({
        title: "Upload Error",
        description: "Authentication token not available. Cannot upload file.",
        status: "error",
      });
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid File",
        description: "Please upload an Excel (.xls, .xlsx) or PDF file.",
        status: "error",
      });
      return;
    }

    setIsUploading(true);
    toast({
      title: "Uploading...",
      description: `Uploading ${file.name}...`,
      status: "info",
    });

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${supabaseToken}`,
        },
        body: formData,
      });

      const contentType = response.headers.get("content-type");
      if (!response.ok) {
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const errorResult = await response.json();
          throw new Error(
            errorResult.error || `HTTP error! status: ${response.status}`,
          );
        } else {
          const errorText = await response.text();
          console.error("Non-JSON error response:", errorText);
          throw new Error(
            `Server returned non-JSON error (status ${response.status}). Check server logs.`,
          );
        }
      }

      const result = await response.json();
      toast({
        title: "Upload Success",
        description: `${file.name} uploaded successfully! (${result.chunksCount} chunks created). Processing...`,
        status: "success",
      });
    } catch (err: any) {
      console.error("Upload error:", err);
      toast({
        title: "Upload Failed",
        description: `${err.message || "Unknown error"}`,
        status: "error",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handlePersonaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPersona(event.target.value as Persona);
    toast({
      title: `Persona Changed`,
      description: `Switched to ${event.target.value} persona.`,
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Flex h="calc(100vh - 4rem)" direction={{ base: 'column', md: 'row' }} gap={6} p={{ base: 2, md: 4 }}>
      <Flex 
         direction="column" 
         flexGrow={1} 
         p={4} 
         borderRadius="lg" 
         transition="background 0.5s ease-in-out" 
         bg={currentBgGradient}
         h="100%"
         overflow="hidden"
      >
        <VStack 
          flex={1}
          spacing={4}
          align="stretch"
          overflowY="auto"
          mb={4}
          ref={scrollBoxRef}
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {aiMessages.map((msg) => (
            <motion.div
              key={msg.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              style={{ width: '100%' }}
            >
              <Flex justify={msg.role === 'user' ? 'flex-end' : 'flex-start'}>
                <Box
                  bg={msg.role === 'user' ? 'teal.500' : 'gray.600'}
                  color="white"
                  px={4}
                  py={2}
                  borderRadius="lg"
                  maxW="80%"
                >
                  <Text>{msg.content}</Text>
                </Box>
              </Flex>
            </motion.div>
          ))}
          {isLoading && (
            <Flex key="loading" justifyContent="flex-start">
              <motion.div
                variants={itemVariants}
                style={{
                  display: "flex",
                  gap: "0.75rem",
                }}
              >
                <Avatar
                  size="sm"
                  bg="gray.800"
                  _dark={{ bg: "cyan.700" }}
                  icon={<Bot size="18px" color="white" />}
                />
                <Flex
                  alignItems="center"
                  bg="cyan.100"
                  _dark={{
                     bg: "cyan.700",
                     color: "white" 
                  }}
                  color="gray.800"
                  p={3}
                  borderRadius="lg"
                  shadow="md"
                  borderBottomLeftRadius="none"
                >
                  <Spinner size="sm" mr={2} />
                  Thinking...
                </Flex>
              </motion.div>
            </Flex>
          )}
        </VStack>

        <Flex as="form" onSubmit={handleSubmit} mt="auto" gap={2}>
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about your practice data..."
            isDisabled={isLoading || isUploading}
            flexGrow={1}
          />
          <IconButton
            aria-label="Attach file"
            icon={isUploading ? <Spinner size="sm" /> : <Paperclip />}
            onClick={handleAttachClick}
            isDisabled={isLoading || isUploading || !supabaseToken}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            accept=".pdf,.xls,.xlsx"
          />
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={isLoading}
            spinner={<></>}
            leftIcon={
              isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Send size="18px" />
              )
            }
          >
            Send
          </Button>
        </Flex>
      </Flex>

      <Flex
        flex={1}
        direction="column"
        p={4}
        borderLeftWidth={{ md: '1px' }}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        overflowY="auto"
        gap={4} 
        borderRadius="lg" 
        transition="background 0.5s ease-in-out"
        display={{ base: "none", md: "flex" }}
        bg={currentBgGradient}
      >
        <Flex justify="space-between" align="center">
          <Heading size="md">Dynamic Dashboard</Heading>
          <SidebarSwitch />
        </Flex>
        <FormControl>
          <FormLabel htmlFor="persona-select" fontSize="sm" fontWeight="bold">Select AI Persona:</FormLabel>
          <Select 
             id="persona-select"
             value={selectedPersona}
             onChange={handlePersonaChange}
             bg={inputBg}
             size="sm"
             borderRadius="md"
          >
             {personas.map(p => (
               <option key={p} value={p}>{p}</option>
             ))}
           </Select>
        </FormControl>
        <Text fontSize="sm" color="gray.500" mt={-2} mb={2}>
          Updates based on AI analysis of your query using the '{selectedPersona}' persona.
        </Text>
        <VStack align="stretch" spacing={3} overflowY="auto" flex={1}>
          {mockContextCards.map((card) => (
            <Card key={card.id} variant="outline">
              <CardHeader pb={1}>
                <Heading size="sm">{card.title}</Heading>
              </CardHeader>
              <CardBody pt={1}>
                <Text fontSize="sm" noOfLines={2}>
                  {card.snippet}
                </Text>
              </CardBody>
            </Card>
          ))}
          {mockContextCards.length === 0 && (
            <Text color="gray.500">No context available yet.</Text>
          )}
        </VStack>
      </Flex>
    </Flex>
  );
}
