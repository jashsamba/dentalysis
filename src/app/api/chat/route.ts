// Import the OpenAI provider factory, core functions
import { createOpenAI } from "@ai-sdk/openai";
import { streamText, embed } from "ai";
// Import Next.js server types
import { NextRequest, NextResponse } from "next/server";
// Import ALL prompts
import { DENTAI_SYSTEM_PROMPT } from "./system-prompt";
import { FINANCIAL_ANALYST_PROMPT } from "./financial-analyst-prompt";
import { OPERATIONS_MANAGER_PROMPT } from "./operations-manager-prompt";
import { CLINICAL_EFFICIENCY_PROMPT } from "./clinical-efficiency-prompt";
import { MARKETING_SPECIALIST_PROMPT } from "./marketing-specialist-prompt";
import { PATIENT_EXPERIENCE_PROMPT } from "./patient-experience-prompt";
// Import Supabase clients for edge function auth
import { supaServerApp } from "@/lib/supabase/server-app"; // Removed supaServiceRole if not needed
import { envServer } from "@/lib/env.server";
// import type { SupabaseClient } from "@supabase/supabase-js"; // Removed if getContext is not used
import { cookies } from 'next/headers'; // <-- Import cookies

// Specify the Vercel Edge Runtime
export const runtime = "edge";

// Create separate OpenAI provider instances for chat and embedding
const openaiChat = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || envServer.openAiKey,
});

const openaiEmbed = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || envServer.openAiKey,
});

// --- Main API Route Handler (POST) ---
export async function POST(req: NextRequest) {
  try {
    const { messages, persona = 'Default' } = await req.json();
    // const lastMessage = messages[messages.length - 1]; // Not needed if not using RAG
    // const userQuery = lastMessage.content; // Not needed if not using RAG

    // --- Auth Check (keep as is) --- 
    const cookieStore = await cookies(); 
    const supabase = supaServerApp(cookieStore);
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response("Unauthorized", { status: 401 });
    }
    // --- End Auth Check ---

    // TODO: Replace with actual dentist ID retrieval based on user session
    const dentist_id = "your-placeholder-dentist-id"; // Placeholder
    console.log(
      `Authenticated user: ${user.id}, Dentist ID (placeholder): ${dentist_id}`,
    );

    /* // --- Context Retrieval (If using RAG) ---
    // Commenting out as the system prompt is now static from the import
    // const contextText = await getContext(userQuery, dentist_id, supabase); // Pass the correct client
    const contextText =
      "No relevant documents found yet (RAG not fully implemented).";
    */

    // Select the appropriate prompt based on persona
    let systemPrompt = DENTAI_SYSTEM_PROMPT; // Default prompt
    switch (persona) {
      case 'Financial Analyst':
        systemPrompt = FINANCIAL_ANALYST_PROMPT;
        break;
      case 'Operations Manager':
        systemPrompt = OPERATIONS_MANAGER_PROMPT;
        break;
      case 'Clinical Efficiency Expert':
        systemPrompt = CLINICAL_EFFICIENCY_PROMPT;
        break;
      case 'Marketing Specialist':
        systemPrompt = MARKETING_SPECIALIST_PROMPT;
        break;
      case 'Patient Experience Advocate':
        systemPrompt = PATIENT_EXPERIENCE_PROMPT;
        break;
      // Default case already handled by initial assignment
    }

    // --- Generating AI Response --- Use the selected systemPrompt
    const result = await streamText({
      model: openaiChat.chat(process.env.OPENAI_MODEL || "gpt-4o-mini"),
      system: systemPrompt, // <-- Use the selected prompt
      messages: messages,
    });

    return result.toDataStreamResponse();

    /* // Old OpenAI SDK approach
    const prompt = [
      {
        role: "system",
        content: `You are a helpful AI assistant for dentists. Use the provided context to answer the user's query concisely. Context: ${contextText}`,
      },
      ...messages, // Include chat history
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Or your preferred model
      stream: true,
      messages: prompt,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
    */
  } catch (error) {
    console.error("Chat API Error:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { error: `Internal Server Error: ${errorMessage}` },
      { status: 500 },
    );
  }
}

// --- CORS Preflight Request Handler (OPTIONS) ---
// Handles OPTIONS requests sent by browsers before the actual POST request
// to check CORS permissions.
export async function OPTIONS(req: NextRequest) {
  // Respond with allowed origins, methods, and headers
  return new Response(null, {
    status: 204, // No Content status
    headers: {
      "Access-Control-Allow-Origin":
        process.env.NEXT_PRIVATE_ALLOW_ORIGIN || "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
