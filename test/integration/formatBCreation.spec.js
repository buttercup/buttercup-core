const { Group, Vault, VaultFormatB } = require("../../dist/index.node.js");

describe.only("Format B", function() {
    beforeEach(function() {
        this.vault = new Vault(VaultFormatB);
    });

    it("creates groups correctly", function() {
        const groupA = this.vault.createGroup("Parent");
        expect(groupA).to.be.an.instanceOf(Group);
        expect(groupA.getTitle()).to.equal("Parent");
    });

    it("sets and gets attributes correctly", function() {
        this.vault.setAttribute("test", "abc123");
        expect(this.vault.getAttribute("test")).to.equal("abc123");
        this.vault.setAttribute("another", "");
        expect(this.vault.getAttribute()).to.deep.equal({
            test: "abc123",
            another: ""
        });
    });

    it("can find groups", function() {
        const groupA = this.vault.createGroup("Group A (one)");
        const groupB = this.vault.createGroup("Group B (one)");
        const groupC = this.vault.createGroup("Group C (two)");
        const groups = this.vault.findGroupsByTitle(/one/);
        expect(groups).to.have.lengthOf(2);
        expect(groups.find(g => g.id === groupA.id)).to.be.an.instanceOf(Group);
        expect(groups.find(g => g.id === groupB.id)).to.be.an.instanceOf(Group);
    });

    describe("Group", function() {
        beforeEach(function() {
            this.parent = this.vault.createGroup("Parent");
            this.child = this.parent.createGroup("Child");
            this.child.createEntry("Email");
            this.child.createEntry("Bank");
        });

        it("can get child groups", function() {
            expect(this.parent.getGroups()).to.have.lengthOf(1);
            expect(this.parent.getGroups()[0].id).to.equal(this.child.id);
        });

        it("get find deep entries", function() {
            const entries = this.parent.findEntriesByProperty("title", /mail/i);
            expect(entries).to.have.lengthOf(1);
            expect(entries[0].getProperty("title")).to.equal("Email");
        });
    });
});
