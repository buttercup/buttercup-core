var lib = require("../source/module.js");

var Archive = lib.Archive,
    FileDatasource = lib.FileDatasource,
    datasourceTools = lib.tools.datasource;

module.exports = {

    toString: {

        outputsCorrectProperties: function(test) {
            var fds = new FileDatasource("C:\\Work\\myarchive.bcup"),
                str = fds.toString();
            var props = datasourceTools.extractDSStrProps(str);
            test.strictEqual(props.ds, "file", "Datasource type should match");
            test.strictEqual(props.path, "C:\\Work\\myarchive.bcup", "Path should match");
            test.done();
        }

    }

};
