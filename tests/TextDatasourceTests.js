var lib = require("../source/module.js");

var path = require("path"),
    fs = require("fs");

var Archive = lib.Archive,
    TextDatasource = lib.TextDatasource,
    Credentials = lib.Credentials,
    signing = lib.tools.signing,
    datasourceTools = lib.tools.datasource;

var binFilePath = path.resolve(__dirname, "./_helpers/test.bin");

module.exports = {

    setUp: function(cb) {
        var _this = this;
        this.archive = new Archive();
        var group = this.archive.createGroup("main");
        var datasource = new TextDatasource();
        datasource
            .save(this.archive, "abc123")
            .then(function(data) {
                _this.contentFromPassword = data;
                return datasource.save(_this.archive, new Credentials({ keyfile: binFilePath }));
            })
            .then(function(data) {
                _this.contentFromKeyfile = data;
                return datasource.save(_this.archive, new Credentials({ password: "abc123", keyfile: binFilePath }));
            })
            .then(function(data) {
                _this.contentFromBoth = data;
            })
            .then(cb)
            .catch(function(err) {
                console.error(err);
            });
    },

    load: {

        loadsFromContentWithOnlyPassword: function(test) {
            var tds = new TextDatasource(this.contentFromPassword);
            tds.load("abc123")
                .then(function(archive) {
                    test.ok(archive instanceof Archive, "Should return an archive");
                    test.strictEqual(archive.getGroups()[0].getTitle(), "main", "Should contain correct group");
                    test.done();
                })
                .catch(function(err) {
                    console.error(err);
                });
        },

        loadsFromContentWithOnlyKeyfile: function(test) {
            var tds = new TextDatasource(this.contentFromKeyfile);
            tds.load(new Credentials({ keyfile: binFilePath }))
                .then(function(archive) {
                    test.ok(archive instanceof Archive, "Should return an archive");
                    test.strictEqual(archive.getGroups()[0].getTitle(), "main", "Should contain correct group");
                    test.done();
                })
                .catch(function(err) {
                    console.error(err);
                });
        },

        loadsFromContentWithBothPasswordAndKeyfile: function(test) {
            var tds = new TextDatasource(this.contentFromBoth);
            tds.load(new Credentials({ password: "abc123", keyfile: binFilePath }))
                .then(function(archive) {
                    test.ok(archive instanceof Archive, "Should return an archive");
                    test.strictEqual(archive.getGroups()[0].getTitle(), "main", "Should contain correct group");
                    test.done();
                })
                .catch(function(err) {
                    console.error(err);
                });
        },

        loadsFromContentWithKeyfileData: function(test) {
            var keyFileData = fs.readFileSync(binFilePath);
            var tds = new TextDatasource(this.contentFromKeyfile);
            tds.load(new Credentials({ keyfile: keyFileData }))
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

    },

    toString: {

        matchesToObject: function(test) {
            var tds = new TextDatasource("abc");
            test.strictEqual(
                tds.toString(),
                JSON.stringify(tds.toObject()),
                "Contents should be identical"
            );
            test.done();
        },

        outputsCorrectContent: function(test) {
            var tds = new TextDatasource("abc"),
                str = tds.toString();
            var props = JSON.parse(str)
            test.strictEqual(props.type, "text", "Datasource type should match");
            test.strictEqual(props.content, "abc", "Content should be included");
            test.done();
        }

    }

};
