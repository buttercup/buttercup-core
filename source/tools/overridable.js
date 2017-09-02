"use strict";

const Crypto = require("crypto");
const uuid = require("uuid");

let __textHasher,
    __uuidGenerator;

/**
 * Generate a UUID (v4)
 * @returns {String} The new UUID
 */
function generateUUID() {
    return uuid.v4();
}

/**
 * Hash text and output a buffer
 * @param {String} text The text to hash
 * @returns {Buffer} A buffer containing the hashed content
 */
function hashText(text) {
    return Crypto.createHash("sha256").update(text).digest();
}

module.exports = {
    getTextHasher: () => __textHasher || hashText,
    getUUIDGenerator: () => __uuidGenerator || generateUUID,
    setTextHasher: (hasher) => { __textHasher = hasher; },
    setUUIDGenerator: (generator) => { __uuidGenerator = generator; }
};
