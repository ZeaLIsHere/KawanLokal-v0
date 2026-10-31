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
        // Primary Brand: Biru Danau Toba
        primary: {
          DEFAULT: "#1D4ED8",
          container: "#2563EB",
          hover: "#1E40AF",
          light: "#EFF6FF",
          fixed: "#dbe1ff",
        },
        // Warm Sand Glassmorphic Surfaces
        surface: {
          DEFAULT: "#FAF7F2",
          canvas: "#FAF7F2",
          card: "#FFFFFF",
          alt: "#FFFFFF",
          muted: "#F2EFEA",
          tonal: "#F0EAE1",
          glass: "rgba(255,255,255,0.7)",
          glassSoft: "rgba(255,255,255,0.45)",
          container: "#eaedff",
          dim: "#d2d9f4",
        },
        'on-surface': {
          DEFAULT: "#23201E",
          variant: "#8A827A",
          strong: "#4A4542",
        },
        border: {
          DEFAULT: "#EBE3D5",
          glass: "rgba(255,255,255,0.6)",
        },
        destructive: "#8C4A4A",
        secondary: {
          DEFAULT: "#8A827A",
          container: "#F0EAE1",
        },
        'card-border': "#EBE3D5",
        'input-border': "#EBE3D5",
        rating: {
          amber: "#D97706",
        },
        badge: {
          discount: {
            bg: "#DCFCE7",
            text: "#15803D",
          },
        },
        // Tema Budaya Toba & Ulos
        ulos: {
          red: "#1D4ED8",
          redDark: "#1E40AF",
          redLight: "#3B82F6",
          black: "#23201E",
          dark: "#0F0E0D",
          charcoal: "#4A4542",
          cream: "#FAF7F2",
          white: "#FFFFFF",
          gold: "#C1A673",
          goldLight: "#F0EAE1",
        },
      },
      fontFamily: {
        raleway: ["Raleway_400Regular"],
        "raleway-medium": ["Raleway_500Medium"],
        "raleway-bold": ["Raleway_700Bold"],
        dmsans: ["DMSans_400Regular"],
        "dmsans-medium": ["DMSans_500Medium"],
        "dmsans-bold": ["DMSans_700Bold"],
        sans: ["DMSans_400Regular", "System"],
      },
    },
  },
  plugins: [],
};
