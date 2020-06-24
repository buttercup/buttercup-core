const { getCryptoResources } = require("./crypto.js");
const { getCompressionResources } = require("./compression.js");
const { getEnvironmentResources } = require("./environment.js");
const { getNetResources } = require("./net.js");

function applyNativeConfiguration(appEnv) {
    appEnv.setProperties(getCryptoResources());
    appEnv.setProperties(getCompressionResources());
    appEnv.setProperties(getEnvironmentResources());
    appEnv.setProperties(getNetResources());
}

module.exports = {
    applyNativeConfiguration
};
