import { getSharedAppEnv } from "./env/core/singleton";
import { applyWebConfiguration } from "./env/web/index";

let __hasInitialised = false;

/**
 * Initialise the web environment
 * @memberof module:Buttercup
 */
export function init() {
    if (__hasInitialised) return;
    __hasInitialised = true;
    const appEnv = getSharedAppEnv();
    applyWebConfiguration(appEnv);
}

export { default as LocalFileDatasource } from "./web/LocalFileDatasource";
export { default as LocalStorageInterface } from "./web/LocalStorageInterface";
export * as localFileClient from "./web/localFileClient";

export * from "./index.common";
