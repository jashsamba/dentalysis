"use client";

import React, { createContext, useContext, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Session } from "@supabase/supabase-js"; // Import Session type
import { registerChartComponents } from "@/lib/chart-utils";
import { ChakraProvider } from "@chakra-ui/react"; // Import ChakraProvider

// 1. Create Session Context
interface SessionContextProps {
  session: Session | null;
}

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined,
);

// Props for the Providers component now include session
interface ProvidersProps {
  children: React.ReactNode;
  session: Session | null; // Add session prop
}

// Optional: Define a custom theme if needed
// const theme = extendTheme({
//   config: {
//     initialColorMode: 'light',
//     useSystemColorMode: false,
//   },
//   // Add custom colors, fonts, etc. here
// });

export default function Providers({ children, session }: ProvidersProps) {
  // Create a single instance of QueryClient per application render
  // Using useState ensures it's not recreated on every render
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Default staleTime can be adjusted here if needed
            staleTime: 5 * 60 * 1000, // 5 minutes
            refetchOnWindowFocus: false, // Optional: disable refetch on window focus
          },
        },
      }),
  );

  // Register chart components once on client-side
  useEffect(() => {
    registerChartComponents();
  }, []);

  return (
    // Wrap everything with ChakraProvider
    <ChakraProvider /* theme={theme} // Pass custom theme here if defined */ >
      <SessionContext.Provider value={{ session }}>
        <QueryClientProvider client={queryClient}>
          {children}
          {/* Optional: Add React Query DevTools for debugging */}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SessionContext.Provider>
    </ChakraProvider>
  );
}

// 3. Custom hook to use the Session Context
export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error(
      "useSession must be used within a SessionProvider (included in Providers)",
    );
  }
  return context;
};
