export interface AttachmentDetails {
    id: string;
    vaultID: VaultID;
    name: string;
    filename: string;
    size: number;
    mime: string | null;
}

export type BufferLike = Buffer | ArrayBuffer;

export interface CredentialsData {
    datasource?: CredentialsDatasourceConfiguration;
    [key: string]: any;
}

export interface CredentialsDatasourceConfiguration {
    type: string;
    accessToken?: string;
    clientID?: string;
    clientSecret?: string;
    content?: string;
    endpoint?: string;
    fileID?: string;
    password?: string;
    path?: string;
    property?: string;
    refreshToken?: string;
    token?: string;
    username?: string;
    vaultID?: number;
}

export interface DatasourceLoadedData {
    Format: any,
    history: History
}

export type EncryptedContent = string;

export interface EntryFacade {
    id: EntryID;
    type: EntryType;
    fields: Array<EntryFacadeField>;
    parentID: GroupID;
    _history: Array<EntryHistoryItem>;
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
    repeat?: number;        // Number of times to repeat the character match (required for `char`)
    exactly?: string;       // The exact character match (operates in opposition to `char`)
}

export interface EntryFacadeFieldFormatting {
    format?: Array<EntryFacadeFieldFormattingSegment>;
    placeholder?: string;
    options?: { [key: string]: string } | Array<string>;
    defaultOption?: string;
}

export interface EntryHistoryItem {
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

export interface FormatAEntry {
    id: EntryID;
    attributes?: PropertyKeyValueObject;
    properties?: PropertyKeyValueObject;
    parentID: GroupID;
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
}

export interface FormatBEntry {
    id: EntryID;
    g: GroupID;
    a: PropertyKeyValueObject;
    p: PropertyKeyValueObject;
}

export interface FormatBGroup {
    id: GroupID;
    a: PropertyKeyValueObject;
    t: string;
    g: GroupID;
}

export interface FormatBVault {
    id: VaultID;
    a: PropertyKeyValueObject;
    g: Array<FormatBGroup>;
    e: Array<FormatBEntry>;
}

export interface GroupFacade {
    id: GroupID | null;
    type: "group";
    title: string;
    attributes: { [key: string]: string };
    parentID: GroupID;
}

export type GroupID = string;

export type History = Array<string>;

export interface MemoryStore {
    attachments?: Object;
    vault?: EncryptedContent;
}

export interface PropertyKeyValueObject {
    [key: string]: string;
}

export type SetTimeout = ReturnType<typeof setTimeout>;

/**
 * @typedef {Object} VaultFacade
 * @property {String} type - The facade type: "vault"
 * @property {String} id - The vault ID
 * @property {Object} attributes - A key/value list of all the vault attributes
 * @property {Array.<GroupFacade>} groups - An array of group facades
 * @property {Array.<EntryFacade>} entries - An array of entry facades
 * @property {String} _tag - The UUID tag for the generation of the facade
 */

export interface VaultFacade {
    id: VaultID;
    type: "vault";
    attributes: { [key: string]: string };
    groups: Array<GroupFacade>;
    entries: Array<EntryFacade>;
    _tag: string;
    _ver: number;
}

export type VaultID = string;

export type VaultSourceID = string;

export enum VaultSourceStatus {
    Locked = "locked",
    Pending = "pending",
    Unlocked = "unlocked"
};

 export interface VaultInsights {
    avgPassLen: number;         // Average password length
    duplicatePasswords: number; // Number of duplicate passwords
    entries: number;            // Number of entries in the vault
    groups: number;             // Number of groups in the vault
    longPassLen: number;        // Longest password length
    shortPassLen: number;       // Shortest password length
    trashEntries: number;       // Number of entries in trash
    trashGroups: number;        // Number of groups in trash
    usernames: number;          // Number of usernames in the vault
    weakPasswords: number;      // Number of detected weak passwords
 }
