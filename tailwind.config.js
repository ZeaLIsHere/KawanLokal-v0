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
        // Truway Travel Design System Colors
        primary: {
          DEFAULT: "#1D4ED8",
          container: "#2563EB",
          hover: "#1E40AF",
          light: "#EFF6FF",
          fixed: "#dbe1ff",
        },
        surface: {
          DEFAULT: "#faf8ff",
          canvas: "#F8FAFC",
          card: "#FFFFFF",
          container: "#eaedff",
          dim: "#d2d9f4",
        },
        'on-surface': {
          DEFAULT: "#131b2e",
          variant: "#434655",
        },
        secondary: {
          DEFAULT: "#505f76",
          container: "#d0e1fb",
        },
        'card-border': "#E2E8F0",
        'input-border': "#CBD5E1",
        rating: {
          amber: "#F59E0B",
        },
        badge: {
          discount: {
            bg: "#DCFCE7",
            text: "#15803D",
          },
        },
        // Warna tema utama aplikasi (Biru Danau Toba)
        ulos: {
          red: "#1D4ED8",
          redDark: "#1E40AF",
          redLight: "#3B82F6",
          black: "#1C1917",
          dark: "#0F0E0D",
          charcoal: "#292524",
          cream: "#FAF7F2",
          white: "#FFFFFF",
          gold: "#D97706",
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
