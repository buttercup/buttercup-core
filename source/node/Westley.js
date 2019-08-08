const VError = require("verror");
const EventEmitter = require("eventemitter3");
const {
    COMMAND_MANIFEST,
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
const { extractCommandComponents } = require("./tools/command.js");
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

class Westley extends EventEmitter {
    constructor() {
        super();
        this.initialise();
        this._dirty = false;
        this._readOnly = false;
    }

    get dataset() {
        return this._dataset;
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
        const commandComponents = extractCommandComponents(command);
        const commandKey = commandComponents.shift().toLowerCase();
        const executeCommand = COMMANDS[commandKey];
        try {
            executeCommand.apply(null, [
                this.dataset,
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
