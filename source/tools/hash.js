const hashJS = require("hash.js");

function hashHistory(history) {
    return hashJS
        .sha256()
        .update(history.join("\n"))
        .digest("hex");
}
