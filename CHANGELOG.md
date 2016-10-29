# Buttercup-core release change-log

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