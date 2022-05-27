var webpack = require("webpack");
/** @type {import('@storybook/core-common').StorybookConfig} */
module.exports = {
  stories: ["../**/*.stories.mdx", "../**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true,
      },
    },
  ],
  features: {
    previewMdx2: true,
  },
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  staticDirs: ["../public"],
  webpackFinal: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.__NEXT_IMAGE_OPTS": JSON.stringify({
          deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
          imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
          domains: ["github.com"],
          path: "/",
          loader: "default",
        }),
      })
    );
    config.resolve.fallback = {
      os: require.resolve("os-browserify/browser"),
      buffer: require.resolve("buffer/"),
      path: require.resolve("path-browserify"),
      fs: false,
    };
    config.plugins = [
      ...(config.plugins ?? []),
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
    ];
    return config;
  },
};
