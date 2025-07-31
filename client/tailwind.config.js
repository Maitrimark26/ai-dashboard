// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // tailwind.config.js
extend: {
  animation: {
    'gradient-x': 'gradient-x 8s ease infinite',
  },
  keyframes: {
    'gradient-x': {
      '0%, 100%': { backgroundPosition: '0% 50%' },
      '50%': { backgroundPosition: '100% 50%' },
    },
  },
}

  },
  colors: {
  primary: "#4f46e5" // or "rgb(79, 70, 229)"
},
  plugins: [],
};
