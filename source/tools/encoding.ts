import { Base64 } from "js-base64";
import { generateUUID } from "./uuid";

const ENCODED_STRING_PATTERN = /^utf8\+base64:(|[a-zA-Z0-9+\/=]+)$/;
export const ENCODED_STRING_PREFIX = "utf8+base64:";

export function base64ToBytes(b64: string): Uint8Array {
    return Base64.toUint8Array(b64);
}

export function bytesToBase64(uint8Arr: Uint8Array): string {
    return Base64.fromUint8Array(uint8Arr);
}

/**
 * Decode an encoded property value
 * @param {String} value The encoded value
 * @returns {String} The decoded value
 */
export function decodeStringValue(value: string): string {
    if (isEncoded(value) !== true) {
        throw new Error("Cannot decode: provided value is not encoded");
    }
    const newValue = value.substr(ENCODED_STRING_PREFIX.length);
    return Base64.decode(newValue);
}

/**
 * Encode a raw value into safe storage form
 * Uses base64 for encoding
 * @param value The raw value to encode
 * @returns The encoded result
 */
export function encodeStringValue(value: string): string {
    return `${ENCODED_STRING_PREFIX}${Base64.encode(value)}`;
}

/**
 * Get a unique identifier (UUID v4)
 * @returns A unique identifier
 */
export function getUniqueID(): string {
    return generateUUID();
}

/**
 * Check if a string value is encoded
 * @param text The value to check
 * @returns True if the text is encoded
 */
export function isEncoded(text: string): boolean {
    return ENCODED_STRING_PATTERN.test(text);
}
