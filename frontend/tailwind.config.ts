import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'argon-blue': '#1A73E8',
        'argon-blue-light': '#49A3F1',
        'background-gray': '#F8F9FA',
      },
    },
  },
  plugins: [],
};

export default config;
