# Tasks

## Critical Tasks

### UI Library Migration (NEW)

- [x] **CRITICAL-05:** Migrate from shadcn/ui (Radix) to Chakra UI
  - Priority: High
  - Status: Completed (Pending Testing)
  - Notes: Installation errors with Radix dependencies forced a switch. Chakra UI installed and Provider added. All components migrated. Code linted and formatted.
  - Acceptance: All UI components replaced with Chakra UI equivalents, application builds and runs without UI errors.

### Authentication & Authorization

- [x] **CRITICAL-01:** Fix Supabase server client in `lib/supabase/server.ts`

  - Priority: High
  - Status: Completed
  - Notes: Updated with better error handling and proper cookie management
  - Acceptance: No TypeScript/linter errors, proper session handling

- [ ] **CRITICAL-02:** Improve authentication flow reliability
  - Priority: High
  - Status: Ready for Review (Unblocked)
  - Notes: Current workaround uses client-side redirect after server action. Needs re-evaluation after Chakra migration.
  - Acceptance: Consistent sign-in/sign-up with proper redirection using Chakra components.

### Dependency Management

- [-] **CRITICAL-03:** Resolve Radix UI package version conflicts (Superseded)

  - Status: Obsolete
  - Notes: Migrating away from Radix/shadcn due to persistent issues.

- [-] **CRITICAL-04:** Fix TypeScript definition conflicts (Superseded by Migration)
  - Status: Obsolete
  - Notes: Addressed during migration setup, but original context is no longer relevant.

## Maintenance Tasks

### Dependency Resolution

- [x] **MAINT-04:** Create package.json version lock file

  - Priority: High
  - Status: Completed (needs verification after migration)
  - Notes: Updated package.json for Chakra UI. Need to verify lock file stability.
  - Acceptance: A reliable package-lock.json that resolves all conflicts.

- [x] **MAINT-05:** Create clean installation script
  - Priority: High
  - Status: Completed (verified working with latest package.json)
  - Notes: setup.sh and setup.bat scripts confirmed working.
  - Acceptance: New developer can run script for error-free setup.

### Visualization Components

- [x] **MAINT-01:** Create centralized Chart.js registration utility

  - Priority: Medium
  - Status: Completed
  - Notes: Created chart-utils.ts. Integration unaffected by UI library change.
  - Acceptance: Single utility for chart registration used across the app.

- [x] **MAINT-02:** Standardize chart configurations
  - Priority: Low
  - Status: Completed
  - Notes: Added default options in chart-utils.ts.
  - Acceptance: Consistent chart styling and configuration.

### Build Process

- [x] **MAINT-03:** Create reliable package installation script
  - Priority: Medium
  - Status: Completed (verified working)
  - Notes: setup scripts work.
  - Acceptance: New developer can set up environment without errors.

## Investigation Tasks

### Technical Research

- [ ] **INVEST-01:** Research latest Supabase SSR best practices

  - Priority: Medium
  - Status: Not Started
  - Notes: Compare current implementation with latest docs.
  - Acceptance: Document findings and recommended approach.

- [ ] **INVEST-02:** Investigate alternatives to `--legacy-peer-deps`

  - Priority: Low
  - Status: Not Started
  - Notes: Find more sustainable dependency management approach (potentially less critical now).
  - Acceptance: Document findings and recommended approach.

- [-] **INVEST-03:** Audit all Radix UI dependencies (Superseded)
  - Status: Obsolete

## Completed Tasks (Previous Iteration)

### Infrastructure

- [x] **INFRA-01:** Fix missing root route (404 on `/`)
- [x] **INFRA-02:** Add React Query provider

### Visualization

- [x] **VIZ-01:** Fix Chart.js registration in Dashboard
- [x] **VIZ-02:** Fix Chart.js registration in Finance page
