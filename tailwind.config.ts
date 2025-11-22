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
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      colors: {
        wedding: {
          'navy-dark': '#1E2A39',
          'navy-medium': '#344A6C',
          'brown-warm': '#8B5A38',
          'beige-light': '#D1B99A',
          'white-soft': '#F5F3EE',
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
