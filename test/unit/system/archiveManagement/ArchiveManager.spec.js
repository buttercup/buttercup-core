const uuid = require("uuid/v4");
const { ArchiveManager: NewArchiveManager, ArchiveSource } = ArchiveManager.v2;

const { STORAGE_KEY_PREFIX } = NewArchiveManager;
const NOOP = () => {};

function createArchiveAndCredentials() {
    this.archive = new Archive();
    this.archiveCredentials = createCredentials.fromPassword("testing");
    const tds = new TextDatasource();
    return tds.save(this.archive, this.archiveCredentials).then(content => {
        this.sourceCredentials = createCredentials("text");
        this.sourceCredentials.setValue(
            "datasource",
            JSON.stringify({
                type: "text",
                content
            })
        );
    });
}

function createArchiveSource(name) {
    return createArchiveAndCredentials
        .call(this)
        .then(() =>
            Promise.all([
                this.sourceCredentials.toSecureString(this.archiveCredentials.password),
                this.archiveCredentials.toSecureString(this.archiveCredentials.password)
            ])
        )
        .then(([encSourceCreds, encArchiveCreds]) => {
            this.sourceCredentials = encSourceCreds;
            this.archiveCredentials = encArchiveCreds;
            return new ArchiveSource(name, this.sourceCredentials, this.archiveCredentials);
        });
}

describe("ArchiveManager", function() {
    describe("addSource", function() {
        beforeEach(function() {
            this.fakeSource1 = { id: "1", order: 0, on: NOOP };
            this.manager = new NewArchiveManager();
            this.manager.sources.push(this.fakeSource1);
            this.fakeSource2 = { id: "2", on: NOOP };
        });

        it("adds sources", function() {
            this.manager.addSource(this.fakeSource2);
            expect(this.manager.sources).to.contain(this.fakeSource2);
        });

        it("sets the order", function() {
            this.manager.addSource(this.fakeSource2);
            expect(this.fakeSource2)
                .to.have.property("order")
                .that.is.above(this.fakeSource1.order);
        });

        it("emits 'sourcesUpdated' event", function() {
            sinon.spy(this.manager, "emit");
            this.manager.addSource(this.fakeSource2);
            expect(this.manager.emit.calledWith("sourcesUpdated")).to.be.true;
        });

        it("does not add duplicates", function() {
            sinon.spy(this.manager.sources, "push");
            this.manager.addSource(this.fakeSource1);
            expect(this.manager.sources.push.notCalled).to.be.true;
        });
    });

    describe("dehydrate", function() {
        beforeEach(function() {
            this.fakeSource1 = { id: "1", dehydrate: sinon.stub().returns(Promise.resolve("d1")) };
            this.fakeSource2 = { id: "2", dehydrate: sinon.stub().returns(Promise.resolve("d2")) };
            this.manager = new NewArchiveManager();
            this.manager.sources.push(this.fakeSource1, this.fakeSource2);
            sinon.stub(this.manager.storageInterface, "setValue");
        });

        it("calls dehydrate on all sources", function() {
            return this.manager.dehydrate().then(() => {
                expect(this.fakeSource1.dehydrate.calledOnce).to.be.true;
                expect(this.fakeSource2.dehydrate.calledOnce).to.be.true;
            });
        });

        it("stores dehydrated content", function() {
            return this.manager.dehydrate().then(() => {
                const storageKey1 = `${STORAGE_KEY_PREFIX}1`;
                const storageKey2 = `${STORAGE_KEY_PREFIX}2`;
                expect(this.manager.storageInterface.setValue.calledWithExactly(storageKey1, "d1")).to.be.true;
                expect(this.manager.storageInterface.setValue.calledWithExactly(storageKey2, "d2")).to.be.true;
            });
        });
    });

    describe("getSourceForID", function() {
        beforeEach(function() {
            this.fakeSource1 = { id: "1" };
            this.fakeSource2 = { id: "2" };
            this.manager = new NewArchiveManager();
            this.manager.sources.push(this.fakeSource1, this.fakeSource2);
        });

        it("gets the correct source", function() {
            expect(this.manager.getSourceForID("2")).to.equal(this.fakeSource2);
            expect(this.manager.getSourceForID("1")).to.equal(this.fakeSource1);
        });

        it("returns null if no source found", function() {
            expect(this.manager.getSourceForID("3")).to.be.null;
        });
    });

    describe("rehydrate", function() {
        beforeEach(function() {
            return Promise.all([createArchiveSource.call(this, "One"), createArchiveSource.call(this, "Two")])
                .then(([source1, source2]) => Promise.all([source1.dehydrate(), source2.dehydrate()]))
                .then(([dehydrated1, dehydrated2]) => {
                    this.manager = new NewArchiveManager();
                    sinon
                        .stub(this.manager.storageInterface, "getAllKeys")
                        .returns(Promise.resolve([`${STORAGE_KEY_PREFIX}${uuid()}`, `${STORAGE_KEY_PREFIX}${uuid()}`]));
                    sinon
                        .stub(this.manager.storageInterface, "getValue")
                        .onFirstCall()
                        .returns(Promise.resolve(dehydrated1))
                        .onSecondCall()
                        .returns(Promise.resolve(dehydrated2));
                });
        });

        it("adds all sources", function() {
            sinon.spy(this.manager, "addSource");
            return this.manager.rehydrate().then(() => {
                expect(this.manager.addSource.calledTwice).to.be.true;
            });
        });

        it("reorders all sources", function() {
            sinon.spy(this.manager, "reorderSources");
            return this.manager.rehydrate().then(() => {
                expect(this.manager.reorderSources.calledOnce).to.be.true;
            });
        });

        it("emits 'sourcesUpdated' event", function() {
            sinon.spy(this.manager, "emit");
            return this.manager.rehydrate().then(() => {
                expect(this.manager.emit.calledWith("sourcesUpdated")).to.be.true;
            });
        });
    });

    describe("removeSource", function() {
        beforeEach(function() {
            this.fakeSource1 = { id: "1", order: 0, removeAllListeners: sinon.spy() };
            this.fakeSource2 = { id: "2", order: 1, removeAllListeners: sinon.spy() };
            this.manager = new NewArchiveManager();
            sinon.stub(this.manager.storageInterface, "removeKey").returns(Promise.resolve());
            this.manager.sources.push(this.fakeSource1, this.fakeSource2);
        });

        it("removes the specified source", function() {
            return this.manager.removeSource("1").then(() => {
                expect(this.manager.sources).to.not.contain(this.fakeSource1);
                expect(this.manager.sources).to.contain(this.fakeSource2);
            });
        });

        it("calls to remove the correct storage key", function() {
            return this.manager.removeSource("2").then(() => {
                expect(this.manager.storageInterface.removeKey.calledWithExactly(`${STORAGE_KEY_PREFIX}2`)).to.be.true;
            });
        });

        it("emits 'sourcesUpdated' event", function() {
            sinon.spy(this.manager, "emit");
            return this.manager.removeSource("2").then(() => {
                expect(this.manager.emit.calledWith("sourcesUpdated")).to.be.true;
            });
        });

        it("removes all source event listeners", function() {
            return this.manager.removeSource("2").then(() => {
                expect(this.fakeSource2.removeAllListeners.calledOnce).to.be.true;
                expect(this.fakeSource1.removeAllListeners.notCalled).to.be.true;
            });
        });
    });

    describe("reorderSource", function() {
        beforeEach(function() {
            this.fakeSource1 = { id: "1", order: 0 };
            this.fakeSource2 = { id: "2", order: 1 };
            this.fakeSource3 = { id: "3", order: 2 };
            this.manager = new NewArchiveManager();
            this.manager.sources.push(this.fakeSource1, this.fakeSource2, this.fakeSource3);
            sinon.stub(this.manager, "reorderSources");
        });

        it("calls to reorder all sources", function() {
            this.manager.reorderSource("1", 1);
            expect(this.manager.reorderSources.calledOnce).to.be.true;
        });

        it("sets the order", function() {
            this.manager.reorderSource("1", 1);
            expect(this.fakeSource1.order).to.equal(1);
        });

        it("reorders items with orders the same or lower", function() {
            this.manager.reorderSource("1", 1);
            expect(this.fakeSource2.order).to.equal(0);
            expect(this.fakeSource1.order).to.equal(1);
            expect(this.fakeSource3.order).to.equal(2);
        });

        it("throws if there's no source for the provided ID", function() {
            expect(() => {
                this.manager.reorderSource("0", 0);
            }).to.throw(/No source found/i);
        });

        it("reorders positions before the moved source", function() {
            this.manager.reorderSource("3", 1);
            this.manager.sources.sort((sourceA, sourceB) => {
                if (sourceA.order > sourceB.order) {
                    return 1;
                } else if (sourceB.order > sourceA.order) {
                    return -1;
                }
                return 0;
            });
            expect(this.manager.sources[1].id).to.equal("3");
        });
    });

    describe("reorderSources", function() {
        beforeEach(function() {
            this.fakeSource1 = { id: "1", order: 2 };
            this.fakeSource2 = { id: "2", order: 0 };
            this.fakeSource3 = { id: "3", order: 1 };
            this.manager = new NewArchiveManager();
            this.manager.sources.push(this.fakeSource1, this.fakeSource2, this.fakeSource3);
            sinon.stub(this.manager, "_emitSourcesListUpdated");
        });

        it("calls to emit sources updated event", function() {
            this.manager.reorderSources();
            expect(this.manager._emitSourcesListUpdated.calledOnce).to.be.true;
        });

        it("sets the correct orders", function() {
            this.manager.reorderSources();
            expect(this.manager.sources).to.have.ordered.members([
                this.fakeSource2,
                this.fakeSource3,
                this.fakeSource1
            ]);
        });
    });
});
