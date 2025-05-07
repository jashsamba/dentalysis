"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers';
// Import the read/write App Router server client
import { supaServerApp } from "@/lib/supabase/server-app"; 

// Sign Up Action
export async function signUp(formData: FormData) {
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const firstName = String(formData.get("firstName")); // Assuming these are passed
  const lastName = String(formData.get("lastName")); // Assuming these are passed

  // Input validation (basic - consider Zod on the server too for robustness)
  if (!email || !password || !firstName || !lastName) {
    return { error: "Missing required fields for sign up." };
  }
  if (password.length < 6) {
    return { error: "Password must be at least 6 characters long." };
  }

  const cookieStore = await cookies();
  const supabase = supaServerApp(cookieStore);

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // Add email confirmation redirect if needed
      // emailRedirectTo: `${origin}/auth/callback`,
      data: {
        // Store additional user data here if needed
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    console.error("Sign Up Error:", error);
    // Provide a more user-friendly message if possible
    const errorMessage = error.message.includes("User already registered")
      ? "This email is already registered. Please sign in."
      : `Sign up failed: ${error.message}`;
    return { error: errorMessage };
  }

  // Revalidate path or redirect if needed after successful sign-up (e.g., after email confirmation)
  // revalidatePath('/', 'layout'); // Example revalidation
  // For now, just return success, assuming email verification is needed
  return { success: true };
}

// Sign In Action
export async function signIn(formData: FormData) {
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const cookieStore = await cookies();
  const supabase = supaServerApp(cookieStore);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Sign In Error:", error);
    // Check for specific errors like invalid credentials
    const errorMessage = error.message.includes("Invalid login credentials")
      ? "Invalid email or password."
      : `Sign in failed: ${error.message}`;
    return { error: errorMessage };
  }

  // Revalidate the root layout and potentially other paths to reflect logged-in state
  revalidatePath("/", "layout");

  // IMPORTANT: Server Actions cannot directly redirect after POST requests due to Next.js limitations.
  // The redirect should happen on the client-side based on the success response.
  // See the updated AuthPage component.
  // We return success here, and the client handles the redirect.
  return { success: true };

  // Previous attempt with redirect - often problematic in Server Actions
  // try {
  //   redirect('/dashboard');
  // } catch (redirectError: any) {
  //   // Next.js throws NEXT_REDIRECT internally, handle if necessary, but usually ignored
  //   if (redirectError.message !== 'NEXT_REDIRECT') {
  //     console.error("Redirect failed:", redirectError);
  //     return { error: "Sign in succeeded, but redirect failed." };
  //   }
  //   // If it IS NEXT_REDIRECT, the redirect is happening.
  //   // Still, client-side redirect is more reliable after form posts.
  // }
}

// Sign Out Action (Example)
export async function signOut() {
  const cookieStore = await cookies();
  const supabase = supaServerApp(cookieStore);
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Sign Out Error:", error);
    // Optionally return error to UI, though sign out usually just redirects
    return { error: `Sign out failed: ${error.message}` };
  }

  revalidatePath("/", "layout"); // Revalidate to update UI state
  redirect("/auth"); // Redirect to login page after sign out
}