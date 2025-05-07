// src/lib/env.client.ts  (safe for "use client" components)

// Ensure these are read at build time and embedded
const clientSchema = {
  NEXT_PUBLIC_SUPABASE_URL      : process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
} as const;

// Basic validation to ensure variables are present during build
if (!clientSchema.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL in environment variables.');
}
if (!clientSchema.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY in environment variables.');
}

export const envClient = clientSchema; // no secrets here 