const { createClient } = require("webdav");

function getNetResources() {
    return {
        "net/webdav/v1/newClient": createClient
    };
}

module.exports = {
    getNetResources
};
