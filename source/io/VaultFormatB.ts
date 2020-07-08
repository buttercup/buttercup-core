import VaultFormat from "./VaultFormat";
import { generateUUID } from "../tools/uuid";
import Entry from "../core/Entry";
import Group from "../core/Group";
import {
    EntryID,
    FormatBEntry,
    FormatBGroup,
    FormatBVault,
    GroupID,
    VaultID
} from "../types";

export default class VaultFormatB extends VaultFormat {
    cloneEntry(entry: Entry, targetGroupID: GroupID) {}

    cloneGroup(group: Group, targetGroupID: GroupID) {
        const newGroup = JSON.parse(JSON.stringify(group._source));
        newGroup.id = generateUUID();
        newGroup.g = targetGroupID;
        this.source.groups.push(newGroup);
        // clone entries
        const childEntries = this.source.entries
            .filter(entry => entry.g === group._source.id)
            .map(entry => {
                const newEntry = JSON.parse(JSON.stringify(entry));
                newEntry.g = newGroup.id;
            });
        this.source.entries.push(...childEntries);
        // clone groups
        this.source.groups.forEach(childGroup => {
            if (childGroup.g === group._source.id) {
                this.cloneGroup(childGroup, newGroup.id);
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

    generateID() {
        this.source.id = generateUUID();
    }

    getAllGroups() {
        return this.source.g;
    }

    getEntryAttributes(entrySource: FormatBEntry) {
        return entrySource.a;
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
