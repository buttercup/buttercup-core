"use strict";

const { SourceStatus } = ArchiveManager;
const { MemoryStorageInterface } = storage;
const { getUniqueID } = tools.encoding;

function createArchiveAndCredentials() {
    this.archive = new Archive();
    this.archiveID = this.archive.getID();
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
                    expect(item.type).to.equal("text");
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

        it("emits an event", function() {
            sinon.spy(this.archiveManager, "emit");
            sinon.stub(this.archiveManager, "dehydrateSource").returns(Promise.resolve());
            return this.archiveManager
                .addSource("new item", this.sourceCredentials, this.archiveCredentials)
                .then((id) => {
                    expect(this.archiveManager.emit.firstCall.args).to.eql([
                        "sourceAdded",
                        {
                            id,
                            name: "new item",
                            status: SourceStatus.UNLOCKED,
                            type: "text"
                        }
                    ]);
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

        it("emits an event", function() {
            sinon.spy(this.archiveManager, "emit");
            return this.archiveManager.dehydrateSource(this.sourceID)
                .then(() => {
                    expect(this.archiveManager.emit.firstCall.args).to.eql([
                        "sourceDehydrated",
                        {
                            id: this.sourceID,
                            name: "new item",
                            status: SourceStatus.LOCKED,
                            type: "text"
                        }
                    ]);
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

        it("dehydrates after locking", function() {
            sinon.spy(this.archiveManager, "_replace");
            sinon.stub(this.archiveManager, "dehydrateSource").returns(Promise.resolve());
            return this.archiveManager.lock(this.sourceID)
                .then(() => {
                    expect(this.archiveManager._replace.calledWith(this.sourceID)).to.be.true;
                    expect(this.archiveManager.dehydrateSource.calledWithExactly(this.sourceID)).to.be.true;
                    expect(this.archiveManager._replace.calledBefore(this.archiveManager.dehydrateSource)).to.be.true;
                });
        });

        it("emits an event", function() {
            sinon.spy(this.archiveManager, "emit");
            sinon.stub(this.archiveManager, "dehydrateSource").returns(Promise.resolve());
            return this.archiveManager.lock(this.sourceID)
                .then(() => {
                    expect(this.archiveManager.emit.firstCall.args).to.eql([
                        "sourceLocked",
                        {
                            id: this.sourceID,
                            name: "new item",
                            status: SourceStatus.LOCKED,
                            type: "text"
                        }
                    ]);
                });
        });

    });

    describe("rehydrate", function() {

        beforeEach(function() {
            return createArchiveAndCredentials.call(this)
                .then(() => {
                    return this.archiveManager
                        .addSource("new item", this.sourceCredentials, this.archiveCredentials)
                        .then(id => {
                            this.sourceID = id;
                        });
                });
        });

        it("clears sources", function() {
            this.archiveManager.sources.push({ name: "fake" });
            expect(this.archiveManager.sources).to.have.lengthOf(2);
            return this.archiveManager.rehydrate()
                .then(() => {
                    expect(this.archiveManager.sources).to.have.lengthOf(1);
                });
        });

        it("restores the necessary properties", function() {
            return this.archiveManager.rehydrate()
                .then(() => {
                    const item = this.archiveManager.sources[0];
                    expect(item).to.have.property("name", "new item");
                    expect(item).to.have.property("type", "text");
                    expect(item).to.have.property("status", SourceStatus.LOCKED);
                    expect(item).to.have.property("sourceCredentials")
                        .that.is.a.string;
                    expect(item).to.have.property("archiveCredentials")
                        .that.is.a.string;
                });
        });

        it("emits events for all sources", function() {
            sinon.spy(this.archiveManager, "emit");
            return this.archiveManager.rehydrate()
                .then(() => {
                    expect(this.archiveManager.emit.firstCall.args).to.eql([
                        "sourceRehydrated",
                        {
                            id: this.sourceID,
                            name: "new item",
                            status: SourceStatus.LOCKED,
                            type: "text"
                        }
                    ]);
                });
        });

    });

    describe("remove", function() {

        beforeEach(function() {
            return Promise.all([
                createArchiveAndCredentials.call(this)
                    .then(() => {
                        return this.archiveManager
                            .addSource("Item 1", this.sourceCredentials, this.archiveCredentials)
                            .then(id => {
                                this.sourceID1 = id;
                            });
                    }),
                createArchiveAndCredentials.call(this)
                    .then(() => {
                        return this.archiveManager
                            .addSource("Item 2", this.sourceCredentials, this.archiveCredentials)
                            .then(id => {
                                this.sourceID2 = id;
                            });
                    })
            ]);
        });

        it("removes sources", function() {
            expect(this.archiveManager.sources).to.have.lengthOf(2);
            return this.archiveManager.remove(this.sourceID1)
                .then(() => {
                    expect(this.archiveManager.sources).to.have.lengthOf(1);
                    expect(this.archiveManager.sources[0]).to.have.property("name", "Item 2");
                });
        });

        it("emits removal event", function() {
            sinon.spy(this.archiveManager, "emit");
            return this.archiveManager.remove(this.sourceID2)
                .then(() => {
                    expect(this.archiveManager.emit.firstCall.args).to.eql([
                        "sourceRemoved",
                        {
                            id: this.sourceID2
                        }
                    ]);
                });
        });

    });

    describe("unlock", function() {

        beforeEach(function() {
            return createArchiveAndCredentials.call(this)
                .then(() => {
                    return this.archiveManager
                        .addSource("new item", this.sourceCredentials, this.archiveCredentials)
                        .then(id => {
                            this.sourceID = id;
                            return this.archiveManager.lock(id);
                        });
                });
        });

        it("sets the correct properties", function() {
            return this.archiveManager.unlock(this.sourceID, "testing")
                .then(() => {
                    expect(this.archiveManager.sources).to.have.lengthOf(1);
                    const source = this.archiveManager.sources[0];
                    expect(source).to.have.property("name", "new item");
                    expect(source).to.have.property("type", "text");
                    expect(source).to.have.property("status", SourceStatus.UNLOCKED);
                    expect(source).to.have.property("sourceCredentials")
                        .that.is.an.object;
                    expect(source).to.have.property("archiveCredentials")
                        .that.is.an.object;
                    expect(source).to.have.property("workspace")
                        .that.is.an.instanceOf(Workspace);
                });
        });

        it("restores the credentials", function() {
            return this.archiveManager.unlock(this.sourceID, "testing")
                .then(() => {
                    const source = this.archiveManager.sources[0];
                    expect(source.sourceCredentials.getValue("datasource"))
                        .to.equal(this.sourceCredentials.getValue("datasource"));
                    expect(source.archiveCredentials.password).to.equal("testing");
                });
        });

        it("restores the archive", function() {
            return this.archiveManager.unlock(this.sourceID, "testing")
                .then(() => {
                    const source = this.archiveManager.sources[0];
                    const archive = source.workspace.primary.archive;
                    expect(archive).to.be.an.instanceOf(Archive);
                    expect(archive.getID()).to.equal(this.archiveID);
                });
        });

        it("emits an event", function() {
            sinon.spy(this.archiveManager, "emit");
            return this.archiveManager.unlock(this.sourceID, "testing")
                .then(() => {
                    expect(this.archiveManager.emit.firstCall.args).to.eql([
                        "sourceUnlocked",
                        {
                            id: this.sourceID,
                            name: "new item",
                            status: SourceStatus.UNLOCKED,
                            type: "text"
                        }
                    ]);
                });
        });

    });

});
