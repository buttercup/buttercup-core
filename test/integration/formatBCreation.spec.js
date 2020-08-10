const { Vault, VaultFormatB } = require("../../dist/index.node.js");

describe.only("Format B", function() {
    beforeEach(function() {
        this.vault = new Vault(VaultFormatB);
    });

    it("creates groups correctly", function() {
        const groupA = this.vault.createGroup("Parent");
        console.log(this.vault.format);
    });
});
