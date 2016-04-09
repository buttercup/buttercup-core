(function(module) {

    "use strict";

    var iocane = require("iocane");

    module.exports = {

        Archive: require("__buttercup/classes/Archive.js"),
        Westley: require("__buttercup/classes/Westley.js"),
        Inigo: require("__buttercup/classes/InigoGenerator.js"),
        Workspace: require("__buttercup/classes/Workspace.js"),

        Credentials: require("__buttercup/classes/Credentials.js"),
        Model: require("__buttercup/classes/Model.js"),

        ManagedGroup: require("__buttercup/classes/ManagedGroup.js"),
        ManagedEntry: require("__buttercup/classes/ManagedEntry.js"),

        TextDatasource: require("__buttercup/classes/TextDatasource.js"),
        FileDatasource: require("__buttercup/classes/FileDatasource.js"),
        OwnCloudDatasource: require("__buttercup/classes/OwnCloudDatasource.js"),
        WebDAVDatasource: require("__buttercup/classes/WebDAVDatasource.js"),

        Flattener: require("__buttercup/classes/Flattener.js"),
        Descriptor: require("__buttercup/classes/Descriptor.js"),

        tools: {
            design: require("__buttercup/tools/design.js"),
            signing: require("__buttercup/tools/signing.js")
        },

        vendor: {
            iocane: iocane
        }

    };

})(module);
