const { getCryptoResources } = require("./crypto.js");
const { getCompressionResources } = require("./compression.js");
const { getNetResources } = require("./net.js");

function applyWebConfiguration(appEnv) {
    appEnv.setProperties(getCryptoResources());
    appEnv.setProperties(getCompressionResources());
    appEnv.setProperties(getNetResources());
}

module.exports = {
    applyWebConfiguration
};
