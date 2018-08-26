const path = require("path");
const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const { DefinePlugin } = webpack;

const SOURCE = path.resolve(__dirname, "./source");
const WEB_ENTRY = path.join(SOURCE, "web/index.js");
const ENV = process.env.NODE_ENV || "production";
const DIST = path.resolve(__dirname, "./dist");

const baseConfig = {
    entry: WEB_ENTRY,
    module: {
        rules: [
            {
                test: /iconv-loader/,
                use: "null-loader"
            },
            {
                test: /\.js$/,
                include: [
                    SOURCE,
                    /node_modules\/(got|cacheable-request)/
                ],
                use: "babel-loader"
            },
            {
                test: /\.json$/,
                use: "json-loader"
            }
        ]
    },
    node: {
        fs: "empty",
        net: "empty"
    },
    output: {
        path: DIST,
        filename: "buttercup-web.js",
        library: "Buttercup",
        libraryTarget: "umd"
    },
    plugins: [
        new DefinePlugin({
            BUTTERCUP_WEB: true
        })
    ]
};

const configs = [
    baseConfig,
    Object.assign({}, baseConfig, {
        output: Object.assign({}, baseConfig.output, {
            filename: "buttercup-web.min.js"
        }),
        plugins: [
            ...baseConfig.plugins,
            new UglifyJSPlugin()
        ]
    })
];

module.exports = ENV === "production"
    ? configs
    : baseConfig;
