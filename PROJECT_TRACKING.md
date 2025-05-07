# Project Tracking: Dentalysis AI Assistant

**Goal:** Implement a tenant-isolated AI chatbot for dentists using Supabase, pgvector, and OpenAI/Llama3 for RAG based on uploaded documents and conversation history.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, Supabase (Postgres, Auth, Storage, Edge Functions), pgvector, OpenAI API.

**Architecture Shift:** Moved from simple financial upload/KB to a full RAG architecture based on provided plan.

## Completed

- [x] Setup initial project structure (`PROJECT_TRACKING.md`, `ERROR_TRACKING.md`).
- [x] Implement basic AI Knowledge Base UI (`app/dashboard/knowledge-base/page.tsx`).
- [x] Implement `getKnowledgeBaseAnswer` server action (`app/dashboard/actions.ts`) using OpenAI API.
- [x] Install dependencies (`@types/react`, `openai`, `lucide-react`, `sonner`, `react-markdown`, `remark-gfm`).
- [x] Resolve `date-fns` dependency conflict.
- [x] Enhance Knowledge Base UI (loading, errors, markdown, copy, history).
- [x] Define `financial_records` Supabase table schema & RLS.
- [x] Install `papaparse`.
- [x] Implement Financial Data Upload UI (`app/dashboard/financial-upload/page.tsx`).
- [x] Implement `uploadFinancialData` server action (`app/dashboard/actions.ts`).
- [x] Configure `.env.local` for Supabase.
- [x] Create Supabase client utilities (`lib/supabase/client.ts`, `lib/supabase/server.ts`).
- [x] Attempt to fix linter errors in `lib/supabase/server.ts` (partially resolved, workaround needed).
- [x] Refactor `app/auth/actions.ts` (using workaround client).
- [x] Refactor `app/auth/page.tsx` (react-hook-form, zod, client-side redirect).
- [x] Diagnose and fix auth form submission issues.
- [x] Update backend for new RAG architecture plan (deprecate old actions, delete financial upload page, update KB UI endpoint, create skeleton `/api/chat`).
- [x] Create new AI Chat UI (`app/dashboard/ai-chat/page.tsx`) with mock API.

## In Progress

- [ ] **Major UI & Structure Refactoring (Current)**:
  - [x] Install new dependencies (`framer-motion`, `react-chartjs-2`, `chart.js`, `zustand`, `@tanstack/react-query`).
  - [x] Restructure project into `/src` directory.
  - [x] Update `tsconfig.json` paths.
  - [x] Update Tailwind config with custom colors.
  - [x] Create mock data files (`kpis.json`, `chatHistory.json`).
  - [x] Create stub hooks (`useKpis.ts`, `useChat.ts`).
  - [x] Create reusable components (`KpiCard.tsx`, `InsightToast.tsx`).
  - [x] Implement main layout (`src/app/layout.tsx`).
  - [x] Implement Dashboard page (`src/app/dashboard/page.tsx`).
  - [x] Implement Chat page (`src/app/chat/page.tsx`).
  - [x] Implement Finance page (`src/app/finance/page.tsx`).
  - [ ] Add basic styling, animations, and demo mode.
- [ ] **Fix Build Errors (Module Not Found / Type Errors)**
- [ ] Fix Supabase server client utility (`src/lib/supabase/server.ts`).
- [ ] Implement full RAG pipeline:
  - [ ] Define remaining Supabase tables (`dentists`, `patients`, etc.) & RLS.
  - [ ] Set up pgvector.
  - [ ] Create Storage bucket.
  - [ ] Implement Edge function for document ingestion/embedding.
  - [ ] Implement `/api/chat` endpoint fully (auth, context retrieval, generation).
- [ ] Connect Chat UI (`src/app/chat/page.tsx`) to backend API.
- [ ] Implement file upload functionality in Chat UI.
- [ ] Implement real data fetching in Dashboard/Finance pages (replace mocks).
- [ ] Refine UI/UX based on testing.
- [ ] Implement Dark Mode (optional).
- [ ] Add Skeleton Loaders (optional).

## Backlog / Future Ideas

- Tenant management UI.
- More sophisticated financial reports.
- Integration with practice management software APIs.
- User profile settings.

## Current Tasks

1.  **[Done]** Define Core Supabase Schema (Dentists, Patients, Appointments, Documents, Chunks, Conversations, Embeddings).
2.  **[Done]** Implement Tenant Isolation Helper (`current_dentist_id`) & RLS Policies (via SQL).
3.  **[Done]** Basic Root Page (`app/page.tsx`) and Auth Page (`app/auth/page.tsx`) setup.
4.  **[Done]** Implement Sign Up / Sign In Server Actions (`app/auth/actions.ts`) - _Note: Sign In uses workaround client._
5.  **[Done]** Update Knowledge Base UI (`app/dashboard/knowledge-base/page.tsx`) to call `/api/chat`.
6.  **[Done]** Create Chat API Endpoint Skeleton (`app/api/chat/route.ts`).
7.  **[ ]** **Implement Ingestion/Embedding Pipeline (Supabase Edge Function)** - Requires trigger setup and function code.
8.  **[ ]** **Fix Supabase Server Client Utility (`lib/supabase/server.ts`)** - Resolve type errors for reliable session handling.
9.  **[ ]** Implement User Authentication Logic in `/api/chat` (Replace placeholder `dentist_id`).
10. **[ ]** Implement Document Upload UI & Connect to Storage/Ingestion Pipeline.
11. **[ ]** Implement Conversation Logging UI/Logic.
12. **[ ]** Implement UI for Appointments, Patients, etc.
13. **[ ]** Implement Dashboard Layout & Logout.
14. **[ ]** Implement Analytics Chat UI connection to `/api/chat`.
15. **[ ]** Implement AI Logging (optional).

## Future Considerations

- Refine AI responses (prompt engineering, model choice).
- Error handling and loading states across the board.
- User feedback mechanism.
- KPI Views / Analytics dashboard components.
- Dockerization.
