const Search = require("../../../dist/search/Search.js");
const Vault = require("../../../dist/core/Vault.js");
const MemoryStorageInterface = require("../../../dist/storage/MemoryStorageInterface.js");
const { expect } = require("chai");

describe.only("Search", function() {
    beforeEach(function() {
        const vault = (this.vault = new Vault());
        const groupA = vault.createGroup("Email");
        groupA
            .createEntry("Personal Mail")
            .setProperty("username", "green.monkey@fastmail.com")
            .setProperty("password", "df98Sm2.109x{91")
            .setProperty("url", "https://fastmail.com");
        groupA
            .createEntry("Work")
            .setProperty("username", "j.crowley@gmov.edu.au")
            .setProperty("password", "#f05c.*skU3")
            .setProperty("URL", "gmov.edu.au/portal/auth");
        const groupB = vault.createGroup("Bank");
        groupB
            .createEntry("MyBank")
            .setProperty("username", "324654356346")
            .setProperty("PIN", "1234");
        groupB
            .createEntry("Insurance")
            .setProperty("username", "testing-user")
            .setProperty("URL", "http://test.org/portal-int/login.aspx");
        const groupC = vault.createGroup("General");
        groupC
            .createEntry("Clipart")
            .setProperty("username", "gmonkey123")
            .setProperty("password", "test93045")
            .setProperty("Url", "clipart.com");
        groupC
            .createEntry("Wordpress")
            .setProperty("username", "gmonkey1234")
            .setProperty("password", "passw0rd")
            .setProperty("Url", "https://wordpress.com/")
            .setProperty("Login URL", "https://wordpress.com/account/login.php");
    });

    it("can be instantiated", function() {
        expect(() => {
            new Search([this.vault]);
        }).to.not.throw();
    });

    describe("instance", function() {
        beforeEach(function() {
            this.storage = new MemoryStorageInterface();
            this.search = new Search([this.vault], this.storage);
            return this.search.prepare();
        });

        describe("searchByURL", function() {
            it("finds results by URL", function() {
                const results = this.search.searchByURL("https://wordpress.com/homepage/test/org");
                console.log(JSON.stringify(results, undefined, 2));
                expect(results).to.have.length.above(0);
                expect(results[0]).to.have.nested.property("properties.title", "Wordpress");
            });

            it("supports ordering", function() {
                const [entry] = this.vault.findEntriesByProperty("title", "Insurance");
                return this.storage
                    .setValue(
                        `bcup_search_${this.vault.id}`,
                        JSON.stringify({
                            [entry.id]: 3
                        })
                    )
                    .then(() => {
                        const results = this.search.searchByURL("https://gmov.edu.au/portal/");
                        console.log(results);
                    });
            });
        });
    });
});
