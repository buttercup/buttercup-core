const webpackConfig = require("./webpack.config.js");

const CI =  !!process.env.CI;

delete webpackConfig.entry;
delete webpackConfig.output;
webpackConfig.mode = process.env.BUNDLE === "production" ? "production" : "development";
webpackConfig.module.rules.push({
    test: /\.(png|jpg)$/,
    use: "arraybuffer-loader"
});

module.exports = config => config.set({

    basePath: __dirname,

    browsers: CI ? ["ChromeHeadless", "FirefoxHeadless"] : ["FirefoxHeadless"],

    captureTimeout: 60000,

    colors: true,

    coverageReporter: {
        dir: "build/coverage/",
        reporters: [
            { type: "html" },
            { type: "text" },
            { type: "text-summary" }
        ]
    },

    exclude: [],

    files: [
        "source/web/index.js",
        "test/web/index.js",
        "test/web/**/*.spec.js"
    ],

    frameworks: ["mocha", "sinon"],

    plugins: [
        require("karma-webpack"),
        require("istanbul-instrumenter-loader"),
        require("karma-chrome-launcher"),
        require("karma-firefox-launcher"),
        require("karma-mocha"),
        require("karma-sinon"),
        require("karma-coverage"),
        require("karma-spec-reporter")
    ],

    preprocessors: {
        "source/**/*.js": ["webpack"],
        "test/web/index.js": ["webpack"],
        "test/web/**/*.spec.js": ["webpack"]
    },

    reporters: ["spec", "progress"],

    singleRun: true,

    webpack: webpackConfig

});
