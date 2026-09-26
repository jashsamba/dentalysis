import type { FlowNode } from './types'

// Professional AI work at Musashi Auto Parts. Each entry gets an architecture diagram.
// Unresolved items use `confirm` / `todo` and render as visible placeholders.

export const professionalWork: {
  title: string
  summary: string[]
  stack: string[]
  flow: FlowNode[]
}[] = [
  {
    title: 'HR AI agent',
    summary: [
      'Production-scale HR assistant designed to serve ~50,000 employees.',
      'Hybrid RAG with multi-layer memory.',
    ],
    stack: ['FastAPI', 'Voyage AI embeddings', 'Pinecone', 'Supabase', 'Claude'],
    flow: [
      { label: 'Employee question' },
      { label: 'FastAPI service' },
      { label: 'Hybrid retrieval', note: 'Voyage + Pinecone' },
      { label: 'Memory layers', note: 'Supabase' },
      { label: 'Claude answer' },
    ],
  },
  {
    title: 'Musashi One GPT: enterprise policy assistant',
    summary: [
      'Employees sign in with Microsoft SSO (Entra ID) and ask policy questions.',
      'A router sends each question to specialist agents for HR, Finance, Quality, Maintenance, and Compliance.',
    ],
    stack: ['LangChain', 'Pinecone', 'Supabase', 'Claude', 'Entra ID'],
    flow: [
      { label: 'SSO sign-in', note: 'Entra ID' },
      { label: 'Router' },
      { label: 'Specialist agents', note: 'HR · Finance · Quality · Maintenance · Compliance' },
      { label: 'Policy answer' },
    ],
  },
  {
    title: 'Security-trimmed RAG ingestion pipeline',
    summary: [
      'Azure Functions pipeline that ingests documents into Azure AI Search.',
      "Custom index schema and hybrid search; results respect each user's document permissions.",
    ],
    stack: ['Azure Functions', 'Azure AI Search', 'Hybrid search'],
    flow: [
      { label: 'Documents' },
      { label: 'Azure Functions', note: 'chunk + embed' },
      { label: 'AI Search index', note: 'custom schema' },
      { label: 'Permission filter' },
      { label: 'User results' },
    ],
  },
  {
    title: 'Knowledge-handoff Teams bot',
    summary: [
      "An AI assistant in Microsoft Teams that answers questions about my systems and processes, so knowledge doesn't leave with the person.",
    ],
    stack: ['Voyage embeddings', 'Pinecone', 'Claude Sonnet', 'Microsoft Teams'],
    flow: [
      { label: 'Teams message' },
      { label: 'Retrieval', note: 'Voyage + Pinecone' },
      { label: 'Claude Sonnet' },
      { label: 'Answer in Teams' },
    ],
  },
]
