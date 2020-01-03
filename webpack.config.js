const path = require("path");
const { DefinePlugin } = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const SOURCE = path.resolve(__dirname, "./source");
const WEB_ENTRY = path.join(SOURCE, "web/index.js");
const DIST = path.resolve(__dirname, "./dist");

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

    mode: "development",

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
        buffer: "empty",
        crypto: "empty",
        fs: "empty",
        net: "empty"
    },

    output: {
        path: DIST,
        filename: "buttercup-web.js",
        library: "Buttercup",
        libraryTarget: "umd"
    },

    plugins
};

module.exports = [
    baseConfig,
    Object.assign({}, baseConfig, {
        mode: "production",
        output: Object.assign({}, baseConfig.output, {
            filename: "buttercup-web.min.js"
        })
    })
];
