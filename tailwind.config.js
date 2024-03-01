/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: [],
  theme: {
    screen: {
      xs: '500px',
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
    },
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      boxShadow: {
        'custom': '0px 8px 0px 2px rgba(0, 0, 0, 0.12), 5px 0px 4px 0px rgba(0, 0, 0, 0.06)',
        'custom-2': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        background: "#FFFFFF",
        primary: "#1e6cbe",
        textLight: "#8d9495",
        textPrimary: "#444",
        textSecondary: "#153256",
        darkGreen: "#1e6cbe",
        lightGreen: "#edf4e8",
        buttonGray: "#979797",
        gray: "#CDD0CB",
        lightGray: "#E8EAE6",
        inputLigthGray: "#dedbdd",
        lightGray2: "#d8d8d8",
        lightBlue: "#00A9FF",
      },
    },
  },
  plugins: [],
}

