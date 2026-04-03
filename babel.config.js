module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      "react-native-reanimated/plugin", // Ak používaš reanimated
      "react-native-worklets-core/plugin", // PRIDAŤ TOTO
    ],
  };
};
