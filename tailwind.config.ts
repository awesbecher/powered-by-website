
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        neutral: {
          soft: "#000000",
          medium: "#222222",
        },
        accent: {
          soft: "#222222",
          DEFAULT: "#9b87f5",
          dark: "#7a6cc5",
        },
      },
      keyframes: {
        "card-hover": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-8px)" },
        },
        wave: {
          "0%, 100%": { transform: "scaleX(1)" },
          "50%": { transform: "scaleX(0.85)" },
        },
        "fade-in": {
          "0%": { 
            opacity: "0",
            transform: "translateY(20px)"
          },
          "100%": { 
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "gradient-shift": {
          "0%, 100%": {
            backgroundPosition: "200% 50%"
          },
          "50%": {
            backgroundPosition: "0% 50%"
          }
        }
      },
      animation: {
        "card-hover": "card-hover 0.3s ease-out forwards",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "gradient-shift": "gradient-shift 3s ease-in-out infinite"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
