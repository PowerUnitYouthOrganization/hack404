/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        // Custom breakpoints to match project structure
        'mobile': '640px',     // mobile to tablet transition
        'tablet': '1024px',    // tablet to desktop transition
        'desktop': '1150px',   // desktop and up
      },
      zIndex: {
        100: 100,
      },
    },
  },
  plugins: [],
};
