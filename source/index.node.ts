import { getSharedAppEnv } from "./env/core/singleton";
import { AppEnvMapper } from "./env/appEnv";
import { applyNativeConfiguration } from "./env/native/index";

let __hasInitialised = false;

/**
 * Initialise the node/native environment
 * @memberof module:Buttercup
 */
export function init(appEnvMapper: AppEnvMapper = x => x) {
    if (__hasInitialised) return;
    __hasInitialised = true;
    const appEnv = getSharedAppEnv();
    applyNativeConfiguration(appEnv, appEnvMapper);
}

export * from "./index.common";
