/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.jsx",
    "./resources/**/**/.blade.php",
    "./resources/**/**/.js",
    "./resources/**/**/.jsx",
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false, // リセットCSSの無効化
  },
  plugins: [
    require('tailwindcss-hero-patterns'),
  ],
}

