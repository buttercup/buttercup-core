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

export type EntryID = string;

export interface FormatAEntry {
    id: EntryID;
    attributes?: Object;
    properties?: Object;
}

export interface FormatAGroup {
    id: GroupID;
    attributes?: Object;
    groups?: Array<FormatAGroup>;
    entries?: Array<FormatAEntry>;
}

export interface FormatAVault {
    id: VaultID;
    attributes?: Object;
    groups: Array<FormatAGroup>;
}

export interface FormatBEntry {
    id: EntryID;
    g: GroupID;
    a: Object;
    p: Object;
}

export interface FormatBGroup {
    id: GroupID;
    a: Object;
    t: string;
    g: GroupID
}

export interface FormatBVault {
    id: VaultID;
    a: Object;
    g: Array<FormatBGroup>;
    e: Array<FormatBEntry>;
}

export type GroupID = string;

export type History = Array<string>;

export interface MemoryStore {
    attachments?: Object;
    vault?: EncryptedContent;
}

export type VaultID = string;

 export interface VaultInsights {
    avgPassLen: number;     // Average password length
    entries: number;        // Number of entries in the vault
    groups: number;         // Number of groups in the vault
    longPassLen: number;    // Longest password length
    shortPassLen: number;   // Shortest password length
    trashEntries: number;   // Number of entries in trash
    trashGroups: number;    // Number of groups in trash
 }
