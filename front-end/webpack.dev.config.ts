import path from "path";
import webpack, { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { merge } from "webpack-merge";

import common from "./webpack.common.config";

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const config = merge<Configuration>(common(false), {
    mode: "development",
    output: {
        publicPath: "/",
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true, // Inject all files that are generated by webpack, e.g. bundle.js
            template: "src/index.html",
        }),
        new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
    ],
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.join(__dirname, "build"),
        historyApiFallback: true,
        port: 3000,
        open: true,
        hot: true,
    },
});

export default config;
