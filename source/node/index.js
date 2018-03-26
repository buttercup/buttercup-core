const iocane = require("iocane");
const datasources = require("@buttercup/datasources");
const Credentials = require("@buttercup/credentials");

module.exports = {
    Archive: require("./Archive.js"),
    ArchiveManager: require("./archiveManagement/ArchiveManager.js"),
    ArchiveSource: require("./archiveManagement/ArchiveSource.js"),
    Workspace: require("./Workspace.js"),

    Credentials: Credentials,

    Group: require("./Group.js"),
    Entry: require("./Entry.js"),
    entryFacade: require("./entryFacade.js"),

    Datasources: datasources,

    Flattener: require("./Flattener.js"),
    Descriptor: require("./Descriptor.js"),
    EntryFinder: require("./EntryFinder.js"),

    storage: {
        StorageInterface: require("./storage/StorageInterface.js"),
        MemoryStorageInterface: require("./storage/MemoryStorageInterface.js")
    },

    tools: {
        encoding: require("./tools/encoding.js"),
        entry: require("./tools/entry.js"),
        export: require("./tools/export.js"),
        uuid: require("./tools/uuid.js"),
        signing: require("./tools/signing.js"),
        searching: {
            instance: require("./tools/searching-instance.js"),
            raw: require("./tools/searching-raw.js")
        }
    },

    vendor: {
        iocane,
        webdav: datasources.webdav
    }
};
