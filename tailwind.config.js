/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#6947BF',
        'primary-light': '#b2a1de',
        'custom-light-gray': '#5B6170',
        'custom-dark-gray': '#3D404B',
        'custom-lightest-gray': '#E5ECF3'
      },
      aspectRatio: {
        '3': '3/1',
      },
    }
  },
  plugins: [],
}