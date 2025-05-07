'use server'

// import { createServerActionClient } from '@supabase/auth-helpers-nextjs' // Deprecated
import { createServerClient, type CookieOptions } from '@supabase/ssr' // Use this instead and import CookieOptions
import { cookies } from 'next/headers'
import { z } from 'zod'

// Zod Schemas for validation
const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
})

const SignupSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  // Add other signup fields and validation as needed (e.g., confirm password)
})

// Login Server Action
export async function loginUser(formData: unknown) {
  const cookieStore = cookies() // Get cookies within the action
  const validatedFields = LoginSchema.safeParse(formData)

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid form data.',
      issues: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validatedFields.data

  // Create Supabase client, passing cookieStore directly
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string): string | undefined {
          const cookie = cookieStore.get(name)
          return cookie?.value
        },
        set(name: string, value: string, options: CookieOptions): void {
          try {
            cookieStore.set(name, value, options)
          } catch (error) {
            // Handle error (e.g., if called from incompatible context)
          }
        },
        remove(name: string, options: CookieOptions): void {
          try {
            cookieStore.delete(name, options)
          } catch (error) {
            // Handle error
          }
        },
      },
    }
  )

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('Supabase Login Error:', error.message)
    // Provide a more generic error message to the user
    return { success: false, error: 'Invalid login credentials.' }
  }

  // On successful login, Supabase handles the session cookie automatically.
  // The client-side will redirect based on this success response.
  return { success: true, redirectTo: '/dashboard' } // Or desired redirect path
}

// Signup Server Action
export async function signupUser(formData: unknown) {
  const cookieStore = cookies() // Get cookies within the action
  const validatedFields = SignupSchema.safeParse(formData)

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid form data.',
      issues: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validatedFields.data

  // Create Supabase client, passing cookieStore methods correctly
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
       cookies: {
        get(name: string): string | undefined {
          const cookie = cookieStore.get(name)
          return cookie?.value
        },
        set(name: string, value: string, options: CookieOptions): void {
          try {
             cookieStore.set(name, value, options)
          } catch (error) {
             // Handle error
          }
        },
        remove(name: string, options: CookieOptions): void {
          try {
             cookieStore.delete(name, options)
          } catch (error) {
            // Handle error
          }
        },
      },
    }
  )

  const { error } = await supabase.auth.signUp({
    email,
    password,
    // Add options for email confirmation if needed
  })

  if (error) {
    console.error('Supabase Signup Error:', error.message)
    // Provide a more generic error message to the user
    if (error.message.includes('User already registered')) {
       return { success: false, error: 'An account with this email already exists.' }
    }
    return { success: false, error: 'Could not create account. Please try again.' }
  }

  // On successful signup, Supabase handles the session cookie (if auto-confirm is on)
  // Or sends a confirmation email. Adapt the response as needed.
  // Assuming auto-confirm for now.
  return { success: true, redirectTo: '/dashboard' } // Or '/check-email' if confirmation needed
} 