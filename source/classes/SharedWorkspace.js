"use strict";

var Archive = require("./Archive.js"),
    Inigo = require("./InigoGenerator.js"),
    Comparator = require("./ArchiveComparator.js");

function getCommandType(fullCommand) {
    return (fullCommand && fullCommand.length >= 3) ? fullCommand.substr(0, 3) : "";
}

function itemIsWriteable(item) {
    return item && item.saveable && item.archive && (item.archive.readOnly === false);
}

function stripDestructiveCommands(history) {
    let destructiveSlugs = Object
        .keys(Inigo.Command)
        .map((key) => Inigo.Command[key])
        .filter((command) => command.d)
        .map((command) => command.s);
    return history.filter(function(command) {
        return destructiveSlugs.indexOf(getCommandType(command)) < 0;
    });
}

class SharedWorkspace {

    constructor() {
        this._archives = [];
    }

    get primary() {
        return (this._archives[0]) ?
            this._archives[0] : null;
    }

    addSharedArchive(archive, datasource, password, saveable) {
        saveable = (saveable === undefined) ? true : saveable;
        if (this._archives.length <= 0) {
            this._archives[0] = null;
        }
        this._archives.push({
            archive:        archive,
            datasource:     datasource,
            password:       password,
            saveable:       saveable
        });
    }

    getAllItems() {
        return [].concat(this._archives);
    }

    getSaveableItems() {
        return this._archives.filter(function(item) {
            return item && item.saveable;
        });
    }

    localDiffersFromRemote() {
        return Promise
            .all(
                this.getSaveableItems().map(function(item) {
                    return item.datasource
                        .load(item.password)
                        .then(function(loadedItem) {
                            var comparator = new Comparator(item.archive, loadedItem);
                            return comparator.archivesDiffer();
                        });
                })
            )
            .then(function(differences) {
                return differences.some((differs) => differs);
            });
    }

    mergeItemFromRemote(item) {
        if (!itemIsWriteable(item)) {
            throw new Error("Archive not writeable");
        }
        return item.datasource
            .load(item.password)
            .then(function(stagedArchive) {
                var comparator = new Comparator(item.archive, stagedArchive),
                    differences = comparator.calculateDifferences();
                var newHistoryMain = stripDestructiveCommands(differences.original),
                    newHistoryStaged = stripDestructiveCommands(differences.secondary),
                    base = differences.common;
                var newArchive = new Archive();
                newArchive._getWestley().clear();
                base
                    .concat(newHistoryStaged)
                    .concat(newHistoryMain)
                    .forEach(function(command) {
                        newArchive._getWestley().execute(command);
                    });
                item.archive = newArchive;
                return newArchive;
            });
    }

    mergeSaveablesFromRemote() {
        return Promise.all(
            this.getSaveableItems().map((item) => {
                return this.mergeItemFromRemote(item);
            })
        );
    }

    save() {
        return Promise.all(
            this.getSaveableItems().map(function(item) {
                return item.datasource.save(
                    item.archive,
                    item.password
                );
            })
        );
    }

    setPrimaryArchive(archive, datasource, password) {
        this._archives[0] = {
            archive:        archive,
            datasource:     datasource,
            password:       password,
            saveable:       true
        };
    }

}

module.exports = SharedWorkspace;
