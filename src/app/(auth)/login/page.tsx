'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { loginUser } from './../actions' // Adjust path as needed
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
  Link as ChakraLink, // Use alias to avoid conflict with NextLink
  Text,
} from '@chakra-ui/react'
import NextLink from 'next/link' // Import NextLink for navigation

// Zod Schema for client-side validation
const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
})

type LoginFormInputs = z.infer<typeof LoginSchema>

export default function LoginPage() {
  const router = useRouter()
  const toast = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError, // Function to set server-side errors manually
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const result = await loginUser(data)

      if (result.success) {
        toast({
          title: 'Login Successful',
          description: "Welcome back! You're being redirected...",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        // Redirect using Next.js router
        router.push(result.redirectTo || '/dashboard')
      } else {
        // Display server-side errors using toast
        toast({
          title: 'Login Failed',
          description: result.error || 'An unknown error occurred.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
        // Optionally set specific field errors if available from server
        if (result.issues) {
          Object.entries(result.issues).forEach(([key, value]) => {
             if (value && value.length > 0) {
               setError(key as keyof LoginFormInputs, { type: 'server', message: value[0] });
             }
          });
        }
      }
    } catch (error) {
      console.error('Login submission error:', error)
      toast({
        title: 'Login Failed',
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
        Login
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
              placeholder="••••••••"
              {...register('password')}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            width="full"
            isLoading={isSubmitting}
          >
            Login
          </Button>

           <Text textAlign="center">
            Don't have an account?{" "}
            <ChakraLink as={NextLink} href="/signup" color="teal.500" fontWeight="bold">
              Sign Up
            </ChakraLink>
          </Text>
        </VStack>
      </form>
    </Box>
  )
} 