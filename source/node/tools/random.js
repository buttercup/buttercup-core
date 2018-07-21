let __randomStringGenerator;

const RANDOM_STRING_CHARSET =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789~!@#$%^&*()_+-=[]{}|;:,.<>?";

/**
 * Generate a random string
 * @param {Number} length The length of the string to generate
 * @param {String=} charset The characters to use
 * @returns {Promise.<String>} The new random string
 */
function generateRandomString(length, charset = RANDOM_STRING_CHARSET) {
    if (!length || length <= 0) {
        return Promise.reject(new Error(`Failed generating random string: invalid length requested: ${length}`));
    }
    const chars = charset.length;
    let output = "";
    for (let i = 0; i < length; i += 1) {
        const rndInd = Math.floor(Math.random() * chars);
        output += charset[rndInd];
    }
    return Promise.resolve(output);
}

module.exports = {
    RANDOM_STRING_CHARSET,
    getRandomStringGenerator: () => __randomStringGenerator || generateRandomString,
    setRandomStringGenerator: generator => {
        __randomStringGenerator = generator;
    }
};
