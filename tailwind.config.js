/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ulos: {
          red: "#991B1B",       // Merah Ulos (Keberanian, Semangat)
          redDark: "#7F1D1D",
          redLight: "#DC2626",
          black: "#1C1917",     // Hitam (Keteguhan)
          dark: "#0F0E0D",
          charcoal: "#292524",
          cream: "#FAF7F2",     // Putih/Krem (Kesucian)
          white: "#FFFFFF",
          gold: "#D97706",      // Emas/Kuning aksen adat
          goldLight: "#FBBF24",
        },
      },
      fontFamily: {
        sans: ["System"],
      },
    },
  },
  plugins: [],
};
