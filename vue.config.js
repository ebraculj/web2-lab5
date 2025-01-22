const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false), // Devtools samo za razvoj
        __VUE_OPTIONS_API__: JSON.stringify(true), // Koristi Options API
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false), // Isključi hydration mismatch detalje
      }),
    ],
  },
});
