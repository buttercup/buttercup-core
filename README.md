<h1 align="center">
  <br/>
  <img src="https://cdn.rawgit.com/buttercup-pw/buttercup-assets/054fc0fa/badge/core.svg" alt="Buttercup Core">
  <br/>
  <br/>
  <br/>
</h1>

# Buttercup core library

A NodeJS password vault.

[![Buttercup](https://cdn.rawgit.com/buttercup-pw/buttercup-assets/6582a033/badge/buttercup-slim.svg)](https://buttercup.pw) [![npm](https://img.shields.io/npm/dt/buttercup.svg)](https://www.npmjs.com/package/buttercup) [![npm version](https://badge.fury.io/js/buttercup.svg)](https://badge.fury.io/js/buttercup) ![node min version](https://img.shields.io/badge/node-%3E%3D%206.x-lightgrey.svg) [![security](https://img.shields.io/badge/Security-As%20you%20wish-green.svg)](https://www.npmjs.com/package/buttercup) [![encryption](https://img.shields.io/badge/Encryption-AES%20256%20CBC-red.svg)](https://tools.ietf.org/html/rfc3602) [![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/buttercup)

[![Build Status](https://travis-ci.org/buttercup/buttercup-core.svg?branch=master)](https://travis-ci.org/buttercup/buttercup-core)

[![NPM](https://nodei.co/npm/buttercup.png)](https://www.npmjs.com/package/buttercup)

## About

Buttercup is a password manager written in JavaScript for NodeJS (and the browser!). It's based around `Archive`s that contain `Group`s and `Entry`s. Together, in a nested structure, these items act as a secure store for a user's credentials (much like standard managers these days). Entries allow you to store a credential's username and password, along with other miscellaneous properties (meta) and invisible functional info (attributes).

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
 * [Nextcloud](https://nextcloud.com/)
 * Files
 * ~~[Buttercup server](https://github.com/buttercup/buttercup-server)~~

You may want to read the [API documentation](https://github.com/buttercup/buttercup-core/blob/master/API.md) (or for the [web](https://github.com/buttercup/buttercup-core/blob/master/API_WEB.md)) and [changelog](https://github.com/buttercup/buttercup-core/blob/master/CHANGELOG.md). Please read our [guide to contributing](https://github.com/buttercup/buttercup-core/blob/master/CONTRIBUTING.md) before creating any issues or pull requests.

### Buttercup suite

This core library fuels the processing for several other libraries, such as the [desktop application](https://github.com/buttercup/buttercup-desktop), [mobile application](https://github.com/buttercup/buttercup-mobile) and [browser extension](https://github.com/buttercup/buttercup-browser-extension).

## Usage

Buttercup can easily be imported and used in NodeJS applications from version **6.11 and upwards**:

```javascript
const Buttercup = require("buttercup"); // buttercup-core is "buttercup" on npm
```

Buttercup for browsers is also bundled and can be used like so:

```javascript
import Buttercup from "buttercup/dist/buttercup-web.min.js";
```

### Creating content

Archives are easily created by making a new instance:

```javascript
const Archive = Buttercup.Archive;

const myArchive = new Archive();
```

Groups can be created within **other groups** or **archives**:

```javascript
const websitesGroup = myArchive.createGroup("Websites");
const bankingGroup = websitesGroup.createGroup("Banking");
```

Entries can be created within **groups**, which hold authentication information:

```javascript
const worldBank = bankingGroup.createEntry("World bank");

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
const { FileDatasource, createCredentials } = Buttercup;

const ds = new FileDatasource("~/myArchive.bcup");
ds.save(myArchive, createCredentials.fromPassword("myPa55word")).then(function() {
    console.log("Saved!");
});

ds.load(createCredentials.fromPassword("myPa55word"))
    .then(function(archive) {
        // loaded `archive`
    })
    .catch(function(err) {
        console.error("Failed: " + err.message);
    });
```

Archives can be managed more easily using a `Workspace`. Workspaces are designed to handle a primary archive and potentially several shared archives, each with their own master password and datasource. When integrating with **Buttercup server**, workspaces allow you to handle multiple shared archives where groups can be handled by multiple users.

```javascript
const { Workspace, createCredentials } = Buttercup;

const workspace = new Workspace();
workspace
    .setPrimaryArchive(myArchive, myDatasource, createCredentials.fromPassword("master password"))
    .addSharedArchive(sharedArchive1, sharedDS1, createCredentials.fromPassword("shared pass"), /* saveable */ true);

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

#### Changing the master password
Archive passwords can be changed when being used within workspaces. For example:

```javascript
const workspace = new Workspace();
workspace.setPrimaryArchive(
    myArchive,
    myDatasource,
    createCredentials.fromPassword("master password")
);

// later:
workspace.updatePrimaryCredentials(createCredentials.fromPassword("new password"));
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

`findEntriesByProperty` and `findGroupsByTitle` are exact in how they search, and are maybe not suited for some user-facing interfaces. For archive/application-wide search functionality it is recommended to use `EntryFinder`:

```javascript
const { EntryFinder } = Buttercup;

const finder = new EntryFinder([archive1, archive2]);
const results = finder.search("bank");
```

Results from `EntryFinder` are objects that contain the entry that was found, along with the archive it was found in: `{ entry, archive }`.

### Importing

You can import from other password archive formats, such as KeePass. Checkout the [Buttercup Importer](https://github.com/perry-mitchell/buttercup-importer) project.

### Performance and browser/mobile support

Some things in Buttercup are best run purely on Node, such has password-based key derivation. When preparing this for the web or other platforms (such as with Webpack or Browserify), things can move **very** slowly. There are implementations for functions, such as PBKDF2, that exist for web use that are many times faster than the output of such build utilities.

You can override PBKDF2 by doing the following ([documented on iocane](https://github.com/perry-mitchell/iocane#overriding-the-built-in-pbkdf2-function)):

```javascript
const Buttercup = require("buttercup");
Buttercup.vendor.iocane.components.setPBKDF2(newPBKDF2Function);
// Where 'newPBKDF2Function' is a function that returns a Promise with the hash in a Buffer
```

> Using a _native_ PBKDF2 implementation is always advisable, for speed, as this is usually the most intense procedure within Buttercup (computationally).

You can also override the built in encryption methods used in iocane - This can be very useful in other environments aswell:

```javascript
const Buttercup = require("buttercup");

Buttercup.vendor.iocane.components.setEncryptTool(function(text, keyDerivationInfo) {
    // Do the encryption and return information:
    // return {
    //     hmac,
    //     iv,
    //     salt,
    //     rounds,
    //     encryptedContent
    // };
});

Buttercup.vendor.iocane.components.setDecryptTool(function(encryptedComponents, keyDerivationInfo) {
    // Decrypt and return decrypted string
});
```

> Specifying new crypto methods can help with compatibility. Check [iocane's documention](https://github.com/perry-mitchell/iocane/blob/88747b3d77b05e2fc65227a1d5362f1608a26397/README.md#overriding-the-built-in-encryption-and-decryption-functions) on how to use these methods.

Buttercup uses `webdav-fs` under the hood for support of several storage providers, and this in turn uses [`node-fetch`](https://github.com/bitinn/node-fetch) for requests. `node-fetch` does not work in every environment (such as React-Native) and needs to be switched for a native alterative, like `global.fetch`. Webdav-fs supports this via the `setFetchMethod`, which can be called in Buttercup like so:

```javascript
const Buttercup = require("buttercup");
Buttercup.vendor.webdavFS.setFetchMethod(global.fetch);
// Where `global.fetch` is a fetch-API supporting method
```

### Attributes

Entries and groups have attributes, describing how they should be treated by the various interfaces that interact with the archive. Attributes are not visible to the users and can contain a variety of different properties.

For instance, you could get the role of a group like so:
```javascript
const groupRole = group.getAttribute(ManagedGroup.Attributes.Role);
```

Entry types and facades are [documented separately](ENTRY_FACADES.md).

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
