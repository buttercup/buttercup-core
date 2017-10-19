const path = require("path");
const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const { DefinePlugin } = webpack;

const WEB_ENTRY = path.resolve(__dirname, "./source/web/index.js");
const DIST = path.resolve(__dirname, "./dist");

module.exports = {

    entry: WEB_ENTRY,

    module: {
        rules: [
            {
                test: /iconv-loader/,
                use: "null-loader"
            },
            {
                test: /\.js$/,
                use: "babel-loader"
            },
            {
                test: /\.json$/,
                use: "json-loader"
            }
        ]
    },

    node: {
        fs: "empty"
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
        }),
        new UglifyJSPlugin()
    ]

};
