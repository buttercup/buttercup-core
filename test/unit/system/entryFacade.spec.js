const {
    consumeEntryFacade,
    createEntryFacade
} = entryFacade;

describe("createEntryFacade", function() {

    beforeEach(function() {
        const archive = new Archive();
        this.entry = archive.createGroup("Test").createEntry("Test");
        this.entry.setProperty("username", "user");
        this.entry.setProperty("password", "pass");
        this.entry.setMeta("some meta value", "123 456");
        this.facade = createEntryFacade(this.entry);
        console.log(JSON.stringify(this.facade, undefined, 4));
    });

    it("creates a facade", function() {
        expect(this.facade).to.have.property("type", "login");
        expect(this.facade).to.have.property("fields")
            .that.is.an.array;
    });

    it("creates items for each property", function() {
        const titleItem = this.facade.fields.find(item => item.property === "title");
        const usernameItem = this.facade.fields.find(item => item.property === "username");
        const passwordItem = this.facade.fields.find(item => item.property === "password");
        expect(titleItem).to.have.property("value", "Test");
        expect(usernameItem).to.have.property("value", "user");
        expect(passwordItem).to.have.property("value", "pass");
    });

    it("copies meta values not listed in preset", function() {
        const metaItem = this.facade.fields.find(item => item.property === "some meta value");
        expect(metaItem).to.have.property("field", "meta");
        expect(metaItem).to.have.property("value", "123 456");
    });

});
