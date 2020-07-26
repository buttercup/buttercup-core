import { v4 as uuid } from "uuid";

/**
 * Generate a UUID (v4)
 * @returns The new UUID
 */
export function generateUUID(): string {
    return uuid();
}
