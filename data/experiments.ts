// Smaller experiments, honestly framed.
// Unresolved items use `confirm` / `todo` and render as visible placeholders.

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
