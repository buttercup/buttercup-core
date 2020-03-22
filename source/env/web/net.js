const { createClient } = require("webdav/web");

function getNetResources() {
    return {
        "net/webdav/v1/newClient": createClient
    };
}

module.exports = {
    getNetResources
};
