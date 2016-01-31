#!/usr/bin/env node

var link = require("fs-symlink"),
    path = require("path"),
    root = path.resolve(__dirname + "/../");

console.log("Trying to create buttercup symlink...");
link(root + "/source", root + "/node_modules/__buttercup", "junction")
    .then(function () {
        console.log("Symlink created successfully.");
    })
    .catch(function(err) {
        console.error(err);
    });
