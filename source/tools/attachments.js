const { getSharedAppEnv } = require("../env/appEnv");
const { getCredentials } = require("../credentials/channel");

const ATTACHMENT_EXT = "bcatt";

function decryptAttachment(buff, credentials) {
    const { masterPassword } = getCredentials(credentials.id);
    const decrypt = getSharedAppEnv().getProperty("crypto/v1/decryptBuffer");
    return decrypt(buff, masterPassword);
}

function encryptAttachment(buff, credentials) {
    const { masterPassword } = getCredentials(credentials.id);
    const encrypt = getSharedAppEnv().getProperty("crypto/v1/encryptBuffer");
    return encrypt(buff, masterPassword);
}

function getBufferSize(buff) {
    if (typeof buff.byteLength !== "undefined") {
        return buff.byteLength;
    }
    return buff.length;
}

module.exports = {
    ATTACHMENT_EXT,
    decryptAttachment,
    encryptAttachment,
    getBufferSize
};
