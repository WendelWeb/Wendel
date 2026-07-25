import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        "surface-raised": "var(--surface-raised)",
        border: "var(--border)",
        navy: "var(--navy)",
        "navy-light": "var(--navy-light)",
        red: "var(--red)",
        "red-soft": "var(--red-soft)",
        orange: "var(--orange)",
        green: "var(--green)",
        "green-soft": "var(--green-soft)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-oswald)", "var(--font-inter)", "sans-serif"],
      },
      keyframes: {
        "overlay-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "phrase-in": {
          "0%": { opacity: "0", transform: "scale(0.85)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "bar-fill": {
          "0%": { width: "0%" },
        },
        "toast-in": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "sheet-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "overlay-in": "overlay-in 300ms ease-out",
        "phrase-in": "phrase-in 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        "toast-in": "toast-in 200ms ease-out",
        "sheet-up": "sheet-up 260ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
