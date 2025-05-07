# Technical Context

## Environment

- **Platform**: Next.js 14+ (App Router)
- **Node.js**: Compatible with package dependencies
- **Package Manager**: npm with --legacy-peer-deps workaround

## Critical Dependencies

- **@supabase/auth-helpers-nextjs**: Authentication integration with Next.js
- **@supabase/supabase-js**: Core Supabase client
- **@supabase/ssr**: Server-side rendering support for Supabase
- **@tanstack/react-query**: Data fetching and state management
- **chart.js & react-chartjs-2**: Visualization libraries
- **date-fns**: Date manipulation
- **framer-motion**: Animation library
- **radix-ui**: UI component primitives (via shadcn/ui)
- **react-hook-form & zod**: Form handling and validation

## Known Technical Issues

1. **Supabase Server Client Setup**:

   - Persistent TypeScript/linter errors in `lib/supabase/server.ts`
   - Issues with `cookies()` usage within the `createServerClient` utility
   - Current workaround: Using direct `@supabase/supabase-js` client in server actions

2. **Package Dependency Conflicts**:

   - `date-fns` dependency resolution issues
   - Radix UI package version mismatches (`@radix-ui/react-navigation-menu@1.2.11` not found)
   - Need for `--legacy-peer-deps` flag for installations

3. **React Query Setup**:

   - Missing `QueryClientProvider` led to runtime errors
   - Resolved by creating dedicated `providers.tsx` component

4. **Chart.js Configuration**:

   - Manual registration of scales, elements, and plugins required for each chart type
   - Different configurations needed for different visualization components

5. **Authentication Flow**:
   - Issues with redirect after sign-in/sign-up
   - React hydration mismatches possibly caused by browser extensions
   - Form validation/submission inconsistencies

## Build Process Notes

- Chart.js and React Query require explicit configuration before usage
- Missing dependencies may cause cascading build failures
- React hydration errors may be browser-extension related
