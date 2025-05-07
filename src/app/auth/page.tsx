"use client";

import { useState, useTransition, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation"; // Import useRouter
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldErrors } from "react-hook-form";
import * as z from "zod";
// import { toast } from "sonner"; // Remove Sonner toast
import type { AuthError } from "@supabase/supabase-js"; // Import AuthError type
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText, // Can use instead of description if needed
  Input,
  VStack,
  HStack,
  Text,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
  Icon, // For icons
  useToast, // Import Chakra toast hook
  Flex, // For layout
  Divider, // For visual separation
} from "@chakra-ui/react";
import { Loader2, AlertCircle, LogIn, UserPlus } from "lucide-react";

// Import server actions
import { signIn, signUp } from "./actions";
// Remove useSupabaseToast hook - replace with Chakra's useToast
// import { useSupabaseToast } from '@/hooks/useSupabaseToast';

// --- Define Zod Schemas ---
const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }), // Can relax min length for sign-in if desired
});

const signUpSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required." }),
    lastName: z.string().min(1, { message: "Last name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });

// Define types for form values based on schemas
type SignInFormValues = z.infer<typeof signInSchema>;
type SignUpFormValues = z.infer<typeof signUpSchema>;
// Use a union type or a conditional type for useForm if needed, or manage separately
// For simplicity, we'll pass the correct schema to the resolver based on mode.

// Define a type for the server action result
// Note: We're returning the string message directly now, not the full error object
type ActionResult = { success?: boolean; error?: string };

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [formVisible, setFormVisible] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMessage = searchParams.get("message");
  const [serverMessage, setServerMessage] = useState<string | null>(
    initialMessage,
  );
  const chakraToast = useToast(); // Initialize Chakra toast

  // Determine resolver based on mode
  const currentResolver = isSignUp
    ? zodResolver(signUpSchema)
    : zodResolver(signInSchema);

  // Initialize react-hook-form
  const form = useForm<SignUpFormValues | SignInFormValues>({
    resolver: currentResolver,
    // Set default values for ALL possible fields
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    mode: "onChange",
  });

  // Add fade-in effect on component mount
  useEffect(() => {
    setFormVisible(true);
  }, []);

  // Reset form when switching between Sign In / Sign Up
  useEffect(() => {
    form.reset();
    setServerMessage(null);
    // Update resolver when mode changes
    // This might require re-initializing the form or using a key prop on the Form component
    // Simpler approach: Let validation run on submit with the correct schema applied then.
  }, [isSignUp, form]);

  // --- Custom Toast Logic (Replaces useSupabaseToast) ---
  const showToast = (
    status: "info" | "warning" | "success" | "error" | "loading",
    title: string,
    description?: string,
  ) => {
    chakraToast({
      title: title,
      description: description,
      status: status,
      duration: 5000,
      isClosable: true,
      position: "bottom-left", // Match Sonner position
    });
  };

  // Handle form submission using server action
  const onSubmit = (values: SignInFormValues | SignUpFormValues) => {
    // Use union type
    setServerMessage(null);
    console.log("Form submitted. isSignUp:", isSignUp);
    console.log("Values submitted:", values);

    startTransition(async () => {
      console.log("Starting transition...");
      const formData = new FormData();
      formData.append("email", values.email!); // Email is always present
      formData.append("password", values.password!); // Password is always present

      let result: ActionResult | null = null;

      try {
        if (isSignUp) {
          // Values type is SignUpFormValues here due to conditional rendering/validation
          const signUpValues = values as SignUpFormValues;
          formData.append("firstName", signUpValues.firstName);
          formData.append("lastName", signUpValues.lastName);
          console.log("Calling signUp action...");
          result = await signUp(formData);
        } else {
          // Values type is SignInFormValues here
          console.log("Calling signIn action...");
          result = await signIn(formData);
        }
        console.log("Server action result:", result);

        // Handle result from server action
        if (result?.error) {
          console.log("Handling error from server action");
          showToast("error", "Authentication Error", result.error);
        } else if (result?.success) {
          console.log("Handling success from server action");
          if (isSignUp) {
            // Sign up success logic
            const successMsg =
              "Sign up successful! Check your email for confirmation."; // Standard message
            setServerMessage(successMsg);
            // Optionally show a temporary toast too
            // showToast("success", "Sign Up Successful", "Check your email for confirmation.");
            form.reset();
          } else {
            // Sign in was successful (no error returned)
            console.log("Sign in success on client, attempting redirect...");
            showToast("success", "Sign In Successful!");
            router.push("/dashboard"); // Redirect to dashboard
            console.log("Called router.push('/dashboard')");
          }
        } else {
          // Handle cases where action returns neither success nor error explicitly
          console.warn("Server action returned unexpected result:", result);
          showToast(
            "error",
            "Unexpected Error",
            "An unexpected response was received from the server.",
          );
        }
      } catch (clientError: any) {
        // Catch errors specifically happening on the client during the transition
        console.error(
          "Client-side error during onSubmit transition:",
          clientError,
        );
        let errorMsg = "A client-side error occurred.";
        if (clientError instanceof Error) {
          errorMsg = clientError.message;
        } else if (typeof clientError === "string") {
          errorMsg = clientError;
        }
        showToast("error", "Client Error", errorMsg);
      }
    });
  };

  return (
    <Flex
      className="container"
      minH="100vh"
      direction={{ base: "column", lg: "row" }}
    >
      {/* Left side - Branding - Using Chakra Flex & Box */}
      <Flex
        display={{ base: "none", lg: "flex" }}
        flex={1}
        direction="column"
        bgGradient="linear(to-br, blue.500, blue.700)"
        p={10}
        color="white"
        position="relative"
      >
        <Box position="absolute" inset={0} bg="black" opacity={0.2} />
        <Box zIndex={1} className="flex items-center text-lg font-medium">
          {/* <svg ... logo ... > */}
          Dentalysis
        </Box>
        <Box
          zIndex={1}
          mt="auto"
          borderLeft="4px"
          borderColor="blue.300"
          pl={4}
        >
          <Text fontSize="lg" fontWeight="medium">
            &ldquo;AI insights transforming dental practice management.&rdquo;
          </Text>
          <Text fontSize="sm" color="blue.100" as="footer">
            Dentalysis AI Team
          </Text>
        </Box>
      </Flex>

      {/* Right side - Auth Form - Using Chakra Flex & Box */}
      <Flex flex={1} p={{ base: 4, md: 8 }} align="center" justify="center">
        <Box
          w="full"
          maxW="sm"
          mx="auto"
          sx={{
            transition: "opacity 0.5s ease-in-out",
            opacity: formVisible ? 1 : 0,
          }}
        >
          <VStack spacing={4} align="stretch">
            <Box textAlign="center">
              <Heading size="lg" mb={1}>
                {isSignUp ? "Create Account" : "Welcome Back"}
              </Heading>
              <Text color="gray.500">
                {isSignUp
                  ? "Enter your details to join"
                  : "Enter your credentials to access your dashboard"}
              </Text>
            </Box>

            {/* Display messages from server actions OR initial URL param */}
            {serverMessage && (
              <Alert status="info" borderRadius="md">
                <AlertIcon />
                <Box flex="1">
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>{serverMessage}</AlertDescription>
                </Box>
              </Alert>
            )}

            {/* Form Area - Switches between Sign In / Sign Up */}
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <VStack spacing={4}>
                {/* Sign Up Specific Fields */}
                {isSignUp && (
                  <HStack spacing={4} width="100%">
                    <FormControl
                      isInvalid={
                        !!(
                          form.formState.errors as FieldErrors<SignUpFormValues>
                        ).firstName
                      }
                      isRequired
                    >
                      <FormLabel htmlFor="firstName">First name</FormLabel>
                      <Input
                        id="firstName"
                        placeholder="John"
                        {...form.register("firstName")}
                        isDisabled={isPending}
                      />
                      <FormErrorMessage>
                        {
                          (
                            form.formState
                              .errors as FieldErrors<SignUpFormValues>
                          ).firstName?.message
                        }
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={
                        !!(
                          form.formState.errors as FieldErrors<SignUpFormValues>
                        ).lastName
                      }
                      isRequired
                    >
                      <FormLabel htmlFor="lastName">Last name</FormLabel>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        {...form.register("lastName")}
                        isDisabled={isPending}
                      />
                      <FormErrorMessage>
                        {
                          (
                            form.formState
                              .errors as FieldErrors<SignUpFormValues>
                          ).lastName?.message
                        }
                      </FormErrorMessage>
                    </FormControl>
                  </HStack>
                )}

                {/* Common Fields */}
                <FormControl
                  isInvalid={!!form.formState.errors.email}
                  isRequired
                >
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    {...form.register("email")}
                    isDisabled={isPending}
                  />
                  <FormErrorMessage>
                    {form.formState.errors.email?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!form.formState.errors.password}
                  isRequired
                >
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    {...form.register("password")}
                    isDisabled={isPending}
                  />
                  <FormErrorMessage>
                    {form.formState.errors.password?.message}
                  </FormErrorMessage>
                </FormControl>

                {/* Sign Up Specific Fields */}
                {isSignUp && (
                  <>
                    <FormControl
                      isInvalid={
                        !!(
                          form.formState.errors as FieldErrors<SignUpFormValues>
                        ).confirmPassword
                      }
                      isRequired
                    >
                      <FormLabel htmlFor="confirmPassword">
                        Confirm Password
                      </FormLabel>
                      <Input
                        id="confirmPassword"
                        type="password"
                        {...form.register("confirmPassword")}
                        isDisabled={isPending}
                      />
                      <FormErrorMessage>
                        {
                          (
                            form.formState
                              .errors as FieldErrors<SignUpFormValues>
                          ).confirmPassword?.message
                        }
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={
                        !!(
                          form.formState.errors as FieldErrors<SignUpFormValues>
                        ).terms
                      }
                      isRequired
                    >
                      <Checkbox
                        id="terms"
                        {...form.register("terms")}
                        isDisabled={isPending}
                        isInvalid={
                          !!(
                            form.formState
                              .errors as FieldErrors<SignUpFormValues>
                          ).terms
                        }
                      >
                        <Text fontSize="sm">Accept terms and conditions</Text>
                      </Checkbox>
                      <FormErrorMessage mt={1}>
                        {
                          (
                            form.formState
                              .errors as FieldErrors<SignUpFormValues>
                          ).terms?.message
                        }
                      </FormErrorMessage>
                    </FormControl>
                  </>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  colorScheme="blue"
                  width="full"
                  isLoading={isPending}
                  spinner={<Spinner size="sm" />}
                  leftIcon={
                    isSignUp ? (
                      <Icon as={UserPlus} w={4} h={4} />
                    ) : (
                      <Icon as={LogIn} w={4} h={4} />
                    )
                  }
                >
                  {isSignUp ? "Sign Up" : "Sign In"}
                </Button>
              </VStack>
            </form>

            {/* Toggle between Sign In / Sign Up */}
            <Box textAlign="center" pt={4}>
              <Text fontSize="sm">
                {isSignUp
                  ? "Already have an account? "
                  : "Don\'t have an account? "}
                <Button
                  variant="link"
                  colorScheme="blue"
                  onClick={() => setIsSignUp(!isSignUp)}
                  isDisabled={isPending}
                  size="sm"
                  ml={1} // Add margin
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </Button>
              </Text>
            </Box>

            {/* Optional: Add divider and social login buttons later */}
            {/* <Divider my={6} /> */}
            {/* <HStack spacing={4} justify="center"> ... </HStack> */}
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
}

// Example function for handling OAuth sign-in (requires uncommenting and Supabase client setup)
// async function handleOAuthSignIn(provider: 'github' | 'google' | 'facebook') {
//   const supabase = createClientComponentClient(); // Needs browser client
//   await supabase.auth.signInWithOAuth({
//     provider,
//     options: {
//       redirectTo: `${location.origin}/auth/callback`,
//     },
//   });
// }
