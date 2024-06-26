import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        palette: {
            50: '#f6f9f9',
            100: '#edf0f1',
            200: '#c5d3d4',
            300: '#b3c5c6',
            400: '#89a6a7',
            500: '#6a8c8d',
            600: '#557274',
            700: '#465d5e',
            800: '#3c4f50',
            900: '#354345',
            950: '#232d2e',
        },
        paletteRed: {
          800: '#b12700',
          900: '#872200',
          950: '#4d0e00',
        },
      },
      scale: {
        1005: '1.005',
        101: '1.01',
        102: '1.02',
      },
    },
  },
  plugins: [],
};
export default config;
