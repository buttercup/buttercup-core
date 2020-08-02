const path = require("path");
const { v4: uuid } = require("uuid");
const tmp = require("tmp");
const FileDatasource = require("../../../dist/datasources/FileDatasource.js");
const Vault = require("../../../dist/core/Vault.js");
const Credentials = require("../../../dist/credentials/Credentials.js");

describe("FileDatasource", function() {
    beforeEach(function(done) {
        this.vault = Vault.createWithDefaults();
        this.vault
            .findGroupsByTitle("General")[0]
            .createEntry("Test")
            .setProperty("username", "test");
        tmp.dir((err, dirPath, cleanup) => {
            if (err) return done(err);
            this.fds = new FileDatasource(
                Credentials.fromDatasource({
                    path: path.join(dirPath, "vault.bcup")
                })
            );
            this.cleanup = cleanup;
            done();
        });
    });

    afterEach(function() {
        this.cleanup();
    });

    it("supports saving and loading", function() {
        return this.fds
            .save(this.vault.format.history, Credentials.fromPassword("test"))
            .then(() => this.fds.load(Credentials.fromPassword("test")))
            .then(({ Format, history }) => Vault.createFromHistory(history, Format))
            .then(vault => {
                const entry = vault.findEntriesByProperty("title", "Test")[0];
                expect(entry.getProperty("username")).to.equal("test");
            });
    });

    it("supports writing and reading attachments", function() {
        const attachmentText = "This is a sample string,\nwith irrelevant contents.";
        const buff = Buffer.from(attachmentText);
        const vaultID = this.vault.id;
        const attachmentID = uuid();
        return this.fds
            .putAttachment(vaultID, attachmentID, buff, Credentials.fromPassword("test"))
            .then(() => this.fds.getAttachment(vaultID, attachmentID, Credentials.fromPassword("test")))
            .then(buff2 => {
                expect(buff2.equals(buff)).to.be.true;
            });
    });
});
