import joinURL from "url-join";

const ROOT_URL = "https://my.buttercup.pw";
// const ROOT_URL = "http://localhost:8000";
const ROOT_API = joinURL(ROOT_URL, "/api/core/v1");

export const API_ATTACHMENT = joinURL(ROOT_API, "/attachment/[ATTACHMENT_ID]");
export const API_INSIGHTS = joinURL(ROOT_API, "/insights");
export const API_ORG_USERS = joinURL(ROOT_API, "/organisation/[ORG_ID]/users");
export const API_OWN_ARCHIVE = joinURL(ROOT_API, "/own/archive");
export const API_OWN_ARCHIVE_DETAILS = joinURL(ROOT_API, "/own/archive/details");
export const API_OWN_DIGEST = joinURL(ROOT_API, "/own/digest");
export const API_OWN_ORGS = joinURL(ROOT_API, "/own/orgs");
export const API_OWN_PASS_CHANGE = joinURL(ROOT_API, "/own/password");
export const API_OWN_PASS_CHANGE_VERIFY = joinURL(ROOT_API, "/own/password/preflight");
export const API_SHARES = joinURL(ROOT_API, "/shares");

export const OAUTH_AUTHORISE_URI = `${ROOT_URL}/oauth/authorize`;
export const OAUTH_REDIRECT_URI = `${ROOT_URL}/oauth/authorized/`;
export const OAUTH_TOKEN_URI = `${ROOT_URL}/oauth/token`;
