(function(module) {

    "use strict";

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

        // Encryption info from: http://lollyrock.com/articles/nodejs-encryption/
        Encryption: require("./encryption/encrypt.js"),
        Decryption: require("./encryption/decrypt.js"),

        tools: {
            design: require("./tools/design.js"),
            signing: require("./tools/signing.js")
        }

    };

})(module);
