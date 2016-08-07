var lib = require("../source/module.js");

var Archive = lib.Archive,
    TextDatasource = lib.TextDatasource,
    signing = lib.tools.signing;

module.exports = {

    setUp: function(cb) {
        var _this = this;
        this.archive = new Archive();
        var group = this.archive.createGroup("main");
        var datasource = new TextDatasource();
        datasource.save(this.archive, "abc123")
            .then(function(data) {
                _this.content = data;
            })
            .then(cb)
            .catch(function(err) {
                console.error(err);
            });
    },

    load: {

        loadsFromContent: function(test) {
            var tds = new TextDatasource(this.content);
            tds.load("abc123")
                .then(function(archive) {
                    test.ok(archive instanceof Archive, "Should return an archive");
                    test.strictEqual(archive.getGroups()[0].getTitle(), "main", "Should contain correct group");
                    test.done();
                })
                .catch(function(err) {
                    console.error(err);
                });
        }

    },

    save: {

        savesToContent: function(test) {
            var tds = new TextDatasource("");
            tds.save(this.archive, "passw0rd")
                .then(function(encryptedData) {
                    test.ok(encryptedData.length > 100, "Encrypted content should not be empty");
                    test.ok(encryptedData.indexOf(signing.getSignature()) >= 0, "Signature should be present");
                    test.done();
                })
                .catch(function(err) {
                    console.error(err);
                });
        }

    }

};
