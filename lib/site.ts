// All copy on the home page lives here. Source: reference/PORTFOLIO_SITE_SPEC.md.
// `todo` / `confirm` fields render as visible placeholders, never as invented content.

export const profile = {
  name: 'Jaswanth Samba',
  headline: 'AI Engineer building production LLM agents and the data platforms behind them.',
  subline:
    'Turning enterprise data into working systems since January 2020, across manufacturing, retail, and healthcare. Based in Ontario, Canada.',
  email: 'jashsamba@gmail.com',
  github: 'https://github.com/jashsamba',
  linkedin: 'https://www.linkedin.com/in/jaswanth-samba-2944a7106/' as string | null,
  upwork: null as string | null,
  resume: '/resume.pdf' as string | null,
}

export const impact: { value: string; label: string; confirm?: string }[] = [
  {
    value: '~50,000',
    label: 'employees the HR AI agent was designed to serve',
  },
  { value: '26', label: 'people trained and led across 10 countries' },
  { value: '15+', label: 'automated executive dashboards (CEO, CFO, CXO)' },
  { value: '£1.5B', label: 'spend tracked across 3,000+ Tesco stores' },
]

export type FlowNode = { label: string; note?: string }

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

export const dataEngineering = [
  {
    title: 'SAP to Microsoft Fabric lakehouse',
    body: 'Pipelines moving SAP ERP data into a medallion lakehouse with Change Data Capture and incremental loads. Translated ABAP data-model logic into SQL stored procedures and views.',
  },
  {
    title: 'Cloud migration',
    body: 'Moved on-premises SSIS and SQL Server ETL into Microsoft Fabric.',
  },
  {
    title: 'Real-time IoT telemetry',
    body: 'Python and REST ingestion of global device telemetry into Fabric pipelines feeding live manufacturing dashboards.',
  },
  {
    title: 'Executive Power BI',
    body: '15+ fully automated CEO, CFO, and CXO dashboards across 10 countries, including advanced DAX, forecasting measures, and a custom Deneb/Vega org chart visual.',
  },
  {
    title: 'Global enablement',
    body: 'Subject-matter expert for Fabric company-wide; led AI and data engineering training in Japan and trained a team of 26 across 10 countries.',
  },
]

export const experiments: {
  title: string
  body: string
  finding?: string
  confirm?: string
}[] = [
  {
    title: 'TQQQ LSTM direction predictor',
    body: 'A live pipeline pulling hourly TQQQ data (5,000+ bars), engineering 15 technical indicators, training an LSTM in TensorFlow, and storing everything in SQLite.',
    finding:
      'Neither the hourly nor the daily model beat a naive "always up" baseline (ROC-AUC below 0.5). Short-term direction of a leveraged ETF wasn\'t predictable with this setup, which made it a useful lesson in evaluating models against baselines.',
  },
  {
    title: 'Silver futures moving-average strategy',
    body: 'Backtested a crossover strategy on the full history of silver futures while working through Python for Algorithmic Trading.',
  },
  {
    title: 'DentalAI Hub',
    body: 'An early React and Firebase dashboard for dental clinics with AI chat and call handling.',
  },
  {
    title: 'AI-native BI desktop app (in progress)',
    body: 'LangGraph agent, DuckDB, React/Tauri.',
    confirm: 'Confirm whether to include this in-progress project.',
  },
]

export const experience = [
  {
    role: 'Business Data Engineer (AI Engineer)',
    org: 'Musashi Auto Parts',
    place: 'Waterloo, ON',
    dates: 'Aug 2022 – present',
    points: [
      'Build production LLM agents and RAG systems (see professional AI work).',
      'Lead Fabric data engineering and data science enablement for a team of 26 across 10 countries; led training in Japan.',
      'Migrated on-premises SSIS/SQL Server ETL to Microsoft Fabric; built SAP-to-lakehouse pipelines with CDC and incremental loads.',
      'Built real-time IoT telemetry ingestion and 15+ automated executive dashboards.',
    ],
  },
  {
    role: 'Business Intelligence Analyst, Property Insights',
    org: 'Tesco',
    place: 'India',
    dates: 'Jun 2021 – Jul 2022',
    points: [
      'Built a Tableau dashboard tracking £1.5B in capex and opex across 3,000+ UK stores and 60 KPIs for the UK Head of Property, coordinating 7+ teams.',
      'Built an asset condition model forecasting capital needs for a £17M three-year budget.',
      'Rebuilt a 15-report library from Excel into Tableau.',
    ],
  },
  {
    role: 'Business Intelligence Analyst',
    org: 'Compass Group (Crothall)',
    place: 'Canada',
    dates: 'Jan 2020 – May 2020',
    points: [
      'Built a Power BI unitizing analysis for 15 hospitals that saved the equivalent of 36 full-time roles in scheduling.',
      'Call centre analysis that set staffing shifts and cut costs by 20%.',
      'Cut report execution time by 50% across dashboards used weekly by 40+ hospitals.',
    ],
  },
]

export const education = [
  {
    school: 'University of Waterloo',
    degree: 'Master of Management Sciences (MMSc), Data Analytics and Project Management',
    dates: '2018 – 2019',
  },
  {
    school: 'BMS Institute of Technology (VTU)',
    degree: 'Bachelor of Engineering, Electronics and Communication',
    dates: '2013 – 2017',
  },
]

export const certification = {
  org: 'PMI',
  name: 'Cognitive Project Management in Artificial Intelligence',
  date: 'May 2025',
}

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
