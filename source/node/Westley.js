const VError = require("verror");
const EventEmitter = require("eventemitter3");
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
} = require("./commands.js");
const Inigo = require("./Inigo.js");
const { COMMAND_MANIFEST, extractCommandComponents } = require("./tools/command.js");
const { decodeStringValue, isEncoded } = require("./tools/encoding.js");

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

class Westley extends EventEmitter {
    constructor() {
        super();
        this.initialise();
        this._dirty = false;
        this._readOnly = false;
        this.executionOptions = {};
    }

    get dataset() {
        return this._dataset;
    }

    get entryChanges() {
        // return [...this._entryChanges];
    }

    get history() {
        return [...this._history];
    }

    get isDirty() {
        return this._dirty;
    }

    get readOnly() {
        return this._readOnly;
    }

    clearDirtyState() {
        this._dirty = false;
    }

    execute(command) {
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
                this.dataset,
                Object.assign(
                    {
                        // opts
                        shareID
                    },
                    this.executionOptions
                ),
                ...this._processCommandParameters(commandKey, commandComponents)
            ]);
            this._history.push(command);
        } catch (err) {
            throw new VError(err, `Failed executing vault command: ${commandKey}`);
        }
        this._dirty = true;
        this.emit("commandExecuted", { command });
    }

    initialise() {
        this._dataset = {};
        this._history = [];
    }

    /**
     * Insert a padding in the archive (used for delta tracking)
     * @memberof Westley
     */
    pad() {
        this.execute(Inigo.generatePaddingCommand());
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

module.exports = Westley;
