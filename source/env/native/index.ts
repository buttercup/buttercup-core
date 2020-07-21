import { getCryptoResources } from "./crypto";
import { getCompressionResources } from "./compression";
import { getEnvironmentResources } from "./environment";
import { getNetResources } from "./net";
import { AppEnv } from "../core/appEnv";

export function applyNativeConfiguration(appEnv: AppEnv) {
    appEnv.setProperties(getCryptoResources());
    appEnv.setProperties(getCompressionResources());
    appEnv.setProperties(getEnvironmentResources());
    appEnv.setProperties(getNetResources());
}
