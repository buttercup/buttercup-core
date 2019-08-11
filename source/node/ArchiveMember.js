const { PERM_MANAGE, PERM_READ, PERM_WRITE } = require("./tools/permissions.js");

/**
 * Base archive member class (for Entry, Group etc.)
 */
class ArchiveMember {
    constructor() {
        this._permissions = [PERM_MANAGE, PERM_READ, PERM_WRITE];
    }

    /**
     * The current granted permissions
     * @type {Array.<String>}
     * @memberof ArchiveMember
     */
    get permissions() {
        return [...this._permissions];
    }

    /**
     * Grant a new permission to the member
     * @param {String} perm The permission to grant
     * @memberof ArchiveMember
     */
    grantPermission(perm) {
        if (!this.hasPermission(perm)) {
            this._permissions.push(perm);
        }
    }

    /**
     * Check if the member has a permission
     * @param {String} perm The permission to check for
     * @returns {Boolean}
     * @memberof ArchiveMember
     */
    hasPermission(perm) {
        return this._permissions.includes(perm);
    }

    /**
     * Revoke all permissions
     * @memberof ArchiveMember
     */
    revokeAllPermissions() {
        this._permissions = [];
    }

    /**
     * Revoke a single permission
     * @param {String} perm The permission to revoke
     * @memberof ArchiveMember
     */
    revokePermission(perm) {
        this._permissions = this._permissions.filter(current => current !== perm);
    }
}

module.exports = ArchiveMember;
