const uuid = require("uuid/v4");

let __uuidGenerator;

/**
 * Generate a UUID (v4)
 * @returns {String} The new UUID
 */
function generateUUID() {
    return uuid();
}

module.exports = {
    getUUIDGenerator: () => __uuidGenerator || generateUUID,
    setUUIDGenerator: generator => {
        __uuidGenerator = generator;
    }
};
