import VaultItem from "./VaultItem";
import { generateUUID } from "../tools/uuid";
import { getEntryURLs, EntryURLType } from "../tools/entry";
import Group from "./Group";
import Vault from "./Vault";
import { EntryChange, EntryPropertyValueType, EntryType, GroupID, PropertyKeyValueObject } from "../types";

/**
 * Entry class - some secret item, login or perhaps
 * even a credit card
 * @augments VaultItem
 * @memberof module:Buttercup
 */
export default class Entry extends VaultItem {
    static Attributes = Object.freeze({
        AttachmentPrefix: "BC_ENTRY_ATTACHMENT:",
        FacadeType: "BC_ENTRY_FACADE_TYPE",
        FieldTypePrefix: "BC_ENTRY_FIELD_TYPE:"
    });

    /**
     * Create a new Entry instance within a vault
     *  and group
     * @param vault The target vault instance
     * @param parentGroupID The target group to
     *  create the entry in (cannot be vault-level)
     * @memberof Entry
     * @static
     */
    static createNew(vault: Vault, parentGroupID: GroupID): Entry {
        // Check if group is trash/in-trash
        const group = vault.findGroupByID(parentGroupID);
        if (!group) {
            throw new Error(`Failed creating entry: no group found for ID: ${parentGroupID}`);
        }
        group._requireWritePermission();
        if (group.isTrash() || group.isInTrash()) {
            throw new Error("Failed creating entry: cannot create within Trash group");
        }
        // Generate new entry ID
        const id = generateUUID();
        // Create new entry
        vault.format.createEntry(parentGroupID, id);
        vault._rebuild();
        return vault.findEntryByID(id);
    }

    /**
     * Delete the entry - either trashes the entry, or removes it completely.
     * If the entry is in the trash already, it is removed (including if there is no
     *    trash group). If the entry is in a normal group and a trash group exists, it
     *  is moved there instead of being deleted.
     * @param skipTrash Skip the trash and force-delete the entry
     * @see moveToGroup
     * @see Vault.getTrashGroup
     * @returns Whether or not the item was deleted
     * @memberof Entry
     */
    delete(skipTrash: boolean = false): boolean {
        this._requireWritePermission();
        const trashGroup = this.vault.getTrashGroup();
        const parentGroup = this.getGroup();
        const canTrash = trashGroup && parentGroup && !parentGroup.isTrash() && !parentGroup.isInTrash();
        if (canTrash && !skipTrash) {
            // trash it
            this.moveToGroup(trashGroup);
            return false;
        }
        // delete it
        this.vault.format.deleteEntry(this.id);
        const ind = this.vault._entries.indexOf(this);
        if (ind >= 0) {
            this.vault._entries.splice(ind, 1);
        }
        this._cleanUp();
        return true;
    }

    /**
     * Delete an attribute
     * @param attribute The attribute name
     * @throws {Error} Throws if the attribute doesn't exist, or cannot be deleted
     * @memberof Entry
     * @returns Self
     */
    deleteAttribute(attribute: string): this {
        this._requireWritePermission();
        this.vault.format.deleteEntryAttribute(this.id, attribute);
        return this;
    }

    /**
     * Delete a property
     * @throws {Error} Throws if property doesn't exist, or cannot be deleted
     * @param property The property to delete
     * @memberof Entry
     * @returns Self
     */
    deleteProperty(property: string): this {
        this._requireWritePermission();
        this.vault.format.deleteEntryProperty(this.id, property);
        return this;
    }

    /**
     * Get an attribute
     * If no attribute name is specified, an object with all attributes and their
     * values is returned.
     * @param attribute The name of the attribute to fetch
     * @returns The attribute value or an object
     *  containing all attribute keys and their values if no attribute name
     *  is provided
     * @memberof Entry
     */
    getAttribute(attribute?: string): PropertyKeyValueObject | string | undefined {
        const attributes = this.vault.format.getEntryAttributes(this._source) || {};
        if (typeof attribute === "undefined") {
            // No property, return entire object
            return Object.assign({}, attributes);
        }
        return attributes.hasOwnProperty(attribute) ? attributes[attribute] : undefined;
    }

    /**
     * Get an array of all history changes made to the entry
     * @memberof Entry
     */
    getChanges(): Array<EntryChange> {
        return this.vault.format.getEntryChanges(this._source);
    }

    /**
     * Get the containing group for the entry
     * @returns The parent group
     * @memberof Entry
     * @throws {Error} Throws if no parent group found
     */
    getGroup(): Group {
        const parentGroup = this.vault.format.findGroupContainingEntryID(this.id);
        if (!parentGroup) {
            throw new Error(`No parent group found for entry: ${this.id}`);
        }
        const parentID = this.vault.format.getItemID(parentGroup);
        return this.vault._groups.find(group => group.id === parentID);
    }

    /**
     * Get a property value
     * If no property name is specified, an object with all properties and their
     * values is returned.
     * @param property The name of the property to fetch
     * @returns The property value or an object with all
     *  values if no property specified
     * @memberof Entry
     */
    getProperty(property?: string): PropertyKeyValueObject | string | undefined {
        const raw = this.vault.format.getEntryProperties(this._source);
        if (typeof property === "undefined") {
            return Object.assign({}, raw);
        }
        return raw.hasOwnProperty(property) ? raw[property] : undefined;
    }

    /**
     * Set the value type of an entry property
     * @param property The property to get the value type of
     * @returns The property value type
     * @memberof Entry
     */
    getPropertyValueType(property: string): EntryPropertyValueType {
        const attr = this.getAttribute(`${Entry.Attributes.FieldTypePrefix}${property}`) as EntryPropertyValueType;
        return attr || EntryPropertyValueType.Text;
    }

    /**
     * Get property values via RegExp expressions.
     * If no property expression is specified, it returns the empty behavior of
     * {@see Entry.getProperty}.
     * @param propertyExpression The expression to use to fetch properties. If
     *  a regular expression, it is then tested against all property keys. If a
     *  string, it's compared exactly.
     * @returns A key-value object of the matching properties
     * @memberof Entry
     */
    getProperties(propertyExpression?: RegExp | string): PropertyKeyValueObject {
        const raw = this.vault.format.getEntryProperties(this._source);
        if (typeof propertyExpression === "undefined") {
            return Object.assign({}, raw);
        }
        const isRexp = propertyExpression instanceof RegExp;
        return Object.keys(raw).reduce((aggr, key) => {
            const matches = isRexp ? (<RegExp>propertyExpression).test(key) : propertyExpression === key;
            return matches ? Object.assign(aggr, { [key]: raw[key] }) : aggr;
        }, {});
    }

    /**
     * Get the entry type
     * @returns
     * @memberof Entry
     */
    getType(): EntryType {
        return <EntryType | undefined>this.getAttribute(Entry.Attributes.FacadeType) || EntryType.Login;
    }

    /**
     * Get an array of URLs from the Entry
     * Returns an array of detected URL values in the Entry's properties. The
     * types of URLs can be configured by providing a preference:
     *  - "general" - General URLs (of any type, preferring "URL" named props)
     *  - "login" - Prefer URLs whose key has "login" in it
     *  - "icon" - Return only icon-like URLs
     *  - "any" - Return all found URLs
     * @param urlTypePreference The URL type preference
     * @returns An array of URLs
     * @memberof Entry
     */
    getURLs(urlTypePreference: EntryURLType): Array<string> {
        return getEntryURLs(this.getProperty() as { [key: string]: string }, urlTypePreference);
    }

    /**
     * Check if the entry is in the trash
     * @returns Whether or not the entry is in the trash
     * @memberof Entry
     */
    isInTrash(): boolean {
        const group = this.getGroup();
        return group.isTrash() || group.isInTrash();
    }

    /**
     * Move the entry to another group
     * @returns Returns self
     * @param group The target group
     * @memberof Entry
     */
    moveToGroup(group: Group): this {
        this._requireWritePermission();
        // @todo Detect moving outside of share range
        this.vault.format.moveEntry(this.id, group.id);
        return this;
    }

    /**
     * Set an attribute on the entry
     * @param attribute The name of the attribute
     * @param value The value to set
     * @returns Returns self
     * @memberof Entry
     */
    setAttribute(attribute: string, value: string): this {
        this._requireWritePermission();
        this.vault.format.setEntryAttribute(this.id, attribute, value);
        return this;
    }

    /**
     * Set a property on the entry
     * @param property The property name
     * @param value The property value
     * @returns Returns self
     * @memberof Entry
     */
    setProperty(property: string, value: string): this {
        this._requireWritePermission();
        this.vault.format.setEntryProperty(this.id, property, value);
        return this;
    }

    /**
     * Set the value type of an entry property
     * @param property The property to set the value type for
     * @param valueType The new value type to set, or `null` to remove
     * @returns Returns self
     * @memberof Entry
     */
    setPropertyValueType(property: string, valueType: EntryPropertyValueType | null): this {
        if (valueType === null) {
            this.deleteAttribute(`${Entry.Attributes.FieldTypePrefix}${property}`);
        } else {
            this.setAttribute(`${Entry.Attributes.FieldTypePrefix}${property}`, valueType);
        }
        return this;
    }

    _updateRefs() {
        this._source = this.vault.format.findEntryByID(this.id);
    }
}
