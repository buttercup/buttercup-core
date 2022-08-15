const { expect } = require("chai");
const {
    Credentials,
    TextDatasource,
    Vault,
    VaultFormatA,
    VaultFormatID,
    VaultManager,
    VaultSource,
    setDefaultFormat
} = require("../../../dist/index.node.js");

async function createTextSourceCredentials() {
    const vault = new Vault();
    const general = vault.createGroup("General");
    general
        .createEntry("Login")
        .setProperty("username", "user")
        .setProperty("password", "test");
    const tds = new TextDatasource(Credentials.fromDatasource({ type: "text" }, "test"));
    const encrypted = await tds.save(vault.format.getHistory(), Credentials.fromPassword("test"));
    return Credentials.fromDatasource(
        {
            type: "text",
            content: encrypted
        },
        "test"
    );
}

describe("VaultSource", function() {
    beforeEach(async function() {
        setDefaultFormat(VaultFormatA);
        this.sourceCredentials = await createTextSourceCredentials();
        this.vaultSource = new VaultSource("Test", "text", await this.sourceCredentials.toSecureString());
        this.vaultManager = new VaultManager();
        await this.vaultManager.addSource(this.vaultSource);
    });

    describe("while locked", function() {
        describe("testMasterPassword", function() {
            it("returns true for matching password", async function() {
                const res = await this.vaultSource.testMasterPassword("test");
                expect(res).to.be.true;
            });

            it("returns false for non-matching password", async function() {
                const res = await this.vaultSource.testMasterPassword("abc");
                expect(res).to.be.false;
            });
        });
    });

    describe("while unlocked", function() {
        beforeEach(async function() {
            await this.vaultSource.unlock(Credentials.fromPassword("test"));
        });

        it("sets source ID on datasource", function() {
            expect(this.vaultSource._datasource.sourceID).to.equal(this.vaultSource.id);
        });

        describe("convert", function() {
            it("converts from format A to B", async function() {
                await this.vaultSource.convert(VaultFormatID.B);
                const [loginEntry] = this.vaultSource.vault.findEntriesByProperty("title", "Login");
                expect(loginEntry.getProperty("username")).to.equal("user");
            });
        });

        describe("testMasterPassword", function() {
            it("returns true for matching password", async function() {
                const res = await this.vaultSource.testMasterPassword("test");
                expect(res).to.be.true;
            });

            it("returns false for non-matching password", async function() {
                const res = await this.vaultSource.testMasterPassword("abc");
                expect(res).to.be.false;
            });
        });
    });
});
