var lib = require("../source/module.js");

var Archive = lib.Archive,
    Credentials = lib.Credentials,
    WebDAVDatasource = lib.WebDAVDatasource,
    OwnCloudDatasource = lib.OwnCloudDatasource,
    FileDatasource = lib.FileDatasource,
    TextDatasource = lib.TextDatasource,
    signing = lib.tools.signing,
    datasourceTools = lib.tools.datasource;

module.exports = {

    setUp: function(cb) {
        (cb)();
    },

    extractDSStrProps: {

        testExtractsProperties: function(test) {
            var props = "ds=text,something=1,another-one=something.else,empty=",
                extracted = datasourceTools.extractDSStrProps(props);
            test.strictEqual(extracted.ds, "text", "Should extract datasource type correctly");
            test.strictEqual(extracted.something, "1", "Should extract basic properties");
            test.strictEqual(extracted["another-one"], "something.else", "Should extract properties with other characters");
            test.strictEqual(extracted.empty, "", "Should extract empty properties");
            test.done();
        }

    },

    stringToDatasource: {

        createsTextDatasource: function(test) {
            var ds = datasourceTools.stringToDatasource("ds=text");
            test.ok(ds instanceof TextDatasource, "Datasource should be of type TextDatasource");
            test.done();
        },

        createsFileDatasource: function(test) {
            var ds = datasourceTools.stringToDatasource("ds=file,path=/my/archive.bcup");
            test.ok(ds instanceof FileDatasource, "Datasource should be of type FileDatasource");
            test.strictEqual(ds.getArchivePath(), "/my/archive.bcup", "Path should be correct");
            test.done();
        },

        createsWebDAVDatasource: function(test) {
            var credentials = new Credentials({ username: "test", password: "test" }),
                ds = datasourceTools.stringToDatasource(
                    "ds=webdav,path=/auth/personal.bcup,endpoint=http://test.com/dav/",
                    credentials
                );
            test.ok(ds instanceof WebDAVDatasource, "Datasource should be of type WebDAVDatasource");
            test.strictEqual(ds.getArchivePath(), "/auth/personal.bcup", "Path should be correct");
            test.strictEqual(ds.getRemoteEndpoint(), "http://test.com/dav/", "Endpoint should be correct");
            test.done();
        },

        createsOwnCloudDatasource: function(test) {
            var credentials = new Credentials({ username: "test", password: "test" }),
                ds = datasourceTools.stringToDatasource(
                    "ds=owncloud,path=/auth/personal2.bcup,endpoint=http://owncloud.com/person/",
                    credentials
                );
            test.ok(ds instanceof OwnCloudDatasource, "Datasource should be of type OwnCloudDatasource");
            test.strictEqual(ds.getArchivePath(), "/auth/personal2.bcup", "Path should be correct");
            var remoteEndpoint = ds.getRemoteEndpoint();
            test.ok(/owncloud\.com\/person/.test(remoteEndpoint), "Remote endpoint should contain domain and path");
            test.ok(/remote\.php\/webdav/.test(remoteEndpoint), "Remote endpoint should contain OwnCloud path");
            test.done();
        },

        shouldThrowForInvalidDatasource: function(test) {
            var fn = function() {
                var ds = datasourceTools.stringToDatasource("ds=abc");
            };
            test.throws(fn, /Unknown datasource/i, "Should throw for unknown datasource type");
            test.done();
        }

    }

};
