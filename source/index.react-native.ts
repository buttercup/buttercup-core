import { getSharedAppEnv } from "./env/core/singleton.js";
import { AppEnvMapper } from "./env/appEnv.js";
import { applyWebConfiguration } from "./env/web/index.js";

let __hasInitialised = false;

/**
 * Initialise the web environment
 * @memberof module:Buttercup
 */
export function init(appEnvMapper: AppEnvMapper = (x) => x) {
    if (__hasInitialised) return;
    __hasInitialised = true;
    const appEnv = getSharedAppEnv();
    applyWebConfiguration(appEnv, appEnvMapper);
}

export * from "./index.common.js";
