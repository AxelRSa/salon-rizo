const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const mode = process.env.NODE_ENV || "development";
const path = require("path");

module.exports = [
 {
  devtool: false,
  mode: mode,
  entry: "./src/js/script.js",
  devtool: "source-map",
  target: mode == "production" ? "browserlist" : "web",
  devServer: { contentBase: "./dist" },
  output: {
   filename: "./src/scrpits.js",
   path: path.resolve(__dirname, "dist"),
   clean: mode === "production" ? true : false,
  },
  module: {
   rules: [
    {
     test: /\.(jpe?g|png|gif|svg|webp)$/i,
     type: "asset",
     generator: { filename: "src/media/images/[name][ext]" },
    },
    {
     test: /\.(eot|svg|ttf|woff|woff2)$/i,
     type: "asset",
     generator: { filename: "src/media/fonts/[name][ext]" },
    },
    {
     test: /\.scss$/i,
     use: [
      { loader: MiniCssExtractPlugin.loader, options: { publicPath: "../" } },
      "css-loader",
      "postcss-loader",
      "sass-loader",
     ],
    },
    {
     test: /\.pug$/i,
     use: ["html-loader", "pug-html-loader"],
    },
   ],
  },
  plugins: [
   new HtmlWebpackPlugin({
    template: "./src/pre/index.pug",
    filename: "index.html",
    inject: "body",
   }),
   new HtmlWebpackPlugin({
    template: "./src/pre/servicios.pug",
    filename: "src/servicios.html",
    publicPath: "",
    inject: false,
   }),
   new MiniCssExtractPlugin({ filename: "src/styles.css" }),
  ],
 },
];
