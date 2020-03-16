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
} = require("./formatACommands.js");
const { COMMAND_MANIFEST, InigoCommand: Inigo, extractCommandComponents } = require("./formatATools.js");
const { decodeStringValue, isEncoded } = require("../tools/encoding.js");
const { generateUUID } = require("../tools/uuid.js");

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

class VaultFormatA extends VaultFormat {
    createGroup(parentID, groupID) {
        this.execute(
            Inigo.create(Inigo.Command.CreateGroup)
                .addArgument(parentID)
                .addArgument(groupID)
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

    moveGroup(groupID, newParentID) {
        this.execute(
            Inigo.create(Inigo.Command.MoveGroup)
                .addArgument(groupID)
                .addArgument(newParentID)
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
