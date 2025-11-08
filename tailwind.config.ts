import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        script: ['var(--font-script)', 'cursive'],
        elegant: ['var(--font-elegant)', 'serif'],
      },
      colors: {
        wedding: {
          cream: '#F5F1E8',
          gold: '#D4AF37',
          sage: '#C4B5A0',
          sepia: '#B8A588',
          dark: '#4A4A4A',
        }
      },
      backgroundImage: {
        'gradient-fade': 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.9))',
      },
    },
  },
  plugins: [],
};

export default config;
