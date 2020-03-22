const { createAppEnv } = require("./appEnv.js");
const { assignObjImmutableProp } = require("./prop.js");
const { getGlobal } = require("./global.js");

const GLOBAL_INSTANCE_REF = "@@__ButtercupAppEnv";

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
