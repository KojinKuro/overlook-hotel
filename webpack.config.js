const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "none",
  entry: "./src/scripts.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },
  devtool: "source-map",
  plugins: [
    new HTMLWebpackPlugin({
      title: "Overlook Hotel",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/",
              publicPath: "images/",
            },
          },
        ],
      },
    ],
  },
};
