const { getSharedPatcher } = require("../patching.js");

const RANDOM_STRING_CHARSET =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789~!@#$%^&*()_+-=[]{}|;:,.<>?";

/**
 * Generate a random string
 * @param {Number} length The length of the string to generate
 * @param {String=} charset The characters to use
 * @returns {Promise.<String>} The new random string
 */
function generateRandomString(length, charset = RANDOM_STRING_CHARSET) {
    return getSharedPatcher().patchInline(
        "buttercup/randomString",
        (strLen, characters) => {
            if (!strLen || strLen <= 0) {
                return Promise.reject(
                    new Error(`Failed generating random string: invalid length requested: ${strLen}`)
                );
            }
            const chars = characters.length;
            let output = "";
            for (let i = 0; i < strLen; i += 1) {
                const rndInd = Math.floor(Math.random() * chars);
                output += characters[rndInd];
            }
            return Promise.resolve(output);
        },
        length,
        charset
    );
}

module.exports = {
    RANDOM_STRING_CHARSET,
    generateRandomString
};
