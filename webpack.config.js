const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const mode = process.env.NODE_ENV || "development";
const path = require("path");
console.log("********************************************************");

module.exports = [
	{
		mode: mode,
		entry: "./src/index.js",
		devtool: mode == "production" ? false : "source-map",
		target: mode == "production" ? "browserslist" : "web",
		devServer: { contentBase: "./dist", hot: true },
		output: {
			filename: mode === "production" ? "frontend/script.[hash].js" : "frontend/script.js",
			path: path.resolve(__dirname, "dist"),
			clean: mode === "production" ? true : false,
		},
		module: {
			rules: [
				{
					test: /\.(jpe?g|png|gif|svg|webp)$/i,
					type: "asset",
					generator: {
						filename: `frontend/media/images/[name]${mode === "production" ? "[hash]" : ""}[ext]`,
					},
				},
				{
					test: /\.(eot|svg|ttf|woff|woff2)$/i,
					type: "asset",
					generator: {
						filename: `frontend/media/fonts/[name]${mode === "production" ? "[hash]" : ""}[ext]`,
					},
				},
				{
					test: /\.scss$/i,
					use: [
						mode === "production"
							? { loader: MiniCssExtractPlugin.loader, options: { publicPath: "../" } }
							: "style-loader",
						"css-loader",
						mode === "prodcution" ? "postcss-loader" :
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
				template: "./src/index.pug",
				filename: "index.html",
				inject: "body",
			}),
			new MiniCssExtractPlugin({ filename: "frontend/styles.[hash].css" }),
		],
	},
];
