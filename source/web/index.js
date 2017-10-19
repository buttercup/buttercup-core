const Buttercup = require("../node/index.js");

const LocalStorageInterface = require("./LocalStorageInterface.js");

module.exports = Object.assign({}, Buttercup, {
    Web: {
        LocalStorageInterface
    }
});
