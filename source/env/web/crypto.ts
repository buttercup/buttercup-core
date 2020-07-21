import { createSession } from "iocane/web";

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
        "crypto/v1/setDerivationRounds": setDerivationRounds
    };
}

function setDerivationRounds(rounds: number = null) {
    __derivationRoundsOverride = rounds;
}
