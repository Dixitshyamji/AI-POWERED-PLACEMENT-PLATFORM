/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#12172B',
        inkSoft: '#1B2140',
        paper: '#F7F5F0',
        amber: '#FFB020',
        teal: '#2FD4A6',
        muted: '#6B7280',
      },
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
