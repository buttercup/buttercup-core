import { getSharedAppEnv } from "./env/core/singleton";
import { AppEnvMapper } from "./env/appEnv";
import { applyWebConfiguration } from "./env/web/index";
import * as localFileClient from "./web/localFileClient";

let __hasInitialised = false;

/**
 * Initialise the web environment
 * @memberof module:Buttercup
 */
export function init(appEnvMapper: AppEnvMapper = x => x) {
    if (__hasInitialised) return;
    __hasInitialised = true;
    const appEnv = getSharedAppEnv();
    applyWebConfiguration(appEnv, appEnvMapper);
}

export { default as LocalFileDatasource } from "./web/LocalFileDatasource";
export { default as LocalStorageInterface } from "./web/LocalStorageInterface";
export { default as LocalStorageDatasource } from "./web/LocalStorageDatasource";
export { localFileClient };

export * from "./index.common";
