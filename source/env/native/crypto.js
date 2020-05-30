const { createSession } = require("iocane");

let __derivationRoundsOverride = null;

function decryptData(data, password) {
    return createSession().decrypt(data, password);
}

function encryptData(data, password) {
    const session = createSession();
    if (__derivationRoundsOverride > 0) {
        session.setDerivationRounds(__derivationRoundsOverride);
    }
    return session.encrypt(data, password);
}

function getCryptoResources() {
    return {
        "crypto/v1/decryptBuffer": decryptData,
        "crypto/v1/encryptBuffer": encryptData,
        "crypto/v1/decryptText": decryptData,
        "crypto/v1/encryptText": encryptData,
        "crypto/v1/setDerivationRounds": setDerivationRounds
    };
}

function setDerivationRounds(rounds = null) {
    __derivationRoundsOverride = rounds;
}

module.exports = {
    getCryptoResources
};
