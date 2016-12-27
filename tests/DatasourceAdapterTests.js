var lib = require("../source/module.js");

var Archive = lib.Archive,
    Credentials = lib.Credentials,
    TextDatasource = lib.TextDatasource,
    DatasourceAdapter = lib.DatasourceAdapter;

module.exports = {

    setUp: function(cb) {
        var testArchive = Archive.createWithDefaults(),
            testDatasource = new TextDatasource(),
            _this = this;
        testDatasource
            .save(testArchive, "abc123")
            .then(function(content) {
                _this.content = content;
            })
            .then(cb);
    },

    stringToDatasource: {

        createsTextDatasource: function(test) {
            var packet = JSON.stringify({ type: "text", content: this.content });
            var ds = DatasourceAdapter.stringToDatasource(packet, new Credentials());
            ds.load("abc123")
                .then(function(archive) {
                    test.ok(archive instanceof Archive, "Loaded item should be an archive");
                })
                .then(test.done);
        }

    }

};
