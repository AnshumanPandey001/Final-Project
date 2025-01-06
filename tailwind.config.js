/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        rotate: "rotate 3s ease-in-out infinite",
        
      },
      
    },
  },
  plugins: [],
};
