const { getFormat } = require("@buttercup/signing");
const EventEmitter = require("eventemitter3");
const Westley = require("./Westley.js");
const Inigo = require("./Inigo.js");
const Flattener = require("./Flattener.js");
const Group = require("./Group.js");
const Entry = require("./Entry.js");
const GroupCollectionDecorator = require("./decorators/GroupCollection.js");
const EntryCollectionDecorator = require("./decorators/EntryCollection.js");
const encoding = require("./tools/encoding.js");

/**
 * Buttercup Archive
 * @augments EventEmitter
 * @mixes GroupCollection
 * @mixes EntryCollection
 */
class Archive extends EventEmitter {
    constructor() {
        super();
        // create Westley instance
        this._westley = new Westley();
        this._westley.on("commandExecuted", () => {
            this.emit("archiveUpdated");
        });
        // comment created date
        var date = new Date(),
            ts = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        this._getWestley().execute(
            Inigo.create(Inigo.Command.Comment)
                .addArgument("Buttercup archive created (" + ts + ")")
                .generateCommand()
        );
        // set format
        this._getWestley().execute(
            Inigo.create(Inigo.Command.Format)
                .addArgument(getFormat())
                .generateCommand()
        );
        // set ID
        this._generateID();
        // add group searching
        GroupCollectionDecorator.decorate(this);
        // add entry searching
        EntryCollectionDecorator.decorate(this);
    }

    /**
     * The archive ID
     * @type {String}
     * @memberof Archive
     */
    get id() {
        return this._getWestley().dataset.archiveID;
    }

    /**
     * Whether the archive is read only or not
     * @property {Boolean} readOnly
     * @memberof Archive
     * @instance
     * @readonly
     */
    get readOnly() {
        return this._getWestley().readOnly;
    }

    set readOnly(ro) {
        // eslint-disable-line
        throw new Error("readOnly is read-only");
    }

    /**
     * Get the instance type
     * @type {String}
     * @readonly
     */
    get type() {
        return "Archive";
    }

    /**
     * Create a new group
     * @param {string=} title The title for the group
     * @returns {Group} The newly created group
     * @memberof Archive
     */
    createGroup(title) {
        const group = Group.createNew(this);
        if (title) {
            group.setTitle(title);
        }
        return group;
    }

    /**
     * Delete an attribute
     * @param {String} attributeName The name of the attribute to delete
     * @returns {Archive} Self
     */
    deleteAttribute(attributeName) {
        this._getWestley().execute(
            Inigo.create(Inigo.Command.DeleteArchiveAttribute)
                .addArgument(attributeName)
                .generateCommand()
        );
        this._getWestley().pad();
        return this;
    }

    /**
     * Remove all entries and groups from the trash (permanent)
     * @throws {Error} Throws if there is no trash group
     */
    emptyTrash() {
        const trash = this.getTrashGroup();
        if (!trash) {
            throw new Error("No trash group found");
        }
        trash.getGroups().forEach(function(group) {
            group.delete(/* skip trash */ true);
        });
        trash.getEntries().forEach(function(entry) {
            entry.delete(/* skip trash */ true);
        });
    }

    /**
     * Get the value of an attribute
     * @param {String=} attributeName The attribute to get
     * @returns {undefined|String|Object} The value of the attribute or undefined if not
     *  set. Returns an object if no attribute name is given.
     * @memberof Archive
     * @deprecated Will be removed in version 3 - use `getAttribute()` instead
     */
    getAttribute(attributeName) {
        const dataset = this._getWestley().dataset;
        if (!attributeName) {
            return Object.assign({}, dataset.attributes);
        }
        if (dataset.attributes && dataset.attributes.hasOwnProperty(attributeName)) {
            return dataset.attributes[attributeName];
        }
        return undefined;
    }

    /**
     * Get all attributes
     * @returns {Object} Attributes object
     */
    getAttributes() {
        const dataset = this._getWestley().dataset;
        return Object.assign({}, dataset.attributes || {});
    }

    /**
     * Get the archive format
     * @returns {string} The format of the archive
     * @memberof Archive
     */
    getFormat() {
        return this._getWestley().dataset.format;
    }

    /**
     * Get all groups (root) in the archive
     * @returns {Group[]} An array of Groups
     * @memberof Archive
     */
    getGroups() {
        return (this._getWestley().dataset.groups || []).map(rawGroup => new Group(this, rawGroup));
    }

    /**
     * Get the command array (history)
     * Returned object can be quite large.
     * @returns {Array.<String>} The command array
     */
    getHistory() {
        return this._getWestley().history;
    }

    /**
     * Get the trash group
     * @returns {Group|null} The trash group if found, null otherwise
     * @memberof Archive
     */
    getTrashGroup() {
        const groups = this.getGroups();
        for (var i = 0, groupsLen = groups.length; i < groupsLen; i += 1) {
            if (groups[i].isTrash()) {
                return groups[i];
            }
        }
        return null;
    }

    /**
     * Perform archive optimisations
     * @memberof Archive
     * @returns {Archive} Self
     */
    optimise() {
        const flattener = new Flattener(this._getWestley());
        if (flattener.canBeFlattened()) {
            flattener.flatten();
        }
        return this;
    }

    /**
     * Set an attribute on the archive
     * @param {String} attributeName The attribute to set
     * @param {String} value The value to set for the attribute
     * @returns {Archive} Self
     */
    setAttribute(attributeName, value) {
        this._getWestley().execute(
            Inigo.create(Inigo.Command.SetArchiveAttribute)
                .addArgument(attributeName)
                .addArgument(value)
                .generateCommand()
        );
        this._getWestley().pad();
        return this;
    }

    /**
     * Convert the archive to an object
     * @param {Number} groupOutputFlags Bitwise flags for `Group.toObject`
     * @returns {Object} The archive in object form
     * @see Group.toObject
     */
    toObject(groupOutputFlags) {
        return {
            archiveID: this.id,
            format: this.getFormat(),
            attributes: this.getAttributes(),
            groups: this.getGroups().map(group => group.toObject(groupOutputFlags))
        };
    }

    /**
     * Generate an archive ID
     * @protected
     * @memberof Archive
     */
    _generateID() {
        this._getWestley().execute(
            Inigo.create(Inigo.Command.ArchiveID)
                .addArgument(encoding.getUniqueID())
                .generateCommand(),
            false // prepend to history
        );
    }

    /**
     * Get the underlying Westley instance
     * @protected
     * @returns {Westley} The Westley instance
     * @memberof Archive
     */
    _getWestley() {
        return this._westley;
    }
}

/**
 * Create a new archive instance from a list of commands (history)
 * @param {Array.<String>} history The command list
 * @returns {Archive} The archive instance
 * @static
 * @memberof Archive
 */
Archive.createFromHistory = function(history) {
    var archive = new Archive(),
        westley = archive._getWestley();
    westley.initialise();
    history.forEach(westley.execute.bind(westley));
    // clean
    westley.clearDirtyState();
    if (!archive.id) {
        // generate a new ID
        archive._generateID();
    }
    return archive;
};

/**
 * Create an Archive with the default template
 * @returns {Archive} The new archive
 * @memberof Archive
 * @static
 */
Archive.createWithDefaults = function() {
    var archive = new Archive(),
        generalGroup = archive.createGroup("General"),
        trashGroup = archive.createGroup("Trash").setAttribute(Group.Attributes.Role, "trash");
    return archive;
};

module.exports = Archive;
