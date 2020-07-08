const { getSharedAppEnv } = require("./env/core/singleton.js");
const { applyWebConfiguration } = require("./env/web/index.js");
const LocalFileDatasource = require("./web/LocalFileDatasource.js");
const LocalStorageInterface = require("./web/LocalStorageInterface.js");
const localFileClient = require("./web/localFileClient.js");

let __hasInitialised = false;

/**
 * Initialise the web environment
 * @memberof module:Buttercup
 */
function init() {
    if (__hasInitialised) return;
    __hasInitialised = true;
    const appEnv = getSharedAppEnv();
    applyWebConfiguration(appEnv);
}

module.exports = Object.assign({}, require("./index.common.js"), require("./web/index.js"), {
    LocalFileDatasource,
    LocalStorageInterface,

    localFileClient,

    init
});
