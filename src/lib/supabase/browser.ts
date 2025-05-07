"use client"; // Ensure this file is treated as client-side

import { createBrowserClient } from "@supabase/ssr";
import { envClient } from '../env.client'; // New import

// Supabase client for client components (browser)
export const supaBrowser = () => {
  // Validate that env variables are available client-side
  if (!envClient.NEXT_PUBLIC_SUPABASE_URL || !envClient.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('Supabase URL or Anon Key is missing client-side.');
    // Depending on the desired behavior, you might return null, throw an error,
    // or return a non-functional client instance.
    // Returning null or throwing is generally safer to prevent unexpected behavior.
    throw new Error('Supabase client environment variables not configured correctly.');
  }
  return createBrowserClient(
    envClient.NEXT_PUBLIC_SUPABASE_URL,
    envClient.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
};
  // Optional: Pass Database type if generated: createBrowserClient<Database>(...) 