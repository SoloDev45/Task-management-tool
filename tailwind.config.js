/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2952AE',
        'primary-dark': '#1e3e8a',
      },
      keyframes: {
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInPage: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeOut: {
          '0%': { opacity: '1', maxHeight: '200px' },
          '100%': { opacity: '0', maxHeight: '0px' },
        },
        collapseDown: {
          '0%': { opacity: '0', transform: 'translateY(-6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        slideInUp: 'slideInUp 0.3s ease-out',
        slideInPage: 'slideInPage 0.25s ease-out',
        fadeOut: 'fadeOut 0.25s ease-out forwards',
        collapseDown: 'collapseDown 0.2s ease-out',
      },
    },
  },
  plugins: [],
};
