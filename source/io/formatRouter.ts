import VaultFormatA from "./VaultFormatA";
import VaultFormatB from "./VaultFormatB";
import { hasValidSignature as isFormatBSigned } from "./formatB/signing";
import { VaultFormatID } from "../types";

const DEFAULT_FORMAT = VaultFormatA;

let __defaultFormat = DEFAULT_FORMAT;

export function detectFormat(encryptedContent: string): any {
    if (isFormatBSigned(encryptedContent)) {
        return VaultFormatB;
    }
    return VaultFormatA;
}

export function getDefaultFormat(): any {
    return __defaultFormat;
}

export function getFormatForID(id: VaultFormatID): any {
    if (id === VaultFormatID.B) {
        return VaultFormatB;
    }
    return VaultFormatA;
}

export function setDefaultFormat(Format: any = null) {
    __defaultFormat = Format || DEFAULT_FORMAT;
}
