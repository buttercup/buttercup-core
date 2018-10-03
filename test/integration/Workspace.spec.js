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

    describe("update", function() {
        it("merges remote changes", function() {
            return this.updateRemote()
                .then(() => this.workspace.update())
                .then(() => {
                    expect(this.workspace.archive.findGroupsByTitle("Test Group Remote")).to.have.lengthOf(1);
                });
        });
    });
});
