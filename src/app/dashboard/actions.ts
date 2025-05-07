"use server";

import OpenAI from "openai";
import Papa from "papaparse";
// Attempt to use the server client, despite its linter errors
// NOTE: This might need adjustment if the client setup issues persist at runtime.
import { createClient as createServerSupabaseClient } from "@/lib/supabase/server";

// Ensure the API key is loaded from environment variables
// IMPORTANT: Ensure OPENAI_API_KEY is set in your .env.local file
if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY environment variable");
}

// Initialize the OpenAI client with the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// --- DEPRECATED ---
// This function is replaced by the new RAG-based chat API endpoint (/api/chat)
// which utilizes vector search over documents and conversations.
// export async function getKnowledgeBaseAnswer(question: string): Promise<string> { ... }

// --- OBSOLETE ---
// This function relied on the old 'financial_records' table which is removed
// in the new schema based on the architecture plan.
// Financial data is now potentially part of 'appointments' or needs a different structure.
// export async function uploadFinancialData(formData: FormData): Promise<{ message?: string; error?: string }> { ... }

/**
 * Fetches an answer from the OpenAI API based on the user's question,
 * using a prompt designed for a dental knowledge base assistant.
 *
 * @param question The question string submitted by the user.
 * @returns A promise that resolves to a string containing the AI's answer, or an error message.
 */
export async function getKnowledgeBaseAnswer(
  question: string,
): Promise<string> {
  console.log(`Sending question to OpenAI: "${question}"`);

  // --- Use OpenAI API ---
  try {
    // Construct the prompt for the AI model
    const prompt = `
      You are an AI assistant specifically designed for dental professionals. Your name is DentAI. 
      You provide concise, accurate, and informative answers to questions related to dentistry, dental procedures, terminology, materials, and general oral health topics. 
      Do not provide medical advice, diagnoses, or treatment plans for specific patients. Focus on factual information. 
      Keep your answers professional and easy to understand for a dental professional.

      Question: ${question}

      Answer:
    `;

    // Call the OpenAI Chat Completions API
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Or use "gpt-4" if preferred and available
      messages: [
        {
          role: "system",
          content: "You are a helpful dental assistant named DentAI.",
        }, // System message to further reinforce the role
        { role: "user", content: prompt },
      ],
      temperature: 0.5, // Lower temperature for more factual/less creative answers
      max_tokens: 250, // Limit the response length
    });

    // Extract the answer from the response
    const answer = response.choices[0]?.message?.content?.trim();

    if (answer) {
      console.log("Received answer from OpenAI.");
      return answer;
    } else {
      console.error("OpenAI response did not contain an answer.", response);
      return "Sorry, I couldn't get a proper answer from the AI.";
    }
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    // Provide a user-friendly error message
    // Avoid exposing raw error details to the client if possible
    return "Sorry, there was an error communicating with the AI service. Please try again later.";
  }
  // --- End OpenAI API ---
}

/**
 * Parses an uploaded CSV file containing financial data and inserts it into the Supabase database.
 * Expected CSV header: Date,Category,Description,Amount
 *
 * @param formData The FormData object containing the uploaded file.
 * @returns A promise resolving to an object with success/error message.
 */
export async function uploadFinancialData(
  formData: FormData,
): Promise<{ message?: string; error?: string }> {
  const file = formData.get("financialCsvFile") as File;

  if (!file) {
    return { error: "No file received." };
  }

  if (file.type !== "text/csv") {
    return { error: "Invalid file type. Please upload a CSV." };
  }

  // Initialize Supabase client for server-side operations
  // NOTE: Using the potentially problematic client from lib/supabase/server
  const supabase = createServerSupabaseClient();

  // Check user authentication
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "User not authenticated." };
  }

  try {
    // Read file content
    const fileText = await file.text();

    // Parse CSV data
    const parseResult = Papa.parse(fileText, {
      header: true, // Assumes first row is header
      skipEmptyLines: true,
      dynamicTyping: false, // Keep amounts as strings for now to handle currency symbols etc.
    });

    if (parseResult.errors.length > 0) {
      console.error("CSV Parsing errors:", parseResult.errors);
      // Provide a more specific error if possible
      return { error: `Error parsing CSV: ${parseResult.errors[0].message}` };
    }

    const parsedData = parseResult.data as any[];
    if (parsedData.length === 0) {
      return { error: "CSV file is empty or contains no valid data rows." };
    }

    // Validate and transform data for insertion
    const recordsToInsert = parsedData.map((row, index) => {
      // Basic validation - adjust column names based on your expected CSV header
      const dateStr = row.Date || row.date;
      const category = row.Category || row.category;
      const description = row.Description || row.description;
      let amountStr = row.Amount || row.amount;

      if (!dateStr || !amountStr) {
        throw new Error(
          `Missing required data (Date or Amount) in row ${index + 2}.`,
        ); // +2 for header and 0-index
      }

      // Attempt to parse the date (accept common formats, be robust)
      const recordDate = new Date(dateStr);
      if (isNaN(recordDate.getTime())) {
        throw new Error(
          `Invalid date format "${dateStr}" in row ${index + 2}. Use YYYY-MM-DD or similar.`,
        );
      }

      // Clean and parse amount (remove currency symbols, commas)
      amountStr = String(amountStr).replace(/[^\d.-]/g, "");
      const amount = parseFloat(amountStr);
      if (isNaN(amount)) {
        throw new Error(
          `Invalid amount format "${row.Amount || row.amount}" in row ${index + 2}.`,
        );
      }

      return {
        record_date: recordDate.toISOString().split("T")[0], // Format as YYYY-MM-DD for DATE type
        category: category || null, // Use null if empty
        description: description || null, // Use null if empty
        amount: amount,
        // user_id is set by default policy or RLS, no need to set explicitly here typically
      };
    });

    // Insert data into Supabase
    const { error: insertError } = await supabase
      .from("financial_records")
      .insert(recordsToInsert);

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return { error: `Database error: ${insertError.message}` };
    }

    console.log(
      `Successfully inserted ${recordsToInsert.length} financial records.`,
    );
    return {
      message: `Successfully uploaded and inserted ${recordsToInsert.length} records.`,
    };
  } catch (error: any) {
    console.error("Error processing financial data upload:", error);
    return {
      error: error.message || "An unexpected error occurred during processing.",
    };
  }
}
