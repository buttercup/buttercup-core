const { createEntryFacade, consumeEntryFacade } = require("../../source/node/entryFacade.js");
const Archive = require("../../source/node/Archive.js");
const Entry = require("../../source/node/Entry.js");

describe("entryFacade", function() {
    describe("createEntryFacade", function() {
        beforeEach(function() {
            const archive = new Archive();
            const group = archive.createGroup("test");
            this.entry = group.createEntry("test");
            this.entry.setAttribute(Entry.Attributes.FacadeType, "login");
        });

        it("returns a facade", function() {
            const facade = createEntryFacade(this.entry);
            expect(facade).to.be.an("object");
            expect(facade).to.have.property("type", "login");
            expect(facade)
                .to.have.property("fields")
                .that.is.an("array");
        });

        it("returns a 'login' facade by default", function() {
            this.entry.deleteAttribute(Entry.Attributes.FacadeType);
            const facade = createEntryFacade(this.entry);
            expect(facade.type).to.equal("login");
        });

        it("provides facade fields even if they don't exist on the Entry", function() {
            const { fields } = createEntryFacade(this.entry);
            const titleField = fields.find(f => f.property === "title");
            const usernameField = fields.find(f => f.property === "username");
            const passwordField = fields.find(f => f.property === "password");
            expect(titleField).to.be.an("object");
            expect(usernameField).to.be.an("object");
            expect(passwordField).to.be.an("object");
        });

        it("sets values within the facade", function() {
            this.entry.setProperty("username", "jane");
            this.entry.setProperty("password", "p4ss");
            const { fields } = createEntryFacade(this.entry);
            const titleField = fields.find(f => f.property === "title");
            const usernameField = fields.find(f => f.property === "username");
            const passwordField = fields.find(f => f.property === "password");
            expect(titleField).to.have.property("value", "test");
            expect(usernameField).to.have.property("value", "jane");
            expect(passwordField).to.have.property("value", "p4ss");
        });
    });

    describe("consumeEntryFacade", function() {
        beforeEach(function() {
            const archive = new Archive();
            const group = archive.createGroup("test");
            this.entry = group.createEntry("test");
            this.entry.setAttribute(Entry.Attributes.FacadeType, "login");
        });

        it("writes values back to the Entry", function() {
            const facade = createEntryFacade(this.entry);
            const titleField = facade.fields.find(f => f.property === "title");
            const usernameField = facade.fields.find(f => f.property === "username");
            const passwordField = facade.fields.find(f => f.property === "password");
            titleField.value = "Website";
            usernameField.value = "user";
            passwordField.value = "pass";
            consumeEntryFacade(this.entry, facade);
            expect(this.entry.getProperty("title")).to.equal("Website");
            expect(this.entry.getProperty("username")).to.equal("user");
            expect(this.entry.getProperty("password")).to.equal("pass");
        });

        it("writes extra values back to the Entry", function() {
            this.entry.setProperty("misc", "123");
            const facade = createEntryFacade(this.entry);
            const existingField = facade.fields.find(f => f.property === "misc");
            existingField.value = "456";
            facade.fields.push({
                title: "-",
                field: "property",
                property: "misc2",
                value: "789"
            });
            consumeEntryFacade(this.entry, facade);
            expect(this.entry.getProperty("misc")).to.equal("456");
            expect(this.entry.getProperty("misc2")).to.equal("789");
        });

        it("deletes properties that are removed from the facade", function() {
            this.entry.setProperty("misc", "123");
            const facade = createEntryFacade(this.entry);
            const existingFieldIndex = facade.fields.findIndex(f => f.property === "misc");
            facade.fields.splice(existingFieldIndex, 1);
            consumeEntryFacade(this.entry, facade);
            expect(this.entry.getProperty("misc")).to.be.undefined;
        });
    });
});
