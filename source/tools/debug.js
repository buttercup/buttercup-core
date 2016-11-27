const debug = require("debug");

module.exports = function __createDebug(name) {
    let debugFn = debug(`buttercupcore:${name}`);
    return function __debug(msg) {
        debugFn(msg);
    };
};
