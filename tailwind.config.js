/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        // Custom breakpoints may be definitioned here to match old
        // 'sm': '600px',     // mobile to tablet transition
        // 'md': '768px',     // standard medium breakpoint
        // 'lg': '1024px',    // tablet to desktop transition
        // 'xl': '1280px',    // larger desktops
        // '2xl': '1536px',   // ultra wide screens
      },
      zIndex: {
        100: 100,
      },
    },
  },
  plugins: [],
};
