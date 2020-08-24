import { getCryptoResources } from "./crypto";
import { getCompressionResources as getV1CompressionResources } from "./compression.v1";
import { getCompressionResources as getV2CompressionResources } from "./compression.v2";
import { getEnvironmentResources } from "./environment";
import { getNetResources } from "./net";
import { AppEnv } from "../core/appEnv";

export function applyNativeConfiguration(appEnv: AppEnv) {
    appEnv.setProperties(getCryptoResources());
    appEnv.setProperties(getV1CompressionResources());
    appEnv.setProperties(getV2CompressionResources());
    appEnv.setProperties(getEnvironmentResources());
    appEnv.setProperties(getNetResources());
}
