const joinURL = require("url-join");

const ROOT_URL = "https://my.buttercup.pw";
const ROOT_API = joinURL(ROOT_URL, "/api/core/v1");

const API_ROOT_ARCHIVE = joinURL(ROOT_API, "/archive/root");
const API_OWN_ARCHIVE = joinURL(ROOT_API, "/own/archive");
const API_OWN_DIGEST = joinURL(ROOT_API, "/own/digest");
const API_OWN_KEY = joinURL(ROOT_API, "/own/key");

module.exports = {
    API_ROOT_ARCHIVE,
    API_OWN_ARCHIVE,
    API_OWN_DIGEST,
    API_OWN_KEY
};
