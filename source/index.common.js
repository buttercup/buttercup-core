const VaultManager = require("./core/VaultManager.js");
const VaultSource = require("./core/VaultSource.js");
const Vault = require("./core/Vault.js");
const Group = require("./core/Group.js");
const Entry = require("./core/Entry.js");
const TextDatasource = require("./datasources/TextDatasource.js");
const FileDatasource = require("./datasources/FileDatasource.js");
const WebDAVDatasource = require("./datasources/WebDAVDatasource.js");
const DropboxDatasource = require("./datasources/DropboxDatasource.js");
const GoogleDriveDatasource = require("./datasources/GoogleDriveDatasource.js");
const MyButtercupDatasource = require("./datasources/MyButtercupDatasource.js");
const MyButtercupClient = require("./myButtercup/MyButtercupClient.js");
const { consumeGroupFacade, consumeVaultFacade, createGroupFacade, createVaultFacade } = require("./facades/vault.js");
const { consumeEntryFacade, createEntryFacade } = require("./facades/entry.js");
const Credentials = require("./credentials/Credentials.js");
const StorageInterface = require("./storage/StorageInterface.js");
const MemoryStorageInterface = require("./storage/MemoryStorageInterface.js");

module.exports = {
    VaultManager,
    VaultSource,
    Vault,
    Group,
    Entry,

    Credentials,

    TextDatasource,
    FileDatasource,
    WebDAVDatasource,
    DropboxDatasource,
    GoogleDriveDatasource,
    MyButtercupDatasource,

    MyButtercupClient,

    StorageInterface,
    MemoryStorageInterface,

    consumeEntryFacade,
    consumeGroupFacade,
    consumeVaultFacade,
    createEntryFacade,
    createGroupFacade,
    createVaultFacade
};
