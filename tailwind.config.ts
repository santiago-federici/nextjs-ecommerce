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
      textColor: {
        heading: 'var(--clr-heading)',
        base: 'var(--clr-base)',
        inverted: 'var(--clr-inverted)'
      },
      backgroundColor: {
        surface: 'var(--bg-surface)',
        'footer-surface': 'var(--bg-footer-surface)'
      },
      colors: {
        primary: 'var(--clr-primary)',
        secondary: 'var(--clr-secondary)',
        accent: 'var(--clr-accent)'
      },
      padding: {
        'btn-padding': 'var(--btn-padding)'
      }
    },
  },
  plugins: [require("daisyui")],
};
export default config;
