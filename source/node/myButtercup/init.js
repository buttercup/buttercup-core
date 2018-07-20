const NodeRSA = require("node-rsa");
const Archive = require("../Archive.js");

function createNewKey() {
    const key = new NodeRSA();
    key.generateKeyPair(2048, 65537);
    return {
        public: key.exportKey("pkcs8-public-pem"),
        private: key.exportKey("pkcs8-private-pem")
    };
}

function createNewRoot() {
    const archive = new Archive();
    processArchiveKeys(archive);
    return Promise.resolve(archive);
}

function processArchiveKeys(archive) {
    const { public: publicKey, private: privateKey } = createNewKey();
    const group = archive.createGroup("keys");
    const pubKeyEntry = group.createEntry("public-key");
    pubKeyEntry.setProperty("password", publicKey);
    const privKeyEntry = group.createEntry("private-key");
    privKeyEntry.setProperty("password", privateKey);
}

module.exports = {
    createNewRoot
};
