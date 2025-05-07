'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signupUser } from './../actions' // Adjust path as needed
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
  useToast,
  Link as ChakraLink,
  Text,
} from '@chakra-ui/react'
import NextLink from 'next/link'

// Zod Schema for client-side validation - including password confirmation
const SignupSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // path of error
});

type SignupFormInputs = z.infer<typeof SignupSchema>

export default function SignupPage() {
  const router = useRouter()
  const toast = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(SignupSchema),
  })

  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    // We only need email and password for the server action
    const { email, password } = data;
    try {
      const result = await signupUser({ email, password }) // Send only necessary fields

      if (result.success) {
        toast({
          title: 'Signup Successful',
          // Adjust description based on whether email confirmation is required
          description: "Account created! You're being redirected...",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        router.push(result.redirectTo || '/dashboard') // Or /check-email
      } else {
        toast({
          title: 'Signup Failed',
          description: result.error || 'An unknown error occurred.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
        // Optionally set specific field errors (e.g., email already exists)
        if (result.issues) {
           Object.entries(result.issues).forEach(([key, value]) => {
             if (value && value.length > 0) {
               setError(key as keyof SignupFormInputs, { type: 'server', message: value[0] });
             }
          });
        }
         if (result.error?.toLowerCase().includes('email already exists')) {
            setError('email', { type: 'server', message: result.error });
        }
      }
    } catch (error) {
      console.error('Signup submission error:', error)
      toast({
        title: 'Signup Failed',
        description: 'An unexpected error occurred. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading as="h1" size="lg" textAlign="center" mb={6}>
        Create Account
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.email} isRequired>
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register('email')}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password} isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="•••••••• (min. 6 characters)"
              {...register('password')}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

           <FormControl isInvalid={!!errors.confirmPassword} isRequired>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register('confirmPassword')}
            />
            <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            width="full"
            isLoading={isSubmitting}
          >
            Sign Up
          </Button>

          <Text textAlign="center">
            Already have an account?{" "}
            <ChakraLink as={NextLink} href="/login" color="teal.500" fontWeight="bold">
              Login
            </ChakraLink>
          </Text>
        </VStack>
      </form>
    </Box>
  )
} 