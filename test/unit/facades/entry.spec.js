const Vault = require("../../../source/core/Vault.js");
const Entry = require("../../../source/core/Entry.js");
const { createEntryFacade } = require("../../../source/facades/entry.js");

describe("facades/entry", function() {
    describe("createEntryFacade", function() {
        beforeEach(function() {
            const vault = new Vault();
            this.entry = vault.createGroup("test").createEntry("Bank");
            this.entry
                .setProperty("username", "u12345")
                .setProperty("password", "passw0rd")
                .setProperty("URL", "https://bank.com")
                .setAttribute("BC_TEST", "test");
        });

        it("outputs the correct facade type", function() {
            const { type: type1 } = createEntryFacade(this.entry);
            expect(type1).to.equal("login");
            this.entry.setAttribute(Entry.Attributes.FacadeType, "website");
            const { type: type2 } = createEntryFacade(this.entry);
            expect(type2).to.equal("website");
        });

        it("supports overriding the entry type", function() {
            this.entry.setAttribute(Entry.Attributes.FacadeType, "website");
            const { type } = createEntryFacade(this.entry, { type: "login" });
            expect(type).to.equal("login");
        });

        it("throws if the parameter is not an Entry instance", function() {
            expect(() => {
                createEntryFacade(new Vault());
            }).to.throw(/not an Entry/i);
        });

        it("throws if entry facade type is not recognised", function() {
            this.entry.setAttribute(Entry.Attributes.FacadeType, "chicken");
            expect(() => {
                createEntryFacade(this.entry);
            }).to.throw(/No.+found for type/i);
        });

        it("outputs attributes", function() {
            const { fields } = createEntryFacade(this.entry);
            const attr = fields.find(field => field.property === "BC_TEST");
            expect(attr).to.be.an("object");
            expect(attr).to.have.property("propertyType", "attribute");
            expect(attr).to.have.property("value", "test");
            expect(attr).to.have.property("valueType", null);
        });

        it("outputs history", function() {
            const { _history } = createEntryFacade(this.entry);
            expect(_history).to.have.length.above(0);
        });
    });
});
