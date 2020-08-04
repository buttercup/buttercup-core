import { createSession } from "iocane/web";
import { CRYPTO_RANDOM_STRING_CHARS } from "../core/constants";

const UINT16_MAX = 65535;

let __derivationRoundsOverride = null;

function decryptData(data: string | ArrayBuffer, password): Promise<string | ArrayBuffer> {
    return createSession().decrypt(data, password);
}

function encryptData(data: string | ArrayBuffer, password): Promise<string | ArrayBuffer> {
    const session = createSession();
    if (__derivationRoundsOverride > 0) {
        session.setDerivationRounds(__derivationRoundsOverride);
    }
    return session.encrypt(data, password);
}

export function getCryptoResources() {
    return {
        "crypto/v1/decryptBuffer": decryptData,
        "crypto/v1/encryptBuffer": encryptData,
        "crypto/v1/decryptText": decryptData,
        "crypto/v1/encryptText": encryptData,
        "crypto/v1/randomString": randomString,
        "crypto/v1/setDerivationRounds": setDerivationRounds
    };
}

function randomString(length: number): Promise<string> {
    return Promise.resolve().then(() => {
        const randCharsLen = CRYPTO_RANDOM_STRING_CHARS.length;
        const randArr = new Uint16Array(length);
        return randArr.reduce((output, nextVal) => {
            const ind = Math.floor((nextVal / UINT16_MAX) * randCharsLen);
            return `${output}${CRYPTO_RANDOM_STRING_CHARS[ind]}`;
        }, "");
    });
}

function setDerivationRounds(rounds: number = null) {
    __derivationRoundsOverride = rounds;
}
