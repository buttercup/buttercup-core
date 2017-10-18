const { consumeEntryFacade, createEntryFacade } = entryFacade;

describe("modifying data via facades", function() {
    beforeEach(function() {
        const archive = new Archive();
        this.entry = archive.createGroup("Test").createEntry("Test");
        this.entry
            .setProperty("username", "firstuser")
            .setProperty("password", "firstpass")
            .setAttribute(Entry.Attributes.FacadeType, "website");
        // write data
        const facade = createEntryFacade(this.entry);
        const titleObj = facade.fields.find(field => field.property === "title");
        const usernameObj = facade.fields.find(field => field.property === "username");
        const passwordObj = facade.fields.find(field => field.property === "password");
        const urlObj = facade.fields.find(field => field.property === "url");
        titleObj.value = "myTest";
        usernameObj.value = "myUsername";
        passwordObj.value = "myPassword";
        urlObj.value = "http://login.com";
        consumeEntryFacade(this.entry, facade);
    });

    it("writes title changes", function() {
        expect(this.entry.getProperty("title")).to.equal("myTest");
    });

    it("writes property changes", function() {
        expect(this.entry.getProperty("username")).to.equal("myUsername");
        expect(this.entry.getProperty("password")).to.equal("myPassword");
    });

    it("writes meta changes", function() {
        expect(this.entry.getMeta("url")).to.equal("http://login.com");
    });
});
