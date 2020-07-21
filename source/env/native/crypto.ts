import { createSession } from "iocane";

let __derivationRoundsOverride = null;

function decryptData(data: string | Buffer, password: string): Promise<string | Buffer> {
    return createSession().decrypt(data, password) as Promise<string | Buffer>;
}

function encryptData(data: string | Buffer, password: string): Promise<string | Buffer> {
    const session = createSession();
    if (__derivationRoundsOverride > 0) {
        session.setDerivationRounds(__derivationRoundsOverride);
    }
    return session.encrypt(data, password) as Promise<string | Buffer>;
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
