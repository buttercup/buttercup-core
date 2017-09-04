"use strict";

const uuid = require("uuid");

let __uuidGenerator;

/**
 * Generate a UUID (v4)
 * @returns {String} The new UUID
 */
function generateUUID() {
    return uuid.v4();
}

module.exports = {
    getUUIDGenerator: () => __uuidGenerator || generateUUID,
    setUUIDGenerator: (generator) => { __uuidGenerator = generator; }
};
