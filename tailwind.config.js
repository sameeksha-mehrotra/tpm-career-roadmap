/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
  safelist: [
    // Phase colors
    'bg-blue-500', 'bg-emerald-500', 'bg-orange-500', 'bg-purple-500', 'bg-rose-500',
    'bg-blue-100', 'bg-emerald-100', 'bg-orange-100', 'bg-purple-100', 'bg-rose-100',
    'dark:bg-blue-900/30', 'dark:bg-emerald-900/30', 'dark:bg-orange-900/30', 'dark:bg-purple-900/30', 'dark:bg-rose-900/30',
    'text-blue-700', 'text-emerald-700', 'text-orange-700', 'text-purple-700', 'text-rose-700',
    'dark:text-blue-300', 'dark:text-emerald-300', 'dark:text-orange-300', 'dark:text-purple-300', 'dark:text-rose-300',
    'border-blue-200', 'border-emerald-200', 'border-orange-200', 'border-purple-200', 'border-rose-200',
    'dark:border-blue-800', 'dark:border-emerald-800', 'dark:border-orange-800', 'dark:border-purple-800', 'dark:border-rose-800',
    'from-blue-500', 'from-emerald-500', 'from-orange-500', 'from-purple-500', 'from-rose-500',
    'to-blue-600', 'to-emerald-600', 'to-orange-600', 'to-purple-600', 'to-rose-600',
  ],
}
