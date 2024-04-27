const path = require("path");
const { DefinePlugin } = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const ResolveTypeScriptPlugin = require("resolve-typescript-plugin");
const { merge } = require("webpack-merge");

const SOURCE = path.resolve(__dirname, "./source");
const WEB_ENTRY = path.join(SOURCE, "index.web.ts");
const WEB_DIST = path.resolve(__dirname, "./dist/web");
const RN_DIST = path.resolve(__dirname, "./dist/react-native");

const plugins = [
    new DefinePlugin({
        BUTTERCUP_WEB: true
    })
];
if (process.env.ANALYSE === "bundle") {
    plugins.push(new BundleAnalyzerPlugin());
}

function getBasicConfig() {
    return {
        devtool: false,

        experiments: {
            outputModule: true
        },

        externalsType: "module",

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
            filename: "index.js",
            environment: {
                module: true
            },
            library: {
                type: "module"
            }
        },

        plugins,

        resolve: {
            extensions: [".js"],
            fallback: {
                crypto: false,
                dns: false,
                fs: false,
                http: false,
                https: false,
                net: false,
                path: false,
                stream: false,
                util: false
            },
            plugins: [
                new ResolveTypeScriptPlugin()
            ]
        }
    };
}

module.exports = [
    merge(getBasicConfig(), {
        entry: WEB_ENTRY,

        output: {
            path: WEB_DIST
        },
    
        target: "web"
    }),
    merge(getBasicConfig(), {
        entry: WEB_ENTRY,

        output: {
            path: RN_DIST
        },
    
        target: "web"
    })
];
