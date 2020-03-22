const { hasValidSignature, sign, stripSignature } = require("@buttercup/signing");
const { getCompressFn, getDecompressFn, getDecryptFn, getEncryptFn } = require("./appEnv.js");

/**
 * Convert encrypted text to an array of commands (history)
 * @param {String} encText The encrypted archive content
 * @param {Credentials} credentials A credentials instance that has a password, keyfile
 *  or both
 * @returns {Promise.<Array>} A promise that resolves with an array of commands
 * @private
 */
function convertEncryptedContentToHistory(encText, credentials) {
    const decompress = getDecompressFn();
    const decrypt = getDecryptFn();
    return Promise.resolve()
        .then(() => {
            if (!hasValidSignature(encText)) {
                throw new Error("No valid signature in archive");
            }
            return stripSignature(encText);
        })
        .then(encryptedData => decrypt(encryptedData, credentials.password))
        .then(decrypted => {
            if (decrypted && decrypted.length > 0) {
                const decompressed = decompress(decrypted);
                if (decompressed) {
                    return historyStringToArray(decompressed);
                }
            }
            throw new Error("Failed reconstructing history: Decryption failed");
        });
}

/**
 * Convert an array of commands (history) to an encrypted string
 * @param {Array.<String>} historyArr An array of commands
 * @param {Credentials} credentials A credentials instance that has a password, keyfile
 *  or both
 * @returns {String} Encrypted archive contents
 * @private
 */
function convertHistoryToEncryptedContent(historyArr, credentials) {
    const compress = getCompressFn();
    const encrypt = getEncryptFn();
    return Promise.resolve()
        .then(() => historyArrayToString(historyArr))
        .then(history => compress(history))
        .then(compressed => encrypt(compressed, credentials.password))
        .then(sign);
}

/**
 * Convert array of history lines to a string
 * @param {Array.<String>} historyArray An array of history items
 * @returns {String} The string representation
 * @private
 */
function historyArrayToString(historyArray) {
    return historyArray.join("\n");
}

/**
 * Convert a history string to an array
 * @param {String} historyString The history string
 * @returns {Array.<String>} An array of history items
 * @private
 */
function historyStringToArray(historyString) {
    return historyString.split("\n");
}

module.exports = {
    convertEncryptedContentToHistory,
    convertHistoryToEncryptedContent,
    historyArrayToString,
    historyStringToArray
};
