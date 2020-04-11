const OTPURI_PATTERN = /^otpauth:\/\/[ht]otp\/[^\s]+$/i;

/**
 * Check if a string is an OTP URI
 * @param {String} str The string to check
 * @returns {Boolean}
 * @memberof module:Buttercup
 */
function isOTPURI(str) {
    return OTPURI_PATTERN.test(str);
}

/**
 * Check if an object is a vault facade
 * @param {Object|*} obj The item to check
 * @returns {Boolean} True if a vault facade
 * @memberof module:Buttercup
 */
function isVaultFacade(obj) {
    if (!obj || typeof obj !== "object") {
        return false;
    }
    return (
        obj.type === "vault" && typeof obj.id === "string" && Array.isArray(obj.entries) && Array.isArray(obj.groups)
    );
}

module.exports = {
    isOTPURI,
    isVaultFacade
};
