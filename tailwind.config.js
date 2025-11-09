/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],   // IMPORTANT for A2
  theme: { extend: {} },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: { themes: ["dim"] }
};
