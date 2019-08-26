const joinURL = require("url-join");

// const ROOT_URL = "https://my.buttercup.pw";
const ROOT_URL = "http://localhost:8000";
const ROOT_API = joinURL(ROOT_URL, "/api/core/v1");

const API_ARCHIVE = joinURL(ROOT_API, "/archive/[ID]");
const API_OWN_DIGEST = joinURL(ROOT_API, "/own/digest");
const API_OWN_ORGS = joinURL(ROOT_API, "/own/orgs");

const OAUTH_AUTHORISE_URI = `${ROOT_URL}/oauth/authorize`;
const OAUTH_REDIRECT_URI = `${ROOT_URL}/oauth/authorized/`;

module.exports = {
    API_ARCHIVE,
    API_OWN_DIGEST,
    API_OWN_ORGS,
    OAUTH_AUTHORISE_URI,
    OAUTH_REDIRECT_URI
};
