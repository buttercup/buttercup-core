const path = require("path");
const { DefinePlugin } = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const SOURCE = path.resolve(__dirname, "./source");
const WEB_ENTRY = path.join(SOURCE, "index.web.js");
const DIST = path.resolve(__dirname, "./web");

const plugins = [
    new DefinePlugin({
        BUTTERCUP_WEB: true
    })
];
if (process.env.ANALYSE === "bundle") {
    plugins.push(new BundleAnalyzerPlugin());
}

const baseConfig = {
    devtool: false,

    entry: WEB_ENTRY,

    module: {
        rules: [
            {
                test: /(iconv-loader|bluebird)/,
                use: "null-loader"
            },
            {
                test: /\.js$/,
                include: [
                    SOURCE
                ],
                use: "babel-loader"
            }
        ]
    },

    node: {
        crypto: "empty",
        dns: "empty",
        fs: "empty",
        http: "empty",
        https: "empty",
        net: "empty",
        stream: "empty"
    },

    output: {
        path: DIST,
        filename: "index.js",
        library: "Buttercup",
        libraryTarget: "umd"
    },

    plugins
};

module.exports = [
    baseConfig
];
