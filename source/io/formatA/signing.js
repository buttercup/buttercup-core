const BUTTERCUP_FORMAT = "buttercup/a";
const BUTTERCUP_SIGNATURE = "b~>" + BUTTERCUP_FORMAT;

/**
 * Get the current format
 * @returns {String} The format
 */
function getFormat() {
    return BUTTERCUP_FORMAT;
}

/**
 * Get the current signature
 * @returns {String} The signature
 */
function getSignature() {
    return BUTTERCUP_SIGNATURE;
}

/**
 * Detect if a string has a valid signature
 * @param {String} text The text to check
 * @returns {Boolean} True if a valid signature is detected
 */
function hasValidSignature(text) {
    return text.indexOf(BUTTERCUP_SIGNATURE) === 0;
}

/**
 * Sign some text
 * @param {String} text The text to sign
 * @returns {String} The signed text
 */
function sign(text) {
    return hasValidSignature(text) ? text : BUTTERCUP_SIGNATURE + text;
}

/**
 * Strip the signature from some text
 * @param {String} text The text to strip the signature from
 * @returns {String} The text with the signature removed
 */
function stripSignature(text) {
    const sigLen = BUTTERCUP_SIGNATURE.length;
    return text.substr(sigLen, text.length - sigLen);
}

module.exports = {
    getFormat,
    getSignature,
    hasValidSignature,
    sign,
    stripSignature
};
