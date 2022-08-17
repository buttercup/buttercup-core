import EventEmitter from "eventemitter3";
import Credentials from "../credentials/Credentials";
import Vault from "../core/Vault";
import Share from "../core/Share";
import {
    EntryChange,
    EntryID,
    FormatAEntry,
    FormatAGroup,
    FormatAVault,
    FormatBEntry,
    FormatBGroup,
    FormatBShare,
    FormatBVault,
    GroupID,
    History,
    PropertyKeyValueObject,
    ShareID,
    VaultFormatID
} from "../types";

function notImplemented() {
    throw new Error("Not implemented");
}

export default class VaultFormat extends EventEmitter {
    static encodeRaw(rawContent: History, credentials: Credentials) {
        notImplemented();
    }

    static extractSharesFromHistory(history: History) {
        notImplemented();
    }

    static getFormatID(): VaultFormatID {
        notImplemented();
        return null;
    }

    static historiesDiffer(historyA: History, historyB: History): boolean {
        notImplemented();
        return false;
    }

    static isEncrypted(contents: string) {
        notImplemented();
    }

    static parseEncrypted(encryptedContent: string, credentials: Credentials) {
        notImplemented();
    }

    static prepareHistoryForMerge(history: History) {
        notImplemented();
    }

    static vaultFromMergedHistories(local: History, incoming: History): Vault {
        notImplemented();
        return null;
    }

    _readOnly = false;
    dirty = false;
    source: FormatAVault | FormatBVault = null;

    get history() {
        return this.getHistory();
    }

    get readOnly() {
        return this._readOnly;
    }

    constructor(source: FormatAVault | FormatBVault) {
        super();
        this.source = source;
    }

    cloneEntry(entry: FormatAEntry | FormatBEntry, targetGroupID: GroupID) {
        notImplemented();
    }

    cloneGroup(group: FormatAGroup | FormatBGroup, targetGroupID: GroupID) {
        notImplemented();
    }

    createEntry(groupID: GroupID, entryID: EntryID) {
        notImplemented();
    }

    createGroup(parentID: GroupID, groupID: GroupID) {
        notImplemented();
    }

    createShareInstance(share: FormatBShare): Share {
        notImplemented();
        return null;
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

    findEntryByID(id: EntryID): FormatAEntry | FormatBEntry {
        notImplemented();
        return null;
    }

    findGroupByID(id: GroupID): FormatAGroup | FormatBGroup {
        notImplemented();
        return null;
    }

    findGroupContainingEntryID(id: EntryID): FormatAGroup | FormatBGroup {
        notImplemented();
        return null;
    }

    findGroupContainingGroupID(id: GroupID): FormatAGroup | FormatBGroup {
        notImplemented();
        return null;
    }

    generateID() {
        notImplemented();
    }

    getAllEntries(parentID: GroupID = null): Array<FormatAEntry | FormatBEntry> {
        notImplemented();
        return [];
    }

    getAllGroups(parentID: GroupID = null): Array<FormatAGroup | FormatBGroup> {
        notImplemented();
        return [];
    }

    getAllShares(): Array<FormatBShare> {
        notImplemented();
        return [];
    }

    getEntryAttributes(entrySource: FormatAEntry | FormatBEntry): PropertyKeyValueObject {
        notImplemented();
        return {};
    }

    getEntryChanges(entrySource: FormatAEntry | FormatBEntry): Array<EntryChange> {
        notImplemented();
        return [];
    }

    getEntryProperties(entrySource: FormatAEntry | FormatBEntry): PropertyKeyValueObject {
        notImplemented();
        return {};
    }

    getFormat(): any {
        return VaultFormat;
    }

    getGroupAttributes(groupSource: FormatAGroup | FormatBGroup): PropertyKeyValueObject {
        notImplemented();
        return {};
    }

    getGroupTitle(groupSource: FormatAGroup | FormatBGroup): string {
        notImplemented();
        return "";
    }

    getHistory(): History {
        notImplemented();
        return [];
    }

    getItemID(itemSource: FormatAGroup | FormatAEntry | FormatBGroup | FormatBEntry): GroupID | EntryID {
        notImplemented();
        return "";
    }

    getItemParentID(itemSource: FormatAGroup | FormatAEntry | FormatBGroup | FormatBEntry): GroupID | "0" {
        notImplemented();
        return "";
    }

    getItemShareID(itemSource: FormatBGroup | FormatBEntry): ShareID | null {
        notImplemented();
        return null;
    }

    getShareID(itemSource: FormatBShare): ShareID {
        notImplemented();
        return "";
    }

    getVaultAttributes() {
        notImplemented();
        return {};
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

    supportsShares(): boolean {
        notImplemented();
        return false;
    }
}
