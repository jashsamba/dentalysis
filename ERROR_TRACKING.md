# Error Tracking: Dentalysis Project

This file logs errors encountered during development and their resolutions.

---

## Error 1: 404 Not Found on Root Route (`/`)

- **Date Encountered:** 2025-05-03 (Approx)
- **Symptom:** Navigating to `http://localhost:3000` results in a "404 - This page could not be found" error.
- **Cause:** The Next.js App Router requires a `page.tsx` file within a directory to handle the corresponding route. There was no `app/page.tsx` file to handle the root route (`/`).
- **Resolution:** Created a basic `app/page.tsx` file to serve as the landing page.

---

## Error 2: Sign-in Succeeds but No Redirect to Dashboard

- **Date Encountered:** 2025-05-03 (Approx)
- **Symptom:** After entering correct email/password and clicking "Sign In" on `/auth`, the page remains on `/auth` instead of redirecting to `/dashboard`. Server logs might indicate successful login.
- **Cause Investigation:**
  - The `signIn` server action calls `redirect("/dashboard")` on success.
  - Potential issue with session handling/cookie setting after sign-in, possibly related to the Supabase client initialization (`@supabase/ssr` vs direct `@supabase/supabase-js` client, or unresolved issues in `lib/supabase/server.ts`).
  - Potential interference from middleware.
  - Interaction between `redirect()` and `useTransition` might be preventing the client-side navigation update.
- **Resolution Attempt 1:** Reverted `signIn` action to use the standard server client from `lib/supabase/server.ts` after attempting another fix for that utility file. (Failed due to persistent linter errors in server client utility).
- **Resolution Attempt 2:** Modified `signIn` and `signUp` server actions to return success/error objects instead of using `redirect()`. Modified client component (`app/auth/page.tsx`) to handle the result and use client-side `router.push()` for redirect on sign-in success.
- **Debugging Step:** Added client-side `console.log` statements to trace execution flow in `onSubmit` handler.
- **Related Issue:** Persistent linter errors in `lib/supabase/server.ts` indicate underlying problems with Supabase SSR client setup, potentially affecting session handling reliability even if sign-in works with workaround.

---

## Error 3: React Hydration Mismatch on Auth Page

- **Date Encountered:** 2025-05-03 (Approx)
- **Symptom:** React hydration error logged in the browser console when loading `/auth`. The specific mismatch pointed to the Sign In/Sign Up toggle button, with an unexpected `fdprocessedid` attribute present on the client.
- **Cause Investigation:**
  - Hydration mismatches occur when server-rendered HTML differs from the initial client render.
  - The non-standard `fdprocessedid` attribute strongly suggests interference from a browser extension (e.g., password manager, form filler) modifying the DOM before React hydration completes.
- **Resolution:** Advised user to test in an Incognito/Private window or with browser extensions temporarily disabled to confirm if external scripts are the cause. If the error persists without extensions, further investigation into client-side rendering logic would be needed.

---

**Error 1: `date-fns` Dependency Conflict**

- **File(s):** `package.json`
- **Command:** `npm install date-fns` (implicitly via shadcn/ui)
- **Message:** `ERESOLVE unable to resolve dependency tree` related to react/react-dom versions.
- **Date:** 2024-05-02
- **Resolution:** Used `npm install --legacy-peer-deps` for installing shadcn/ui components to bypass strict peer dependency checking.
- **Status:** Resolved (Workaround)

---

**Error 2: Supabase Server Client (`@supabase/ssr`) Linter Errors**

- **File(s):** `lib/supabase/server.ts`
- **Message:** Persistent TypeScript/linter errors related to `cookies()` usage within the `createServerClient` utility (e.g., `cookies().get` used synchronously).
- **Date:** 2024-05-02 (ongoing)
- **Resolution Attempts:** Multiple attempts using `edit_file` failed to satisfy the linter/type checker. Likely requires deeper investigation into `@supabase/ssr` types, Next.js version interactions, or the specific usage pattern.
- **Current Workaround:** Using a direct `@supabase/supabase-js` client in server actions (`app/auth/actions.ts`) where the server client was needed, bypassing the `@supabase/ssr` utility for now.
- **Status:** Unresolved (Workaround in place)

---

**Error 3: Authentication Flow Issues**

- **File(s):** `app/auth/page.tsx`, `app/auth/actions.ts`
- **Messages:**
  - "AuthApiError: Anonymous sign-ins are disabled" (Initial setup)
  - Failed redirects after sign-in/sign-up (Using `redirect()` in server action)
  - React Hydration Error (Likely browser extension)
  - Form validation/submission failures (react-hook-form/zod setup)
- **Date:** 2024-05-02
- **Resolution:**
  - Correct Supabase project setup (disable anonymous sign-ins).
  - Switched to client-side `router.push()` in `app/auth/page.tsx` for redirection after server action completes.
  - Advised user to check browser extensions for hydration error.
  - Refactored form using separate Zod schemas and unique `key` prop on `<Form>`.
- **Status:** Resolved

---

**Error 4: Module Not Found / Build Errors (Post-Refactor)**

- **File(s):** Various pages and hooks
- **Message:** Cycle of Module Not Found errors (`framer-motion`, `react-chartjs-2`, `@tanstack/react-query`).
- **Date:** 2024-05-03
- **Context:** General `npm install` seemed unreliable. Explicit installs were needed for each missing package.
- **Resolution:** Explicitly installed `framer-motion`, `react-chartjs-2`, `chart.js`, `@tanstack/react-query` using `npm install <package> --legacy-peer-deps`.
- **Status:** Resolved

---

**Error 5: React Query Provider Missing**

- **File(s):** `src/lib/hooks/useKpis.ts`, `src/app/dashboard/page.tsx`
- **Message:** `Error: No QueryClient set, use QueryClientProvider to set one`
- **Date:** 2024-05-03
- **Context:** `useQuery` hook used without a `QueryClientProvider` higher in the component tree. Error persisted even after initially wrapping layout, potentially masked by earlier build errors or SSR issues.
- Resolution:\*\*
  - Created `src/components/providers.tsx` to initialize `QueryClient` and wrap children in `QueryClientProvider`.
  - Installed `@tanstack/react-query-devtools`.
  - Wrapped the main content in `src/app/layout.tsx` with the `<Providers>` component.
  - Resolved preceding build errors (`ModuleNotFound`, `TypeError`).
- Status:\*\* Resolved (Error no longer appears in logs after fixing build and chart issues)

---

**Error 6: Chart.js Scale/Element Not Registered**

- File(s): `src/app/dashboard/page.tsx`, `src/app/finance/page.tsx`
- Message: `Error: "category" is not a registered scale.` (Dashboard), `Error: "arc" is not a registered element.` (Finance)
- Date: 2024-05-03
- Context:\*\* Using `react-chartjs-2` v4+ / `chart.js` v3+ requires manual registration of scales, elements, and plugins for each chart type used.
- Resolution:
  - Dashboard: Imported and registered `CategoryScale`, `LinearScale`, `PointElement`, `LineElement`, `Title`, `Tooltip`, `Legend`.
  - Finance: Imported and registered `ArcElement`, `BarElement`, `CategoryScale`, `LinearScale`, `Title`, `Tooltip`, `Legend`.
- Status:\*\* Resolved

---

### Error 7: Radix Package Version Not Found (ETARGET)

- **Date Encountered:** 2025-05-04
- **Symptom:** `npm install` fails with
  ```
  npm ERR! code ETARGET
  npm ERR! notarget No matching version found for @radix-ui/react-navigation-menu@1.2.11
  ```
  along with repetitive `ERESOLVE overriding peer dependency` warnings for `@types/react` / `@types/react-dom`.
- **Cause:** The exact tag `1.2.11` of `@radix-ui/react-navigation-menu` does **not** exist on the npm registry. Several other Radix UI components had similar version incompatibilities.
- **Resolution:**
  - Updated `package.json` to use existing versions:
    - Changed `@radix-ui/react-navigation-menu` from 1.2.11 to 1.2.10
    - Changed `@radix-ui/react-separator` from 1.2.1 to 1.1.5
  - Downgraded TypeScript type definitions:
    - Changed `@types/react` from 19.1.2 to 18.2.48
    - Changed `@types/react-dom` from 19.1.3 to 18.2.18
  - Added override for zustand's React type dependency
  - Created setup scripts (`setup.sh` and `setup.bat`) to perform clean installations with `--legacy-peer-deps` flag
- **Status:** Resolved

### Error 8: Chart.js Registration Issues

- **Date Encountered:** 2025-05-03
- **Symptom:** Various errors like `"category" is not a registered scale` and `"arc" is not a registered element`.
- **Cause:** Chart.js requires manual registration of components, but this was inconsistently done across the application.
- **Resolution:**
  - Created a centralized utility file `src/lib/chart-utils.ts` with:
    - A shared `registerChartComponents()` function
    - Default options for line, bar, and pie charts
  - Updated the providers component to register chart components once at the application level
- **Status:** Resolved

### Error 9: Supabase Server Client Issues

- **Date Encountered:** 2025-05-03
- **Symptom:** TypeScript/linter errors related to `cookies()` usage in the Supabase server client.
- **Cause:** The `cookies()` function was being called directly in the module scope, causing issues in certain contexts.
- **Resolution:**
  - Updated the `supaServer` function to access cookies only when the function is called
  - Added better error handling for cookie operations
  - Created a separate `supaServerAction` function specifically for server actions
- **Status:** Resolved
