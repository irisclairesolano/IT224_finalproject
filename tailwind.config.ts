import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/globals.css" // Explicitly include CSS file
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          25: "#f2f7ff",
          50: "#ecf3ff",
          100: "#dde9ff",
          200: "#c2d6ff",
          300: "#9cb9ff",
          400: "#7592ff",
          500: "#465fff",
          600: "#3641f5",
          700: "#2a31d8",
          800: "#252dae",
          900: "#262e89",
          950: "#161950"
        },
        gray: {
          25: "#fcfcfd",
          50: "#f9fafb",
          100: "#f2f4f7",
          200: "#e4e7ec",
          300: "#d0d5dd",
          400: "#98a2b3",
          500: "#667085",
          600: "#475467",
          700: "#344054",
          800: "#1d2939",
          900: "#101828",
          950: "#0c111d",
          dark: "#1a2231"
        },
        success: {
          25: "#f6fef9",
          50: "#ecfdf3",
          100: "#d1fadf",
          200: "#a6f4c5",
          300: "#6ce9a6",
          400: "#32d583",
          500: "#12b76a",
          600: "#039855",
          700: "#027a48",
          800: "#05603a",
          900: "#054f31",
          950: "#053321"
        },
        error: {
          25: "#fffbfa",
          50: "#fef3f2",
          100: "#fee4e2",
          200: "#fecdca",
          300: "#fda29b",
          400: "#f97066",
          500: "#f04438",
          600: "#d92d20",
          700: "#b42318",
          800: "#912018",
          900: "#7a271a",
          950: "#55160c"
        }
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"]
      },
      fontSize: {
        "display-2xl": ["72px", "90px"],
        "display-xl": ["60px", "72px"],
        "display-lg": ["48px", "60px"],
        "display-md": ["36px", "44px"],
        "display-sm": ["30px", "38px"],
        "text-xl": ["20px", "30px"],
        "text-base": ["16px", "24px"],
        "text-sm": ["14px", "20px"],
        "text-xs": ["12px", "18px"],
        // Legacy theme classes
        "theme-sm": ["14px", "20px"],
        "theme-xs": ["12px", "18px"]
      },
      boxShadow: {
        xs: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        sm: "0px 1px 3px 0px rgba(16, 24, 40, 0.1), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)",
        md: "0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)",
        lg: "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
        xl: "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
        // Custom shadows
        "slider-navigation": "0px 1px 2px 0px rgba(16, 24, 40, 0.1), 0px 1px 3px 0px rgba(16, 24, 40, 0.1)",
        "theme-sm": "0px 1px 3px 0px rgba(16, 24, 40, 0.1), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)"
      },
      screens: {
        "2xsm": "375px",
        xsm: "425px",
        "3xl": "2000px"
      },
      zIndex: {
        1: "1",
        9: "9",
        99: "99",
        999: "999",
        9999: "9999"
      }
    }
  },
  plugins: [],
  safelist: [
    // Ensure dynamic classes are included
    {
      pattern: /bg-(brand|gray)-(50|100|200|500|800|900)/,
      variants: ["dark"]
    },
    {
      pattern: /text-(brand|gray)-(400|500|700|800|900)/,
      variants: ["dark"]
    },
    "menu-item",
    "menu-item-active",
    "menu-item-inactive",
    "no-scrollbar",
    "custom-scrollbar"
  ]
};

export default config;