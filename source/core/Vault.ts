import EventEmitter from "eventemitter3";
import { getDefaultFormat } from "../io/formatRouter";
import { findGroupByID, findGroupsByTitle } from "../search/groups";
import { findEntriesByProperty, findEntryByID } from "../search/entries";
import Group from "./Group";
import Entry from "./Entry";
import VaultItem from "./VaultItem";
import { EntryID, GroupID, History } from "../types";

/**
 * Vault class - Contains Groups and Entrys
 * @augments EventEmitter
 * @memberof module:Buttercup
 */
export default class Vault extends EventEmitter {
    static Attribute = Object.freeze({
        AttachmentsKey: "BC_ATTACHMENTS_KEY"
    });

    /**
     * Create a new archive instance from a list of commands (history)
     * @param history The command list
     * @param format Optional vault format override
     * @returns The vault instance
     * @static
     * @memberof Vault
     */
    static createFromHistory(history: History, format: any = getDefaultFormat()): Vault {
        const vault = new Vault(format);
        vault.format.erase();
        vault.format.execute(history);
        vault.format.dirty = false;
        if (!vault.id) {
            vault.format.generateID();
        }
        return vault;
    }

    /**
     * Create a Vault with the default template
     * @returns The new vault
     * @memberof Vault
     * @static
     */
    static createWithDefaults(): Vault {
        const vault = new Vault();
        vault.createGroup("General");
        vault.createGroup("Trash").setAttribute(Group.Attribute.Role, "trash");
        return vault;
    }

    _format: any;

    /**
     * Collection of child references
     * @protected
     * @memberof Vault
     */
    _vaultItems: Array<VaultItem>;

    /**
     * The vault format
     * @readonly
     * @memberof Vault
     */
    get format(): any {
        return this._format;
    }

    /**
     * The ID of the Vault
     * @readonly
     * @memberof Vault
     */
    get id(): string {
        return this.format.getVaultID();
    }

    /**
     * Whether the Vault is in read-only mode
     *  or not
     * @readonly
     * @memberof Vault
     */
    get readOnly(): boolean {
        return this.format.readOnly;
    }

    /**
     * Create a new Vault instance
     * @param Format Optional vault format specification.
     *  Will use the default system format (recommended) if not
     *  specified.
     */
    constructor(Format: any = getDefaultFormat()) {
        super();
        this._vaultItems = [];
        this._format = new Format();
        this.format.on("commandsExecuted", () => {
            this.emit("vaultUpdated");
        });
        this.format.initialise();
    }

    /**
     * Create a new group
     * @param title The title for the group
     * @returns The newly created group
     * @memberof Vault
     */
    createGroup(title: string): Group {
        const group = Group.createNew(this);
        if (title) {
            group.setTitle(title);
        }
        return group;
    }

    /**
     * Delete an attribute
     * @param attribute The name of the attribute to delete
     * @returns Self
     * @memberof Vault
     */
    deleteAttribute(attribute: string): this {
        this.format.deleteVaultAttribute(attribute);
        return this;
    }

    /**
     * Remove all entries and groups from the trash (permanent)
     * - does nothing if no trash group
     * @returns Self
     * @memberof Vault
     */
    emptyTrash(): this {
        const trash = this.getTrashGroup();
        if (!trash) return;
        trash.getGroups().forEach(group => {
            group.delete(/* skip trash */ true);
        });
        trash.getEntries().forEach(entry => {
            entry.delete(/* skip trash */ true);
        });
        return this;
    }

    /**
     * Find an entry by its ID
     * @param id The ID to search for
     * @returns Null if not found, or the Entry instance
     * @memberof Vault
     */
    findEntryByID(id: EntryID): null | Entry {
        return findEntryByID(this.getGroups(), id);
    }

    /**
     * Find all entries that match a certain property
     * @param property The property to search with
     * @param value The value to search for
     * @returns An array of found extries
     * @memberof Vault
     */
    findEntriesByProperty(property: string | RegExp, value: string | RegExp): Array<Entry> {
        return findEntriesByProperty(this.getGroups(), property, value);
    }

    /**
     * Find a group by its ID
     * @param id The group ID to search for
     * @returns The group or null if not found
     * @memberof Vault
     */
    findGroupByID(id: GroupID): null | Group {
        return findGroupByID(this.getGroups(), id);
    }

    /**
     * Find groups by their title
     * @param title The group title
     * @returns An array of groups
     * @memberof Vault
     */
    findGroupsByTitle(title: string | RegExp): Array<Group> {
        return findGroupsByTitle(this.getGroups(), title);
    }

    /**
     * Get the value of an attribute
     * @param attributeName The attribute to get
     * @returns The value of the attribute or undefined if not
     *  set. Returns an object if no attribute name is given.
     * @memberof Vault
     */
    getAttribute(attributeName?: string): undefined | string | Object {
        const attributes = this.format.getVaultAttributes();
        if (!attributeName) {
            return Object.assign({}, attributes);
        }
        if (attributes.hasOwnProperty(attributeName)) {
            return attributes[attributeName];
        }
        return undefined;
    }

    /**
     * Get the top-level groups in the vault
     * @memberof Vault
     */
    getGroups(): Array<Group> {
        return this.format.getAllGroups("0").map(rawGroup => new Group(this, rawGroup));
    }

    /**
     * Get the trash group
     * @returns The trash group or null if it doesn't
     *  exist
     * @memberof Vault
     */
    getTrashGroup(): Group | null {
        const trashGroup = this.getGroups().find(group => group.isTrash());
        return trashGroup || null;
    }

    /**
     * Set an attribute on the vault
     * @param attribute The attribute to set
     * @param value The value to set for the attribute
     * @returns Self
     * @memberof Vault
     */
    setAttribute(attribute: string, value: string): this {
        this.format.setVaultAttribute(attribute, value);
        return this;
    }

    /**
     * De-register a vault item
     * @param vaultItem The item to remove from the references list
     * @memberof Vault
     * @protected
     */
    _deregisterVaultItem(vaultItem: VaultItem) {
        const ind = this._vaultItems.indexOf(vaultItem);
        if (ind >= 0) {
            this._vaultItems.splice(ind, 1);
        }
    }

    /**
     * Register a dependent vault item
     * @param vaultItem The item to register
     * @memberof Vault
     * @protected
     */
    _registerVaultItem(vaultItem: VaultItem) {
        if (this._vaultItems.indexOf(vaultItem) === -1) {
            this._vaultItems.push(vaultItem);
        }
    }

    /**
     * Update the format reference
     * @param format The new format instance
     * @memberof Vault
     * @protected
     */
    _updateFormat(format: any) {
        this._format = format;
        this._vaultItems.forEach(vaultItem => {
            if (vaultItem instanceof Group) {
                vaultItem._source = this.format.findGroupByID(vaultItem.id);
            } else if (vaultItem instanceof Entry) {
                vaultItem._source = this.format.findEntryByID(vaultItem.id);
            } else {
                throw new Error("Invalid vault item seen during format update");
            }
        });
    }
}
