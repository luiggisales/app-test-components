/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-select/dist/index.esm.js',
  ],
  theme: {
    extend: {
      colors: {
        root_primary: {
          100: '#05C7F2',
          200: '#0583F2',
          300: '#056CF2',
        },

        root_secondary: {
          100: '#595958',
          200: '#263238',
        },
      },
    },
  },
  plugins: [],
}
