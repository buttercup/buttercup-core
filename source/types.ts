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

export type VaultID = string;
