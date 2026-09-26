import type { ProjectTheme } from '@/data/projects'

/** Exposes a project's colours as CSS variables for everything inside its panel / page. */
export function themeVars(theme: ProjectTheme): React.CSSProperties {
  return {
    '--project-bg': theme.bg,
    '--project-surface': theme.surface,
    '--project-text': theme.text,
    '--project-muted': theme.muted,
    '--project-accent': theme.accent,
    '--planet-light': theme.planet[0],
    '--planet-dark': theme.planet[1],
  } as React.CSSProperties
}
