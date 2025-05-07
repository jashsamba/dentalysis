import { z } from 'zod';

const serverSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  OPENAI_API_KEY:            z.string().min(1),
  NEXT_PUBLIC_SUPABASE_URL:  z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

let s: z.infer<typeof serverSchema>;

try {
  s = serverSchema.parse(process.env);
} catch (error) {
  console.error("Failed to parse server environment variables:", error);
  // Provide default values or re-throw, depending on desired handling
  // For now, we'll throw to indicate a critical configuration error
  throw new Error("Missing or invalid server environment variables.");
}


export const envServer = {
  supabaseUrl : s.NEXT_PUBLIC_SUPABASE_URL,
  anonKey     : s.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  serviceKey  : s.SUPABASE_SERVICE_ROLE_KEY,
  openAiKey   : s.OPENAI_API_KEY,
};

// Optional debug log
console.log('[env.server] Loaded vars:',
  { url: envServer.supabaseUrl,
    anon: envServer.anonKey?.slice(0,6)+'…',
    service: !!envServer.serviceKey,
    openai: !!envServer.openAiKey }); 