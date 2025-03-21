import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "hologram-color": "#7678EC",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        euclidCircularA: ["euclidCircularA", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {
      lineClamp: ["hover"],
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("@tailwindcss/line-clamp")],
} satisfies Config;
