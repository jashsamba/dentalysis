# IMPLEMENT Mode: Error Resolution Plan

## Critical Dependency Issues

Based on thorough analysis of the error logs and code examination, we've identified multiple critical issues that need immediate attention. This plan outlines the specific steps to resolve these issues.

### 1. Fix Package Dependency Conflicts (BLOCKING)

#### Problem Analysis:

- The npm installation is failing with `ETARGET` error: `No matching version found for @radix-ui/react-navigation-menu@1.2.11`
- Multiple TypeScript definition conflicts between `@types/react@19.1.2` and expected versions
- Numerous peer dependency warnings indicating version incompatibilities

#### Implementation Steps:

1. **Update package.json for Radix UI compatibility:**

   ```json
   "@radix-ui/react-navigation-menu": "1.2.10", // Change from 1.2.11 to 1.2.10 which exists
   ```

2. **Pin TypeScript definitions to compatible versions:**

   ```json
   "@types/react": "18.2.48",        // Downgrade from 19.x to 18.x
   "@types/react-dom": "18.2.18",    // Downgrade from 19.x to 18.x
   ```

3. **Create Installation Script:**

   - Create a `setup.sh` or `setup.bat` file (depending on OS) containing:

   ```bash
   # Clean installation
   rm -rf node_modules
   rm package-lock.json

   # Install with legacy peer deps
   npm install --legacy-peer-deps
   ```

### 2. Fix Supabase Server Client Issues

#### Problem Analysis:

- The current `src/lib/supabase.ts` has issues with the `cookies()` function usage
- Error logs indicate TypeScript/linter errors related to the `cookies()` usage being synchronous

#### Implementation Steps:

1. **Update supaServer function:**

   ```typescript
   // Update the supaServer function to avoid direct cookies() access that causes issues
   export const supaServer = () => {
     // Getting cookies only when the function is called, not during module initialization
     try {
       const cookieStore = cookies();

       return createServerClient(env.supabaseUrl, env.anonKey, {
         cookies: {
           get(name: string) {
             return cookieStore.get(name)?.value;
           },
           set(name: string, value: string, options: CookieOptions) {
             try {
               cookieStore.set({ name, value, ...options });
             } catch (error) {
               // Handle cookie setting error gracefully
               console.warn(
                 `Supabase SSR Client: Error setting cookie "${name}"`,
                 error,
               );
             }
           },
           remove(name: string, options: CookieOptions) {
             try {
               cookieStore.set({ name, value: "", ...options });
             } catch (error) {
               // Handle cookie removal error gracefully
               console.warn(
                 `Supabase SSR Client: Error removing cookie "${name}"`,
                 error,
               );
             }
           },
         },
       });
     } catch (error) {
       // This will run if cookies() is called in a context where it's not available
       console.error("Supabase SSR Client: Error accessing cookies()", error);
       throw new Error(
         "Cannot access cookies() in this context. Use this function only in Server Components, Route Handlers, or Server Actions.",
       );
     }
   };
   ```

2. **Create a separate client for server actions:**

   ```typescript
   // Add this function for safer server action usage
   export const supaServerAction = async () => {
     const { cookies } = await import("next/headers");
     const cookieStore = cookies();

     return createServerClient(env.supabaseUrl, env.anonKey, {
       cookies: {
         get(name: string) {
           return cookieStore.get(name)?.value;
         },
         set(name: string, value: string, options: CookieOptions) {
           cookieStore.set({ name, value, ...options });
         },
         remove(name: string, options: CookieOptions) {
           cookieStore.set({ name, value: "", ...options });
         },
       },
     });
   };
   ```

### 3. Create Centralized Chart.js Registration Utility

#### Problem Analysis:

- Duplicate chart registration code across components
- Inconsistent registration of required chart elements

#### Implementation Steps:

1. **Create `src/lib/chart-utils.ts`:**

   ```typescript
   import {
     Chart,
     CategoryScale,
     LinearScale,
     PointElement,
     LineElement,
     BarElement,
     ArcElement,
     Title,
     Tooltip,
     Legend,
     Filler,
   } from "chart.js";

   // Register chart components once at the application level
   export function registerChartComponents() {
     Chart.register(
       CategoryScale,
       LinearScale,
       PointElement,
       LineElement,
       BarElement,
       ArcElement,
       Title,
       Tooltip,
       Legend,
       Filler,
     );
   }

   // Standard chart options to maintain consistency
   export const defaultLineChartOptions = {
     responsive: true,
     plugins: {
       legend: {
         position: "top" as const,
       },
       title: {
         display: true,
         text: "Chart Data",
       },
     },
     scales: {
       y: {
         beginAtZero: true,
       },
     },
   };

   export const defaultBarChartOptions = {
     responsive: true,
     plugins: {
       legend: {
         position: "top" as const,
       },
       title: {
         display: true,
         text: "Chart Data",
       },
     },
   };

   export const defaultPieChartOptions = {
     responsive: true,
     plugins: {
       legend: {
         position: "right" as const,
       },
     },
   };
   ```

2. **Add chart registration to providers component:**

   ```typescript
   // In src/components/providers.tsx
   'use client'
   import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
   import { useEffect } from 'react'
   import { registerChartComponents } from '@/lib/chart-utils'

   const queryClient = new QueryClient()

   export function Providers({ children }: { children: React.ReactNode }) {
     useEffect(() => {
       // Register chart components once on client-side
       registerChartComponents()
     }, [])

     return (
       <QueryClientProvider client={queryClient}>
         {children}
       </QueryClientProvider>
     )
   }
   ```

## Implementation Strategy

1. **Order of Fixes:**

   - First fix package.json and dependency issues
   - Then fix the Supabase server client
   - Finally implement the chart utility

2. **Testing Approach:**

   - After package.json changes, verify clean installation works
   - Test Supabase authentication flow with updated server client
   - Verify charts render correctly with centralized registration

3. **Fallback Plans:**
   - If package.json fixes don't resolve all issues, consider using yarn or pnpm as alternative package managers
   - If Supabase SSR client continues to have issues, use direct Supabase JS client as documented in systemPatterns.md
