/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/forms'),  require('@tailwindcss/forms')],
}
