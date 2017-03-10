var lib = require("../../source/module.js");
var Archive = lib.Archive,
    createCredentials = lib.createCredentials,
    TextDatasource = lib.TextDatasource;

module.exports = {

    setUp: function(done) {
        let archive = new Archive();
        let mainGroup = archive.createGroup("general"),
            mainEntry = mainGroup.createEntry("login");
        mainEntry.setProperty("title", "   \n   ");
        mainEntry.setProperty("username", " some\nspecialχ");
        mainEntry.setProperty("password", "-----TEST-----\n\n\tSpecial\n-----/\"Test\"\"----");
        mainEntry.setMeta("special \n\n\t special", "special \n\n\t special");
        this.entryID = mainEntry.getID();
        let tds = new TextDatasource();
        tds
            .save(archive, createCredentials.fromPassword("myPass"))
            .then(encrypted => {
                tds.setContent(encrypted);
                return tds.load(createCredentials.fromPassword("myPass"));
            })
            .then(archive2 => {
                this.archive2 = archive2;
            })
            .then(done);
    },

    supportsSpecialPropertyValues: function(test) {
        let newEntry = this.archive2.findEntryByID(this.entryID);
        test.strictEqual(newEntry.getProperty("title"), "   \n   ", "Title should match");
        test.strictEqual(newEntry.getProperty("username"), " some\nspecialχ", "Username should match");
        test.strictEqual(newEntry.getProperty("password"), "-----TEST-----\n\n\tSpecial\n-----/\"Test\"\"----", "Password should match");
        test.done();
    }

};
