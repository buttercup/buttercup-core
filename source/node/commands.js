const {
    findEntryByID,
    findGroupByID,
    findGroupContainingEntryID,
    findGroupContainingGroupID
} = require("./tools/rawVaultSearch.js");
const { encodeStringValue } = require("./tools/encoding.js");
const { generateEntryHistoryItem } = require("./tools/history.js");

function executeArchiveID(archive, opts, id) {
    if (opts.shareID) {
        // Don't set archive ID from a share
        return;
    }
    if (archive.archiveID) {
        // ID already set
        throw new Error("ID already set");
    }
    archive.archiveID = id;
}

function executeComment() {
    // Comment has no action
}

function executeCreateEntry(archive, opts, groupID, entryID) {
    archive.groups = archive.groups || [];
    const entry = {
        id: entryID,
        properties: {
            title: ""
        },
        shareID: opts.shareID
    };
    if (opts.permissions) {
        entry.permissions = opts.permissions;
    }
    const group = findGroupByID(archive.groups, groupID);
    if (!group) {
        throw new Error(`Invalid group ID: ${groupID}`);
    }
    group.entries = group.entries || [];
    group.entries.push(entry);
}

function executeCreateGroup(archive, opts, parentID, newID) {
    archive.groups = archive.groups || [];
    const group = {
        id: newID,
        title: "New group",
        shareID: opts.shareID
    };
    if (opts.permissions) {
        group.permissions = opts.permissions;
    }
    if (parentID === "0") {
        archive.groups.push(group);
    } else {
        const parentGroup = findGroupByID(archive.groups, parentID);
        if (!parentGroup) {
            throw new Error(`Invalid parent group ID: ${parentID}`);
        }
        parentGroup.groups = parentGroup.groups || [];
        parentGroup.groups.push(group);
    }
}

function executeDeleteArchiveAttribute(archive, opts, attribute) {
    const attributes = archive.attributes || {};
    if (attributes.hasOwnProperty(attribute) !== true) {
        throw new Error(`Vault contains no such attribute: ${attribute}`);
    }
    const deleted = delete attributes[attribute];
    if (!deleted) {
        throw new Error(`Failed deleting attribute: ${attribute}`);
    }
}

function executeDeleteEntry(archive, opts, entryID) {
    archive.groups = archive.groups || [];
    const { group, index } = findGroupContainingEntryID(archive.groups, entryID);
    if (!group) {
        throw new Error(`Failed deleting entry: Invalid entry ID: ${entryID}`);
    }
    group.entries.splice(index, 1);
}

function executeDeleteEntryAttribute(archive, opts, entryID, attribute) {
    archive.groups = archive.groups || [];
    const entry = findEntryByID(archive.groups, entryID);
    if (!entry) {
        throw new Error("Entry not found for ID");
    }
    entry.attributes = entry.attributes || {};
    const value = entry.attributes[attribute];
    const deleted = delete entry.attributes[attribute];
    if (!deleted) {
        throw new Error("Failed deleting attribute");
    }
    entry.history = entry.history || [];
    entry.history.push(generateEntryHistoryItem(attribute, "attribute", value, null));
}

function executeDeleteEntryProperty(archive, opts, entryID, property) {
    archive.groups = archive.groups || [];
    const entry = findEntryByID(archive.groups, entryID);
    if (!entry) {
        throw new Error(`Entry not found for ID: ${entryID}`);
    }
    entry.properties = entry.properties || {};
    const value = entry.properties[property];
    const deleted = delete entry.properties[property];
    if (!deleted) {
        throw new Error(`Failed deleting property: ${property}`);
    }
    entry.history = entry.history || [];
    entry.history.push(generateEntryHistoryItem(property, "property", value, null));
}

function executeDeleteGroup(archive, opts, groupID) {
    archive.groups = archive.groups || [];
    const { group, index } = findGroupContainingGroupID(archive, groupID);
    if (!group) {
        throw new Error(`Invalid group ID: ${groupID}`);
    }
    group.groups.splice(index, 1);
}

function executeDeleteGroupAttribute(archive, opts, groupID, attribute) {
    archive.groups = archive.groups || [];
    const group = findGroupByID(archive.groups, groupID);
    if (!group) {
        throw new Error(`Group not found for ID: ${groupID}`);
    }
    group.attributes = group.attributes || {};
    const deleted = delete group.attributes[attribute];
    if (!deleted) {
        throw new Error(`Failed deleting attribute: ${attribute}`);
    }
}

function executeFormat(archive, opts, format) {
    if (opts.shareID) {
        // Don't set archive format from a share
        return;
    }
    if (archive.format) {
        throw new Error("Format already set");
    }
    archive.format = format;
}

function executeMoveEntry(archive, opts, entryID, groupID) {
    archive.groups = archive.groups || [];
    const { group: originGroup, index: originIndex } = findGroupContainingEntryID(archive.groups, entryID);
    if (!originGroup) {
        throw new Error(`Invalid entry ID: ${entryID}`);
    }
    const targetGroup = findGroupByID(archive.groups, groupID);
    if (!targetGroup) {
        throw new Error("Invalid group ID");
    }
    const [movedEntry] = originGroup.entries.splice(originIndex, 1);
    targetGroup.entries = targetGroup.entries || [];
    targetGroup.entries.push(movedEntry);
}

function executeMoveGroup(archive, opts, groupID, targetGroupID) {
    archive.groups = archive.groups || [];
    const { group: originGroup, index: originIndex } = findGroupContainingGroupID(archive, groupID);
    if (!originGroup) {
        throw new Error(`Invalid group ID: ${groupID}`);
    }
    const targetGroup =
        targetGroupID.length === 1 && parseInt(targetGroupID, 10) === 0
            ? archive
            : findGroupByID(archive.groups, targetGroupID);
    if (!targetGroup) {
        throw new Error(`Invalid target group ID: ${targetGroupID}`);
    }
    const [movedGroup] = originGroup.groups.splice(originIndex, 1);
    targetGroup.groups = targetGroup.groups || [];
    targetGroup.groups.push(movedGroup);
}

function executePad() {
    // Comment has no action
}

function executeSetArchiveAttribute(archive, opts, attribute, value) {
    archive.attributes = archive.attributes || {};
    archive.attributes[attribute] = value;
}

function executeSetEntryAttribute(archive, opts, entryID, attribute, value) {
    archive.groups = archive.groups || [];
    const entry = findEntryByID(archive.groups, entryID);
    if (!entry) {
        throw new Error(`Entry not found for ID: ${entryID}`);
    }
    entry.attributes = entry.attributes || {};
    const previousValue = typeof entry.attributes[attribute] === "string" ? entry.attributes[attribute] : null;
    entry.attributes[attribute] = value;
    entry.history = entry.history || [];
    entry.history.push(generateEntryHistoryItem(attribute, "attribute", previousValue, value));
}

function executeSetEntryProperty(archive, opts, entryID, property, value) {
    archive.groups = archive.groups || [];
    const entry = findEntryByID(archive.groups, entryID);
    if (!entry) {
        throw new Error(`Entry not found for ID: ${entryID}`);
    }
    entry.properties = entry.properties || {};
    const previousValue = typeof entry.properties[property] === "string" ? entry.properties[property] : null;
    entry.properties[property] = value;
    entry.history = entry.history || [];
    entry.history.push(generateEntryHistoryItem(property, "property", previousValue, value));
}

function executeSetGroupAttribute(archive, opts, groupID, attribute, value) {
    archive.groups = archive.groups || [];
    const group = findGroupByID(archive.groups, groupID);
    if (!group) {
        throw new Error(`Group not found for ID: ${groupID}`);
    }
    group.attributes = group.attributes || {};
    group.attributes[attribute] = value;
}

function executeTitleGroup(archive, opts, groupID, title) {
    archive.groups = archive.groups || [];
    const group = findGroupByID(archive.groups, groupID);
    if (!group) {
        throw new Error(`Group not found for ID: ${groupID}`);
    }
    group.title = title;
}

module.exports = {
    executeArchiveID,
    executeComment,
    executeCreateEntry,
    executeCreateGroup,
    executeDeleteArchiveAttribute,
    executeDeleteEntry,
    executeDeleteEntryAttribute,
    executeDeleteEntryProperty,
    executeDeleteGroup,
    executeDeleteGroupAttribute,
    executeFormat,
    executeMoveEntry,
    executeMoveGroup,
    executePad,
    executeSetArchiveAttribute,
    executeSetEntryAttribute,
    executeSetEntryProperty,
    executeSetGroupAttribute,
    executeTitleGroup
};
