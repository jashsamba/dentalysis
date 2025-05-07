// ONLY for App-Router Server Components, Route Handlers, Server Actions
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'; // Import type
import { cookies } from "next/headers"; // Keep this for supaServiceRole potentially
import { envServer } from "../env.server"; // New import

// --- Server Components (Read-Only) --- 
// Use this in Server Components (Pages, Layouts) for reading session/data
// Pass the cookie store obtained from cookies()
export const supaServerAppReadOnly = (cookieStore: ReadonlyRequestCookies) => {
  // const cookieStore = cookies(); // Removed: Get store outside
  return createServerClient(
    envServer.supabaseUrl, // New
    envServer.anonKey, // New
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        // Read-only client doesn't need set/remove
      },
    }
  );
  // Optional: Pass Database type if generated: createServerClient<Database>(...)
};

// --- Server Actions / Route Handlers (Read/Write) --- 
// Use this in Server Actions and Route Handlers where mutations might occur
// Pass the cookie store obtained from cookies()
export const supaServerApp = (cookieStore: ReadonlyRequestCookies) => {
  // const cookieStore = cookies(); // Removed: Get store outside
  return createServerClient(
    envServer.supabaseUrl, // New
    envServer.anonKey, // New
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // Use the passed store directly
           cookieStore.set({ name, value, ...options });
        },
         remove(name: string, options: CookieOptions) {
          // Use the passed store directly
           cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
  // Optional: Pass Database type if generated: createServerClient<Database>(...)
};

// Note: The service role client doesn't depend on next/headers, 
// so it could stay here or be moved to its own file (e.g., server-admin.ts)
export const supaServiceRole = () => {
  const { createClient } = require("@supabase/supabase-js");
  return createClient(envServer.supabaseUrl, envServer.serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}; 