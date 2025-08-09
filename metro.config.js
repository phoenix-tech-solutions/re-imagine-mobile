const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// adjust for pnpm symlinks properly
config.resolver.resolveSymlinks = true;

module.exports = withNativeWind(config, {
    input: "./src/global.css",
});
