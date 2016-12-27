var lib = require("../source/module.js");

var Archive = lib.Archive,
    FileDatasource = lib.FileDatasource,
    datasourceTools = lib.tools.datasource;

module.exports = {

    toString: {

        matchesToObject: function(test) {
            var fds = new FileDatasource("C:\\Work\\myarchive.bcup");
            test.strictEqual(
                fds.toString(),
                JSON.stringify(fds.toObject()),
                "Contents should be identical"
            );
            test.done();
        },

        outputsCorrectProperties: function(test) {
            var fds = new FileDatasource("C:\\Work\\myarchive.bcup"),
                str = fds.toString();
            var props = JSON.parse(str);
            test.strictEqual(props.type, "file", "Datasource type should match");
            test.strictEqual(props.path, "C:\\Work\\myarchive.bcup", "Path should match");
            test.done();
        }

    }

};
