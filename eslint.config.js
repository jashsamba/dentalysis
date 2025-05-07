import nextPlugin from "@next/eslint-plugin-next";

export default [
  {
    ignores: [".next/**"],
  },
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      // Add any project-specific rules or overrides here
      // Example: '@next/next/no-img-element': 'off',
    },
  },
  // If you use TypeScript, you might add configurations for it here
  // Example using @typescript-eslint:
  // {
  //   files: ["**/*.{ts,tsx}"],
  //   plugins: { ts: typescriptEslintPlugin },
  //   languageOptions: {
  //     parser: typescriptEslintParser,
  //     parserOptions: { project: "./tsconfig.json" }
  //   },
  //   rules: { ...typescriptEslintPlugin.configs.recommended.rules }
  // }
];
