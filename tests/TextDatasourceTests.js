"use strict";

const lib = require("../source/module.js");

const path = require("path");

var Archive = lib.Archive,
    TextDatasource = lib.TextDatasource,
    Credentials = lib.Credentials,
    signing = lib.tools.signing,
    datasourceTools = lib.tools.datasource;

const binFilePath = path.resolve(__dirname, "./_helpers/test.bin");

module.exports = {

    setUp: function(cb) {
        this.archive = new Archive();
        var group = this.archive.createGroup("main");
        var datasource = new TextDatasource();
        datasource.save(this.archive, "abc123")
            .then((data) => {
                this.contentFromPassword = data;
                return datasource.save(this.archive, new Credentials({ keyfile: binFilePath }));
            })
            .then((data) => {
                this.contentFromKeyfile = data;
                return datasource.save(this.archive, new Credentials({ password: "abc123", keyfile: binFilePath }));
            })
            .then((data) => {
                this.contentFromBoth = data;
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

        outputsCorrectType: function(test) {
            var tds = new TextDatasource(""),
                str = tds.toString();
            var props = datasourceTools.extractDSStrProps(str);
            test.strictEqual(props.ds, "text", "Datasource type should match");
            test.done();
        }

    }

};
