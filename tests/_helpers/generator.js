(function(module) {
    "use strict";

    var Buttercup = require("../../source/module.js"),
        Inigo = require("../../source/system/InigoGenerator.js"),
        searching = require("../../source/tools/searching-raw.js"),
        encoding = require("../../source/tools/encoding.js");
    var Archive = Buttercup.Archive,
        Commands = Inigo.Command;

    // action setup
    var _ACTIONS = {
            "new-entry": 8,
            "new-group": 4,
            "delete-entry": 2,
            "delete-group": 1,
            "move-entry": 2,
            "move-group": 1,
            "set-prop": 15,
            "set-meta": 12,
            "set-entry-attribute": 7,
            "title-group": 3,
            "set-group-attribute": 7
        },
        ACTIONS = [],
        ACTIONS_COUNT;
    for (var actionName in _ACTIONS) {
        if (_ACTIONS.hasOwnProperty(actionName)) {
            for (var i = 0; i < _ACTIONS[actionName]; i += 1) {
                ACTIONS.push(actionName);
            }
        }
    }
    ACTIONS_COUNT = ACTIONS.length;

    /**
     * Generate a random command
     * @param {Object} dataset The internal dataset that a Westley instance uses
     * @returns {String}
     * @private
     */
    function getRandomCommand(dataset) {
        var randIndex = getRandomIndex(ACTIONS_COUNT),
            action = ACTIONS[randIndex],
            commands = {
                "new-entry": getRandomNewEntryCommand,
                "new-group": getRandomNewGroupCommand,
                "delete-entry": getRandomDeleteEntryCommand,
                "delete-group": getRandomDeleteGroupCommand,
                "move-entry": getRandomMoveEntryCommand,
                "move-group": getRandomMoveGroupCommand,
                "set-prop": getRandomSetPropCommand,
                "set-meta": getRandomSetMetaCommand,
                "set-entry-attribute": getRandomSetEntryAttributeCommand,
                "title-group": getRandomTitleGroupCommand,
                "set-group-attribute": getRandomSetGroupAttributeCommand
            },
            command = commands[action];
        if (command) {
            return command(dataset);
        }
        return false;
    }

    /**
     * Generate a random "new-entry" command
     * @param {Object} dataset The internal dataset that a Westley instance uses
     * @returns {String}
     * @private
     */
    function getRandomNewEntryCommand(dataset) {
        var groupID = getRandomGroupID(dataset, false),
            entryID;
        if (groupID) {
            entryID = encoding.getUniqueID();
            return Inigo.create(Commands.CreateEntry)
                .addArgument(groupID)
                .addArgument(entryID)
                .generateCommand();
        }
        return false;
    }

    /**
     * Generate a random "new-group" command
     * @param {Object} dataset The internal dataset that a Westley instance uses
     * @returns {String}
     * @private
     */
    function getRandomNewGroupCommand(dataset) {
        var groupID = encoding.getUniqueID(),
            targetID = getRandomGroupID(dataset, true);
        return Inigo.create(Commands.CreateGroup)
            .addArgument(targetID)
            .addArgument(groupID)
            .generateCommand();
    }

    /**
     * Generate a random "delete-entry" command
     * @param {Object} dataset The internal dataset that a Westley instance uses
     * @returns {String}
     * @private
     */
    function getRandomDeleteEntryCommand(dataset) {
        var entryID = getRandomEntryID(dataset);
        if (entryID) {
            return Inigo.create(Commands.DeleteEntry)
                .addArgument(entryID)
                .generateCommand();
        }
        return false;
    }

    /**
     * Generate a random "delete-group" command
     * @param {Object} dataset The internal dataset that a Westley instance uses
     * @returns {String}
     * @private
     */
    function getRandomDeleteGroupCommand(dataset) {
        var groupID = getRandomGroupID(dataset, false);
        if (groupID) {
            return Inigo.create(Commands.DeleteGroup)
                .addArgument(groupID)
                .generateCommand();
        }
        return false;
    }

    /**
     * Generate a random "move-entry" command
     * @param {Object} dataset The internal dataset that a Westley instance uses
     * @returns {String}
     * @private
     */
    function getRandomMoveEntryCommand(dataset) {
        var entryID = getRandomEntryID(dataset),
            groupID = getRandomGroupID(dataset);
        if (entryID && groupID) {
            return Inigo.create(Commands.MoveEntry)
                .addArgument(entryID)
                .addArgument(groupID)
                .generateCommand();
        }
        return false;
    }

    /**
     * Generate a random "move-group" command
     * @param {Object} dataset The internal dataset that a Westley instance uses
     * @returns {String}
     * @private
     */
    function getRandomMoveGroupCommand(dataset) {
        var groupID = getRandomGroupID(dataset),
            targetID = getRandomGroupID(dataset);
        if (groupID && targetID && groupID !== targetID) {
            return Inigo.create(Commands.MoveGroup)
                .addArgument(groupID)
                .addArgument(targetID)
                .generateCommand();
        }
        return false;
    }

    /**
     * Generate a random "set-prop" command
     * @param {Object} dataset The internal dataset that a Westley instance uses
     * @returns {String}
     * @private
     */
    function getRandomSetPropCommand(dataset) {
        var entryID = getRandomEntryID(dataset),
            mode = getRandomIndex(3),
            setPropType;
        if (entryID) {
            if (mode === 0) {
                setPropType = "title";
            } else if (mode === 1) {
                setPropType = "username";
            } else {
                setPropType = "password";
            }
            return Inigo.create(Commands.SetEntryProperty)
                .addArgument(entryID)
                .addArgument(setPropType)
                .addArgument(getRandomValue())
                .generateCommand();
        }
        return false;
    }

    /**
     * Generate a random "set-meta" command
     * @param {Object} dataset The internal dataset that a Westley instance uses
     * @returns {String}
     * @private
     */
    function getRandomSetMetaCommand(dataset) {
        var entryID = getRandomEntryID(dataset);
        if (entryID) {
            return Inigo.create(Commands.SetEntryMeta)
                .addArgument(entryID)
                .addArgument(getRandomKey())
                .addArgument(getRandomValue())
                .generateCommand();
        }
        return false;
    }

    /**
     * Generate a random "set-entry-attribute" command
     * @param {Object} dataset The internal dataset that a Westley instance uses
     * @returns {String}
     * @private
     */
    function getRandomSetEntryAttributeCommand(dataset) {
        var entryID = getRandomEntryID(dataset);
        if (entryID) {
            return Inigo.create(Commands.SetEntryAttribute)
                .addArgument(entryID)
                .addArgument(getRandomKey().toUpperCase())
                .addArgument(getRandomValue())
                .generateCommand();
        }
        return false;
    }

    /**
     * Generate a random "title-group" command
     * @param {Object} dataset The internal dataset that a Westley instance uses
     * @returns {String}
     * @private
     */
    function getRandomTitleGroupCommand(dataset) {
        var groupID = getRandomGroupID(dataset);
        if (groupID) {
            return Inigo.create(Commands.SetGroupTitle)
                .addArgument(groupID)
                .addArgument(getRandomValue())
                .generateCommand();
        }
        return false;
    }

    /**
     * Generate a random "set-group-attribute" command
     * @param {Object} dataset The internal dataset that a Westley instance uses
     * @returns {String}
     * @private
     */
    function getRandomSetGroupAttributeCommand(dataset) {
        var groupID = getRandomGroupID(dataset);
        if (groupID) {
            return Inigo.create(Commands.SetGroupAttribute)
                .addArgument(groupID)
                .addArgument(getRandomKey().toUpperCase())
                .addArgument(getRandomValue())
                .generateCommand();
        }
        return false;
    }

    /**
     * Get a random entry ID from the current dataset
     * @param {Object} dataset
     * @returns {String|Boolean} An ID on success, false on failure
     * @private
     */
    function getRandomEntryID(dataset) {
        var entryIDs = [];
        (function collectGroupIDs(groups) {
            var gCount = groups.length,
                eCount;
            for (var g = 0; g < gCount; g += 1) {
                eCount = (groups[g].entries || []).length;
                for (var e = 0; e < eCount; e += 1) {
                    entryIDs.push(groups[g].entries[e].id);
                }
            }
        })(dataset.groups || []);
        return entryIDs.length > 0 ? entryIDs[getRandomIndex(entryIDs.length)] : false;
    }

    /**
     * Get a random group ID
     * @param {Object} dataset
     * @param {Boolean=} includeRoot
     * @returns {String|Boolean} An ID on success, false on failure
     * @private
     */
    function getRandomGroupID(dataset, includeRoot) {
        var groupIDs = includeRoot ? [0] : [];
        (function collectGroupIDs(groups) {
            var gCount = groups.length;
            for (var i = 0; i < gCount; i += 1) {
                groupIDs.push(groups[i].id);
            }
        })(dataset.groups || []);
        return groupIDs.length > 0 ? groupIDs[getRandomIndex(groupIDs.length)] : false;
    }

    /**
     * Get a random index. Given a `len` of 3, the return value would be between 0 and 2 inclusive.
     * @param {Number} len Length/Count
     * @returns {Number}
     * @private
     */
    function getRandomIndex(len) {
        return Math.floor(Math.random() * len);
    }

    /**
     * Get a random property key
     * @returns {String}
     * @private
     */
    function getRandomKey() {
        return getRandomString(12, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 _");
    }

    /**
     * Get a random string
     * @param {Number} length The length of the string to generate
     * @param {String} chars A string of characters to use
     * @returns {String}
     * @private
     */
    function getRandomString(length, chars) {
        var result = "";
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }

    /**
     * Get a random property value
     * @returns {String}
     * @private
     */
    function getRandomValue() {
        return getRandomString(
            32,
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" + "!@#$%^&*()_+-={}[]|\\;'\":,.<>/?`~"
        );
    }

    /**
     * Generate an archive
     * @param {Number} numActions Number of "actions" to perform
     * @param {Archive=} archive
     * @returns {Archive}
     * @public
     * @type {Function}
     */
    module.exports = function generate(numActions, archive) {
        archive = archive || new Archive();
        var westley = archive._getWestley(),
            command;
        while (numActions > 0) {
            command = getRandomCommand(westley.getDataset());
            if (command) {
                westley.execute(command).pad();
                numActions -= 1;
            }
        }
        return archive;
    };
})(module);
