<h1 align="center">
  <br/>
  <img src="https://dl.dropboxusercontent.com/u/16657557/Works/Buttercup/buttercup-core.svg" alt="Buttercup Desktop">
  <br/>
  <br/>
  <br/>
</h1>

# Buttercup core library

A NodeJS password vault.

[![Buttercup](https://dl.dropboxusercontent.com/u/16657557/Works/Buttercup/badge.svg)](https://buttercup.pw) [![npm version](https://badge.fury.io/js/buttercup.svg)](https://badge.fury.io/js/buttercup) ![node min version](https://img.shields.io/badge/node-%3E%3D%204.4-lightgrey.svg) [![security](https://img.shields.io/badge/Security-As%20you%20wish-green.svg)](https://www.npmjs.com/package/buttercup) [![encryption](https://img.shields.io/badge/Encryption-AES%20256%20CBC-red.svg)](https://tools.ietf.org/html/rfc3602) [![Join the chat at https://gitter.im/buttercup-pw/buttercup-core](https://badges.gitter.im/buttercup-pw/buttercup-core.svg)](https://gitter.im/buttercup-pw/buttercup-core?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Build Status](https://travis-ci.org/buttercup-pw/buttercup-core.svg?branch=master)](https://travis-ci.org/buttercup-pw/buttercup-core) [![Test Coverage](https://codeclimate.com/github/buttercup-pw/buttercup-core/badges/coverage.svg)](https://codeclimate.com/github/buttercup-pw/buttercup-core/coverage)

[![NPM](https://nodei.co/npm/buttercup.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/buttercup/)
[![NPM](https://nodei.co/npm-dl/buttercup.png?months=3)](https://nodei.co/npm/buttercup/)

**Please be aware** that breaking changes _will occur_ during 0.* (alpha) development. Until 1.0 is released, assume that every minor version contains breaking changes to encryption, structure and API.

## About

Buttercup is a password manager written in JavaScript for NodeJS ([and the browser!](https://github.com/buttercup-pw/buttercup-core-web)). It's based around `Archive`s that contain `Group`s and `Entry`s. Together, in a nested structure, these items act as a secure store for a user's credentials (much like standard managers these days). Entries allow you to store a credential's username and password, along with other miscellaneous properties (meta) and invisible functional info (attributes).

Buttercup archives sit in memory as an Object instance that is built from delta-style commands that modify the structure. As changes are made to the archive, new delta commands are added to the history and saved to the archive's `Datasource`. Archives are compressed and encrypted before being saved.

### Features

The core of the system, this **Buttercup Core**, boasts a few awesome features:

 * Deltas for storing archive history
 * Conflict resolution and archive merging
 * 256bit AES-CBC encryption
 * SHA-256 keys using PBKDF2 derivation
 * SHA-256 HMAC authentication
 * GZip text compression

This library also supports a variety of datasources for loading from and saving to:

 * WebDAV
 * [OwnCloud](https://owncloud.org/)
 * Files
 * [Buttercup server](https://github.com/buttercup-pw/buttercup-server)

You may want to read the [API documentation](https://github.com/buttercup-pw/buttercup-core/blob/master/doc/api.md) and [changelog](https://github.com/buttercup-pw/buttercup-core/blob/master/CHANGELOG.md). Please read our [guide to contributing](https://github.com/buttercup-pw/buttercup-core/blob/master/CONTRIBUTING.md) before creating any issues or pull requests.

### Buttercup suite

This core library fuels the processing for several other libraries, such as the [desktop application](https://github.com/buttercup-pw/buttercup), [core library for use in browsers](https://github.com/buttercup-pw/buttercup-core-web), [server for hosting archives](https://github.com/buttercup-pw/buttercup-server) and [command-line application](https://github.com/buttercup-pw/buttercup-cli).

## Usage

Buttercup can easily be imported and used in NodeJS applications from version **4.x and upwards**:

```javascript
const Buttercup = require("buttercup"); // buttercup-core is "buttercup" on npm
```

### Creating content

Archives are easily created by making a new instance:

```javascript
const Archive = Buttercup.Archive;

let myArchive = new Archive();
```

Groups can be created within **other groups** or **archives**:

```javascript
let websitesGroup = myArchive.createGroup("Websites");

let bankingGroup = websitesGroup.createGroup("Banking");
```

Entries can be created within **groups**, which hold authentication information:

```javascript
let worldBank = bankingGroup.createEntry("World bank");

worldBank
    .setProperty("username", "johnSmith87")
    .setProperty("password", "3mX*7m, #jP0")
    .setMeta("URL", "www.world-bank.com");
```

Entries can be moved to other groups, and groups to other groups or archives:

```javascript
worldBank.moveToGroup(websitesGroup);

bankingGroup.moveTo(myArchive); // move up to the root level
```

### Deleting content

Groups and entries can easily be deleted:

```javascript
myEntry.delete(); // `myEntry` reference no longer valid

myGroup.delete(); // `myGroup` reference no longer valid
```

> It's important to note that just because a group or entry is deleted, does not mean that its corresponding information has. Historical commands are still stored in the archive dataset until they are flattened (after several thousand following commands).

### Saving and loading

Archives can be saved with datasources:

```javascript
const { FileDatasource } = Buttercup;

let ds = new FileDatasource("~/myArchive.bcup");
ds.save(myArchive, "myPa55word").then(function() {
    console.log("Saved!");
});

ds.load("myPa55word")
    .then(function(archive) {
        // loaded `archive`
    })
    .catch(function(err) {
        console.error("Failed: " + err.message);
    });
```

Archives can be managed more easily using a `SharedWorkspace`. Workspaces are designed to handle a primary archive and potentially several shared archives, each with their own master password and datasource. When integrating with **Buttercup server**, workspaces allow you to handle multiple shared archives where groups can be handled by multiple users.

```javascript
const { SharedWorkspace } = Buttercup;

let workspace = new SharedWorkspace();
workspace
    .setPrimaryArchive(myArchive, myDatasource, "master password")
    .addSharedArchive(sharedArchive1, sharedDS1, "shared pass", /* saveable */ true);

workspace
    .save()
    .then(function() {
        console.log("Saved all archives!");
    });
```

Workspaces also allow you to detect conflicts before saving so you can perform merges on the local content:

```javascript
workspace
    .localDiffersFromRemote()
    .then(function(differs) {
        if (differs) {
            return workspace.mergeSaveablesFromRemote();
        }
    })
    .then(function() {
        // all up to date
        return workspace.save();
    });
```

### Searching for things

You can search within archives for certain entries or groups:

```javascript
archive
    .findEntriesByProperty("title", /^Home-[a-z]+$/i)
    .forEach(function(entry) {
        // Do something with entry
    });

archive
    .findGroupsByTitle("banking")
    .forEach(function(group) {});

group.findEntriesByMeta("postcode", /^0\d{4}$/);
```

### Importing

You can import from other password archive formats, such as KeePass. Checkout the [Buttercup Importer](https://github.com/perry-mitchell/buttercup-importer) project.

### Performance and web support

Some things in Buttercup are best run purely on Node, such has password-based key derivation. When preparing this for the web (such as with Webpack or Browserify), things can move **very** slowly. There are implementations for functions, such as PBKDF2, that exist for web use that are many times faster than the output of such build utilities.

You can override PBKDF2 by doing the following ([documented on iocane](https://github.com/perry-mitchell/iocane#overriding-the-built-in-pbkdf2-function)):

```javascript
var Buttercup = require("buttercup");
Buttercup.vendor.iocane.components.setPBKDF2(newPBKDF2Function);
// Where 'newPBKDF2Function' is a function that returns a Promise with the hash in a Buffer
```

### Attributes & Media

Entries and groups have attributes, describing how they should be treated by the various interfaces that interact with the archive. Attributes are not visible to the users and can contain a variety of different properties.

For instance, you could get the role of a group like so:
```javascript
let groupRole = group.getAttribute(ManagedGroup.Attributes.Role);
```

## Debugging
Buttercup supports the [DEBUG](https://github.com/visionmedia/debug) environment variable. You can debug an application using Buttercup like so:

```bash
DEBUG=buttercupcore:* ./app
```

This also works when running the tests:

```bash
DEBUG=buttercupcore:* npm test
```

The iocane submodule also supports DEBUG:

```bash
DEBUG=buttercupcore:*,iocane ./app
# or
DEBUG=buttercupcore:*,iocane npm test
```
