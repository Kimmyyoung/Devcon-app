module.exports = function (api) {
  api.cache(true);
  return {
    assets: ['./assets/fonts'],
    presets: ["babel-preset-expo"],
    plugins: [
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-reanimated/plugin",
      "expo-router/babel"
    ],
  };
};
