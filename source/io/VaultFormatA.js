const VaultFormat = require("./VaultFormat.js");
const {
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
} = require("./formatA/commands.js");
const { COMMAND_MANIFEST, InigoCommand: Inigo, extractCommandComponents } = require("./formatA/tools.js");
const { hasValidSignature, sign, stripSignature } = require("./formatA/signing.js");
const { decodeStringValue, isEncoded } = require("../tools/encoding.js");
const { generateUUID } = require("../tools/uuid.js");
const { getCredentials } = require("../credentials/channel.js");

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
const VALID_COMMAND_EXP = /^[a-z]{3}\s.+$/;

/**
 * Convert array of history lines to a string
 * @param {Array.<String>} historyArray An array of history items
 * @returns {String} The string representation
 * @private
 */
function historyArrayToString(historyArray) {
    return historyArray.join("\n");
}

/**
 * Convert a history string to an array
 * @param {String} historyString The history string
 * @returns {Array.<String>} An array of history items
 * @private
 */
function historyStringToArray(historyString) {
    return historyString.split("\n");
}

class VaultFormatA extends VaultFormat {
    static encodeRaw(rawContent, credentials) {
        const compress = getSharedAppEnv().getProperty("compression/v1/compressText");
        const encrypt = getSharedAppEnv().getProperty("crypto/v1/encryptText");
        const { masterPassword } = getCredentials(credentials.id);
        return Promise.resolve()
            .then(() => historyArrayToString(historyArr))
            .then(history => compress(history))
            .then(compressed => encrypt(compressed, masterPassword))
            .then(sign);
    }

    static parseEncrypted(encryptedContent, credentials) {
        const decompress = getSharedAppEnv().getProperty("compression/v1/decompressText");
        const decrypt = getSharedAppEnv().getProperty("crypto/v1/decryptText");
        const { masterPassword } = getCredentials(credentials.id);
        return Promise.resolve()
            .then(() => {
                if (!hasValidSignature(encText)) {
                    throw new Error("No valid signature in vault");
                }
                return stripSignature(encText);
            })
            .then(encryptedData => decrypt(encryptedData, masterPassword))
            .then(decrypted => {
                if (decrypted && decrypted.length > 0) {
                    const decompressed = decompress(decrypted);
                    if (decompressed) {
                        return historyStringToArray(decompressed);
                    }
                }
                throw new Error("Failed reconstructing history: Decryption failed");
            });
    }

    createEntry(groupID, entryID) {
        this.execute(
            Inigo.create(Inigo.Command.CreateEntry)
                .addArgument(groupID)
                .addArgument(entryID)
                .generateCommand()
        );
    }

    createGroup(parentID, groupID) {
        this.execute(
            Inigo.create(Inigo.Command.CreateGroup)
                .addArgument(parentID)
                .addArgument(groupID)
                .generateCommand()
        );
    }

    deleteEntry(entryID) {
        this.execute(
            Inigo.create(Inigo.Command.DeleteEntry)
                .addArgument(entryID)
                .generateCommand()
        );
    }

    deleteEntryAttribute(entryID, attribute) {
        this.execute(
            Inigo.create(Inigo.Command.DeleteEntryAttribute)
                .addArgument(entryID)
                .addArgument(attribute)
                .generateCommand()
        );
    }

    deleteEntryProperty(entryID, property) {
        this.execute(
            Inigo.create(Inigo.Command.DeleteEntryProperty)
                .addArgument(entryID)
                .addArgument(property)
                .generateCommand()
        );
    }

    deleteGroup(groupID) {
        this.execute(
            Inigo.create(Inigo.Command.DeleteGroup)
                .addArgument(groupID)
                .generateCommand()
        );
    }

    deleteGroupAttribute(groupID, attribute) {
        this.eecute(
            Inigo.create(Inigo.Command.DeleteGroupAttribute)
                .addArgument(groupID)
                .addArgument(attribute)
                .generateCommand()
        );
    }

    execute(commandOrCommands) {
        const commands = Array.isArray(commandOrCommands) ? commandOrCommands : [commandOrCommands];
        commands.forEach(command => this._executeCommand(command));
        this.dirty = true;
        this.emit("commandsExecuted");
    }

    generateID() {
        this.execute(
            Inigo.create(Inigo.Command.ArchiveID)
                .addArgument(generateUUID())
                .generateCommand()
        );
    }

    initialise() {
        this.execute(
            Inigo.create(Inigo.Command.Format)
                .addArgument(getFormat())
                .generateCommand()
        );
        this.generateID();
    }

    moveEntry(entryID, groupID) {
        this.execute(
            Inigo.create(Inigo.Command.MoveEntry)
                .addArgument(entryID)
                .addArgument(groupID)
                .generateCommand()
        );
    }

    moveGroup(groupID, newParentID) {
        this.execute(
            Inigo.create(Inigo.Command.MoveGroup)
                .addArgument(groupID)
                .addArgument(newParentID)
                .generateCommand()
        );
    }

    setEntryAttribute(entryID, attribute, value) {
        this.execute(
            Inigo.create(Inigo.Command.SetEntryAttribute)
                .addArgument(entryID)
                .addArgument(attribute)
                .addArgument(value)
                .generateCommand()
        );
    }

    setEntryProperty(entryID, property, value) {
        this.execute(
            Inigo.create(Inigo.Command.SetEntryProperty)
                .addArgument(entryID)
                .addArgument(property)
                .addArgument(value)
                .generateCommand()
        );
    }

    setGroupAttribute(groupID, attribute, value) {
        this.execute(
            Inigo.create(Inigo.Command.SetGroupAttribute)
                .addArgument(groupID)
                .addArgument(attribute)
                .addArgument(value)
                .generateCommand()
        );
    }

    setGroupTitle(groupID, title) {
        this.execute(
            Inigo.create(Inigo.Command.SetGroupTitle)
                .addArgument(groupID)
                .addArgument(title)
                .generateCommand()
        );
    }

    setVaultAttribute(key, value) {
        this.execute(
            Inigo.create(Inigo.Command.SetArchiveAttribute)
                .addArgument(key)
                .addArgument(value)
                .generateCommand()
        );
    }

    _executeCommand(command) {
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
                Object.assign(
                    {
                        // opts
                        shareID
                    },
                    this.executionOptions
                ),
                ...this._processCommandParameters(commandKey, commandComponents)
            ]);
            this.history.push(command);
        } catch (err) {
            throw new VError(err, `Failed executing vault command: ${commandKey}`);
        }
    }

    _pad() {
        this.executeCommand(Inigo.generatePaddingCommand());
    }

    _processCommandParameters(commandKey, parameters) {
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
