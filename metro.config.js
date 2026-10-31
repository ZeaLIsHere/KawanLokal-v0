const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push("JPG", "PNG", "WEBP", "JPEG");

module.exports = withNativeWind(config, { input: "./global.css" });
