/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "page.js",
  ],
  theme: {
    extend: {
      colors: {
        "text-primary": "#141414",
        "bg-primary": "#ffffff",
        "accent-primary": "#0600c2",
        "accent-secondary": "#1f004d",
        "brand-primary": "#ae00ff",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".bg-primary": { backgroundColor: "#ae00ff" },
        ".bg-secondary": { backgroundColor: "#1f004d" },
        ".bg-accent": { backgroundColor: "#0600c2" },
        ".bg-background": { backgroundColor: "#ffffff" },
        ".text-primary-text": { color: "#141414" },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
