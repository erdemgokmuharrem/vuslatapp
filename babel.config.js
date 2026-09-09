module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // react-native-worklets/plugin, reanimated'ın v4'teki yeni adı.
    plugins: ['react-native-worklets/plugin'],
  };
};
