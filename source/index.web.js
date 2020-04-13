const { getSharedAppEnv } = require("./env/core/singleton.js");
const { applyWebConfiguration } = require("./env/web/index.js");

/**
 * Initialise the web environment
 * @memberof module:Buttercup
 */
function init() {
    const appEnv = getSharedAppEnv();
    applyWebConfiguration(appEnv);
}

module.exports = Object.assign({}, require("./index.common.js"), {
    init
});
