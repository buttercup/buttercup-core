"use strict";

var fetch = require("node-fetch");

module.exports = function buildServerAdapter(address, username, password) {
    const archiveAddress = `${address}archive`;
    return {

        getArchiveData: function() {
            let instructions = {
                method: "POST",
                body: JSON.stringify({
                    request: "get",
                    email: username,
                    passw: password
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            };
            return fetch(archiveAddress, instructions)
                .then(res => res.json())
                .then(function(response) {
                    return (response.status === "ok") ?
                        response.archive :
                        Promise.reject(new Error("Failed fetching archive"));
                });
        }

    };
};
