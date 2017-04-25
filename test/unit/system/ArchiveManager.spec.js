"use strict";

const { SourceStatus } = ArchiveManager;
const { MemoryStorageInterface } = storage;
const { getUniqueID } = tools.encoding;

function createArchiveAndCredentials() {
    this.archive = new Archive();
    this.archiveCredentials = createCredentials.fromPassword("testing");
    const tds = new TextDatasource();
    return tds
        .save(this.archive, this.archiveCredentials)
        .then(content => {
            this.sourceCredentials = createCredentials("text");
            this.sourceCredentials.setValue("datasource", JSON.stringify({
                type: "text",
                content
            }));
        });
}

describe("ArchiveManager", function() {

    beforeEach(function() {
        this.archiveManager = new ArchiveManager();
    });

    describe("get:storageInterface", function() {

        it("references a MemoryStorageInterface instance by default", function() {
            expect(this.archiveManager.storageInterface).to.be.an.instanceOf(MemoryStorageInterface);
        });

    });

    describe("addSource", function() {

        beforeEach(function() {
            return createArchiveAndCredentials.call(this);
        });

        it("adds an unlocked source", function() {
            expect(this.archiveManager.sources).to.have.lengthOf(0);
            return this.archiveManager
                .addSource("new item", this.sourceCredentials, this.archiveCredentials)
                .then(id => {
                    expect(this.archiveManager.sources).to.have.lengthOf(1);
                    const item = this.archiveManager.sources[0];
                    expect(item.id).to.equal(id);
                    expect(item.name).to.equal("new item");
                    expect(item.status).to.equal(SourceStatus.UNLOCKED);
                });
        });

        it("dehydrates after adding", function() {
            sinon.spy(this.archiveManager.sources, "push");
            sinon.spy(this.archiveManager, "dehydrateSource");
            return this.archiveManager
                .addSource("new item", this.sourceCredentials, this.archiveCredentials)
                .then(id => {
                    expect(this.archiveManager.sources.push.callCount).to.equal(1);
                    expect(this.archiveManager.dehydrateSource.callCount).to.equal(1);
                    expect(this.archiveManager.dehydrateSource.calledWithExactly(id)).to.be.true;
                    expect(this.archiveManager.sources.push.calledBefore(this.archiveManager.dehydrateSource)).to.be.true;
                });
        });

    });

    describe("dehydrateSource", function() {

        beforeEach(function() {
            return createArchiveAndCredentials.call(this)
                .then(() => {
                    sinon.spy(this.archiveManager.storageInterface, "setValue");
                    sinon.stub(this.archiveManager, "dehydrateSource").returns(Promise.resolve());
                    return this.archiveManager
                        .addSource("new item", this.sourceCredentials, this.archiveCredentials)
                        .then(id => {
                            this.sourceID = id;
                            this.archiveManager.dehydrateSource.restore();
                        });
                });
        });

        it("stores sources in a locked state", function() {
            expect(this.archiveManager.storageInterface.setValue.callCount).to.equal(0);
            return this.archiveManager.dehydrateSource(this.sourceID)
                .then(() => {
                    expect(this.archiveManager.storageInterface.setValue.callCount).to.equal(1);
                    const [ setKey, setValue ] = this.archiveManager.storageInterface.setValue.firstCall.args;
                    expect(setKey).to.contain(this.sourceID);
                    const packet = JSON.parse(setValue);
                    expect(packet).to.have.property("status", SourceStatus.LOCKED);
                });
        });

        it("stores sources with correct name and type", function() {
            return this.archiveManager.dehydrateSource(this.sourceID)
                .then(() => {
                    const packet = JSON.parse(this.archiveManager.storageInterface.setValue.firstCall.args[1]);
                    expect(packet).to.have.property("name", "new item");
                    expect(packet).to.have.property("type", "text");
                });
        });

        it("stores sources with encrypted source credentials", function() {
            return this.archiveManager.dehydrateSource(this.sourceID)
                .then(() => {
                    const packet = JSON.parse(this.archiveManager.storageInterface.setValue.firstCall.args[1]);
                    expect(packet).to.have.property("sourceCredentials").that.is.a.string;
                });
        });

        it("stores sources with encrypted archive credentials", function() {
            return this.archiveManager.dehydrateSource(this.sourceID)
                .then(() => {
                    const packet = JSON.parse(this.archiveManager.storageInterface.setValue.firstCall.args[1]);
                    expect(packet).to.have.property("archiveCredentials").that.is.a.string;
                });
        });

    });

    describe("indexOfSource", function() {

        beforeEach(function() {
            this.targetID = getUniqueID();
            this.archiveManager.sources.push(
                { name: "test1", id: getUniqueID() },
                { name: "test2", id: this.targetID },
                { name: "test3", id: getUniqueID() }
            );
        });

        it("returns correct index for source ID", function() {
            expect(this.archiveManager.indexOfSource(this.targetID)).to.equal(1);
        });

        it("returns -1 for an ID that's not found", function() {
            expect(this.archiveManager.indexOfSource(getUniqueID())).to.equal(-1);
        });

    });

    describe("lock", function() {

        beforeEach(function() {
            return createArchiveAndCredentials.call(this)
                .then(() => {
                    sinon.spy(this.archiveManager.storageInterface, "setValue");
                    sinon.stub(this.archiveManager, "dehydrateSource").returns(Promise.resolve());
                    return this.archiveManager
                        .addSource("new item", this.sourceCredentials, this.archiveCredentials)
                        .then(id => {
                            this.sourceID = id;
                            this.archiveManager.dehydrateSource.restore();
                        });
                });
        });

        it("locks an unlocked source", function() {
            return this.archiveManager.lock(this.sourceID)
                .then(() => {
                    const source = this.archiveManager.sources[0];
                    expect(source).to.have.property("status", SourceStatus.LOCKED);
                });
        });

        it("encrypts credentials", function() {
            return this.archiveManager.lock(this.sourceID)
                .then(() => {
                    const source = this.archiveManager.sources[0];
                    expect(source).to.have.property("sourceCredentials")
                        .that.is.a.string;
                    expect(source).to.have.property("archiveCredentials")
                        .that.is.a.string;
                });
        });

    });

});
