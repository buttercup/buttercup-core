const tmp = require("tmp");
const VaultManager = require("../../dist/core/VaultManager.js");
const VaultSource = require("../../dist/core/VaultSource.js");
const Credentials = require("../../dist/credentials/Credentials.js");
const { expect } = require("chai");

describe("VaultManager", function() {
    describe("with file datasource", function() {
        beforeEach(async function() {
            this.tmp = tmp.fileSync();
            this.vaultManager = new VaultManager();
            const creds = Credentials.fromDatasource(
                {
                    type: "file",
                    path: this.tmp.name
                },
                "test"
            );
            const credStr = await creds.toSecureString();
            this.vaultSource = new VaultSource("test", "file", credStr);
            await this.vaultManager.addSource(this.vaultSource);
            await this.vaultSource.unlock(Credentials.fromPassword("test"), {
                initialiseRemote: true
            });
        });

        afterEach(function() {
            this.tmp.removeCallback();
        });

        it("can change password", async function() {
            await this.vaultSource.changeMasterPassword("test", "test2");
            expect(this.vaultSource.status).to.equal(VaultSource.STATUS_UNLOCKED);
            await this.vaultSource.lock();
            await this.vaultSource.unlock(Credentials.fromPassword("test2"));
            expect(this.vaultSource.status).to.equal(VaultSource.STATUS_UNLOCKED);
        });
    });
});
