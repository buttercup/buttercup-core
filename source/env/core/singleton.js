const { createAppEnv } = require("./appEnv.js");
const { assignObjImmutableProp } = require("./prop.js");
const { getGlobal } = require("./global.js");

const GLOBAL_INSTANCE_REF = "@@__ButtercupAppEnv";

/**
 * Get the shared app-environment configurator
 * (provides a controller for handling the substitution of
 * functions that need to work differently on different
 * environments)
 * @returns {AppEnv}
 * @memberof module:Buttercup
 */
function getSharedAppEnv() {
    const globalRef = getGlobal();
    if (!globalRef[GLOBAL_INSTANCE_REF]) {
        const appEnv = createAppEnv();
        assignObjImmutableProp(globalRef, GLOBAL_INSTANCE_REF, appEnv);
    }
    return globalRef[GLOBAL_INSTANCE_REF];
}

module.exports = {
    getSharedAppEnv
};
