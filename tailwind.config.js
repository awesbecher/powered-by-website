/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './index.html',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'voice-wave': 'voice-wave 1s ease-in-out infinite',
        'gradient': 'gradient 15s ease infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'voice-wave': {
          '0%, 100%': { height: '4px' },
          '50%': { height: '16px' },
        },
        'gradient': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      colors: {
        foreground: 'hsl(var(--foreground))',
        background: 'hsl(var(--background))',
        neutral: {
          soft: '#f5f5f5',
          DEFAULT: 'hsl(var(--neutral))',
          foreground: 'hsl(var(--neutral-foreground))',
        },
        primary: {
          DEFAULT: '#1976d2',
          dark: '#1565c0',
          light: '#42a5f5',
        },
        secondary: {
          DEFAULT: '#dc004e',
          dark: '#9a0036',
          light: '#e33371',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}
