## Modules

<dl>
<dt><a href="#module_command">command</a></dt>
<dd><p>Command related tools</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#LocalStorageInterface">LocalStorageInterface</a> ⇐ <code>StorageInterface</code></dt>
<dd><p>Interface for localStorage</p>
</dd>
<dt><a href="#ArchiveManager">ArchiveManager</a> ⇐ <code>AsyncEventEmitter</code></dt>
<dd><p>Archive manager class</p>
</dd>
<dt><a href="#ArchiveSource">ArchiveSource</a> ⇐ <code>AsyncEventEmitter</code></dt>
<dd><p>Archive source class</p>
</dd>
<dt><a href="#FormatCommand">FormatCommand</a> ⇐ <code><a href="#BaseCommand">BaseCommand</a></code></dt>
<dd></dd>
<dt><a href="#BaseCommand">BaseCommand</a></dt>
<dd></dd>
<dt><a href="#CommentCommand">CommentCommand</a> ⇐ <code><a href="#BaseCommand">BaseCommand</a></code></dt>
<dd></dd>
<dt><a href="#CreateEntryCommand">CreateEntryCommand</a> ⇐ <code><a href="#BaseCommand">BaseCommand</a></code></dt>
<dd></dd>
<dt><a href="#CreateGroupCommand">CreateGroupCommand</a> ⇐ <code><a href="#BaseCommand">BaseCommand</a></code></dt>
<dd></dd>
<dt><a href="#DeleteArchiveAttributeCommand">DeleteArchiveAttributeCommand</a> ⇐ <code><a href="#BaseCommand">BaseCommand</a></code></dt>
<dd></dd>
<dt><a href="#DeleteEntryAttributeCommand">DeleteEntryAttributeCommand</a> ⇐ <code><a href="#BaseCommand">BaseCommand</a></code></dt>
<dd></dd>
<dt><a href="#DeleteEntryCommand">DeleteEntryCommand</a> ⇐ <code><a href="#BaseCommand">BaseCommand</a></code></dt>
<dd></dd>
<dt><del><a href="#DeleteEntryMetaCommand">DeleteEntryMetaCommand</a> ⇐ <code><a href="#BaseCommand">BaseCommand</a></code></del></dt>
<dd></dd>
<dt><a href="#DeleteEntryPropertyCommand">DeleteEntryPropertyCommand</a> ⇐ <code><a href="#BaseCommand">BaseCommand</a></code></dt>
<dd><p>Command for the deletion of property data on an entry</p>
</dd>
<dt><a href="#DeleteGroupAttributeCommand">DeleteGroupAttributeCommand</a> ⇐ <code><a href="#BaseCommand">BaseCommand</a></code></dt>
<dd></dd>
<dt><a href="#DeleteGroupCommand">DeleteGroupCommand</a> ⇐ <code><a href="#BaseCommand">BaseCommand</a></code></dt>
<dd></dd>
<dt><a href="#FormatCommand">FormatCommand</a> ⇐ <code><a href="#BaseCommand">BaseCommand</a></code></dt>
<dd></dd>
<dt><a href="#MoveEntryCommand">MoveEntryCommand</a> ⇐ <code><a href="#BaseCommand">BaseCommand</a></code></dt>
<dd></dd>
<dt><a href="#MoveGroupCommand">MoveGroupCommand</a> ⇐ <code><a href="#BaseCommand">BaseCommand</a></code></dt>
<dd></dd>
<dt><a href="#PadCommand">PadCommand</a> ⇐ <code><a href="#BaseCommand">BaseCommand</a></code></dt>
<dd></dd>
<dt><a href="#SetArchiveAttributeCommand">SetArchiveAttributeCommand</a> ⇐ <code><a href="#BaseCommand">BaseCommand</a></code></dt>
<dd></dd>
<dt><a href="#SetEntryAttributeCommand">SetEntryAttributeCommand</a> ⇐ <code><a href="#BaseCommand">BaseCommand</a></code></dt>
<dd></dd>
<dt><del><a href="#SetEntryMetaCommand">SetEntryMetaCommand</a> ⇐ <code><a href="#BaseCommand">BaseCommand</a></code></del></dt>
<dd></dd>
<dt><a href="#SetEntryPropertyCommand">SetEntryPropertyCommand</a> ⇐ <code><a href="#BaseCommand">BaseCommand</a></code></dt>
<dd></dd>
<dt><a href="#SetGroupAttributeCommand">SetGroupAttributeCommand</a> ⇐ <code><a href="#BaseCommand">BaseCommand</a></code></dt>
<dd></dd>
<dt><a href="#TitleGroupCommand">TitleGroupCommand</a> ⇐ <code><a href="#BaseCommand">BaseCommand</a></code></dt>
<dd></dd>
</dl>

## Mixins

<dl>
<dt><a href="#EntryCollection">EntryCollection</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#GroupCollection">GroupCollection</a> : <code>Object</code></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#deriveKeyFromPassword">deriveKeyFromPassword(password, salt, rounds, bits)</a> ⇒ <code>Promise.&lt;ArrayBuffer&gt;</code></dt>
<dd><p>Derive a key from a password</p>
</dd>
<dt><a href="#patchCorePBKDF">patchCorePBKDF([handler])</a></dt>
<dd><p>Perform patching of the PBKDF2 function in iocane</p>
</dd>
<dt><a href="#credentialsToDatasource">credentialsToDatasource(sourceCredentials)</a> ⇒ <code>Promise.&lt;{datasource, credentials}&gt;</code></dt>
<dd><p>Convert credentials of a remote archive to a datasource</p>
</dd>
<dt><a href="#credentialsToSource">credentialsToSource(sourceCredentials, archiveCredentials, [initialise])</a> ⇒ <code>Promise.&lt;Object&gt;</code></dt>
<dd><p>Convert credentials to a source for the ArchiveManager</p>
</dd>
<dt><a href="#dedupe">dedupe(arr)</a> ⇒ <code>Array</code></dt>
<dd><p>De-dupe an array</p>
</dd>
<dt><a href="#createFieldDescriptor">createFieldDescriptor(entry, title, entryPropertyType, entryPropertyName, options)</a> ⇒ <code><a href="#EntryFacadeField">EntryFacadeField</a></code></dt>
<dd><p>Create a descriptor for a field to be used within a facade</p>
</dd>
<dt><a href="#getEntryValue">getEntryValue(entry, property, name)</a> ⇒ <code>String</code></dt>
<dd><p>Get a value on an entry for a specific property type</p>
</dd>
<dt><a href="#getValidProperties">getValidProperties()</a> ⇒ <code>Array.&lt;String&gt;</code></dt>
<dd><p>Get an array of valid property names</p>
</dd>
<dt><a href="#isValidProperty">isValidProperty(name)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Check if a property name is valid</p>
</dd>
<dt><a href="#findEntriesByCheck">findEntriesByCheck(groups, compareFn)</a> ⇒ <code>Array.&lt;Entry&gt;</code></dt>
<dd><p>Find entry instances by filtering with a compare function</p>
</dd>
<dt><a href="#findGroupsByCheck">findGroupsByCheck(groups, compareFn)</a> ⇒ <code>Array.&lt;Group&gt;</code></dt>
<dd><p>Find group instances within groups that satisfy some check</p>
</dd>
<dt><a href="#getAllEntries">getAllEntries(groups)</a> ⇒ <code>Array.&lt;Entry&gt;</code></dt>
<dd><p>Get all entries within a collection of groups</p>
</dd>
<dt><a href="#generateUUID">generateUUID()</a> ⇒ <code>String</code></dt>
<dd><p>Generate a UUID (v4)</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ArchiveSourceDescription">ArchiveSourceDescription</a></dt>
<dd></dd>
<dt><a href="#ArchiveDataset">ArchiveDataset</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#EntryFacadeField">EntryFacadeField</a> : <code>Object</code></dt>
<dd><p>Entry facade data field</p>
</dd>
<dt><a href="#FoundGroupResult">FoundGroupResult</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="module_command"></a>

## command
Command related tools

<a name="module_command.extractCommandComponents"></a>

### command.extractCommandComponents(command) ⇒ <code>Array.&lt;String&gt;</code>
Extract command components from a string

**Kind**: static method of [<code>command</code>](#module_command)  
**Returns**: <code>Array.&lt;String&gt;</code> - The separated parts  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>String</code> | The command to extract from |

<a name="LocalStorageInterface"></a>

## LocalStorageInterface ⇐ <code>StorageInterface</code>
Interface for localStorage

**Kind**: global class  
**Extends**: <code>StorageInterface</code>  

* [LocalStorageInterface](#LocalStorageInterface) ⇐ <code>StorageInterface</code>
    * [.getAllKeys()](#LocalStorageInterface+getAllKeys) ⇒ <code>Promise.&lt;Array.&lt;String&gt;&gt;</code>
    * [.getValue(name)](#LocalStorageInterface+getValue) ⇒ <code>Promise.&lt;String&gt;</code>
    * [.removeKey(name)](#LocalStorageInterface+removeKey) ⇒ <code>Promise</code>
    * [.setValue(name, value)](#LocalStorageInterface+setValue) ⇒ <code>Promise</code>

<a name="LocalStorageInterface+getAllKeys"></a>

### localStorageInterface.getAllKeys() ⇒ <code>Promise.&lt;Array.&lt;String&gt;&gt;</code>
Get all keys from storage

**Kind**: instance method of [<code>LocalStorageInterface</code>](#LocalStorageInterface)  
**Returns**: <code>Promise.&lt;Array.&lt;String&gt;&gt;</code> - A promise that resolves with an array of keys  
<a name="LocalStorageInterface+getValue"></a>

### localStorageInterface.getValue(name) ⇒ <code>Promise.&lt;String&gt;</code>
Get the value of a key

**Kind**: instance method of [<code>LocalStorageInterface</code>](#LocalStorageInterface)  
**Returns**: <code>Promise.&lt;String&gt;</code> - A promise that resolves with the value  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The key name |

<a name="LocalStorageInterface+removeKey"></a>

### localStorageInterface.removeKey(name) ⇒ <code>Promise</code>
Remove a key

**Kind**: instance method of [<code>LocalStorageInterface</code>](#LocalStorageInterface)  
**Returns**: <code>Promise</code> - A promise that resolves when the removal has completed  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The key name |

<a name="LocalStorageInterface+setValue"></a>

### localStorageInterface.setValue(name, value) ⇒ <code>Promise</code>
Set the value for a key

**Kind**: instance method of [<code>LocalStorageInterface</code>](#LocalStorageInterface)  
**Returns**: <code>Promise</code> - A promise that resolves when the value is set  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The key name |
| value | <code>String</code> | The value to set |

<a name="ArchiveManager"></a>

## ArchiveManager ⇐ <code>AsyncEventEmitter</code>
Archive manager class

**Kind**: global class  
**Extends**: <code>AsyncEventEmitter</code>  

* [ArchiveManager](#ArchiveManager) ⇐ <code>AsyncEventEmitter</code>
    * [new ArchiveManager([storageInterface])](#new_ArchiveManager_new)
    * [.nextSourceOrder](#ArchiveManager+nextSourceOrder) : <code>Number</code>
    * [.sources](#ArchiveManager+sources) : [<code>Array.&lt;ArchiveSource&gt;</code>](#ArchiveSource)
    * [.sourcesList](#ArchiveManager+sourcesList) : [<code>Array.&lt;ArchiveSourceDescription&gt;</code>](#ArchiveSourceDescription)
    * [.storageInterface](#ArchiveManager+storageInterface) : <code>StorageInterface</code>
    * [.unlockedSources](#ArchiveManager+unlockedSources) : [<code>Array.&lt;ArchiveSource&gt;</code>](#ArchiveSource)
    * [.addSource(archiveSource, [obj])](#ArchiveManager+addSource)
    * [.dehydrate()](#ArchiveManager+dehydrate) ⇒ <code>Promise</code>
    * [.dehydrateSource(sourceID)](#ArchiveManager+dehydrateSource) ⇒ <code>Promise</code>
    * [.getSourceForID(sourceID)](#ArchiveManager+getSourceForID) ⇒ [<code>ArchiveSource</code>](#ArchiveSource) \| <code>null</code>
    * [.rehydrate()](#ArchiveManager+rehydrate) ⇒ <code>Promise</code>
    * [.removeSource(sourceID)](#ArchiveManager+removeSource) ⇒ <code>Promise</code>
    * [.reorderSource(sourceID, position)](#ArchiveManager+reorderSource)
    * [.reorderSources()](#ArchiveManager+reorderSources)

<a name="new_ArchiveManager_new"></a>

### new ArchiveManager([storageInterface])
Constructor for the archive manager


| Param | Type | Description |
| --- | --- | --- |
| [storageInterface] | <code>StorageInterface</code> | The storage interface to use -  defaults to storing in memory |

<a name="ArchiveManager+nextSourceOrder"></a>

### archiveManager.nextSourceOrder : <code>Number</code>
The next available source order

**Kind**: instance property of [<code>ArchiveManager</code>](#ArchiveManager)  
**Read only**: true  
<a name="ArchiveManager+sources"></a>

### archiveManager.sources : [<code>Array.&lt;ArchiveSource&gt;</code>](#ArchiveSource)
The current sources

**Kind**: instance property of [<code>ArchiveManager</code>](#ArchiveManager)  
**Read only**: true  
<a name="ArchiveManager+sourcesList"></a>

### archiveManager.sourcesList : [<code>Array.&lt;ArchiveSourceDescription&gt;</code>](#ArchiveSourceDescription)
All sources, listed by their descriptions

**Kind**: instance property of [<code>ArchiveManager</code>](#ArchiveManager)  
**Read only**: true  
<a name="ArchiveManager+storageInterface"></a>

### archiveManager.storageInterface : <code>StorageInterface</code>
The current storage interface

**Kind**: instance property of [<code>ArchiveManager</code>](#ArchiveManager)  
**Read only**: true  
<a name="ArchiveManager+unlockedSources"></a>

### archiveManager.unlockedSources : [<code>Array.&lt;ArchiveSource&gt;</code>](#ArchiveSource)
All unlocked sources

**Kind**: instance property of [<code>ArchiveManager</code>](#ArchiveManager)  
**Read only**: true  
<a name="ArchiveManager+addSource"></a>

### archiveManager.addSource(archiveSource, [obj])
Add a source to the manager

**Kind**: instance method of [<code>ArchiveManager</code>](#ArchiveManager)  

| Param | Type | Description |
| --- | --- | --- |
| archiveSource | [<code>ArchiveSource</code>](#ArchiveSource) | The source to add |
| [obj] | <code>Object</code> | Optional configuration |
| [obj.emitUpdated] | <code>Boolean</code> | Whether or not to emit an updated event (default: true) |
| [obj.order] | <code>Number</code> | Override the order of the new source |

<a name="ArchiveManager+dehydrate"></a>

### archiveManager.dehydrate() ⇒ <code>Promise</code>
Dehydrate all sources and write them to storage

**Kind**: instance method of [<code>ArchiveManager</code>](#ArchiveManager)  
**Returns**: <code>Promise</code> - A promise that resolves once all sources have been dehydrated  
<a name="ArchiveManager+dehydrateSource"></a>

### archiveManager.dehydrateSource(sourceID) ⇒ <code>Promise</code>
Dehydrate a single archive source

**Kind**: instance method of [<code>ArchiveManager</code>](#ArchiveManager)  
**Returns**: <code>Promise</code> - A promise that resolves once the source has been dehydrated  

| Param | Type | Description |
| --- | --- | --- |
| sourceID | <code>String</code> | The ID of the source |

<a name="ArchiveManager+getSourceForID"></a>

### archiveManager.getSourceForID(sourceID) ⇒ [<code>ArchiveSource</code>](#ArchiveSource) \| <code>null</code>
Get a source for an ID

**Kind**: instance method of [<code>ArchiveManager</code>](#ArchiveManager)  
**Returns**: [<code>ArchiveSource</code>](#ArchiveSource) \| <code>null</code> - The source with the matching ID or null if not found  

| Param | Type | Description |
| --- | --- | --- |
| sourceID | <code>String</code> | The source ID |

<a name="ArchiveManager+rehydrate"></a>

### archiveManager.rehydrate() ⇒ <code>Promise</code>
Rehydrate sources from storage

**Kind**: instance method of [<code>ArchiveManager</code>](#ArchiveManager)  
**Returns**: <code>Promise</code> - A promise that resolves once rehydration has completed  
**Throws**:

- <code>VError</code> Rejects if rehydrating from storage fails

<a name="ArchiveManager+removeSource"></a>

### archiveManager.removeSource(sourceID) ⇒ <code>Promise</code>
Remove a source from the storage

**Kind**: instance method of [<code>ArchiveManager</code>](#ArchiveManager)  
**Returns**: <code>Promise</code> - A promise that resolves once the source has been removed  

| Param | Type | Description |
| --- | --- | --- |
| sourceID | <code>String</code> | The ID of the source to remove |

<a name="ArchiveManager+reorderSource"></a>

### archiveManager.reorderSource(sourceID, position)
Reorder a source

**Kind**: instance method of [<code>ArchiveManager</code>](#ArchiveManager)  
**Throws**:

- <code>VError</code> Throws if no source is found


| Param | Type | Description |
| --- | --- | --- |
| sourceID | <code>String</code> | The ID of the source to reorder |
| position | <code>Number</code> | The 0-based position to move the source to |

<a name="ArchiveManager+reorderSources"></a>

### archiveManager.reorderSources()
Reorder all sources

**Kind**: instance method of [<code>ArchiveManager</code>](#ArchiveManager)  
<a name="ArchiveSource"></a>

## ArchiveSource ⇐ <code>AsyncEventEmitter</code>
Archive source class

**Kind**: global class  
**Extends**: <code>AsyncEventEmitter</code>  

* [ArchiveSource](#ArchiveSource) ⇐ <code>AsyncEventEmitter</code>
    * [new ArchiveSource(name, sourceCredentials, archiveCredentials, [id])](#new_ArchiveSource_new)
    * _instance_
        * [.colour](#ArchiveSource+colour) : <code>String</code>
        * [.description](#ArchiveSource+description) : [<code>ArchiveSourceDescription</code>](#ArchiveSourceDescription)
        * [.id](#ArchiveSource+id) : <code>String</code>
        * [.name](#ArchiveSource+name) : <code>String</code>
        * [.status](#ArchiveSource+status) : <code>ArchiveSourceStatus</code>
        * [.workspace](#ArchiveSource+workspace) : <code>Workspace</code> \| <code>null</code>
        * [.dehydrate()](#ArchiveSource+dehydrate) ⇒ <code>Promise.&lt;String&gt;</code>
        * [.lock()](#ArchiveSource+lock) ⇒ <code>Promise.&lt;String&gt;</code>
        * [.unlock(masterPassword, [initialiseRemote])](#ArchiveSource+unlock)
        * [.updateArchiveCredentials(masterPassword)](#ArchiveSource+updateArchiveCredentials) ⇒ <code>Promise.&lt;String&gt;</code>
    * _static_
        * [.Status](#ArchiveSource.Status)
        * [.rehydrate(dehydratedString)](#ArchiveSource.rehydrate) ⇒ [<code>ArchiveSource</code>](#ArchiveSource)

<a name="new_ArchiveSource_new"></a>

### new ArchiveSource(name, sourceCredentials, archiveCredentials, [id])
Constructor for an archive source


| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the source |
| sourceCredentials | <code>String</code> | Encrypted archive source credentials |
| archiveCredentials | <code>String</code> | Encrypted archive credentials |
| [id] | <code>String</code> | Optional source ID (Do not pass for new source) |

<a name="ArchiveSource+colour"></a>

### archiveSource.colour : <code>String</code>
Source colour

**Kind**: instance property of [<code>ArchiveSource</code>](#ArchiveSource)  
<a name="ArchiveSource+description"></a>

### archiveSource.description : [<code>ArchiveSourceDescription</code>](#ArchiveSourceDescription)
Get the source description

**Kind**: instance property of [<code>ArchiveSource</code>](#ArchiveSource)  
**Read only**: true  
<a name="ArchiveSource+id"></a>

### archiveSource.id : <code>String</code>
Source ID

**Kind**: instance property of [<code>ArchiveSource</code>](#ArchiveSource)  
**Read only**: true  
<a name="ArchiveSource+name"></a>

### archiveSource.name : <code>String</code>
Source name

**Kind**: instance property of [<code>ArchiveSource</code>](#ArchiveSource)  
**Read only**: true  
<a name="ArchiveSource+status"></a>

### archiveSource.status : <code>ArchiveSourceStatus</code>
Source status

**Kind**: instance property of [<code>ArchiveSource</code>](#ArchiveSource)  
**Read only**: true  
<a name="ArchiveSource+workspace"></a>

### archiveSource.workspace : <code>Workspace</code> \| <code>null</code>
Workspace instance for the source
Is null when the source is locked

**Kind**: instance property of [<code>ArchiveSource</code>](#ArchiveSource)  
**Read only**: true  
<a name="ArchiveSource+dehydrate"></a>

### archiveSource.dehydrate() ⇒ <code>Promise.&lt;String&gt;</code>
Dehydrate the source for storage
Returns a secure string with locked (encrypted) credentials, even when the
 source is in the UNLOCKED state. This method does NOT store the source -
 this must be done separately.

**Kind**: instance method of [<code>ArchiveSource</code>](#ArchiveSource)  
**Returns**: <code>Promise.&lt;String&gt;</code> - A promise that resolves with the dehydrated
 source information  
**Throws**:

- <code>VError</code> Rejects is source in PENDING state

<a name="ArchiveSource+lock"></a>

### archiveSource.lock() ⇒ <code>Promise.&lt;String&gt;</code>
Lock the source
Encrypts the credentials and performs dehydration, placing the source into
 a LOCKED state. No saving is performed before locking.

**Kind**: instance method of [<code>ArchiveSource</code>](#ArchiveSource)  
**Returns**: <code>Promise.&lt;String&gt;</code> - A promise that resolves with dehydrated content  
**Throws**:

- <code>VError</code> Rejects if not in unlocked state

**Emits**: <code>ArchiveSource#event:sourceLocked</code>  
<a name="ArchiveSource+unlock"></a>

### archiveSource.unlock(masterPassword, [initialiseRemote])
Unlock the source

**Kind**: instance method of [<code>ArchiveSource</code>](#ArchiveSource)  
**Throws**:

- <code>VError</code> Rejects if not in locked state
- <code>VError</code> Rejects if not able to create the source from the encrypted
 credentials

**Emits**: <code>ArchiveSource#event:sourceUnlocked</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| masterPassword | <code>String</code> |  | The master password |
| [initialiseRemote] | <code>Boolean</code> | <code>false</code> | Optionally initialise the remote (replaces  remote archive) (defaults to false) |

<a name="ArchiveSource+updateArchiveCredentials"></a>

### archiveSource.updateArchiveCredentials(masterPassword) ⇒ <code>Promise.&lt;String&gt;</code>
Update the password/credentials for the archive
The workspace is saved after changing. Responds with dehydrated details
which should be SAVED.

**Kind**: instance method of [<code>ArchiveSource</code>](#ArchiveSource)  
**Returns**: <code>Promise.&lt;String&gt;</code> - A promise that resolves with the dehydrated
 source details  
**Throws**:

- <code>VError</code> Rejects if source is not in unlocked state


| Param | Type | Description |
| --- | --- | --- |
| masterPassword | <code>String</code> | New master password |

<a name="ArchiveSource.Status"></a>

### ArchiveSource.Status
Archive source status

**Kind**: static enum of [<code>ArchiveSource</code>](#ArchiveSource)  
**Properties**

| Name | Default |
| --- | --- |
| LOCKED | <code>locked</code> | 
| UNLOCKED | <code>unlocked</code> | 
| PENDING | <code>pending</code> | 

<a name="ArchiveSource.rehydrate"></a>

### ArchiveSource.rehydrate(dehydratedString) ⇒ [<code>ArchiveSource</code>](#ArchiveSource)
Rehydrate a dehydrated archive source

**Kind**: static method of [<code>ArchiveSource</code>](#ArchiveSource)  
**Returns**: [<code>ArchiveSource</code>](#ArchiveSource) - The rehydrated source  

| Param | Type | Description |
| --- | --- | --- |
| dehydratedString | <code>String</code> | A dehydrated archive source |

<a name="FormatCommand"></a>

## FormatCommand ⇐ [<code>BaseCommand</code>](#BaseCommand)
**Kind**: global class  
**Extends**: [<code>BaseCommand</code>](#BaseCommand)  

* [FormatCommand](#FormatCommand) ⇐ [<code>BaseCommand</code>](#BaseCommand)
    * [new FormatCommand()](#new_FormatCommand_new)
    * [new FormatCommand()](#new_FormatCommand_new)
    * [.entryTools](#BaseCommand+entryTools) : <code>Object</code>
    * [.searchTools](#BaseCommand+searchTools) : <code>Object</code>
    * [.execute(obj, format)](#FormatCommand+execute)
    * [.executeCallbacks(key)](#BaseCommand+executeCallbacks)
    * [.setCallback(key, fn)](#BaseCommand+setCallback)

<a name="new_FormatCommand_new"></a>

### new FormatCommand()
Command for setting the archive ID

<a name="new_FormatCommand_new"></a>

### new FormatCommand()
Command for setting the archive format

<a name="BaseCommand+entryTools"></a>

### formatCommand.entryTools : <code>Object</code>
Entry tools module

**Kind**: instance property of [<code>FormatCommand</code>](#FormatCommand)  
**Overrides**: [<code>entryTools</code>](#BaseCommand+entryTools)  
<a name="BaseCommand+searchTools"></a>

### formatCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of [<code>FormatCommand</code>](#FormatCommand)  
**Overrides**: [<code>searchTools</code>](#BaseCommand+searchTools)  
<a name="FormatCommand+execute"></a>

### formatCommand.execute(obj, format)
Execute the setting of the format

**Kind**: instance method of [<code>FormatCommand</code>](#FormatCommand)  

| Param | Type | Description |
| --- | --- | --- |
| obj | [<code>ArchiveDataset</code>](#ArchiveDataset) | The archive dataset |
| format | <code>String</code> | The archive format |

<a name="BaseCommand+executeCallbacks"></a>

### formatCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of [<code>FormatCommand</code>](#FormatCommand)  
**Overrides**: [<code>executeCallbacks</code>](#BaseCommand+executeCallbacks)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |

**Example**  
```js
executeCallbacks("functionName", 1, 2, "three")
```
<a name="BaseCommand+setCallback"></a>

### formatCommand.setCallback(key, fn)
Add a callback for a key

**Kind**: instance method of [<code>FormatCommand</code>](#FormatCommand)  
**Overrides**: [<code>setCallback</code>](#BaseCommand+setCallback)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="BaseCommand"></a>

## BaseCommand
**Kind**: global class  

* [BaseCommand](#BaseCommand)
    * [new BaseCommand()](#new_BaseCommand_new)
    * [.entryTools](#BaseCommand+entryTools) : <code>Object</code>
    * [.searchTools](#BaseCommand+searchTools) : <code>Object</code>
    * [.entryTools](#BaseCommand+entryTools)
    * [.searchTools](#BaseCommand+searchTools)
    * [.executeCallbacks(key)](#BaseCommand+executeCallbacks)
    * [.setCallback(key, fn)](#BaseCommand+setCallback)

<a name="new_BaseCommand_new"></a>

### new BaseCommand()
Base command class

<a name="BaseCommand+entryTools"></a>

### baseCommand.entryTools : <code>Object</code>
Entry tools module

**Kind**: instance property of [<code>BaseCommand</code>](#BaseCommand)  
<a name="BaseCommand+searchTools"></a>

### baseCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of [<code>BaseCommand</code>](#BaseCommand)  
<a name="BaseCommand+entryTools"></a>

### baseCommand.entryTools
Set the entry tools module

**Kind**: instance property of [<code>BaseCommand</code>](#BaseCommand)  

| Param | Type | Description |
| --- | --- | --- |
| et | <code>Object</code> | The entry tools module |

<a name="BaseCommand+searchTools"></a>

### baseCommand.searchTools
Set the search tools module

**Kind**: instance property of [<code>BaseCommand</code>](#BaseCommand)  

| Param | Type | Description |
| --- | --- | --- |
| st | <code>Object</code> | The search tools module |

<a name="BaseCommand+executeCallbacks"></a>

### baseCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of [<code>BaseCommand</code>](#BaseCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |

**Example**  
```js
executeCallbacks("functionName", 1, 2, "three")
```
<a name="BaseCommand+setCallback"></a>

### baseCommand.setCallback(key, fn)
Add a callback for a key

**Kind**: instance method of [<code>BaseCommand</code>](#BaseCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="CommentCommand"></a>

## CommentCommand ⇐ [<code>BaseCommand</code>](#BaseCommand)
**Kind**: global class  
**Extends**: [<code>BaseCommand</code>](#BaseCommand)  

* [CommentCommand](#CommentCommand) ⇐ [<code>BaseCommand</code>](#BaseCommand)
    * [new CommentCommand()](#new_CommentCommand_new)
    * [.entryTools](#BaseCommand+entryTools) : <code>Object</code>
    * [.searchTools](#BaseCommand+searchTools) : <code>Object</code>
    * [.execute(obj, comment)](#CommentCommand+execute)
    * [.executeCallbacks(key)](#BaseCommand+executeCallbacks)
    * [.setCallback(key, fn)](#BaseCommand+setCallback)

<a name="new_CommentCommand_new"></a>

### new CommentCommand()
Command for archive comments

<a name="BaseCommand+entryTools"></a>

### commentCommand.entryTools : <code>Object</code>
Entry tools module

**Kind**: instance property of [<code>CommentCommand</code>](#CommentCommand)  
**Overrides**: [<code>entryTools</code>](#BaseCommand+entryTools)  
<a name="BaseCommand+searchTools"></a>

### commentCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of [<code>CommentCommand</code>](#CommentCommand)  
**Overrides**: [<code>searchTools</code>](#BaseCommand+searchTools)  
<a name="CommentCommand+execute"></a>

### commentCommand.execute(obj, comment)
Execute comment callbacks

**Kind**: instance method of [<code>CommentCommand</code>](#CommentCommand)  
**See**: BaseCommand.executeCallbacks  

| Param | Type | Description |
| --- | --- | --- |
| obj | [<code>ArchiveDataset</code>](#ArchiveDataset) | The archive dataset |
| comment | <code>String</code> | The comment |

<a name="BaseCommand+executeCallbacks"></a>

### commentCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of [<code>CommentCommand</code>](#CommentCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |

**Example**  
```js
executeCallbacks("functionName", 1, 2, "three")
```
<a name="BaseCommand+setCallback"></a>

### commentCommand.setCallback(key, fn)
Add a callback for a key

**Kind**: instance method of [<code>CommentCommand</code>](#CommentCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="CreateEntryCommand"></a>

## CreateEntryCommand ⇐ [<code>BaseCommand</code>](#BaseCommand)
**Kind**: global class  
**Extends**: [<code>BaseCommand</code>](#BaseCommand)  

* [CreateEntryCommand](#CreateEntryCommand) ⇐ [<code>BaseCommand</code>](#BaseCommand)
    * [new CreateEntryCommand()](#new_CreateEntryCommand_new)
    * [.entryTools](#BaseCommand+entryTools) : <code>Object</code>
    * [.searchTools](#BaseCommand+searchTools) : <code>Object</code>
    * [.execute(obj, groupID, entryID)](#CreateEntryCommand+execute)
    * [.executeCallbacks(key)](#BaseCommand+executeCallbacks)
    * [.setCallback(key, fn)](#BaseCommand+setCallback)

<a name="new_CreateEntryCommand_new"></a>

### new CreateEntryCommand()
Command for creating entries

<a name="BaseCommand+entryTools"></a>

### createEntryCommand.entryTools : <code>Object</code>
Entry tools module

**Kind**: instance property of [<code>CreateEntryCommand</code>](#CreateEntryCommand)  
**Overrides**: [<code>entryTools</code>](#BaseCommand+entryTools)  
<a name="BaseCommand+searchTools"></a>

### createEntryCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of [<code>CreateEntryCommand</code>](#CreateEntryCommand)  
**Overrides**: [<code>searchTools</code>](#BaseCommand+searchTools)  
<a name="CreateEntryCommand+execute"></a>

### createEntryCommand.execute(obj, groupID, entryID)
Execute the entry creation

**Kind**: instance method of [<code>CreateEntryCommand</code>](#CreateEntryCommand)  

| Param | Type | Description |
| --- | --- | --- |
| obj | [<code>ArchiveDataset</code>](#ArchiveDataset) | The archive dataset |
| groupID | <code>String</code> | The ID of the group to create within |
| entryID | <code>String</code> | The ID of the entry to create |

<a name="BaseCommand+executeCallbacks"></a>

### createEntryCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of [<code>CreateEntryCommand</code>](#CreateEntryCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |

**Example**  
```js
executeCallbacks("functionName", 1, 2, "three")
```
<a name="BaseCommand+setCallback"></a>

### createEntryCommand.setCallback(key, fn)
Add a callback for a key

**Kind**: instance method of [<code>CreateEntryCommand</code>](#CreateEntryCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="CreateGroupCommand"></a>

## CreateGroupCommand ⇐ [<code>BaseCommand</code>](#BaseCommand)
**Kind**: global class  
**Extends**: [<code>BaseCommand</code>](#BaseCommand)  

* [CreateGroupCommand](#CreateGroupCommand) ⇐ [<code>BaseCommand</code>](#BaseCommand)
    * [new CreateGroupCommand()](#new_CreateGroupCommand_new)
    * [.entryTools](#BaseCommand+entryTools) : <code>Object</code>
    * [.searchTools](#BaseCommand+searchTools) : <code>Object</code>
    * [.execute(obj, parentID, newID)](#CreateGroupCommand+execute)
    * [.executeCallbacks(key)](#BaseCommand+executeCallbacks)
    * [.setCallback(key, fn)](#BaseCommand+setCallback)

<a name="new_CreateGroupCommand_new"></a>

### new CreateGroupCommand()
Command for creating groups

<a name="BaseCommand+entryTools"></a>

### createGroupCommand.entryTools : <code>Object</code>
Entry tools module

**Kind**: instance property of [<code>CreateGroupCommand</code>](#CreateGroupCommand)  
**Overrides**: [<code>entryTools</code>](#BaseCommand+entryTools)  
<a name="BaseCommand+searchTools"></a>

### createGroupCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of [<code>CreateGroupCommand</code>](#CreateGroupCommand)  
**Overrides**: [<code>searchTools</code>](#BaseCommand+searchTools)  
<a name="CreateGroupCommand+execute"></a>

### createGroupCommand.execute(obj, parentID, newID)
Execute the group creation

**Kind**: instance method of [<code>CreateGroupCommand</code>](#CreateGroupCommand)  

| Param | Type | Description |
| --- | --- | --- |
| obj | [<code>ArchiveDataset</code>](#ArchiveDataset) | The archive dataset |
| parentID | <code>String</code> | The ID of the parent group to create within |
| newID | <code>String</code> | The ID of the new group |

<a name="BaseCommand+executeCallbacks"></a>

### createGroupCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of [<code>CreateGroupCommand</code>](#CreateGroupCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |

**Example**  
```js
executeCallbacks("functionName", 1, 2, "three")
```
<a name="BaseCommand+setCallback"></a>

### createGroupCommand.setCallback(key, fn)
Add a callback for a key

**Kind**: instance method of [<code>CreateGroupCommand</code>](#CreateGroupCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="DeleteArchiveAttributeCommand"></a>

## DeleteArchiveAttributeCommand ⇐ [<code>BaseCommand</code>](#BaseCommand)
**Kind**: global class  
**Extends**: [<code>BaseCommand</code>](#BaseCommand)  

* [DeleteArchiveAttributeCommand](#DeleteArchiveAttributeCommand) ⇐ [<code>BaseCommand</code>](#BaseCommand)
    * [new DeleteArchiveAttributeCommand()](#new_DeleteArchiveAttributeCommand_new)
    * [.entryTools](#BaseCommand+entryTools) : <code>Object</code>
    * [.searchTools](#BaseCommand+searchTools) : <code>Object</code>
    * [.execute(obj, attributeName)](#DeleteArchiveAttributeCommand+execute)
    * [.executeCallbacks(key)](#BaseCommand+executeCallbacks)
    * [.setCallback(key, fn)](#BaseCommand+setCallback)

<a name="new_DeleteArchiveAttributeCommand_new"></a>

### new DeleteArchiveAttributeCommand()
Command for deleting attributes stored on the archive object

<a name="BaseCommand+entryTools"></a>

### deleteArchiveAttributeCommand.entryTools : <code>Object</code>
Entry tools module

**Kind**: instance property of [<code>DeleteArchiveAttributeCommand</code>](#DeleteArchiveAttributeCommand)  
**Overrides**: [<code>entryTools</code>](#BaseCommand+entryTools)  
<a name="BaseCommand+searchTools"></a>

### deleteArchiveAttributeCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of [<code>DeleteArchiveAttributeCommand</code>](#DeleteArchiveAttributeCommand)  
**Overrides**: [<code>searchTools</code>](#BaseCommand+searchTools)  
<a name="DeleteArchiveAttributeCommand+execute"></a>

### deleteArchiveAttributeCommand.execute(obj, attributeName)
Execute the deletion of an attribute

**Kind**: instance method of [<code>DeleteArchiveAttributeCommand</code>](#DeleteArchiveAttributeCommand)  

| Param | Type | Description |
| --- | --- | --- |
| obj | [<code>ArchiveDataset</code>](#ArchiveDataset) | The archive dataset |
| attributeName | <code>String</code> | The name of the attribute to delete |

<a name="BaseCommand+executeCallbacks"></a>

### deleteArchiveAttributeCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of [<code>DeleteArchiveAttributeCommand</code>](#DeleteArchiveAttributeCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |

**Example**  
```js
executeCallbacks("functionName", 1, 2, "three")
```
<a name="BaseCommand+setCallback"></a>

### deleteArchiveAttributeCommand.setCallback(key, fn)
Add a callback for a key

**Kind**: instance method of [<code>DeleteArchiveAttributeCommand</code>](#DeleteArchiveAttributeCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="DeleteEntryAttributeCommand"></a>

## DeleteEntryAttributeCommand ⇐ [<code>BaseCommand</code>](#BaseCommand)
**Kind**: global class  
**Extends**: [<code>BaseCommand</code>](#BaseCommand)  

* [DeleteEntryAttributeCommand](#DeleteEntryAttributeCommand) ⇐ [<code>BaseCommand</code>](#BaseCommand)
    * [new DeleteEntryAttributeCommand()](#new_DeleteEntryAttributeCommand_new)
    * [.entryTools](#BaseCommand+entryTools) : <code>Object</code>
    * [.searchTools](#BaseCommand+searchTools) : <code>Object</code>
    * [.execute(obj, entryID, attributeName)](#DeleteEntryAttributeCommand+execute)
    * [.executeCallbacks(key)](#BaseCommand+executeCallbacks)
    * [.setCallback(key, fn)](#BaseCommand+setCallback)

<a name="new_DeleteEntryAttributeCommand_new"></a>

### new DeleteEntryAttributeCommand()
Command for the deletion of entry attributes

<a name="BaseCommand+entryTools"></a>

### deleteEntryAttributeCommand.entryTools : <code>Object</code>
Entry tools module

**Kind**: instance property of [<code>DeleteEntryAttributeCommand</code>](#DeleteEntryAttributeCommand)  
**Overrides**: [<code>entryTools</code>](#BaseCommand+entryTools)  
<a name="BaseCommand+searchTools"></a>

### deleteEntryAttributeCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of [<code>DeleteEntryAttributeCommand</code>](#DeleteEntryAttributeCommand)  
**Overrides**: [<code>searchTools</code>](#BaseCommand+searchTools)  
<a name="DeleteEntryAttributeCommand+execute"></a>

### deleteEntryAttributeCommand.execute(obj, entryID, attributeName)
Execute the deletion of an attribute

**Kind**: instance method of [<code>DeleteEntryAttributeCommand</code>](#DeleteEntryAttributeCommand)  

| Param | Type | Description |
| --- | --- | --- |
| obj | [<code>ArchiveDataset</code>](#ArchiveDataset) | The archive dataset |
| entryID | <code>String</code> | The ID of the entry |
| attributeName | <code>String</code> | The name of the attribute to delete |

<a name="BaseCommand+executeCallbacks"></a>

### deleteEntryAttributeCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of [<code>DeleteEntryAttributeCommand</code>](#DeleteEntryAttributeCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |

**Example**  
```js
executeCallbacks("functionName", 1, 2, "three")
```
<a name="BaseCommand+setCallback"></a>

### deleteEntryAttributeCommand.setCallback(key, fn)
Add a callback for a key

**Kind**: instance method of [<code>DeleteEntryAttributeCommand</code>](#DeleteEntryAttributeCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="DeleteEntryCommand"></a>

## DeleteEntryCommand ⇐ [<code>BaseCommand</code>](#BaseCommand)
**Kind**: global class  
**Extends**: [<code>BaseCommand</code>](#BaseCommand)  

* [DeleteEntryCommand](#DeleteEntryCommand) ⇐ [<code>BaseCommand</code>](#BaseCommand)
    * [new DeleteEntryCommand()](#new_DeleteEntryCommand_new)
    * [.entryTools](#BaseCommand+entryTools) : <code>Object</code>
    * [.searchTools](#BaseCommand+searchTools) : <code>Object</code>
    * [.execute(obj, entryID)](#DeleteEntryCommand+execute)
    * [.executeCallbacks(key)](#BaseCommand+executeCallbacks)
    * [.setCallback(key, fn)](#BaseCommand+setCallback)

<a name="new_DeleteEntryCommand_new"></a>

### new DeleteEntryCommand()
Command for the deletion of entries

<a name="BaseCommand+entryTools"></a>

### deleteEntryCommand.entryTools : <code>Object</code>
Entry tools module

**Kind**: instance property of [<code>DeleteEntryCommand</code>](#DeleteEntryCommand)  
**Overrides**: [<code>entryTools</code>](#BaseCommand+entryTools)  
<a name="BaseCommand+searchTools"></a>

### deleteEntryCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of [<code>DeleteEntryCommand</code>](#DeleteEntryCommand)  
**Overrides**: [<code>searchTools</code>](#BaseCommand+searchTools)  
<a name="DeleteEntryCommand+execute"></a>

### deleteEntryCommand.execute(obj, entryID)
Execute the entry deletion

**Kind**: instance method of [<code>DeleteEntryCommand</code>](#DeleteEntryCommand)  

| Param | Type | Description |
| --- | --- | --- |
| obj | [<code>ArchiveDataset</code>](#ArchiveDataset) | The archive dataset |
| entryID | <code>String</code> | The ID of the entry to delete |

<a name="BaseCommand+executeCallbacks"></a>

### deleteEntryCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of [<code>DeleteEntryCommand</code>](#DeleteEntryCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |

**Example**  
```js
executeCallbacks("functionName", 1, 2, "three")
```
<a name="BaseCommand+setCallback"></a>

### deleteEntryCommand.setCallback(key, fn)
Add a callback for a key

**Kind**: instance method of [<code>DeleteEntryCommand</code>](#DeleteEntryCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="DeleteEntryMetaCommand"></a>

## ~~DeleteEntryMetaCommand ⇐ [<code>BaseCommand</code>](#BaseCommand)~~
***Deprecated***

**Kind**: global class  
**Extends**: [<code>BaseCommand</code>](#BaseCommand)  

* ~~[DeleteEntryMetaCommand](#DeleteEntryMetaCommand) ⇐ [<code>BaseCommand</code>](#BaseCommand)~~
    * [new DeleteEntryMetaCommand()](#new_DeleteEntryMetaCommand_new)
    * [.entryTools](#BaseCommand+entryTools) : <code>Object</code>
    * [.searchTools](#BaseCommand+searchTools) : <code>Object</code>
    * [.execute(obj, entryID, propertyName)](#DeleteEntryMetaCommand+execute)
    * [.executeCallbacks(key)](#BaseCommand+executeCallbacks)
    * [.setCallback(key, fn)](#BaseCommand+setCallback)

<a name="new_DeleteEntryMetaCommand_new"></a>

### new DeleteEntryMetaCommand()
Command for the deletion of meta data on an entry

<a name="BaseCommand+entryTools"></a>

### deleteEntryMetaCommand.entryTools : <code>Object</code>
Entry tools module

**Kind**: instance property of [<code>DeleteEntryMetaCommand</code>](#DeleteEntryMetaCommand)  
**Overrides**: [<code>entryTools</code>](#BaseCommand+entryTools)  
<a name="BaseCommand+searchTools"></a>

### deleteEntryMetaCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of [<code>DeleteEntryMetaCommand</code>](#DeleteEntryMetaCommand)  
**Overrides**: [<code>searchTools</code>](#BaseCommand+searchTools)  
<a name="DeleteEntryMetaCommand+execute"></a>

### deleteEntryMetaCommand.execute(obj, entryID, propertyName)
Execute the deletion of a meta property

**Kind**: instance method of [<code>DeleteEntryMetaCommand</code>](#DeleteEntryMetaCommand)  

| Param | Type | Description |
| --- | --- | --- |
| obj | [<code>ArchiveDataset</code>](#ArchiveDataset) | The archive dataset |
| entryID | <code>String</code> | The ID of the entry |
| propertyName | <code>String</code> | The name of the meta property to delete |

<a name="BaseCommand+executeCallbacks"></a>

### deleteEntryMetaCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of [<code>DeleteEntryMetaCommand</code>](#DeleteEntryMetaCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |

**Example**  
```js
executeCallbacks("functionName", 1, 2, "three")
```
<a name="BaseCommand+setCallback"></a>

### deleteEntryMetaCommand.setCallback(key, fn)
Add a callback for a key

**Kind**: instance method of [<code>DeleteEntryMetaCommand</code>](#DeleteEntryMetaCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="DeleteEntryPropertyCommand"></a>

## DeleteEntryPropertyCommand ⇐ [<code>BaseCommand</code>](#BaseCommand)
Command for the deletion of property data on an entry

**Kind**: global class  
**Extends**: [<code>BaseCommand</code>](#BaseCommand)  

* [DeleteEntryPropertyCommand](#DeleteEntryPropertyCommand) ⇐ [<code>BaseCommand</code>](#BaseCommand)
    * [.entryTools](#BaseCommand+entryTools) : <code>Object</code>
    * [.searchTools](#BaseCommand+searchTools) : <code>Object</code>
    * [.execute(obj, entryID, propertyName)](#DeleteEntryPropertyCommand+execute)
    * [.executeCallbacks(key)](#BaseCommand+executeCallbacks)
    * [.setCallback(key, fn)](#BaseCommand+setCallback)

<a name="BaseCommand+entryTools"></a>

### deleteEntryPropertyCommand.entryTools : <code>Object</code>
Entry tools module

**Kind**: instance property of [<code>DeleteEntryPropertyCommand</code>](#DeleteEntryPropertyCommand)  
**Overrides**: [<code>entryTools</code>](#BaseCommand+entryTools)  
<a name="BaseCommand+searchTools"></a>

### deleteEntryPropertyCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of [<code>DeleteEntryPropertyCommand</code>](#DeleteEntryPropertyCommand)  
**Overrides**: [<code>searchTools</code>](#BaseCommand+searchTools)  
<a name="DeleteEntryPropertyCommand+execute"></a>

### deleteEntryPropertyCommand.execute(obj, entryID, propertyName)
Execute the deletion of a property

**Kind**: instance method of [<code>DeleteEntryPropertyCommand</code>](#DeleteEntryPropertyCommand)  

| Param | Type | Description |
| --- | --- | --- |
| obj | [<code>ArchiveDataset</code>](#ArchiveDataset) | The archive dataset |
| entryID | <code>String</code> | The ID of the entry |
| propertyName | <code>String</code> | The name of the property to delete |

<a name="BaseCommand+executeCallbacks"></a>

### deleteEntryPropertyCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of [<code>DeleteEntryPropertyCommand</code>](#DeleteEntryPropertyCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |

**Example**  
```js
executeCallbacks("functionName", 1, 2, "three")
```
<a name="BaseCommand+setCallback"></a>

### deleteEntryPropertyCommand.setCallback(key, fn)
Add a callback for a key

**Kind**: instance method of [<code>DeleteEntryPropertyCommand</code>](#DeleteEntryPropertyCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="DeleteGroupAttributeCommand"></a>

## DeleteGroupAttributeCommand ⇐ [<code>BaseCommand</code>](#BaseCommand)
**Kind**: global class  
**Extends**: [<code>BaseCommand</code>](#BaseCommand)  

* [DeleteGroupAttributeCommand](#DeleteGroupAttributeCommand) ⇐ [<code>BaseCommand</code>](#BaseCommand)
    * [new DeleteGroupAttributeCommand()](#new_DeleteGroupAttributeCommand_new)
    * [.entryTools](#BaseCommand+entryTools) : <code>Object</code>
    * [.searchTools](#BaseCommand+searchTools) : <code>Object</code>
    * [.execute(obj, groupID, attributeName)](#DeleteGroupAttributeCommand+execute)
    * [.executeCallbacks(key)](#BaseCommand+executeCallbacks)
    * [.setCallback(key, fn)](#BaseCommand+setCallback)

<a name="new_DeleteGroupAttributeCommand_new"></a>

### new DeleteGroupAttributeCommand()
Command for deleting group attributes

<a name="BaseCommand+entryTools"></a>

### deleteGroupAttributeCommand.entryTools : <code>Object</code>
Entry tools module

**Kind**: instance property of [<code>DeleteGroupAttributeCommand</code>](#DeleteGroupAttributeCommand)  
**Overrides**: [<code>entryTools</code>](#BaseCommand+entryTools)  
<a name="BaseCommand+searchTools"></a>

### deleteGroupAttributeCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of [<code>DeleteGroupAttributeCommand</code>](#DeleteGroupAttributeCommand)  
**Overrides**: [<code>searchTools</code>](#BaseCommand+searchTools)  
<a name="DeleteGroupAttributeCommand+execute"></a>

### deleteGroupAttributeCommand.execute(obj, groupID, attributeName)
Execute the deletion of a group attribute

**Kind**: instance method of [<code>DeleteGroupAttributeCommand</code>](#DeleteGroupAttributeCommand)  

| Param | Type | Description |
| --- | --- | --- |
| obj | [<code>ArchiveDataset</code>](#ArchiveDataset) | The archive dataset |
| groupID | <code>String</code> | The ID of the group |
| attributeName | <code>String</code> | The attribute to delete |

<a name="BaseCommand+executeCallbacks"></a>

### deleteGroupAttributeCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of [<code>DeleteGroupAttributeCommand</code>](#DeleteGroupAttributeCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |

**Example**  
```js
executeCallbacks("functionName", 1, 2, "three")
```
<a name="BaseCommand+setCallback"></a>

### deleteGroupAttributeCommand.setCallback(key, fn)
Add a callback for a key

**Kind**: instance method of [<code>DeleteGroupAttributeCommand</code>](#DeleteGroupAttributeCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="DeleteGroupCommand"></a>

## DeleteGroupCommand ⇐ [<code>BaseCommand</code>](#BaseCommand)
**Kind**: global class  
**Extends**: [<code>BaseCommand</code>](#BaseCommand)  

* [DeleteGroupCommand](#DeleteGroupCommand) ⇐ [<code>BaseCommand</code>](#BaseCommand)
    * [new DeleteGroupCommand()](#new_DeleteGroupCommand_new)
    * [.entryTools](#BaseCommand+entryTools) : <code>Object</code>
    * [.searchTools](#BaseCommand+searchTools) : <code>Object</code>
    * [.execute(obj, groupID)](#DeleteGroupCommand+execute)
    * [.executeCallbacks(key)](#BaseCommand+executeCallbacks)
    * [.setCallback(key, fn)](#BaseCommand+setCallback)

<a name="new_DeleteGroupCommand_new"></a>

### new DeleteGroupCommand()
Command for group deletion

<a name="BaseCommand+entryTools"></a>

### deleteGroupCommand.entryTools : <code>Object</code>
Entry tools module

**Kind**: instance property of [<code>DeleteGroupCommand</code>](#DeleteGroupCommand)  
**Overrides**: [<code>entryTools</code>](#BaseCommand+entryTools)  
<a name="BaseCommand+searchTools"></a>

### deleteGroupCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of [<code>DeleteGroupCommand</code>](#DeleteGroupCommand)  
**Overrides**: [<code>searchTools</code>](#BaseCommand+searchTools)  
<a name="DeleteGroupCommand+execute"></a>

### deleteGroupCommand.execute(obj, groupID)
Execute the deletion of a group

**Kind**: instance method of [<code>DeleteGroupCommand</code>](#DeleteGroupCommand)  

| Param | Type | Description |
| --- | --- | --- |
| obj | [<code>ArchiveDataset</code>](#ArchiveDataset) | The archive dataset |
| groupID | <code>String</code> | The ID of the group to delete |

<a name="BaseCommand+executeCallbacks"></a>

### deleteGroupCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of [<code>DeleteGroupCommand</code>](#DeleteGroupCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |

**Example**  
```js
executeCallbacks("functionName", 1, 2, "three")
```
<a name="BaseCommand+setCallback"></a>

### deleteGroupCommand.setCallback(key, fn)
Add a callback for a key

**Kind**: instance method of [<code>DeleteGroupCommand</code>](#DeleteGroupCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="FormatCommand"></a>

## FormatCommand ⇐ [<code>BaseCommand</code>](#BaseCommand)
**Kind**: global class  
**Extends**: [<code>BaseCommand</code>](#BaseCommand)  

* [FormatCommand](#FormatCommand) ⇐ [<code>BaseCommand</code>](#BaseCommand)
    * [new FormatCommand()](#new_FormatCommand_new)
    * [new FormatCommand()](#new_FormatCommand_new)
    * [.entryTools](#BaseCommand+entryTools) : <code>Object</code>
    * [.searchTools](#BaseCommand+searchTools) : <code>Object</code>
    * [.execute(obj, format)](#FormatCommand+execute)
    * [.executeCallbacks(key)](#BaseCommand+executeCallbacks)
    * [.setCallback(key, fn)](#BaseCommand+setCallback)

<a name="new_FormatCommand_new"></a>

### new FormatCommand()
Command for setting the archive ID

<a name="new_FormatCommand_new"></a>

### new FormatCommand()
Command for setting the archive format

<a name="BaseCommand+entryTools"></a>

### formatCommand.entryTools : <code>Object</code>
Entry tools module

**Kind**: instance property of [<code>FormatCommand</code>](#FormatCommand)  
**Overrides**: [<code>entryTools</code>](#BaseCommand+entryTools)  
<a name="BaseCommand+searchTools"></a>

### formatCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of [<code>FormatCommand</code>](#FormatCommand)  
**Overrides**: [<code>searchTools</code>](#BaseCommand+searchTools)  
<a name="FormatCommand+execute"></a>

### formatCommand.execute(obj, format)
Execute the setting of the format

**Kind**: instance method of [<code>FormatCommand</code>](#FormatCommand)  

| Param | Type | Description |
| --- | --- | --- |
| obj | [<code>ArchiveDataset</code>](#ArchiveDataset) | The archive dataset |
| format | <code>String</code> | The archive format |

<a name="BaseCommand+executeCallbacks"></a>

### formatCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of [<code>FormatCommand</code>](#FormatCommand)  
**Overrides**: [<code>executeCallbacks</code>](#BaseCommand+executeCallbacks)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |

**Example**  
```js
executeCallbacks("functionName", 1, 2, "three")
```
<a name="BaseCommand+setCallback"></a>

### formatCommand.setCallback(key, fn)
Add a callback for a key

**Kind**: instance method of [<code>FormatCommand</code>](#FormatCommand)  
**Overrides**: [<code>setCallback</code>](#BaseCommand+setCallback)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="MoveEntryCommand"></a>

## MoveEntryCommand ⇐ [<code>BaseCommand</code>](#BaseCommand)
**Kind**: global class  
**Extends**: [<code>BaseCommand</code>](#BaseCommand)  

* [MoveEntryCommand](#MoveEntryCommand) ⇐ [<code>BaseCommand</code>](#BaseCommand)
    * [new MoveEntryCommand()](#new_MoveEntryCommand_new)
    * [.entryTools](#BaseCommand+entryTools) : <code>Object</code>
    * [.searchTools](#BaseCommand+searchTools) : <code>Object</code>
    * [.execute(obj, entryID, targetGroupID)](#MoveEntryCommand+execute)
    * [.executeCallbacks(key)](#BaseCommand+executeCallbacks)
    * [.setCallback(key, fn)](#BaseCommand+setCallback)

<a name="new_MoveEntryCommand_new"></a>

### new MoveEntryCommand()
Command for the moving of entries

<a name="BaseCommand+entryTools"></a>

### moveEntryCommand.entryTools : <code>Object</code>
Entry tools module

**Kind**: instance property of [<code>MoveEntryCommand</code>](#MoveEntryCommand)  
**Overrides**: [<code>entryTools</code>](#BaseCommand+entryTools)  
<a name="BaseCommand+searchTools"></a>

### moveEntryCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of [<code>MoveEntryCommand</code>](#MoveEntryCommand)  
**Overrides**: [<code>searchTools</code>](#BaseCommand+searchTools)  
<a name="MoveEntryCommand+execute"></a>

### moveEntryCommand.execute(obj, entryID, targetGroupID)
Execute the move

**Kind**: instance method of [<code>MoveEntryCommand</code>](#MoveEntryCommand)  

| Param | Type | Description |
| --- | --- | --- |
| obj | [<code>ArchiveDataset</code>](#ArchiveDataset) | The archive dataset |
| entryID | <code>String</code> | The ID of the entry to move |
| targetGroupID | <code>String</code> | The ID of the group to move the entry to |

<a name="BaseCommand+executeCallbacks"></a>

### moveEntryCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of [<code>MoveEntryCommand</code>](#MoveEntryCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |

**Example**  
```js
executeCallbacks("functionName", 1, 2, "three")
```
<a name="BaseCommand+setCallback"></a>

### moveEntryCommand.setCallback(key, fn)
Add a callback for a key

**Kind**: instance method of [<code>MoveEntryCommand</code>](#MoveEntryCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="MoveGroupCommand"></a>

## MoveGroupCommand ⇐ [<code>BaseCommand</code>](#BaseCommand)
**Kind**: global class  
**Extends**: [<code>BaseCommand</code>](#BaseCommand)  

* [MoveGroupCommand](#MoveGroupCommand) ⇐ [<code>BaseCommand</code>](#BaseCommand)
    * [new MoveGroupCommand()](#new_MoveGroupCommand_new)
    * [.entryTools](#BaseCommand+entryTools) : <code>Object</code>
    * [.searchTools](#BaseCommand+searchTools) : <code>Object</code>
    * [.execute(obj, groupID, targetGroupID)](#MoveGroupCommand+execute)
    * [.executeCallbacks(key)](#BaseCommand+executeCallbacks)
    * [.setCallback(key, fn)](#BaseCommand+setCallback)

<a name="new_MoveGroupCommand_new"></a>

### new MoveGroupCommand()
Command for moving groups

<a name="BaseCommand+entryTools"></a>

### moveGroupCommand.entryTools : <code>Object</code>
Entry tools module

**Kind**: instance property of [<code>MoveGroupCommand</code>](#MoveGroupCommand)  
**Overrides**: [<code>entryTools</code>](#BaseCommand+entryTools)  
<a name="BaseCommand+searchTools"></a>

### moveGroupCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of [<code>MoveGroupCommand</code>](#MoveGroupCommand)  
**Overrides**: [<code>searchTools</code>](#BaseCommand+searchTools)  
<a name="MoveGroupCommand+execute"></a>

### moveGroupCommand.execute(obj, groupID, targetGroupID)
Execute the move

**Kind**: instance method of [<code>MoveGroupCommand</code>](#MoveGroupCommand)  

| Param | Type | Description |
| --- | --- | --- |
| obj | [<code>ArchiveDataset</code>](#ArchiveDataset) | The archive dataset |
| groupID | <code>String</code> | The ID of the group to move |
| targetGroupID | <code>String</code> | The ID of the group to move to |

<a name="BaseCommand+executeCallbacks"></a>

### moveGroupCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of [<code>MoveGroupCommand</code>](#MoveGroupCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |

**Example**  
```js
executeCallbacks("functionName", 1, 2, "three")
```
<a name="BaseCommand+setCallback"></a>

### moveGroupCommand.setCallback(key, fn)
Add a callback for a key

**Kind**: instance method of [<code>MoveGroupCommand</code>](#MoveGroupCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="PadCommand"></a>

## PadCommand ⇐ [<code>BaseCommand</code>](#BaseCommand)
**Kind**: global class  
**Extends**: [<code>BaseCommand</code>](#BaseCommand)  

* [PadCommand](#PadCommand) ⇐ [<code>BaseCommand</code>](#BaseCommand)
    * [new PadCommand()](#new_PadCommand_new)
    * [.entryTools](#BaseCommand+entryTools) : <code>Object</code>
    * [.searchTools](#BaseCommand+searchTools) : <code>Object</code>
    * [.executeCallbacks(key)](#BaseCommand+executeCallbacks)
    * [.setCallback(key, fn)](#BaseCommand+setCallback)

<a name="new_PadCommand_new"></a>

### new PadCommand()
Command for padding
Padding is used to identify "blocks" of history.

<a name="BaseCommand+entryTools"></a>

### padCommand.entryTools : <code>Object</code>
Entry tools module

**Kind**: instance property of [<code>PadCommand</code>](#PadCommand)  
**Overrides**: [<code>entryTools</code>](#BaseCommand+entryTools)  
<a name="BaseCommand+searchTools"></a>

### padCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of [<code>PadCommand</code>](#PadCommand)  
**Overrides**: [<code>searchTools</code>](#BaseCommand+searchTools)  
<a name="BaseCommand+executeCallbacks"></a>

### padCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of [<code>PadCommand</code>](#PadCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |

**Example**  
```js
executeCallbacks("functionName", 1, 2, "three")
```
<a name="BaseCommand+setCallback"></a>

### padCommand.setCallback(key, fn)
Add a callback for a key

**Kind**: instance method of [<code>PadCommand</code>](#PadCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="SetArchiveAttributeCommand"></a>

## SetArchiveAttributeCommand ⇐ [<code>BaseCommand</code>](#BaseCommand)
**Kind**: global class  
**Extends**: [<code>BaseCommand</code>](#BaseCommand)  

* [SetArchiveAttributeCommand](#SetArchiveAttributeCommand) ⇐ [<code>BaseCommand</code>](#BaseCommand)
    * [new SetArchiveAttributeCommand()](#new_SetArchiveAttributeCommand_new)
    * [.entryTools](#BaseCommand+entryTools) : <code>Object</code>
    * [.searchTools](#BaseCommand+searchTools) : <code>Object</code>
    * [.execute(obj, attributeName, value)](#SetArchiveAttributeCommand+execute)
    * [.executeCallbacks(key)](#BaseCommand+executeCallbacks)
    * [.setCallback(key, fn)](#BaseCommand+setCallback)

<a name="new_SetArchiveAttributeCommand_new"></a>

### new SetArchiveAttributeCommand()
Command for setting archive attributes

<a name="BaseCommand+entryTools"></a>

### setArchiveAttributeCommand.entryTools : <code>Object</code>
Entry tools module

**Kind**: instance property of [<code>SetArchiveAttributeCommand</code>](#SetArchiveAttributeCommand)  
**Overrides**: [<code>entryTools</code>](#BaseCommand+entryTools)  
<a name="BaseCommand+searchTools"></a>

### setArchiveAttributeCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of [<code>SetArchiveAttributeCommand</code>](#SetArchiveAttributeCommand)  
**Overrides**: [<code>searchTools</code>](#BaseCommand+searchTools)  
<a name="SetArchiveAttributeCommand+execute"></a>

### setArchiveAttributeCommand.execute(obj, attributeName, value)
Execute the setting of an attribute

**Kind**: instance method of [<code>SetArchiveAttributeCommand</code>](#SetArchiveAttributeCommand)  

| Param | Type | Description |
| --- | --- | --- |
| obj | [<code>ArchiveDataset</code>](#ArchiveDataset) | The archive dataset |
| attributeName | <code>String</code> | The name of the attribute to set |
| value | <code>String</code> | The value to set |

<a name="BaseCommand+executeCallbacks"></a>

### setArchiveAttributeCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of [<code>SetArchiveAttributeCommand</code>](#SetArchiveAttributeCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |

**Example**  
```js
executeCallbacks("functionName", 1, 2, "three")
```
<a name="BaseCommand+setCallback"></a>

### setArchiveAttributeCommand.setCallback(key, fn)
Add a callback for a key

**Kind**: instance method of [<code>SetArchiveAttributeCommand</code>](#SetArchiveAttributeCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="SetEntryAttributeCommand"></a>

## SetEntryAttributeCommand ⇐ [<code>BaseCommand</code>](#BaseCommand)
**Kind**: global class  
**Extends**: [<code>BaseCommand</code>](#BaseCommand)  

* [SetEntryAttributeCommand](#SetEntryAttributeCommand) ⇐ [<code>BaseCommand</code>](#BaseCommand)
    * [new SetEntryAttributeCommand()](#new_SetEntryAttributeCommand_new)
    * [.entryTools](#BaseCommand+entryTools) : <code>Object</code>
    * [.searchTools](#BaseCommand+searchTools) : <code>Object</code>
    * [.execute(obj, entryID, attributeName, value)](#SetEntryAttributeCommand+execute)
    * [.executeCallbacks(key)](#BaseCommand+executeCallbacks)
    * [.setCallback(key, fn)](#BaseCommand+setCallback)

<a name="new_SetEntryAttributeCommand_new"></a>

### new SetEntryAttributeCommand()
Command for setting entry attributes

<a name="BaseCommand+entryTools"></a>

### setEntryAttributeCommand.entryTools : <code>Object</code>
Entry tools module

**Kind**: instance property of [<code>SetEntryAttributeCommand</code>](#SetEntryAttributeCommand)  
**Overrides**: [<code>entryTools</code>](#BaseCommand+entryTools)  
<a name="BaseCommand+searchTools"></a>

### setEntryAttributeCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of [<code>SetEntryAttributeCommand</code>](#SetEntryAttributeCommand)  
**Overrides**: [<code>searchTools</code>](#BaseCommand+searchTools)  
<a name="SetEntryAttributeCommand+execute"></a>

### setEntryAttributeCommand.execute(obj, entryID, attributeName, value)
Execute the setting of an attribute

**Kind**: instance method of [<code>SetEntryAttributeCommand</code>](#SetEntryAttributeCommand)  

| Param | Type | Description |
| --- | --- | --- |
| obj | [<code>ArchiveDataset</code>](#ArchiveDataset) | The archive dataset |
| entryID | <code>String</code> | The ID of the entry |
| attributeName | <code>String</code> | The name of the attribute to set |
| value | <code>String</code> | The value to set |

<a name="BaseCommand+executeCallbacks"></a>

### setEntryAttributeCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of [<code>SetEntryAttributeCommand</code>](#SetEntryAttributeCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |

**Example**  
```js
executeCallbacks("functionName", 1, 2, "three")
```
<a name="BaseCommand+setCallback"></a>

### setEntryAttributeCommand.setCallback(key, fn)
Add a callback for a key

**Kind**: instance method of [<code>SetEntryAttributeCommand</code>](#SetEntryAttributeCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="SetEntryMetaCommand"></a>

## ~~SetEntryMetaCommand ⇐ [<code>BaseCommand</code>](#BaseCommand)~~
***Deprecated***

**Kind**: global class  
**Extends**: [<code>BaseCommand</code>](#BaseCommand)  

* ~~[SetEntryMetaCommand](#SetEntryMetaCommand) ⇐ [<code>BaseCommand</code>](#BaseCommand)~~
    * [new SetEntryMetaCommand()](#new_SetEntryMetaCommand_new)
    * [.entryTools](#BaseCommand+entryTools) : <code>Object</code>
    * [.searchTools](#BaseCommand+searchTools) : <code>Object</code>
    * [.execute(obj, entryID, propertyName, value)](#SetEntryMetaCommand+execute)
    * [.executeCallbacks(key)](#BaseCommand+executeCallbacks)
    * [.setCallback(key, fn)](#BaseCommand+setCallback)

<a name="new_SetEntryMetaCommand_new"></a>

### new SetEntryMetaCommand()
Command for setting meta properties on entries

<a name="BaseCommand+entryTools"></a>

### setEntryMetaCommand.entryTools : <code>Object</code>
Entry tools module

**Kind**: instance property of [<code>SetEntryMetaCommand</code>](#SetEntryMetaCommand)  
**Overrides**: [<code>entryTools</code>](#BaseCommand+entryTools)  
<a name="BaseCommand+searchTools"></a>

### setEntryMetaCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of [<code>SetEntryMetaCommand</code>](#SetEntryMetaCommand)  
**Overrides**: [<code>searchTools</code>](#BaseCommand+searchTools)  
<a name="SetEntryMetaCommand+execute"></a>

### setEntryMetaCommand.execute(obj, entryID, propertyName, value)
Execute the setting of a meta property

**Kind**: instance method of [<code>SetEntryMetaCommand</code>](#SetEntryMetaCommand)  

| Param | Type | Description |
| --- | --- | --- |
| obj | [<code>ArchiveDataset</code>](#ArchiveDataset) | The archive dataset |
| entryID | <code>String</code> | The ID of the entry |
| propertyName | <code>String</code> | The name of the meta property to set |
| value | <code>String</code> | The value to set |

<a name="BaseCommand+executeCallbacks"></a>

### setEntryMetaCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of [<code>SetEntryMetaCommand</code>](#SetEntryMetaCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |

**Example**  
```js
executeCallbacks("functionName", 1, 2, "three")
```
<a name="BaseCommand+setCallback"></a>

### setEntryMetaCommand.setCallback(key, fn)
Add a callback for a key

**Kind**: instance method of [<code>SetEntryMetaCommand</code>](#SetEntryMetaCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="SetEntryPropertyCommand"></a>

## SetEntryPropertyCommand ⇐ [<code>BaseCommand</code>](#BaseCommand)
**Kind**: global class  
**Extends**: [<code>BaseCommand</code>](#BaseCommand)  

* [SetEntryPropertyCommand](#SetEntryPropertyCommand) ⇐ [<code>BaseCommand</code>](#BaseCommand)
    * [new SetEntryPropertyCommand()](#new_SetEntryPropertyCommand_new)
    * [.entryTools](#BaseCommand+entryTools) : <code>Object</code>
    * [.searchTools](#BaseCommand+searchTools) : <code>Object</code>
    * [.execute(obj, entryID, propertyName, value)](#SetEntryPropertyCommand+execute)
    * [.executeCallbacks(key)](#BaseCommand+executeCallbacks)
    * [.setCallback(key, fn)](#BaseCommand+setCallback)

<a name="new_SetEntryPropertyCommand_new"></a>

### new SetEntryPropertyCommand()
Command for setting entry properties

<a name="BaseCommand+entryTools"></a>

### setEntryPropertyCommand.entryTools : <code>Object</code>
Entry tools module

**Kind**: instance property of [<code>SetEntryPropertyCommand</code>](#SetEntryPropertyCommand)  
**Overrides**: [<code>entryTools</code>](#BaseCommand+entryTools)  
<a name="BaseCommand+searchTools"></a>

### setEntryPropertyCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of [<code>SetEntryPropertyCommand</code>](#SetEntryPropertyCommand)  
**Overrides**: [<code>searchTools</code>](#BaseCommand+searchTools)  
<a name="SetEntryPropertyCommand+execute"></a>

### setEntryPropertyCommand.execute(obj, entryID, propertyName, value)
Execute the setting of a property

**Kind**: instance method of [<code>SetEntryPropertyCommand</code>](#SetEntryPropertyCommand)  

| Param | Type | Description |
| --- | --- | --- |
| obj | [<code>ArchiveDataset</code>](#ArchiveDataset) | The archive dataset |
| entryID | <code>String</code> | The ID of the entry |
| propertyName | <code>String</code> | The name of the property to set |
| value | <code>String</code> | The value to set |

<a name="BaseCommand+executeCallbacks"></a>

### setEntryPropertyCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of [<code>SetEntryPropertyCommand</code>](#SetEntryPropertyCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |

**Example**  
```js
executeCallbacks("functionName", 1, 2, "three")
```
<a name="BaseCommand+setCallback"></a>

### setEntryPropertyCommand.setCallback(key, fn)
Add a callback for a key

**Kind**: instance method of [<code>SetEntryPropertyCommand</code>](#SetEntryPropertyCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="SetGroupAttributeCommand"></a>

## SetGroupAttributeCommand ⇐ [<code>BaseCommand</code>](#BaseCommand)
**Kind**: global class  
**Extends**: [<code>BaseCommand</code>](#BaseCommand)  

* [SetGroupAttributeCommand](#SetGroupAttributeCommand) ⇐ [<code>BaseCommand</code>](#BaseCommand)
    * [new SetGroupAttributeCommand()](#new_SetGroupAttributeCommand_new)
    * [.entryTools](#BaseCommand+entryTools) : <code>Object</code>
    * [.searchTools](#BaseCommand+searchTools) : <code>Object</code>
    * [.execute(obj, groupID, attributeName, value)](#SetGroupAttributeCommand+execute)
    * [.executeCallbacks(key)](#BaseCommand+executeCallbacks)
    * [.setCallback(key, fn)](#BaseCommand+setCallback)

<a name="new_SetGroupAttributeCommand_new"></a>

### new SetGroupAttributeCommand()
Command for setting group attributes

<a name="BaseCommand+entryTools"></a>

### setGroupAttributeCommand.entryTools : <code>Object</code>
Entry tools module

**Kind**: instance property of [<code>SetGroupAttributeCommand</code>](#SetGroupAttributeCommand)  
**Overrides**: [<code>entryTools</code>](#BaseCommand+entryTools)  
<a name="BaseCommand+searchTools"></a>

### setGroupAttributeCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of [<code>SetGroupAttributeCommand</code>](#SetGroupAttributeCommand)  
**Overrides**: [<code>searchTools</code>](#BaseCommand+searchTools)  
<a name="SetGroupAttributeCommand+execute"></a>

### setGroupAttributeCommand.execute(obj, groupID, attributeName, value)
Execute the setting of an attribute

**Kind**: instance method of [<code>SetGroupAttributeCommand</code>](#SetGroupAttributeCommand)  

| Param | Type | Description |
| --- | --- | --- |
| obj | [<code>ArchiveDataset</code>](#ArchiveDataset) | The archive dataset |
| groupID | <code>String</code> | The ID of the group |
| attributeName | <code>String</code> | The name of the attribute to set |
| value | <code>String</code> | The value to set |

<a name="BaseCommand+executeCallbacks"></a>

### setGroupAttributeCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of [<code>SetGroupAttributeCommand</code>](#SetGroupAttributeCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |

**Example**  
```js
executeCallbacks("functionName", 1, 2, "three")
```
<a name="BaseCommand+setCallback"></a>

### setGroupAttributeCommand.setCallback(key, fn)
Add a callback for a key

**Kind**: instance method of [<code>SetGroupAttributeCommand</code>](#SetGroupAttributeCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="TitleGroupCommand"></a>

## TitleGroupCommand ⇐ [<code>BaseCommand</code>](#BaseCommand)
**Kind**: global class  
**Extends**: [<code>BaseCommand</code>](#BaseCommand)  

* [TitleGroupCommand](#TitleGroupCommand) ⇐ [<code>BaseCommand</code>](#BaseCommand)
    * [new TitleGroupCommand()](#new_TitleGroupCommand_new)
    * [.entryTools](#BaseCommand+entryTools) : <code>Object</code>
    * [.searchTools](#BaseCommand+searchTools) : <code>Object</code>
    * [.execute(obj, groupID, title)](#TitleGroupCommand+execute)
    * [.executeCallbacks(key)](#BaseCommand+executeCallbacks)
    * [.setCallback(key, fn)](#BaseCommand+setCallback)

<a name="new_TitleGroupCommand_new"></a>

### new TitleGroupCommand()
Command for titling groups

<a name="BaseCommand+entryTools"></a>

### titleGroupCommand.entryTools : <code>Object</code>
Entry tools module

**Kind**: instance property of [<code>TitleGroupCommand</code>](#TitleGroupCommand)  
**Overrides**: [<code>entryTools</code>](#BaseCommand+entryTools)  
<a name="BaseCommand+searchTools"></a>

### titleGroupCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of [<code>TitleGroupCommand</code>](#TitleGroupCommand)  
**Overrides**: [<code>searchTools</code>](#BaseCommand+searchTools)  
<a name="TitleGroupCommand+execute"></a>

### titleGroupCommand.execute(obj, groupID, title)
Execute the setting of the title

**Kind**: instance method of [<code>TitleGroupCommand</code>](#TitleGroupCommand)  

| Param | Type | Description |
| --- | --- | --- |
| obj | [<code>ArchiveDataset</code>](#ArchiveDataset) | The archive dataset |
| groupID | <code>String</code> | The ID of the group to set |
| title | <code>String</code> | The title to set |

<a name="BaseCommand+executeCallbacks"></a>

### titleGroupCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of [<code>TitleGroupCommand</code>](#TitleGroupCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |

**Example**  
```js
executeCallbacks("functionName", 1, 2, "three")
```
<a name="BaseCommand+setCallback"></a>

### titleGroupCommand.setCallback(key, fn)
Add a callback for a key

**Kind**: instance method of [<code>TitleGroupCommand</code>](#TitleGroupCommand)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="EntryCollection"></a>

## EntryCollection : <code>Object</code>
**Kind**: global mixin  

* [EntryCollection](#EntryCollection) : <code>Object</code>
    * [.findEntriesByMeta](#EntryCollection.findEntriesByMeta) ⇒ <code>Array.&lt;Entry&gt;</code>
    * [.findEntriesByProperty](#EntryCollection.findEntriesByProperty) ⇒ <code>Array.&lt;Entry&gt;</code>
    * [.inst.findEntryByID(id)](#EntryCollection.inst.findEntryByID) ⇒ <code>null</code> \| <code>Entry</code>

<a name="EntryCollection.findEntriesByMeta"></a>

### EntryCollection.findEntriesByMeta ⇒ <code>Array.&lt;Entry&gt;</code>
Find entries that match a certain meta property

**Kind**: static property of [<code>EntryCollection</code>](#EntryCollection)  
**Returns**: <code>Array.&lt;Entry&gt;</code> - An array of found entries  

| Param | Type | Description |
| --- | --- | --- |
| metaName | <code>String</code> | The meta property to search for |
| value | <code>RegExp</code> \| <code>string</code> | The value to search for |

<a name="EntryCollection.findEntriesByProperty"></a>

### EntryCollection.findEntriesByProperty ⇒ <code>Array.&lt;Entry&gt;</code>
Find all entries that match a certain property

**Kind**: static property of [<code>EntryCollection</code>](#EntryCollection)  
**Returns**: <code>Array.&lt;Entry&gt;</code> - An array of found extries  

| Param | Type | Description |
| --- | --- | --- |
| property | <code>string</code> | The property to search with |
| value | <code>RegExp</code> \| <code>string</code> | The value to search for |

<a name="EntryCollection.inst.findEntryByID"></a>

### EntryCollection.inst.findEntryByID(id) ⇒ <code>null</code> \| <code>Entry</code>
Find an entry by its ID

**Kind**: static method of [<code>EntryCollection</code>](#EntryCollection)  
**Returns**: <code>null</code> \| <code>Entry</code> - Null if not found, or the Entry instance  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The ID to search for |

<a name="GroupCollection"></a>

## GroupCollection : <code>Object</code>
**Kind**: global mixin  

* [GroupCollection](#GroupCollection) : <code>Object</code>
    * [.findGroupByID](#GroupCollection.findGroupByID) ⇒ <code>Group</code> \| <code>null</code>
    * [.findGroupsByTitle](#GroupCollection.findGroupsByTitle) ⇒ <code>Array.&lt;Group&gt;</code>

<a name="GroupCollection.findGroupByID"></a>

### GroupCollection.findGroupByID ⇒ <code>Group</code> \| <code>null</code>
Find a group by its ID

**Kind**: static property of [<code>GroupCollection</code>](#GroupCollection)  
**Returns**: <code>Group</code> \| <code>null</code> - The group or null if not found  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The group ID to search for |

<a name="GroupCollection.findGroupsByTitle"></a>

### GroupCollection.findGroupsByTitle ⇒ <code>Array.&lt;Group&gt;</code>
Find groups by their title

**Kind**: static property of [<code>GroupCollection</code>](#GroupCollection)  
**Returns**: <code>Array.&lt;Group&gt;</code> - An array of groups  

| Param | Type | Description |
| --- | --- | --- |
| title | <code>String</code> \| <code>RegExp</code> | The group title |

<a name="deriveKeyFromPassword"></a>

## deriveKeyFromPassword(password, salt, rounds, bits) ⇒ <code>Promise.&lt;ArrayBuffer&gt;</code>
Derive a key from a password

**Kind**: global function  
**Returns**: <code>Promise.&lt;ArrayBuffer&gt;</code> - A promise that resolves with an ArrayBuffer  
**See**: checkBrowserSupport  

| Param | Type | Description |
| --- | --- | --- |
| password | <code>String</code> | The password |
| salt | <code>String</code> | The salt |
| rounds | <code>Number</code> | The number of derivation rounds |
| bits | <code>Number</code> | The number of bits for the key |

<a name="patchCorePBKDF"></a>

## patchCorePBKDF([handler])
Perform patching of the PBKDF2 function in iocane

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| [handler] | <code>function</code> | Optionally override the internal PBKDF2 engine |

<a name="credentialsToDatasource"></a>

## credentialsToDatasource(sourceCredentials) ⇒ <code>Promise.&lt;{datasource, credentials}&gt;</code>
Convert credentials of a remote archive to a datasource

**Kind**: global function  
**Returns**: <code>Promise.&lt;{datasource, credentials}&gt;</code> - A promise that resolves with the datasource and
 source credentials  

| Param | Type | Description |
| --- | --- | --- |
| sourceCredentials | <code>Credentials</code> | The remote credentials. The credentials must  have a type field and datasource information field |

<a name="credentialsToSource"></a>

## credentialsToSource(sourceCredentials, archiveCredentials, [initialise]) ⇒ <code>Promise.&lt;Object&gt;</code>
Convert credentials to a source for the ArchiveManager

**Kind**: global function  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A promise that resolves with an object containing a workspace,
 the source credentials and archive credentials  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| sourceCredentials | <code>Credentials</code> |  | The remote archive credentials |
| archiveCredentials | <code>Credentials</code> |  | Credentials for unlocking the archive |
| [initialise] | <code>Boolean</code> | <code>false</code> | Whether or not to initialise a new archive (defaults to false) |

<a name="dedupe"></a>

## dedupe(arr) ⇒ <code>Array</code>
De-dupe an array

**Kind**: global function  
**Returns**: <code>Array</code> - The de-duped array  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | The array |

<a name="createFieldDescriptor"></a>

## createFieldDescriptor(entry, title, entryPropertyType, entryPropertyName, options) ⇒ [<code>EntryFacadeField</code>](#EntryFacadeField)
Create a descriptor for a field to be used within a facade

**Kind**: global function  
**Returns**: [<code>EntryFacadeField</code>](#EntryFacadeField) - The field descriptor  

| Param | Type | Description |
| --- | --- | --- |
| entry | <code>Entry</code> | The entry instance to process |
| title | <code>String</code> | The field title |
| entryPropertyType | <code>String</code> | The type of entry property (property/meta/attribute) |
| entryPropertyName | <code>String</code> | The name of the property |
| options | <code>Object</code> | The options for the field |

<a name="getEntryValue"></a>

## getEntryValue(entry, property, name) ⇒ <code>String</code>
Get a value on an entry for a specific property type

**Kind**: global function  
**Returns**: <code>String</code> - The property value  
**Throws**:

- <code>Error</code> Throws for unknown property types


| Param | Type | Description |
| --- | --- | --- |
| entry | <code>Entry</code> | The entry instance |
| property | <code>String</code> | The type of entry property (property/meta/attribute) |
| name | <code>String</code> | The property name |

<a name="getValidProperties"></a>

## getValidProperties() ⇒ <code>Array.&lt;String&gt;</code>
Get an array of valid property names

**Kind**: global function  
**Returns**: <code>Array.&lt;String&gt;</code> - An array of names  
<a name="isValidProperty"></a>

## isValidProperty(name) ⇒ <code>Boolean</code>
Check if a property name is valid

**Kind**: global function  
**Returns**: <code>Boolean</code> - True if the name is valid  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name to check |

<a name="findEntriesByCheck"></a>

## findEntriesByCheck(groups, compareFn) ⇒ <code>Array.&lt;Entry&gt;</code>
Find entry instances by filtering with a compare function

**Kind**: global function  
**Returns**: <code>Array.&lt;Entry&gt;</code> - An array of found entries  

| Param | Type | Description |
| --- | --- | --- |
| groups | <code>Array.&lt;Group&gt;</code> | The groups to check in |
| compareFn | <code>function</code> | The callback comparison function, return true to keep and false  to strip |

<a name="findGroupsByCheck"></a>

## findGroupsByCheck(groups, compareFn) ⇒ <code>Array.&lt;Group&gt;</code>
Find group instances within groups that satisfy some check

**Kind**: global function  
**Returns**: <code>Array.&lt;Group&gt;</code> - An array of found groups  

| Param | Type | Description |
| --- | --- | --- |
| groups | <code>Array.&lt;Group&gt;</code> | The groups to check within |
| compareFn | <code>function</code> | A comparision function - return true to keep, false to strip |

<a name="getAllEntries"></a>

## getAllEntries(groups) ⇒ <code>Array.&lt;Entry&gt;</code>
Get all entries within a collection of groups

**Kind**: global function  
**Returns**: <code>Array.&lt;Entry&gt;</code> - An array of entries  

| Param | Type | Description |
| --- | --- | --- |
| groups | <code>Array.&lt;Group&gt;</code> | An array of groups |

<a name="generateUUID"></a>

## generateUUID() ⇒ <code>String</code>
Generate a UUID (v4)

**Kind**: global function  
**Returns**: <code>String</code> - The new UUID  
<a name="ArchiveSourceDescription"></a>

## ArchiveSourceDescription
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the source |
| id | <code>String</code> | The source ID |
| status | <code>ArchiveSourceStatus</code> | Status of the source |
| type | <code>String</code> | The source type |
| colour | <code>String</code> | Colour for the source |
| order | <code>Number</code> | The order of the source |

<a name="ArchiveDataset"></a>

## ArchiveDataset : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| groups | <code>Array.&lt;Object&gt;</code> | Array of groups |
| entries | <code>Array.&lt;Object&gt;</code> | Array of entries |
| attributes | <code>Object</code> | Archive attributes |

<a name="EntryFacadeField"></a>

## EntryFacadeField : <code>Object</code>
Entry facade data field

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| title | <code>String</code> | The user-friendly title of the field |
| field | <code>String</code> | The type of data to map back to on the Entry instance (property/meta/attribute) |
| property | <code>String</code> | The property name within the field type of the Entry instance |
| value | <code>String</code> | The value of the property (read/write) |
| secret | <code>Boolean</code> | Wether or not the value should be hidden while viewing (masked) |
| multiline | <code>Boolean</code> | Whether the value should be edited as a multiline value or not |
| formatting | <code>Object</code> \| <code>Boolean</code> | Vendor formatting options object, or false if no formatting necessary |
| maxLength | <code>Number</code> | Maximum recommended length of the value (defaults to -1) |

<a name="FoundGroupResult"></a>

## FoundGroupResult : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| group | <code>Object</code> | The found group dataset |
| index | <code>Number</code> | The index the group was located at |

