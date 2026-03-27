/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
    // include node modules if you added shadcn components there
    './node_modules/shadcn/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
}
