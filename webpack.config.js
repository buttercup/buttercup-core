const path = require("path");
const exec = require("child_process").exec;
const { DefinePlugin } = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const SOURCE = path.resolve(__dirname, "./source");
const WEB_ENTRY = path.join(SOURCE, "index.web.ts");
const DIST = path.resolve(__dirname, "./web");

const plugins = [
    new DefinePlugin({
        BUTTERCUP_WEB: true
    }),
    {
        apply: compiler => {
            compiler.hooks.afterEmit.tap("AfterEmitPlugin", compilation => {
                exec("./scripts/fix_web_typings.sh", (err, stdout, stderr) => {
                    if (stdout) process.stdout.write(stdout);
                    if (stderr) process.stderr.write(stderr);
                });
            });
        }
    }
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
                test: /\.[tj]s$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: path.resolve(__dirname, "./tsconfig.web.json"),
                            onlyCompileBundledFiles: true
                        }
                    }
                    // {
                    //     loader: "babel-loader",
                    //     options: {
                    //         "presets": [
                    //             ["@babel/preset-env", {
                    //                 "useBuiltIns": false,
                    //                 "targets": {
                    //                     "chrome": "60"
                    //                 }
                    //             }]
                    //         ],
                    //         "plugins": [
                    //             "@babel/plugin-proposal-class-properties",
                    //             "@babel/plugin-proposal-object-rest-spread"
                    //         ]
                    //     }
                    // }
                ]
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
        path: "empty",
        stream: "empty"
    },

    output: {
        path: DIST,
        filename: "index.js",
        library: "Buttercup",
        libraryTarget: "umd"
    },

    plugins,

    resolve: {
        extensions: [".ts", ".js"]
    },

    target: "web"
};

module.exports = baseConfig;
