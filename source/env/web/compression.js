const gzip = require("gzip-js");

/**
 * Compress text using GZIP
 * @param {String} text The text to compress
 * @returns {String} Compressed text
 */
function compress(text) {
    const compressed = gzip.zip(text, {
        level: 9,
        timestamp: parseInt(Date.now() / 1000, 10)
    });
    const compressedLength = compressed.length;
    let outputText = "";
    for (let i = 0; i < compressedLength; i += 1) {
        outputText += String.fromCharCode(compressed[i]);
    }
    return outputText;
}

/**
 * Decompress a compressed string (GZIP)
 * @param {String} text The compressed text
 * @returns {String} Decompressed text
 */
function decompress(text) {
    var compressedData = [],
        textLen = text.length;
    for (var i = 0; i < textLen; i += 1) {
        compressedData.push(text.charCodeAt(i));
    }
    const decompressedData = gzip.unzip(compressedData);
    const decompressedLength = decompressedData.length;
    let outputText = "";
    for (let j = 0; j < decompressedLength; j += 1) {
        outputText += String.fromCharCode(decompressedData[j]);
    }
    return outputText;
}

function getCompressionResources() {
    return {
        "compression/v1/compressText": compress,
        "compression/v1/decompressText": decompress
    };
}

module.exports = {
    getCompressionResources
};
