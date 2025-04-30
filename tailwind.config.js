/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
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
      },
    },
  },
  plugins: [],
}
