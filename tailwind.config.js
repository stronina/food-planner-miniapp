/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}","./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { bg:"#0f1320", panel:"#141a2a", text:"#eef3fb", muted:"#8ea1b5", accent:"#49e1c2", accent2:"#3b82f6" }
    },
  },
  plugins: [],
}
