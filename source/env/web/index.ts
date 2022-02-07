import { getCryptoResources } from "./crypto";
import { getCompressionResources as getV1CompressionResources } from "./compression.v1";
import { getCompressionResources as getV2CompressionResources } from "./compression.v2";
import { getEnvironmentResources } from "./environment";
import { getNetResources } from "./net";
import { getRNGResources } from "./rng";
import { getEncodingResources } from "./encoding";
import { AppEnv } from "../core/appEnv";
import { AppEnvMapper } from "../appEnv";

export function applyWebConfiguration(appEnv: AppEnv, map: AppEnvMapper) {
    appEnv.setProperties(
        map({
            ...getCryptoResources(),
            ...getV1CompressionResources(),
            ...getV2CompressionResources(),
            ...getEnvironmentResources(),
            ...getNetResources(),
            ...getRNGResources(),
            ...getEncodingResources()
        })
    );
}
