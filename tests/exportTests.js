var lib = require("../source/module.js"),
    Archive = lib.Archive,
    exporter = lib.tools.export,
    signing = lib.tools.signing;

module.exports = {

    setUp: function(done) {
        this.archive = new Archive();
        this.main = this.archive.createGroup("Main");
        this.main.setAttribute("custom attribute", "attr value");
        this.entry = this.main.createEntry("My entry");
        this.entry
            .setProperty("username", "name")
            .setProperty("password", "passw0rd")
            .setMeta("cust0mMeta", "123 456")
            .setAttribute("someAttr!", "***");
        this.exported = exporter.exportArchiveToJSON(this.archive);
        (done)();
    },

    testExportsType: function(test) {
        test.strictEqual(this.exported.type, "buttercup-archive", "Export type should match");
        test.done();
    },

    testExportsFormat: function(test) {
        test.strictEqual(this.exported.format, signing.getFormat(), "Signature format should match");
        test.done();
    },

    testExportsGroup: function(test) {
        test.strictEqual(this.exported.groups.length, 1, "Should be 1 group");
        test.strictEqual(this.exported.groups[0].title, "Main", "Only group should be 'Main'");
        test.done();
    },

    testExportsGroupAttributes: function(test) {
        test.strictEqual(this.exported.groups[0].attributes["custom attribute"], "attr value", "Attribute should be correct");
        test.done();
    },

    testExportsEntry: function(test) {
        var entries = this.exported.groups[0].entries;
        test.strictEqual(entries.length, 1, "Should be 1 entry");
        test.strictEqual(entries[0].properties.title, "My entry", "Only entry should be 'My entry'");
        test.strictEqual(entries[0].properties.username, "name", "Username should be correct");
        test.strictEqual(entries[0].properties.password, "passw0rd", "Password should be correct");
        test.done();
    },

    testExportsEntryMeta: function(test) {
        var entry = this.exported.groups[0].entries[0];
        test.strictEqual(entry.meta["cust0mMeta"], "123 456", "Meta value should be correct");
        test.done();
    },

    testExportsEntryAttribute: function(test) {
        var entry = this.exported.groups[0].entries[0];
        test.strictEqual(entry.attributes["someAttr!"], "***", "Attribute value should be correct");
        test.done();
    }

};
