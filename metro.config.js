const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

config.resolver.blockList = [
  ...config.resolver.blockList,
  /node_modules[\\/]\.ignored(?:[\\/].*)?$/,
  /node_modules[\\/](?:@[^\\/]+[\\/])?[^\\/]+[\\/]android[\\/](?:\.cxx|\.gradle|build)(?:[\\/].*)?$/,
];

config.resolver.unstable_enablePackageExports = true;

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (
    moduleName.startsWith("@clerk/expo/") ||
    moduleName.startsWith("@clerk/react/") ||
    moduleName.startsWith("@clerk/shared/")
  ) {
    return {
      filePath: require.resolve(moduleName),
      type: "sourceFile",
    };
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: "./global.css" });
