import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0d0f14',
        bg2: '#13161d',
        accent: '#4a9eff',
        accent2: '#f07f3c',
        'site-text': '#e8e6df',
        muted: '#6b6f7a',
      },
    },
  },
  plugins: [typography],
}

export default config
