const shajs = require("sha.js");

function hashHistory(history) {
    return shajs("sha256")
        .update(history.join("\n"))
        .digest("hex");
}
