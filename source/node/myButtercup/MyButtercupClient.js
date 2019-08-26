const { escape: escapeURI } = require("querystring");
const VError = require("verror");
const { request } = require("cowl");
const { API_OWN_DIGEST, OAUTH_AUTHORISE_URI, OAUTH_REDIRECT_URI } = require("./symbols.js");

class MyButtercupClient {
    static generateAuthorisationURL(clientID) {
        const redir = escapeURI(OAUTH_REDIRECT_URI);
        return `${OAUTH_AUTHORISE_URI}?response_type=token&client_id=${clientID}&redirect_uri=${redir}`;
    }

    constructor(accessToken) {
        this._accessToken = accessToken;
        this._lastDigest = null;
    }

    get accessToken() {
        return this._accessToken;
    }

    get digest() {
        return this._lastDigest;
    }

    retrieveDigest() {
        const requestOptions = {
            url: API_OWN_DIGEST,
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            }
        };
        return request(requestOptions)
            .then(resp => {
                const { data: digest } = resp;
                if (digest.status !== "ok") {
                    throw new Error("Invalid digest response");
                }
                this._lastDigest = digest;
                return digest;
            })
            .catch(err => {
                throw new VError(err, "Failed retrieving digest information");
            });
    }
}

module.exports = MyButtercupClient;
