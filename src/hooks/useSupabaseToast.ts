"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import {
  SupabaseClient,
  PostgrestError,
  AuthError,
} from "@supabase/supabase-js";

// Type guard to check if an error is a PostgrestError
function isPostgrestError(error: any): error is PostgrestError {
  return (
    error && typeof error.message === "string" && typeof error.code === "string"
  );
}

// Type guard to check if an error is an AuthError
function isAuthError(error: any): error is AuthError {
  return (
    error && error.name === "AuthApiError" && typeof error.message === "string"
  );
}

// Update the accepted error type to include string
type SupabaseToastError =
  | Error
  | PostgrestError
  | AuthError
  | string
  | null
  | undefined;

// Hook to display Supabase errors using sonner toast
export function useSupabaseToast(error: SupabaseToastError) {
  useEffect(() => {
    if (error) {
      let errorMessage = "An unexpected error occurred.";

      if (typeof error === "string") {
        errorMessage = error; // Directly use the string
      } else if (isPostgrestError(error)) {
        // Customize message based on common Postgres codes if desired
        console.error("Supabase Postgrest Error:", error);
        errorMessage = `Database error: ${error.message} (Code: ${error.code})`;
      } else if (isAuthError(error)) {
        console.error("Supabase Auth Error:", error);
        // Customize message based on auth error status/message
        errorMessage = `Authentication error: ${error.message}`;
      } else if (error instanceof Error) {
        // Generic JS Error
        console.error("Generic Error:", error);
        errorMessage = error.message;
      }

      toast.error(errorMessage); // Display the error toast
    }
  }, [error]); // Rerun effect when the error object changes
}

// Example Usage (in a component):
// import { useSupabaseToast } from '@/hooks/useSupabaseToast';
//
// function MyComponent() {
//   const [error, setError] = useState<AuthError | null>(null);
//
//   useSupabaseToast(error);
//
//   const handleAction = async () => {
//      const { error: actionError } = await someSupabaseAction();
//      if (actionError) {
//          setError(actionError);
//      }
//   }
//
//   return <button onClick={handleAction}>Do Action</button>;
// }
