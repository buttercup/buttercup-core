const VaultFormat = require("./VaultFormat.js");
const { generateUUID } = require("../tools/uuid.js");

class VaultFormatB extends VaultFormat {
    cloneEntry(entry, targetGroupID) {}

    cloneGroup(group, targetGroupID) {
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

    createEntry(groupID, entryID) {
        const entry = {
            id: entryID,
            g: groupID,
            p: {},
            a: {}
        };
        this.source.e.push(entry);
    }

    createGroup(parentID, groupID) {
        const group = {
            id: groupID,
            g: parentID,
            t: "",
            a: {}
        };
        this.g.push(group);
    }

    deleteEntry(entryID) {
        const ind = this.e.findIndex(entry => entry.id === entryID);
        if (ind >= 0) {
            this.e.splice(ind, 1);
        }
    }

    deleteEntryAttribute(entryID, attribute) {
        const entry = this.e.find(e => e.id === entryID);
        entry.a[attribute] = undefined;
        delete entry.a[attribute];
    }

    deleteEntryProperty(entryID, property) {
        const entry = this.e.find(e => e.id === entryID);
        entry.p[property] = undefined;
        delete entry.p[property];
    }

    deleteGroup(groupID) {
        const ind = this.g.findIndex(group => group.id === groupID);
        if (ind >= 0) {
            this.g.splice(ind, 1);
        }
    }

    deleteGroupAttribute(groupID, attribute) {
        const group = this.g.find(g => g.id === groupID);
        group.a[attribute] = undefined;
        delete group.a[attribute];
    }

    deleteVaultAttribute(attribute) {
        this.a[attribute] = undefined;
        delete this.a[attribute];
    }

    execute(commandOrCommands) {
        let command;
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

    getFormat() {
        return VaultFormatB;
    }

    initialise() {
        Object.assign(this.source, {
            a: this.source.a || {},
            g: this.source.g || [],
            e: this.source.e || []
        });
        this.generateID();
    }

    moveEntry(entryID, groupID) {
        const entry = this.e.find(e => e.id === entryID);
        e.g = groupID;
    }

    moveGroup(groupID, newParentID) {
        const group = this.g.find(g => g.id === groupID);
        g.g = newParentID;
    }

    optimise() {}

    setEntryAttribute(entryID, attribute, value) {
        const entry = this.e.find(e => e.id === entryID);
        entry.a[attribute] = value;
    }

    setEntryProperty(entryID, property, value) {
        const entry = this.e.find(e => e.id === entryID);
        entry.p[property] = value;
    }

    setGroupAttribute(groupID, attribute, value) {
        const group = this.g.find(g => g.id === groupID);
        group.a[attribute] = value;
    }

    setGroupTitle(groupID, title) {
        const group = this.g.find(g => g.id === groupID);
        group.t = title;
    }

    setVaultAttribute(key, value) {
        this.a[key] = value;
    }
}

module.exports = VaultFormatB;
