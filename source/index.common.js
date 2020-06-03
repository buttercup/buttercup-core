const VaultManager = require("./core/VaultManager.js");
const VaultSource = require("./core/VaultSource.js");
const Vault = require("./core/Vault.js");
const Group = require("./core/Group.js");
const Entry = require("./core/Entry.js");

const TextDatasource = require("./datasources/TextDatasource.js");
const MemoryDatasource = require("./datasources/MemoryDatasource.js");
const FileDatasource = require("./datasources/FileDatasource.js");
const WebDAVDatasource = require("./datasources/WebDAVDatasource.js");
const DropboxDatasource = require("./datasources/DropboxDatasource.js");
const GoogleDriveDatasource = require("./datasources/GoogleDriveDatasource.js");
const MyButtercupDatasource = require("./datasources/MyButtercupDatasource.js");
const MyButtercupClient = require("./myButtercup/MyButtercupClient.js");
const DatasourceAuthManager = require("./datasources/DatasourceAuthManager.js");
const { registerDatasource } = require("./datasources/register.js");

const { consumeGroupFacade, consumeVaultFacade, createGroupFacade, createVaultFacade } = require("./facades/vault.js");
const { isOTPURI, isVaultFacade } = require("./facades/detection.js");
const { consumeEntryFacade, createEntryFacade } = require("./facades/entry.js");
const { createFieldDescriptor } = require("./facades/tools.js");
const {
    DEFAULT_ENTRY_TYPE,
    DEFAULT_FIELD_TYPE,
    ENTRY_TYPE_CREDITCARD,
    ENTRY_TYPE_LOGIN,
    ENTRY_TYPE_NOTE,
    ENTRY_TYPE_SSHKEY,
    ENTRY_TYPE_WEBSITE,
    ENTRY_TYPES,
    FIELD_VALUE_TYPE_NOTE,
    FIELD_VALUE_TYPE_OTP,
    FIELD_VALUE_TYPE_PASSWORD,
    FIELD_VALUE_TYPE_TEXT,
    FIELD_VALUE_TYPES
} = require("./facades/symbols.js");

const Credentials = require("./credentials/Credentials.js");

const StorageInterface = require("./storage/StorageInterface.js");
const MemoryStorageInterface = require("./storage/MemoryStorageInterface.js");

const EntryFinder = require("./search/EntryFinder.js");
const { getSharedAppEnv } = require("./env/appEnv.js");

const {
    ENTRY_URL_TYPE_ANY,
    ENTRY_URL_TYPE_GENERAL,
    ENTRY_URL_TYPE_ICON,
    ENTRY_URL_TYPE_LOGIN,
    getEntryURLs
} = require("./tools/entry.js");

/**
 * @module Buttercup
 */

module.exports = {
    DEFAULT_ENTRY_TYPE,
    DEFAULT_FIELD_TYPE,
    ENTRY_TYPE_CREDITCARD,
    ENTRY_TYPE_LOGIN,
    ENTRY_TYPE_NOTE,
    ENTRY_TYPE_SSHKEY,
    ENTRY_TYPE_WEBSITE,
    ENTRY_TYPES,
    ENTRY_URL_TYPE_ANY,
    ENTRY_URL_TYPE_GENERAL,
    ENTRY_URL_TYPE_ICON,
    ENTRY_URL_TYPE_LOGIN,
    FIELD_VALUE_TYPE_NOTE,
    FIELD_VALUE_TYPE_OTP,
    FIELD_VALUE_TYPE_PASSWORD,
    FIELD_VALUE_TYPE_TEXT,
    FIELD_VALUE_TYPES,

    VaultManager,
    VaultSource,
    Vault,
    Group,
    Entry,

    Credentials,

    TextDatasource,
    MemoryDatasource,
    FileDatasource,
    WebDAVDatasource,
    DropboxDatasource,
    GoogleDriveDatasource,
    MyButtercupDatasource,
    DatasourceAuthManager,
    registerDatasource,

    MyButtercupClient,

    StorageInterface,
    MemoryStorageInterface,

    EntryFinder,

    consumeEntryFacade,
    consumeGroupFacade,
    consumeVaultFacade,
    createEntryFacade,
    createFieldDescriptor,
    createGroupFacade,
    createVaultFacade,
    isOTPURI,
    isVaultFacade,

    getSharedAppEnv,
    getEntryURLs
};
