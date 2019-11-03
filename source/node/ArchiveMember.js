const { PERM_MANAGE, PERM_READ, PERM_WRITE } = require("./tools/permissions.js");

/**
 * Base archive member class (for Entry, Group etc.)
 */
class ArchiveMember {
    /**
     * Constructor for the archive member base class
     * @param {Archive} archive Archive reference
     * @param {Object} remoteObj Remote datasource reference
     */
    constructor(archive, remoteObj) {
        this._archive = archive;
        this._remoteObject = remoteObj;
        this._westley = archive._getWestley();
        remoteObj.permissions = remoteObj.permissions || [PERM_MANAGE, PERM_READ, PERM_WRITE];
    }

    /**
     * The ID of the entry
     * @readonly
     * @type {String}
     * @memberof ArchiveMember
     */
    get id() {
        return this._getRemoteObject().id;
    }

    /**
     * The current granted permissions
     * @type {Array.<String>}
     * @memberof ArchiveMember
     */
    get permissions() {
        return [...this._getRemoteObject().permissions];
    }

    /**
     * Grant a new permission to the member
     * @param {String} perm The permission to grant
     * @memberof ArchiveMember
     */
    grantPermission(perm) {
        if (!this.hasPermission(perm)) {
            this._getRemoteObject().permissions.push(perm);
        }
    }

    /**
     * Check if the member has a permission
     * @param {String} perm The permission to check for
     * @returns {Boolean}
     * @memberof ArchiveMember
     */
    hasPermission(perm) {
        return this._getRemoteObject().permissions.includes(perm);
    }

    /**
     * Revoke all permissions
     * @memberof ArchiveMember
     */
    revokeAllPermissions() {
        this._getRemoteObject().permissions = [];
    }

    /**
     * Revoke a single permission
     * @param {String} perm The permission to revoke
     * @memberof ArchiveMember
     */
    revokePermission(perm) {
        const remoteObj = this._getRemoteObject();
        remoteObj.permissions = remoteObj.filter(current => current !== perm);
    }

    /**
     * Get the archive reference
     * @returns {Archive} The Archive reference
     * @memberof ArchiveMember
     * @protected
     */
    _getArchive() {
        return this._archive;
    }

    /**
     * Get the remote object that mirrors the data represented here
     * @returns {Object} The remote object (in-memory copy)
     * @memberof ArchiveMember
     * @protected
     */
    _getRemoteObject() {
        return this._remoteObject;
    }

    /**
     * Get the Westley reference
     * @returns {Westley} The internal Westley reference
     * @memberof ArchiveMember
     * @protected
     */
    _getWestley() {
        return this._westley;
    }
}

module.exports = ArchiveMember;
