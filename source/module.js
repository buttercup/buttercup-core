"use strict";

const iocane = require("iocane");

module.exports = {

    Archive: require("./system/Archive.js"),
    ArchiveManager: require("./system/ArchiveManager.js"),
    Westley: require("./system/Westley.js"),
    Inigo: require("./system/InigoGenerator.js"),
    Workspace: require("./system/Workspace.js"),

    createCredentials: require("./system/credentials.js"),
    Model: require("./system/Model.js"),

    Group: require("./system/Group.js"),
    Entry: require("./system/Entry.js"),
    entryFacade: require("./system/entryFacade.js"),

    DatasourceAdapter: require("./system/DatasourceAdapter.js"),
    TextDatasource: require("./system/TextDatasource.js"),
    FileDatasource: require("./system/FileDatasource.js"),
    OwnCloudDatasource: require("./system/OwnCloudDatasource.js"),
    NextcloudDatasource: require("./system/NextcloudDatasource.js"),
    WebDAVDatasource: require("./system/WebDAVDatasource.js"),
    MyButtercupDatasource: require("./system/MyButtercupDatasource.js"),

    Flattener: require("./system/Flattener.js"),
    Descriptor: require("./system/Descriptor.js"),

    storage: {
        StorageInterface: require("./system/storage/StorageInterface.js"),
        MemoryStorageInterface: require("./system/storage/MemoryStorageInterface.js")
    },

    archiveManagement: {
        marshalling: require("./system/archiveManagement/marshalling.js")
    },

    tools: {
        encoding: require("./tools/encoding.js"),
        export: require("./tools/export.js"),
        signing: require("./tools/signing.js"),
        searching: {
            instance: require("./tools/searching-instance.js"),
            raw: require("./tools/searching-raw.js")
        }
    },

    vendor: {
        iocane
    }

};
