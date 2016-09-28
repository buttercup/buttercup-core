(function(module) {

    "use strict";

    var iocane = require("iocane");

    module.exports = {

        Archive: require("./classes/Archive.js"),
        Westley: require("./classes/Westley.js"),
        Inigo: require("./classes/InigoGenerator.js"),
        Workspace: require("./classes/Workspace.js"),

        Credentials: require("./classes/Credentials.js"),
        Model: require("./classes/Model.js"),

        ManagedGroup: require("./classes/ManagedGroup.js"),
        ManagedEntry: require("./classes/ManagedEntry.js"),

        TextDatasource: require("./classes/TextDatasource.js"),
        FileDatasource: require("./classes/FileDatasource.js"),
        OwnCloudDatasource: require("./classes/OwnCloudDatasource.js"),
        WebDAVDatasource: require("./classes/WebDAVDatasource.js"),

        Flattener: require("./classes/Flattener.js"),
        Descriptor: require("./classes/Descriptor.js"),

        tools: {
            datasource: require("./tools/datasource.js"),
            encoding: require("./tools/encoding.js"),
            export: require("./tools/export.js"),
            signing: require("./tools/signing.js")
        },

        vendor: {
            iocane: iocane
        }

    };

})(module);
