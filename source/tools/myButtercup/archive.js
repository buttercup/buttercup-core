"use strict";

const fetch = require("node-fetch");

const API_TARGET =              "http://my.buttercup.dev";
const API_ENDPOINT_ARCHIVE =    `${API_TARGET}/api/v1/archive/[ID]`;
const API_ENDPOINT_ARCHIVES =   `${API_TARGET}/api/v1/archives`;

// fetch(
//             "http://my.buttercup.dev/api/v1/archives/",
//             {
//                 method: "GET",
//                 headers: {
//                     Authorization: `Bearer ${this.state.mybuttercup_token}`
//                 }
//             }
//         )
//             .then(function(resp) {
//                 if (resp.ok) {
//                     return resp.json();
//                 }
//                 throw new Error(`Bad response: ${resp.status} ${resp.statusText}`);
//             })
//             .then(info => {
//                 if (info.status !== "ok") {
//                     throw new Error(`Invalid status received from API: ${info.status}`);
//                 }
//                 let selectedID = null;
//                 if (info.archives.length > 0) {
//                     selectedID = info.archives[0].id;
//                 }
//                 this.setState({
//                     archives: info.archives,
//                     mybuttercup_archiveid: selectedID,
//                     submitEnabled: true
//                 });
//             });

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
