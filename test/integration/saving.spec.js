import { expect } from "chai";
import {
    Credentials,
    VaultFormatA,
    VaultFormatB,
    VaultManager,
    VaultSource,
    setDefaultFormat
} from "../../dist/node/index.js";

describe("Vault", function() {
    [
        // ["Format A", VaultFormatA],
        ["Format B", VaultFormatB]
    ].forEach(([format, Format]) => {
        describe(`using ${format}`, function() {
            beforeEach(async function() {
                setDefaultFormat(Format);
                this.vaultManager = new VaultManager({
                    autoUpdate: false
                });
                const creds = Credentials.fromDatasource(
                    {
                        type: "memory",
                        property: `test:${Math.floor(Math.random() * 1000000)}`
                    },
                    "test"
                );
                const credsStr = await creds.toSecureString();
                this.source = new VaultSource("Refs test", "memory", credsStr);
                await this.vaultManager.addSource(this.source);
                await this.source.unlock(Credentials.fromPassword("test"), { initialiseRemote: true });
                this.vault = this.source.vault;
            });

            afterEach(function() {
                setDefaultFormat();
            });

            it.only("can empty trash", async function() {
                const group = this.vault.createGroup("Main");
                const entry = group.createEntry("Test");
                entry.delete();
                await this.source.save();
                // Now empty trash
                this.vault.emptyTrash();
                console.log("TRASH BEFORE", this.vault.getTrashGroup().getEntries());
                await this.source.save();
                console.log("TRASH AFTER", this.vault.getTrashGroup().getEntries());
            });

            // it("updates own format reference on update", async function() {
            //     const originalVault = this.vault;
            //     const initialFormat = originalVault;
            //     await this.source.mergeFromRemote();
            //     expect(this.source.vault).to.equal(originalVault);
            //     expect(originalVault.format).to.not.equal(initialFormat);
            // });

            // it("updates group references on update", async function() {
            //     const myGroup = this.vault.createGroup("Test");
            //     await this.source.mergeFromRemote();
            //     const refMyGroup = this.vault.findGroupsByTitle("Test")[0];
            //     expect(refMyGroup._source).to.equal(myGroup._source);
            // });

            // it("updates entry references on update", async function() {
            //     const myGroup = this.vault.createGroup("Test");
            //     const myEntry = myGroup.createEntry("Test");
            //     await this.source.mergeFromRemote();
            //     const refMyEntry = this.vault.findEntriesByProperty("title", "Test")[0];
            //     expect(refMyEntry._source).to.equal(myEntry._source);
            // });
        });
    });
});
