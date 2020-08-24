import { getSharedAppEnv } from "./env/core/singleton";
import { applyNativeConfiguration } from "./env/native/index";

let __hasInitialised = false;

/**
 * Initialise the node/native environment
 * @memberof module:Buttercup
 */
export function init() {
    if (__hasInitialised) return;
    __hasInitialised = true;
    const appEnv = getSharedAppEnv();
    applyNativeConfiguration(appEnv);
}

export * from "./index.common";
