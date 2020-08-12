import VaultFormatA from "./VaultFormatA";
import VaultFormatB from "./VaultFormatB";
import { hasValidSignature as isFormatBSigned } from "./formatB/signing";
import { VaultFormatID } from "../types";

export function detectFormat(encryptedContent: string): any {
    if (isFormatBSigned(encryptedContent)) {
        return VaultFormatB;
    }
    return VaultFormatA;
}

export function getDefaultFormat(): any {
    return VaultFormatA;
}

export function getFormatForID(id: VaultFormatID): any {
    if (id === VaultFormatID.B) {
        return VaultFormatB;
    }
    return VaultFormatA;
}
