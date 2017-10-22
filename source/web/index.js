const Buttercup = require("../node/index.js");

const LocalStorageInterface = require("./LocalStorageInterface.js");
const HashingTools = require("./HashingTools.js");

module.exports = Object.assign({}, Buttercup, {
    Web: {
        HashingTools,
        LocalStorageInterface
    }
});
