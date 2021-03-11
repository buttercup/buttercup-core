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
                test: /(iconv-loader|bluebird|form-data)/,
                use: "null-loader"
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                    options: {
                        configFile: path.resolve(__dirname, "./tsconfig.web.json"),
                        onlyCompileBundledFiles: true
                    }
                }
            }
        ]
    },

    output: {
        path: DIST,
        filename: "index.js",
        library: "Buttercup",
        libraryTarget: "umd"
    },

    plugins,

    resolve: {
        extensions: [".ts", ".js"],
        fallback: {
            crypto: false,
            dns: false,
            fs: false,
            http: false,
            https: false,
            net: false,
            path: false,
            stream: false
        }
    },

    target: "web"
};

module.exports = baseConfig;
