(function(module) {

	"use strict";

	GLOBAL.root = __dirname;

	module.exports = {

		Archive: require(GLOBAL.root + "/classes/Archive.js"),
		Westley: require(GLOBAL.root + "/classes/Westley.js"),
		Workspace: require(GLOBAL.root + "/classes/Workspace.js"),

		ManagedGroup: require(GLOBAL.root + "/classes/ManagedGroup.js"),
		ManagedEntry: require(GLOBAL.root + "/classes/ManagedEntry.js"),

		FileDatasource: require(GLOBAL.root + "/classes/FileDatasource.js"),
		OwnCloudDatasource: require(GLOBAL.root + "/classes/OwnCloudDatasource.js"),
		WebDAVDatasource: require(GLOBAL.root + "/classes/WebDAVDatasource.js"),

		KeePass2XMLImporter: require(GLOBAL.root + "/classes/importers/KeePass2XMLImporter.js"),

		Flattener: require(GLOBAL.root + "/classes/Flattener.js"),
		Descriptor: require(GLOBAL.root + "/classes/Descriptor.js"),

		// Encryption info from: http://lollyrock.com/articles/nodejs-encryption/
		Encryption: require(GLOBAL.root + "/encryption/encrypt.js"),
		Decryption: require(GLOBAL.root + "/encryption/decrypt.js")

	};

})(module);
