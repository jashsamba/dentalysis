import { NextRequest, NextResponse } from "next/server";
import { supaServerApp, supaServiceRole } from "@/lib/supabase/server-app"; // Import the service role client helper
import * as XLSX from "xlsx";
import pdf from "pdf-parse"; // Use default import

// Config for Vercel to allow larger request bodies for file uploads if needed
// export const config = {
//   api: {
//     bodyParser: false, // Required for FormData parsing
//   },
// };

// Helper function to chunk text
// TODO: Improve chunking strategy (e.g., overlap, sentence boundaries)
function chunkText(text: string, chunkSize: number = 1000): string[] {
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.substring(i, i + chunkSize));
  }
  return chunks;
}

export const runtime = "edge"; // Keep edge runtime if possible, check compatibility

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate the user using the correct App Router client
    const supabaseUserClient = supaServerApp();
    const {
      data: { session },
      error: sessionError,
    } = await supabaseUserClient.auth.getSession();

    if (sessionError) {
      console.error("Upload API - Session Error:", sessionError);
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 500 },
      );
    }
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    // TODO: Get actual dentist ID associated with the user
    const dentistId = "placeholder-dentist-id";

    // 2. Get the file from the request
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Basic validation (add more as needed: size, type)
    if (file.size === 0) {
      return NextResponse.json({ error: "File is empty" }, { status: 400 });
    }

    // 3. Use Service Role Client to upload to storage (bypasses RLS)
    const supabaseAdmin = supaServiceRole();
    const filePath = `dentist-docs/${dentistId}/${userId}/${Date.now()}-${file.name}`;

    const { data, error: uploadError } = await supabaseAdmin.storage
      .from("dentalysis-bucket") // Replace with your actual bucket name
      .upload(filePath, file);

    if (uploadError) {
      console.error("Upload API - Storage Error:", uploadError);
      return NextResponse.json(
        { error: `Failed to upload file: ${uploadError.message}` },
        { status: 500 },
      );
    }

    console.log("Upload successful:", data);

    // 4. TODO: Optionally, insert metadata about the upload into your database
    // (e.g., link filePath to the dentist/user in the `documents` table)
    // Use supabaseUserClient or supabaseAdmin depending on RLS policies for the documents table

    return NextResponse.json({ success: true, path: data?.path });
  } catch (error) {
    console.error("Upload API - General Error:", error);
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    return NextResponse.json(
      { error: `Internal Server Error: ${message}` },
      { status: 500 },
    );
  }
}
