const uuid = require("uuid/v4");

/**
 * Generate a UUID (v4)
 * @returns {String} The new UUID
 */
function generateUUID() {
    return uuid();
}

module.exports = {
    generateUUID
};
