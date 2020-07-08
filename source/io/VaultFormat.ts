import EventEmitter from "eventemitter3";
import Credentials from "../credentials/Credentials";
import Entry from "../core/Entry";
import Group from "../core/Group";
import {
    EntryID,
    FormatAEntry,
    FormatAGroup,
    FormatBEntry,
    FormatBGroup,
    GroupID,
    VaultID
} from "../types";

function notImplemented() {
    throw new Error("Not implemented");
}

export default class VaultFormat extends EventEmitter {
    static encodeRaw(rawContent: Array<string>, credentials: Credentials) {
        notImplemented();
    }

    static extractSharesFromHistory(history: Array<string>) {
        notImplemented();
    }

    static isEncrypted(contents: string) {
        notImplemented();
    }

    static parseEncrypted(encryptedContent: string, credentials: Credentials) {
        notImplemented();
    }

    static prepareHistoryForMerge(history: Array<string>) {
        notImplemented();
    }

    dirty = false;
    history = [];
    _readOnly = false;
    source = null;

    get readOnly() {
        return this._readOnly;
    }

    constructor(source = {}) {
        super();
        this.source = source;
    }

    clear() {
        this.history = [];
        if (this.source) {
            for (const key in this.source) {
                delete this.source[key];
            }
        }
    }

    cloneEntry(entry: Entry, targetGroupID: GroupID) {
        notImplemented();
    }

    cloneGroup(group: Group, targetGroupID: GroupID) {
        notImplemented();
    }

    createEntry(groupID: GroupID, entryID: EntryID) {
        notImplemented();
    }

    createGroup(parentID: GroupID, groupID: GroupID) {
        notImplemented();
    }

    deleteEntry(entryID: EntryID) {
        notImplemented();
    }

    deleteEntryAttribute(entryID: EntryID, attribute: string) {
        notImplemented();
    }

    deleteEntryProperty(entryID: EntryID, property: string) {
        notImplemented();
    }

    deleteGroup(groupID: GroupID) {
        notImplemented();
    }

    deleteGroupAttribute(groupID: GroupID, attribute: string) {
        notImplemented();
    }

    deleteVaultAttribute(attribute: string) {
        notImplemented();
    }

    erase() {
        Object.keys(this.source).forEach(sourceKey => {
            this.source[sourceKey] = undefined;
            delete this.source[sourceKey];
        });
        this.history.splice(0, Infinity);
    }

    execute(commandOrCommands: string | Array<string>) {
        notImplemented();
    }

    generateID() {
        notImplemented();
    }

    getAllEntries() {
        notImplemented();
    }

    getAllGroups() {
        notImplemented();
    }

    getEntryAttributes(entrySource: FormatAEntry | FormatBEntry) {
        notImplemented();
    }

    getEntryProperties(entrySource: FormatAEntry | FormatBEntry) {
        notImplemented();
    }

    getFormat(): any {
        return VaultFormat;
    }

    getGroupAttributes(groupSource: FormatAGroup) {
        notImplemented();
    }

    getItemID(itemSource: FormatAGroup | FormatAEntry) {
        notImplemented();
    }

    getVaultID() {
        notImplemented();
    }

    initialise() {
        notImplemented();
    }

    moveEntry(entryID: EntryID, groupID: GroupID) {
        notImplemented();
    }

    moveGroup(groupID: GroupID, newParentID: GroupID) {
        notImplemented();
    }

    optimise() {
        notImplemented();
    }

    setEntryAttribute(entryID: EntryID, attribute: string, value: string) {
        notImplemented();
    }

    setEntryProperty(entryID: EntryID, property: string, value: string) {
        notImplemented();
    }

    setGroupAttribute(groupID: GroupID, attribute: string, value: string) {
        notImplemented();
    }

    setGroupTitle(groupID: GroupID, title: string) {
        notImplemented();
    }

    setVaultAttribute(key: string, value: string) {
        notImplemented();
    }
}
