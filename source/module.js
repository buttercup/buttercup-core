(function(module) {

	"use strict";

	module.exports = {

		Archive: require("__buttercup/classes/Archive.js"),
		Westley: require("__buttercup/classes/Westley.js"),
		Inigo: require("__buttercup/classes/InigoGenerator.js"),
		Workspace: require("__buttercup/classes/Workspace.js"),

		ManagedGroup: require("__buttercup/classes/ManagedGroup.js"),
		ManagedEntry: require("__buttercup/classes/ManagedEntry.js"),

		TextDatasource: require("__buttercup/classes/TextDatasource.js"),
		FileDatasource: require("__buttercup/classes/FileDatasource.js"),
		OwnCloudDatasource: require("__buttercup/classes/OwnCloudDatasource.js"),
		WebDAVDatasource: require("__buttercup/classes/WebDAVDatasource.js"),

		Flattener: require("__buttercup/classes/Flattener.js"),
		Descriptor: require("__buttercup/classes/Descriptor.js"),

		// Encryption info from: http://lollyrock.com/articles/nodejs-encryption/
		Encryption: require("__buttercup/encryption/encrypt.js"),
		Decryption: require("__buttercup/encryption/decrypt.js"),

		tools: {
			design: require("__buttercup/tools/design.js")
		}

	};

})(module);
