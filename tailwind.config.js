/** @type {import('tailwindcss').Config} */
import tailwind_scrollbar from "tailwind-scrollbar";

import tailwindcss_animate from "tailwindcss-animate";

module.exports = {
  darkMode: ["class"],
  important: "body",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        "background-secondary": "hsl(var(--background-secondary))",
        "background-sidebar": "hsl(var(--background-sidebar))",
        "background-sidebar-hover": "hsl(var(--background-sidebar-hover))",
        "background-player": "hsl(var(--background-player))",
        "background-login": "hsl(var(--background-login))",
        "background-search-record": "hsl(var(--background-search-record))",
        "background-search-record-hover":
          "hsl(var(--background-search-record-hover))",
        "background-scrollbar": "hsl(var(--background-scrollbar))",
        foreground: "hsl(var(--foreground))",
        "foreground-secondary": "hsl(var(--foreground-secondary))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "spin-medium": "spin 2s linear infinite",
        "spin-fast": "spin 1s linear infinite",
      },
    },
  },
  plugins: [tailwind_scrollbar({ nocompatible: true }), tailwindcss_animate],
};
