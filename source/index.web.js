const { getSharedAppEnv } = require("./env/core/singleton.js");
const { applyWebConfiguration } = require("./env/web/index.js");

const appEnv = getSharedAppEnv();
// applyWebConfiguration(appEnv);

module.exports = require("./index.common.js");
