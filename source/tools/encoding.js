"use strict";

var Crypto = require("crypto"),
    uuid = require("uuid"),
    gzip = require("gzip-js");

var __gzipOptions = {
    level: 9,
    timestamp: parseInt(Date.now() / 1000, 10)
};

var lib = module.exports = {

    compress: function(text) {
        var compressed = gzip.zip(text, __gzipOptions),
            compressedLength = compressed.length,
            outputText = "";
        for (var i = 0; i < compressedLength; i += 1) {
            outputText += String.fromCharCode(compressed[i]);
        }
        return outputText;
    },

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

    escapeTextValue: function(txt) {
        return txt.replace(/"/g, '\\"');
    },

    getUniqueID: function() {
        return uuid.v4();
    },

    /**
     * Hash text using sha256
     * @param {String} text
     * @returns {Buffer}
     */
    hashText: function(text) {
        return Crypto.createHash('sha256').update(text).digest();
    },

    unescapeTextValue: function(txt) {
        return txt.replace(/\\"/g, '"');
    }

};
