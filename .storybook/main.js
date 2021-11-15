const path = require("path");

const maxAssetSize = 1024 * 1024;

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-postcss",
    // "@storybook/preset-scss",
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
      include: path.resolve(__dirname, "../"),
    });

    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendorPreview: {
            test: /[\\/]node_modules[\\/]/,
          },
        },
        minSize: 30 * 1024,
        maxSize: maxAssetSize,
      },
    };

    config.performance = {
      maxAssetSize: maxAssetSize,
    };

    // Return the altered config
    return config;
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    // reactDocgenTypescriptOptions: {
    //   compilerOptions: {
    //     allowSyntheticDefaultImports: false,
    //     esModuleInterop: false,
    //   },
    // },
  },
};
