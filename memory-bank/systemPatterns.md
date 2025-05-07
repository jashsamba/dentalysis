# System Patterns

## Dependency Management

- **Pattern**: Always use `--legacy-peer-deps` flag when installing new packages
  ```bash
  npm install <package-name> --legacy-peer-deps
  ```
- **Why**: Resolves dependency conflicts with React and other core libraries

## Supabase Integration

- **Pattern**: For server-side Supabase operations, prefer direct client over problematic server utility

  ```typescript
  // Prefer this approach in server actions
  import { createClient } from "@supabase/supabase-js";

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  ```

- **Why**: Avoids linter/TypeScript errors in the server-side client utility

## Authentication Flow

- **Pattern**: Use client-side redirection after server action completion

  ```typescript
  // Server action
  export async function signIn(formData: FormData) {
    // ... authentication logic
    return { success: true }; // Return result, don't redirect
  }

  // Client component
  const onSubmit = async (data) => {
    const result = await signIn(data);
    if (result.success) {
      router.push("/dashboard"); // Client-side redirect
    }
  };
  ```

- **Why**: More reliable than server-side redirect() in Next.js App Router

## Chart.js Setup

- **Pattern**: Register required chart elements and scales before use

  ```typescript
  import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
  } from "chart.js";

  // Register what you need
  Chart.register(CategoryScale, LinearScale, PointElement, LineElement);
  ```

- **Why**: Chart.js v3+ requires explicit registration of each chart component

## React Query Integration

- **Pattern**: Use QueryClientProvider at the layout level

  ```typescript
  // In providers.tsx
  'use client'
  import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

  const queryClient = new QueryClient()

  export function Providers({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    )
  }

  // In layout.tsx
  import { Providers } from '@/components/providers'

  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>
          <Providers>{children}</Providers>
        </body>
      </html>
    )
  }
  ```

- **Why**: Ensures all components have access to the QueryClient
