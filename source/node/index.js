const iocane = require("iocane");
const datasources = require("@buttercup/datasources");
const Credentials = require("@buttercup/credentials");

module.exports = {
    Archive: require("./system/Archive.js"),
    ArchiveManager: require("./system/archiveManagement/ArchiveManager.js"),
    ArchiveSource: require("./system/archiveManagement/ArchiveSource.js"),
    Workspace: require("./system/Workspace.js"),

    Credentials: Credentials,

    Group: require("./system/Group.js"),
    Entry: require("./system/Entry.js"),
    entryFacade: require("./system/entryFacade.js"),

    Datasources: datasources,

    Flattener: require("./system/Flattener.js"),
    Descriptor: require("./system/Descriptor.js"),
    EntryFinder: require("./system/EntryFinder.js"),

    storage: {
        StorageInterface: require("./system/storage/StorageInterface.js"),
        MemoryStorageInterface: require("./system/storage/MemoryStorageInterface.js")
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
