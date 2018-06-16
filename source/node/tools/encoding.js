const { getUUIDGenerator } = require("./uuid.js");

const ENCODED_STRING_PATTERN = /^utf8\+base64:(|[a-zA-Z0-9+\/=]+)$/;
const ENCODED_STRING_PREFIX = "utf8+base64:";

const lib = (module.exports = {
    /**
     * Prefix for encoded strings
     * @type {String}
     */
    ENCODED_STRING_PREFIX,

    /**
     * Decode an encoded property/meta value
     * @param {String} value The encoded value
     * @returns {String} The decoded value
     */
    decodeStringValue: function(value) {
        if (lib.isEncoded(value) !== true) {
            throw new Error("Cannot decode: provided value is not encoded");
        }
        const newValue = value.substr(ENCODED_STRING_PREFIX.length);
        const buff = Buffer.from(newValue, "base64");
        return buff.toString("utf8");
    },

    /**
     * Encode a raw value into safe storage form
     * Uses base64 for encoding
     * @param {String} value The raw value to encode
     * @returns {String} The encoded result
     */
    encodeStringValue: function(value) {
        return ENCODED_STRING_PREFIX + Buffer.from(value, "utf8").toString("base64");
    },

    /**
     * Get a unique identifier (UUID v4)
     * @returns {String} A unique identifier
     */
    getUniqueID: function() {
        return getUUIDGenerator()();
    },

    /**
     * Check if a string value is encoded
     * @param {String} text The value to check
     * @returns {Boolean} True if the text is encoded
     */
    isEncoded: function(text) {
        return ENCODED_STRING_PATTERN.test(text);
    }
});
