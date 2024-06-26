import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/common/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        bounceWave: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-1rem)" },
        },
      },
      animation: {
        bounce1: "bounceWave 1s infinite",
        bounce2: "bounceWave 1s infinite 0.2s",
        bounce3: "bounceWave 1s infinite 0.4s",
      },
    },
  },
  plugins: [],
};
export default config;
