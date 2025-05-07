# Dentalysis Memory Bank System

This directory contains the Memory Bank files for the Dentalysis project, designed to maintain context across development sessions and track progress on resolving errors and implementing features.

## File Structure

- **projectbrief.md** - Foundation document with project overview, key technologies, and goals
- **techContext.md** - Technical architecture, dependencies, and setup details
- **systemPatterns.md** - Recurring patterns and best practices for this project
- **productContext.md** - Business and product aspects of the project
- **activeContext.md** - Current focus areas and priorities
- **progress.md** - Implementation status and progress tracking
- **tasks.md** - **Source of truth** for all task tracking

## How to Use This System

### For Current Development

1. Start each development session by reviewing **tasks.md** for current priorities
2. Check **activeContext.md** for current focus areas
3. Review **progress.md** to understand what's been resolved and what's in progress
4. Use **systemPatterns.md** as a reference for implementing consistent solutions

### When Encountering New Issues

1. Document the issue in **progress.md** under "In-Progress Issues"
2. Create a new task in **tasks.md** with appropriate classification and priority
3. Update **activeContext.md** if the issue becomes a focus area

### When Resolving Issues

1. Update the task status in **tasks.md**
2. Move the issue to "Recently Resolved Issues" in **progress.md**
3. Document the solution pattern in **systemPatterns.md** if it's reusable

## Development Modes

The Memory Bank system supports different modes:

- **VAN Mode** - Visual assessment and navigation (overview of the codebase)
- **PLAN Mode** - Planning and task breakdown
- **CREATIVE Mode** - Design and solution brainstorming
- **IMPLEMENT Mode** - Code implementation and issue fixing
- **QA Mode** - Testing and quality assurance

To switch modes, start your command with the mode name, e.g., "IMPLEMENT: Fix the Supabase server client issue"
