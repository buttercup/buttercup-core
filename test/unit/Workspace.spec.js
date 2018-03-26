const Credentials = require("@buttercup/credentials");
const Workspace = require("../../source/node/Workspace.js");
const Archive = require("../../source/node/Archive.js");

describe("Workspace", function() {
    beforeEach(function() {
        this.workspace = new Workspace();
    });

    describe("addSharedArchive", function() {
        it("adds archives as secondary", function() {
            let archive = { mock: "archive" },
                datasource = { mock: "datasource" },
                credentials = { mock: "credentials" };
            this.workspace.addSharedArchive(archive, datasource, credentials);
            expect(this.workspace._archives).to.have.lengthOf(2);
            expect(this.workspace._archives[1]).to.eql({
                archive: archive,
                datasource: datasource,
                credentials: credentials,
                saveable: true
            });
        });

        it("skips the first slot", function() {
            this.workspace.addSharedArchive({}, {}, {});
            expect(this.workspace._archives[0]).to.be.null;
        });
    });

    describe("getAllItems", function() {
        it("returns all items in a new array", function() {
            const workspace = new Workspace();
            workspace.addSharedArchive({}, {}, {});
            workspace.setPrimaryArchive({}, {}, {});
            expect(workspace.getAllItems()).to.eql(workspace._archives);
            expect(workspace.getAllItems()).to.not.equal(workspace._archives);
        });
    });

    describe("getSaveableItems", function() {
        beforeEach(function() {
            this.workspace = new Workspace();
            this.workspace.addSharedArchive({ a: "1" }, { b: "1" }, { c: "1" }, false);
            this.workspace.addSharedArchive({ a: "2" }, { b: "2" }, { c: "2" }, true);
            this.workspace.setPrimaryArchive({ a: "3" }, { b: "3" }, { c: "3" });
        });

        it("returns only saveable items", function() {
            const saveable = this.workspace.getSaveableItems();
            expect(saveable).to.eql([
                {
                    archive: { a: "3" },
                    datasource: { b: "3" },
                    credentials: { c: "3" },
                    saveable: true
                },
                {
                    archive: { a: "2" },
                    datasource: { b: "2" },
                    credentials: { c: "2" },
                    saveable: true
                }
            ]);
        });
    });

    describe("imbue", function() {
        beforeEach(function() {
            this.primaryArchive = {
                sharedGroups: [],
                discardSharedGroups: () => {
                    this.primaryArchive.sharedGroups = [];
                }
            };
            this.secondaryArchive = {
                getGroups: () => null
            };
            sinon.spy(this.primaryArchive, "discardSharedGroups");
            sinon.stub(this.secondaryArchive, "getGroups").returns([
                {
                    id: "a",
                    isShared: () => false,
                    _getRemoteObject: function() {
                        return this;
                    }
                },
                {
                    id: "b",
                    isShared: () => true,
                    _getRemoteObject: function() {
                        return this;
                    }
                }
            ]);
            this.workspace = new Workspace();
            this.workspace.setPrimaryArchive(this.primaryArchive, {}, {});
            this.workspace.addSharedArchive(this.secondaryArchive, {}, {});
        });

        it("adds shared groups from other archives", function() {
            this.workspace.imbue();
            expect(this.primaryArchive.sharedGroups).to.have.lengthOf(1);
            expect(this.primaryArchive.sharedGroups[0]).to.have.property("id", "b");
            expect(this.primaryArchive.sharedGroups[0]).to.have.property("_foreign", true);
        });

        it("discards previously attached shared groups on the primary archive", function() {
            this.workspace.imbue();
            expect(this.primaryArchive.discardSharedGroups.callCount).to.equal(1);
        });

        it("throws if no primary archive is set", function() {
            const workspace = new Workspace();
            workspace.addSharedArchive(this.secondaryArchive, {}, {});
            expect(() => {
                workspace.imbue();
            }).to.throw(/no primary/i);
        });
    });

    describe("updatePrimaryCredentials", function() {
        beforeEach(function() {
            this.workspace = new Workspace();
            this.workspace.setPrimaryArchive(new Archive(), {}, Credentials.fromPassword("base"));
        });

        it("changes the primary archive's password", function() {
            expect(this.workspace.primary.credentials.password).to.equal("base");
            this.workspace.updatePrimaryCredentials(Credentials.fromPassword("new"));
            expect(this.workspace.primary.credentials.password).to.equal("new");
        });
    });
});
