const Inigo = require("./InigoGenerator.js");
const Entry = require("./Entry.js");
const encoding = require("./tools/encoding.js");
const searching = require("./tools/searching-raw.js");
const sharing = require("./tools/sharing.js");
const GroupCollectionDecorator = require("./decorators/GroupCollection.js");
const EntryCollectionDecorator = require("./decorators/EntryCollection.js");

/**
 * Buttercup Group
 * @class Group
 * @mixes GroupCollection
 * @mixes EntryCollection
 */
class Group {
    /**
     * Managed group class
     * @param {Archive} archive The archive instance
     * @param {Object} remoteObj The remote object reference
     * @constructor
     */
    constructor(archive, remoteObj) {
        this._archive = archive;
        this._westley = archive._getWestley();
        this._remoteObject = remoteObj;
        // add group searching
        GroupCollectionDecorator.decorate(this);
        // add entry searching
        EntryCollectionDecorator.decorate(this);
    }

    /**
     * The entry ID
     * @type {String}
     * @memberof Group
     */
    get id() {
        return this._getRemoteObject().id;
    }

    /**
     * Get the instance type
     * @type {String}
     * @readonly
     */
    get type() {
        return "Group";
    }

    /**
     * Create a new entry with a title
     * @param {String=} title The title of the new entry
     * @returns {Entry} The new entry
     * @memberof Group
     */
    createEntry(title) {
        var entry = Entry.createNew(this._getArchive(), this.id);
        if (title) {
            entry.setProperty("title", title);
        }
        return entry;
    }

    /**
     * Create a child group
     * @param {string=} title Optionally set a title
     * @returns {Group} The new child group
     * @memberof Group
     */
    createGroup(title) {
        var group = Group.createNew(this._getArchive(), this.id);
        if (title) {
            group.setTitle(title);
        }
        return group;
    }

    /**
     * Delete the group
     * If there is a trash group available, the group is moved there. If the group
     * is already in the trash, it is deleted permanently.
     * @memberof Group
     * @param {Boolean=} skipTrash Skip the trash
     * @returns {Boolean} True when deleted, false when moved to trash
     */
    delete(skipTrash = false) {
        if (this.isTrash()) {
            throw new Error("Trash group cannot be deleted");
        }
        var trashGroup = this._getArchive().getTrashGroup(),
            hasTrash = trashGroup !== null,
            inTrash = this.isInTrash();
        if (!inTrash && hasTrash && !skipTrash) {
            // Not in trash, and a trash group exists, so move it there
            this.moveTo(trashGroup);
            return false;
        }
        // No trash or already in trash, so just delete
        this._getWestley().execute(
            Inigo.create(Inigo.Command.DeleteGroup)
                .addArgument(this.id)
                .generateCommand()
        );
        this._getWestley().pad();
        delete this._westley;
        delete this._remoteObject;
        return true;
    }

    /**
     * Delete an attribute
     * @param {string} attr The name of the attribute
     * @returns {Group} Returns self
     * @memberof Group
     */
    deleteAttribute(attr) {
        this._getWestley().execute(
            Inigo.create(Inigo.Command.DeleteGroupAttribute)
                .addArgument(this.id)
                .addArgument(attr)
                .generateCommand()
        );
        this._getWestley().pad();
        return this;
    }

    /**
     * Get an attribute
     * @param {String=} attributeName The name of the attribute. If none provided
     *  the entire attributes object is returned.
     * @returns {String|undefined|Object} Returns the attribute or undefined if not found.
     *  If no attribute name is provided an object containing all attributes is returned.
     * @memberof Group
     */
    getAttribute(attributeName) {
        const attributes = this._getRemoteObject().attributes || {};
        if (typeof attributeName === "undefined") {
            // No property, return entire object
            return Object.assign({}, attributes);
        }
        return attributes.hasOwnProperty(attributeName) ? attributes[attributeName] : undefined;
    }

    /**
     * Get all attributes
     * @returns {Object} Attributes object
     * @memberof Group
     * @deprecated Will be removed in version 3 - use `getAttribute()` instead
     */
    getAttributes() {
        const raw = this._getRemoteObject();
        return Object.assign({}, raw.attributes || {});
    }

    /**
     * Get the entries within the group
     * @returns {Array.<Entry>} An array of entries
     * @memberof Group
     */
    getEntries() {
        var archive = this._getArchive();
        return (this._getRemoteObject().entries || []).map(function(rawEntry) {
            return new Entry(archive, rawEntry);
        });
    }

    /**
     * Get the parent group
     * @returns {Group|null} Returns the parent group instance or null if the parent
     *  is the archive
     * @throws {Error} Throws if no parent could be found (detached)
     * @memberof Group
     */
    getGroup() {
        const archive = this._getArchive();
        const topmostGroupIDs = archive.getGroups().map(function(group) {
            return group.id;
        });
        if (topmostGroupIDs.indexOf(this.id) >= 0) {
            // parent is archive
            return null;
        }
        const parentInfo = searching.findGroupContainingGroupID(archive._getWestley().getDataset(), this.id);
        if (parentInfo) {
            return new Group(archive, parentInfo.group);
        }
        throw new Error("No parent group: group is detacted");
    }

    /**
     * Get the groups within the group
     * @returns {Array.<Group>} An array of child groups
     * @memberof Group
     */
    getGroups() {
        var archive = this._getArchive();
        return (this._getRemoteObject().groups || []).map(function(rawGroup) {
            return new Group(archive, rawGroup);
        });
    }

    /**
     * Get the group title
     * @returns {string} The title of the group
     * @memberof Group
     */
    getTitle() {
        return this._getRemoteObject().title || "";
    }

    /**
     * Check if the group is in the trash
     * @returns {Boolean} Whether or not the group is within the trash group
     */
    isInTrash() {
        const trash = this._getArchive().getTrashGroup();
        if (trash) {
            const thisGroup = trash.findGroupByID(this.id);
            return thisGroup !== null;
        }
        return false;
    }

    /**
     * Check if the group is used for trash
     * @returns {Boolean} Whether or not the group is the trash group
     * @memberof Group
     */
    isTrash() {
        return this.getAttribute(Group.Attributes.Role) === "trash";
    }

    /**
     * Move the group to another group or archive
     * @param {Group|Archive} target The destination Group or Archive instance
     * @returns {Group} Self
     * @memberof Group
     */
    moveTo(target) {
        if (this.isTrash()) {
            throw new Error("Trash group cannot be moved");
        }
        let targetArchive, targetGroupID;
        if (target.type === "Group") {
            // moving to a group
            targetArchive = target._getArchive();
            targetGroupID = target.id;
        } else if (target.type === "Archive") {
            // moving to an archive
            targetArchive = target;
            targetGroupID = "0";
        } else {
            throw new Error(`Unknown remote type: ${target.type}`);
        }
        if (this._getArchive().readOnly) {
            throw new Error("Cannot move group: origin archive is read-only");
        }
        if (targetArchive.readOnly) {
            throw new Error("Cannot move group: target archive is read-only");
        }
        if (this._getArchive().id === targetArchive.id) {
            // target is local, so create commands here
            this._getWestley().execute(
                Inigo.create(Inigo.Command.MoveGroup)
                    .addArgument(this.id)
                    .addArgument(targetGroupID)
                    .generateCommand()
            );
            this._getWestley().pad();
        } else {
            // target is in another archive, so move there
            sharing.moveGroupBetweenArchives(this, target);
        }
        return this;
    }

    /**
     * Set an attribute
     * @param {string} attributeName The name of the attribute
     * @param {string} value The value to set
     * @returns {Group} Returns self
     * @memberof Group
     */
    setAttribute(attributeName, value) {
        this._getWestley().execute(
            Inigo.create(Inigo.Command.SetGroupAttribute)
                .addArgument(this.id)
                .addArgument(attributeName)
                .addArgument(value)
                .generateCommand()
        );
        this._getWestley().pad();
        return this;
    }

    /**
     * Set the group title
     * @param {string} title The title of the group
     * @returns {Group} Returns self
     */
    setTitle(title) {
        this._getWestley().execute(
            Inigo.create(Inigo.Command.SetGroupTitle)
                .addArgument(this.id)
                .addArgument(title)
                .generateCommand()
        );
        this._getWestley().pad();
        return this;
    }

    /**
     * Export group to object
     * @param {Number} outputFlags Bitwise options for outputting entries and child groups
     * @returns {Object} The group, in raw object form
     * @memberof Group
     * @example
     *      // output defaults (entries and sub groups)
     *      group.toObject()
     * @example
     *      // output only entries
     *      group.toObject(Group.OutputFlag.Entries)
     * @example
     *      // output only the group info
     *      group.toObject(Group.OutputFlag.OnlyGroup)
     */
    toObject(outputFlags) {
        outputFlags = outputFlags === undefined ? Group.OutputFlag.Entries | Group.OutputFlag.Groups : outputFlags;
        // @todo use object cloning
        var attributes = {},
            groupAttributes = this._remoteObject.attributes || {};
        for (var attrKey in groupAttributes) {
            if (groupAttributes.hasOwnProperty(attrKey)) {
                attributes[attrKey] = groupAttributes[attrKey];
            }
        }
        const output = {
            id: this.id,
            title: this.getTitle(),
            attributes: attributes
        };
        if (outputFlags & Group.OutputFlag.Entries) {
            output.entries = this.getEntries().map(entry => entry.toObject());
        }
        if (outputFlags & Group.OutputFlag.Groups) {
            output.groups = this.getGroups().map(group => group.toObject(outputFlags));
        }
        return output;
    }

    /**
     * Export the group to a JSON string
     * @param {Number} outputFlags Output configuration flags to pass to `toObject`
     * @returns {string} The group (and entries) in JSON string format
     * @memberof Group
     * @see toObject
     */
    toString(outputFlags) {
        return JSON.stringify(this.toObject(outputFlags));
    }

    /**
     * Get the archive instance reference
     * @protected
     * @returns {Archive} The archive instance
     * @memberof Group
     */
    _getArchive() {
        return this._archive;
    }

    /**
     * Get the remotely-managed object (group)
     * @protected
     * @returns {Object} The object instance for the group
     * @memberof Group
     */
    _getRemoteObject() {
        return this._remoteObject;
    }

    /**
     * Get the delta managing instance for the archive
     * @protected
     * @returns {Westley} The internal Westley object
     * @memberof Group
     */
    _getWestley() {
        return this._westley;
    }
}

/**
 * Group attribute names
 * @memberof Group
 * @name Attributes
 * @enum {String}
 * @static
 */
Group.Attributes = Object.freeze({
    Role: "bc_group_role"
});

/**
 * Bitwise output flags for `toObject` and `toString`
 * @see toObject
 * @see toString
 * @memberof Group
 * @static
 * @name OutputFlag
 * @enum {Number}
 */
Group.OutputFlag = Object.freeze({
    OnlyGroup: 0,
    Entries: 1,
    Groups: 2
});

/**
 * Create a new Group with a delta-manager and parent group ID
 * @static
 * @memberof Group
 * @param {Archive} archive The archive to create the group in
 * @param {string=} parentID The parent group ID (default is root)
 * @returns {Group} A new group
 * @throws {Error} Throws if the target group doesn't exist
 * @throws {Error} Throws if the target group is the trash group,
 *      or if the target group is within the trash group
 */
Group.createNew = function(archive, parentID) {
    parentID = parentID || "0";
    if (parentID !== "0") {
        // check if group is trash/in-trash
        let group = archive.findGroupByID(parentID);
        if (!group) {
            throw new Error(`Failed creating group: no group found for ID: ${parentID}`);
        } else if (group.isTrash() || group.isInTrash()) {
            throw new Error("Failed creating group: cannot create within Trash group");
        }
    }
    // generate unique ID for the new Group
    var id = encoding.getUniqueID(),
        westley = archive._getWestley();
    westley.execute(
        Inigo.create(Inigo.Command.CreateGroup)
            .addArgument(parentID)
            .addArgument(id)
            .generateCommand()
    );
    var group = searching.findGroupByID(westley.getDataset().groups, id);
    return new Group(archive, group);
};

module.exports = Group;
