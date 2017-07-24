const {
    consumeEntryFacade,
    createEntryFacade
} = entryFacade;

describe("consumeEntryFacade", function() {

    beforeEach(function() {
        const archive = new Archive();
        this.entry = archive.createGroup("Test").createEntry("Testing");
        this.entry.setProperty("username", "username");
        this.entry.setProperty("password", "password");
        this.entry.setMeta("some meta value", "123");
        this.entry.setMeta("removed meta", "gone");
        this.entry.setAttribute("removed attribute", "gone");
        this.facade = {
            "type": "login",
            "fields": [
                {
                    "title": "Title",
                    "field": "property",
                    "property": "title",
                    "value": "Test",
                    "secret": false,
                    "multiline": false,
                    "formatting": false
                },
                {
                    "title": "Username",
                    "field": "property",
                    "property": "username",
                    "value": "user",
                    "secret": false,
                    "multiline": false,
                    "formatting": false
                },
                {
                    "title": "Password",
                    "field": "property",
                    "property": "password",
                    "value": "pass",
                    "secret": true,
                    "multiline": false,
                    "formatting": false
                },
                {
                    "title": "some meta value",
                    "field": "meta",
                    "property": "some meta value",
                    "value": "123 456",
                    "secret": false,
                    "multiline": false,
                    "formatting": false
                },
                {
                    "title": "new meta",
                    "field": "meta",
                    "property": "new meta",
                    "value": "new",
                    "secret": false,
                    "multiline": false,
                    "formatting": false
                }
            ]
        };
        consumeEntryFacade(this.entry, this.facade);
    });

    it("writes the values to the entry", function() {
        expect(this.entry.getProperty("title")).to.equal("Test");
        expect(this.entry.getProperty("username")).to.equal("user");
        expect(this.entry.getProperty("password")).to.equal("pass");
    });

    it("writes extra meta to the entry", function() {
        expect(this.entry.getMeta("some meta value")).to.equal("123 456");
    });

    it("writes new meta to the entry", function() {
        expect(this.entry.getMeta("new meta")).to.equal("new");
    });

    it("removes unmentioned meta", function() {
        expect(this.entry.getMeta("removed meta")).to.be.undefined;
    });

    it("removes unmentioned attributes", function() {
        expect(this.entry.getAttribute("removed attribute")).to.be.undefined;
    });

});

describe("createEntryFacade", function() {

    beforeEach(function() {
        const archive = new Archive();
        this.entry = archive.createGroup("Test").createEntry("Test");
        this.entry.setProperty("username", "user");
        this.entry.setProperty("password", "pass");
        this.entry.setMeta("some meta value", "123 456");
        this.facade = createEntryFacade(this.entry);
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
