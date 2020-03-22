const VaultFormatA = require("./VaultFormatA.js");

function detectFormat(encryptedContent) {
    return getDefaultFormat();
}

function getDefaultFormat() {
    return VaultFormatA;
}

module.exports = {
    detectFormat,
    getDefaultFormat
};
