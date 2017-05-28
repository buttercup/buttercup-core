"use strict";

var Crypto = require("crypto"),
    uuid = require("uuid"),
    gzip = require("gzip-js");

const ENCODED_STRING_PATTERN = /^utf8\+base64:(|[a-zA-Z0-9+\/=]+)$/;
const ENCODED_STRING_PREFIX = "utf8+base64:";

var __gzipOptions = {
    level: 9,
    timestamp: parseInt(Date.now() / 1000, 10)
};

var lib = module.exports = {

    /**
     * Prefix for encoded strings
     * @type {String}
     */
    ENCODED_STRING_PREFIX,

    /**
     * Compress text using GZIP
     * @param {String} text The text to compress
     * @returns {String} Compressed text
     */
    compress: function(text) {
        var compressed = gzip.zip(text, __gzipOptions),
            compressedLength = compressed.length,
            outputText = "";
        for (var i = 0; i < compressedLength; i += 1) {
            outputText += String.fromCharCode(compressed[i]);
        }
        return outputText;
    },

    /**
     * Decode an encoded property/meta value
     * @param {String} value The encoded value
     * @returns {String} The decoded value
     */
    decodeStringValue: function(value) {
        if (lib.isEncoded(value) !== true) {
            throw new Error("Cannot decode: provided value is not encoded");
        }
        value = value.substr(ENCODED_STRING_PREFIX.length);
        let buff = Buffer.from(value, "base64");
        return buff.toString("utf8");
    },

    /**
     * Decompress a compressed string (GZIP)
     * @param {String} text The compressed text
     * @returns {String} Decompressed text
     */
    decompress: function(text) {
        var compressedData = [],
            textLen = text.length;
        for (var i = 0; i < textLen; i += 1) {
            compressedData.push(text.charCodeAt(i));
        }
        var decompressedData = gzip.unzip(compressedData),
            decompressedLength = decompressedData.length,
            outputText = "";
        for (var j = 0; j < decompressedLength; j += 1) {
            outputText += String.fromCharCode(decompressedData[j]);
        }
        return outputText;
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
        return uuid.v4();
    },

    /**
     * Hash text using sha256
     * @param {String} text
     * @returns {Buffer}
     */
    hashText: function(text) {
        return Crypto.createHash("sha256").update(text).digest();
    },

    /**
     * Check if a string value is encoded
     * @param {String} text The value to check
     * @returns {Boolean} True if the text is encoded
     */
    isEncoded: function(text) {
        return ENCODED_STRING_PATTERN.test(text);
    }

};
