const sleep = require("sleep-promise");
const Credentials = require("@buttercup/credentials");
const { TextDatasource } = require("@buttercup/datasources");
const ArchiveSource = require("../../source/node/archiveManagement/ArchiveSource.js");
const ArchiveManager = require("../../source/node/archiveManagement/ArchiveManager.js");
const Archive = require("../../source/node/Archive.js");

const { STORAGE_KEY_PREFIX } = ArchiveManager;

describe("ArchiveManager", function() {
    function getFakeCredentials() {
        const tds = new TextDatasource();
        const archive = Archive.createWithDefaults();
        return tds.save(archive.getHistory(), Credentials.fromPassword("test")).then(enc => {
            const datasource = new TextDatasource(enc);
            const creds = new Credentials("text");
            creds.setValue("datasource", datasource.toObject());
            return creds;
        });
    }

    beforeEach(function() {
        return getFakeCredentials()
            .then(creds =>
                Promise.all([creds.toSecureString("test"), Credentials.fromPassword("test").toSecureString("test")])
            )
            .then(([sourceCreds, archiveCreds]) => {
                this.sourceCreds = sourceCreds;
                this.archiveCreds = archiveCreds;
                this.source = new ArchiveSource("testing", this.sourceCreds, this.archiveCreds);
                this.manager = new ArchiveManager();
                return this.manager.addSource(this.source);
            });
    });

    describe("auto updating", function() {
        afterEach(function() {
            this.manager.toggleAutoUpdating(false);
        });

        it("detects non-auto-updateable sources", function() {
            expect(this.manager.updateableSources).to.have.lengthOf(0);
        });

        it("calls update on unlocked sources", function() {
            return this.source
                .unlock("test")
                .then(() => {
                    sinon.stub(this.source.workspace, "update").returns(Promise.resolve());
                    this.source.workspace.archive.createGroup("test group");
                    this.manager.toggleAutoUpdating(true, 150);
                    return sleep(200);
                })
                .then(() => {
                    expect(this.source.workspace.update.calledOnce).to.be.true;
                });
        });

        it("can be paused using `interruptAutoUpdate`", function() {
            return this.source
                .unlock("test")
                .then(() => {
                    sinon.stub(this.source.workspace, "update").returns(Promise.resolve());
                    this.source.workspace.archive.createGroup("test group");
                    this.manager.toggleAutoUpdating(true, 150);
                    return sleep(200);
                })
                .then(() =>
                    this.manager.interruptAutoUpdate(() => {
                        return sleep(600);
                    })
                )
                .then(() => sleep(200))
                .then(() => {
                    expect(this.manager.autoUpdateEnabled).to.be.true;
                    expect(this.source.workspace.update.callCount).to.equal(2);
                });
        });
    });
});
