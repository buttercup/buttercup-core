import gzip from "gzip-js";

/**
 * Compress text using GZIP
 * @param text The text to compress
 * @returns Compressed text
 */
function compress(text: string): string {
    const compressed = gzip.zip(text, {
        level: 9,
        timestamp: Math.round(Date.now() / 1000)
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
 * @param text The compressed text
 * @returns Decompressed text
 */
function decompress(text: string): string {
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

export function getCompressionResources() {
    return {
        "compression/v1/compressText": compress,
        "compression/v1/decompressText": decompress
    };
}
