var lib = require("../source/module.js"),
    Archive = lib.Archive,
    exporter = lib.tools.export,
    signing = lib.tools.signing;

module.exports = {

    setUp: function(done) {
        this.archive = new Archive();
        this.main = this.archive.createGroup("Main");
        this.entry = this.main.createEntry("My entry");
        this.entry
            .setProperty("username", "name")
            .setProperty("password", "passw0rd");
        this.exported = exporter.exportArchiveToJSON(this.archive);
        (done)();
    },
    
    testExportsFormat: function(test) {
        test.strictEqual(this.exported.format, signing.getFormat(), "Signature format should match");
        test.done();
    }
    
};
