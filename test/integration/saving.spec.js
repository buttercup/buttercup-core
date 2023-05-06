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
        ["Format A", VaultFormatA],
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

            it("can empty trash", async function() {
                const group = this.vault.createGroup("Main");
                const entry = group.createEntry("Test");
                entry.delete();
                await this.source.save();
                // Now empty trash
                this.vault.emptyTrash();
                await this.source.save();
                expect(this.vault.getTrashGroup().getEntries()).to.have.lengthOf(0, "Should have 0 entries");
                expect(this.vault.getTrashGroup().getGroups()).to.have.lengthOf(0, "Should have 0 groups");
            });
        });
    });
});
