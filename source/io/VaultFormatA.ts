import VError from "verror";
import VaultFormat from "./VaultFormat";
import Credentials from "../credentials/Credentials";
import {
    executeArchiveID,
    executeComment,
    executeCreateEntry,
    executeCreateGroup,
    executeDeleteArchiveAttribute,
    executeDeleteEntry,
    executeDeleteEntryAttribute,
    executeDeleteEntryProperty,
    executeDeleteGroup,
    executeDeleteGroupAttribute,
    executeFormat,
    executeMoveEntry,
    executeMoveGroup,
    executePad,
    executeSetArchiveAttribute,
    executeSetEntryAttribute,
    executeSetEntryProperty,
    executeSetGroupAttribute,
    executeTitleGroup
} from "./formatA/commands";
import {
    COMMAND_MANIFEST,
    InigoCommand as Inigo,
    extractCommandComponents,
    stripDestructiveCommands
} from "./formatA/tools";
import Flattener from "./formatA/Flattener";
import { getFormat, hasValidSignature, sign, stripSignature, vaultContentsEncrypted } from "./formatA/signing";
import { describeVaultDataset } from "./formatA/describe";
import { getSharedAppEnv } from "../env/appEnv";
import { decodeStringValue, isEncoded } from "../tools/encoding";
import { generateUUID } from "../tools/uuid";
import { getCredentials } from "../credentials/channel";
import { historyArrayToString, historyStringToArray } from "./common";
import {
    EntryHistoryItem,
    EntryID,
    FormatAEntry,
    FormatAGroup,
    FormatAVault,
    GroupID,
    History,
    PropertyKeyValueObject,
    VaultFormatID,
    VaultID
} from "../types";

const COMMANDS = {
    aid: executeArchiveID,
    cen: executeCreateEntry,
    cgr: executeCreateGroup,
    cmm: executeComment,
    daa: executeDeleteArchiveAttribute,
    dea: executeDeleteEntryAttribute,
    dem: executeDeleteEntryProperty, // Meta deprecated, deletes property instead
    den: executeDeleteEntry,
    dep: executeDeleteEntryProperty,
    dga: executeDeleteGroupAttribute,
    dgr: executeDeleteGroup,
    fmt: executeFormat,
    men: executeMoveEntry,
    mgr: executeMoveGroup,
    pad: executePad,
    saa: executeSetArchiveAttribute,
    sea: executeSetEntryAttribute,
    sem: executeSetEntryProperty, // Meta deprecated, sets property instead
    sep: executeSetEntryProperty,
    sga: executeSetGroupAttribute,
    tgr: executeTitleGroup
};
const SHARE_COMMAND_EXP = /^\$[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}\s/;
const UUID_LEN = 36;
const VALID_COMMAND_EXP = /^[a-z]{3}\s.+$/;

function emptyVault(): FormatAVault {
    return {
        id: null,
        groups: []
    };
}

export default class VaultFormatA extends VaultFormat {
    static encodeRaw(rawContent: History, credentials: Credentials): Promise<string> {
        const compress = getSharedAppEnv().getProperty("compression/v1/compressText");
        const encrypt = getSharedAppEnv().getProperty("crypto/v1/encryptText");
        const { masterPassword } = getCredentials(credentials.id);
        return Promise.resolve()
            .then(() => historyArrayToString(rawContent))
            .then(history => compress(history))
            .then(compressed => encrypt(compressed, masterPassword))
            .then(sign);
    }

    /**
     * Extract shares from a history collection
     * @param {String[]} history A history collection, containing shares
     * @returns {Object} The resulting separated histories. The object will
     *  always contain a `base` property containing the non-share history.
     *  Each share detected is set on the object under its share ID - being
     *  set to an array of history lines (non-prefixed) for that share.
     */
    static extractSharesFromHistory(history: History): Object {
        return history.reduce(
            (output, line) => {
                if (SHARE_COMMAND_EXP.test(line)) {
                    const shareID = line.substring(1, 1 + UUID_LEN);
                    const command = line.replace(SHARE_COMMAND_EXP, "");
                    output[shareID] = output[shareID] || [];
                    output[shareID].push(command);
                } else {
                    output.base.push(line);
                }
                return output;
            },
            { base: [] }
        );
    }

    static isEncrypted(contents: string): boolean {
        return vaultContentsEncrypted(contents);
    }

    static parseEncrypted(encryptedContent: string, credentials: Credentials): Promise<History> {
        const decompress = getSharedAppEnv().getProperty("compression/v1/decompressText");
        const decrypt = getSharedAppEnv().getProperty("crypto/v1/decryptText");
        const { masterPassword } = getCredentials(credentials.id);
        return Promise.resolve()
            .then(() => {
                if (!hasValidSignature(encryptedContent)) {
                    throw new Error("No valid signature in vault");
                }
                return stripSignature(encryptedContent);
            })
            .then(encryptedData => decrypt(encryptedData, masterPassword))
            .then(decrypted => {
                if (decrypted && decrypted.length > 0) {
                    const decompressed = decompress(decrypted);
                    if (decompressed) {
                        return historyStringToArray(decompressed, VaultFormatID.A);
                    }
                }
                throw new Error("Failed reconstructing history: Decryption failed");
            });
    }

    static prepareHistoryForMerge(history: History): History {
        return stripDestructiveCommands(history);
    }

    _history: History;
    source: FormatAVault;

    constructor(source: FormatAVault = emptyVault()) {
        super(source);
        this._history = [];
        this._history.format = VaultFormatID.A;
    }

    clear() {
        this._history = [];
        if (this.source) {
            for (const key in this.source) {
                delete this.source[key];
            }
        }
    }

    cloneEntry(entry: FormatAEntry, targetGroupID: GroupID) {}

    cloneGroup(group: FormatAGroup, targetGroupID: GroupID) {
        const groupDesc = describeVaultDataset(group, targetGroupID);
        this.execute(groupDesc);
    }

    createEntry(groupID: GroupID, entryID: EntryID) {
        this.execute(
            Inigo.create(Inigo.Command.CreateEntry)
                .addArgument(groupID)
                .addArgument(entryID)
                .generateCommand()
        );
    }

    createGroup(parentID: GroupID, groupID: GroupID) {
        this.execute(
            Inigo.create(Inigo.Command.CreateGroup)
                .addArgument(parentID)
                .addArgument(groupID)
                .generateCommand()
        );
    }

    deleteEntry(entryID: EntryID) {
        this.execute(
            Inigo.create(Inigo.Command.DeleteEntry)
                .addArgument(entryID)
                .generateCommand()
        );
    }

    deleteEntryAttribute(entryID: EntryID, attribute: string) {
        this.execute(
            Inigo.create(Inigo.Command.DeleteEntryAttribute)
                .addArgument(entryID)
                .addArgument(attribute)
                .generateCommand()
        );
    }

    deleteEntryProperty(entryID: EntryID, property: string) {
        this.execute(
            Inigo.create(Inigo.Command.DeleteEntryProperty)
                .addArgument(entryID)
                .addArgument(property)
                .generateCommand()
        );
    }

    deleteGroup(groupID: GroupID) {
        this.execute(
            Inigo.create(Inigo.Command.DeleteGroup)
                .addArgument(groupID)
                .generateCommand()
        );
    }

    deleteGroupAttribute(groupID: GroupID, attribute: string) {
        this.execute(
            Inigo.create(Inigo.Command.DeleteGroupAttribute)
                .addArgument(groupID)
                .addArgument(attribute)
                .generateCommand()
        );
    }

    deleteVaultAttribute(attribute: string) {
        this.execute(
            Inigo.create(Inigo.Command.DeleteArchiveAttribute)
                .addArgument(attribute)
                .generateCommand()
        );
    }

    execute(commandOrCommands: string | Array<string>) {
        if (this.readOnly) {
            throw new Error("Format is in read-only mode");
        }
        const commands = Array.isArray(commandOrCommands) ? commandOrCommands : [commandOrCommands];
        commands.forEach(command => this._executeCommand(command));
        const lastCommand = commands[commands.length - 1];
        if (/^pad\s/i.test(lastCommand) === false) {
            this._pad();
        }
        this.dirty = true;
        this.emit("commandsExecuted");
    }

    findGroupContainingEntryID(id: EntryID): FormatAGroup {
        const searchGroups = (groups: Array<FormatAGroup>): FormatAGroup => {
            for (let i = 0, groupsLen = groups.length; i < groupsLen; i += 1) {
                const group = groups[i];
                if (group.entries) {
                    for (var j = 0, entriesLen = group.entries.length; j < entriesLen; j += 1) {
                        if (group.entries[j].id === id) {
                            return group;
                        }
                    }
                }
                if (group.groups) {
                    const deepGroup = searchGroups(group.groups);
                    if (deepGroup) {
                        return deepGroup;
                    }
                }
            }
            return null;
        };
        return searchGroups(this.getAllGroups());
    }

    findGroupContainingGroupID(id: GroupID): FormatAGroup {
        const searchGroups = (groups: Array<FormatAGroup>): FormatAGroup => {
            for (const group of groups) {
                if (group.id === id) return null;
                const children = group.groups || [];
                const childMatch = !!children.find(child => child.id === id);
                if (childMatch) return group;
                const deepGroup = searchGroups(children);
                if (deepGroup) return deepGroup;
            }
            return null;
        };
        return searchGroups(this.getAllGroups());
    }

    generateID() {
        this.execute(
            Inigo.create(Inigo.Command.ArchiveID)
                .addArgument(generateUUID())
                .generateCommand()
        );
    }

    getAllEntries(parentID: GroupID = null): Array<FormatAEntry> {
        const entries = [];
        const getEntries = (group: FormatAGroup) => {
            if (parentID === null || group.id === parentID) {
                entries.push(...(group.entries || []));
            }
            (group.groups || []).forEach(group => getEntries(group));
        };
        (<FormatAVault>this.source).groups.forEach(group => getEntries(group));
        return entries;
    }

    getAllGroups(parentID: GroupID = null): Array<FormatAGroup> {
        const foundGroups = [];
        const getGroups = (parent: FormatAVault | FormatAGroup) => {
            (parent.groups || []).forEach(subGroup => {
                if (
                    parentID === null ||
                    (parentID === "0" && typeof (<any>subGroup).parentID === "undefined") ||
                    (parentID === (<FormatAGroup>subGroup).parentID)
                ) {
                    foundGroups.push(subGroup);
                }
                getGroups(subGroup);
            });
        };
        getGroups(this.source as FormatAVault);
        return foundGroups;
    }

    getEntryAttributes(entrySource: FormatAEntry): PropertyKeyValueObject {
        return entrySource.attributes;
    }

    getEntryChanges(entrySource: FormatAEntry): Array<EntryHistoryItem> {
        return entrySource.history || [];
    }

    getEntryProperties(entrySource: FormatAEntry): PropertyKeyValueObject {
        return entrySource.properties;
    }

    getFormat(): typeof VaultFormat {
        return VaultFormatA;
    }

    getGroupAttributes(groupSource: FormatAGroup): PropertyKeyValueObject {
        return groupSource.attributes;
    }

    getGroupTitle(groupSource: FormatAGroup): string {
        return groupSource.title;
    }

    getHistory(): History {
        if (!this._history.format) {
            this._history.format = VaultFormatID.A;
        }
        return this._history;
    }

    getItemID(itemSource: FormatAGroup | FormatAEntry): GroupID | EntryID {
        return itemSource.id;
    }

    getVaultAttributes() {
        return (<FormatAVault>this.source).attributes || {};
    }

    getVaultID(): VaultID {
        return this.source.id;
    }

    initialise() {
        this.execute(
            Inigo.create(Inigo.Command.Format)
                .addArgument(getFormat())
                .generateCommand()
        );
        this.generateID();
    }

    moveEntry(entryID: EntryID, groupID: GroupID) {
        this.execute(
            Inigo.create(Inigo.Command.MoveEntry)
                .addArgument(entryID)
                .addArgument(groupID)
                .generateCommand()
        );
    }

    moveGroup(groupID: GroupID, newParentID: GroupID) {
        this.execute(
            Inigo.create(Inigo.Command.MoveGroup)
                .addArgument(groupID)
                .addArgument(newParentID)
                .generateCommand()
        );
    }

    optimise() {
        const flattener = new Flattener(this);
        if (flattener.canBeFlattened()) {
            flattener.flatten();
        }
    }

    setEntryAttribute(entryID: EntryID, attribute: string, value: string) {
        this.execute(
            Inigo.create(Inigo.Command.SetEntryAttribute)
                .addArgument(entryID)
                .addArgument(attribute)
                .addArgument(value)
                .generateCommand()
        );
    }

    setEntryProperty(entryID: EntryID, property: string, value: string) {
        this.execute(
            Inigo.create(Inigo.Command.SetEntryProperty)
                .addArgument(entryID)
                .addArgument(property)
                .addArgument(value)
                .generateCommand()
        );
    }

    setGroupAttribute(groupID: GroupID, attribute: string, value: string) {
        this.execute(
            Inigo.create(Inigo.Command.SetGroupAttribute)
                .addArgument(groupID)
                .addArgument(attribute)
                .addArgument(value)
                .generateCommand()
        );
    }

    setGroupTitle(groupID: GroupID, title: string) {
        this.execute(
            Inigo.create(Inigo.Command.SetGroupTitle)
                .addArgument(groupID)
                .addArgument(title)
                .generateCommand()
        );
    }

    setVaultAttribute(key: string, value: string) {
        this.execute(
            Inigo.create(Inigo.Command.SetArchiveAttribute)
                .addArgument(key)
                .addArgument(value)
                .generateCommand()
        );
    }

    _executeCommand(command: string) {
        let currentCommand = command,
            shareID = null;
        if (SHARE_COMMAND_EXP.test(currentCommand)) {
            const shareMatch = /^\$([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/.exec(currentCommand);
            shareID = shareMatch[1];
            currentCommand = currentCommand.replace(SHARE_COMMAND_EXP, "");
        }
        if (!VALID_COMMAND_EXP.test(currentCommand)) {
            throw new Error(`Invalid command: ${command}`);
        }
        const commandComponents = extractCommandComponents(currentCommand);
        const commandKey = commandComponents.shift().toLowerCase();
        const executeCommand = COMMANDS[commandKey];
        try {
            executeCommand.apply(null, [
                this.source,
                {
                    // opts
                    shareID
                },
                ...this._processCommandParameters(commandKey, commandComponents)
            ]);
            this.history.push(command);
        } catch (err) {
            throw new VError(err, `Failed executing vault command: ${commandKey}`);
        }
    }

    _pad() {
        this._executeCommand(Inigo.generatePaddingCommand());
    }

    _processCommandParameters(commandKey: string, parameters: Array<string>) {
        const friendlyCommand = Object.keys(COMMAND_MANIFEST).find(manifestKey => {
            return COMMAND_MANIFEST[manifestKey].s === commandKey;
        });
        const commandDescriptor = COMMAND_MANIFEST[friendlyCommand];
        if (!commandDescriptor) {
            throw new Error(`Cannot process command parameters: no command found for key: ${commandKey}`);
        }
        return parameters.map((parameter, i) => {
            if (commandDescriptor.args[i].encode === true) {
                if (isEncoded(parameter)) {
                    return decodeStringValue(parameter);
                }
            }
            return parameter;
        });
    }
}
