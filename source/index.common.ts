export { default as VaultManager } from "./core/VaultManager";
export { default as VaultSource } from "./core/VaultSource";
export { default as Vault } from "./core/Vault";
export { default as Group } from "./core/Group";
export { default as Entry } from "./core/Entry";
export { default as AttachmentManager } from "./attachments/AttachmentManager";

export { default as TextDatasource } from "./datasources/TextDatasource";
export { default as MemoryDatasource } from "./datasources/MemoryDatasource";
export { default as FileDatasource } from "./datasources/FileDatasource";
export { default as WebDAVDatasource } from "./datasources/WebDAVDatasource";
export { default as DropboxDatasource } from "./datasources/DropboxDatasource";
export { default as GoogleDriveDatasource } from "./datasources/GoogleDriveDatasource";
export { default as MyButtercupDatasource } from "./datasources/MyButtercupDatasource";
export { default as MyButtercupClient } from "./myButtercup/MyButtercupClient";
export { default as DatasourceAuthManager } from "./datasources/DatasourceAuthManager";
export { registerDatasource } from "./datasources/register";

export { consumeGroupFacade, consumeVaultFacade, createGroupFacade, createVaultFacade } from "./facades/vault";
export { isOTPURI, isVaultFacade } from "./facades/detection";
export { consumeEntryFacade, createEntryFacade, fieldsToProperties } from "./facades/entry";
export { createFieldDescriptor } from "./facades/tools";
export {
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
} from "./facades/symbols";

export { default as Credentials } from "./credentials/Credentials";

export { default as StorageInterface } from "./storage/StorageInterface";
export { default as MemoryStorageInterface } from "./storage/MemoryStorageInterface";

export { default as Search, SearchResult } from "./search/Search";
export { getSharedAppEnv } from "./env/appEnv";

export {
    ENTRY_URL_TYPE_ANY,
    ENTRY_URL_TYPE_GENERAL,
    ENTRY_URL_TYPE_ICON,
    ENTRY_URL_TYPE_LOGIN,
    getEntryURLs
} from "./tools/entry";

/**
 * @module Buttercup
 */
