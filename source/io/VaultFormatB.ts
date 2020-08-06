import VaultFormat from "./VaultFormat";
import { generateUUID } from "../tools/uuid";
import Entry from "../core/Entry";
import Group from "../core/Group";
import {
    EntryHistoryItem,
    EntryID,
    FormatBEntry,
    FormatBGroup,
    FormatBVault,
    GroupID,
    VaultID
} from "../types";

function emptyVault(): FormatBVault {
    return {
        id: null,
        a: {},
        g: [],
        e: []
    };
}

export default class VaultFormatB extends VaultFormat {
    source: FormatBVault;

    constructor(source: FormatBVault = emptyVault()) {
        super(source);
    }

    cloneEntry(entry: FormatBEntry, targetGroupID: GroupID) {}

    cloneGroup(group: FormatBGroup, targetGroupID: GroupID) {
        const newGroup = JSON.parse(JSON.stringify(group)) as FormatBGroup;
        newGroup.id = generateUUID();
        newGroup.g = targetGroupID;
        this.source.g.push(newGroup);
        // clone entries
        const childEntries = this.source.e
            .filter(entry => entry.g === group.id)
            .map(entry => {
                const newEntry = JSON.parse(JSON.stringify(entry));
                newEntry.g = newGroup.id;
                return newEntry;
            });
        this.source.e.push(...childEntries);
        // clone groups
        this.source.g.forEach(childGroup => {
            if (childGroup.g === group.id) {
                this.cloneGroup(
                    childGroup,
                    newGroup.id
                );
            }
        });
    }

    createEntry(groupID: GroupID, entryID: EntryID) {
        const entry: FormatBEntry = {
            id: entryID,
            g: groupID,
            p: {},
            a: {}
        };
        this.source.e.push(entry);
    }

    createGroup(parentID: GroupID, groupID: GroupID) {
        const group: FormatBGroup = {
            id: groupID,
            g: parentID,
            t: "",
            a: {}
        };
        this.source.g.push(group);
    }

    deleteEntry(entryID: EntryID) {
        const ind = this.source.e.findIndex(entry => entry.id === entryID);
        if (ind >= 0) {
            this.source.e.splice(ind, 1);
        }
    }

    deleteEntryAttribute(entryID: EntryID, attribute: string) {
        const entry = this.source.e.find((e: FormatBEntry) => e.id === entryID);
        entry.a[attribute] = undefined;
        delete entry.a[attribute];
    }

    deleteEntryProperty(entryID: EntryID, property: string) {
        const entry = this.source.e.find(e => e.id === entryID);
        entry.p[property] = undefined;
        delete entry.p[property];
    }

    deleteGroup(groupID) {
        const ind = this.source.g.findIndex(group => group.id === groupID);
        if (ind >= 0) {
            this.source.g.splice(ind, 1);
        }
    }

    deleteGroupAttribute(groupID: GroupID, attribute: string) {
        const group = this.source.g.find(g => g.id === groupID);
        group.a[attribute] = undefined;
        delete group.a[attribute];
    }

    deleteVaultAttribute(attribute: string) {
        this.source.a[attribute] = undefined;
        delete this.source.a[attribute];
    }

    execute(commandOrCommands: string | Array<string>) {
        let command: string;
        if (Array.isArray(commandOrCommands)) {
            if (commandOrCommands.length !== 1) {
                throw new Error(
                    `Format-B commands array must contain a single command, received: ${commandOrCommands.length}`
                );
            }
            command = commandOrCommands[0];
        } else {
            command = commandOrCommands;
        }
        this.source = JSON.parse(command);
        this.dirty = true;
        this.emit("commandsExecuted");
    }

    findGroupContainingEntryID(id: EntryID): FormatBGroup {
        const matchingEntry = this.getAllEntries().find(entry => entry.id === id);
        if (matchingEntry) {
            return this.getAllGroups().find(group => group.id === matchingEntry.g) || null;
        }
        return null;
    }

    findGroupContainingGroupID(id: GroupID): FormatBGroup {
        const groups = this.getAllGroups();
        const matchingGroup = groups.find(group => group.id === id);
        if (!matchingGroup) return null;
        return groups.find(group => group.id === matchingGroup.g) || null;
    }

    generateID() {
        this.source.id = generateUUID();
    }

    getAllEntries(): Array<FormatBEntry> {
        return (<FormatBVault>this.source).e;
    }

    getAllGroups(): Array<FormatBGroup> {
        return (<FormatBVault>this.source).g;
    }

    getEntryAttributes(entrySource: FormatBEntry) {
        return entrySource.a;
    }

    getEntryChanges(entrySource: FormatBEntry): Array<EntryHistoryItem> {
        return [];
    }

    getEntryProperties(entrySource: FormatBEntry) {
        return entrySource.p;
    }

    getFormat() {
        return VaultFormatB;
    }

    getGroupAttributes(groupSource: FormatBGroup) {
        return groupSource.a;
    }

    getItemID(itemSource: FormatBGroup | FormatBEntry): GroupID | EntryID {
        return itemSource.id;
    }

    getVaultID(): VaultID {
        return this.source.id;
    }

    initialise() {
        Object.assign(this.source, {
            a: this.source.a || {},
            g: this.source.g || [],
            e: this.source.e || []
        });
        this.generateID();
    }

    moveEntry(entryID: EntryID, groupID: GroupID) {
        const entry = this.source.e.find((e: FormatBEntry) => e.id === entryID);
        entry.g = groupID;
    }

    moveGroup(groupID: GroupID, newParentID: GroupID) {
        const group = this.source.g.find((g: FormatBGroup) => g.id === groupID);
        group.g = newParentID;
    }

    optimise() {}

    setEntryAttribute(entryID: EntryID, attribute: string, value: string) {
        const entry = this.source.e.find((e: FormatBEntry) => e.id === entryID);
        entry.a[attribute] = value;
    }

    setEntryProperty(entryID: EntryID, property:string, value: string) {
        const entry = this.source.e.find((e: FormatBEntry) => e.id === entryID);
        entry.p[property] = value;
    }

    setGroupAttribute(groupID: GroupID, attribute: string, value: string) {
        const group = this.source.g.find((g: FormatBGroup) => g.id === groupID);
        group.a[attribute] = value;
    }

    setGroupTitle(groupID: GroupID, title: string) {
        const group = this.source.g.find((g: FormatBGroup) => g.id === groupID);
        group.t = title;
    }

    setVaultAttribute(key: string, value: string) {
        this.source.a[key] = value;
    }
}
