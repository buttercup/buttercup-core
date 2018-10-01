const Credentials = require("@buttercup/credentials");
const ArchiveSource = require("../../../source/node/archiveManagement/ArchiveSource.js");
const ArchiveManager = require("../../../source/node/archiveManagement/ArchiveManager.js");

const { STORAGE_KEY_PREFIX } = ArchiveManager;

describe("ArchiveManager", function() {
    beforeEach(function() {
        return Promise.all([
            Credentials.fromPassword("test").toSecureString("test"),
            Credentials.fromPassword("test").toSecureString("test")
        ]).then(([sourceCreds, archiveCreds]) => {
            this.sourceCreds = sourceCreds;
            this.archiveCreds = archiveCreds;
            this.source = new ArchiveSource("testing", this.sourceCreds, this.archiveCreds);
            this.manager = new ArchiveManager();
        });
    });

    describe("addSource", function() {
        it("adds archive sources", function() {
            expect(this.manager.sources).to.have.lengthOf(0);
            return this.manager.addSource(this.source).then(() => {
                expect(this.manager.sources).to.have.lengthOf(1);
            });
        });
    });

    describe("dehydrate", function() {
        beforeEach(function() {
            return this.manager.addSource(this.source);
        });

        it("calls dehydrate on each source", function() {
            sinon.spy(this.source, "dehydrate");
            return this.manager.dehydrate().then(() => {
                expect(this.source.dehydrate.calledOnce).to.be.true;
            });
        });

        it("stores the dehydrated value", function() {
            sinon.spy(this.manager.storageInterface, "setValue");
            return this.manager.dehydrate().then(() => {
                expect(this.manager.storageInterface.setValue.calledOnce).to.be.true;
                expect(this.manager.storageInterface.setValue.firstCall.args[0]).to.match(
                    new RegExp(`^${STORAGE_KEY_PREFIX}`)
                );
            });
        });
    });

    describe("toggleAutoUpdating", function() {
        afterEach(function() {
            this.manager.toggleAutoUpdating(false);
        });

        it("starts the timer when enabled", function() {
            sinon.spy(this.manager, "_startAutoUpdateTimer");
            this.manager.toggleAutoUpdating(true);
            expect(this.manager._startAutoUpdateTimer.calledOnce).to.be.true;
        });

        it("stops the timer when disabled", function() {
            this.manager.toggleAutoUpdating(true);
            expect(this.manager._autoUpdateDelay).to.be.above(0);
            expect(this.manager._autoUpdateTimer).to.not.be.null;
            this.manager.toggleAutoUpdating(false);
            expect(this.manager._autoUpdateDelay).to.be.null;
            expect(this.manager._autoUpdateTimer).to.be.null;
        });
    });
});
