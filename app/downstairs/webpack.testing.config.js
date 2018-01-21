let path = require("path");
let webpack = require("webpack");
let CleanWebpackPlugin = require("clean-webpack-plugin");
let HtmlWebpackPlugin = require("html-webpack-plugin");

// Phaser webpack config
let phaserModule = path.join(__dirname, "../../node_modules/phaser-ce/");
let phaser = path.join(phaserModule, "build/custom/phaser-split.js");
let pixi = path.join(phaserModule, "build/custom/pixi.js");
let p2 = path.join(phaserModule, "build/custom/p2.js");

let definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || "false"))
});

module.exports = {
    entry: {
        app: [
            "babel-polyfill",
            path.resolve(__dirname, "index.js")
        ],
        vendor: ["pixi", "p2", "phaser", "webfontloader"]
    },
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, "testing/goy-export/assets/js/"),
        publicPath: "/assets/js/",
        filename: "downstairs.js"
    },
    plugins: [
        definePlugin,
        new CleanWebpackPlugin(["testing/goy-export/"]),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                drop_console: true,
                screw_ie8: true,
                warnings: false
            },
            mangle: {
                screw_ie8: true
            },
            output: {
                comments: false,
                screw_ie8: true
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({name: "vendor", filename: "core.js"}),
        new HtmlWebpackPlugin({
            filename: "../../downstairs.html",
            template: "front/tpl/container.html",
            chunks: ["vendor", "app"],
            chunksSortMode: "manual",
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                html5: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: true,
                removeComments: true,
                removeEmptyAttributes: true
            },
            hash: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader"],
                include: [path.join(__dirname, "./"), path.join(__dirname, "../../front/src")]
            },
            {test: /pixi\.js/, use: ["expose-loader?PIXI"]},
            {test: /phaser-split\.js$/, use: ["expose-loader?Phaser"]},
            {test: /p2\.js/, use: ["expose-loader?p2"]},
            {test: /\.css$/, use: ["style-loader", "css-loader"]},
            {test: /\.(png|jpg|gif)$/, use: [{loader: "file-loader", options: {outputPath: "../img/"}}]},
            {test: /\.(fnt)$/, use: [{loader: "file-loader", options: {outputPath: "../font/"}}]},
            {test: /favicon\.ico$/, use: [{loader: "file-loader", options: {name: "favicon.ico", outputPath: "../img/"}}]},
            {test: /\.(json)$/, use: [{loader: "file-loader", options: {outputPath: "../json/"}}]},
            {test: /\.(mp3|ogg)$/, use: [{loader: "file-loader", options: {outputPath: "../audio/"}}]},
        ]
    },
    node: {
        fs: "empty",
        net: "empty",
        tls: "empty"
    },
    resolve: {
        alias: {
            "phaser": phaser,
            "pixi": pixi,
            "p2": p2
        }
    }
};
