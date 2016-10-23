## Modules

<dl>
<dt><a href="#module_Descriptor">Descriptor</a> ⇒ <code>Array</code></dt>
<dd><p>Describe an archive dataset - to history commands</p>
</dd>
<dt><a href="#module_command">command</a></dt>
<dd><p>Command related tools</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#Comparator">Comparator</a></dt>
<dd></dd>
<dt><a href="#ButtercupServerDatasource">ButtercupServerDatasource</a> ⇐ <code><a href="#TextDatasource">TextDatasource</a></code></dt>
<dd></dd>
<dt><a href="#ButtercupServerDatasource">ButtercupServerDatasource</a></dt>
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
<dt><a href="#DeleteEntryMetaCommand">DeleteEntryMetaCommand</a> ⇐ <code><a href="#BaseCommand">BaseCommand</a></code></dt>
<dd></dd>
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
<dt><a href="#SetEntryMetaCommand">SetEntryMetaCommand</a> ⇐ <code><a href="#BaseCommand">BaseCommand</a></code></dt>
<dd></dd>
<dt><a href="#SetEntryPropertyCommand">SetEntryPropertyCommand</a> ⇐ <code><a href="#BaseCommand">BaseCommand</a></code></dt>
<dd></dd>
<dt><a href="#SetGroupAttributeCommand">SetGroupAttributeCommand</a> ⇐ <code><a href="#BaseCommand">BaseCommand</a></code></dt>
<dd></dd>
<dt><a href="#TitleGroupCommand">TitleGroupCommand</a> ⇐ <code><a href="#BaseCommand">BaseCommand</a></code></dt>
<dd></dd>
<dt><a href="#Credentials">Credentials</a></dt>
<dd></dd>
<dt><a href="#FileDatasource">FileDatasource</a> ⇐ <code><a href="#TextDatasource">TextDatasource</a></code></dt>
<dd></dd>
<dt><a href="#FileDatasource">FileDatasource</a></dt>
<dd></dd>
<dt><a href="#Flattener">Flattener</a></dt>
<dd></dd>
<dt><a href="#ManagedEntry">ManagedEntry</a></dt>
<dd></dd>
<dt><a href="#ManagedGroup">ManagedGroup</a></dt>
<dd></dd>
<dt><a href="#Model">Model</a></dt>
<dd></dd>
<dt><a href="#OwnCloudDatasource">OwnCloudDatasource</a> ⇐ <code><a href="#WebDAVDatasource">WebDAVDatasource</a></code></dt>
<dd></dd>
<dt><a href="#OwnCloudDatasource">OwnCloudDatasource</a></dt>
<dd></dd>
<dt><a href="#TextDatasource">TextDatasource</a></dt>
<dd></dd>
<dt><a href="#TextDatasource">TextDatasource</a></dt>
<dd></dd>
<dt><a href="#WebDAVDatasource">WebDAVDatasource</a> ⇐ <code><a href="#TextDatasource">TextDatasource</a></code></dt>
<dd></dd>
<dt><a href="#WebDAVDatasource">WebDAVDatasource</a></dt>
<dd></dd>
<dt><a href="#Westley">Westley</a></dt>
<dd></dd>
<dt><a href="#Workspace">Workspace</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ArchiveDataset">ArchiveDataset</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#DisplayInfo">DisplayInfo</a></dt>
<dd></dd>
</dl>

<a name="module_Descriptor"></a>

## Descriptor ⇒ <code>Array</code>
Describe an archive dataset - to history commands


| Param | Type | Description |
| --- | --- | --- |
| dataset | <code>Object</code> | The archive dataset |
| parentGroupID | <code>String</code> |  |

<a name="module_command"></a>

## command
Command related tools

<a name="module_command.extractCommandComponents"></a>

### command.extractCommandComponents(command) ⇒ <code>Array.&lt;String&gt;</code>
Extract command components from a string

**Kind**: static method of <code>[command](#module_command)</code>  
**Returns**: <code>Array.&lt;String&gt;</code> - The separated parts  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>String</code> | The command to extract from |

<a name="Comparator"></a>

## Comparator
**Kind**: global class  

* [Comparator](#Comparator)
    * [new Comparator(originalArchive, secondaryArchive)](#new_Comparator_new)
    * [.archivesDiffer()](#Comparator+archivesDiffer) ⇒ <code>Boolean</code>
    * [.calculateDifferences()](#Comparator+calculateDifferences) ⇒ <code>Object</code> &#124; <code>Boolean</code>

<a name="new_Comparator_new"></a>

### new Comparator(originalArchive, secondaryArchive)
Archive comparison class


| Param | Type |
| --- | --- |
| originalArchive | <code>Archive</code> | 
| secondaryArchive | <code>Archive</code> | 

<a name="Comparator+archivesDiffer"></a>

### comparator.archivesDiffer() ⇒ <code>Boolean</code>
Check if the current archives differ in any way

**Kind**: instance method of <code>[Comparator](#Comparator)</code>  
<a name="Comparator+calculateDifferences"></a>

### comparator.calculateDifferences() ⇒ <code>Object</code> &#124; <code>Boolean</code>
Calculate the differences, in commands, between the two archives

**Kind**: instance method of <code>[Comparator](#Comparator)</code>  
**Returns**: <code>Object</code> &#124; <code>Boolean</code> - Returns false if no common base
       is found, or the command differences as two arrays  
<a name="ButtercupServerDatasource"></a>

## ButtercupServerDatasource ⇐ <code>[TextDatasource](#TextDatasource)</code>
**Kind**: global class  
**Extends:** <code>[TextDatasource](#TextDatasource)</code>  

* [ButtercupServerDatasource](#ButtercupServerDatasource) ⇐ <code>[TextDatasource](#TextDatasource)</code>
    * [new ButtercupServerDatasource()](#new_ButtercupServerDatasource_new)
    * [new ButtercupServerDatasource(address, email, password)](#new_ButtercupServerDatasource_new)
    * [.load(passwordOrCredentials)](#ButtercupServerDatasource+load) ⇒ <code>Promise.&lt;Archive&gt;</code>
    * [.save(archive, passwordOrCredentials)](#ButtercupServerDatasource+save) ⇒ <code>Promise</code>
    * [.toString()](#ButtercupServerDatasource+toString) ⇒ <code>string</code>
    * [.setContent(content)](#TextDatasource+setContent) ⇒ <code>[TextDatasource](#TextDatasource)</code>

<a name="new_ButtercupServerDatasource_new"></a>

### new ButtercupServerDatasource()
Datasource for Buttercup server connections

<a name="new_ButtercupServerDatasource_new"></a>

### new ButtercupServerDatasource(address, email, password)
Constructor for the datasource


| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | The remote address of the server |
| email | <code>string</code> | The user's email address |
| password | <code>string</code> | The account password |

<a name="ButtercupServerDatasource+load"></a>

### buttercupServerDatasource.load(passwordOrCredentials) ⇒ <code>Promise.&lt;Archive&gt;</code>
Load an archive

**Kind**: instance method of <code>[ButtercupServerDatasource](#ButtercupServerDatasource)</code>  
**Overrides:** <code>[load](#TextDatasource+load)</code>  
**Returns**: <code>Promise.&lt;Archive&gt;</code> - A Promise that resolves with an Archive  

| Param | Type | Description |
| --- | --- | --- |
| passwordOrCredentials | <code>string</code> &#124; <code>[Credentials](#Credentials)</code> | The credentials or password for the archive |

<a name="ButtercupServerDatasource+save"></a>

### buttercupServerDatasource.save(archive, passwordOrCredentials) ⇒ <code>Promise</code>
Save an archive

**Kind**: instance method of <code>[ButtercupServerDatasource](#ButtercupServerDatasource)</code>  
**Overrides:** <code>[save](#TextDatasource+save)</code>  
**Returns**: <code>Promise</code> - A Promise that resolves when saving is complete  

| Param | Type | Description |
| --- | --- | --- |
| archive | <code>Archive</code> | The archive to save |
| passwordOrCredentials | <code>string</code> &#124; <code>[Credentials](#Credentials)</code> | The password or credentials for the archive |

<a name="ButtercupServerDatasource+toString"></a>

### buttercupServerDatasource.toString() ⇒ <code>string</code>
Convert the datasource to a string

**Kind**: instance method of <code>[ButtercupServerDatasource](#ButtercupServerDatasource)</code>  
**Overrides:** <code>[toString](#TextDatasource+toString)</code>  
**Returns**: <code>string</code> - The string representation of the datasource  
<a name="TextDatasource+setContent"></a>

### buttercupServerDatasource.setContent(content) ⇒ <code>[TextDatasource](#TextDatasource)</code>
Set the text content

**Kind**: instance method of <code>[ButtercupServerDatasource](#ButtercupServerDatasource)</code>  
**Returns**: <code>[TextDatasource](#TextDatasource)</code> - Self  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | The new text content |

<a name="ButtercupServerDatasource"></a>

## ButtercupServerDatasource
**Kind**: global class  

* [ButtercupServerDatasource](#ButtercupServerDatasource)
    * [new ButtercupServerDatasource()](#new_ButtercupServerDatasource_new)
    * [new ButtercupServerDatasource(address, email, password)](#new_ButtercupServerDatasource_new)
    * [.load(passwordOrCredentials)](#ButtercupServerDatasource+load) ⇒ <code>Promise.&lt;Archive&gt;</code>
    * [.save(archive, passwordOrCredentials)](#ButtercupServerDatasource+save) ⇒ <code>Promise</code>
    * [.toString()](#ButtercupServerDatasource+toString) ⇒ <code>string</code>
    * [.setContent(content)](#TextDatasource+setContent) ⇒ <code>[TextDatasource](#TextDatasource)</code>

<a name="new_ButtercupServerDatasource_new"></a>

### new ButtercupServerDatasource()
Datasource for Buttercup server connections

<a name="new_ButtercupServerDatasource_new"></a>

### new ButtercupServerDatasource(address, email, password)
Constructor for the datasource


| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | The remote address of the server |
| email | <code>string</code> | The user's email address |
| password | <code>string</code> | The account password |

<a name="ButtercupServerDatasource+load"></a>

### buttercupServerDatasource.load(passwordOrCredentials) ⇒ <code>Promise.&lt;Archive&gt;</code>
Load an archive

**Kind**: instance method of <code>[ButtercupServerDatasource](#ButtercupServerDatasource)</code>  
**Overrides:** <code>[load](#TextDatasource+load)</code>  
**Returns**: <code>Promise.&lt;Archive&gt;</code> - A Promise that resolves with an Archive  

| Param | Type | Description |
| --- | --- | --- |
| passwordOrCredentials | <code>string</code> &#124; <code>[Credentials](#Credentials)</code> | The credentials or password for the archive |

<a name="ButtercupServerDatasource+save"></a>

### buttercupServerDatasource.save(archive, passwordOrCredentials) ⇒ <code>Promise</code>
Save an archive

**Kind**: instance method of <code>[ButtercupServerDatasource](#ButtercupServerDatasource)</code>  
**Overrides:** <code>[save](#TextDatasource+save)</code>  
**Returns**: <code>Promise</code> - A Promise that resolves when saving is complete  

| Param | Type | Description |
| --- | --- | --- |
| archive | <code>Archive</code> | The archive to save |
| passwordOrCredentials | <code>string</code> &#124; <code>[Credentials](#Credentials)</code> | The password or credentials for the archive |

<a name="ButtercupServerDatasource+toString"></a>

### buttercupServerDatasource.toString() ⇒ <code>string</code>
Convert the datasource to a string

**Kind**: instance method of <code>[ButtercupServerDatasource](#ButtercupServerDatasource)</code>  
**Overrides:** <code>[toString](#TextDatasource+toString)</code>  
**Returns**: <code>string</code> - The string representation of the datasource  
<a name="TextDatasource+setContent"></a>

### buttercupServerDatasource.setContent(content) ⇒ <code>[TextDatasource](#TextDatasource)</code>
Set the text content

**Kind**: instance method of <code>[ButtercupServerDatasource](#ButtercupServerDatasource)</code>  
**Returns**: <code>[TextDatasource](#TextDatasource)</code> - Self  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | The new text content |

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

**Kind**: instance property of <code>[BaseCommand](#BaseCommand)</code>  
<a name="BaseCommand+searchTools"></a>

### baseCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of <code>[BaseCommand](#BaseCommand)</code>  
<a name="BaseCommand+entryTools"></a>

### baseCommand.entryTools
Set the entry tools module

**Kind**: instance property of <code>[BaseCommand](#BaseCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| et | <code>Object</code> | The entry tools module |

<a name="BaseCommand+searchTools"></a>

### baseCommand.searchTools
Set the search tools module

**Kind**: instance property of <code>[BaseCommand](#BaseCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| st | <code>Object</code> | The search tools module |

<a name="BaseCommand+executeCallbacks"></a>

### baseCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of <code>[BaseCommand](#BaseCommand)</code>  

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

**Kind**: instance method of <code>[BaseCommand](#BaseCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="CommentCommand"></a>

## CommentCommand ⇐ <code>[BaseCommand](#BaseCommand)</code>
**Kind**: global class  
**Extends:** <code>[BaseCommand](#BaseCommand)</code>  

* [CommentCommand](#CommentCommand) ⇐ <code>[BaseCommand](#BaseCommand)</code>
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

**Kind**: instance property of <code>[CommentCommand](#CommentCommand)</code>  
**Overrides:** <code>[entryTools](#BaseCommand+entryTools)</code>  
<a name="BaseCommand+searchTools"></a>

### commentCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of <code>[CommentCommand](#CommentCommand)</code>  
**Overrides:** <code>[searchTools](#BaseCommand+searchTools)</code>  
<a name="CommentCommand+execute"></a>

### commentCommand.execute(obj, comment)
Execute comment callbacks

**Kind**: instance method of <code>[CommentCommand](#CommentCommand)</code>  
**See**: BaseCommand.executeCallbacks  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>[ArchiveDataset](#ArchiveDataset)</code> | The archive dataset |
| comment | <code>String</code> | The comment |

<a name="BaseCommand+executeCallbacks"></a>

### commentCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of <code>[CommentCommand](#CommentCommand)</code>  

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

**Kind**: instance method of <code>[CommentCommand](#CommentCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="CreateEntryCommand"></a>

## CreateEntryCommand ⇐ <code>[BaseCommand](#BaseCommand)</code>
**Kind**: global class  
**Extends:** <code>[BaseCommand](#BaseCommand)</code>  

* [CreateEntryCommand](#CreateEntryCommand) ⇐ <code>[BaseCommand](#BaseCommand)</code>
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

**Kind**: instance property of <code>[CreateEntryCommand](#CreateEntryCommand)</code>  
**Overrides:** <code>[entryTools](#BaseCommand+entryTools)</code>  
<a name="BaseCommand+searchTools"></a>

### createEntryCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of <code>[CreateEntryCommand](#CreateEntryCommand)</code>  
**Overrides:** <code>[searchTools](#BaseCommand+searchTools)</code>  
<a name="CreateEntryCommand+execute"></a>

### createEntryCommand.execute(obj, groupID, entryID)
Execute the entry creation

**Kind**: instance method of <code>[CreateEntryCommand](#CreateEntryCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>[ArchiveDataset](#ArchiveDataset)</code> | The archive dataset |
| groupID | <code>String</code> | The ID of the group to create within |
| entryID | <code>String</code> | The ID of the entry to create |

<a name="BaseCommand+executeCallbacks"></a>

### createEntryCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of <code>[CreateEntryCommand](#CreateEntryCommand)</code>  

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

**Kind**: instance method of <code>[CreateEntryCommand](#CreateEntryCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="CreateGroupCommand"></a>

## CreateGroupCommand ⇐ <code>[BaseCommand](#BaseCommand)</code>
**Kind**: global class  
**Extends:** <code>[BaseCommand](#BaseCommand)</code>  

* [CreateGroupCommand](#CreateGroupCommand) ⇐ <code>[BaseCommand](#BaseCommand)</code>
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

**Kind**: instance property of <code>[CreateGroupCommand](#CreateGroupCommand)</code>  
**Overrides:** <code>[entryTools](#BaseCommand+entryTools)</code>  
<a name="BaseCommand+searchTools"></a>

### createGroupCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of <code>[CreateGroupCommand](#CreateGroupCommand)</code>  
**Overrides:** <code>[searchTools](#BaseCommand+searchTools)</code>  
<a name="CreateGroupCommand+execute"></a>

### createGroupCommand.execute(obj, parentID, newID)
Execute the group creation

**Kind**: instance method of <code>[CreateGroupCommand](#CreateGroupCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>[ArchiveDataset](#ArchiveDataset)</code> | The archive dataset |
| parentID | <code>String</code> | The ID of the parent group to create within |
| newID | <code>String</code> | The ID of the new group |

<a name="BaseCommand+executeCallbacks"></a>

### createGroupCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of <code>[CreateGroupCommand](#CreateGroupCommand)</code>  

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

**Kind**: instance method of <code>[CreateGroupCommand](#CreateGroupCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="DeleteArchiveAttributeCommand"></a>

## DeleteArchiveAttributeCommand ⇐ <code>[BaseCommand](#BaseCommand)</code>
**Kind**: global class  
**Extends:** <code>[BaseCommand](#BaseCommand)</code>  

* [DeleteArchiveAttributeCommand](#DeleteArchiveAttributeCommand) ⇐ <code>[BaseCommand](#BaseCommand)</code>
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

**Kind**: instance property of <code>[DeleteArchiveAttributeCommand](#DeleteArchiveAttributeCommand)</code>  
**Overrides:** <code>[entryTools](#BaseCommand+entryTools)</code>  
<a name="BaseCommand+searchTools"></a>

### deleteArchiveAttributeCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of <code>[DeleteArchiveAttributeCommand](#DeleteArchiveAttributeCommand)</code>  
**Overrides:** <code>[searchTools](#BaseCommand+searchTools)</code>  
<a name="DeleteArchiveAttributeCommand+execute"></a>

### deleteArchiveAttributeCommand.execute(obj, attributeName)
Execute the deletion of an attribute

**Kind**: instance method of <code>[DeleteArchiveAttributeCommand](#DeleteArchiveAttributeCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>[ArchiveDataset](#ArchiveDataset)</code> | The archive dataset |
| attributeName | <code>String</code> | The name of the attribute to delete |

<a name="BaseCommand+executeCallbacks"></a>

### deleteArchiveAttributeCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of <code>[DeleteArchiveAttributeCommand](#DeleteArchiveAttributeCommand)</code>  

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

**Kind**: instance method of <code>[DeleteArchiveAttributeCommand](#DeleteArchiveAttributeCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="DeleteEntryAttributeCommand"></a>

## DeleteEntryAttributeCommand ⇐ <code>[BaseCommand](#BaseCommand)</code>
**Kind**: global class  
**Extends:** <code>[BaseCommand](#BaseCommand)</code>  

* [DeleteEntryAttributeCommand](#DeleteEntryAttributeCommand) ⇐ <code>[BaseCommand](#BaseCommand)</code>
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

**Kind**: instance property of <code>[DeleteEntryAttributeCommand](#DeleteEntryAttributeCommand)</code>  
**Overrides:** <code>[entryTools](#BaseCommand+entryTools)</code>  
<a name="BaseCommand+searchTools"></a>

### deleteEntryAttributeCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of <code>[DeleteEntryAttributeCommand](#DeleteEntryAttributeCommand)</code>  
**Overrides:** <code>[searchTools](#BaseCommand+searchTools)</code>  
<a name="DeleteEntryAttributeCommand+execute"></a>

### deleteEntryAttributeCommand.execute(obj, entryID, attributeName)
Execute the deletion of an attribute

**Kind**: instance method of <code>[DeleteEntryAttributeCommand](#DeleteEntryAttributeCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>[ArchiveDataset](#ArchiveDataset)</code> | The archive dataset |
| entryID | <code>String</code> | The ID of the entry |
| attributeName | <code>String</code> | The name of the attribute to delete |

<a name="BaseCommand+executeCallbacks"></a>

### deleteEntryAttributeCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of <code>[DeleteEntryAttributeCommand](#DeleteEntryAttributeCommand)</code>  

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

**Kind**: instance method of <code>[DeleteEntryAttributeCommand](#DeleteEntryAttributeCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="DeleteEntryCommand"></a>

## DeleteEntryCommand ⇐ <code>[BaseCommand](#BaseCommand)</code>
**Kind**: global class  
**Extends:** <code>[BaseCommand](#BaseCommand)</code>  

* [DeleteEntryCommand](#DeleteEntryCommand) ⇐ <code>[BaseCommand](#BaseCommand)</code>
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

**Kind**: instance property of <code>[DeleteEntryCommand](#DeleteEntryCommand)</code>  
**Overrides:** <code>[entryTools](#BaseCommand+entryTools)</code>  
<a name="BaseCommand+searchTools"></a>

### deleteEntryCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of <code>[DeleteEntryCommand](#DeleteEntryCommand)</code>  
**Overrides:** <code>[searchTools](#BaseCommand+searchTools)</code>  
<a name="DeleteEntryCommand+execute"></a>

### deleteEntryCommand.execute(obj, entryID)
Execute the entry deletion

**Kind**: instance method of <code>[DeleteEntryCommand](#DeleteEntryCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>[ArchiveDataset](#ArchiveDataset)</code> | The archive dataset |
| entryID | <code>String</code> | The ID of the entry to delete |

<a name="BaseCommand+executeCallbacks"></a>

### deleteEntryCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of <code>[DeleteEntryCommand](#DeleteEntryCommand)</code>  

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

**Kind**: instance method of <code>[DeleteEntryCommand](#DeleteEntryCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="DeleteEntryMetaCommand"></a>

## DeleteEntryMetaCommand ⇐ <code>[BaseCommand](#BaseCommand)</code>
**Kind**: global class  
**Extends:** <code>[BaseCommand](#BaseCommand)</code>  

* [DeleteEntryMetaCommand](#DeleteEntryMetaCommand) ⇐ <code>[BaseCommand](#BaseCommand)</code>
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

**Kind**: instance property of <code>[DeleteEntryMetaCommand](#DeleteEntryMetaCommand)</code>  
**Overrides:** <code>[entryTools](#BaseCommand+entryTools)</code>  
<a name="BaseCommand+searchTools"></a>

### deleteEntryMetaCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of <code>[DeleteEntryMetaCommand](#DeleteEntryMetaCommand)</code>  
**Overrides:** <code>[searchTools](#BaseCommand+searchTools)</code>  
<a name="DeleteEntryMetaCommand+execute"></a>

### deleteEntryMetaCommand.execute(obj, entryID, propertyName)
Execute the deletion of a meta property

**Kind**: instance method of <code>[DeleteEntryMetaCommand](#DeleteEntryMetaCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>[ArchiveDataset](#ArchiveDataset)</code> | The archive dataset |
| entryID | <code>String</code> | The ID of the entry |
| propertyName | <code>String</code> | The name of the meta property to delete |

<a name="BaseCommand+executeCallbacks"></a>

### deleteEntryMetaCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of <code>[DeleteEntryMetaCommand](#DeleteEntryMetaCommand)</code>  

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

**Kind**: instance method of <code>[DeleteEntryMetaCommand](#DeleteEntryMetaCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="DeleteGroupAttributeCommand"></a>

## DeleteGroupAttributeCommand ⇐ <code>[BaseCommand](#BaseCommand)</code>
**Kind**: global class  
**Extends:** <code>[BaseCommand](#BaseCommand)</code>  

* [DeleteGroupAttributeCommand](#DeleteGroupAttributeCommand) ⇐ <code>[BaseCommand](#BaseCommand)</code>
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

**Kind**: instance property of <code>[DeleteGroupAttributeCommand](#DeleteGroupAttributeCommand)</code>  
**Overrides:** <code>[entryTools](#BaseCommand+entryTools)</code>  
<a name="BaseCommand+searchTools"></a>

### deleteGroupAttributeCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of <code>[DeleteGroupAttributeCommand](#DeleteGroupAttributeCommand)</code>  
**Overrides:** <code>[searchTools](#BaseCommand+searchTools)</code>  
<a name="DeleteGroupAttributeCommand+execute"></a>

### deleteGroupAttributeCommand.execute(obj, groupID, attributeName)
Execute the deletion of a group attribute

**Kind**: instance method of <code>[DeleteGroupAttributeCommand](#DeleteGroupAttributeCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>[ArchiveDataset](#ArchiveDataset)</code> | The archive dataset |
| groupID | <code>String</code> | The ID of the group |
| attributeName | <code>String</code> | The attribute to delete |

<a name="BaseCommand+executeCallbacks"></a>

### deleteGroupAttributeCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of <code>[DeleteGroupAttributeCommand](#DeleteGroupAttributeCommand)</code>  

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

**Kind**: instance method of <code>[DeleteGroupAttributeCommand](#DeleteGroupAttributeCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="DeleteGroupCommand"></a>

## DeleteGroupCommand ⇐ <code>[BaseCommand](#BaseCommand)</code>
**Kind**: global class  
**Extends:** <code>[BaseCommand](#BaseCommand)</code>  

* [DeleteGroupCommand](#DeleteGroupCommand) ⇐ <code>[BaseCommand](#BaseCommand)</code>
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

**Kind**: instance property of <code>[DeleteGroupCommand](#DeleteGroupCommand)</code>  
**Overrides:** <code>[entryTools](#BaseCommand+entryTools)</code>  
<a name="BaseCommand+searchTools"></a>

### deleteGroupCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of <code>[DeleteGroupCommand](#DeleteGroupCommand)</code>  
**Overrides:** <code>[searchTools](#BaseCommand+searchTools)</code>  
<a name="DeleteGroupCommand+execute"></a>

### deleteGroupCommand.execute(obj, groupID)
Execute the deletion of a group

**Kind**: instance method of <code>[DeleteGroupCommand](#DeleteGroupCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>[ArchiveDataset](#ArchiveDataset)</code> | The archive dataset |
| groupID | <code>String</code> | The ID of the group to delete |

<a name="BaseCommand+executeCallbacks"></a>

### deleteGroupCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of <code>[DeleteGroupCommand](#DeleteGroupCommand)</code>  

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

**Kind**: instance method of <code>[DeleteGroupCommand](#DeleteGroupCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="FormatCommand"></a>

## FormatCommand ⇐ <code>[BaseCommand](#BaseCommand)</code>
**Kind**: global class  
**Extends:** <code>[BaseCommand](#BaseCommand)</code>  

* [FormatCommand](#FormatCommand) ⇐ <code>[BaseCommand](#BaseCommand)</code>
    * [new FormatCommand()](#new_FormatCommand_new)
    * [.entryTools](#BaseCommand+entryTools) : <code>Object</code>
    * [.searchTools](#BaseCommand+searchTools) : <code>Object</code>
    * [.execute(obj, format)](#FormatCommand+execute)
    * [.executeCallbacks(key)](#BaseCommand+executeCallbacks)
    * [.setCallback(key, fn)](#BaseCommand+setCallback)

<a name="new_FormatCommand_new"></a>

### new FormatCommand()
Command for setting the archive format

<a name="BaseCommand+entryTools"></a>

### formatCommand.entryTools : <code>Object</code>
Entry tools module

**Kind**: instance property of <code>[FormatCommand](#FormatCommand)</code>  
**Overrides:** <code>[entryTools](#BaseCommand+entryTools)</code>  
<a name="BaseCommand+searchTools"></a>

### formatCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of <code>[FormatCommand](#FormatCommand)</code>  
**Overrides:** <code>[searchTools](#BaseCommand+searchTools)</code>  
<a name="FormatCommand+execute"></a>

### formatCommand.execute(obj, format)
Execute the setting of the format

**Kind**: instance method of <code>[FormatCommand](#FormatCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>[ArchiveDataset](#ArchiveDataset)</code> | The archive dataset |
| format | <code>String</code> | The archive format |

<a name="BaseCommand+executeCallbacks"></a>

### formatCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of <code>[FormatCommand](#FormatCommand)</code>  

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

**Kind**: instance method of <code>[FormatCommand](#FormatCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="MoveEntryCommand"></a>

## MoveEntryCommand ⇐ <code>[BaseCommand](#BaseCommand)</code>
**Kind**: global class  
**Extends:** <code>[BaseCommand](#BaseCommand)</code>  

* [MoveEntryCommand](#MoveEntryCommand) ⇐ <code>[BaseCommand](#BaseCommand)</code>
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

**Kind**: instance property of <code>[MoveEntryCommand](#MoveEntryCommand)</code>  
**Overrides:** <code>[entryTools](#BaseCommand+entryTools)</code>  
<a name="BaseCommand+searchTools"></a>

### moveEntryCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of <code>[MoveEntryCommand](#MoveEntryCommand)</code>  
**Overrides:** <code>[searchTools](#BaseCommand+searchTools)</code>  
<a name="MoveEntryCommand+execute"></a>

### moveEntryCommand.execute(obj, entryID, targetGroupID)
Execute the move

**Kind**: instance method of <code>[MoveEntryCommand](#MoveEntryCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>[ArchiveDataset](#ArchiveDataset)</code> | The archive dataset |
| entryID | <code>String</code> | The ID of the entry to move |
| targetGroupID | <code>String</code> | The ID of the group to move the entry to |

<a name="BaseCommand+executeCallbacks"></a>

### moveEntryCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of <code>[MoveEntryCommand](#MoveEntryCommand)</code>  

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

**Kind**: instance method of <code>[MoveEntryCommand](#MoveEntryCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="MoveGroupCommand"></a>

## MoveGroupCommand ⇐ <code>[BaseCommand](#BaseCommand)</code>
**Kind**: global class  
**Extends:** <code>[BaseCommand](#BaseCommand)</code>  

* [MoveGroupCommand](#MoveGroupCommand) ⇐ <code>[BaseCommand](#BaseCommand)</code>
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

**Kind**: instance property of <code>[MoveGroupCommand](#MoveGroupCommand)</code>  
**Overrides:** <code>[entryTools](#BaseCommand+entryTools)</code>  
<a name="BaseCommand+searchTools"></a>

### moveGroupCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of <code>[MoveGroupCommand](#MoveGroupCommand)</code>  
**Overrides:** <code>[searchTools](#BaseCommand+searchTools)</code>  
<a name="MoveGroupCommand+execute"></a>

### moveGroupCommand.execute(obj, groupID, targetGroupID)
Execute the move

**Kind**: instance method of <code>[MoveGroupCommand](#MoveGroupCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>[ArchiveDataset](#ArchiveDataset)</code> | The archive dataset |
| groupID | <code>String</code> | The ID of the group to move |
| targetGroupID | <code>String</code> | The ID of the group to move to |

<a name="BaseCommand+executeCallbacks"></a>

### moveGroupCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of <code>[MoveGroupCommand](#MoveGroupCommand)</code>  

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

**Kind**: instance method of <code>[MoveGroupCommand](#MoveGroupCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="PadCommand"></a>

## PadCommand ⇐ <code>[BaseCommand](#BaseCommand)</code>
**Kind**: global class  
**Extends:** <code>[BaseCommand](#BaseCommand)</code>  

* [PadCommand](#PadCommand) ⇐ <code>[BaseCommand](#BaseCommand)</code>
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

**Kind**: instance property of <code>[PadCommand](#PadCommand)</code>  
**Overrides:** <code>[entryTools](#BaseCommand+entryTools)</code>  
<a name="BaseCommand+searchTools"></a>

### padCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of <code>[PadCommand](#PadCommand)</code>  
**Overrides:** <code>[searchTools](#BaseCommand+searchTools)</code>  
<a name="BaseCommand+executeCallbacks"></a>

### padCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of <code>[PadCommand](#PadCommand)</code>  

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

**Kind**: instance method of <code>[PadCommand](#PadCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="SetArchiveAttributeCommand"></a>

## SetArchiveAttributeCommand ⇐ <code>[BaseCommand](#BaseCommand)</code>
**Kind**: global class  
**Extends:** <code>[BaseCommand](#BaseCommand)</code>  

* [SetArchiveAttributeCommand](#SetArchiveAttributeCommand) ⇐ <code>[BaseCommand](#BaseCommand)</code>
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

**Kind**: instance property of <code>[SetArchiveAttributeCommand](#SetArchiveAttributeCommand)</code>  
**Overrides:** <code>[entryTools](#BaseCommand+entryTools)</code>  
<a name="BaseCommand+searchTools"></a>

### setArchiveAttributeCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of <code>[SetArchiveAttributeCommand](#SetArchiveAttributeCommand)</code>  
**Overrides:** <code>[searchTools](#BaseCommand+searchTools)</code>  
<a name="SetArchiveAttributeCommand+execute"></a>

### setArchiveAttributeCommand.execute(obj, attributeName, value)
Execute the setting of an attribute

**Kind**: instance method of <code>[SetArchiveAttributeCommand](#SetArchiveAttributeCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>[ArchiveDataset](#ArchiveDataset)</code> | The archive dataset |
| attributeName | <code>String</code> | The name of the attribute to set |
| value | <code>String</code> | The value to set |

<a name="BaseCommand+executeCallbacks"></a>

### setArchiveAttributeCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of <code>[SetArchiveAttributeCommand](#SetArchiveAttributeCommand)</code>  

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

**Kind**: instance method of <code>[SetArchiveAttributeCommand](#SetArchiveAttributeCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="SetEntryAttributeCommand"></a>

## SetEntryAttributeCommand ⇐ <code>[BaseCommand](#BaseCommand)</code>
**Kind**: global class  
**Extends:** <code>[BaseCommand](#BaseCommand)</code>  

* [SetEntryAttributeCommand](#SetEntryAttributeCommand) ⇐ <code>[BaseCommand](#BaseCommand)</code>
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

**Kind**: instance property of <code>[SetEntryAttributeCommand](#SetEntryAttributeCommand)</code>  
**Overrides:** <code>[entryTools](#BaseCommand+entryTools)</code>  
<a name="BaseCommand+searchTools"></a>

### setEntryAttributeCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of <code>[SetEntryAttributeCommand](#SetEntryAttributeCommand)</code>  
**Overrides:** <code>[searchTools](#BaseCommand+searchTools)</code>  
<a name="SetEntryAttributeCommand+execute"></a>

### setEntryAttributeCommand.execute(obj, entryID, attributeName, value)
Execute the setting of an attribute

**Kind**: instance method of <code>[SetEntryAttributeCommand](#SetEntryAttributeCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>[ArchiveDataset](#ArchiveDataset)</code> | The archive dataset |
| entryID | <code>String</code> | The ID of the entry |
| attributeName | <code>String</code> | The name of the attribute to set |
| value | <code>String</code> | The value to set |

<a name="BaseCommand+executeCallbacks"></a>

### setEntryAttributeCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of <code>[SetEntryAttributeCommand](#SetEntryAttributeCommand)</code>  

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

**Kind**: instance method of <code>[SetEntryAttributeCommand](#SetEntryAttributeCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="SetEntryMetaCommand"></a>

## SetEntryMetaCommand ⇐ <code>[BaseCommand](#BaseCommand)</code>
**Kind**: global class  
**Extends:** <code>[BaseCommand](#BaseCommand)</code>  

* [SetEntryMetaCommand](#SetEntryMetaCommand) ⇐ <code>[BaseCommand](#BaseCommand)</code>
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

**Kind**: instance property of <code>[SetEntryMetaCommand](#SetEntryMetaCommand)</code>  
**Overrides:** <code>[entryTools](#BaseCommand+entryTools)</code>  
<a name="BaseCommand+searchTools"></a>

### setEntryMetaCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of <code>[SetEntryMetaCommand](#SetEntryMetaCommand)</code>  
**Overrides:** <code>[searchTools](#BaseCommand+searchTools)</code>  
<a name="SetEntryMetaCommand+execute"></a>

### setEntryMetaCommand.execute(obj, entryID, propertyName, value)
Execute the setting of a meta property

**Kind**: instance method of <code>[SetEntryMetaCommand](#SetEntryMetaCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>[ArchiveDataset](#ArchiveDataset)</code> | The archive dataset |
| entryID | <code>String</code> | The ID of the entry |
| propertyName | <code>String</code> | The name of the meta property to set |
| value | <code>String</code> | The value to set |

<a name="BaseCommand+executeCallbacks"></a>

### setEntryMetaCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of <code>[SetEntryMetaCommand](#SetEntryMetaCommand)</code>  

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

**Kind**: instance method of <code>[SetEntryMetaCommand](#SetEntryMetaCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="SetEntryPropertyCommand"></a>

## SetEntryPropertyCommand ⇐ <code>[BaseCommand](#BaseCommand)</code>
**Kind**: global class  
**Extends:** <code>[BaseCommand](#BaseCommand)</code>  

* [SetEntryPropertyCommand](#SetEntryPropertyCommand) ⇐ <code>[BaseCommand](#BaseCommand)</code>
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

**Kind**: instance property of <code>[SetEntryPropertyCommand](#SetEntryPropertyCommand)</code>  
**Overrides:** <code>[entryTools](#BaseCommand+entryTools)</code>  
<a name="BaseCommand+searchTools"></a>

### setEntryPropertyCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of <code>[SetEntryPropertyCommand](#SetEntryPropertyCommand)</code>  
**Overrides:** <code>[searchTools](#BaseCommand+searchTools)</code>  
<a name="SetEntryPropertyCommand+execute"></a>

### setEntryPropertyCommand.execute(obj, entryID, propertyName, value)
Execute the setting of a property

**Kind**: instance method of <code>[SetEntryPropertyCommand](#SetEntryPropertyCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>[ArchiveDataset](#ArchiveDataset)</code> | The archive dataset |
| entryID | <code>String</code> | The ID of the entry |
| propertyName | <code>String</code> | The name of the property to set |
| value | <code>String</code> | The value to set |

<a name="BaseCommand+executeCallbacks"></a>

### setEntryPropertyCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of <code>[SetEntryPropertyCommand](#SetEntryPropertyCommand)</code>  

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

**Kind**: instance method of <code>[SetEntryPropertyCommand](#SetEntryPropertyCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="SetGroupAttributeCommand"></a>

## SetGroupAttributeCommand ⇐ <code>[BaseCommand](#BaseCommand)</code>
**Kind**: global class  
**Extends:** <code>[BaseCommand](#BaseCommand)</code>  

* [SetGroupAttributeCommand](#SetGroupAttributeCommand) ⇐ <code>[BaseCommand](#BaseCommand)</code>
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

**Kind**: instance property of <code>[SetGroupAttributeCommand](#SetGroupAttributeCommand)</code>  
**Overrides:** <code>[entryTools](#BaseCommand+entryTools)</code>  
<a name="BaseCommand+searchTools"></a>

### setGroupAttributeCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of <code>[SetGroupAttributeCommand](#SetGroupAttributeCommand)</code>  
**Overrides:** <code>[searchTools](#BaseCommand+searchTools)</code>  
<a name="SetGroupAttributeCommand+execute"></a>

### setGroupAttributeCommand.execute(obj, groupID, attributeName, value)
Execute the setting of an attribute

**Kind**: instance method of <code>[SetGroupAttributeCommand](#SetGroupAttributeCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>[ArchiveDataset](#ArchiveDataset)</code> | The archive dataset |
| groupID | <code>String</code> | The ID of the group |
| attributeName | <code>String</code> | The name of the attribute to set |
| value | <code>String</code> | The value to set |

<a name="BaseCommand+executeCallbacks"></a>

### setGroupAttributeCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of <code>[SetGroupAttributeCommand](#SetGroupAttributeCommand)</code>  

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

**Kind**: instance method of <code>[SetGroupAttributeCommand](#SetGroupAttributeCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="TitleGroupCommand"></a>

## TitleGroupCommand ⇐ <code>[BaseCommand](#BaseCommand)</code>
**Kind**: global class  
**Extends:** <code>[BaseCommand](#BaseCommand)</code>  

* [TitleGroupCommand](#TitleGroupCommand) ⇐ <code>[BaseCommand](#BaseCommand)</code>
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

**Kind**: instance property of <code>[TitleGroupCommand](#TitleGroupCommand)</code>  
**Overrides:** <code>[entryTools](#BaseCommand+entryTools)</code>  
<a name="BaseCommand+searchTools"></a>

### titleGroupCommand.searchTools : <code>Object</code>
Search tools module

**Kind**: instance property of <code>[TitleGroupCommand](#TitleGroupCommand)</code>  
**Overrides:** <code>[searchTools](#BaseCommand+searchTools)</code>  
<a name="TitleGroupCommand+execute"></a>

### titleGroupCommand.execute(obj, groupID, title)
Execute the setting of the title

**Kind**: instance method of <code>[TitleGroupCommand](#TitleGroupCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>[ArchiveDataset](#ArchiveDataset)</code> | The archive dataset |
| groupID | <code>String</code> | The ID of the group to set |
| title | <code>String</code> | The title to set |

<a name="BaseCommand+executeCallbacks"></a>

### titleGroupCommand.executeCallbacks(key)
Execute all callbacks under a key
Arguments passed after the key are provided to each callback

**Kind**: instance method of <code>[TitleGroupCommand](#TitleGroupCommand)</code>  

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

**Kind**: instance method of <code>[TitleGroupCommand](#TitleGroupCommand)</code>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The callback name |
| fn | <code>function</code> | The callback function |

<a name="Credentials"></a>

## Credentials
**Kind**: global class  

* [Credentials](#Credentials)
    * [new Credentials(data)](#new_Credentials_new)
    * _instance_
        * [.getIdentity()](#Credentials+getIdentity) ⇒ <code>Object</code>
        * [.setIdentity(username, password)](#Credentials+setIdentity) ⇒ <code>[Credentials](#Credentials)</code>
        * [.setType(type)](#Credentials+setType) ⇒ <code>[Credentials](#Credentials)</code>
        * [.convertToSecureContent(masterPassword)](#Credentials+convertToSecureContent) ⇒ <code>Promise</code>
    * _static_
        * [.createFromSecureContent(content, password)](#Credentials.createFromSecureContent) ⇒ <code>Promise</code>

<a name="new_Credentials_new"></a>

### new Credentials(data)

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> &#124; <code>[Model](#Model)</code> | The initialisation data |

<a name="Credentials+getIdentity"></a>

### credentials.getIdentity() ⇒ <code>Object</code>
Get identity information

**Kind**: instance method of <code>[Credentials](#Credentials)</code>  
<a name="Credentials+setIdentity"></a>

### credentials.setIdentity(username, password) ⇒ <code>[Credentials](#Credentials)</code>
Set identity information

**Kind**: instance method of <code>[Credentials](#Credentials)</code>  
**Returns**: <code>[Credentials](#Credentials)</code> - Self  

| Param | Type |
| --- | --- |
| username | <code>string</code> | 
| password | <code>string</code> | 

<a name="Credentials+setType"></a>

### credentials.setType(type) ⇒ <code>[Credentials](#Credentials)</code>
Set the credentials type (eg. webdav/owncloud etc.)

**Kind**: instance method of <code>[Credentials](#Credentials)</code>  
**Returns**: <code>[Credentials](#Credentials)</code> - Self  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The type of credentials |

<a name="Credentials+convertToSecureContent"></a>

### credentials.convertToSecureContent(masterPassword) ⇒ <code>Promise</code>
Convert the credentials to an encrypted string, for storage

**Kind**: instance method of <code>[Credentials](#Credentials)</code>  
**Returns**: <code>Promise</code> - A promise that resolves with the encrypted credentials  
**See**: signEncryptedContent  

| Param | Type | Description |
| --- | --- | --- |
| masterPassword | <code>string</code> | The password for encrypting |

<a name="Credentials.createFromSecureContent"></a>

### Credentials.createFromSecureContent(content, password) ⇒ <code>Promise</code>
Create a new Credentials instance from encrypted information

**Kind**: static method of <code>[Credentials](#Credentials)</code>  
**Returns**: <code>Promise</code> - A promise resolving with the new Credentials instance  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | The encrypted content |
| password | <code>string</code> | The master password to decrypt with |

<a name="FileDatasource"></a>

## FileDatasource ⇐ <code>[TextDatasource](#TextDatasource)</code>
**Kind**: global class  
**Extends:** <code>[TextDatasource](#TextDatasource)</code>  

* [FileDatasource](#FileDatasource) ⇐ <code>[TextDatasource](#TextDatasource)</code>
    * [new FileDatasource()](#new_FileDatasource_new)
    * [new FileDatasource(filename)](#new_FileDatasource_new)
    * [.getArchivePath()](#FileDatasource+getArchivePath) ⇒ <code>string</code>
    * [.load(password)](#FileDatasource+load) ⇒ <code>Promise.&lt;Archive&gt;</code>
    * [.save(archive, password)](#FileDatasource+save) ⇒ <code>Promise</code>
    * [.toString()](#FileDatasource+toString) ⇒ <code>string</code>
    * [.setContent(content)](#TextDatasource+setContent) ⇒ <code>[TextDatasource](#TextDatasource)</code>

<a name="new_FileDatasource_new"></a>

### new FileDatasource()
File datasource for loading and saving files

<a name="new_FileDatasource_new"></a>

### new FileDatasource(filename)
Constructor for the file datasource


| Param | Type | Description |
| --- | --- | --- |
| filename | <code>string</code> | The filename to load and save |

<a name="FileDatasource+getArchivePath"></a>

### fileDatasource.getArchivePath() ⇒ <code>string</code>
Get the path of the archive

**Kind**: instance method of <code>[FileDatasource](#FileDatasource)</code>  
<a name="FileDatasource+load"></a>

### fileDatasource.load(password) ⇒ <code>Promise.&lt;Archive&gt;</code>
Load from the filename specified in the constructor using a password

**Kind**: instance method of <code>[FileDatasource](#FileDatasource)</code>  
**Overrides:** <code>[load](#TextDatasource+load)</code>  
**Returns**: <code>Promise.&lt;Archive&gt;</code> - A promise resolving with the opened archive  

| Param | Type | Description |
| --- | --- | --- |
| password | <code>string</code> | The password for decryption |

<a name="FileDatasource+save"></a>

### fileDatasource.save(archive, password) ⇒ <code>Promise</code>
Save an archive to a file using a password for encryption

**Kind**: instance method of <code>[FileDatasource](#FileDatasource)</code>  
**Overrides:** <code>[save](#TextDatasource+save)</code>  
**Returns**: <code>Promise</code> - A promise that resolves when saving is complete  

| Param | Type | Description |
| --- | --- | --- |
| archive | <code>Archive</code> | The archive to save |
| password | <code>string</code> | The password to save with |

<a name="FileDatasource+toString"></a>

### fileDatasource.toString() ⇒ <code>string</code>
Output the datasource configuration as a string

**Kind**: instance method of <code>[FileDatasource](#FileDatasource)</code>  
**Overrides:** <code>[toString](#TextDatasource+toString)</code>  
<a name="TextDatasource+setContent"></a>

### fileDatasource.setContent(content) ⇒ <code>[TextDatasource](#TextDatasource)</code>
Set the text content

**Kind**: instance method of <code>[FileDatasource](#FileDatasource)</code>  
**Returns**: <code>[TextDatasource](#TextDatasource)</code> - Self  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | The new text content |

<a name="FileDatasource"></a>

## FileDatasource
**Kind**: global class  

* [FileDatasource](#FileDatasource)
    * [new FileDatasource()](#new_FileDatasource_new)
    * [new FileDatasource(filename)](#new_FileDatasource_new)
    * [.getArchivePath()](#FileDatasource+getArchivePath) ⇒ <code>string</code>
    * [.load(password)](#FileDatasource+load) ⇒ <code>Promise.&lt;Archive&gt;</code>
    * [.save(archive, password)](#FileDatasource+save) ⇒ <code>Promise</code>
    * [.toString()](#FileDatasource+toString) ⇒ <code>string</code>
    * [.setContent(content)](#TextDatasource+setContent) ⇒ <code>[TextDatasource](#TextDatasource)</code>

<a name="new_FileDatasource_new"></a>

### new FileDatasource()
File datasource for loading and saving files

<a name="new_FileDatasource_new"></a>

### new FileDatasource(filename)
Constructor for the file datasource


| Param | Type | Description |
| --- | --- | --- |
| filename | <code>string</code> | The filename to load and save |

<a name="FileDatasource+getArchivePath"></a>

### fileDatasource.getArchivePath() ⇒ <code>string</code>
Get the path of the archive

**Kind**: instance method of <code>[FileDatasource](#FileDatasource)</code>  
<a name="FileDatasource+load"></a>

### fileDatasource.load(password) ⇒ <code>Promise.&lt;Archive&gt;</code>
Load from the filename specified in the constructor using a password

**Kind**: instance method of <code>[FileDatasource](#FileDatasource)</code>  
**Overrides:** <code>[load](#TextDatasource+load)</code>  
**Returns**: <code>Promise.&lt;Archive&gt;</code> - A promise resolving with the opened archive  

| Param | Type | Description |
| --- | --- | --- |
| password | <code>string</code> | The password for decryption |

<a name="FileDatasource+save"></a>

### fileDatasource.save(archive, password) ⇒ <code>Promise</code>
Save an archive to a file using a password for encryption

**Kind**: instance method of <code>[FileDatasource](#FileDatasource)</code>  
**Overrides:** <code>[save](#TextDatasource+save)</code>  
**Returns**: <code>Promise</code> - A promise that resolves when saving is complete  

| Param | Type | Description |
| --- | --- | --- |
| archive | <code>Archive</code> | The archive to save |
| password | <code>string</code> | The password to save with |

<a name="FileDatasource+toString"></a>

### fileDatasource.toString() ⇒ <code>string</code>
Output the datasource configuration as a string

**Kind**: instance method of <code>[FileDatasource](#FileDatasource)</code>  
**Overrides:** <code>[toString](#TextDatasource+toString)</code>  
<a name="TextDatasource+setContent"></a>

### fileDatasource.setContent(content) ⇒ <code>[TextDatasource](#TextDatasource)</code>
Set the text content

**Kind**: instance method of <code>[FileDatasource](#FileDatasource)</code>  
**Returns**: <code>[TextDatasource](#TextDatasource)</code> - Self  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | The new text content |

<a name="Flattener"></a>

## Flattener
**Kind**: global class  

* [Flattener](#Flattener)
    * [new Flattener(westley)](#new_Flattener_new)
    * [.canBeFlattened()](#Flattener+canBeFlattened) ⇒ <code>Boolean</code>
    * [.flatten([force])](#Flattener+flatten) ⇒ <code>Boolean</code>
    * [.getPreservationCount()](#Flattener+getPreservationCount) ⇒ <code>Number</code>

<a name="new_Flattener_new"></a>

### new Flattener(westley)
Flatten archives


| Param | Type |
| --- | --- |
| westley | <code>[Westley](#Westley)</code> | 

<a name="Flattener+canBeFlattened"></a>

### flattener.canBeFlattened() ⇒ <code>Boolean</code>
Check if the dataset can be flattened

**Kind**: instance method of <code>[Flattener](#Flattener)</code>  
**Returns**: <code>Boolean</code> - True if it can be flattened  
**Access:** public  
<a name="Flattener+flatten"></a>

### flattener.flatten([force]) ⇒ <code>Boolean</code>
Flatten a dataset

**Kind**: instance method of <code>[Flattener](#Flattener)</code>  
**Returns**: <code>Boolean</code> - True if flattening occurred, false otherwise  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| [force] | <code>Boolean</code> | Force flattening even if it is detected to be unnecessary |

<a name="Flattener+getPreservationCount"></a>

### flattener.getPreservationCount() ⇒ <code>Number</code>
Get the number of lines to preserve by default

**Kind**: instance method of <code>[Flattener](#Flattener)</code>  
**Returns**: <code>Number</code> - The number of lines  
**Access:** public  
**See**: PRESERVE_LAST_LINES  
<a name="ManagedEntry"></a>

## ManagedEntry
**Kind**: global class  

* [ManagedEntry](#ManagedEntry)
    * [new ManagedEntry(archive, remoteObj)](#new_ManagedEntry_new)
    * _instance_
        * [.delete()](#ManagedEntry+delete)
        * [.deleteAttribute(attr)](#ManagedEntry+deleteAttribute) ⇒ <code>[ManagedEntry](#ManagedEntry)</code>
        * [.deleteMeta(property)](#ManagedEntry+deleteMeta) ⇒ <code>[ManagedEntry](#ManagedEntry)</code>
        * [.getAttribute()](#ManagedEntry+getAttribute) ⇒ <code>String</code> &#124; <code>undefined</code>
        * [.getDisplayInfo()](#ManagedEntry+getDisplayInfo) ⇒ <code>[DisplayInfo](#DisplayInfo)</code> &#124; <code>undefined</code>
        * [.getGroup()](#ManagedEntry+getGroup) ⇒ <code>[ManagedGroup](#ManagedGroup)</code> &#124; <code>null</code>
        * [.getID()](#ManagedEntry+getID) ⇒ <code>String</code>
        * [.getMeta()](#ManagedEntry+getMeta) ⇒ <code>String</code> &#124; <code>undefined</code>
        * [.getProperty()](#ManagedEntry+getProperty) ⇒ <code>String</code> &#124; <code>undefined</code>
        * [.moveToGroup()](#ManagedEntry+moveToGroup) ⇒ <code>[ManagedEntry](#ManagedEntry)</code>
        * [.setAttribute(attributeName, value)](#ManagedEntry+setAttribute) ⇒ <code>[ManagedEntry](#ManagedEntry)</code>
        * [.setMeta(prop, value)](#ManagedEntry+setMeta) ⇒ <code>[ManagedEntry](#ManagedEntry)</code>
        * [.setProperty(prop, value)](#ManagedEntry+setProperty) ⇒ <code>[ManagedEntry](#ManagedEntry)</code>
        * [.toObject()](#ManagedEntry+toObject) ⇒ <code>Object</code>
        * [.toString()](#ManagedEntry+toString) ⇒ <code>string</code>
        * [._getArchive()](#ManagedEntry+_getArchive) ⇒ <code>Archive</code>
        * [._getRemoteObject()](#ManagedEntry+_getRemoteObject) ⇒ <code>Object</code>
        * [._getWestley()](#ManagedEntry+_getWestley) ⇒ <code>[Westley](#Westley)</code>
    * _static_
        * [.createNew(archive, groupID)](#ManagedEntry.createNew) ⇒ <code>[ManagedEntry](#ManagedEntry)</code>

<a name="new_ManagedEntry_new"></a>

### new ManagedEntry(archive, remoteObj)
Managed entry class


| Param | Type | Description |
| --- | --- | --- |
| archive | <code>Archive</code> | The main archive instance |
| remoteObj | <code>Object</code> | The remote object reference |

<a name="ManagedEntry+delete"></a>

### managedEntry.delete()
Delete the entry - either trashes the entry, or removes it completely.
If the entry is in the trash already, it is removed (including if there is no
   trash group). If the entry is in a normal group and a trash group exists, it
 is moved there instead of being deleted.

**Kind**: instance method of <code>[ManagedEntry](#ManagedEntry)</code>  
**See**

- moveToGroup
- Archive.getTrashGroup

<a name="ManagedEntry+deleteAttribute"></a>

### managedEntry.deleteAttribute(attr) ⇒ <code>[ManagedEntry](#ManagedEntry)</code>
Delete an attribute

**Kind**: instance method of <code>[ManagedEntry](#ManagedEntry)</code>  
**Throws**:

- <code>Error</code> Throws if the attribute doesn't exist, or cannot be deleted


| Param | Type | Description |
| --- | --- | --- |
| attr | <code>string</code> | The attribute name |

<a name="ManagedEntry+deleteMeta"></a>

### managedEntry.deleteMeta(property) ⇒ <code>[ManagedEntry](#ManagedEntry)</code>
Delete a meta item

**Kind**: instance method of <code>[ManagedEntry](#ManagedEntry)</code>  
**Throws**:

- <code>Error</code> Throws if property doesn't exist, or cannot be deleted


| Param | Type | Description |
| --- | --- | --- |
| property | <code>string</code> | The property name |

<a name="ManagedEntry+getAttribute"></a>

### managedEntry.getAttribute() ⇒ <code>String</code> &#124; <code>undefined</code>
Get an attribute

**Kind**: instance method of <code>[ManagedEntry](#ManagedEntry)</code>  
**Params**: <code>String</code> attributeName The name of the attribute  
<a name="ManagedEntry+getDisplayInfo"></a>

### managedEntry.getDisplayInfo() ⇒ <code>[DisplayInfo](#DisplayInfo)</code> &#124; <code>undefined</code>
Get the display information for the entry

**Kind**: instance method of <code>[ManagedEntry](#ManagedEntry)</code>  
<a name="ManagedEntry+getGroup"></a>

### managedEntry.getGroup() ⇒ <code>[ManagedGroup](#ManagedGroup)</code> &#124; <code>null</code>
Get the containing group for the entry

**Kind**: instance method of <code>[ManagedEntry](#ManagedEntry)</code>  
<a name="ManagedEntry+getID"></a>

### managedEntry.getID() ⇒ <code>String</code>
Get the entry ID

**Kind**: instance method of <code>[ManagedEntry](#ManagedEntry)</code>  
<a name="ManagedEntry+getMeta"></a>

### managedEntry.getMeta() ⇒ <code>String</code> &#124; <code>undefined</code>
Get a meta value

**Kind**: instance method of <code>[ManagedEntry](#ManagedEntry)</code>  
**Params**: <code>String</code> property The name of the meta property  
<a name="ManagedEntry+getProperty"></a>

### managedEntry.getProperty() ⇒ <code>String</code> &#124; <code>undefined</code>
Get a property value

**Kind**: instance method of <code>[ManagedEntry](#ManagedEntry)</code>  
**Params**: <code>String</code> property The name of the meta property  
<a name="ManagedEntry+moveToGroup"></a>

### managedEntry.moveToGroup() ⇒ <code>[ManagedEntry](#ManagedEntry)</code>
Move the entry to another group

**Kind**: instance method of <code>[ManagedEntry](#ManagedEntry)</code>  
**Returns**: <code>[ManagedEntry](#ManagedEntry)</code> - Returns self  
**Params**: <code>[ManagedGroup](#ManagedGroup)</code> group The target group  
<a name="ManagedEntry+setAttribute"></a>

### managedEntry.setAttribute(attributeName, value) ⇒ <code>[ManagedEntry](#ManagedEntry)</code>
Set an attribute on the entry

**Kind**: instance method of <code>[ManagedEntry](#ManagedEntry)</code>  
**Returns**: <code>[ManagedEntry](#ManagedEntry)</code> - Returns self  

| Param | Type | Description |
| --- | --- | --- |
| attributeName | <code>String</code> | The name of the attribute |
| value | <code>String</code> | The value to set |

<a name="ManagedEntry+setMeta"></a>

### managedEntry.setMeta(prop, value) ⇒ <code>[ManagedEntry](#ManagedEntry)</code>
Set a meta value on the entry

**Kind**: instance method of <code>[ManagedEntry](#ManagedEntry)</code>  
**Returns**: <code>[ManagedEntry](#ManagedEntry)</code> - Returns self  

| Param | Type | Description |
| --- | --- | --- |
| prop | <code>String</code> | The meta name |
| value | <code>String</code> | The value to set |

<a name="ManagedEntry+setProperty"></a>

### managedEntry.setProperty(prop, value) ⇒ <code>[ManagedEntry](#ManagedEntry)</code>
Set a property on the entry

**Kind**: instance method of <code>[ManagedEntry](#ManagedEntry)</code>  
**Returns**: <code>[ManagedEntry](#ManagedEntry)</code> - Returns self  

| Param | Type | Description |
| --- | --- | --- |
| prop | <code>String</code> | The property name |
| value | <code>String</code> | The property value |

<a name="ManagedEntry+toObject"></a>

### managedEntry.toObject() ⇒ <code>Object</code>
Export entry to object

**Kind**: instance method of <code>[ManagedEntry](#ManagedEntry)</code>  
<a name="ManagedEntry+toString"></a>

### managedEntry.toString() ⇒ <code>string</code>
toString override

**Kind**: instance method of <code>[ManagedEntry](#ManagedEntry)</code>  
<a name="ManagedEntry+_getArchive"></a>

### managedEntry._getArchive() ⇒ <code>Archive</code>
Get the archive reference

**Kind**: instance method of <code>[ManagedEntry](#ManagedEntry)</code>  
<a name="ManagedEntry+_getRemoteObject"></a>

### managedEntry._getRemoteObject() ⇒ <code>Object</code>
Get the remote object that mirrors the data represented here

**Kind**: instance method of <code>[ManagedEntry](#ManagedEntry)</code>  
<a name="ManagedEntry+_getWestley"></a>

### managedEntry._getWestley() ⇒ <code>[Westley](#Westley)</code>
Get the Westley reference

**Kind**: instance method of <code>[ManagedEntry](#ManagedEntry)</code>  
<a name="ManagedEntry.createNew"></a>

### ManagedEntry.createNew(archive, groupID) ⇒ <code>[ManagedEntry](#ManagedEntry)</code>
Create a new entry

**Kind**: static method of <code>[ManagedEntry](#ManagedEntry)</code>  

| Param | Type | Description |
| --- | --- | --- |
| archive | <code>Archive</code> | The archive |
| groupID | <code>string</code> | The ID of the target group |

<a name="ManagedGroup"></a>

## ManagedGroup
**Kind**: global class  

* [ManagedGroup](#ManagedGroup)
    * [new ManagedGroup(archive, remoteObj)](#new_ManagedGroup_new)
    * _instance_
        * [.createEntry([title])](#ManagedGroup+createEntry) ⇒ <code>[ManagedEntry](#ManagedEntry)</code>
        * [.createGroup([title])](#ManagedGroup+createGroup) ⇒ <code>[ManagedGroup](#ManagedGroup)</code>
        * [.delete()](#ManagedGroup+delete) ⇒ <code>Boolean</code>
        * [.deleteAttribute(attr)](#ManagedGroup+deleteAttribute) ⇒ <code>[ManagedGroup](#ManagedGroup)</code>
        * [.getAttribute(attributeName)](#ManagedGroup+getAttribute) ⇒ <code>string</code> &#124; <code>undefined</code>
        * [.getEntries()](#ManagedGroup+getEntries) ⇒ <code>[Array.&lt;ManagedEntry&gt;](#ManagedEntry)</code>
        * [.getGroupByID(groupID)](#ManagedGroup+getGroupByID) ⇒ <code>[ManagedGroup](#ManagedGroup)</code> &#124; <code>null</code>
        * [.getGroups()](#ManagedGroup+getGroups) ⇒ <code>[Array.&lt;ManagedGroup&gt;](#ManagedGroup)</code>
        * [.getID()](#ManagedGroup+getID) ⇒ <code>string</code>
        * [.getTitle()](#ManagedGroup+getTitle) ⇒ <code>string</code>
        * [.isInTrash()](#ManagedGroup+isInTrash) ⇒ <code>Boolean</code>
        * [.isTrash()](#ManagedGroup+isTrash) ⇒ <code>Boolean</code>
        * [.moveToGroup(group)](#ManagedGroup+moveToGroup) ⇒ <code>[ManagedGroup](#ManagedGroup)</code>
        * [.setAttribute(attributeName, value)](#ManagedGroup+setAttribute) ⇒ <code>[ManagedGroup](#ManagedGroup)</code>
        * [.setTitle(title)](#ManagedGroup+setTitle) ⇒ <code>[ManagedGroup](#ManagedGroup)</code>
        * [.toObject(outputFlags)](#ManagedGroup+toObject) ⇒ <code>Object</code>
        * [.toString(outputFlags)](#ManagedGroup+toString) ⇒ <code>string</code>
        * [._getArchive()](#ManagedGroup+_getArchive) ⇒ <code>Archive</code>
        * [._getRemoteObject()](#ManagedGroup+_getRemoteObject) ⇒ <code>Object</code>
        * [._getWestley()](#ManagedGroup+_getWestley) ⇒ <code>[Westley](#Westley)</code>
    * _static_
        * [.OutputFlag](#ManagedGroup.OutputFlag)
        * [.createNew(archive, [parentID])](#ManagedGroup.createNew) ⇒ <code>[ManagedGroup](#ManagedGroup)</code>

<a name="new_ManagedGroup_new"></a>

### new ManagedGroup(archive, remoteObj)
Managed group class


| Param | Type | Description |
| --- | --- | --- |
| archive | <code>Archive</code> | The archive instance |
| remoteObj | <code>Object</code> | The remote object reference |

<a name="ManagedGroup+createEntry"></a>

### managedGroup.createEntry([title]) ⇒ <code>[ManagedEntry](#ManagedEntry)</code>
Create a new entry with a title

**Kind**: instance method of <code>[ManagedGroup](#ManagedGroup)</code>  
**Returns**: <code>[ManagedEntry](#ManagedEntry)</code> - The new entry  

| Param | Type |
| --- | --- |
| [title] | <code>string</code> | 

<a name="ManagedGroup+createGroup"></a>

### managedGroup.createGroup([title]) ⇒ <code>[ManagedGroup](#ManagedGroup)</code>
Create a child group

**Kind**: instance method of <code>[ManagedGroup](#ManagedGroup)</code>  
**Returns**: <code>[ManagedGroup](#ManagedGroup)</code> - The new child group  

| Param | Type | Description |
| --- | --- | --- |
| [title] | <code>string</code> | Optionally set a title |

<a name="ManagedGroup+delete"></a>

### managedGroup.delete() ⇒ <code>Boolean</code>
Delete the group
If there is a trash group available, the group is moved there. If the group
is already in the trash, it is deleted permanently.

**Kind**: instance method of <code>[ManagedGroup](#ManagedGroup)</code>  
**Returns**: <code>Boolean</code> - True when deleted, false when moved to trash  
<a name="ManagedGroup+deleteAttribute"></a>

### managedGroup.deleteAttribute(attr) ⇒ <code>[ManagedGroup](#ManagedGroup)</code>
Delete an attribute

**Kind**: instance method of <code>[ManagedGroup](#ManagedGroup)</code>  
**Returns**: <code>[ManagedGroup](#ManagedGroup)</code> - Returns self  

| Param | Type | Description |
| --- | --- | --- |
| attr | <code>string</code> | The name of the attribute |

<a name="ManagedGroup+getAttribute"></a>

### managedGroup.getAttribute(attributeName) ⇒ <code>string</code> &#124; <code>undefined</code>
Get an attribute

**Kind**: instance method of <code>[ManagedGroup](#ManagedGroup)</code>  
**Returns**: <code>string</code> &#124; <code>undefined</code> - Returns the attribute or undefined if not found  

| Param | Type | Description |
| --- | --- | --- |
| attributeName | <code>string</code> | The name of the attribute |

<a name="ManagedGroup+getEntries"></a>

### managedGroup.getEntries() ⇒ <code>[Array.&lt;ManagedEntry&gt;](#ManagedEntry)</code>
Get the entries within the group

**Kind**: instance method of <code>[ManagedGroup](#ManagedGroup)</code>  
<a name="ManagedGroup+getGroupByID"></a>

### managedGroup.getGroupByID(groupID) ⇒ <code>[ManagedGroup](#ManagedGroup)</code> &#124; <code>null</code>
Get a child group (deep) by its ID

**Kind**: instance method of <code>[ManagedGroup](#ManagedGroup)</code>  
**Returns**: <code>[ManagedGroup](#ManagedGroup)</code> &#124; <code>null</code> - The found group or null  

| Param | Type | Description |
| --- | --- | --- |
| groupID | <code>String</code> | The ID of the group to get |

<a name="ManagedGroup+getGroups"></a>

### managedGroup.getGroups() ⇒ <code>[Array.&lt;ManagedGroup&gt;](#ManagedGroup)</code>
Get the groups within the group

**Kind**: instance method of <code>[ManagedGroup](#ManagedGroup)</code>  
**Returns**: <code>[Array.&lt;ManagedGroup&gt;](#ManagedGroup)</code> - An array of child groups  
<a name="ManagedGroup+getID"></a>

### managedGroup.getID() ⇒ <code>string</code>
Get the group ID

**Kind**: instance method of <code>[ManagedGroup](#ManagedGroup)</code>  
**Returns**: <code>string</code> - The ID of the group  
<a name="ManagedGroup+getTitle"></a>

### managedGroup.getTitle() ⇒ <code>string</code>
Get the group title

**Kind**: instance method of <code>[ManagedGroup](#ManagedGroup)</code>  
**Returns**: <code>string</code> - The title of the group  
<a name="ManagedGroup+isInTrash"></a>

### managedGroup.isInTrash() ⇒ <code>Boolean</code>
Check if the group is in the trash

**Kind**: instance method of <code>[ManagedGroup](#ManagedGroup)</code>  
**Returns**: <code>Boolean</code> - Whether or not the group is within the trash group  
<a name="ManagedGroup+isTrash"></a>

### managedGroup.isTrash() ⇒ <code>Boolean</code>
Check if the group is used for trash

**Kind**: instance method of <code>[ManagedGroup](#ManagedGroup)</code>  
**Returns**: <code>Boolean</code> - Whether or not the group is the trash group  
<a name="ManagedGroup+moveToGroup"></a>

### managedGroup.moveToGroup(group) ⇒ <code>[ManagedGroup](#ManagedGroup)</code>
Move the group into another

**Kind**: instance method of <code>[ManagedGroup](#ManagedGroup)</code>  
**Returns**: <code>[ManagedGroup](#ManagedGroup)</code> - Returns self  

| Param | Type | Description |
| --- | --- | --- |
| group | <code>[ManagedGroup](#ManagedGroup)</code> | The target group (new parent) |

<a name="ManagedGroup+setAttribute"></a>

### managedGroup.setAttribute(attributeName, value) ⇒ <code>[ManagedGroup](#ManagedGroup)</code>
Set an attribute

**Kind**: instance method of <code>[ManagedGroup](#ManagedGroup)</code>  
**Returns**: <code>[ManagedGroup](#ManagedGroup)</code> - Returns self  

| Param | Type | Description |
| --- | --- | --- |
| attributeName | <code>string</code> | The name of the attribute |
| value | <code>string</code> | The value to set |

<a name="ManagedGroup+setTitle"></a>

### managedGroup.setTitle(title) ⇒ <code>[ManagedGroup](#ManagedGroup)</code>
Set the group title

**Kind**: instance method of <code>[ManagedGroup](#ManagedGroup)</code>  
**Returns**: <code>[ManagedGroup](#ManagedGroup)</code> - Returns self  

| Param | Type | Description |
| --- | --- | --- |
| title | <code>string</code> | The title of the group |

<a name="ManagedGroup+toObject"></a>

### managedGroup.toObject(outputFlags) ⇒ <code>Object</code>
Export group to object

**Kind**: instance method of <code>[ManagedGroup](#ManagedGroup)</code>  
**Returns**: <code>Object</code> - The group, in raw object form  

| Param | Type | Description |
| --- | --- | --- |
| outputFlags | <code>Number</code> | Bitwise options for outputting entries and child groups |

**Example**  
```js
// output defaults (entries and sub groups)
     group.toObject()
```
**Example**  
```js
// output only entries
     group.toObject(ManagedGroup.OutputFlag.Entries)
```
**Example**  
```js
// output only the group info
     group.toObject(ManagedGroup.OutputFlag.OnlyGroup)
```
<a name="ManagedGroup+toString"></a>

### managedGroup.toString(outputFlags) ⇒ <code>string</code>
Export the group to a JSON string

**Kind**: instance method of <code>[ManagedGroup](#ManagedGroup)</code>  
**Returns**: <code>string</code> - The group (and entries) in JSON string format  
**See**: toObject  

| Param | Type | Description |
| --- | --- | --- |
| outputFlags | <code>Number</code> | Output configuration flags to pass to `toObject` |

<a name="ManagedGroup+_getArchive"></a>

### managedGroup._getArchive() ⇒ <code>Archive</code>
Get the archive instance reference

**Kind**: instance method of <code>[ManagedGroup](#ManagedGroup)</code>  
**Access:** protected  
<a name="ManagedGroup+_getRemoteObject"></a>

### managedGroup._getRemoteObject() ⇒ <code>Object</code>
Get the remotely-managed object (group)

**Kind**: instance method of <code>[ManagedGroup](#ManagedGroup)</code>  
**Returns**: <code>Object</code> - The object instance for the group  
**Access:** protected  
<a name="ManagedGroup+_getWestley"></a>

### managedGroup._getWestley() ⇒ <code>[Westley](#Westley)</code>
Get the delta managing instance for the archive

**Kind**: instance method of <code>[ManagedGroup](#ManagedGroup)</code>  
**Returns**: <code>[Westley](#Westley)</code> - The internal Westley object  
**Access:** protected  
<a name="ManagedGroup.OutputFlag"></a>

### ManagedGroup.OutputFlag
Bitwise output flags for `toObject` and `toString`

**Kind**: static property of <code>[ManagedGroup](#ManagedGroup)</code>  
**See**

- toObject
- toString

<a name="ManagedGroup.createNew"></a>

### ManagedGroup.createNew(archive, [parentID]) ⇒ <code>[ManagedGroup](#ManagedGroup)</code>
Create a new ManagedGroup with a delta-manager and parent group ID

**Kind**: static method of <code>[ManagedGroup](#ManagedGroup)</code>  
**Returns**: <code>[ManagedGroup](#ManagedGroup)</code> - A new group  

| Param | Type | Description |
| --- | --- | --- |
| archive | <code>Archive</code> | The archive to create the group in |
| [parentID] | <code>string</code> | The parent group ID (default is root) |

<a name="Model"></a>

## Model
**Kind**: global class  

* [Model](#Model)
    * [new Model(data)](#new_Model_new)
    * [.get(key, [defaultValue])](#Model+get) ⇒ <code>\*</code>
    * [.getData()](#Model+getData) ⇒ <code>Object</code>
    * [.set(key, value)](#Model+set) ⇒ <code>[Model](#Model)</code>

<a name="new_Model_new"></a>

### new Model(data)
Data modelling helper


| Param | Type |
| --- | --- |
| data | <code>Object</code> | 

<a name="Model+get"></a>

### model.get(key, [defaultValue]) ⇒ <code>\*</code>
Get a value for a property.
 eg. model.get("some.deep.property", 19);

**Kind**: instance method of <code>[Model](#Model)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key to get the value for. Splits by period '.' for sub-objects. |
| [defaultValue] | <code>\*</code> | A default value to return if the property is not found |

<a name="Model+getData"></a>

### model.getData() ⇒ <code>Object</code>
Get the wrapped object

**Kind**: instance method of <code>[Model](#Model)</code>  
**Access:** public  
<a name="Model+set"></a>

### model.set(key, value) ⇒ <code>[Model](#Model)</code>
Set a property

**Kind**: instance method of <code>[Model](#Model)</code>  
**Returns**: <code>[Model](#Model)</code> - Returns self  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The location (property) at which to set a value (eg. "some.nested.prop") |
| value | <code>string</code> &#124; <code>number</code> &#124; <code>Object</code> &#124; <code>\*</code> | The value to set |

<a name="OwnCloudDatasource"></a>

## OwnCloudDatasource ⇐ <code>[WebDAVDatasource](#WebDAVDatasource)</code>
**Kind**: global class  
**Extends:** <code>[WebDAVDatasource](#WebDAVDatasource)</code>  

* [OwnCloudDatasource](#OwnCloudDatasource) ⇐ <code>[WebDAVDatasource](#WebDAVDatasource)</code>
    * [new OwnCloudDatasource()](#new_OwnCloudDatasource_new)
    * [new OwnCloudDatasource(owncloudURL, resourcePath, username, password)](#new_OwnCloudDatasource_new)
    * [.toString()](#OwnCloudDatasource+toString) ⇒ <code>string</code>
    * [.getArchivePath()](#WebDAVDatasource+getArchivePath) ⇒ <code>string</code>
    * [.getRemoteEndpoint()](#WebDAVDatasource+getRemoteEndpoint) ⇒ <code>string</code>
    * [.load(password)](#WebDAVDatasource+load) ⇒ <code>Promise.&lt;Archive&gt;</code>
    * [.save(archive, password)](#WebDAVDatasource+save) ⇒ <code>Promise</code>

<a name="new_OwnCloudDatasource_new"></a>

### new OwnCloudDatasource()
Datasource for OwnCloud archives

<a name="new_OwnCloudDatasource_new"></a>

### new OwnCloudDatasource(owncloudURL, resourcePath, username, password)
Datasource for Owncloud connections


| Param | Type | Description |
| --- | --- | --- |
| owncloudURL | <code>String</code> | The URL to the owncloud instance, without "remote.php/webdav" etc. |
| resourcePath | <code>String</code> | The file path |
| username | <code>String</code> | The username for owncloud |
| password | <code>String</code> | The password for owncloud |

<a name="OwnCloudDatasource+toString"></a>

### ownCloudDatasource.toString() ⇒ <code>string</code>
Output the datasource configuration as a string (no credentials included)

**Kind**: instance method of <code>[OwnCloudDatasource](#OwnCloudDatasource)</code>  
**Overrides:** <code>[toString](#WebDAVDatasource+toString)</code>  
<a name="WebDAVDatasource+getArchivePath"></a>

### ownCloudDatasource.getArchivePath() ⇒ <code>string</code>
Get the path of the archive on the server

**Kind**: instance method of <code>[OwnCloudDatasource](#OwnCloudDatasource)</code>  
<a name="WebDAVDatasource+getRemoteEndpoint"></a>

### ownCloudDatasource.getRemoteEndpoint() ⇒ <code>string</code>
Get the remote endpoint URI (no resource path)

**Kind**: instance method of <code>[OwnCloudDatasource](#OwnCloudDatasource)</code>  
<a name="WebDAVDatasource+load"></a>

### ownCloudDatasource.load(password) ⇒ <code>Promise.&lt;Archive&gt;</code>
Load the archive using a password

**Kind**: instance method of <code>[OwnCloudDatasource](#OwnCloudDatasource)</code>  
**Returns**: <code>Promise.&lt;Archive&gt;</code> - A promise resolving with the opened archive  

| Param | Type | Description |
| --- | --- | --- |
| password | <code>string</code> | The password for archive decryption |

<a name="WebDAVDatasource+save"></a>

### ownCloudDatasource.save(archive, password) ⇒ <code>Promise</code>
Save an archive with a password to the WebDAV service

**Kind**: instance method of <code>[OwnCloudDatasource](#OwnCloudDatasource)</code>  
**Returns**: <code>Promise</code> - A promise resolving when the save is complete  

| Param | Type | Description |
| --- | --- | --- |
| archive | <code>Archive</code> | The archive to save |
| password | <code>string</code> | The password for encryption |

<a name="OwnCloudDatasource"></a>

## OwnCloudDatasource
**Kind**: global class  

* [OwnCloudDatasource](#OwnCloudDatasource)
    * [new OwnCloudDatasource()](#new_OwnCloudDatasource_new)
    * [new OwnCloudDatasource(owncloudURL, resourcePath, username, password)](#new_OwnCloudDatasource_new)
    * [.toString()](#OwnCloudDatasource+toString) ⇒ <code>string</code>
    * [.getArchivePath()](#WebDAVDatasource+getArchivePath) ⇒ <code>string</code>
    * [.getRemoteEndpoint()](#WebDAVDatasource+getRemoteEndpoint) ⇒ <code>string</code>
    * [.load(password)](#WebDAVDatasource+load) ⇒ <code>Promise.&lt;Archive&gt;</code>
    * [.save(archive, password)](#WebDAVDatasource+save) ⇒ <code>Promise</code>

<a name="new_OwnCloudDatasource_new"></a>

### new OwnCloudDatasource()
Datasource for OwnCloud archives

<a name="new_OwnCloudDatasource_new"></a>

### new OwnCloudDatasource(owncloudURL, resourcePath, username, password)
Datasource for Owncloud connections


| Param | Type | Description |
| --- | --- | --- |
| owncloudURL | <code>String</code> | The URL to the owncloud instance, without "remote.php/webdav" etc. |
| resourcePath | <code>String</code> | The file path |
| username | <code>String</code> | The username for owncloud |
| password | <code>String</code> | The password for owncloud |

<a name="OwnCloudDatasource+toString"></a>

### ownCloudDatasource.toString() ⇒ <code>string</code>
Output the datasource configuration as a string (no credentials included)

**Kind**: instance method of <code>[OwnCloudDatasource](#OwnCloudDatasource)</code>  
**Overrides:** <code>[toString](#WebDAVDatasource+toString)</code>  
<a name="WebDAVDatasource+getArchivePath"></a>

### ownCloudDatasource.getArchivePath() ⇒ <code>string</code>
Get the path of the archive on the server

**Kind**: instance method of <code>[OwnCloudDatasource](#OwnCloudDatasource)</code>  
<a name="WebDAVDatasource+getRemoteEndpoint"></a>

### ownCloudDatasource.getRemoteEndpoint() ⇒ <code>string</code>
Get the remote endpoint URI (no resource path)

**Kind**: instance method of <code>[OwnCloudDatasource](#OwnCloudDatasource)</code>  
<a name="WebDAVDatasource+load"></a>

### ownCloudDatasource.load(password) ⇒ <code>Promise.&lt;Archive&gt;</code>
Load the archive using a password

**Kind**: instance method of <code>[OwnCloudDatasource](#OwnCloudDatasource)</code>  
**Returns**: <code>Promise.&lt;Archive&gt;</code> - A promise resolving with the opened archive  

| Param | Type | Description |
| --- | --- | --- |
| password | <code>string</code> | The password for archive decryption |

<a name="WebDAVDatasource+save"></a>

### ownCloudDatasource.save(archive, password) ⇒ <code>Promise</code>
Save an archive with a password to the WebDAV service

**Kind**: instance method of <code>[OwnCloudDatasource](#OwnCloudDatasource)</code>  
**Returns**: <code>Promise</code> - A promise resolving when the save is complete  

| Param | Type | Description |
| --- | --- | --- |
| archive | <code>Archive</code> | The archive to save |
| password | <code>string</code> | The password for encryption |

<a name="TextDatasource"></a>

## TextDatasource
**Kind**: global class  

* [TextDatasource](#TextDatasource)
    * [new TextDatasource()](#new_TextDatasource_new)
    * [new TextDatasource(content)](#new_TextDatasource_new)
    * [.load(credentials, [emptyCreatesNew])](#TextDatasource+load) ⇒ <code>Promise.&lt;Archive&gt;</code>
    * [.save(archive, credentials)](#TextDatasource+save) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.setContent(content)](#TextDatasource+setContent) ⇒ <code>[TextDatasource](#TextDatasource)</code>
    * [.toString()](#TextDatasource+toString) ⇒ <code>string</code>

<a name="new_TextDatasource_new"></a>

### new TextDatasource()
Datasource for text input and output

<a name="new_TextDatasource_new"></a>

### new TextDatasource(content)
Constructor for the text datasource


| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | The content to load from |

<a name="TextDatasource+load"></a>

### textDatasource.load(credentials, [emptyCreatesNew]) ⇒ <code>Promise.&lt;Archive&gt;</code>
Load from the stored content using a password to decrypt

**Kind**: instance method of <code>[TextDatasource](#TextDatasource)</code>  
**Returns**: <code>Promise.&lt;Archive&gt;</code> - A promise that resolves with an open archive  

| Param | Type | Description |
| --- | --- | --- |
| credentials | <code>string</code> &#124; <code>[Credentials](#Credentials)</code> | The password or Credentials instance to decrypt with |
| [emptyCreatesNew] | <code>Boolean</code> | Create a new Archive instance if text contents are empty (defaults to false) |

<a name="TextDatasource+save"></a>

### textDatasource.save(archive, credentials) ⇒ <code>Promise.&lt;string&gt;</code>
Save an archive with a password

**Kind**: instance method of <code>[TextDatasource](#TextDatasource)</code>  
**Returns**: <code>Promise.&lt;string&gt;</code> - A promise resolving with the encrypted content  

| Param | Type | Description |
| --- | --- | --- |
| archive | <code>Archive</code> | The archive to save |
| credentials | <code>string</code> | The password or Credentials instance to encrypt with |

<a name="TextDatasource+setContent"></a>

### textDatasource.setContent(content) ⇒ <code>[TextDatasource](#TextDatasource)</code>
Set the text content

**Kind**: instance method of <code>[TextDatasource](#TextDatasource)</code>  
**Returns**: <code>[TextDatasource](#TextDatasource)</code> - Self  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | The new text content |

<a name="TextDatasource+toString"></a>

### textDatasource.toString() ⇒ <code>string</code>
Output the datasource configuration as a string

**Kind**: instance method of <code>[TextDatasource](#TextDatasource)</code>  
<a name="TextDatasource"></a>

## TextDatasource
**Kind**: global class  

* [TextDatasource](#TextDatasource)
    * [new TextDatasource()](#new_TextDatasource_new)
    * [new TextDatasource(content)](#new_TextDatasource_new)
    * [.load(credentials, [emptyCreatesNew])](#TextDatasource+load) ⇒ <code>Promise.&lt;Archive&gt;</code>
    * [.save(archive, credentials)](#TextDatasource+save) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.setContent(content)](#TextDatasource+setContent) ⇒ <code>[TextDatasource](#TextDatasource)</code>
    * [.toString()](#TextDatasource+toString) ⇒ <code>string</code>

<a name="new_TextDatasource_new"></a>

### new TextDatasource()
Datasource for text input and output

<a name="new_TextDatasource_new"></a>

### new TextDatasource(content)
Constructor for the text datasource


| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | The content to load from |

<a name="TextDatasource+load"></a>

### textDatasource.load(credentials, [emptyCreatesNew]) ⇒ <code>Promise.&lt;Archive&gt;</code>
Load from the stored content using a password to decrypt

**Kind**: instance method of <code>[TextDatasource](#TextDatasource)</code>  
**Returns**: <code>Promise.&lt;Archive&gt;</code> - A promise that resolves with an open archive  

| Param | Type | Description |
| --- | --- | --- |
| credentials | <code>string</code> &#124; <code>[Credentials](#Credentials)</code> | The password or Credentials instance to decrypt with |
| [emptyCreatesNew] | <code>Boolean</code> | Create a new Archive instance if text contents are empty (defaults to false) |

<a name="TextDatasource+save"></a>

### textDatasource.save(archive, credentials) ⇒ <code>Promise.&lt;string&gt;</code>
Save an archive with a password

**Kind**: instance method of <code>[TextDatasource](#TextDatasource)</code>  
**Returns**: <code>Promise.&lt;string&gt;</code> - A promise resolving with the encrypted content  

| Param | Type | Description |
| --- | --- | --- |
| archive | <code>Archive</code> | The archive to save |
| credentials | <code>string</code> | The password or Credentials instance to encrypt with |

<a name="TextDatasource+setContent"></a>

### textDatasource.setContent(content) ⇒ <code>[TextDatasource](#TextDatasource)</code>
Set the text content

**Kind**: instance method of <code>[TextDatasource](#TextDatasource)</code>  
**Returns**: <code>[TextDatasource](#TextDatasource)</code> - Self  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | The new text content |

<a name="TextDatasource+toString"></a>

### textDatasource.toString() ⇒ <code>string</code>
Output the datasource configuration as a string

**Kind**: instance method of <code>[TextDatasource](#TextDatasource)</code>  
<a name="WebDAVDatasource"></a>

## WebDAVDatasource ⇐ <code>[TextDatasource](#TextDatasource)</code>
**Kind**: global class  
**Extends:** <code>[TextDatasource](#TextDatasource)</code>  

* [WebDAVDatasource](#WebDAVDatasource) ⇐ <code>[TextDatasource](#TextDatasource)</code>
    * [new WebDAVDatasource()](#new_WebDAVDatasource_new)
    * [new WebDAVDatasource(endpoint, webDAVPath, username, password)](#new_WebDAVDatasource_new)
    * [.getArchivePath()](#WebDAVDatasource+getArchivePath) ⇒ <code>string</code>
    * [.getRemoteEndpoint()](#WebDAVDatasource+getRemoteEndpoint) ⇒ <code>string</code>
    * [.load(password)](#WebDAVDatasource+load) ⇒ <code>Promise.&lt;Archive&gt;</code>
    * [.save(archive, password)](#WebDAVDatasource+save) ⇒ <code>Promise</code>
    * [.toString()](#WebDAVDatasource+toString) ⇒ <code>string</code>
    * [.setContent(content)](#TextDatasource+setContent) ⇒ <code>[TextDatasource](#TextDatasource)</code>

<a name="new_WebDAVDatasource_new"></a>

### new WebDAVDatasource()
WebDAV datasource for reading and writing remote archives

<a name="new_WebDAVDatasource_new"></a>

### new WebDAVDatasource(endpoint, webDAVPath, username, password)
Constructor for the datasource


| Param | Type | Description |
| --- | --- | --- |
| endpoint | <code>string</code> | URL for the WebDAV service (without resource path) |
| webDAVPath | <code>string</code> | Resource path on the WebDAV service |
| username | <code>string</code> | Username for the WebDAV service |
| password | <code>string</code> | Password for the WebDAV service |

<a name="WebDAVDatasource+getArchivePath"></a>

### webDAVDatasource.getArchivePath() ⇒ <code>string</code>
Get the path of the archive on the server

**Kind**: instance method of <code>[WebDAVDatasource](#WebDAVDatasource)</code>  
<a name="WebDAVDatasource+getRemoteEndpoint"></a>

### webDAVDatasource.getRemoteEndpoint() ⇒ <code>string</code>
Get the remote endpoint URI (no resource path)

**Kind**: instance method of <code>[WebDAVDatasource](#WebDAVDatasource)</code>  
<a name="WebDAVDatasource+load"></a>

### webDAVDatasource.load(password) ⇒ <code>Promise.&lt;Archive&gt;</code>
Load the archive using a password

**Kind**: instance method of <code>[WebDAVDatasource](#WebDAVDatasource)</code>  
**Overrides:** <code>[load](#TextDatasource+load)</code>  
**Returns**: <code>Promise.&lt;Archive&gt;</code> - A promise resolving with the opened archive  

| Param | Type | Description |
| --- | --- | --- |
| password | <code>string</code> | The password for archive decryption |

<a name="WebDAVDatasource+save"></a>

### webDAVDatasource.save(archive, password) ⇒ <code>Promise</code>
Save an archive with a password to the WebDAV service

**Kind**: instance method of <code>[WebDAVDatasource](#WebDAVDatasource)</code>  
**Overrides:** <code>[save](#TextDatasource+save)</code>  
**Returns**: <code>Promise</code> - A promise resolving when the save is complete  

| Param | Type | Description |
| --- | --- | --- |
| archive | <code>Archive</code> | The archive to save |
| password | <code>string</code> | The password for encryption |

<a name="WebDAVDatasource+toString"></a>

### webDAVDatasource.toString() ⇒ <code>string</code>
Output the datasource configuration as a string (no credentials included)

**Kind**: instance method of <code>[WebDAVDatasource](#WebDAVDatasource)</code>  
**Overrides:** <code>[toString](#TextDatasource+toString)</code>  
<a name="TextDatasource+setContent"></a>

### webDAVDatasource.setContent(content) ⇒ <code>[TextDatasource](#TextDatasource)</code>
Set the text content

**Kind**: instance method of <code>[WebDAVDatasource](#WebDAVDatasource)</code>  
**Returns**: <code>[TextDatasource](#TextDatasource)</code> - Self  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | The new text content |

<a name="WebDAVDatasource"></a>

## WebDAVDatasource
**Kind**: global class  

* [WebDAVDatasource](#WebDAVDatasource)
    * [new WebDAVDatasource()](#new_WebDAVDatasource_new)
    * [new WebDAVDatasource(endpoint, webDAVPath, username, password)](#new_WebDAVDatasource_new)
    * [.getArchivePath()](#WebDAVDatasource+getArchivePath) ⇒ <code>string</code>
    * [.getRemoteEndpoint()](#WebDAVDatasource+getRemoteEndpoint) ⇒ <code>string</code>
    * [.load(password)](#WebDAVDatasource+load) ⇒ <code>Promise.&lt;Archive&gt;</code>
    * [.save(archive, password)](#WebDAVDatasource+save) ⇒ <code>Promise</code>
    * [.toString()](#WebDAVDatasource+toString) ⇒ <code>string</code>
    * [.setContent(content)](#TextDatasource+setContent) ⇒ <code>[TextDatasource](#TextDatasource)</code>

<a name="new_WebDAVDatasource_new"></a>

### new WebDAVDatasource()
WebDAV datasource for reading and writing remote archives

<a name="new_WebDAVDatasource_new"></a>

### new WebDAVDatasource(endpoint, webDAVPath, username, password)
Constructor for the datasource


| Param | Type | Description |
| --- | --- | --- |
| endpoint | <code>string</code> | URL for the WebDAV service (without resource path) |
| webDAVPath | <code>string</code> | Resource path on the WebDAV service |
| username | <code>string</code> | Username for the WebDAV service |
| password | <code>string</code> | Password for the WebDAV service |

<a name="WebDAVDatasource+getArchivePath"></a>

### webDAVDatasource.getArchivePath() ⇒ <code>string</code>
Get the path of the archive on the server

**Kind**: instance method of <code>[WebDAVDatasource](#WebDAVDatasource)</code>  
<a name="WebDAVDatasource+getRemoteEndpoint"></a>

### webDAVDatasource.getRemoteEndpoint() ⇒ <code>string</code>
Get the remote endpoint URI (no resource path)

**Kind**: instance method of <code>[WebDAVDatasource](#WebDAVDatasource)</code>  
<a name="WebDAVDatasource+load"></a>

### webDAVDatasource.load(password) ⇒ <code>Promise.&lt;Archive&gt;</code>
Load the archive using a password

**Kind**: instance method of <code>[WebDAVDatasource](#WebDAVDatasource)</code>  
**Overrides:** <code>[load](#TextDatasource+load)</code>  
**Returns**: <code>Promise.&lt;Archive&gt;</code> - A promise resolving with the opened archive  

| Param | Type | Description |
| --- | --- | --- |
| password | <code>string</code> | The password for archive decryption |

<a name="WebDAVDatasource+save"></a>

### webDAVDatasource.save(archive, password) ⇒ <code>Promise</code>
Save an archive with a password to the WebDAV service

**Kind**: instance method of <code>[WebDAVDatasource](#WebDAVDatasource)</code>  
**Overrides:** <code>[save](#TextDatasource+save)</code>  
**Returns**: <code>Promise</code> - A promise resolving when the save is complete  

| Param | Type | Description |
| --- | --- | --- |
| archive | <code>Archive</code> | The archive to save |
| password | <code>string</code> | The password for encryption |

<a name="WebDAVDatasource+toString"></a>

### webDAVDatasource.toString() ⇒ <code>string</code>
Output the datasource configuration as a string (no credentials included)

**Kind**: instance method of <code>[WebDAVDatasource](#WebDAVDatasource)</code>  
**Overrides:** <code>[toString](#TextDatasource+toString)</code>  
<a name="TextDatasource+setContent"></a>

### webDAVDatasource.setContent(content) ⇒ <code>[TextDatasource](#TextDatasource)</code>
Set the text content

**Kind**: instance method of <code>[WebDAVDatasource](#WebDAVDatasource)</code>  
**Returns**: <code>[TextDatasource](#TextDatasource)</code> - Self  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | The new text content |

<a name="Westley"></a>

## Westley
**Kind**: global class  

* [Westley](#Westley)
    * [new Westley()](#new_Westley_new)
    * [.clear()](#Westley+clear) ⇒ <code>[Westley](#Westley)</code>
    * [.execute(command)](#Westley+execute) ⇒ <code>[Westley](#Westley)</code>
    * [._getCommandForKey(commandKey)](#Westley+_getCommandForKey) ⇒ <code>Command</code>
    * [.pad()](#Westley+pad) ⇒ <code>[Westley](#Westley)</code>
    * [.getDataset()](#Westley+getDataset) ⇒ <code>Object</code>
    * [.getHistory()](#Westley+getHistory) ⇒ <code>Array.&lt;String&gt;</code>

<a name="new_Westley_new"></a>

### new Westley()
Westley. Archive object dataset and history manager. Handles parsing and
revenge for the princess.

<a name="Westley+clear"></a>

### westley.clear() ⇒ <code>[Westley](#Westley)</code>
Clear the dataset and history

**Kind**: instance method of <code>[Westley](#Westley)</code>  
**Returns**: <code>[Westley](#Westley)</code> - Returns self  
<a name="Westley+execute"></a>

### westley.execute(command) ⇒ <code>[Westley](#Westley)</code>
Execute a command - stored in history and modifies the dataset

**Kind**: instance method of <code>[Westley](#Westley)</code>  
**Returns**: <code>[Westley](#Westley)</code> - Returns self  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>String</code> | The command to execute |

<a name="Westley+_getCommandForKey"></a>

### westley._getCommandForKey(commandKey) ⇒ <code>Command</code>
Gets a command by its key from the cache with its dependencies injected

**Kind**: instance method of <code>[Westley](#Westley)</code>  
**Returns**: <code>Command</code> - Returns the command  

| Param | Type | Description |
| --- | --- | --- |
| commandKey | <code>String</code> | The key of the command |

<a name="Westley+pad"></a>

### westley.pad() ⇒ <code>[Westley](#Westley)</code>
Insert a padding in the archive (used for delta tracking)

**Kind**: instance method of <code>[Westley](#Westley)</code>  
**Returns**: <code>[Westley](#Westley)</code> - Returns self  
<a name="Westley+getDataset"></a>

### westley.getDataset() ⇒ <code>Object</code>
Get the core dataset

**Kind**: instance method of <code>[Westley](#Westley)</code>  
<a name="Westley+getHistory"></a>

### westley.getHistory() ⇒ <code>Array.&lt;String&gt;</code>
Get the history (deltas)

**Kind**: instance method of <code>[Westley](#Westley)</code>  
<a name="Workspace"></a>

## Workspace
**Kind**: global class  

* [Workspace](#Workspace)
    * [new Workspace()](#new_Workspace_new)
    * [.archiveDiffersFromDatasource()](#Workspace+archiveDiffersFromDatasource) ⇒ <code>Promise</code>
    * [.getArchive()](#Workspace+getArchive) ⇒ <code>Archive</code>
    * [.getDatasource()](#Workspace+getDatasource) ⇒ <code>Object</code>
    * [.getPassword()](#Workspace+getPassword) ⇒ <code>String</code>
    * [.mergeFromDatasource()](#Workspace+mergeFromDatasource) ⇒ <code>Promise</code>
    * [.save()](#Workspace+save) ⇒ <code>Promise</code>
    * [.setArchive(archive)](#Workspace+setArchive) ⇒ <code>[Workspace](#Workspace)</code>
    * [.setDatasource(datasource)](#Workspace+setDatasource) ⇒ <code>[Workspace](#Workspace)</code>
    * [.setPassword(password)](#Workspace+setPassword) ⇒ <code>[Workspace](#Workspace)</code>

<a name="new_Workspace_new"></a>

### new Workspace()
Workspace: handling archive loading, saving and merging

<a name="Workspace+archiveDiffersFromDatasource"></a>

### workspace.archiveDiffersFromDatasource() ⇒ <code>Promise</code>
Check if the archive differs from the one in the datasource

**Kind**: instance method of <code>[Workspace](#Workspace)</code>  
**See**: stageArchiveFromDatasource  
<a name="Workspace+getArchive"></a>

### workspace.getArchive() ⇒ <code>Archive</code>
Get the archive instance

**Kind**: instance method of <code>[Workspace](#Workspace)</code>  
<a name="Workspace+getDatasource"></a>

### workspace.getDatasource() ⇒ <code>Object</code>
Get the datasource instance

**Kind**: instance method of <code>[Workspace](#Workspace)</code>  
**Returns**: <code>Object</code> - A datasource instance (FileDatasource/TextDatasource etc.)  
<a name="Workspace+getPassword"></a>

### workspace.getPassword() ⇒ <code>String</code>
Get the stored password

**Kind**: instance method of <code>[Workspace](#Workspace)</code>  
<a name="Workspace+mergeFromDatasource"></a>

### workspace.mergeFromDatasource() ⇒ <code>Promise</code>
Perform a merge against the remote datasource

**Kind**: instance method of <code>[Workspace](#Workspace)</code>  
<a name="Workspace+save"></a>

### workspace.save() ⇒ <code>Promise</code>
Save the archive to the datasource

**Kind**: instance method of <code>[Workspace](#Workspace)</code>  
**Returns**: <code>Promise</code> - A promise that resolves when the saving has completed  
<a name="Workspace+setArchive"></a>

### workspace.setArchive(archive) ⇒ <code>[Workspace](#Workspace)</code>
Set the archive instance

**Kind**: instance method of <code>[Workspace](#Workspace)</code>  
**Returns**: <code>[Workspace](#Workspace)</code> - Self  

| Param | Type |
| --- | --- |
| archive | <code>Archive</code> | 

<a name="Workspace+setDatasource"></a>

### workspace.setDatasource(datasource) ⇒ <code>[Workspace](#Workspace)</code>
Set the datasource instance

**Kind**: instance method of <code>[Workspace](#Workspace)</code>  
**Returns**: <code>[Workspace](#Workspace)</code> - Self  

| Param | Type |
| --- | --- |
| datasource | <code>Object</code> | 

<a name="Workspace+setPassword"></a>

### workspace.setPassword(password) ⇒ <code>[Workspace](#Workspace)</code>
Set the password

**Kind**: instance method of <code>[Workspace](#Workspace)</code>  
**Returns**: <code>[Workspace](#Workspace)</code> - Self  

| Param | Type |
| --- | --- |
| password | <code>String</code> | 

<a name="ArchiveDataset"></a>

## ArchiveDataset : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| groups | <code>Array.&lt;Object&gt;</code> | Array of groups |
| entries | <code>Array.&lt;Object&gt;</code> | Array of entries |
| attributes | <code>Object</code> | Archive attributes |

<a name="DisplayInfo"></a>

## DisplayInfo
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| title | <code>string</code> | The text to replace "title" |
| username | <code>string</code> | The text to replace "username" |
| password | <code>string</code> | The text to replace "password" |

