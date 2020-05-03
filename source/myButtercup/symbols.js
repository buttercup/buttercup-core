const joinURL = require("url-join");

// const ROOT_URL = "https://my.buttercup.pw";
const ROOT_URL = "http://localhost:8000";
const ROOT_API = joinURL(ROOT_URL, "/api/core/v1");

const API_INSIGHTS = joinURL(ROOT_API, "/insights");
const API_ORG_USERS = joinURL(ROOT_API, "/organisation/[ORG_ID]/users");
const API_OWN_ARCHIVE = joinURL(ROOT_API, "/own/archive");
const API_OWN_ARCHIVE_DETAILS = joinURL(ROOT_API, "/own/archive/details");
const API_OWN_DIGEST = joinURL(ROOT_API, "/own/digest");
const API_OWN_ORGS = joinURL(ROOT_API, "/own/orgs");
const API_SHARES = joinURL(ROOT_API, "/shares");

const OAUTH_AUTHORISE_URI = `${ROOT_URL}/oauth/authorize`;
const OAUTH_REDIRECT_URI = `${ROOT_URL}/oauth/authorized/`;
const OAUTH_TOKEN_URI = `${ROOT_URL}/oauth/token`;

module.exports = {
    API_INSIGHTS,
    API_ORG_USERS,
    API_OWN_ARCHIVE,
    API_OWN_ARCHIVE_DETAILS,
    API_OWN_DIGEST,
    API_OWN_ORGS,
    API_SHARES,
    OAUTH_AUTHORISE_URI,
    OAUTH_REDIRECT_URI,
    OAUTH_TOKEN_URI
};
