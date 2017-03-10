"use strict";

function historyArrayToString(historyArray) {
    return historyArray.join("\n");
}

function historyStringToArray(historyString) {
    return historyString.split("\n");
}

module.exports = {
    historyArrayToString,
    historyStringToArray
};
