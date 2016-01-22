# Buttercup core library

A NodeJS password vault.

[![npm version](https://badge.fury.io/js/buttercup.svg)](https://badge.fury.io/js/buttercup) [![security](https://img.shields.io/badge/Security-As%20you%20wish-green.svg)](https://www.npmjs.com/package/buttercup) [![Build Status](https://travis-ci.org/perry-mitchell/buttercup-core.svg?branch=master)](https://travis-ci.org/perry-mitchell/buttercup-core) [![encryption](https://img.shields.io/badge/Encryption-AES%20256%20CBC-red.svg)](https://tools.ietf.org/html/rfc3602)

[![NPM](https://nodei.co/npm/buttercup.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/buttercup/)
[![NPM](https://nodei.co/npm-dl/buttercup.png?months=3)](https://nodei.co/npm/buttercup/)

**Please be aware** that breaking changes _will occur_ during 0.* (alpha) development. Until 1.0 is released, assume that every minor version contains breaking changes to encryption, structure and API.

## This library

This repository holds the core system functionality:

 - Archive reading/writing
 - Encryption/decryption
 - Low-level processing and manipulation
 - Archive format handling

## About

Buttercup manages credentials in an encrypted archive. The archive utilises a delta-based (history) archive description method to load and save data. This allows for more robust saving and loading whilst protecting against external file changes by allowing some degree of merging.

## Features

 - AES 256 bit CBC encryption (w/ HMAC-sha256)
 - Archive change delta tracking
 - WebDAV remote file support
 - Text compression with GZIP

## Usage

Buttercup can be easily used as a component, allowing for powerful and secure data storage within projects.

You can read the [API documentation here](doc/api.md).

### Creating, saving and loading

Create an archive and a data source: The datasource is where the archive will be written to.

```
var Buttercup = require("buttercup");

var archive = new Buttercup.Archive(),
    datasource = new Buttercup.FileDatasource("~/myArchive.bcup");

datasource.save(archive, "my secure password");
```

Using the same system, you can also load an archive:

```
var Buttercup = require("buttercup");

var datasource = new Buttercup.OwnCloudDatasource(
    "http://www.mycloud.com",
    "/personal/security/passwords.bcup",
    "inigo",
    "montoya1987"
);

// `load()` returns a promise
datasource.load("my archive password").then(function(archive) {
    // `archive` is the archive, loaded from remote. Saving on this datasource will
    // write back to the remote.
});
```

### Using a workspace

Workspaces are designed to help manage the necessary archive management tasks that come from creating a user-friendly password management application. Features like remote update merging need to be handled internally, and so the workspace helps manage such complex tasks.

In reality, the workspace is just a container:

```
var Buttercup = require("buttercup");

var workspace = new Buttercup.Workspace(),
    archive = new Buttercup.Archive(),
    datasource = new Buttercup.FileDatasource("~/myArchive.bcup");

datasource
    .load("password")
    .then(function(archive) {
        workspace
            .setArchive(archive)
            .setDatasource(datasource)
            .setPassword("Fezzik, tear his arms off");
    });
```

The workspace can handle some complex operations like merge conflicts - for instance, if a user has an archive open, and remotely the archive is modified, the workspace can help perform a merge between the two.

_A merge is quite basic, in that the remote commands (that differ) are run first, and then the local run next. All deletion commands that could cause conflicts are stripped, so the resulting merge will still contain items that were deleted in the differing portions before the merge._

```
// Check for differences
workspace.archiveDiffersFromDatasource()
    .then(function(differs) {
        if (differs) {
            // Merge differences first
            return workspace.mergeFromDatasource();
        }
    })
    .then(function() {
        // Save the archive
        workspace.save();
    });
```

Merging is especially helpful for situations where archives can be modified at any time, such as with cloud storage.

### Importing

You can import from other password archive formats, such as KeePass. Checkout the [Buttercup Importer](https://github.com/perry-mitchell/buttercup-importer) project.

### Attributes & Media

Entries and groups have attributes, describing how they should be treated by the various interfaces that interact with the archive. Attributes are not visible to the users and can contain a variety of different properties.

One such use for attributes is the description of how to present the groups and entries to the user - like with item icons.

You can view all of the icons stored in Buttercup by running the following:

```
var Buttercup = require("buttercup"),
    images = Buttercup.tools.design
        .getImageNames()
        .map(Buttercup.tools.design.getImageData);

images[0] // { "name": "about", "image": "data:image/svg;base64..." }
```
