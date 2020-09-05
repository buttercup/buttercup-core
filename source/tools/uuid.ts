import { getSharedAppEnv } from "../env/appEnv";

/**
 * Generate a UUID (v4)
 * @returns The new UUID
 */
export function generateUUID(): string {
    return getSharedAppEnv().getProperty("rng/v1/uuid")();
}
