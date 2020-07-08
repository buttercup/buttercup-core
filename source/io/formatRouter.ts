import VaultFormatA from "./VaultFormatA";

export function detectFormat(encryptedContent: string): any {
    return getDefaultFormat();
}

export function getDefaultFormat(): any {
    return VaultFormatA;
}
