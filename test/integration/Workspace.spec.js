const Credentials = require("@buttercup/credentials");
const { TextDatasource } = require("@buttercup/datasources");
const Archive = require("../../source/node/system/Archive.js");
const Workspace = require("../../source/node/system/Workspace.js");

describe("Workspace", function() {
    beforeEach(function() {
        this.archive = Archive.createWithDefaults();
        this.ds = new TextDatasource("");
        this.workspace = new Workspace();
        this.workspace.setPrimaryArchive(this.archive, this.ds, Credentials.fromPassword("testing"));
    });

    it("repeated workspace.save() calls fire the datasource.save method only once", function() {
        sinon.spy(this.ds, "save");
        const prom1 = this.workspace.save();
        const prom2 = this.workspace.save();
        const prom3 = this.workspace.save();
        expect(prom1).to.equal(prom2);
        expect(prom2).to.equal(prom3);
        return prom3.then(() => {
            expect(this.ds.save.calledOnce).to.be.true;
        });
    });
});
