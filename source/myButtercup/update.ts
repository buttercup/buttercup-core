const MAX_INT_VALUE = 2147483647;

/**
 * Generate a new update ID
 * @returns A randomly generated ID
 */
export function generateNewUpdateID(): number {
    return Math.floor(Math.random() * MAX_INT_VALUE);
}
