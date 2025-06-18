// tailwind.config.ts
/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#B8860B",
          secondary: "#C1272D",
          background: "#121212",
          heading: "#ffffff",
          paragraph: "#dddddd",
        },
      },
    },
  },
  plugins: [],
};

export default config;
