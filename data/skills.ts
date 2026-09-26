// Skill groups (plain lists, no rating bars).
// Unresolved items use `confirm` / `todo` and render as visible placeholders.

export const skills = [
  {
    group: 'AI and LLMs',
    items: [
      'Claude', 'OpenAI', 'RAG (hybrid, security-trimmed)', 'Multi-agent systems', 'LangChain',
      'LangGraph', 'Embeddings (Voyage)', 'Pinecone', 'Azure AI Search', 'Local LLMs (Llama)',
      'Speech (Whisper, Kokoro)', 'TensorFlow',
    ],
  },
  {
    group: 'Data engineering',
    items: [
      'Microsoft Fabric', 'Azure Data Factory', 'Spark / Spark SQL', 'Databricks', 'SAP HANA', 'SSIS',
      'Apache Airflow', 'Medallion architecture', 'CDC', 'Real-time streaming',
    ],
  },
  {
    group: 'Backend and apps',
    items: [
      'Python', 'FastAPI', 'SQL', 'Supabase', 'Firebase', 'Next.js', 'React', 'Flutter', 'Playwright',
      'Docker', 'REST and GraphQL',
    ],
  },
  {
    group: 'Analytics',
    items: ['Power BI', 'DAX', 'Deneb/Vega', 'Tableau', 'KQL', 'Power Query'],
  },
]
