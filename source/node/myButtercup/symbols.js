const joinURL = require("url-join");

// const ROOT_URL = "https://my.buttercup.pw";
const ROOT_URL = "http://localhost:8000";
const ROOT_API = joinURL(ROOT_URL, "/api/core/v1");

const API_ARCHIVE = joinURL(ROOT_API, "/archive/[ID]");
const API_ARCHIVE_NEW = joinURL(ROOT_API, "/archive");
const API_ORG_ARCHIVES = joinURL(ROOT_API, "/organisation/:id/archives");
const API_OWN_ARCHIVE = joinURL(ROOT_API, "/own/archive");
const API_OWN_DIGEST = joinURL(ROOT_API, "/own/digest");
const API_OWN_KEY = joinURL(ROOT_API, "/own/key");
const API_OWN_ORG = joinURL(ROOT_API, "/own/org");
const API_OWN_ORGS = joinURL(ROOT_API, "/own/orgs");

const ARCHIVE_TYPE_NORMAL = "normal";
const ARCHIVE_TYPE_ROOT = "root";

const OAUTH_AUTHORISE_URI = `${ROOT_URL}/oauth/authorize`;
const OAUTH_CLIENT_ID_BROWSER_EXT = "bcup_browser_ext";
const OAUTH_REDIRECT_URI = `${ROOT_URL}/oauth/authorized/`;

module.exports = {
    API_ARCHIVE,
    API_ARCHIVE_NEW,
    API_ORG_ARCHIVES,
    API_OWN_ARCHIVE,
    API_OWN_DIGEST,
    API_OWN_KEY,
    API_OWN_ORG,
    API_OWN_ORGS,
    ARCHIVE_TYPE_NORMAL,
    ARCHIVE_TYPE_ROOT,
    OAUTH_AUTHORISE_URI,
    OAUTH_CLIENT_ID_BROWSER_EXT,
    OAUTH_REDIRECT_URI
};
