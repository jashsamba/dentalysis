import Link from "next/link";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Flex,
  VStack,
  Link as ChakraLink, // Import ChakraLink to avoid conflict with next/link
} from "@chakra-ui/react";

/**
 * Root page component for the application.
 * Provides a basic welcome and links to authentication or dashboard.
 */
export default function HomePage() {
  // In a real app, you might check authentication state here
  // and redirect automatically or show different content.
  // For now, just provide links.

  return (
    <Flex
      align="center"
      justify="center"
      minH="100vh" // Equivalent to min-h-screen
      // bg="background" // Assuming ChakraProvider handles base background
    >
      <Card w="full" maxW="md" variant="outline">
        <CardHeader textAlign="center">
          <Heading size="lg">Welcome to Dentalysis</Heading>
          <Text color="gray.500" mt={1}>
            Your AI-Powered Dental Practice Assistant
          </Text>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} align="center">
            <Text>Please log in or sign up to access the dashboard.</Text>
            <Button as={Link} href="/auth" colorScheme="blue">
              Login / Sign Up
            </Button>
            {/* Example of secondary button */}
            {/* <Button as={Link} href="/dashboard" variant="outline"> 
              Go to Dashboard
            </Button> */}
          </VStack>
        </CardBody>
      </Card>
    </Flex>
  );
}
