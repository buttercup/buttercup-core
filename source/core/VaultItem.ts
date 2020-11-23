import Vault from "./Vault";
import { VaultPermission } from "../types";

/**
 * Base vault member class (for Entry, Group etc.)
 */
export default class VaultItem {
    _boundUpdateRefs: () => void;

    _permissions: Array<VaultPermission> = [
        VaultPermission.Manage,
        VaultPermission.Read,
        VaultPermission.Write
    ];

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
        return [...this._permissions];
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
    grantPermission(perm: VaultPermission) {
        if (!this.hasPermission(perm)) {
            this._permissions.push(perm);
        }
    }

    /**
     * Check if the member has a permission
     * @param perm The permission to check for
     * @memberof VaultItem
     */
    hasPermission(perm: VaultPermission): boolean {
        return this._permissions.includes(perm);
    }

    /**
     * Revoke all permissions
     * @memberof VaultItem
     */
    revokeAllPermissions() {
        this._permissions = [];
    }

    /**
     * Revoke a single permission
     * @param perm The permission to revoke
     * @memberof VaultItem
     */
    revokePermission(perm: VaultPermission) {
        this._permissions = this._permissions.filter(current => current !== perm);
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
