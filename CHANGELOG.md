# Core library changelog

## v3.0.0
_2020-03-15_

 * **Major release**
   * App-Env environment handling
   * Improved WebDAV client

## v3.0.0-rc3.2
_2020-01-26_

 * Upgrade WebDAV library - reduced bundle size

## v3.0.0-rc3.1
_2020-01-24_

 * Support for Regular Expressions in entry property searching

## v3.0.0-rc3.0
_2020-01-14_

 * Improved Entry property history structure
 * Many deprecated methods removed

## v3.0.0-rc2.1
_2020-01-05_

 * Reduced bundle / web size

## v3.0.0-rc2.0
_2020-01-03_

 * App-env usage
   * crypto simplification for web

## v3.0.0-rc1.1
_2019-12-20_

 * Change password support

## v3.0.0-rc1.0
_2019-11-03_

 * Pre-release v3
   * My Buttercup client/datasource
   * Shares (not yet connected)
   * Refactorings

## v2.16.1
_2019-10-10_

 * **Bugfix**:
   * Vault meta changes wouldn't write when storing an offline cache

## v2.16.0
_2019-10-06_

 * Datasources upgrade for Google Drive and Dropbox request functionality

## v2.15.4
_2019-08-02_

 * Google Drive client upgrade for `UInt8Array` incompatibilities

## v2.15.3
_2019-08-02_

 * **Bugfix**:
   * Google Drive Datasource not re-authorising on failure

## v2.15.2
_2019-07-23_

 * **Bugfix**:
   * Dropbox client PUT requests failing

## v2.15.1
_2019-07-22_

 * Dropbox / Google Drive request client upgrades (browser stability)

## v2.15.0
_2019-07-16_

 * Dropbox client upgrade: New request library (cowl)

## v2.14.0
_2019-07-11_

 * Entry property time prefix attribute

## v2.13.0
_2019-06-03_

 * TOTP URI attribute
 * Deprecations for entry facade methods

## v2.12.0
_2019-04-14_

 * Improved Google Drive authorisation handling

## v2.11.0
_2019-03-05_

 * Google Drive support
 * Support for updating source credentials (eg. expired API token renewal)

## v2.10.0
_2019-01-14_

 * Entry history

## v2.9.2
_2018-12-08_

 * Execute datasource instantiation callbacks for _each_ datasource type

## v2.9.1
_2018-12-05_

 * Datasource instantiation register for post processing datasource instances

## ~~v2.9.0~~
_2018-12-03_

 * Expose Dropbox request patcher

## v2.8.1
_2018-11-16_

 * New Dropbox client
 * New WebDAV client
 * Add `Entry#getProperties` method

## v2.7.0
_2018-10-27_

 * Ability to disable caching of vaults from within `ArchiveSource`

## v2.6.5
_2018-10-07_

 * **Bugfix**:
   * `Workspace#localDiffersFromRemote` and `Workspace#mergeFromRemote` used invalid instance-of check for detecting `TextDatasource`s

## v2.6.4
_2018-10-06_

 * Update datasources dependencies (security)
 * **Bugfix**:
   * `webdav` wouldn't connect with Seafile instances

## v2.6.3
_2018-10-03_

 * Add missing event for auto-update
 * **Bugfix**:
   * Auto update wouldn't run on _clean_ archives
   * `Workspace#localDiffersFromRemote` and `Workspace#mergeFromRemote` used cached copy of archive, preventing loading again

## v2.6.0
_2018-10-02_

**Deprecated**

 * Auto-update interrupt on `ArchiveManager`

## v2.5.0
_2018-10-02_

 * Auto-update functionality for `ArchiveManager`
 * Update dependencies to latest stable

## v2.4.1
_2018-08-27_

 * **Bugfix**:
   * Handle `ArchiveSource#unlock` calls when no `storageInterface` is set

## v2.4.0
_2018-08-11_

 * Add offline support to `ArchiveManager` and `ArchiveSource`
 * Add readOnly mode operation for `ArchiveSource` loading when content is overridden

## v2.3.0
_2018-07-28_

 * Add ID parameter to `Group.createNew()` (for importing purposes)

## v2.2.0
_2018-07-10_

 * Bugfix: Entry property names could not be made up of special characters
 * `Entry#getURLs`

## v2.1.0
_2018-06-26_

 * Add `removeable: false` property to Entry facades
 * Add `note` facade type

## v2.0.4
_2018-07-03_

 * Support `ArchiveSource` creation with type

## v2.0.3
_2018-06-25_

 * Bugfix: Remove meta references from Entry facades

## v2.0.2
_2018-06-22_

 * Bugfix: `Archive#getID()` call

## v2.0.1
_2018-06-22_

 * Bugfix: `Workspace#mergeFromRemote` bad load for `ArchiveComparator`

## v2.0.0
_2018-06-21_

 * Stable 2.0 release!

## v2.0.0-1 - v2.0.0-3
_2018-06-19_

 * Upgrade credentials to 1.1.1
   * Fix typo in `Credentials.fromSecureString`
 * Upgrade datasources to 1.1.1
   * Fix webdav file fetching (force text)
 * Fix `Workspace#localDiffersFromRemote`

## **v2.0.0-0**
_2018-06-16_

 * **New major** pre-release
   * Refactored codebase
   * Datasources, Credentials and signing split to separate repos
   * iocane upgrade and new API
   * Deprecation of meta
     * Meta is now mapped to properties within the archive instance (meta commands do not create meta properties internally)
   * Removed debug statements
   * Fixed several minor bugs
   * Improved flattening algorithm to prevent excessive operations

## v1.7.1
_2018-05-27_

 * Update `iocane` to `0.10.2` (future proofing)

## v1.7.0
_2018-05-27_

 * Update `webdav-fs` to `1.10.1`

## v1.6.2
_2018-03-15_

 * Update `webdav-fs` to `1.9.0`
 * Bugfix: Changing password in new `ArchiveManager` would fail in deadlock

## v1.5.1
_2018-02-15_

 * Add queues to `ArchiveManager` and `ArchiveSource` classes

## v1.5.0
_2018-02-14_

 * Add new `ArchiveManager` and `ArchiveSource` classes

## v1.4.0
_2017-01-11_

 * `ArchiveManager#updateArchiveCredentials` to call `Workspace.save` after updating the credentials

## v1.3.1
_2017-01-10_

 * Fix master password update process (`ArchiveManager` integration)

## v1.3.0
_2017-01-10_

 * Support for changing archive names in `ArchiveManager` ([#193](https://github.com/buttercup/buttercup-core/issues/193))

## v1.2.0
_2017-01-10_

 * Support for changing the master password ([#197](https://github.com/buttercup/buttercup-core/issues/197))

## v1.1.2
_2017-12-08_

 * **Bugfix**:
   * Fixed `ArchiveManager#removeSource` functionality in web context (`LocalStorageInterface` had no remove method)

## v1.1.1
_2017-11-18_

**Security release**

 * Upgrade iocane to 0.10.1
   * Fixes [DOS vulnerability in `debug` module](https://github.com/perry-mitchell/iocane/pull/21)

## v1.1.0
_2017-11-08_

 * Added `EntryFinder` for fuzzy searching entries

## **v1.0.0**
_2017-11-05_

 * Major release! Hooray!
 * `getAttributes` added to `Archive`, `Group` and `Entry` classes

## v1.0.0-rc1 - rc4
_2017-10-21_

 * Inclusion of core-web

## v0.50.0
_2017-10-16_

 * Allow overriding of already-registered datasources

## v0.49.0
_2017-09-04_

 * Add override methods for salt and IV generation in iocane

## v0.48.0
_2017-09-02_

 * Add [overridable crypto methods](https://github.com/buttercup/buttercup-core/blob/b285c1449ae4a0430729388559524ba13d85c6ca/source/tools/overridable.js#L26)

## v0.47.1
_2017-08-29_

 * Upgrade iocane to 0.9.0
   * Core crypto now async

## v0.46.0
_2017-08-26_

 * Upgrade iocane to 0.8.0
   * Expose ability to override built-in encryption/decryption methods

## v0.45.0
_2017-07-24_

 * **Bugfix**: Entry facades remove meta/attributes that no longer exist
 * Entry `getProperty`/`getMeta`/`getAttribute` return base objects when no parameters specified

## v0.44.1
_2017-07-16_

 * Expose `webdav-fs` via vendor props: `Buttercup.vendor.webdavFS` (for `fetch` override support)

## v0.43.0
_2017-07-07_

 * Entry facades: Dynamic field editing

## v0.42.1
_2017-07-07_

 * **Bugfix**: `ArchiveManager` `unlockedSources` returns array of booleans

## v0.42.0
_2017-07-06_

 * Change event emitters (`ArchiveManager`, `Archive` & `Westley`) to be asynchronous: [#169](https://github.com/buttercup/buttercup-core/issues/169)

## v0.41.2
_2017-07-03_

 * **Bugfix**: Wrong password when unlocking source in `ArchiveManager` breaks state

## v0.41.1
_2017-06-30_

 * **Bugfix**: Wrong credentials passed to `Workspace` in `ArchiveManager`: [#167](https://github.com/buttercup/buttercup-core/issues/167)

## v0.41.0
_2017-06-24_

 * Upgrade webdav-fs to 1.3.0
   * Disable browser `window.fetch` for stability
 * Add `remove` method to `ArchiveManager`

## v0.40.1
_2017-06-10_

 * Add missing event for source rehydration in `ArchiveManager`

## v0.40.0
_2017-05-28_

 * Add event emitters to `Westley` and `Archive` instances for when archive changes occur
 * Add event emitter to `ArchiveManager` for state updates
 * Upgrade **webdav-fs** to `1.0.0`
 * **Bugfix**: Empty values for properties/meta/attributes

## v0.39.1
_2017-05-22_

 * Add support for credentials to be stringified and parsed _insecurely_ (`TextDatasource` deferred encoding hander support for separated interfaces like React Native and WebViews).
 * Expose `TextDatasource` default encoding handlers

## v0.39.0
_2017-05-21_

 * Add support for deferring encryption and packaging in `TextDatasource`

## v0.38.1
_2017-05-02_

 * Expose `StorageInterface`

## v0.38.0
_2017-04-29_

 * Add [MyButtercup](https://github.com/buttercup/roadmap/blob/9da2fad70941f5eda056c2de6d6c112f49470878/roadmap/OVERALL.md#mybuttercup) integration
 * Add [Nextcloud](https://nextcloud.com/) integration

## v0.37.1
_2017-04-16_

 * Bugfix: Fix merge stripping deletion commands when no changes occurred on the remote side

## v0.37.0
_2017-03-27_

 * Add `Group.getGroup()` support for getting parent groups

## v0.36.0
_2017-03-20_

 * Add searching tool for fetching all entries from an archive
 * Expose searching tools

## v0.35.0
_2017-03-11_

 * Serialisation of all string-type values in history
   * _Old versions of Buttercup **will not be able to read** archives from this version!_

## v0.34.0
_2017-03-06_

 * Upgrade iocane to 0.6.0
    * Increase PBKDF2 rounds to 200-250k
 * New credentials factory
 * **Breaking:**
    * Remove old `Workspace`
    * Rename `SharedWorkspace` to `Workspace`
    * Remove `Credentials` class
    * All password authentication methods to use new credentials structure

## v0.33.2
_2017-01-07_

 * Type checking getter `type` on `Archive` and `Group` instances
 * Better type checking in group moving

## v0.33.0
_2017-01-07_

 * Add `getHistory` method for `Archive` instances
 * Add `createFromHistory` factory method to `Archive`

## v0.32.0
_2017-01-06_

 * Add `emptyTrash` method to `Archive`

## v0.31.0
_2017-01-04_

 * Add `findEntryByID` to `Archive` and `Group` classes
 * Throw errors when creating entries/groups within trash

## v0.30.2
_2016-12-30_

 * Fix OwnCloudDatasource's [`fromObject` bug](https://github.com/buttercup-pw/buttercup-core/issues/129)

## v0.30.0
_2016-12-27_

 * Ensure archive ID always generated
 * Added Entry `isInTrash` method
 * Datasource registration (support for 3rd party datasources)
 * `TextDatasource` stores content when using `toObject` or `toString`
 * **Breaking:**
    * Datasource `toString` format rewrite
    * Datasource `toObject`
    * Datasource tools removed (`Buttercup.tools.datasource`)

## v0.29.0
_2016-11-30_

 * Credentials meta support
 * Debug support

## v0.28.0
_2016-11-07_

 * Read-only archives
 * Shared groups
 * Added `SharedWorkspace` for managing several archives
 * Support for moving groups between archives

## v0.27.0
_2016-10-30_

 * Group & Entry searching decorators for Archives and Groups
 * Renamed ManagedGroup to Group
 * Renamed ManagedEntry to Entry
 * Deprecated `Archive.getGroupByID` and `Group.getGroupByID` in favour of `findGroupByID`

## v0.26.0
_2016-10-23_

 * Attributes for archives

## v0.25.0
_2016-10-16_

 * Entry deletion improved (trash and then deleted)
 * Group deletion improved (trash and then deleted)
 * Fixed group `toObject` not passing options to recursive calls
 * Group `toString` takes `toObject` output options

## v0.24.0
_2016-10-15_

 * Group `toObject` upgrade (deep output)

## v0.23.0
_2016-10-02_

 * Buttercup server integration -> datasource

## v0.22.0
_2016-09-27_

 * Key file support

## v0.21.0
_2016-08-07_

 * JSON exporting
 * Datasource to/from strings

## v0.20.1
_2016-07-17_

 * Added datasources
 * Workspace saving -> async

## v0.19.0
_2016-04-09_

 * Support for overriding iocane's PBKDF22 method externally (core-web)

## v0.18.0
_2016-04-03_

 * Integrated iocane
 * ES6 support
    * Dropped Node 0.12

## v0.17.0
_2016-02-27_

 * Set PBKDF2 iteration count to 6-8k
 * Archive searching for entries & groups

## v0.16.0
_2016-02-21_

 * Archive searching
 * WebDAV-fs upgrade -> 0.4.0

## v0.15.1
_2016-02-20_

 * Fixed removed link script (npmignore)

## v0.15.0
_2016-02-19_

 * Increased PBKDF2 iterations

## v0.14.0
_2016-02-12_

 * Added `Credentials`
