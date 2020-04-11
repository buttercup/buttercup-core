const uuid = require("uuid/v4");
const { consumeEntryFacade, createEntryFacade } = require("./entry.js");
const Entry = require("../core/Entry.js");

const { FacadeType } = Entry.Attributes;

/**
 * Consume a group facade and apply the differences to a group instance
 * @param {Group} group The group instance to apply to
 * @param {GroupFacade} facade The facade to apply
 * @memberof module:Buttercup
 */
function consumeGroupFacade(group, facade) {
    const { id, title, type, attributes } = facade;
    const existingEntries = group.getEntries();
    const existingAttributes = group.getAttribute();
    if (type !== "group") {
        throw new Error(`Failed consuming group facade: Invalid facade type: ${type}`);
    }
    if (id !== group.id) {
        throw new Error(
            `Failed consuming group facade: Provided facade ID (${id}) does not match target group's ID: ${group.id}`
        );
    }
    if (!title || title.trim().length <= 0) {
        throw new Error("Failed consuming group facade: Title must not be empty");
    }
    if (group.getTitle() !== title) {
        group.setTitle(title);
    }
    // Check attributes
    Object.keys(existingAttributes)
        .filter(attr => !attributes.hasOwnProperty(attr))
        .forEach(attr => {
            // Remove missing
            group.deleteAttribute(attr);
        });
    Object.keys(attributes).forEach(attr => {
        if (!existingAttributes[attr] || existingAttributes[attr] !== attributes[attr]) {
            // Different value
            group.setAttribute(attr, attributes[attr]);
        }
    });
}

/**
 * Consume a vault facade and apply the differences to the vault
 * instance
 * @param {Vault} vault The vault instance to apply to
 * @param {VaultFacade} facade The facade to apply
 * @memberof module:Buttercup
 */
function consumeVaultFacade(vault, facade) {
    if (!vault || (vault && vault.type !== "Vault")) {
        throw new Error("Failed consuming vault facade: First parameter expected to be an Vault instance");
    }
    if (!facade || (facade && facade.type !== "vault")) {
        throw new Error(
            `Failed consuming vault facade: Second parameter expected to be a vault facade, got: ${facade.type}`
        );
    }
    const { id, type, attributes, groups, entries } = facade;
    if (type !== "vault") {
        throw new Error(`Failed consuming vault facade: Invalid facade type: ${type}`);
    }
    if (id !== vault.id) {
        throw new Error(
            `Failed consuming vault facade: Provided facade ID (${id}) does not match target vault ID: ${vault.id}`
        );
    }
    // Create comparison facade
    let { groups: currentGroups, entries: currentEntries, attributes: currentAttributes } = createVaultFacade(vault);
    // Handle group removal
    currentGroups.forEach(currentGroupFacade => {
        const existing = groups.find(group => group.id === currentGroupFacade.id);
        if (!existing) {
            // Removed, so delete
            const targetItem = vault.findGroupByID(currentGroupFacade.id);
            if (targetItem) {
                // Only attempt deleting if it comes back as a result. It's possible
                // that if a parent was deleted, the children were also removed and
                // this call to `findGroupByID` might return nothing..
                targetItem.delete();
            }
        }
    });
    // Update facade properties after groups deletion
    currentGroups = getGroupsFacades(vault);
    // Manage other group operations
    groups.forEach(groupRaw => {
        const groupFacade = Object.assign({}, groupRaw);
        if (groupFacade.id) {
            if (!currentGroups.find(group => group.id === groupFacade.id)) {
                // Group had an ID which is now gone, so it was removed
                return;
            }
            // Handle group move
            const { id: groupID, parentID: groupParentID } = groupFacade;
            const ref = vault.findGroupByID(groupID);
            const refGroup = ref.getParentGroup();
            if ((refGroup === null && groupParentID !== "0") || (refGroup !== null && refGroup.id !== groupParentID)) {
                // Group has different parent, so move
                ref.moveTo(groupParentID === "0" ? vault : vault.findGroupByID(groupParentID));
            }
        } else {
            // Handle group addition
            const targetParent = groupFacade.parentID === "0" ? vault : vault.findGroupByID(groupFacade.parentID);
            const newGroupInst = targetParent.createGroup(groupFacade.title);
            groupFacade.id = newGroupInst.id;
        }
        consumeGroupFacade(vault.findGroupByID(groupFacade.id), groupFacade);
    });
    // Handle entry removal
    currentEntries.forEach(currentEntryFacade => {
        const existing = entries.find(entry => entry.id === currentEntryFacade.id);
        if (!existing) {
            // Removed, so delete
            const entry = vault.findEntryByID(currentEntryFacade.id);
            if (entry) {
                entry.delete();
            }
        }
    });
    // Update facade properties after entries deletion
    currentEntries = getEntriesFacades(vault);
    // Manage other entry operations
    entries.forEach(entryRaw => {
        const entryFacade = Object.assign({}, entryRaw);
        if (entryFacade.id) {
            if (!currentEntries.find(entry => entry.id === entryRaw.id)) {
                // Entry had an ID which is now gone, so it was removed
                return;
            }
            // Handle entry move
            const ref = vault.findEntryByID(entryFacade.id);
            const refGroup = ref.getGroup();
            if (refGroup.id !== entryFacade.parentID) {
                // Entry has different group, so move
                ref.moveToGroup(vault.findGroupByID(entryFacade.parentID));
            }
        } else {
            // Handle entry addition
            const targetGroup = vault.findGroupByID(entryFacade.parentID);
            const newEntry = targetGroup.createEntry();
            entryFacade.id = newEntry.id;
            if (entryFacade.type) {
                newEntry.setAttribute(FacadeType, entryFacade.type);
            }
        }
        const entryToUpdate = vault.findEntryByID(entryFacade.id);
        consumeEntryFacade(entryToUpdate, entryFacade);
    });
    // Check attributes
    Object.keys(currentAttributes)
        .filter(attr => !attributes.hasOwnProperty(attr))
        .forEach(attr => {
            // Remove missing
            vault.deleteAttribute(attr);
        });
    Object.keys(attributes).forEach(attr => {
        if (!currentAttributes[attr] || currentAttributes[attr] !== attributes[attr]) {
            // Different value
            vault.setAttribute(attr, attributes[attr]);
        }
    });
}

/**
 * @typedef {Object} VaultFacade
 * @property {String} type - The facade type: "vault"
 * @property {String} id - The vault ID
 * @property {Object} attributes - A key/value list of all the vault attributes
 * @property {Array.<GroupFacade>} groups - An array of group facades
 * @property {Array.<EntryFacade>} entries - An array of entry facades
 * @property {String} _tag - The UUID tag for the generation of the facade
 */

/**
 * Create a vault facade from an Vault instance
 * @param {Vault} vault A vault instance
 * @returns {VaultFacade} A vault facade
 * @memberof module:Buttercup
 */
function createVaultFacade(vault) {
    return {
        _tag: uuid(),
        type: "vault",
        id: vault.id,
        attributes: vault.getAttribute(),
        groups: getGroupsFacades(vault),
        entries: getEntriesFacades(vault)
    };
}

/**
 * @typedef {Object} GroupFacade
 * @property {String} type - The facade type: "group"
 * @property {String|null} id - The group ID. Will be set to null if
 *  the group is a new one
 * @property {String} title - The group title
 * @property {Object} attributes - A key/value list of group attributes
 * @property {String|null} parentID - The parent group ID. Set to "0" if
 *  it is to be created in the root.
 */

/**
 * Create a group facade from a Group instance
 * @param {Group} group The group instance
 * @param {String=} parentID The parent ID of the group
 * @memberof module:Buttercup
 */
function createGroupFacade(group, parentID = "0") {
    return {
        type: "group",
        id: group ? group.id : null,
        title: group ? group.getTitle() : "",
        attributes: group ? group.getAttribute() : {},
        parentID
    };
}

/**
 * Get all entry facades for a vault
 * @param {Vault} vault A vault instance
 * @returns {Array.<EntryFacade>} An array of entry facades
 */
function getEntriesFacades(vault) {
    return vault.getGroups().reduce((output, group) => [...output, ...getGroupEntriesFacades(group)], []);
}

/**
 * Convert an array of entries into an array of facades
 * @param {Array.<Entry>} entryCollection An array of entries
 * @param {String} groupID The parent group ID
 * @returns {Array.<EntryFacade>} An array of entry facades
 */
function getGroupEntriesFacades(entryCollection, groupID) {
    const facades = entryCollection.getEntries().map(entry => Object.assign({}, createEntryFacade(entry)));
    entryCollection.getGroups().forEach(group => {
        facades.push(...getGroupEntriesFacades(group, group.id));
    });
    return facades;
}

/**
 * Convert an array of groups into an array of facades
 * @param {Array.<Group>} groupCollection An array of groups
 * @param {String=} parentID The parent group ID (defaults to root)
 * @returns {Array.<GroupFacade>} An array of group facades
 */
function getGroupsFacades(groupCollection, parentID = "0") {
    const facades = groupCollection.getGroups().map(group => createGroupFacade(group, parentID));
    groupCollection.getGroups().forEach(group => {
        facades.push(...getGroupsFacades(group, group.id));
    });
    return facades;
}

module.exports = {
    consumeGroupFacade,
    consumeVaultFacade,
    createGroupFacade,
    createVaultFacade
};
