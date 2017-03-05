describe("Workspace", function() {

    beforeEach(function() {
        this.workspace = new Workspace();
    });

    describe("addSharedArchive", function() {

        it("adds archives as secondary", function() {
            let archive = { mock: "archive" },
                datasource = { mock: "datasource" },
                credentials = { mock: "credentials" };
            this.workspace.addSharedArchive(
                archive,
                datasource,
                credentials
            );
            expect(this.workspace._archives).to.have.lengthOf(2);
            // expect(this.workspace._archives[0]).to.be.null;
            expect(this.workspace._archives[1]).to.eql({
                archive:        archive,
                datasource:     datasource,
                credentials:    credentials,
                saveable:       true
            });
        });

        it("skips the first slot", function() {
            this.workspace.addSharedArchive({}, {}, {});
            expect(this.workspace._archives[0]).to.be.null;
        });

    });

});
