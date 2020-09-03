import Vault from "./Vault";
import { VaultPermission } from "../types";

/**
 * Base vault member class (for Entry, Group etc.)
 */
export default class VaultItem {
    _boundUpdateRefs: () => void;

    _source: any;

    /**
     * Reference to the containing vault
     * @protected
     * @memberof VaultItem
     */
    _vault: Vault = null;

    /**
     * Constructor for the vault member base class
     * @param {Vault} vault Vault reference
     * @param {Object} source Remote source object reference
     */
    constructor(vault: Vault, source: any) {
        this._vault = vault;
        this._source = source;
        this._source.permissions = this._source.permissions || [
            VaultPermission.Manage,
            VaultPermission.Read,
            VaultPermission.Write
        ];
    }

    /**
     * The ID of the entry or group
     * @readonly
     * @memberof VaultItem
     */
    get id(): string {
        return this._vault.format.getItemID(this._source);
    }

    /**
     * The current granted permissions
     * @memberof VaultItem
     */
    get permissions(): Array<string> {
        return [...this._source.permissions];
    }

    /**
     * The vault this item belongs to
     * @readonly
     * @memberof VaultItem
     */
    get vault(): Vault {
        return this._vault;
    }

    /**
     * Grant a new permission to the member
     * @param perm The permission to grant
     * @memberof VaultItem
     */
    grantPermission(perm: string) {
        if (!this.hasPermission(perm)) {
            this._source.permissions.push(perm);
        }
    }

    /**
     * Check if the member has a permission
     * @param perm The permission to check for
     * @memberof VaultItem
     */
    hasPermission(perm: string): boolean {
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
     * @param perm The permission to revoke
     * @memberof VaultItem
     */
    revokePermission(perm: string) {
        this._source.permissions = this._source.permissions.filter(current => current !== perm);
    }

    /**
     * Clean up all of the data in the vault item
     * @protected
     * @memberof VaultItem
     */
    _cleanUp() {
        this._vault = null;
        this._source = null;
    }

    /**
     * Update source references
     * @protected
     * @memberof VaultItem
     */
    _updateRefs() {
        // No-op for vault item
    }
}
