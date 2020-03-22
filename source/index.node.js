const { getSharedAppEnv } = require("./env/core/singleton.js");
const { applyNativeConfiguration } = require("./env/native/index.js");

const appEnv = getSharedAppEnv();
applyNativeConfiguration(appEnv);

module.exports = require("./index.common.js");
