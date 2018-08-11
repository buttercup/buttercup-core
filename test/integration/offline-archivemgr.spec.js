const path = require("path");
const fs = require("fs");
const rimraf = require("rimraf").sync;
const { FileDatasource } = require("@buttercup/datasources");
const Credentials = require("@buttercup/credentials");
const Archive = require("../../source/node/Archive.js");
const ArchiveManager = require("../../source/node/archiveManagement/ArchiveManager.js");
const ArchiveSource = require("../../source/node/archiveManagement/ArchiveSource.js");

const FILENAME = path.resolve(__dirname, "./offline.test.bcup");

describe("ArchiveManager & ArchiveSource", function() {
    beforeEach(function() {
        const fds = new FileDatasource(FILENAME);
        const archive = new Archive();
        this.archiveManager = new ArchiveManager();
        return fds
            .save(archive.getHistory(), Credentials.fromPassword("test"))
            .then(() => {
                this.content = fs.readFileSync(FILENAME, "utf8");
                rimraf(FILENAME);
                const sourceCreds = new Credentials({
                    datasource: {
                        type: "file",
                        path: FILENAME
                    }
                });
                return Promise.all([
                    sourceCreds.toSecureString("test"),
                    Credentials.fromPassword("test").toSecureString("test")
                ]).then(([encSource, encArchive]) => new ArchiveSource("Testing", encSource, encArchive));
            })
            .then(newSource => {
                this.archiveSource = newSource;
                return this.archiveManager.addSource(newSource);
            });
    });

    afterEach(function() {
        rimraf(FILENAME);
    });

    it("fails when unlocking source with no remote", function() {
        const unlocking = this.archiveSource.unlock("test");
        return expect(unlocking).to.be.rejectedWith(/no such file or directory/i);
    });

    it("unlocks when override content is provided", function() {
        expect(this.archiveSource.status).to.equal("locked");
        return this.archiveSource.unlock("test", false, this.content).then(() => {
            expect(this.archiveSource.status).to.equal("unlocked");
        });
    });

    it("sets the archive's status to readOnly", function() {
        return this.archiveSource.unlock("test", false, this.content).then(() => {
            expect(this.archiveSource.workspace.archive.readOnly).to.be.true;
        });
    });

    it("detects offline content availability after one unlock", function() {
        fs.writeFileSync(FILENAME, this.content);
        return this.archiveSource
            .checkOfflineCopy()
            .then(hasOffline => {
                expect(hasOffline).to.be.false;
                return this.archiveSource.unlock("test");
            })
            .then(() => this.archiveSource.lock())
            .then(() => this.archiveSource.checkOfflineCopy())
            .then(hasOffline => {
                expect(hasOffline).to.be.true;
            });
    });

    it("unlocks using offline content after one unlock", function() {
        fs.writeFileSync(FILENAME, this.content);
        return this.archiveSource
            .unlock("test")
            .then(() => this.archiveSource.lock())
            .then(() => {
                rimraf(FILENAME);
            })
            .then(() => this.archiveSource.unlock("test", false, true))
            .then(() => {
                expect(this.archiveSource.status).to.equal("unlocked");
            });
    });
});
