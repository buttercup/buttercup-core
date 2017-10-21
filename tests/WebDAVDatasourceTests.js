var lib = require("../source/node/index.js");

var Archive = lib.Archive,
    WebDAVDatasource = lib.WebDAVDatasource,
    TextDatasource = lib.TextDatasource,
    signing = lib.tools.signing,
    createCredentials = lib.createCredentials;

var WebDAVFSMock = function(endpoint, credentials) {
    this.endpoint = endpoint;
    this.credentials = credentials;
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
        this.datasource = new WebDAVDatasource("", "", createCredentials({ username: "user", password: "pass" }));
        this.wfsMock = this.datasource._wfs = new WebDAVFSMock();
        var textDatasource = new TextDatasource();
        textDatasource
            .save(this.archive, createCredentials.fromPassword("abc123"))
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
            this.datasource
                .load(createCredentials.fromPassword("abc123"))
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
            this.datasource
                .save(this.archive, createCredentials.fromPassword("myPass"))
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

    toObject: {
        outputsAnObject: function(test) {
            var props = this.datasource.toObject();
            test.strictEqual(typeof props, "object", "Output should be an object");
            test.done();
        }
    },

    toString: {
        matchesToObject: function(test) {
            test.strictEqual(
                this.datasource.toString(),
                JSON.stringify(this.datasource.toObject()),
                "Contents should be identical"
            );
            test.done();
        },

        outputsCorrectContent: function(test) {
            var props = JSON.parse(this.datasource.toString());
            test.strictEqual(props.type, "webdav", "Datasource type should match");
            test.strictEqual(props.endpoint, "/", "Endpoint should be correct");
            test.strictEqual(props.path, "/", "Path should be correct");
            test.done();
        }
    }
};
