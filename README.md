<h1 align="center">
  <br/>
  <img src="https://cdn.rawgit.com/buttercup-pw/buttercup-assets/054fc0fa/badge/core.svg" alt="Buttercup Core">
  <br/>
  <br/>
  <br/>
</h1>

# Buttercup core library

A NodeJS secrets vault.

[![Buttercup](https://cdn.rawgit.com/buttercup-pw/buttercup-assets/6582a033/badge/buttercup-slim.svg)](https://buttercup.pw) [![npm](https://img.shields.io/npm/dt/buttercup.svg)](https://www.npmjs.com/package/buttercup) [![npm version](https://badge.fury.io/js/buttercup.svg)](https://badge.fury.io/js/buttercup) ![node min version](https://img.shields.io/badge/node-%3E%3D%206.x-lightgrey.svg) [![security](https://img.shields.io/badge/Security-As%20you%20wish-green.svg)](https://www.npmjs.com/package/buttercup) [![encryption](https://img.shields.io/badge/Encryption-AES%20256%20CBC%2FGCM-red.svg)](https://tools.ietf.org/html/rfc3602) [![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/buttercup)

[![Build Status](https://travis-ci.org/buttercup/buttercup-core.svg?branch=master)](https://travis-ci.org/buttercup/buttercup-core)

[![NPM](https://nodei.co/npm/buttercup.png)](https://www.npmjs.com/package/buttercup)

## About

Buttercup is a password manager written in JavaScript for NodeJS and the browser. It's based around `Archive`s that contain `Group`s and `Entry`s. Together, in a nested structure, these items act as a secure store for a user's credentials (much like standard managers these days). Entries allow you to store a credential's username and password, along with other miscellaneous properties (meta) and invisible functional info (attributes).

Buttercup archives sit in memory as an Object instance that is built from deltas that modify the structure. As changes are made to the archive, new delta commands are added to the history and saved to the archive's `Datasource`. Archives are compressed and encrypted before being saved.

### Features

The core of the system, this **Buttercup Core**, boasts a few awesome features:

 * Deltas for storing archive history
 * Conflict resolution and archive merging
 * AES CBC/GCM encryption w/ 256bit keys
 * SHA-256 keys using PBKDF2 derivation
 * SHA-256 HMAC authentication
 * GZip text compression

This library also supports a variety of datasources for loading from and saving to:

 * WebDAV
 * [OwnCloud](https://owncloud.org/)
 * [Nextcloud](https://nextcloud.com/)
 * [Dropbox](https://www.dropbox.com/)
 * [Box](https://www.box.com/)
 * Files
 * _Coming soon:_ my.buttercup service

You may want to read the [API documentation](https://github.com/buttercup/buttercup-core/blob/master/API.md) (or for the [web](https://github.com/buttercup/buttercup-core/blob/master/API_WEB.md)) and [changelog](https://github.com/buttercup/buttercup-core/blob/master/CHANGELOG.md). Please read our [guide to contributing](https://github.com/buttercup/buttercup-core/blob/master/CONTRIBUTING.md) before creating any issues or pull requests.

## Installation

To use Buttercup in a NodeJS environment, you can simply install and require it:

```shell
npm install buttercup --save
```

```javascript
const { Archive } = require("buttercup");
```

To use Buttercup in a browser, you probably want to include the `buttercup-web.js` or `buttercup-web.min.js` file in the `dist` directory.

## Usage

Buttercup centers around **Archives** which are the structures that manage stored secrets. An archive is a single encrypted data store which can be read from and written to a variety of storages (mentioned earlier). Archives are made up of **Groups** and **Entries**. A Group can be seen as a folder that contains Entries in a tree structure, and Entries are like files in that they contain secret information about some _thing_ (website login, bank account etc.).

To get started, we should create a new Archive:

```javascript
import { Archive } from "buttercup";

// Create an empty archive
const archive1 = new Archive();

// Create an archive with "General" and "Trash" groups
const archive2 = Archive.createWithDefaults();
```

Entries can't be added directly to an archive, but can be to Groups. Creating Groups and Entries is trivial:

```javascript
const archive = new Archive();
const myGroup = archive.createGroup("My Group");
const myEntry = myGroup.createEntry("My Entry");
```

Every command on Archives, Groups and Entries **modifies the Archive instance**, but does not save it to storage. There is no command or need to commit any data - each instance links back to the original Archive. Archives are saved and loaded using Datasources:

```javascript
import { Archive, Datasources, Credentials } from "buttercup";

const { FileDatasource } = Datasources;

const fileDatasource = new FileDatasource("./user.bcup");
const archive = Archive.createWithDefaults();
archive
    .createGroup("Websites")
        .createEntry("My bank")
            .setProperty("username", "user-name")
            .setProperty("password", "s3cureP4$$");

const credentials = Credentials.fromPassword("masterPassword!");
fileDatasource.save(archive.getHistory(), credentials); // returns Promise
```

Later:

```javascript
const fileDatasource = new FileDatasource("./user.bcup");
const credentials = Credentials.fromPassword("masterPassword!");

fileDatasource
    .load(credentials)
    .then(Archive.createFromHistory)
    .then(archive => {
        // ...
    });
```

To see all available Datasources, checkout the [`@buttercup/datasources`](https://github.com/buttercup/datasources) project. Credentials can be found at [`@buttercup/credentials`](https://github.com/buttercup/credentials). Both are bundled with the core library.

### Considerations
Buttercup is an encryption library that is designed to work with very sensitive data. Using its APIs in a public space is **strongly not recommended** - any bad actor could simply hijack and misuse sensitive data passed through Buttercup. Use Buttercup in settings where security and privacy can be ensured:

 * Do use it in NodeJS by directly requiring items from its API, but ensure that your application is final
   * Be cautious using it in applications that are intended to run in a shared environment - Buttercup has several methods that can be overridden, which may pose a security risk in shared environments such as Node applications.
 * **Do not** use it in public spaces such as via a global variable
 * Do use it in bundled applications and executables, such as within an Electron app
