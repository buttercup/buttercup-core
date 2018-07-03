const Credentials = require("@buttercup/credentials");
const ArchiveSource = require("../../../source/node/archiveManagement/ArchiveSource.js");

describe("ArchiveSource", function() {
    beforeEach(function() {
        return Promise.all([
            Credentials.fromPassword("test").toSecureString("test"),
            Credentials.fromPassword("test").toSecureString("test")
        ]).then(([sourceCreds, archiveCreds]) => {
            this.sourceCreds = sourceCreds;
            this.archiveCreds = archiveCreds;
        });
    });

    it("instantiates without error", function() {
        expect(() => {
            new ArchiveSource("testing", this.sourceCreds, this.archiveCreds);
        }).to.not.throw();
    });

    it("supports overriding the ID", function() {
        const source = new ArchiveSource("testing", this.sourceCreds, this.archiveCreds, { id: "123" });
        expect(source.id).to.equal("123");
    });

    it("supports overriding the type", function() {
        const source = new ArchiveSource("testing", this.sourceCreds, this.archiveCreds, { type: "dropbox" });
        expect(source.type).to.equal("dropbox");
    });
});
