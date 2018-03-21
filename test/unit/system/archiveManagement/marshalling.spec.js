const { TextDatasource } = require("@buttercup/datasources");
const Credentials = require("@buttercup/credentials");
const {
    credentialsToDatasource,
    credentialsToSource
} = require("../../../../source/node/system/archiveManagement/marshalling.js");
const Archive = require("../../../../source/node/system/Archive.js");
const Workspace = require("../../../../source/node/system/Workspace.js");

describe("marshalling", function() {
    describe("credentialsToDatasource", function() {
        it("creates a datasource", function() {
            const creds = new Credentials();
            creds.setValue("datasource", JSON.stringify({ type: "text" }));
            return credentialsToDatasource(creds).then(function(result) {
                expect(result.datasource instanceof TextDatasource).to.be.true;
            });
        });

        it("throws an error if no datasource property is found", function() {
            const creds = new Credentials();
            return expect(credentialsToDatasource(creds)).to.eventually.be.rejectedWith(/failed.+required.+property/i);
        });

        it("throws an error if no type is found", function() {
            const creds = new Credentials();
            creds.setValue("datasource", JSON.stringify({}));
            return expect(credentialsToDatasource(creds)).to.eventually.be.rejectedWith(/invalid.+type/i);
        });
    });

    describe("credentialsToSource", function() {
        beforeEach(function() {
            this.archive = new Archive();
            this.archiveCredentials = Credentials.fromPassword("testing");
            const tds = new TextDatasource();
            return tds.save(this.archive.getHistory(), this.archiveCredentials).then(content => {
                this.sourceCredentials = new Credentials();
                this.sourceCredentials.setValue(
                    "datasource",
                    JSON.stringify({
                        type: "text",
                        content
                    })
                );
            });
        });

        it("creates a valid workspace", function() {
            return credentialsToSource(this.sourceCredentials, this.archiveCredentials).then(result => {
                expect(result)
                    .to.have.property("workspace")
                    .that.is.an.instanceOf(Workspace);
                expect(result.workspace.primary.archive.getID()).to.equal(this.archive.getID());
            });
        });

        it("attaches credentials", function() {
            return credentialsToSource(this.sourceCredentials, this.archiveCredentials).then(result => {
                expect(result)
                    .to.have.property("sourceCredentials")
                    .that.equals(this.sourceCredentials);
                expect(result)
                    .to.have.property("archiveCredentials")
                    .that.equals(this.archiveCredentials);
            });
        });
    });
});
