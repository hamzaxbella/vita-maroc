// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        softPrimary: 'var(--color-soft-primary)',
        danger: 'var(--color-danger)',
        background: 'var(--color-background)',
        secondary: 'var(--color-secondary)'
      }
    },
  },
  plugins: [],
} satisfies Config