const { PERM_MANAGE, PERM_READ, PERM_WRITE } = require("../tools/permissions.js");

/**
 * Base vault member class (for Entry, Group etc.)
 */
class VaultItem {
    _vault = null;

    /**
     * Constructor for the vault member base class
     * @param {Vault} vault Vault reference
     * @param {Object} source Remote source object reference
     */
    constructor(vault, source) {
        this._vault = vault;
        this._source = source;
        this._source.permissions = this._source.permissions || [PERM_MANAGE, PERM_READ, PERM_WRITE];
    }

    /**
     * The ID of the entry or group
     * @readonly
     * @type {String}
     * @memberof VaultItem
     */
    get id() {
        return this._source.id;
    }

    /**
     * The vault this item belongs to
     * @readonly
     * @type {Vault}
     * @memberof VaultItem
     */
    get vault() {
        return this._vault;
    }

    /**
     * The current granted permissions
     * @type {Array.<String>}
     * @memberof VaultItem
     */
    get permissions() {
        return [...this._source.permissions];
    }

    /**
     * Grant a new permission to the member
     * @param {String} perm The permission to grant
     * @memberof VaultItem
     */
    grantPermission(perm) {
        if (!this.hasPermission(perm)) {
            this._source.permissions.push(perm);
        }
    }

    /**
     * Check if the member has a permission
     * @param {String} perm The permission to check for
     * @returns {Boolean}
     * @memberof VaultItem
     */
    hasPermission(perm) {
        return this._source.permissions.includes(perm);
    }

    /**
     * Revoke all permissions
     * @memberof VaultItem
     */
    revokeAllPermissions() {
        this._source.permissions = [];
    }

    /**
     * Revoke a single permission
     * @param {String} perm The permission to revoke
     * @memberof VaultItem
     */
    revokePermission(perm) {
        this._source.permissions = this._source.permissions.filter(current => current !== perm);
    }

    _cleanUp() {
        this._vault = null;
        this._source = null;
    }
}

module.exports = VaultItem;
