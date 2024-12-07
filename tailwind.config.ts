import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'float': 'float 15s ease-in-out infinite',
        'float-slow': 'float 20s ease-in-out infinite',
        'float-delayed': 'float 18s ease-in-out infinite 2s',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(10px, 20px) rotate(5deg)' },
          '50%': { transform: 'translate(-5px, 40px) rotate(-5deg)' },
          '75%': { transform: 'translate(-15px, 20px) rotate(0deg)' },
          '100%': { transform: 'translate(0, 0) rotate(0deg)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
