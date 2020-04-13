const { getSharedAppEnv } = require("./env/core/singleton.js");
const { applyNativeConfiguration } = require("./env/native/index.js");

/**
 * Initialise the node/native environment
 * @memberof module:Buttercup
 */
function init() {
    const appEnv = getSharedAppEnv();
    applyNativeConfiguration(appEnv);
}

module.exports = Object.assign({}, require("./index.common.js"), {
    init
});
