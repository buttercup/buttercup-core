var lib = require("../source/module.js");

var Archive = lib.Archive,
    WebDAVDatasource = lib.WebDAVDatasource,
    TextDatasource = lib.TextDatasource,
    signing = lib.tools.signing,
    datasourceTools = lib.tools.datasource;

var WebDAVFSMock = function(endpoint, username, password) {
    this.endpoint = endpoint;
    this.username = username;
    this.password = password;
    this.content = "";
    this.writeFile = function() {
        this.writeFileArgs = Array.prototype.slice.call(arguments);
        var callback = this.writeFileArgs[this.writeFileArgs.length - 1];
        callback();
    };
    this.readFile = function() {
        this.readFileArgs = Array.prototype.slice.call(arguments);
        var callback = this.readFileArgs[this.readFileArgs.length - 1];
        callback(null, this.content);
    };
};

module.exports = {

    setUp: function(cb) {
        var _this = this;
        this.archive = new Archive();
        var group = this.archive.createGroup("main");
        this.datasource = new WebDAVDatasource("", "", "user", "pass");
        this.wfsMock = this.datasource._wfs = new WebDAVFSMock();
        var textDatasource = new TextDatasource();
        textDatasource.save(this.archive, "abc123")
            .then(function(data) {
                //_this.content = data;
                _this.wfsMock.content = data;
            })
            .then(cb)
            .catch(function(err) {
                console.error(err);
            });
    },

    load: {

        callsWebDAVFSWithCorrectInformation: function(test) {
            var mock = this.wfsMock;
            this.datasource.load("abc123")
                .then(function(archive) {
                    var args = mock.readFileArgs;
                    test.ok(args.indexOf("utf8") >= 0, "Call should specify UTF8 encoding");
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

        callsWebDAVFSWithCorrectInformation: function(test) {
            var mock = this.wfsMock;
            this.datasource.save(this.archive, "myPass")
                .then(function() {
                    var args = mock.writeFileArgs,
                        encrypted = args[1];
                    test.ok(encrypted.indexOf(signing.getSignature()) >= 0, "Signature should be present");
                    test.done();
                })
                .catch(function(err) {
                    console.error(err);
                });
        }

    },

    toString: {

        outputsCorrectType: function(test) {
            var str = this.datasource.toString();
            var props = datasourceTools.extractDSStrProps(str);
            test.strictEqual(props.ds, "webdav", "Datasource type should match");
            test.done();
        }

    }

};
