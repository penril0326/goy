let path = require("path");
let webpack = require("webpack");
let CleanWebpackPlugin = require("clean-webpack-plugin");
let HtmlWebpackPlugin = require("html-webpack-plugin");

// Phaser webpack config
let phaserModule = path.join(__dirname, "node_modules/phaser-ce/");
let phaser = path.join(phaserModule, "build/custom/phaser-split.js");
let pixi = path.join(phaserModule, "build/custom/pixi.js");
let p2 = path.join(phaserModule, "build/custom/p2.js");

let definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || "true"))
});

module.exports = {
    entry: {
        app: [
            "babel-polyfill",
            path.resolve(__dirname, "index.js")
        ],
    },
    devtool: "cheap-source-map",
    output: {
        pathinfo: true,
        // js輸出位置
        path: path.resolve(__dirname, "local/goy-export/assets/js/"),
        // output html載入js的路徑
        publicPath: "/assets/js/",
        filename: "hello.js"
    },
    plugins: [
        definePlugin,
        new CleanWebpackPlugin(["local/goy-export/"]),
        new HtmlWebpackPlugin({
            // html的輸出路徑 (相對於output.path)
            filename: "../../hello.html",
            // html樣本路徑 (相對於根目錄)
            template: "front/tpl/container.html",
            minify: {
                removeAttributeQuotes: false,
                collapseWhitespace: false,
                html5: false,
                minifyCSS: false,
                minifyJS: false,
                minifyURLs: false,
                removeComments: false,
                removeEmptyAttributes: false
            },
            hash: false
        })
    ],
    module: {
        rules: [
            {test: /\.js$/, use: ["babel-loader"], include: path.join(__dirname, "./")},
            {test: /pixi\.js/, use: ["expose-loader?PIXI"]},
            {test: /phaser-split\.js$/, use: ["expose-loader?Phaser"]},
            {test: /p2\.js/, use: ["expose-loader?p2"]},
            {test: /\.css$/, use: ["style-loader", "css-loader"]},
            // img的輸出路徑 (相對於output.path)
            {test: /\.(png|jpg|gif|json)$/, use: [{loader: "file-loader", options: {outputPath: "../img/"}}]}
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
