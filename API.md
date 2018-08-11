## Modules

<dl>
<dt><a href="#module_Descriptor">Descriptor</a> ⇒ <code>Array.&lt;String&gt;</code></dt>
<dd><p>Describe an archive dataset - to history commands</p>
</dd>
<dt><a href="#module_command">command</a></dt>
<dd><p>Command related tools</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#Archive">Archive</a> ⇐ <code>AsyncEventEmitter</code></dt>
<dd><p>Buttercup Archive</p>
</dd>
<dt><a href="#ArchiveComparator">ArchiveComparator</a></dt>
<dd></dd>
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
<dt><a href="#Entry">Entry</a></dt>
<dd><p>Entry class implementation
Entries form the low-level data structures used in Buttercup, and
are intended to represent logical collections of properties, like
a login for a website.</p>
</dd>
<dt><a href="#EntryFinder">EntryFinder</a></dt>
<dd><p>Entry searching class</p>
</dd>
<dt><a href="#Flattener">Flattener</a></dt>
<dd><p>Flattener class for flattening archive history sets</p>
</dd>
<dt><a href="#Group">Group</a></dt>
<dd><p>Group implementation</p>
</dd>
<dt><a href="#InigoCommand">InigoCommand</a></dt>
<dd><p>Inigo command generator</p>
</dd>
<dt><a href="#Westley">Westley</a> ⇐ <code>AsyncEventEmitter</code></dt>
<dd><p>Westley class
Archive object dataset and history manager. Handles parsing and
revenge for the princess.</p>
</dd>
<dt><a href="#Workspace">Workspace</a></dt>
<dd><p>Workspace class implementation
Workspaces organise Archives and Datasources, and perform saves
and merges with remote changes.</p>
</dd>
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
<dt><a href="#credentialsToDatasource">credentialsToDatasource(sourceCredentials)</a> ⇒ <code>Promise.&lt;{datasource, credentials}&gt;</code></dt>
<dd><p>Convert credentials of a remote archive to a datasource</p>
</dd>
<dt><a href="#credentialsToSource">credentialsToSource(sourceCredentials, archiveCredentials, [initialise], [contentOverride])</a> ⇒ <code>Promise.&lt;Object&gt;</code></dt>
<dd><p>Convert credentials to a source for the ArchiveManager</p>
</dd>
<dt><a href="#addExtraFieldsNonDestructive">addExtraFieldsNonDestructive(entry, fields)</a> ⇒ <code><a href="#EntryFacadeField">Array.&lt;EntryFacadeField&gt;</a></code></dt>
<dd><p>Add extra fields to a fields array that are not mentioned in a preset
Facades are creaded by presets which don&#39;t mention all property values (custom user
added items). This method adds the unmentioned items to the facade fields so that
they can be edited as well.</p>
</dd>
<dt><a href="#applyFieldDescriptor">applyFieldDescriptor(entry, descriptor)</a></dt>
<dd><p>Apply a facade field descriptor to an entry
Takes data from the descriptor and writes it to the entry.</p>
</dd>
<dt><a href="#consumeEntryFacade">consumeEntryFacade(entry, facade)</a></dt>
<dd><p>Process a modified entry facade</p>
</dd>
<dt><a href="#createEntryFacade">createEntryFacade(entry)</a> ⇒ <code><a href="#EntryFacade">EntryFacade</a></code></dt>
<dd><p>Create a data/input facade for an Entry instance</p>
</dd>
<dt><a href="#getEntryFacadeType">getEntryFacadeType(entry)</a> ⇒ <code>String</code></dt>
<dd><p>Get the facade type for an entry</p>
</dd>
<dt><a href="#setEntryValue">setEntryValue(entry, property, name, value)</a></dt>
<dd><p>Set a value on an entry</p>
</dd>
<dt><a href="#flattenEntries">flattenEntries(archives)</a> ⇒ <code><a href="#EntrySearchInfo">Array.&lt;EntrySearchInfo&gt;</a></code></dt>
<dd><p>Flatten entries into a searchable structure</p>
</dd>
<dt><a href="#dedupe">dedupe(arr)</a> ⇒ <code>Array</code></dt>
<dd><p>De-dupe an array</p>
</dd>
<dt><a href="#createFieldDescriptor">createFieldDescriptor(entry, title, entryPropertyType, entryPropertyName, options)</a> ⇒ <code><a href="#EntryFacadeField">EntryFacadeField</a></code></dt>
<dd><p>Create a descriptor for a field to be used within a facade</p>
</dd>
<dt><a href="#getEntryURLs">getEntryURLs(properties, preference)</a></dt>
<dd><p>Get URLs from an entry&#39;s propertyies
Allows for preferential sorting</p>
</dd>
<dt><del><a href="#getEntryValue">getEntryValue(entry, property, name)</a> ⇒ <code>String</code></del></dt>
<dd><p>Get a value on an entry for a specific property type</p>
</dd>
<dt><a href="#isValidProperty">isValidProperty(name)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Check if a property name is valid</p>
</dd>
<dt><a href="#findEntriesByCheck">findEntriesByCheck(groups, compareFn)</a> ⇒ <code><a href="#Entry">Array.&lt;Entry&gt;</a></code></dt>
<dd><p>Find entry instances by filtering with a compare function</p>
</dd>
<dt><a href="#findGroupsByCheck">findGroupsByCheck(groups, compareFn)</a> ⇒ <code><a href="#Group">Array.&lt;Group&gt;</a></code></dt>
<dd><p>Find group instances within groups that satisfy some check</p>
</dd>
<dt><a href="#getAllEntries">getAllEntries(groups)</a> ⇒ <code><a href="#Entry">Array.&lt;Entry&gt;</a></code></dt>
<dd><p>Get all entries within a collection of groups</p>
</dd>
<dt><a href="#generateUUID">generateUUID()</a> ⇒ <code>String</code></dt>
<dd><p>Generate a UUID (v4)</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ArchiveSourceOptions">ArchiveSourceOptions</a> : <code>Object</code></dt>
<dd><p>New source options</p>
</dd>
<dt><a href="#ArchiveSourceDescription">ArchiveSourceDescription</a></dt>
<dd></dd>
<dt><a href="#ArchiveDataset">ArchiveDataset</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#EntryFacade">EntryFacade</a> : <code>Object</code></dt>
<dd><p>Entry facade for data input</p>
</dd>
<dt><a href="#EntrySearchInfo">EntrySearchInfo</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#EntryFacadeField">EntryFacadeField</a> : <code>Object</code></dt>
<dd><p>Entry facade data field</p>
</dd>
<dt><a href="#FoundGroupResult">FoundGroupResult</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="module_Descriptor"></a>

## Descriptor ⇒ <code>Array.&lt;String&gt;</code>
Describe an archive dataset - to history commands

**Returns**: <code>Array.&lt;String&gt;</code> - An array of commands  

| Param | Type | Description |
| --- | --- | --- |
| dataset | <code>Object</code> | The archive dataset |
| parentGroupID | <code>String</code> | The ID of the parent group |

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

<a name="Archive"></a>

## Archive ⇐ <code>AsyncEventEmitter</code>
Buttercup Archive

**Kind**: global class  
**Extends**: <code>AsyncEventEmitter</code>  
**Mixes**: [<code>GroupCollection</code>](#GroupCollection), [<code>EntryCollection</code>](#EntryCollection)  

* [Archive](#Archive) ⇐ <code>AsyncEventEmitter</code>
    * _instance_
        * [.id](#Archive+id) : <code>String</code>
        * [.readOnly](#Archive+readOnly)
        * [.type](#Archive+type) : <code>String</code>
        * [.findGroupByID](#Archive+findGroupByID) ⇒ [<code>Group</code>](#Group) \| <code>null</code>
        * [.findGroupsByTitle](#Archive+findGroupsByTitle) ⇒ [<code>Array.&lt;Group&gt;</code>](#Group)
        * [.findEntriesByMeta](#Archive+findEntriesByMeta) ⇒ [<code>Array.&lt;Entry&gt;</code>](#Entry)
        * [.findEntriesByProperty](#Archive+findEntriesByProperty) ⇒ [<code>Array.&lt;Entry&gt;</code>](#Entry)
        * [.createGroup([title])](#Archive+createGroup) ⇒ [<code>Group</code>](#Group)
        * [.deleteAttribute(attributeName)](#Archive+deleteAttribute) ⇒ [<code>Archive</code>](#Archive)
        * [.emptyTrash()](#Archive+emptyTrash)
        * ~~[.getAttribute(attributeName)](#Archive+getAttribute) ⇒ <code>undefined</code> \| <code>String</code> \| <code>Object</code>~~
        * [.getAttributes()](#Archive+getAttributes) ⇒ <code>Object</code>
        * [.getFormat()](#Archive+getFormat) ⇒ <code>string</code>
        * [.getGroups()](#Archive+getGroups) ⇒ [<code>Array.&lt;Group&gt;</code>](#Group)
        * [.getHistory()](#Archive+getHistory) ⇒ <code>Array.&lt;String&gt;</code>
        * [.getTrashGroup()](#Archive+getTrashGroup) ⇒ [<code>Group</code>](#Group) \| <code>null</code>
        * [.optimise()](#Archive+optimise) ⇒ [<code>Archive</code>](#Archive)
        * [.setAttribute(attributeName, value)](#Archive+setAttribute) ⇒ [<code>Archive</code>](#Archive)
        * [.toObject(groupOutputFlags)](#Archive+toObject) ⇒ <code>Object</code>
        * [._generateID()](#Archive+_generateID)
        * [._getWestley()](#Archive+_getWestley) ⇒ [<code>Westley</code>](#Westley)
        * [.inst.findEntryByID(id)](#Archive+findEntryByID) ⇒ <code>null</code> \| [<code>Entry</code>](#Entry)
    * _static_
        * [.createFromHistory(history)](#Archive.createFromHistory) ⇒ [<code>Archive</code>](#Archive)
        * [.createWithDefaults()](#Archive.createWithDefaults) ⇒ [<code>Archive</code>](#Archive)

<a name="Archive+id"></a>

### archive.id : <code>String</code>
The archive ID

**Kind**: instance property of [<code>Archive</code>](#Archive)  
<a name="Archive+readOnly"></a>

### archive.readOnly
Whether the archive is read only or not

**Kind**: instance property of [<code>Archive</code>](#Archive)  
**Read only**: true  
**Properties**

| Name | Type |
| --- | --- |
| readOnly | <code>Boolean</code> | 

<a name="Archive+type"></a>

### archive.type : <code>String</code>
Get the instance type

**Kind**: instance property of [<code>Archive</code>](#Archive)  
**Read only**: true  
<a name="Archive+findGroupByID"></a>

### archive.findGroupByID ⇒ [<code>Group</code>](#Group) \| <code>null</code>
Find a group by its ID

**Kind**: instance property of [<code>Archive</code>](#Archive)  
**Mixes**: [<code>findGroupByID</code>](#GroupCollection.findGroupByID)  
**Returns**: [<code>Group</code>](#Group) \| <code>null</code> - The group or null if not found  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The group ID to search for |

<a name="Archive+findGroupsByTitle"></a>

### archive.findGroupsByTitle ⇒ [<code>Array.&lt;Group&gt;</code>](#Group)
Find groups by their title

**Kind**: instance property of [<code>Archive</code>](#Archive)  
**Mixes**: [<code>findGroupsByTitle</code>](#GroupCollection.findGroupsByTitle)  
**Returns**: [<code>Array.&lt;Group&gt;</code>](#Group) - An array of groups  

| Param | Type | Description |
| --- | --- | --- |
| title | <code>String</code> \| <code>RegExp</code> | The group title |

<a name="Archive+findEntriesByMeta"></a>

### archive.findEntriesByMeta ⇒ [<code>Array.&lt;Entry&gt;</code>](#Entry)
Find entries that match a certain meta property

**Kind**: instance property of [<code>Archive</code>](#Archive)  
**Mixes**: [<code>findEntriesByMeta</code>](#EntryCollection.findEntriesByMeta)  
**Returns**: [<code>Array.&lt;Entry&gt;</code>](#Entry) - An array of found entries  

| Param | Type | Description |
| --- | --- | --- |
| metaName | <code>String</code> | The meta property to search for |
| value | <code>RegExp</code> \| <code>string</code> | The value to search for |

<a name="Archive+findEntriesByProperty"></a>

### archive.findEntriesByProperty ⇒ [<code>Array.&lt;Entry&gt;</code>](#Entry)
Find all entries that match a certain property

**Kind**: instance property of [<code>Archive</code>](#Archive)  
**Mixes**: [<code>findEntriesByProperty</code>](#EntryCollection.findEntriesByProperty)  
**Returns**: [<code>Array.&lt;Entry&gt;</code>](#Entry) - An array of found extries  

| Param | Type | Description |
| --- | --- | --- |
| property | <code>string</code> | The property to search with |
| value | <code>RegExp</code> \| <code>string</code> | The value to search for |

<a name="Archive+createGroup"></a>

### archive.createGroup([title]) ⇒ [<code>Group</code>](#Group)
Create a new group

**Kind**: instance method of [<code>Archive</code>](#Archive)  
**Returns**: [<code>Group</code>](#Group) - The newly created group  

| Param | Type | Description |
| --- | --- | --- |
| [title] | <code>string</code> | The title for the group |

<a name="Archive+deleteAttribute"></a>

### archive.deleteAttribute(attributeName) ⇒ [<code>Archive</code>](#Archive)
Delete an attribute

**Kind**: instance method of [<code>Archive</code>](#Archive)  
**Returns**: [<code>Archive</code>](#Archive) - Self  

| Param | Type | Description |
| --- | --- | --- |
| attributeName | <code>String</code> | The name of the attribute to delete |

<a name="Archive+emptyTrash"></a>

### archive.emptyTrash()
Remove all entries and groups from the trash (permanent)

**Kind**: instance method of [<code>Archive</code>](#Archive)  
**Throws**:

- <code>Error</code> Throws if there is no trash group

<a name="Archive+getAttribute"></a>

### ~~archive.getAttribute(attributeName) ⇒ <code>undefined</code> \| <code>String</code> \| <code>Object</code>~~
***Deprecated***

Get the value of an attribute

**Kind**: instance method of [<code>Archive</code>](#Archive)  
**Returns**: <code>undefined</code> \| <code>String</code> \| <code>Object</code> - The value of the attribute or undefined if not
 set. Returns an object if no attribute name is given.  

| Param | Type | Description |
| --- | --- | --- |
| attributeName | <code>String</code> | The attribute to get |

<a name="Archive+getAttributes"></a>

### archive.getAttributes() ⇒ <code>Object</code>
Get all attributes

**Kind**: instance method of [<code>Archive</code>](#Archive)  
**Returns**: <code>Object</code> - Attributes object  
<a name="Archive+getFormat"></a>

### archive.getFormat() ⇒ <code>string</code>
Get the archive format

**Kind**: instance method of [<code>Archive</code>](#Archive)  
**Returns**: <code>string</code> - The format of the archive  
<a name="Archive+getGroups"></a>

### archive.getGroups() ⇒ [<code>Array.&lt;Group&gt;</code>](#Group)
Get all groups (root) in the archive

**Kind**: instance method of [<code>Archive</code>](#Archive)  
**Returns**: [<code>Array.&lt;Group&gt;</code>](#Group) - An array of Groups  
<a name="Archive+getHistory"></a>

### archive.getHistory() ⇒ <code>Array.&lt;String&gt;</code>
Get the command array (history)
Returned object can be quite large.

**Kind**: instance method of [<code>Archive</code>](#Archive)  
**Returns**: <code>Array.&lt;String&gt;</code> - The command array  
<a name="Archive+getTrashGroup"></a>

### archive.getTrashGroup() ⇒ [<code>Group</code>](#Group) \| <code>null</code>
Get the trash group

**Kind**: instance method of [<code>Archive</code>](#Archive)  
**Returns**: [<code>Group</code>](#Group) \| <code>null</code> - The trash group if found, null otherwise  
<a name="Archive+optimise"></a>

### archive.optimise() ⇒ [<code>Archive</code>](#Archive)
Perform archive optimisations

**Kind**: instance method of [<code>Archive</code>](#Archive)  
**Returns**: [<code>Archive</code>](#Archive) - Self  
<a name="Archive+setAttribute"></a>

### archive.setAttribute(attributeName, value) ⇒ [<code>Archive</code>](#Archive)
Set an attribute on the archive

**Kind**: instance method of [<code>Archive</code>](#Archive)  
**Returns**: [<code>Archive</code>](#Archive) - Self  

| Param | Type | Description |
| --- | --- | --- |
| attributeName | <code>String</code> | The attribute to set |
| value | <code>String</code> | The value to set for the attribute |

<a name="Archive+toObject"></a>

### archive.toObject(groupOutputFlags) ⇒ <code>Object</code>
Convert the archive to an object

**Kind**: instance method of [<code>Archive</code>](#Archive)  
**Returns**: <code>Object</code> - The archive in object form  
**See**: Group.toObject  

| Param | Type | Description |
| --- | --- | --- |
| groupOutputFlags | <code>Number</code> | Bitwise flags for `Group.toObject` |

<a name="Archive+_generateID"></a>

### archive._generateID()
Generate an archive ID

**Kind**: instance method of [<code>Archive</code>](#Archive)  
**Access**: protected  
<a name="Archive+_getWestley"></a>

### archive._getWestley() ⇒ [<code>Westley</code>](#Westley)
Get the underlying Westley instance

**Kind**: instance method of [<code>Archive</code>](#Archive)  
**Returns**: [<code>Westley</code>](#Westley) - The Westley instance  
**Access**: protected  
<a name="Archive+findEntryByID"></a>

### archive.inst.findEntryByID(id) ⇒ <code>null</code> \| [<code>Entry</code>](#Entry)
Find an entry by its ID

**Kind**: instance method of [<code>Archive</code>](#Archive)  
**Mixes**: [<code>inst.findEntryByID</code>](#EntryCollection.inst.findEntryByID)  
**Returns**: <code>null</code> \| [<code>Entry</code>](#Entry) - Null if not found, or the Entry instance  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The ID to search for |

<a name="Archive.createFromHistory"></a>

### Archive.createFromHistory(history) ⇒ [<code>Archive</code>](#Archive)
Create a new archive instance from a list of commands (history)

**Kind**: static method of [<code>Archive</code>](#Archive)  
**Returns**: [<code>Archive</code>](#Archive) - The archive instance  

| Param | Type | Description |
| --- | --- | --- |
| history | <code>Array.&lt;String&gt;</code> | The command list |

<a name="Archive.createWithDefaults"></a>

### Archive.createWithDefaults() ⇒ [<code>Archive</code>](#Archive)
Create an Archive with the default template

**Kind**: static method of [<code>Archive</code>](#Archive)  
**Returns**: [<code>Archive</code>](#Archive) - The new archive  
<a name="ArchiveComparator"></a>

## ArchiveComparator
**Kind**: global class  

* [ArchiveComparator](#ArchiveComparator)
    * [new ArchiveComparator(originalArchive, secondaryArchive)](#new_ArchiveComparator_new)
    * [.archivesDiffer()](#ArchiveComparator+archivesDiffer) ⇒ <code>Boolean</code>
    * [.calculateDifferences()](#ArchiveComparator+calculateDifferences) ⇒ <code>Object</code> \| <code>Boolean</code>

<a name="new_ArchiveComparator_new"></a>

### new ArchiveComparator(originalArchive, secondaryArchive)
Archive comparison class


| Param | Type | Description |
| --- | --- | --- |
| originalArchive | [<code>Archive</code>](#Archive) | The primary archive |
| secondaryArchive | [<code>Archive</code>](#Archive) | The secondary archive |

<a name="ArchiveComparator+archivesDiffer"></a>

### archiveComparator.archivesDiffer() ⇒ <code>Boolean</code>
Check if the current archives differ

**Kind**: instance method of [<code>ArchiveComparator</code>](#ArchiveComparator)  
**Returns**: <code>Boolean</code> - True if the archives are different  
<a name="ArchiveComparator+calculateDifferences"></a>

### archiveComparator.calculateDifferences() ⇒ <code>Object</code> \| <code>Boolean</code>
Calculate the differences, in commands, between the two archives

**Kind**: instance method of [<code>ArchiveComparator</code>](#ArchiveComparator)  
**Returns**: <code>Object</code> \| <code>Boolean</code> - Returns false if no common base
       is found, or the command differences as two arrays  
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
    * [new ArchiveSource(name, sourceCredentials, archiveCredentials, [newSourceOptions])](#new_ArchiveSource_new)
    * _instance_
        * [.colour](#ArchiveSource+colour) : <code>String</code>
        * [.description](#ArchiveSource+description) : [<code>ArchiveSourceDescription</code>](#ArchiveSourceDescription)
        * [.id](#ArchiveSource+id) : <code>String</code>
        * [.name](#ArchiveSource+name) : <code>String</code>
        * [.status](#ArchiveSource+status) : <code>ArchiveSourceStatus</code>
        * [.storageInterface](#ArchiveSource+storageInterface) : <code>StorageInterface</code>
        * [.workspace](#ArchiveSource+workspace) : [<code>Workspace</code>](#Workspace) \| <code>null</code>
        * [.checkOfflineCopy()](#ArchiveSource+checkOfflineCopy) ⇒ <code>Promise.&lt;Boolean&gt;</code>
        * [.dehydrate()](#ArchiveSource+dehydrate) ⇒ <code>Promise.&lt;String&gt;</code>
        * [.getOfflineContent()](#ArchiveSource+getOfflineContent) ⇒ <code>Promise.&lt;(String\|null)&gt;</code>
        * [.lock()](#ArchiveSource+lock) ⇒ <code>Promise.&lt;String&gt;</code>
        * [.unlock(masterPassword, [initialiseRemote], contentOverride)](#ArchiveSource+unlock)
        * [.updateArchiveCredentials(masterPassword)](#ArchiveSource+updateArchiveCredentials) ⇒ <code>Promise.&lt;String&gt;</code>
    * _static_
        * [.Status](#ArchiveSource.Status)
        * [.rehydrate(dehydratedString)](#ArchiveSource.rehydrate) ⇒ [<code>ArchiveSource</code>](#ArchiveSource)

<a name="new_ArchiveSource_new"></a>

### new ArchiveSource(name, sourceCredentials, archiveCredentials, [newSourceOptions])
Constructor for an archive source


| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the source |
| sourceCredentials | <code>String</code> | Encrypted archive source credentials |
| archiveCredentials | <code>String</code> | Encrypted archive credentials |
| [newSourceOptions] | [<code>ArchiveSourceOptions</code>](#ArchiveSourceOptions) | Specify source creation options |

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
<a name="ArchiveSource+storageInterface"></a>

### archiveSource.storageInterface : <code>StorageInterface</code>
The attached manager's storage interface

**Kind**: instance property of [<code>ArchiveSource</code>](#ArchiveSource)  
**Read only**: true  
<a name="ArchiveSource+workspace"></a>

### archiveSource.workspace : [<code>Workspace</code>](#Workspace) \| <code>null</code>
Workspace instance for the source
Is null when the source is locked

**Kind**: instance property of [<code>ArchiveSource</code>](#ArchiveSource)  
**Read only**: true  
<a name="ArchiveSource+checkOfflineCopy"></a>

### archiveSource.checkOfflineCopy() ⇒ <code>Promise.&lt;Boolean&gt;</code>
Check if the source has an offline copy

**Kind**: instance method of [<code>ArchiveSource</code>](#ArchiveSource)  
**Returns**: <code>Promise.&lt;Boolean&gt;</code> - A promise which resolves with whether an offline
 copy is available or not  
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

<a name="ArchiveSource+getOfflineContent"></a>

### archiveSource.getOfflineContent() ⇒ <code>Promise.&lt;(String\|null)&gt;</code>
Get offline content, if it exists

**Kind**: instance method of [<code>ArchiveSource</code>](#ArchiveSource)  
**Returns**: <code>Promise.&lt;(String\|null)&gt;</code> - A promise a resolves with the content, or null
 if it doesn't exist  
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

### archiveSource.unlock(masterPassword, [initialiseRemote], contentOverride)
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
| contentOverride | <code>String</code> \| <code>Boolean</code> | <code></code> | Content for overriding the fetch operation in the  datasource, for loading offline content. Can be set to the content (string) or to 'true',  which will attempt to load the content from the ArchiveManager's storage. |

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

<a name="Entry"></a>

## Entry
Entry class implementation
Entries form the low-level data structures used in Buttercup, and
are intended to represent logical collections of properties, like
a login for a website.

**Kind**: global class  

* [Entry](#Entry)
    * [new Entry(archive, remoteObj)](#new_Entry_new)
    * _instance_
        * [.id](#Entry+id) : <code>String</code>
        * [.type](#Entry+type) : <code>String</code>
        * [.delete([skipTrash])](#Entry+delete) ⇒ <code>Boolean</code>
        * [.deleteAttribute(attr)](#Entry+deleteAttribute) ⇒ [<code>Entry</code>](#Entry)
        * ~~[.deleteMeta(property)](#Entry+deleteMeta) ⇒ [<code>Entry</code>](#Entry)~~
        * [.deleteProperty(property)](#Entry+deleteProperty) ⇒ [<code>Entry</code>](#Entry)
        * [.getAttribute([attributeName])](#Entry+getAttribute) ⇒ <code>String</code> \| <code>undefined</code> \| <code>Object</code>
        * ~~[.getAttributes()](#Entry+getAttributes) ⇒ <code>Object</code>~~
        * ~~[.getGroup()](#Entry+getGroup) ⇒ [<code>Group</code>](#Group) \| <code>null</code>~~
        * ~~[.getMeta([property])](#Entry+getMeta) ⇒ <code>String</code> \| <code>undefined</code> \| <code>Object</code>~~
        * [.getProperty([property])](#Entry+getProperty) ⇒ <code>String</code> \| <code>undefined</code> \| <code>Object</code>
        * [.getURLs([urlTypePreference])](#Entry+getURLs) ⇒ <code>Array.&lt;String&gt;</code>
        * [.isInTrash()](#Entry+isInTrash) ⇒ <code>Boolean</code>
        * [.moveToGroup(group)](#Entry+moveToGroup) ⇒ [<code>Entry</code>](#Entry)
        * [.setAttribute(attributeName, value)](#Entry+setAttribute) ⇒ [<code>Entry</code>](#Entry)
        * ~~[.setMeta(prop, [val])](#Entry+setMeta) ⇒ [<code>Entry</code>](#Entry)~~
        * [.setProperty(prop, [val])](#Entry+setProperty) ⇒ [<code>Entry</code>](#Entry)
        * [.toObject()](#Entry+toObject) ⇒ <code>Object</code>
        * [.toString()](#Entry+toString) ⇒ <code>String</code>
        * [._getArchive()](#Entry+_getArchive) ⇒ [<code>Archive</code>](#Archive)
        * [._getRemoteObject()](#Entry+_getRemoteObject) ⇒ <code>Object</code>
        * [._getWestley()](#Entry+_getWestley) ⇒ [<code>Westley</code>](#Westley)
    * _static_
        * [.createNew(archive, groupID)](#Entry.createNew) ⇒ [<code>Entry</code>](#Entry)

<a name="new_Entry_new"></a>

### new Entry(archive, remoteObj)
Create a new managed entry instance


| Param | Type | Description |
| --- | --- | --- |
| archive | [<code>Archive</code>](#Archive) | The main archive instance |
| remoteObj | <code>Object</code> | The remote object reference |

<a name="Entry+id"></a>

### entry.id : <code>String</code>
The ID of the entry

**Kind**: instance property of [<code>Entry</code>](#Entry)  
**Read only**: true  
<a name="Entry+type"></a>

### entry.type : <code>String</code>
Get the instance type

**Kind**: instance property of [<code>Entry</code>](#Entry)  
**Read only**: true  
<a name="Entry+delete"></a>

### entry.delete([skipTrash]) ⇒ <code>Boolean</code>
Delete the entry - either trashes the entry, or removes it completely.
If the entry is in the trash already, it is removed (including if there is no
   trash group). If the entry is in a normal group and a trash group exists, it
 is moved there instead of being deleted.

**Kind**: instance method of [<code>Entry</code>](#Entry)  
**Returns**: <code>Boolean</code> - Whether or not the item was deleted  
**See**

- moveToGroup
- Archive.getTrashGroup


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [skipTrash] | <code>Boolean</code> | <code>false</code> | Skip the trash and force-delete the entry |

<a name="Entry+deleteAttribute"></a>

### entry.deleteAttribute(attr) ⇒ [<code>Entry</code>](#Entry)
Delete an attribute

**Kind**: instance method of [<code>Entry</code>](#Entry)  
**Returns**: [<code>Entry</code>](#Entry) - Self  
**Throws**:

- <code>Error</code> Throws if the attribute doesn't exist, or cannot be deleted


| Param | Type | Description |
| --- | --- | --- |
| attr | <code>String</code> | The attribute name |

<a name="Entry+deleteMeta"></a>

### ~~entry.deleteMeta(property) ⇒ [<code>Entry</code>](#Entry)~~
***Deprecated***

Delete a meta item

**Kind**: instance method of [<code>Entry</code>](#Entry)  
**Returns**: [<code>Entry</code>](#Entry) - Self  
**Throws**:

- <code>Error</code> Throws if property doesn't exist, or cannot be deleted


| Param | Type | Description |
| --- | --- | --- |
| property | <code>String</code> | The meta property to delete |

<a name="Entry+deleteProperty"></a>

### entry.deleteProperty(property) ⇒ [<code>Entry</code>](#Entry)
Delete a property

**Kind**: instance method of [<code>Entry</code>](#Entry)  
**Returns**: [<code>Entry</code>](#Entry) - Self  
**Throws**:

- <code>Error</code> Throws if property doesn't exist, or cannot be deleted


| Param | Type | Description |
| --- | --- | --- |
| property | <code>String</code> | The property to delete |

<a name="Entry+getAttribute"></a>

### entry.getAttribute([attributeName]) ⇒ <code>String</code> \| <code>undefined</code> \| <code>Object</code>
Get an attribute
If no attribute name is specified, an object with all attributes and their
values is returned.

**Kind**: instance method of [<code>Entry</code>](#Entry)  
**Returns**: <code>String</code> \| <code>undefined</code> \| <code>Object</code> - The attribute value or an object
 containing all attribute keys and their values if no attribute name
 is provided  

| Param | Type | Description |
| --- | --- | --- |
| [attributeName] | <code>String</code> | The name of the attribute to fetch |

<a name="Entry+getAttributes"></a>

### ~~entry.getAttributes() ⇒ <code>Object</code>~~
***Deprecated***

Get all attributes

**Kind**: instance method of [<code>Entry</code>](#Entry)  
**Returns**: <code>Object</code> - Attributes object  
<a name="Entry+getGroup"></a>

### ~~entry.getGroup() ⇒ [<code>Group</code>](#Group) \| <code>null</code>~~
***Deprecated***

Get the containing group for the entry

**Kind**: instance method of [<code>Entry</code>](#Entry)  
**Returns**: [<code>Group</code>](#Group) \| <code>null</code> - The parent group  
<a name="Entry+getMeta"></a>

### ~~entry.getMeta([property]) ⇒ <code>String</code> \| <code>undefined</code> \| <code>Object</code>~~
***Deprecated***

Get a meta value
If no meta name is specified, an object with all meta keys and their
values is returned.

**Kind**: instance method of [<code>Entry</code>](#Entry)  
**Returns**: <code>String</code> \| <code>undefined</code> \| <code>Object</code> - The meta value or an object
 containing all meta keys and values if no meta name specified  

| Param | Type | Description |
| --- | --- | --- |
| [property] | <code>String</code> | The name of the meta property |

<a name="Entry+getProperty"></a>

### entry.getProperty([property]) ⇒ <code>String</code> \| <code>undefined</code> \| <code>Object</code>
Get a property value
If no property name is specified, an object with all properties and their
values is returned.

**Kind**: instance method of [<code>Entry</code>](#Entry)  
**Returns**: <code>String</code> \| <code>undefined</code> \| <code>Object</code> - The property value or an object with all
 values if no property specified  

| Param | Type | Description |
| --- | --- | --- |
| [property] | <code>String</code> | The name of the property to fetch |

<a name="Entry+getURLs"></a>

### entry.getURLs([urlTypePreference]) ⇒ <code>Array.&lt;String&gt;</code>
Get an array of URLs from the Entry
Returns an array of detected URL values in the Entry's properties. The
types of URLs can be configured by providing a preference:
 - "general" - General URLs (of any type, preferring "URL" named props)
 - "login" - Prefer URLs whose key has "login" in it
 - "icon" - Return only icon-like URLs
 - "any" - Return all found URLs

**Kind**: instance method of [<code>Entry</code>](#Entry)  
**Returns**: <code>Array.&lt;String&gt;</code> - An array of URLs  

| Param | Type | Description |
| --- | --- | --- |
| [urlTypePreference] | <code>String</code> | The URL type preference |

<a name="Entry+isInTrash"></a>

### entry.isInTrash() ⇒ <code>Boolean</code>
Check if the entry is in the trash

**Kind**: instance method of [<code>Entry</code>](#Entry)  
**Returns**: <code>Boolean</code> - Whether or not the entry is in the trash  
<a name="Entry+moveToGroup"></a>

### entry.moveToGroup(group) ⇒ [<code>Entry</code>](#Entry)
Move the entry to another group

**Kind**: instance method of [<code>Entry</code>](#Entry)  
**Returns**: [<code>Entry</code>](#Entry) - Returns self  
**Params**: [<code>Group</code>](#Group) group The target group  

| Param | Type | Description |
| --- | --- | --- |
| group | [<code>Group</code>](#Group) | The target group |

<a name="Entry+setAttribute"></a>

### entry.setAttribute(attributeName, value) ⇒ [<code>Entry</code>](#Entry)
Set an attribute on the entry

**Kind**: instance method of [<code>Entry</code>](#Entry)  
**Returns**: [<code>Entry</code>](#Entry) - Returns self  

| Param | Type | Description |
| --- | --- | --- |
| attributeName | <code>String</code> | The name of the attribute |
| value | <code>String</code> | The value to set |

<a name="Entry+setMeta"></a>

### ~~entry.setMeta(prop, [val]) ⇒ [<code>Entry</code>](#Entry)~~
***Deprecated***

Set a meta value on the entry

**Kind**: instance method of [<code>Entry</code>](#Entry)  
**Returns**: [<code>Entry</code>](#Entry) - Returns self  

| Param | Type | Description |
| --- | --- | --- |
| prop | <code>String</code> | The meta name |
| [val] | <code>String</code> | The value to set |

<a name="Entry+setProperty"></a>

### entry.setProperty(prop, [val]) ⇒ [<code>Entry</code>](#Entry)
Set a property on the entry

**Kind**: instance method of [<code>Entry</code>](#Entry)  
**Returns**: [<code>Entry</code>](#Entry) - Returns self  

| Param | Type | Description |
| --- | --- | --- |
| prop | <code>String</code> | The property name |
| [val] | <code>String</code> | The property value |

<a name="Entry+toObject"></a>

### entry.toObject() ⇒ <code>Object</code>
Export entry to object

**Kind**: instance method of [<code>Entry</code>](#Entry)  
**Returns**: <code>Object</code> - The entry in object-form  
<a name="Entry+toString"></a>

### entry.toString() ⇒ <code>String</code>
toString override

**Kind**: instance method of [<code>Entry</code>](#Entry)  
**Returns**: <code>String</code> - The string representation of the Entry  
<a name="Entry+_getArchive"></a>

### entry._getArchive() ⇒ [<code>Archive</code>](#Archive)
Get the archive reference

**Kind**: instance method of [<code>Entry</code>](#Entry)  
**Returns**: [<code>Archive</code>](#Archive) - The Archive reference  
**Access**: protected  
<a name="Entry+_getRemoteObject"></a>

### entry._getRemoteObject() ⇒ <code>Object</code>
Get the remote object that mirrors the data represented here

**Kind**: instance method of [<code>Entry</code>](#Entry)  
**Returns**: <code>Object</code> - The remote object (in-memory copy)  
**Access**: protected  
<a name="Entry+_getWestley"></a>

### entry._getWestley() ⇒ [<code>Westley</code>](#Westley)
Get the Westley reference

**Kind**: instance method of [<code>Entry</code>](#Entry)  
**Returns**: [<code>Westley</code>](#Westley) - The internal Westley reference  
**Access**: protected  
<a name="Entry.createNew"></a>

### Entry.createNew(archive, groupID) ⇒ [<code>Entry</code>](#Entry)
Create a new entry

**Kind**: static method of [<code>Entry</code>](#Entry)  
**Returns**: [<code>Entry</code>](#Entry) - The new entry  
**Throws**:

- <code>Error</code> Throws if the target group doesn't exist
- <code>Error</code> Throws if the target group is the trash group,
     or if the target group is in the trash


| Param | Type | Description |
| --- | --- | --- |
| archive | [<code>Archive</code>](#Archive) | The archive |
| groupID | <code>string</code> | The ID of the target group |

<a name="EntryFinder"></a>

## EntryFinder
Entry searching class

**Kind**: global class  

* [EntryFinder](#EntryFinder)
    * [new EntryFinder(target)](#new_EntryFinder_new)
    * [.items](#EntryFinder+items) : [<code>Array.&lt;EntrySearchInfo&gt;</code>](#EntrySearchInfo)
    * [.lastResult](#EntryFinder+lastResult) : [<code>Array.&lt;EntrySearchInfo&gt;</code>](#EntrySearchInfo)
    * [.initSearcher()](#EntryFinder+initSearcher)
    * [.search(term)](#EntryFinder+search) ⇒ [<code>Array.&lt;EntrySearchInfo&gt;</code>](#EntrySearchInfo)

<a name="new_EntryFinder_new"></a>

### new EntryFinder(target)

| Param | Type | Description |
| --- | --- | --- |
| target | [<code>Array.&lt;Archive&gt;</code>](#Archive) \| [<code>Archive</code>](#Archive) | The archive or archives to search |

<a name="EntryFinder+items"></a>

### entryFinder.items : [<code>Array.&lt;EntrySearchInfo&gt;</code>](#EntrySearchInfo)
All items available for searching

**Kind**: instance property of [<code>EntryFinder</code>](#EntryFinder)  
<a name="EntryFinder+lastResult"></a>

### entryFinder.lastResult : [<code>Array.&lt;EntrySearchInfo&gt;</code>](#EntrySearchInfo)
The last result

**Kind**: instance property of [<code>EntryFinder</code>](#EntryFinder)  
<a name="EntryFinder+initSearcher"></a>

### entryFinder.initSearcher()
Initialise the searching mechanism

**Kind**: instance method of [<code>EntryFinder</code>](#EntryFinder)  
<a name="EntryFinder+search"></a>

### entryFinder.search(term) ⇒ [<code>Array.&lt;EntrySearchInfo&gt;</code>](#EntrySearchInfo)
Search and get results

**Kind**: instance method of [<code>EntryFinder</code>](#EntryFinder)  
**Returns**: [<code>Array.&lt;EntrySearchInfo&gt;</code>](#EntrySearchInfo) - The results  

| Param | Type | Description |
| --- | --- | --- |
| term | <code>String</code> | The search term |

<a name="Flattener"></a>

## Flattener
Flattener class for flattening archive history sets

**Kind**: global class  

* [Flattener](#Flattener)
    * _instance_
        * [.westley](#Flattener+westley) : [<code>Westley</code>](#Westley)
        * [.canBeFlattened()](#Flattener+canBeFlattened) ⇒ <code>Boolean</code>
        * [.flatten([force])](#Flattener+flatten) ⇒ <code>Boolean</code>
    * _static_
        * [.FLATTENING_MIN_LINES](#Flattener.FLATTENING_MIN_LINES) : <code>Number</code>
        * [.PRESERVE_LINES](#Flattener.PRESERVE_LINES) : <code>Number</code>

<a name="Flattener+westley"></a>

### flattener.westley : [<code>Westley</code>](#Westley)
The working Westley instance

**Kind**: instance property of [<code>Flattener</code>](#Flattener)  
**Read only**: true  
<a name="Flattener+canBeFlattened"></a>

### flattener.canBeFlattened() ⇒ <code>Boolean</code>
Check if the dataset can be flattened

**Kind**: instance method of [<code>Flattener</code>](#Flattener)  
**Returns**: <code>Boolean</code> - True if it can be flattened  
<a name="Flattener+flatten"></a>

### flattener.flatten([force]) ⇒ <code>Boolean</code>
Flatten a dataset

**Kind**: instance method of [<code>Flattener</code>](#Flattener)  
**Returns**: <code>Boolean</code> - True if flattening occurred, false otherwise  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [force] | <code>Boolean</code> | <code>false</code> | Force flattening even if it is detected to be unnecessary |

<a name="Flattener.FLATTENING_MIN_LINES"></a>

### Flattener.FLATTENING_MIN_LINES : <code>Number</code>
Minimum history lines before flattening can occur

**Kind**: static constant of [<code>Flattener</code>](#Flattener)  
<a name="Flattener.PRESERVE_LINES"></a>

### Flattener.PRESERVE_LINES : <code>Number</code>
Number of lines to preserve (most recent)

**Kind**: static constant of [<code>Flattener</code>](#Flattener)  
<a name="Group"></a>

## Group
Group implementation

**Kind**: global class  
**Mixes**: [<code>GroupCollection</code>](#GroupCollection), [<code>EntryCollection</code>](#EntryCollection)  

* [Group](#Group)
    * [new Group(archive, remoteObj)](#new_Group_new)
    * _instance_
        * [.id](#Group+id) : <code>String</code>
        * [.type](#Group+type) : <code>String</code>
        * [.findGroupByID](#Group+findGroupByID) ⇒ [<code>Group</code>](#Group) \| <code>null</code>
        * [.findGroupsByTitle](#Group+findGroupsByTitle) ⇒ [<code>Array.&lt;Group&gt;</code>](#Group)
        * [.findEntriesByMeta](#Group+findEntriesByMeta) ⇒ [<code>Array.&lt;Entry&gt;</code>](#Entry)
        * [.findEntriesByProperty](#Group+findEntriesByProperty) ⇒ [<code>Array.&lt;Entry&gt;</code>](#Entry)
        * [.createEntry([title])](#Group+createEntry) ⇒ [<code>Entry</code>](#Entry)
        * [.createGroup([title])](#Group+createGroup) ⇒ [<code>Group</code>](#Group)
        * [.delete([skipTrash])](#Group+delete) ⇒ <code>Boolean</code>
        * [.deleteAttribute(attr)](#Group+deleteAttribute) ⇒ [<code>Group</code>](#Group)
        * [.getAttribute([attributeName])](#Group+getAttribute) ⇒ <code>String</code> \| <code>undefined</code> \| <code>Object</code>
        * ~~[.getAttributes()](#Group+getAttributes) ⇒ <code>Object</code>~~
        * [.getEntries()](#Group+getEntries) ⇒ [<code>Array.&lt;Entry&gt;</code>](#Entry)
        * [.getGroup()](#Group+getGroup) ⇒ [<code>Group</code>](#Group) \| <code>null</code>
        * [.getGroups()](#Group+getGroups) ⇒ [<code>Array.&lt;Group&gt;</code>](#Group)
        * [.getTitle()](#Group+getTitle) ⇒ <code>string</code>
        * [.isInTrash()](#Group+isInTrash) ⇒ <code>Boolean</code>
        * [.isTrash()](#Group+isTrash) ⇒ <code>Boolean</code>
        * [.moveTo(target)](#Group+moveTo) ⇒ [<code>Group</code>](#Group)
        * [.setAttribute(attributeName, value)](#Group+setAttribute) ⇒ [<code>Group</code>](#Group)
        * [.setTitle(title)](#Group+setTitle) ⇒ [<code>Group</code>](#Group)
        * [.toObject(outputFlags)](#Group+toObject) ⇒ <code>Object</code>
        * [.toString(outputFlags)](#Group+toString) ⇒ <code>string</code>
        * [._getArchive()](#Group+_getArchive) ⇒ [<code>Archive</code>](#Archive)
        * [._getRemoteObject()](#Group+_getRemoteObject) ⇒ <code>Object</code>
        * [._getWestley()](#Group+_getWestley) ⇒ [<code>Westley</code>](#Westley)
        * [.inst.findEntryByID(id)](#Group+findEntryByID) ⇒ <code>null</code> \| [<code>Entry</code>](#Entry)
    * _static_
        * [.Attributes](#Group.Attributes) : <code>enum</code>
        * [.OutputFlag](#Group.OutputFlag) : <code>enum</code>
        * [.createNew(archive, [parentID])](#Group.createNew) ⇒ [<code>Group</code>](#Group)

<a name="new_Group_new"></a>

### new Group(archive, remoteObj)
Managed group class


| Param | Type | Description |
| --- | --- | --- |
| archive | [<code>Archive</code>](#Archive) | The archive instance |
| remoteObj | <code>Object</code> | The remote object reference |

<a name="Group+id"></a>

### group.id : <code>String</code>
The entry ID

**Kind**: instance property of [<code>Group</code>](#Group)  
<a name="Group+type"></a>

### group.type : <code>String</code>
Get the instance type

**Kind**: instance property of [<code>Group</code>](#Group)  
**Read only**: true  
<a name="Group+findGroupByID"></a>

### group.findGroupByID ⇒ [<code>Group</code>](#Group) \| <code>null</code>
Find a group by its ID

**Kind**: instance property of [<code>Group</code>](#Group)  
**Mixes**: [<code>findGroupByID</code>](#GroupCollection.findGroupByID)  
**Returns**: [<code>Group</code>](#Group) \| <code>null</code> - The group or null if not found  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The group ID to search for |

<a name="Group+findGroupsByTitle"></a>

### group.findGroupsByTitle ⇒ [<code>Array.&lt;Group&gt;</code>](#Group)
Find groups by their title

**Kind**: instance property of [<code>Group</code>](#Group)  
**Mixes**: [<code>findGroupsByTitle</code>](#GroupCollection.findGroupsByTitle)  
**Returns**: [<code>Array.&lt;Group&gt;</code>](#Group) - An array of groups  

| Param | Type | Description |
| --- | --- | --- |
| title | <code>String</code> \| <code>RegExp</code> | The group title |

<a name="Group+findEntriesByMeta"></a>

### group.findEntriesByMeta ⇒ [<code>Array.&lt;Entry&gt;</code>](#Entry)
Find entries that match a certain meta property

**Kind**: instance property of [<code>Group</code>](#Group)  
**Mixes**: [<code>findEntriesByMeta</code>](#EntryCollection.findEntriesByMeta)  
**Returns**: [<code>Array.&lt;Entry&gt;</code>](#Entry) - An array of found entries  

| Param | Type | Description |
| --- | --- | --- |
| metaName | <code>String</code> | The meta property to search for |
| value | <code>RegExp</code> \| <code>string</code> | The value to search for |

<a name="Group+findEntriesByProperty"></a>

### group.findEntriesByProperty ⇒ [<code>Array.&lt;Entry&gt;</code>](#Entry)
Find all entries that match a certain property

**Kind**: instance property of [<code>Group</code>](#Group)  
**Mixes**: [<code>findEntriesByProperty</code>](#EntryCollection.findEntriesByProperty)  
**Returns**: [<code>Array.&lt;Entry&gt;</code>](#Entry) - An array of found extries  

| Param | Type | Description |
| --- | --- | --- |
| property | <code>string</code> | The property to search with |
| value | <code>RegExp</code> \| <code>string</code> | The value to search for |

<a name="Group+createEntry"></a>

### group.createEntry([title]) ⇒ [<code>Entry</code>](#Entry)
Create a new entry with a title

**Kind**: instance method of [<code>Group</code>](#Group)  
**Returns**: [<code>Entry</code>](#Entry) - The new entry  

| Param | Type | Description |
| --- | --- | --- |
| [title] | <code>String</code> | The title of the new entry |

<a name="Group+createGroup"></a>

### group.createGroup([title]) ⇒ [<code>Group</code>](#Group)
Create a child group

**Kind**: instance method of [<code>Group</code>](#Group)  
**Returns**: [<code>Group</code>](#Group) - The new child group  

| Param | Type | Description |
| --- | --- | --- |
| [title] | <code>string</code> | Optionally set a title |

<a name="Group+delete"></a>

### group.delete([skipTrash]) ⇒ <code>Boolean</code>
Delete the group
If there is a trash group available, the group is moved there. If the group
is already in the trash, it is deleted permanently.

**Kind**: instance method of [<code>Group</code>](#Group)  
**Returns**: <code>Boolean</code> - True when deleted, false when moved to trash  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [skipTrash] | <code>Boolean</code> | <code>false</code> | Skip the trash |

<a name="Group+deleteAttribute"></a>

### group.deleteAttribute(attr) ⇒ [<code>Group</code>](#Group)
Delete an attribute

**Kind**: instance method of [<code>Group</code>](#Group)  
**Returns**: [<code>Group</code>](#Group) - Returns self  

| Param | Type | Description |
| --- | --- | --- |
| attr | <code>string</code> | The name of the attribute |

<a name="Group+getAttribute"></a>

### group.getAttribute([attributeName]) ⇒ <code>String</code> \| <code>undefined</code> \| <code>Object</code>
Get an attribute

**Kind**: instance method of [<code>Group</code>](#Group)  
**Returns**: <code>String</code> \| <code>undefined</code> \| <code>Object</code> - Returns the attribute or undefined if not found.
 If no attribute name is provided an object containing all attributes is returned.  

| Param | Type | Description |
| --- | --- | --- |
| [attributeName] | <code>String</code> | The name of the attribute. If none provided  the entire attributes object is returned. |

<a name="Group+getAttributes"></a>

### ~~group.getAttributes() ⇒ <code>Object</code>~~
***Deprecated***

Get all attributes

**Kind**: instance method of [<code>Group</code>](#Group)  
**Returns**: <code>Object</code> - Attributes object  
<a name="Group+getEntries"></a>

### group.getEntries() ⇒ [<code>Array.&lt;Entry&gt;</code>](#Entry)
Get the entries within the group

**Kind**: instance method of [<code>Group</code>](#Group)  
**Returns**: [<code>Array.&lt;Entry&gt;</code>](#Entry) - An array of entries  
<a name="Group+getGroup"></a>

### group.getGroup() ⇒ [<code>Group</code>](#Group) \| <code>null</code>
Get the parent group

**Kind**: instance method of [<code>Group</code>](#Group)  
**Returns**: [<code>Group</code>](#Group) \| <code>null</code> - Returns the parent group instance or null if the parent
 is the archive  
**Throws**:

- <code>Error</code> Throws if no parent could be found (detached)

<a name="Group+getGroups"></a>

### group.getGroups() ⇒ [<code>Array.&lt;Group&gt;</code>](#Group)
Get the groups within the group

**Kind**: instance method of [<code>Group</code>](#Group)  
**Returns**: [<code>Array.&lt;Group&gt;</code>](#Group) - An array of child groups  
<a name="Group+getTitle"></a>

### group.getTitle() ⇒ <code>string</code>
Get the group title

**Kind**: instance method of [<code>Group</code>](#Group)  
**Returns**: <code>string</code> - The title of the group  
<a name="Group+isInTrash"></a>

### group.isInTrash() ⇒ <code>Boolean</code>
Check if the group is in the trash

**Kind**: instance method of [<code>Group</code>](#Group)  
**Returns**: <code>Boolean</code> - Whether or not the group is within the trash group  
<a name="Group+isTrash"></a>

### group.isTrash() ⇒ <code>Boolean</code>
Check if the group is used for trash

**Kind**: instance method of [<code>Group</code>](#Group)  
**Returns**: <code>Boolean</code> - Whether or not the group is the trash group  
<a name="Group+moveTo"></a>

### group.moveTo(target) ⇒ [<code>Group</code>](#Group)
Move the group to another group or archive

**Kind**: instance method of [<code>Group</code>](#Group)  
**Returns**: [<code>Group</code>](#Group) - Self  

| Param | Type | Description |
| --- | --- | --- |
| target | [<code>Group</code>](#Group) \| [<code>Archive</code>](#Archive) | The destination Group or Archive instance |

<a name="Group+setAttribute"></a>

### group.setAttribute(attributeName, value) ⇒ [<code>Group</code>](#Group)
Set an attribute

**Kind**: instance method of [<code>Group</code>](#Group)  
**Returns**: [<code>Group</code>](#Group) - Returns self  

| Param | Type | Description |
| --- | --- | --- |
| attributeName | <code>string</code> | The name of the attribute |
| value | <code>string</code> | The value to set |

<a name="Group+setTitle"></a>

### group.setTitle(title) ⇒ [<code>Group</code>](#Group)
Set the group title

**Kind**: instance method of [<code>Group</code>](#Group)  
**Returns**: [<code>Group</code>](#Group) - Returns self  

| Param | Type | Description |
| --- | --- | --- |
| title | <code>string</code> | The title of the group |

<a name="Group+toObject"></a>

### group.toObject(outputFlags) ⇒ <code>Object</code>
Export group to object

**Kind**: instance method of [<code>Group</code>](#Group)  
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
     group.toObject(Group.OutputFlag.Entries)
```
**Example**  
```js
// output only the group info
     group.toObject(Group.OutputFlag.OnlyGroup)
```
<a name="Group+toString"></a>

### group.toString(outputFlags) ⇒ <code>string</code>
Export the group to a JSON string

**Kind**: instance method of [<code>Group</code>](#Group)  
**Returns**: <code>string</code> - The group (and entries) in JSON string format  
**See**: toObject  

| Param | Type | Description |
| --- | --- | --- |
| outputFlags | <code>Number</code> | Output configuration flags to pass to `toObject` |

<a name="Group+_getArchive"></a>

### group._getArchive() ⇒ [<code>Archive</code>](#Archive)
Get the archive instance reference

**Kind**: instance method of [<code>Group</code>](#Group)  
**Returns**: [<code>Archive</code>](#Archive) - The archive instance  
**Access**: protected  
<a name="Group+_getRemoteObject"></a>

### group._getRemoteObject() ⇒ <code>Object</code>
Get the remotely-managed object (group)

**Kind**: instance method of [<code>Group</code>](#Group)  
**Returns**: <code>Object</code> - The object instance for the group  
**Access**: protected  
<a name="Group+_getWestley"></a>

### group._getWestley() ⇒ [<code>Westley</code>](#Westley)
Get the delta managing instance for the archive

**Kind**: instance method of [<code>Group</code>](#Group)  
**Returns**: [<code>Westley</code>](#Westley) - The internal Westley object  
**Access**: protected  
<a name="Group+findEntryByID"></a>

### group.inst.findEntryByID(id) ⇒ <code>null</code> \| [<code>Entry</code>](#Entry)
Find an entry by its ID

**Kind**: instance method of [<code>Group</code>](#Group)  
**Mixes**: [<code>inst.findEntryByID</code>](#EntryCollection.inst.findEntryByID)  
**Returns**: <code>null</code> \| [<code>Entry</code>](#Entry) - Null if not found, or the Entry instance  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The ID to search for |

<a name="Group.Attributes"></a>

### Group.Attributes : <code>enum</code>
Group attribute names

**Kind**: static enum of [<code>Group</code>](#Group)  
<a name="Group.OutputFlag"></a>

### Group.OutputFlag : <code>enum</code>
Bitwise output flags for `toObject` and `toString`

**Kind**: static enum of [<code>Group</code>](#Group)  
**See**

- toObject
- toString

<a name="Group.createNew"></a>

### Group.createNew(archive, [parentID]) ⇒ [<code>Group</code>](#Group)
Create a new Group with a delta-manager and parent group ID

**Kind**: static method of [<code>Group</code>](#Group)  
**Returns**: [<code>Group</code>](#Group) - A new group  
**Throws**:

- <code>Error</code> Throws if the target group doesn't exist
- <code>Error</code> Throws if the target group is the trash group,
     or if the target group is within the trash group


| Param | Type | Description |
| --- | --- | --- |
| archive | [<code>Archive</code>](#Archive) | The archive to create the group in |
| [parentID] | <code>string</code> | The parent group ID (default is root) |

<a name="InigoCommand"></a>

## InigoCommand
Inigo command generator

**Kind**: global class  
<a name="new_InigoCommand_new"></a>

### new InigoCommand(cmdKey)

| Param | Type | Description |
| --- | --- | --- |
| cmdKey | <code>String</code> | The key for the command |

<a name="Westley"></a>

## Westley ⇐ <code>AsyncEventEmitter</code>
Westley class
Archive object dataset and history manager. Handles parsing and
revenge for the princess.

**Kind**: global class  
**Extends**: <code>AsyncEventEmitter</code>  

* [Westley](#Westley) ⇐ <code>AsyncEventEmitter</code>
    * [.readOnly](#Westley+readOnly)
    * [.readOnly](#Westley+readOnly)
    * [.clear()](#Westley+clear) ⇒ [<code>Westley</code>](#Westley)
    * [.execute(command, [append])](#Westley+execute) ⇒ [<code>Westley</code>](#Westley)
    * [.getDataset()](#Westley+getDataset) ⇒ <code>Object</code>
    * [.getHistory()](#Westley+getHistory) ⇒ <code>Array.&lt;String&gt;</code>
    * [.pad()](#Westley+pad) ⇒ [<code>Westley</code>](#Westley)
    * [._getCommandForKey(commandKey)](#Westley+_getCommandForKey) ⇒ <code>Command</code>

<a name="Westley+readOnly"></a>

### westley.readOnly
**Kind**: instance property of [<code>Westley</code>](#Westley)  
**Access**: public  
**Properties**

| Name | Type |
| --- | --- |
| readOnly | <code>Boolean</code> | 

<a name="Westley+readOnly"></a>

### westley.readOnly
Set the read only value

**Kind**: instance property of [<code>Westley</code>](#Westley)  

| Param | Type | Description |
| --- | --- | --- |
| newRO | <code>Boolean</code> | The new value |

<a name="Westley+clear"></a>

### westley.clear() ⇒ [<code>Westley</code>](#Westley)
Clear the dataset and history

**Kind**: instance method of [<code>Westley</code>](#Westley)  
**Returns**: [<code>Westley</code>](#Westley) - Returns self  
<a name="Westley+execute"></a>

### westley.execute(command, [append]) ⇒ [<code>Westley</code>](#Westley)
Execute a command - stored in history and modifies the dataset

**Kind**: instance method of [<code>Westley</code>](#Westley)  
**Returns**: [<code>Westley</code>](#Westley) - Returns self  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>String</code> | The command to execute |
| [append] | <code>Boolean</code> | Whether to append to the end of the history list (default true) |

<a name="Westley+getDataset"></a>

### westley.getDataset() ⇒ <code>Object</code>
Get the core dataset

**Kind**: instance method of [<code>Westley</code>](#Westley)  
**Returns**: <code>Object</code> - The dataset object  
<a name="Westley+getHistory"></a>

### westley.getHistory() ⇒ <code>Array.&lt;String&gt;</code>
Get the history (deltas)

**Kind**: instance method of [<code>Westley</code>](#Westley)  
**Returns**: <code>Array.&lt;String&gt;</code> - The command array (history)  
<a name="Westley+pad"></a>

### westley.pad() ⇒ [<code>Westley</code>](#Westley)
Insert a padding in the archive (used for delta tracking)

**Kind**: instance method of [<code>Westley</code>](#Westley)  
**Returns**: [<code>Westley</code>](#Westley) - Returns self  
<a name="Westley+_getCommandForKey"></a>

### westley._getCommandForKey(commandKey) ⇒ <code>Command</code>
Gets a command by its key from the cache with its dependencies injected

**Kind**: instance method of [<code>Westley</code>](#Westley)  
**Returns**: <code>Command</code> - Returns the command  
**Access**: protected  

| Param | Type | Description |
| --- | --- | --- |
| commandKey | <code>String</code> | The key of the command |

<a name="Workspace"></a>

## Workspace
Workspace class implementation
Workspaces organise Archives and Datasources, and perform saves
and merges with remote changes.

**Kind**: global class  

* [Workspace](#Workspace)
    * [.archive](#Workspace+archive) : [<code>Archive</code>](#Archive)
    * [.datasource](#Workspace+datasource) : <code>TextDatasource</code>
    * [.masterCredentials](#Workspace+masterCredentials) : <code>Credentials</code>
    * [.saveChannel](#Workspace+saveChannel) : <code>Channel</code>
    * [.localDiffersFromRemote()](#Workspace+localDiffersFromRemote) ⇒ <code>Promise.&lt;Boolean&gt;</code>
    * [.mergeFromRemote()](#Workspace+mergeFromRemote) ⇒ [<code>Promise.&lt;Archive&gt;</code>](#Archive)
    * [.save()](#Workspace+save) ⇒ <code>Promise</code>
    * [.setArchive(archive, datasource, masterCredentials)](#Workspace+setArchive)
    * [.updatePrimaryCredentials(masterCredentials)](#Workspace+updatePrimaryCredentials)

<a name="Workspace+archive"></a>

### workspace.archive : [<code>Archive</code>](#Archive)
The archive instance

**Kind**: instance property of [<code>Workspace</code>](#Workspace)  
<a name="Workspace+datasource"></a>

### workspace.datasource : <code>TextDatasource</code>
The datasource instance for the archive

**Kind**: instance property of [<code>Workspace</code>](#Workspace)  
<a name="Workspace+masterCredentials"></a>

### workspace.masterCredentials : <code>Credentials</code>
The master credentials for the archive

**Kind**: instance property of [<code>Workspace</code>](#Workspace)  
<a name="Workspace+saveChannel"></a>

### workspace.saveChannel : <code>Channel</code>
The save channel for queuing save actions

**Kind**: instance property of [<code>Workspace</code>](#Workspace)  
<a name="Workspace+localDiffersFromRemote"></a>

### workspace.localDiffersFromRemote() ⇒ <code>Promise.&lt;Boolean&gt;</code>
Detect whether the local archives (in memory) differ from their remote copies
Fetches the remote copies from their datasources and detects differences between
them and their local counterparts. Does not change/update the local items.

**Kind**: instance method of [<code>Workspace</code>](#Workspace)  
**Returns**: <code>Promise.&lt;Boolean&gt;</code> - A promise that resolves with a boolean - true if
     there are differences, false if there is not  
<a name="Workspace+mergeFromRemote"></a>

### workspace.mergeFromRemote() ⇒ [<code>Promise.&lt;Archive&gt;</code>](#Archive)
Merge remote contents
Detects differences between a local and a remote item, and merges the
two copies together.

**Kind**: instance method of [<code>Workspace</code>](#Workspace)  
**Returns**: [<code>Promise.&lt;Archive&gt;</code>](#Archive) - A promise that resolves with the newly merged archive -
     This archive is automatically saved over the original local copy.  
<a name="Workspace+save"></a>

### workspace.save() ⇒ <code>Promise</code>
Save the archive to the remote

**Kind**: instance method of [<code>Workspace</code>](#Workspace)  
**Returns**: <code>Promise</code> - A promise that resolves when saving has completed  
<a name="Workspace+setArchive"></a>

### workspace.setArchive(archive, datasource, masterCredentials)
Set the archive and its accompanying data on the workspace

**Kind**: instance method of [<code>Workspace</code>](#Workspace)  

| Param | Type | Description |
| --- | --- | --- |
| archive | [<code>Archive</code>](#Archive) | The archive instance |
| datasource | <code>TextDatasource</code> | The datasource for the archive |
| masterCredentials | <code>\*</code> | The master credentials for the archive |

<a name="Workspace+updatePrimaryCredentials"></a>

### workspace.updatePrimaryCredentials(masterCredentials)
Update the master password of the archive

**Kind**: instance method of [<code>Workspace</code>](#Workspace)  

| Param | Type | Description |
| --- | --- | --- |
| masterCredentials | <code>Credentials</code> | The new credentials |

<a name="EntryCollection"></a>

## EntryCollection : <code>Object</code>
**Kind**: global mixin  

* [EntryCollection](#EntryCollection) : <code>Object</code>
    * [.findEntriesByMeta](#EntryCollection.findEntriesByMeta) ⇒ [<code>Array.&lt;Entry&gt;</code>](#Entry)
    * [.findEntriesByProperty](#EntryCollection.findEntriesByProperty) ⇒ [<code>Array.&lt;Entry&gt;</code>](#Entry)
    * [.inst.findEntryByID(id)](#EntryCollection.inst.findEntryByID) ⇒ <code>null</code> \| [<code>Entry</code>](#Entry)

<a name="EntryCollection.findEntriesByMeta"></a>

### EntryCollection.findEntriesByMeta ⇒ [<code>Array.&lt;Entry&gt;</code>](#Entry)
Find entries that match a certain meta property

**Kind**: static property of [<code>EntryCollection</code>](#EntryCollection)  
**Returns**: [<code>Array.&lt;Entry&gt;</code>](#Entry) - An array of found entries  

| Param | Type | Description |
| --- | --- | --- |
| metaName | <code>String</code> | The meta property to search for |
| value | <code>RegExp</code> \| <code>string</code> | The value to search for |

<a name="EntryCollection.findEntriesByProperty"></a>

### EntryCollection.findEntriesByProperty ⇒ [<code>Array.&lt;Entry&gt;</code>](#Entry)
Find all entries that match a certain property

**Kind**: static property of [<code>EntryCollection</code>](#EntryCollection)  
**Returns**: [<code>Array.&lt;Entry&gt;</code>](#Entry) - An array of found extries  

| Param | Type | Description |
| --- | --- | --- |
| property | <code>string</code> | The property to search with |
| value | <code>RegExp</code> \| <code>string</code> | The value to search for |

<a name="EntryCollection.inst.findEntryByID"></a>

### EntryCollection.inst.findEntryByID(id) ⇒ <code>null</code> \| [<code>Entry</code>](#Entry)
Find an entry by its ID

**Kind**: static method of [<code>EntryCollection</code>](#EntryCollection)  
**Returns**: <code>null</code> \| [<code>Entry</code>](#Entry) - Null if not found, or the Entry instance  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The ID to search for |

<a name="GroupCollection"></a>

## GroupCollection : <code>Object</code>
**Kind**: global mixin  

* [GroupCollection](#GroupCollection) : <code>Object</code>
    * [.findGroupByID](#GroupCollection.findGroupByID) ⇒ [<code>Group</code>](#Group) \| <code>null</code>
    * [.findGroupsByTitle](#GroupCollection.findGroupsByTitle) ⇒ [<code>Array.&lt;Group&gt;</code>](#Group)

<a name="GroupCollection.findGroupByID"></a>

### GroupCollection.findGroupByID ⇒ [<code>Group</code>](#Group) \| <code>null</code>
Find a group by its ID

**Kind**: static property of [<code>GroupCollection</code>](#GroupCollection)  
**Returns**: [<code>Group</code>](#Group) \| <code>null</code> - The group or null if not found  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The group ID to search for |

<a name="GroupCollection.findGroupsByTitle"></a>

### GroupCollection.findGroupsByTitle ⇒ [<code>Array.&lt;Group&gt;</code>](#Group)
Find groups by their title

**Kind**: static property of [<code>GroupCollection</code>](#GroupCollection)  
**Returns**: [<code>Array.&lt;Group&gt;</code>](#Group) - An array of groups  

| Param | Type | Description |
| --- | --- | --- |
| title | <code>String</code> \| <code>RegExp</code> | The group title |

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

## credentialsToSource(sourceCredentials, archiveCredentials, [initialise], [contentOverride]) ⇒ <code>Promise.&lt;Object&gt;</code>
Convert credentials to a source for the ArchiveManager

**Kind**: global function  
**Returns**: <code>Promise.&lt;Object&gt;</code> - A promise that resolves with an object containing a workspace,
 the source credentials and archive credentials  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| sourceCredentials | <code>Credentials</code> |  | The remote archive credentials |
| archiveCredentials | <code>Credentials</code> |  | Credentials for unlocking the archive |
| [initialise] | <code>Boolean</code> | <code>false</code> | Whether or not to initialise a new archive (defaults to false) |
| [contentOverride] | <code>String</code> | <code></code> | Content for overriding the fetch operation in the  datasource, for loading offline content |

<a name="addExtraFieldsNonDestructive"></a>

## addExtraFieldsNonDestructive(entry, fields) ⇒ [<code>Array.&lt;EntryFacadeField&gt;</code>](#EntryFacadeField)
Add extra fields to a fields array that are not mentioned in a preset
Facades are creaded by presets which don't mention all property values (custom user
added items). This method adds the unmentioned items to the facade fields so that
they can be edited as well.

**Kind**: global function  
**Returns**: [<code>Array.&lt;EntryFacadeField&gt;</code>](#EntryFacadeField) - A new array with all combined fields  

| Param | Type | Description |
| --- | --- | --- |
| entry | [<code>Entry</code>](#Entry) | An Entry instance |
| fields | [<code>Array.&lt;EntryFacadeField&gt;</code>](#EntryFacadeField) | An array of fields |

<a name="applyFieldDescriptor"></a>

## applyFieldDescriptor(entry, descriptor)
Apply a facade field descriptor to an entry
Takes data from the descriptor and writes it to the entry.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| entry | [<code>Entry</code>](#Entry) | The entry to apply to |
| descriptor | [<code>EntryFacadeField</code>](#EntryFacadeField) | The descriptor object |

<a name="consumeEntryFacade"></a>

## consumeEntryFacade(entry, facade)
Process a modified entry facade

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| entry | [<code>Entry</code>](#Entry) | The entry to apply processed data on |
| facade | [<code>EntryFacade</code>](#EntryFacade) | The facade object |

<a name="createEntryFacade"></a>

## createEntryFacade(entry) ⇒ [<code>EntryFacade</code>](#EntryFacade)
Create a data/input facade for an Entry instance

**Kind**: global function  
**Returns**: [<code>EntryFacade</code>](#EntryFacade) - A newly created facade  

| Param | Type | Description |
| --- | --- | --- |
| entry | [<code>Entry</code>](#Entry) | The Entry instance |

<a name="getEntryFacadeType"></a>

## getEntryFacadeType(entry) ⇒ <code>String</code>
Get the facade type for an entry

**Kind**: global function  
**Returns**: <code>String</code> - The facade type  

| Param | Type | Description |
| --- | --- | --- |
| entry | [<code>Entry</code>](#Entry) | The entry instance |

<a name="setEntryValue"></a>

## setEntryValue(entry, property, name, value)
Set a value on an entry

**Kind**: global function  
**Throws**:

- <code>Error</code> Throws if the property type is not recognised


| Param | Type | Description |
| --- | --- | --- |
| entry | [<code>Entry</code>](#Entry) | The entry instance |
| property | <code>String</code> | Type of property ("property"/"meta"/"attribute") |
| name | <code>String</code> | The property name |
| value | <code>String</code> | The value to set |

<a name="flattenEntries"></a>

## flattenEntries(archives) ⇒ [<code>Array.&lt;EntrySearchInfo&gt;</code>](#EntrySearchInfo)
Flatten entries into a searchable structure

**Kind**: global function  
**Returns**: [<code>Array.&lt;EntrySearchInfo&gt;</code>](#EntrySearchInfo) - An array of searchable objects  

| Param | Type | Description |
| --- | --- | --- |
| archives | [<code>Array.&lt;Archive&gt;</code>](#Archive) | An array of archives |

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
| entry | [<code>Entry</code>](#Entry) | The entry instance to process |
| title | <code>String</code> | The field title |
| entryPropertyType | <code>String</code> | The type of entry property (property/attribute) |
| entryPropertyName | <code>String</code> | The name of the property |
| options | <code>Object</code> | The options for the field |

<a name="getEntryURLs"></a>

## getEntryURLs(properties, preference)
Get URLs from an entry's propertyies
Allows for preferential sorting

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| properties | <code>Object</code> | The entry properties |
| preference | <code>\*</code> |  |

<a name="getEntryValue"></a>

## ~~getEntryValue(entry, property, name) ⇒ <code>String</code>~~
***Deprecated***

Get a value on an entry for a specific property type

**Kind**: global function  
**Returns**: <code>String</code> - The property value  
**Throws**:

- <code>Error</code> Throws for unknown property types


| Param | Type | Description |
| --- | --- | --- |
| entry | [<code>Entry</code>](#Entry) | The entry instance |
| property | <code>String</code> | The type of entry property (property/meta/attribute) |
| name | <code>String</code> | The property name |

<a name="isValidProperty"></a>

## isValidProperty(name) ⇒ <code>Boolean</code>
Check if a property name is valid

**Kind**: global function  
**Returns**: <code>Boolean</code> - True if the name is valid  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name to check |

<a name="findEntriesByCheck"></a>

## findEntriesByCheck(groups, compareFn) ⇒ [<code>Array.&lt;Entry&gt;</code>](#Entry)
Find entry instances by filtering with a compare function

**Kind**: global function  
**Returns**: [<code>Array.&lt;Entry&gt;</code>](#Entry) - An array of found entries  

| Param | Type | Description |
| --- | --- | --- |
| groups | [<code>Array.&lt;Group&gt;</code>](#Group) | The groups to check in |
| compareFn | <code>function</code> | The callback comparison function, return true to keep and false  to strip |

<a name="findGroupsByCheck"></a>

## findGroupsByCheck(groups, compareFn) ⇒ [<code>Array.&lt;Group&gt;</code>](#Group)
Find group instances within groups that satisfy some check

**Kind**: global function  
**Returns**: [<code>Array.&lt;Group&gt;</code>](#Group) - An array of found groups  

| Param | Type | Description |
| --- | --- | --- |
| groups | [<code>Array.&lt;Group&gt;</code>](#Group) | The groups to check within |
| compareFn | <code>function</code> | A comparision function - return true to keep, false to strip |

<a name="getAllEntries"></a>

## getAllEntries(groups) ⇒ [<code>Array.&lt;Entry&gt;</code>](#Entry)
Get all entries within a collection of groups

**Kind**: global function  
**Returns**: [<code>Array.&lt;Entry&gt;</code>](#Entry) - An array of entries  

| Param | Type | Description |
| --- | --- | --- |
| groups | [<code>Array.&lt;Group&gt;</code>](#Group) | An array of groups |

<a name="generateUUID"></a>

## generateUUID() ⇒ <code>String</code>
Generate a UUID (v4)

**Kind**: global function  
**Returns**: <code>String</code> - The new UUID  
<a name="ArchiveSourceOptions"></a>

## ArchiveSourceOptions : <code>Object</code>
New source options

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [id] | <code>String</code> | Override source ID generation |
| [type] | <code>String</code> | Specify the source type |

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

<a name="EntryFacade"></a>

## EntryFacade : <code>Object</code>
Entry facade for data input

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | The type of the facade |
| fields | [<code>Array.&lt;EntryFacadeField&gt;</code>](#EntryFacadeField) | An array of fields |

<a name="EntrySearchInfo"></a>

## EntrySearchInfo : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| entry | [<code>Entry</code>](#Entry) | The entry |
| archive | [<code>Archive</code>](#Archive) | The associated archive |

<a name="EntryFacadeField"></a>

## EntryFacadeField : <code>Object</code>
Entry facade data field

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| title | <code>String</code> | The user-friendly title of the field |
| field | <code>String</code> | The type of data to map back to on the Entry instance (property/attribute) |
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

