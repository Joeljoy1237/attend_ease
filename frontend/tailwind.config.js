module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      padding: {
        "5vw": "5vw",
      },
      height: {
        "100vh": "100vh",
      },
      colors: {
        secondary: "#FFBF78",
        primary: "#EB0028",
        "font-primary": "#3d3d3d",
        "font-secondary": "#6d6d6d",
        white: "#fff",
        'primary-50': '#fff0f3',
        'primary-100': '#ffdde3',
        'primary-200': '#ffc1cc',
        'primary-300': '#ff95a7',
        'primary-400': '#ff5975',
        'primary-500': '#ff264b',
        'primary-600': '#fc0630',
        'primary-700': '#eb0028',
        'primary-800': '#af0522',
        'primary-900': '#900c22',
        'primary-950': '#50000e',
      },
      boxShadow: {
        custom: "0px 8px 24px rgba(149, 157, 165, 0.2)",
      },
      backgroundImage: {
        'banner': "url('/images/banner.webp')",
        'footer-texture': "url('/img/footer-texture.png')",
      }
    },
  },
  plugins: [],
};