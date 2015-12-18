(function(module) {

	"use strict";

	GLOBAL.root = __dirname;

	module.exports = {

		Archive: require("buttercup/classes/Archive.js"),
		Westley: require("buttercup/classes/Westley.js"),
		Inigo: require("buttercup/classes/InigoGenerator.js"),
		Workspace: require("buttercup/classes/Workspace.js"),

		ManagedGroup: require("buttercup/classes/ManagedGroup.js"),
		ManagedEntry: require("buttercup/classes/ManagedEntry.js"),

		FileDatasource: require("buttercup/classes/FileDatasource.js"),
		OwnCloudDatasource: require("buttercup/classes/OwnCloudDatasource.js"),
		WebDAVDatasource: require("buttercup/classes/WebDAVDatasource.js"),

		Flattener: require("buttercup/classes/Flattener.js"),
		Descriptor: require("buttercup/classes/Descriptor.js"),

		// Encryption info from: http://lollyrock.com/articles/nodejs-encryption/
		Encryption: require("buttercup/encryption/encrypt.js"),
		Decryption: require("buttercup/encryption/decrypt.js")

	};

})(module);
