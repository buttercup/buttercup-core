const { getSharedAppEnv } = require("./env/core/singleton.js");
const { applyNativeConfiguration } = require("./env/native/index.js");

let __hasInitialised = false;

/**
 * Initialise the node/native environment
 * @memberof module:Buttercup
 */
function init() {
    if (__hasInitialised) return;
    __hasInitialised = true;
    const appEnv = getSharedAppEnv();
    applyNativeConfiguration(appEnv);
}

module.exports = Object.assign({}, require("./index.common.js"), {
    init
});
