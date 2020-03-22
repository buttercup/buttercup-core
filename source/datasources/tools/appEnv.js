const { getSharedAppEnv } = require("../../env/appEnv.js");

function getCompressFn() {
    return getSharedAppEnv().getProperty("compression/v1/compressText");
}

function getDecompressFn() {
    return getSharedAppEnv().getProperty("compression/v1/decompressText");
}

function getDecryptFn() {
    return getSharedAppEnv().getProperty("crypto/v1/decryptText");
}

function getEncryptFn() {
    return getSharedAppEnv().getProperty("crypto/v1/encryptText");
}

function getWebDAVFactory() {
    return getSharedAppEnv().getProperty("net/webdav/v1/newClient");
}

module.exports = {
    getCompressFn,
    getDecompressFn,
    getDecryptFn,
    getEncryptFn,
    getWebDAVFactory
};
