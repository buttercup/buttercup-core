var lib = require("../source/node/index.js");

var Archive = lib.Archive,
    createCredentials = lib.createCredentials,
    TextDatasource = lib.TextDatasource,
    DatasourceAdapter = lib.DatasourceAdapter;

module.exports = {
    setUp: function(cb) {
        var testArchive = Archive.createWithDefaults(),
            testDatasource = new TextDatasource(),
            _this = this;
        testDatasource
            .save(testArchive, createCredentials.fromPassword("abc123"))
            .then(function(content) {
                _this.content = content;
            })
            .then(cb);
    },

    stringToDatasource: {
        createsTextDatasource: function(test) {
            var packet = JSON.stringify({ type: "text", content: this.content });
            var ds = DatasourceAdapter.stringToDatasource(packet, createCredentials());
            ds
                .load(createCredentials.fromPassword("abc123"))
                .then(function(archive) {
                    test.ok(archive instanceof Archive, "Loaded item should be an archive");
                })
                .then(test.done);
        }
    }
};
