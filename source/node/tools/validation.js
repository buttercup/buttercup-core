const { hasValidSignature, stripSignature } = require("@buttercup/signing");

function ensureVaultContentsEncrypted(contents) {
    if (!vaultContentsEncrypted(contents)) {
        throw new Error("Vault contents in unexpected state: Expected encrypted");
    }
}

function vaultContentsEncrypted(contents) {
    if (typeof contents === "string" && hasValidSignature(contents)) {
        const exSig = stripSignature(contents);
        return /["\s\t\n~]/.test(exSig) === false;
    }
    return false;
}

module.exports = {
    ensureVaultContentsEncrypted,
    vaultContentsEncrypted
};
