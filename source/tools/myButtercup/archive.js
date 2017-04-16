"use strict";

const fetch = require("node-fetch");

const API_TARGET =              "http://my.buttercup.dev";
const API_ENDPOINT_ARCHIVE =    `${API_TARGET}/api/v1/archive/[ID]`;
const API_ENDPOINT_ARCHIVES =   `${API_TARGET}/api/v1/archives`;

function getArchiveData(accessToken, archiveID) {
    const apiEndpoint = API_ENDPOINT_ARCHIVE.replace("[ID]", archiveID);
    return fetch(
        apiEndpoint,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    )
        .then(res => res.json());
}

function getArchiveList(accessToken) {
    return fetch(
        API_ENDPOINT_ARCHIVES,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    )
        .then(res => res.json())
        .then(function(info) {
            return info.archives;
        });
}

function setArchiveData(accessToken, archiveID, encryptedText) {
    const apiEndpoint = API_ENDPOINT_ARCHIVE.replace("[ID]", archiveID);
    return fetch(
        apiEndpoint,
        {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: encryptedText
            })
        }
    )
        .then(function() {
            // ok!
        });
}

module.exports = {
    getArchiveData,
    getArchiveList,
    setArchiveData
};
