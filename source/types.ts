export interface AttachmentDetails {
    id: string;
    name: string;
    type: string;
    sizeOriginal: number;
    sizeEncrypted: number;
    created: string;
    updated: string;
}

export type BufferLike = Buffer | ArrayBuffer;

export interface CowlError extends Error {
    responseHeaders: {
        [key: string]: string;
    };
}

export interface CredentialsData {
    datasource?: DatasourceConfiguration;
    [key: string]: any;
}

export interface CredentialsPayload {
    data: CredentialsData;
    masterPassword: string | null;
    purposes: Array<string>;
    open: boolean;
}

export interface DatasourceConfiguration {
    type: string;
    content?: string;
    [key: string]: any;
}

export interface DatasourceConfigurationDropbox extends DatasourceConfiguration {
    type: "dropbox";
    path: string;
    token: string;
}

export interface DatasourceConfigurationGoogleDrive extends DatasourceConfiguration {
    type: "googledrive";
    fileID: string;
    refreshToken: string;
    token: string;
}

export interface DatasourceConfigurationFile extends DatasourceConfiguration {
    type: "file";
    path: string;
}

export interface DatasourceConfigurationMemory extends DatasourceConfiguration {
    type: "memory";
    property: string;
}

export interface DatasourceConfigurationWebDAV extends DatasourceConfiguration {
    type: "webdav";
    endpoint: string;
    password: string;
    path: string;
    username: string;
}

export interface DatasourceLoadedData {
    Format: any;
    history: History;
}

export type DateString = string;

export type EncryptedContent = string;

export interface EntryChange {
    property: string;
    type: EntryChangeType;
    value?: string;
    ts: UTCTimestamp;
}

export enum EntryChangeType {
    Created = "created",
    Modified = "modified",
    Deleted = "deleted"
}

export interface EntryFacade {
    id: EntryID;
    type: EntryType;
    fields: Array<EntryFacadeField>;
    parentID: GroupID;
    _history: Array<EntryLegacyHistoryItem>;
    _changes: Array<EntryChange>;
}

export interface EntryFacadeField {
    id: string;
    title: string;
    propertyType: EntryPropertyType;
    property: string;
    value: string;
    valueType: EntryPropertyValueType | null;
    formatting: EntryFacadeFieldFormatting | boolean;
    removeable: boolean;
}

export interface EntryFacadeFieldFormattingSegment {
    char?: RegExp | string; // A character to match with a regular expression
    repeat?: number; // Number of times to repeat the character match (required for `char`)
    exactly?: string; // The exact character match (operates in opposition to `char`)
}

export interface EntryFacadeFieldFormatting {
    format?: Array<EntryFacadeFieldFormattingSegment>;
    placeholder?: string;
    options?: { [key: string]: string } | Array<string>;
    defaultOption?: string;
}

export interface EntryLegacyHistoryItem {
    property: string;
    propertyType: EntryPropertyType;
    originalValue: string | null;
    newValue: string | null;
}

export type EntryID = string;

export enum EntryPropertyType {
    Attribute = "attribute",
    Property = "property"
}

export enum EntryPropertyValueType {
    Note = "note",
    OTP = "otp",
    Password = "password",
    Text = "text"
}

export enum EntryType {
    CreditCard = "credit_card",
    Login = "login",
    Note = "note",
    SSHKey = "ssh_key",
    Website = "website"
}

export enum ErrorCode {
    NoManagementPermission = "perm:no-mgmt",
    NoWritePermission = "perm:no-write"
}

export interface FormatAEntry {
    id: EntryID;
    attributes?: PropertyKeyValueObject;
    properties?: PropertyKeyValueObject;
    parentID: GroupID;
    history?: Array<EntryLegacyHistoryItem>;
}

export interface FormatAGroup {
    id: GroupID;
    attributes?: PropertyKeyValueObject;
    groups?: Array<FormatAGroup>;
    entries?: Array<FormatAEntry>;
    title: string;
    parentID: GroupID;
}

export interface FormatAVault {
    id: VaultID;
    attributes?: PropertyKeyValueObject;
    groups: Array<FormatAGroup>;
    format?: string;
}

export interface FormatBEntry {
    id: EntryID;
    g: GroupID;
    d?: UTCTimestamp;
    a: FormatBKeyValueObject;
    p: FormatBKeyValueObject;
    s?: ShareID;
}

export interface FormatBGroup {
    id: GroupID;
    a: FormatBKeyValueObject;
    d?: UTCTimestamp;
    t: string;
    g: GroupID;
    s?: ShareID;
}

export interface FormatBKeyValueObject {
    [key: string]: FormatBValue;
}

export interface FormatBShare {
    id: ShareID;
    upd: string;
    k: string;
    p: Array<SharePermission>;
}

export interface FormatBValue {
    value: string;
    created: UTCTimestamp;
    updated: UTCTimestamp;
    deleted?: UTCTimestamp;
    history: Array<FormatBValueHistoryItem>;
}

export interface FormatBValueHistoryItem {
    value: string;
    updated: UTCTimestamp;
}

export interface FormatBVault {
    id: VaultID;
    a: FormatBKeyValueObject;
    g: Array<FormatBGroup>;
    e: Array<FormatBEntry>;
    c: DateString;
    s: Array<FormatBShare>;
}

export interface GroupFacade {
    id: GroupID | null;
    type: "group";
    title: string;
    attributes: { [key: string]: string };
    parentID: GroupID;
}

export type GroupID = string;

export interface History extends Array<string> {
    format?: VaultFormatID;
}

export interface IncomingShare {
    id: ShareID;
    format: VaultFormatID;
    key: string;
    update: string;
    permissions: Array<SharePermission>;
    groups: Array<FormatBGroup>;
    entries: Array<FormatBEntry>;
}

export interface MemoryStore {
    attachments?: Object;
    vault?: EncryptedContent;
}

export interface OutgoingShare {
    id: ShareID;
    format: VaultFormatID;
    key: string;
    update: string;
    groups: Array<FormatBGroup>;
    entries: Array<FormatBEntry>;
}

export interface PropertyKeyValueObject {
    [key: string]: string;
}

export type SetTimeout = ReturnType<typeof setTimeout>;

export type ShareID = string;

export enum SharePermission {
    Manage = "m",
    Read = "r",
    Write = "w"
}

export type UTCTimestamp = number;

export interface VaultFacade {
    id: VaultID;
    type: "vault";
    attributes: { [key: string]: string };
    groups: Array<GroupFacade>;
    entries: Array<EntryFacade>;
    _tag: string;
    _ver: number;
}

export enum VaultFormatID {
    A = "a",
    B = "b"
}

export type VaultID = string;

export type VaultSourceID = string;

export enum VaultSourceStatus {
    Locked = "locked",
    Pending = "pending",
    Unlocked = "unlocked"
}

export interface VaultInsights {
    avgPassLen: number; // Average password length
    duplicatePasswords: number; // Number of duplicate passwords
    entries: number; // Number of entries in the vault
    groups: number; // Number of groups in the vault
    longPassLen: number; // Longest password length
    shortPassLen: number; // Shortest password length
    trashEntries: number; // Number of entries in trash
    trashGroups: number; // Number of groups in trash
    usernames: number; // Number of usernames in the vault
    weakPasswords: number; // Number of detected weak passwords
}
