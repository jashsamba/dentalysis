# Dentalysis Project Brief

## Project Overview

Dentalysis is a dental practice management application built with Next.js, Supabase, and various modern web technologies.

## Key Technologies

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend/Database**: Supabase (Auth, Database, Storage)
- **State Management**: React Query (@tanstack/react-query)
- **Visualization**: Chart.js, react-chartjs-2
- **Animation**: Framer Motion
- **Form Handling**: React Hook Form, Zod
- **Package Management**: npm (with --legacy-peer-deps workaround)

## Project Structure

- `/app`: Next.js App Router pages and server components
- `/components`: Reusable UI components
- `/lib`: Utility functions and configurations
- `/hooks`: Custom React hooks
- `/styles`: Global styles and Tailwind configuration
- `/public`: Static assets

## Key Challenges

- Supabase SSR client setup and authentication flow
- React Query integration
- Chart.js configuration
- Package dependency conflicts
- Build and hydration errors

## Project Goals

1. Establish a stable development environment
2. Fix critical authentication and data access errors
3. Ensure reliable build and deployment process
4. Implement core dental practice management features
