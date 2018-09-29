const Archive = require("../../source/node/Archive.js");
const Workspace = require("../../source/node/Workspace.js");
const { TextDatasource } = require("@buttercup/datasources");
const Credentials = require("@buttercup/credentials");

describe("Workspace", function() {
    beforeEach(function() {
        const tds = new TextDatasource();
        this.archive = Archive.createWithDefaults();
        return tds.save(this.archive.getHistory(), Credentials.fromPassword("test")).then(enc => {
            this.datasource = new TextDatasource(enc);
            this.workspace = new Workspace();
            this.workspace.setArchive(this.archive, this.datasource, Credentials.fromPassword("test"));
            this.updateRemote = () => {
                const tempDS = new TextDatasource(enc);
                return tempDS
                    .load(Credentials.fromPassword("test"))
                    .then(Archive.createFromHistory)
                    .then(archive => {
                        archive.createGroup("Test Group Remote");
                        return tempDS.save(archive.getHistory(), Credentials.fromPassword("test"));
                    })
                    .then(enc => {
                        this.datasource = new TextDatasource(enc);
                        this.workspace.setArchive(this.archive, this.datasource, Credentials.fromPassword("test"));
                    });
            };
        });
    });

    describe("localDiffersFromRemote", function() {
        it("returns false when there are no differences", function() {
            return this.workspace.localDiffersFromRemote().then(differs => {
                expect(differs).to.be.false;
            });
        });

        it("returns true when there are differences locally", function() {
            this.archive.createGroup("Test Group");
            return this.workspace.localDiffersFromRemote().then(differs => {
                expect(differs).to.be.true;
            });
        });

        it("returns true when there are differences remotely", function() {
            return this.updateRemote()
                .then(() => this.workspace.localDiffersFromRemote())
                .then(differs => {
                    expect(differs).to.be.true;
                });
        });

        it("returns true when there are differences both remotely and locally", function() {
            this.archive.createGroup("Test Group");
            return this.updateRemote()
                .then(() => this.workspace.localDiffersFromRemote())
                .then(differs => {
                    expect(differs).to.be.true;
                });
        });
    });

    describe("mergeFromRemote", function() {
        it("retains local changes if local differs", function() {
            this.archive.createGroup("Test Group");
            return this.workspace.mergeFromRemote().then(() => {
                expect(this.workspace.archive.findGroupsByTitle("Test Group")).to.have.lengthOf(1);
            });
        });

        it("retains remote changes if remote differs", function() {
            return this.updateRemote()
                .then(() => this.workspace.mergeFromRemote())
                .then(() => {
                    expect(this.workspace.archive.findGroupsByTitle("Test Group Remote")).to.have.lengthOf(1);
                });
        });

        it("retains local/remote changes if both differ", function() {
            this.archive.createGroup("Test Group");
            return this.updateRemote()
                .then(() => this.workspace.mergeFromRemote())
                .then(() => {
                    const titles = this.workspace.archive.getGroups().map(g => g.getTitle());
                    expect(titles).to.contain("Test Group");
                    expect(titles).to.contain("Test Group Remote");
                });
        });
    });
});
