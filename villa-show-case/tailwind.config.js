/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-200": "#001B1D",
        "primary-300": "#002B36",
        "primary-400": "#014D4E",
        "secondary-200": "#45EDFA",
        "secondary-300": " #2FE5DA",
        "secondary-400": " #6CEEFF",
        "secondary-500": "#38F2E6",
        "body-bg": "#0b1a78",
        "body-bg_body-color": "#EBF5F5",
      },
    },
  },
  plugins: [],
};
