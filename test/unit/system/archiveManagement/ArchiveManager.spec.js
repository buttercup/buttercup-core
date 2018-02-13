const { ArchiveManager: NewArchiveManager, ArchiveSource } = ArchiveManager.v2;

describe("ArchiveManager", function() {
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

        it("reorders items with orders the same or higher", function() {
            this.manager.reorderSource("2", 0);
            expect(this.fakeSource1.order).to.equal(1);
            expect(this.fakeSource2.order).to.equal(0);
        });

        it("throws if there's no source for the provided ID", function() {
            expect(() => {
                this.manager.reorderSource("0", 0);
            }).to.throw(/No source found/i);
        });

        it("reorders positions before the moved source", function() {
            this.manager.reorderSource("1", 1);
            this.manager.sources.sort((sourceA, sourceB) => {
                if (sourceA.order > sourceB.order) {
                    return 1;
                } else if (sourceB.order > sourceA.order) {
                    return -1;
                }
                return 0;
            });
            expect(this.manager.sources[1].id).to.equal("1");
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
