/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        // Custom breakpoints to match project structure
        // 'mobile': '640px',     // uneeded
        'tablet': '640px',    // mobile to tablet line
        'desktop': '1500px',   // tablet to desktop line
      },
      zIndex: {
        100: 100,
      },
    },
  },
  plugins: [],
};
