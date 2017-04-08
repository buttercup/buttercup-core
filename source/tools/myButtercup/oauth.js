"use strict";

const oauth2 = require("simple-oauth2");
const fetch = require("node-fetch");

const SERVICE_TARGET =          "http://my.buttercup.dev";

const OAUTH_CLIENT_ID =         "bcup_core";
const OAUTH_CLIENT_SECRET =     "6251971af4fae39c4a9ad7f973ec912d";
const OAUTH_TOKEN_URL =         `${SERVICE_TARGET}/oauth/token`;

function getCredentials() {
    return {
        client: {
            id:                 OAUTH_CLIENT_ID,
            secret:             OAUTH_CLIENT_SECRET
        },
        auth: {
            tokenHost:  SERVICE_TARGET
        }
    };
}

/**
 * @typedef {Object} MyButtercupOAuth2TokenRaw
 * @property {String} access_token The access token
 * @property {String} refresh_token The refresh token
 * @property {Number} expires_in Seconds before expiry
 */

/**
 * @typedef {Object} MyButtercupOAuth2Token
 */

/**
 * Get a token from the MyButtercup service
 * @param {String} username The username (email) to log in with
 * @param {String} password The password to authenticate with
 * @returns {Promise.<MyButtercupOAuth2TokenRaw>} The token upon success
 */
function getTokenForLogin(username, password) {
    const oauth2Client = oauth2.create(getCredentials());
    const tokenConfig = {
        username: username,
        password: password
    };
    return oauth2Client.ownerPassword
        .getToken(tokenConfig)
        .then(function(token) {
            // const token = oauth2Client.accessToken.create(result);
            // token.expires_in = parseInt(token.expires_in, 10);
            return token;
        });
}

function refreshToken(rawToken) {
    const oauth2Client = oauth2.create(getCredentials());
    const token = oauth2Client.accessToken.create(rawToken);
    return token.refresh();
}

function tokenIsExpired(rawToken) {
    const oauth2Client = oauth2.create(getCredentials());
    const token = oauth2Client.accessToken.create(rawToken);
    return token.expired();
}

module.exports = {
    SERVICE_TARGET,
    getTokenForLogin,
    refreshToken,
    tokenIsExpired
};
