<h1 align="center">
  <br/>
  <img src="https://cdn.rawgit.com/buttercup-pw/buttercup-assets/054fc0fa/badge/core.svg" alt="Buttercup Core">
  <br/>
  <br/>
  <br/>
</h1>

# Buttercup core library

A NodeJS secrets vault.

[![Buttercup](https://cdn.rawgit.com/buttercup-pw/buttercup-assets/6582a033/badge/buttercup-slim.svg)](https://buttercup.pw) [![npm](https://img.shields.io/npm/dt/buttercup.svg)](https://www.npmjs.com/package/buttercup) [![npm version](https://badge.fury.io/js/buttercup.svg)](https://badge.fury.io/js/buttercup) ![node min version](https://img.shields.io/badge/node-%3E%3D%2010.x-lightgrey.svg) [![security](https://img.shields.io/badge/Security-As%20you%20wish-green.svg)](https://www.npmjs.com/package/buttercup) [![encryption](https://img.shields.io/badge/Encryption-AES%20256%20CBC%2FGCM-red.svg)](https://tools.ietf.org/html/rfc3602)

[![Build Status](https://travis-ci.org/buttercup/buttercup-core.svg?branch=master)](https://travis-ci.org/buttercup/buttercup-core)

[![NPM](https://nodei.co/npm/buttercup.png)](https://www.npmjs.com/package/buttercup)

## About

Buttercup is a JavaScript password manager for NodeJS and the browser (though you can also see it used on platforms like [React Native](https://github.com/buttercup/buttercup-mobile)). It's based around the concept of a **Vault** and its secret **Entry** items (a login, credit card etc.). Entries are then separated into **Group** containers that make organising vaults a little easier.

Because Buttercup is designed first and foremost to be consumed by users in some application, **VaultManager** and **VaultSource** constructs are provided to allow for easy control over several vaults in a somewhat shared environment. A vault manager provides easy-to-use methods to perform dehydration and rehydration (storage in serialised form) of vaults to some secure storage (files, remote datasources etc.).

Buttercup can save and load vaults that are stored locally, in cloud service providers like Dropbox or Google Drive, or in our own [**My Buttercup**](https://my.buttercup.pw) hosted service. It does this by providing a **Datasource** construct for each provider.

Because Buttercup can be consumed in some interesting and varied environments, serialisation tools called **facades** are provided to allow for greater flexibility when working with vault data structures. Facades provide a way to move data around without _classes_, converting vaults to and from JSON objects. Facades are used when attaching vaults to user interfaces like with the [Buttercup UI library](https://github.com/buttercup/ui).

### Features

The core of the system, this **Buttercup Core**, boasts a few awesome features:

 * Merge-able vault contents
 * History for back-tracking to previous passwords etc.
 * AES CBC encryption
 * GZip compression
 * NodeJS and Browser support

This library also supports a variety of datasources for loading from and saving to:

 * [My Buttercup](https://my.buttercup.pw)
 * WebDAV
 * [Dropbox](https://www.dropbox.com/)
 * [Google Drive](https://www.google.com/drive/)
 * Local files

You may want to read the [API documentation](https://github.com/buttercup/buttercup-core/blob/master/API.md) (or for the [web](https://github.com/buttercup/buttercup-core/blob/master/API_WEB.md)) and [changelog](https://github.com/buttercup/buttercup-core/blob/master/CHANGELOG.md). Please read our [guide to contributing](https://github.com/buttercup/buttercup-core/blob/master/CONTRIBUTING.md) before creating any issues or pull requests.

## Installation

To use Buttercup in a NodeJS environment, you can simply install and require it:

```shell
npm install buttercup --save
```

_NB: `@buttercup/app-env` was previously required (on version 3.x), but is not required for version 4. Please uninstall this dependency, along with `@buttercup/facades`, `@buttercup/credentials`, `@buttercup/datasources` and `@buttercup/signing` if you have them installed. These dependencies are included within Buttercup core version 4._

In a Node environment, for example:

```javascript
const { Vault } = require("buttercup");
```

In a _web_ environment, use the following:

```javascript
import { Vault } from "buttercup/web";
```

## Usage

Buttercup uses `Vault`s, `Group`s and `Entry`s to manipulate data in a _workspace_-like environment. These 3 constructs have no knowledge of encryption or storage, and simply provide interfaces for working with the data structures.

To manage vaults, their storage and their states in a higher-level manner more appropriate for building applications, check out the `VaultManager` and `VaultSource` constructs.

To get started, we should create a new Vault:

```javascript
import { Vault } from "buttercup";

// Create an empty vault
const vault1 = new Vault();

// Create aa vault with "General" and "Trash" groups
const vault2 = Vault.createWithDefaults();
```

Entries can't be added directly to a Vault, but can be to Groups. Creating Groups and Entries is trivial:

```javascript
const vault = Vault.createWithDefaults();
const myGroup = vault.createGroup("My Group");
const myEntry = myGroup.createEntry("My Entry");
```

Every command on Vaults, Groups and Entries **modifies the Vault instance**, but does not save it to storage. There is no command or need to commit any data - each instance links back to the original Vault. Vaults are saved and loaded using Datasources:

```javascript
import { Credentials, FileDatasource, Vault } from "buttercup";

const datasourceCredentials = Credentials.fromDatasource({
    path: "./user.bcup"
}, "masterPassword!");
const fileDatasource = new FileDatasource(datasourceCredentials);
const vault = Vault.createWithDefaults();
vault
    .createGroup("Websites")
        .createEntry("My bank")
            .setProperty("username", "user-name")
            .setProperty("password", "s3cureP4$$");

const vaultCredentials = Credentials.fromPassword("masterPassword!");
await fileDatasource.save(vault.format.history, vaultCredentials);
```

Later:

```javascript
const datasourceCredentials = Credentials.fromDatasource({
    path: "./user.bcup"
}, "masterPassword!");
const fileDatasource = new FileDatasource(datasourceCredentials);

fileDatasource
    .load(datasourceCredentials)
    .then(Vault.createFromHistory)
    .then(vault => {
        // ...
    });
```

Using just a datasource is not recommended as saving and loading is quite low-level and cumbersome. Check the [browser extension](https://github.com/buttercup/buttercup-browser-extension) or [desktop application](https://github.com/buttercup/buttercup-desktop) for examples of how to use the `VaultManager` and other helpful classes.

## Compatibility

Buttercup's compatibility is defined as the following:

 * NodeJS version 10 and up
 * Current versions of the following browsers:
   * Google Chrome
   * Mozilla Firefox
   * Safari
 * _React Native 0.60+_

_NB: React Native support is not guaranteed under all circumstances as the platform's stability for low-level operations like cryptography is questionable. Use the [mobile app](https://github.com/buttercup/buttercup-mobile) as a guideline for implementation._

Browser support is strictly dependent on:

 * Popularity
 * The availability of required crypto libaries such as `SubtleCrypto`
