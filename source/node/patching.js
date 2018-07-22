const HotPatcher = require("hot-patcher");

let __patcher;

function getSharedPatcher() {
    if (!__patcher) {
        __patcher = new HotPatcher();
    }
    return __patcher;
}

module.exports = {
    getSharedPatcher
};
