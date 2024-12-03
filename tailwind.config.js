// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        dark: {
          800: "#000000", // 纯黑背景
          700: "#1a1a1a", // 稍微亮一点的黑色，用于hover等状态
        },
      },
      colors: {
        gray: {
          // 暗色模式下的文字和边框颜色
          200: "#e5e7eb",
          300: "#d1d5db",
          600: "#4b5563",
          700: "#1a1a1a", // 边框颜色
          800: "#000000", // 背景色
        },
      },
    },
  },
  plugins: [],
};
