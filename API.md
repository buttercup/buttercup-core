## Classes

<dl>
<dt><a href="#Archive">Archive</a> ⇐ <code>EventEmitter</code></dt>
<dd><p>Buttercup Archive</p>
</dd>
<dt><a href="#ArchiveComparator">ArchiveComparator</a></dt>
<dd><p>Archive comparison class</p>
</dd>
<dt><a href="#ArchiveManager">ArchiveManager</a> ⇐ <code>EventEmitter</code></dt>
<dd><p>Archive manager class</p>
</dd>
<dt><a href="#ArchiveSource">ArchiveSource</a> ⇐ <code>EventEmitter</code></dt>
<dd><p>Archive source class</p>
</dd>
<dt><a href="#ArchiveMember">ArchiveMember</a></dt>
<dd><p>Base archive member class (for Entry, Group etc.)</p>
</dd>
<dt><a href="#Entry">Entry</a> ⇐ <code><a href="#ArchiveMember">ArchiveMember</a></code></dt>
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
<dt><a href="#Group">Group</a> ⇐ <code><a href="#ArchiveMember">ArchiveMember</a></code></dt>
<dd><p>Group implementation</p>
</dd>
<dt><a href="#InigoCommand">InigoCommand</a></dt>
<dd><p>Inigo command generator</p>
</dd>
<dt><a href="#MyButtercupClient">MyButtercupClient</a> ⇐ <code>EventEmitter</code></dt>
<dd><p>My Buttercup client</p>
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
<dt><a href="#flattenEntries">flattenEntries(archives)</a> ⇒ <code><a href="#EntrySearchInfo">Array.&lt;EntrySearchInfo&gt;</a></code></dt>
<dd><p>Flatten entries into a searchable structure</p>
</dd>
<dt><a href="#generateNewUpdateID">generateNewUpdateID()</a> ⇒ <code>Number</code></dt>
<dd><p>Generate a new update ID</p>
</dd>
<dt><a href="#extractCommandComponents">extractCommandComponents(command)</a> ⇒ <code>Array.&lt;String&gt;</code></dt>
<dd><p>Extract command components from a string</p>
</dd>
<dt><a href="#calculateCommonRecentCommand">calculateCommonRecentCommand(historyA, historyB)</a> ⇒ <code>null</code> | <code>Object</code></dt>
<dd><p>Calculate the common command indexes between 2 histories.
The common index is where a padding ID matches that of the other history,
at some point. If we assume one history may have been flattened, we cannot
assume that the entire past history will be the same, but
we can assume that at that point, the histories produce the same structure.
Because the histories may be different in the future, we use the newest
matching pad ID to create a common link between the 2 histories.</p>
</dd>
<dt><a href="#calculateHistoryDifferences">calculateHistoryDifferences()</a> ⇒ <code>Object</code> | <code>Boolean</code></dt>
<dd><p>Calculate the differences, in commands, between two histories</p>
</dd>
<dt><a href="#dedupe">dedupe(arr)</a> ⇒ <code>Array</code></dt>
<dd><p>De-dupe an array</p>
</dd>
<dt><a href="#describeArchiveDataset">describeArchiveDataset(dataset, parentGroupID)</a> ⇒ <code>Array.&lt;String&gt;</code></dt>
<dd><p>Describe an archive dataset - to history commands</p>
</dd>
<dt><a href="#decodeStringValue">decodeStringValue(value)</a> ⇒ <code>String</code></dt>
<dd><p>Decode an encoded property/meta value</p>
</dd>
<dt><a href="#encodeStringValue">encodeStringValue(value)</a> ⇒ <code>String</code></dt>
<dd><p>Encode a raw value into safe storage form
Uses base64 for encoding</p>
</dd>
<dt><a href="#getUniqueID">getUniqueID()</a> ⇒ <code>String</code></dt>
<dd><p>Get a unique identifier (UUID v4)</p>
</dd>
<dt><a href="#isEncoded">isEncoded(text)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Check if a string value is encoded</p>
</dd>
<dt><a href="#getEntryURLs">getEntryURLs(properties, preference)</a></dt>
<dd><p>Get URLs from an entry&#39;s properties
Allows for preferential sorting</p>
</dd>
<dt><del><a href="#getEntryValue">getEntryValue(entry, property, name)</a> ⇒ <code>String</code></del></dt>
<dd><p>Get a value on an entry for a specific property type</p>
</dd>
<dt><a href="#isValidProperty">isValidProperty(name)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Check if a property name is valid</p>
</dd>
<dt><a href="#stripDestructiveCommands">stripDestructiveCommands(history)</a> ⇒ <code>Array.&lt;String&gt;</code></dt>
<dd><p>Strip destructive commands from a history collection</p>
</dd>
<dt><a href="#findGroupContainingEntryID">findGroupContainingEntryID(groups, id)</a> ⇒ <code><a href="#FoundGroupResult">FoundGroupResult</a></code></dt>
<dd><p>Find a raw group that contains an entry with an ID</p>
</dd>
<dt><a href="#findGroupContainingGroupID">findGroupContainingGroupID(group, id)</a> ⇒ <code><a href="#FoundGroupResult">FoundGroupResult</a></code></dt>
<dd><p>Find a raw group that contains a group with an ID</p>
</dd>
<dt><a href="#extractSharesFromHistory">extractSharesFromHistory(history)</a> ⇒ <code>Object</code></dt>
<dd><p>Extract shares from a history collection</p>
</dd>
<dt><a href="#moveGroupBetweenArchives">moveGroupBetweenArchives(movingGroup, target)</a></dt>
<dd><p>Move a group between archives</p>
</dd>
<dt><a href="#prependSharePrefix">prependSharePrefix(history)</a> ⇒ <code>Array.&lt;String&gt;</code></dt>
<dd><p>Prepend the share prefix to every line that doesn&#39;t have it</p>
</dd>
<dt><a href="#removeSharePrefix">removeSharePrefix(history)</a> ⇒ <code>Array.&lt;String&gt;</code></dt>
<dd><p>Remove the share prefix to every line that has it</p>
</dd>
<dt><a href="#generateUUID">generateUUID()</a> ⇒ <code>String</code></dt>
<dd><p>Generate a UUID (v4)</p>
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
</dl>

## Typedefs

<dl>
<dt><a href="#ArchiveSourceOptions">ArchiveSourceOptions</a> : <code>Object</code></dt>
<dd><p>New source options</p>
</dd>
<dt><a href="#ArchiveSourceDescription">ArchiveSourceDescription</a></dt>
<dd></dd>
<dt><a href="#EntryHistoryItem">EntryHistoryItem</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#EntrySearchInfo">EntrySearchInfo</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#MyButtercupShareBase">MyButtercupShareBase</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#MyButtercupIncomingShare">MyButtercupIncomingShare</a> : <code><a href="#MyButtercupShareBase">MyButtercupShareBase</a></code></dt>
<dd></dd>
<dt><a href="#MyButtercupEncryptedShare">MyButtercupEncryptedShare</a> : <code><a href="#MyButtercupShareBase">MyButtercupShareBase</a></code></dt>
<dd></dd>
<dt><a href="#MyButtercupOrganisation">MyButtercupOrganisation</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#MyButtercupDigest">MyButtercupDigest</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#MyButtercupUsersListItem">MyButtercupUsersListItem</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#MyButtercupTokenResult">MyButtercupTokenResult</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#MyButtercupArchiveDetails">MyButtercupArchiveDetails</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#FoundGroupResult">FoundGroupResult</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="Archive"></a>

## Archive ⇐ <code>EventEmitter</code>
Buttercup Archive

**Kind**: global class  
**Extends**: <code>EventEmitter</code>  
**Mixes**: [<code>GroupCollection</code>](#GroupCollection), [<code>EntryCollection</code>](#EntryCollection)  

* [Archive](#Archive) ⇐ <code>EventEmitter</code>
    * _instance_
        * [.id](#Archive+id) : <code>String</code>
        * [.readOnly](#Archive+readOnly)
        * [.type](#Archive+type) : <code>String</code>
        * [.findGroupByID](#Archive+findGroupByID) ⇒ [<code>Group</code>](#Group) \| <code>null</code>
        * [.findGroupsByTitle](#Archive+findGroupsByTitle) ⇒ [<code>Array.&lt;Group&gt;</code>](#Group)
        * [.findEntriesByMeta](#Archive+findEntriesByMeta) ⇒ [<code>Array.&lt;Entry&gt;</code>](#Entry)
        * [.findEntriesByProperty](#Archive+findEntriesByProperty) ⇒ [<code>Array.&lt;Entry&gt;</code>](#Entry)
        * [.findGroupByID](#Archive+findGroupByID) ⇒ [<code>Group</code>](#Group) \| <code>null</code>
        * [.findGroupsByTitle](#Archive+findGroupsByTitle) ⇒ [<code>Array.&lt;Group&gt;</code>](#Group)
        * [.findEntriesByMeta](#Archive+findEntriesByMeta) ⇒ [<code>Array.&lt;Entry&gt;</code>](#Entry)
        * [.findEntriesByProperty](#Archive+findEntriesByProperty) ⇒ [<code>Array.&lt;Entry&gt;</code>](#Entry)
        * [.createGroup([title])](#Archive+createGroup) ⇒ [<code>Group</code>](#Group)
        * [.deleteAttribute(attributeName)](#Archive+deleteAttribute) ⇒ [<code>Archive</code>](#Archive)
        * [.emptyTrash()](#Archive+emptyTrash)
        * ~~[.getAttribute([attributeName])](#Archive+getAttribute) ⇒ <code>undefined</code> \| <code>String</code> \| <code>Object</code>~~
        * [.getAttributes()](#Archive+getAttributes) ⇒ <code>Object</code>
        * [.getFormat()](#Archive+getFormat) ⇒ <code>string</code>
        * [.getGroups()](#Archive+getGroups) ⇒ [<code>Array.&lt;Group&gt;</code>](#Group)
        * [.getHistory()](#Archive+getHistory) ⇒ <code>Array.&lt;String&gt;</code>
        * [.getTrashGroup()](#Archive+getTrashGroup) ⇒ [<code>Group</code>](#Group) \| <code>null</code>
        * [.optimise()](#Archive+optimise) ⇒ [<code>Archive</code>](#Archive)
        * [.setAttribute(attributeName, value)](#Archive+setAttribute) ⇒ [<code>Archive</code>](#Archive)
        * [.toObject(groupOutputFlags)](#Archive+toObject) ⇒ <code>Object</code>
        * [._generateID()](#Archive+_generateID)
        * [._getWestley()](#Archive+_getWestley) ⇒ <code>Westley</code>
        * [.inst.findEntryByID(id)](#Archive+findEntryByID) ⇒ <code>null</code> \| [<code>Entry</code>](#Entry)
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

### ~~archive.getAttribute([attributeName]) ⇒ <code>undefined</code> \| <code>String</code> \| <code>Object</code>~~
***Deprecated***

Get the value of an attribute

**Kind**: instance method of [<code>Archive</code>](#Archive)  
**Returns**: <code>undefined</code> \| <code>String</code> \| <code>Object</code> - The value of the attribute or undefined if not
 set. Returns an object if no attribute name is given.  

| Param | Type | Description |
| --- | --- | --- |
| [attributeName] | <code>String</code> | The attribute to get |

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

### archive.\_generateID()
Generate an archive ID

**Kind**: instance method of [<code>Archive</code>](#Archive)  
**Access**: protected  
<a name="Archive+_getWestley"></a>

### archive.\_getWestley() ⇒ <code>Westley</code>
Get the underlying Westley instance

**Kind**: instance method of [<code>Archive</code>](#Archive)  
**Returns**: <code>Westley</code> - The Westley instance  
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
Archive comparison class

**Kind**: global class  

* [ArchiveComparator](#ArchiveComparator)
    * [new ArchiveComparator(originalArchive, secondaryArchive)](#new_ArchiveComparator_new)
    * [.archivesDiffer()](#ArchiveComparator+archivesDiffer) ⇒ <code>Boolean</code>
    * [.calculateDifferences()](#ArchiveComparator+calculateDifferences) ⇒ <code>Object</code> \| <code>null</code>

<a name="new_ArchiveComparator_new"></a>

### new ArchiveComparator(originalArchive, secondaryArchive)
Constructor for the archive comparator


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

### archiveComparator.calculateDifferences() ⇒ <code>Object</code> \| <code>null</code>
Calculate the differences, in commands, between the two archives

**Kind**: instance method of [<code>ArchiveComparator</code>](#ArchiveComparator)  
**Returns**: <code>Object</code> \| <code>null</code> - Returns null if no common base
       is found, or the command differences as two arrays  
<a name="ArchiveManager"></a>

## ArchiveManager ⇐ <code>EventEmitter</code>
Archive manager class

**Kind**: global class  
**Extends**: <code>EventEmitter</code>  

* [ArchiveManager](#ArchiveManager) ⇐ <code>EventEmitter</code>
    * [new ArchiveManager([storageInterface])](#new_ArchiveManager_new)
    * [.autoUpdateEnabled](#ArchiveManager+autoUpdateEnabled) : <code>Boolean</code>
    * [.nextSourceOrder](#ArchiveManager+nextSourceOrder) : <code>Number</code>
    * [.sources](#ArchiveManager+sources) : [<code>Array.&lt;ArchiveSource&gt;</code>](#ArchiveSource)
    * [.sourcesList](#ArchiveManager+sourcesList) : [<code>Array.&lt;ArchiveSourceDescription&gt;</code>](#ArchiveSourceDescription)
    * [.storageInterface](#ArchiveManager+storageInterface) : <code>StorageInterface</code>
    * [.unlockedSources](#ArchiveManager+unlockedSources) : [<code>Array.&lt;ArchiveSource&gt;</code>](#ArchiveSource)
    * [.updateableSources](#ArchiveManager+updateableSources) : [<code>Array.&lt;ArchiveSource&gt;</code>](#ArchiveSource)
    * [.addSource(archiveSource, [obj])](#ArchiveManager+addSource)
    * [.dehydrate()](#ArchiveManager+dehydrate) ⇒ <code>Promise</code>
    * [.dehydrateSource(sourceID)](#ArchiveManager+dehydrateSource) ⇒ <code>Promise</code>
    * [.getSourceForID(sourceID)](#ArchiveManager+getSourceForID) ⇒ [<code>ArchiveSource</code>](#ArchiveSource) \| <code>null</code>
    * [.interruptAutoUpdate(cb)](#ArchiveManager+interruptAutoUpdate) ⇒ <code>Promise</code>
    * [.rehydrate()](#ArchiveManager+rehydrate) ⇒ <code>Promise</code>
    * [.removeSource(sourceID)](#ArchiveManager+removeSource) ⇒ <code>Promise</code>
    * [.reorderSource(sourceID, position)](#ArchiveManager+reorderSource)
    * [.reorderSources()](#ArchiveManager+reorderSources)
    * [.toggleAutoUpdating([enable], [delay])](#ArchiveManager+toggleAutoUpdating)

<a name="new_ArchiveManager_new"></a>

### new ArchiveManager([storageInterface])
Constructor for the archive manager


| Param | Type | Description |
| --- | --- | --- |
| [storageInterface] | <code>StorageInterface</code> | The storage interface to use -  defaults to storing in memory |

<a name="ArchiveManager+autoUpdateEnabled"></a>

### archiveManager.autoUpdateEnabled : <code>Boolean</code>
Detect if auto-updating is enabled

**Kind**: instance property of [<code>ArchiveManager</code>](#ArchiveManager)  
**Read only**: true  
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
<a name="ArchiveManager+updateableSources"></a>

### archiveManager.updateableSources : [<code>Array.&lt;ArchiveSource&gt;</code>](#ArchiveSource)
All auto-updateable sources

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

<a name="ArchiveManager+interruptAutoUpdate"></a>

### archiveManager.interruptAutoUpdate(cb) ⇒ <code>Promise</code>
Wait for and interrupt state changes when auto-update is running

**Kind**: instance method of [<code>ArchiveManager</code>](#ArchiveManager)  
**Returns**: <code>Promise</code> - A promise that resolves when ready  

| Param | Type | Description |
| --- | --- | --- |
| cb | <code>function</code> | The callback to execute during the auto-update interruption |

**Example**  
```js
archiveManager.interruptAutoUpdate(() => {
     // Do something with auto-updating paused
 });
```
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
<a name="ArchiveManager+toggleAutoUpdating"></a>

### archiveManager.toggleAutoUpdating([enable], [delay])
Toggle auto updating of sources

**Kind**: instance method of [<code>ArchiveManager</code>](#ArchiveManager)  

| Param | Type | Description |
| --- | --- | --- |
| [enable] | <code>Boolean</code> | Enable or disable auto updating. Leave empty  to invert the setting |
| [delay] | <code>Number</code> | Milliseconds between updates |

<a name="ArchiveSource"></a>

## ArchiveSource ⇐ <code>EventEmitter</code>
Archive source class

**Kind**: global class  
**Extends**: <code>EventEmitter</code>  

* [ArchiveSource](#ArchiveSource) ⇐ <code>EventEmitter</code>
    * [new ArchiveSource(name, sourceCredentials, archiveCredentials, [newSourceOptions])](#new_ArchiveSource_new)
    * _instance_
        * [.canBeUpdated](#ArchiveSource+canBeUpdated) : <code>Boolean</code>
        * [.colour](#ArchiveSource+colour) : <code>String</code>
        * [.description](#ArchiveSource+description) : [<code>ArchiveSourceDescription</code>](#ArchiveSourceDescription)
        * [.id](#ArchiveSource+id) : <code>String</code>
        * [.meta](#ArchiveSource+meta) : <code>Object</code>
        * [.name](#ArchiveSource+name) : <code>String</code>
        * [.status](#ArchiveSource+status) : <code>ArchiveSourceStatus</code>
        * [.storageInterface](#ArchiveSource+storageInterface) : <code>StorageInterface</code>
        * [.workspace](#ArchiveSource+workspace) : [<code>Workspace</code>](#Workspace) \| <code>null</code>
        * [.checkOfflineCopy()](#ArchiveSource+checkOfflineCopy) ⇒ <code>Promise.&lt;Boolean&gt;</code>
        * [.dehydrate()](#ArchiveSource+dehydrate) ⇒ <code>Promise.&lt;String&gt;</code>
        * [.getOfflineContent()](#ArchiveSource+getOfflineContent) ⇒ <code>Promise.&lt;(String\|null)&gt;</code>
        * [.lock()](#ArchiveSource+lock) ⇒ <code>Promise.&lt;String&gt;</code>
        * ~~[.unlock(masterPassword, [initialiseRemote], contentOverride, [storeOfflineCopy])](#ArchiveSource+unlock)~~
        * [.updateArchiveCredentials(masterPassword)](#ArchiveSource+updateArchiveCredentials) ⇒ <code>Promise.&lt;String&gt;</code>
        * ~~[.updateSourceCredentials(masterPassword, callback)](#ArchiveSource+updateSourceCredentials) ⇒ <code>Promise</code>~~
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

<a name="ArchiveSource+canBeUpdated"></a>

### archiveSource.canBeUpdated : <code>Boolean</code>
Whether this source can be auto updated or not

**Kind**: instance property of [<code>ArchiveSource</code>](#ArchiveSource)  
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
<a name="ArchiveSource+meta"></a>

### archiveSource.meta : <code>Object</code>
Meta data included with the source (not encrypted)

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

### ~~archiveSource.unlock(masterPassword, [initialiseRemote], contentOverride, [storeOfflineCopy])~~
***Deprecated***

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
| [storeOfflineCopy] | <code>Boolean</code> | <code>true</code> | Whether or not to store an offline copy. Defaults to  true. |

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

<a name="ArchiveSource+updateSourceCredentials"></a>

### ~~archiveSource.updateSourceCredentials(masterPassword, callback) ⇒ <code>Promise</code>~~
***Deprecated***

Update source credentials
(Useful for updating tokens when authentication parameters change)

**Kind**: instance method of [<code>ArchiveSource</code>](#ArchiveSource)  
**Returns**: <code>Promise</code> - A promise that resolves when the update is complete  

| Param | Type | Description |
| --- | --- | --- |
| masterPassword | <code>String</code> | The master password |
| callback | <code>function</code> | Callback that's fired with the source crendentials  and datasource. If the source is locked, only the source credentials are  provided (datasource is `null` in this case) |

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

<a name="ArchiveMember"></a>

## ArchiveMember
Base archive member class (for Entry, Group etc.)

**Kind**: global class  

* [ArchiveMember](#ArchiveMember)
    * [new ArchiveMember(archive, remoteObj)](#new_ArchiveMember_new)
    * [.id](#ArchiveMember+id) : <code>String</code>
    * [.permissions](#ArchiveMember+permissions) : <code>Array.&lt;String&gt;</code>
    * [.grantPermission(perm)](#ArchiveMember+grantPermission)
    * [.hasPermission(perm)](#ArchiveMember+hasPermission) ⇒ <code>Boolean</code>
    * [.revokeAllPermissions()](#ArchiveMember+revokeAllPermissions)
    * [.revokePermission(perm)](#ArchiveMember+revokePermission)
    * [._getArchive()](#ArchiveMember+_getArchive) ⇒ [<code>Archive</code>](#Archive)
    * [._getRemoteObject()](#ArchiveMember+_getRemoteObject) ⇒ <code>Object</code>
    * [._getWestley()](#ArchiveMember+_getWestley) ⇒ <code>Westley</code>

<a name="new_ArchiveMember_new"></a>

### new ArchiveMember(archive, remoteObj)
Constructor for the archive member base class


| Param | Type | Description |
| --- | --- | --- |
| archive | [<code>Archive</code>](#Archive) | Archive reference |
| remoteObj | <code>Object</code> | Remote datasource reference |

<a name="ArchiveMember+id"></a>

### archiveMember.id : <code>String</code>
The ID of the entry

**Kind**: instance property of [<code>ArchiveMember</code>](#ArchiveMember)  
**Read only**: true  
<a name="ArchiveMember+permissions"></a>

### archiveMember.permissions : <code>Array.&lt;String&gt;</code>
The current granted permissions

**Kind**: instance property of [<code>ArchiveMember</code>](#ArchiveMember)  
<a name="ArchiveMember+grantPermission"></a>

### archiveMember.grantPermission(perm)
Grant a new permission to the member

**Kind**: instance method of [<code>ArchiveMember</code>](#ArchiveMember)  

| Param | Type | Description |
| --- | --- | --- |
| perm | <code>String</code> | The permission to grant |

<a name="ArchiveMember+hasPermission"></a>

### archiveMember.hasPermission(perm) ⇒ <code>Boolean</code>
Check if the member has a permission

**Kind**: instance method of [<code>ArchiveMember</code>](#ArchiveMember)  

| Param | Type | Description |
| --- | --- | --- |
| perm | <code>String</code> | The permission to check for |

<a name="ArchiveMember+revokeAllPermissions"></a>

### archiveMember.revokeAllPermissions()
Revoke all permissions

**Kind**: instance method of [<code>ArchiveMember</code>](#ArchiveMember)  
<a name="ArchiveMember+revokePermission"></a>

### archiveMember.revokePermission(perm)
Revoke a single permission

**Kind**: instance method of [<code>ArchiveMember</code>](#ArchiveMember)  

| Param | Type | Description |
| --- | --- | --- |
| perm | <code>String</code> | The permission to revoke |

<a name="ArchiveMember+_getArchive"></a>

### archiveMember.\_getArchive() ⇒ [<code>Archive</code>](#Archive)
Get the archive reference

**Kind**: instance method of [<code>ArchiveMember</code>](#ArchiveMember)  
**Returns**: [<code>Archive</code>](#Archive) - The Archive reference  
**Access**: protected  
<a name="ArchiveMember+_getRemoteObject"></a>

### archiveMember.\_getRemoteObject() ⇒ <code>Object</code>
Get the remote object that mirrors the data represented here

**Kind**: instance method of [<code>ArchiveMember</code>](#ArchiveMember)  
**Returns**: <code>Object</code> - The remote object (in-memory copy)  
**Access**: protected  
<a name="ArchiveMember+_getWestley"></a>

### archiveMember.\_getWestley() ⇒ <code>Westley</code>
Get the Westley reference

**Kind**: instance method of [<code>ArchiveMember</code>](#ArchiveMember)  
**Returns**: <code>Westley</code> - The internal Westley reference  
**Access**: protected  
<a name="Entry"></a>

## Entry ⇐ [<code>ArchiveMember</code>](#ArchiveMember)
Entry class implementation
Entries form the low-level data structures used in Buttercup, and
are intended to represent logical collections of properties, like
a login for a website.

**Kind**: global class  
**Extends**: [<code>ArchiveMember</code>](#ArchiveMember)  

* [Entry](#Entry) ⇐ [<code>ArchiveMember</code>](#ArchiveMember)
    * _instance_
        * [.type](#Entry+type) : <code>String</code>
        * [.id](#ArchiveMember+id) : <code>String</code>
        * [.permissions](#ArchiveMember+permissions) : <code>Array.&lt;String&gt;</code>
        * [.delete([skipTrash])](#Entry+delete) ⇒ <code>Boolean</code>
        * [.deleteAttribute(attr)](#Entry+deleteAttribute) ⇒ [<code>Entry</code>](#Entry)
        * ~~[.deleteMeta(property)](#Entry+deleteMeta) ⇒ [<code>Entry</code>](#Entry)~~
        * [.deleteProperty(property)](#Entry+deleteProperty) ⇒ [<code>Entry</code>](#Entry)
        * [.getAttribute([attributeName])](#Entry+getAttribute) ⇒ <code>String</code> \| <code>undefined</code> \| <code>Object</code>
        * ~~[.getAttributes()](#Entry+getAttributes) ⇒ <code>Object</code>~~
        * ~~[.getGroup()](#Entry+getGroup) ⇒ [<code>Group</code>](#Group) \| <code>null</code>~~
        * [.getHistory()](#Entry+getHistory) ⇒ [<code>Array.&lt;EntryHistoryItem&gt;</code>](#EntryHistoryItem)
        * ~~[.getMeta([property])](#Entry+getMeta) ⇒ <code>String</code> \| <code>undefined</code> \| <code>Object</code>~~
        * [.getProperty([property])](#Entry+getProperty) ⇒ <code>String</code> \| <code>undefined</code> \| <code>Object</code>
        * [.getProperties(propertyExpression)](#Entry+getProperties) ⇒ <code>Object</code>
        * [.getURLs([urlTypePreference])](#Entry+getURLs) ⇒ <code>Array.&lt;String&gt;</code>
        * [.isInTrash()](#Entry+isInTrash) ⇒ <code>Boolean</code>
        * [.moveToGroup(group)](#Entry+moveToGroup) ⇒ [<code>Entry</code>](#Entry)
        * [.setAttribute(attributeName, value)](#Entry+setAttribute) ⇒ [<code>Entry</code>](#Entry)
        * ~~[.setMeta(prop, [val])](#Entry+setMeta) ⇒ [<code>Entry</code>](#Entry)~~
        * [.setProperty(prop, [val])](#Entry+setProperty) ⇒ [<code>Entry</code>](#Entry)
        * [.toObject()](#Entry+toObject) ⇒ <code>Object</code>
        * [.toString()](#Entry+toString) ⇒ <code>String</code>
        * [.grantPermission(perm)](#ArchiveMember+grantPermission)
        * [.hasPermission(perm)](#ArchiveMember+hasPermission) ⇒ <code>Boolean</code>
        * [.revokeAllPermissions()](#ArchiveMember+revokeAllPermissions)
        * [.revokePermission(perm)](#ArchiveMember+revokePermission)
        * [._getArchive()](#ArchiveMember+_getArchive) ⇒ [<code>Archive</code>](#Archive)
        * [._getRemoteObject()](#ArchiveMember+_getRemoteObject) ⇒ <code>Object</code>
        * [._getWestley()](#ArchiveMember+_getWestley) ⇒ <code>Westley</code>
    * _static_
        * [.createNew(archive, groupID)](#Entry.createNew) ⇒ [<code>Entry</code>](#Entry)

<a name="Entry+type"></a>

### entry.type : <code>String</code>
Get the instance type

**Kind**: instance property of [<code>Entry</code>](#Entry)  
**Read only**: true  
<a name="ArchiveMember+id"></a>

### entry.id : <code>String</code>
The ID of the entry

**Kind**: instance property of [<code>Entry</code>](#Entry)  
**Read only**: true  
<a name="ArchiveMember+permissions"></a>

### entry.permissions : <code>Array.&lt;String&gt;</code>
The current granted permissions

**Kind**: instance property of [<code>Entry</code>](#Entry)  
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
<a name="Entry+getHistory"></a>

### entry.getHistory() ⇒ [<code>Array.&lt;EntryHistoryItem&gt;</code>](#EntryHistoryItem)
Get the history of the entry

**Kind**: instance method of [<code>Entry</code>](#Entry)  
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

<a name="Entry+getProperties"></a>

### entry.getProperties(propertyExpression) ⇒ <code>Object</code>
Get property values via RegExp expressions.
If no property expression is specified, it returns the empty behavior of
{@see Entry.getProperty}.

**Kind**: instance method of [<code>Entry</code>](#Entry)  
**Returns**: <code>Object</code> - A key-value object of the matching properties  

| Param | Type |
| --- | --- |
| propertyExpression | <code>RegExp</code> \| <code>String</code> | 

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
<a name="ArchiveMember+grantPermission"></a>

### entry.grantPermission(perm)
Grant a new permission to the member

**Kind**: instance method of [<code>Entry</code>](#Entry)  

| Param | Type | Description |
| --- | --- | --- |
| perm | <code>String</code> | The permission to grant |

<a name="ArchiveMember+hasPermission"></a>

### entry.hasPermission(perm) ⇒ <code>Boolean</code>
Check if the member has a permission

**Kind**: instance method of [<code>Entry</code>](#Entry)  

| Param | Type | Description |
| --- | --- | --- |
| perm | <code>String</code> | The permission to check for |

<a name="ArchiveMember+revokeAllPermissions"></a>

### entry.revokeAllPermissions()
Revoke all permissions

**Kind**: instance method of [<code>Entry</code>](#Entry)  
<a name="ArchiveMember+revokePermission"></a>

### entry.revokePermission(perm)
Revoke a single permission

**Kind**: instance method of [<code>Entry</code>](#Entry)  

| Param | Type | Description |
| --- | --- | --- |
| perm | <code>String</code> | The permission to revoke |

<a name="ArchiveMember+_getArchive"></a>

### entry.\_getArchive() ⇒ [<code>Archive</code>](#Archive)
Get the archive reference

**Kind**: instance method of [<code>Entry</code>](#Entry)  
**Returns**: [<code>Archive</code>](#Archive) - The Archive reference  
**Access**: protected  
<a name="ArchiveMember+_getRemoteObject"></a>

### entry.\_getRemoteObject() ⇒ <code>Object</code>
Get the remote object that mirrors the data represented here

**Kind**: instance method of [<code>Entry</code>](#Entry)  
**Returns**: <code>Object</code> - The remote object (in-memory copy)  
**Access**: protected  
<a name="ArchiveMember+_getWestley"></a>

### entry.\_getWestley() ⇒ <code>Westley</code>
Get the Westley reference

**Kind**: instance method of [<code>Entry</code>](#Entry)  
**Returns**: <code>Westley</code> - The internal Westley reference  
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
        * [.westley](#Flattener+westley) : <code>Westley</code>
        * [.canBeFlattened()](#Flattener+canBeFlattened) ⇒ <code>Boolean</code>
        * [.flatten([force])](#Flattener+flatten) ⇒ <code>Boolean</code>
    * _static_
        * [.FLATTENING_MIN_LINES](#Flattener.FLATTENING_MIN_LINES) : <code>Number</code>
        * [.PRESERVE_LINES](#Flattener.PRESERVE_LINES) : <code>Number</code>

<a name="Flattener+westley"></a>

### flattener.westley : <code>Westley</code>
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

### Flattener.FLATTENING\_MIN\_LINES : <code>Number</code>
Minimum history lines before flattening can occur

**Kind**: static constant of [<code>Flattener</code>](#Flattener)  
<a name="Flattener.PRESERVE_LINES"></a>

### Flattener.PRESERVE\_LINES : <code>Number</code>
Number of lines to preserve (most recent)

**Kind**: static constant of [<code>Flattener</code>](#Flattener)  
<a name="Group"></a>

## Group ⇐ [<code>ArchiveMember</code>](#ArchiveMember)
Group implementation

**Kind**: global class  
**Extends**: [<code>ArchiveMember</code>](#ArchiveMember)  
**Mixes**: [<code>GroupCollection</code>](#GroupCollection), [<code>EntryCollection</code>](#EntryCollection)  

* [Group](#Group) ⇐ [<code>ArchiveMember</code>](#ArchiveMember)
    * [new Group(archive, remoteObj)](#new_Group_new)
    * _instance_
        * [.type](#Group+type) : <code>String</code>
        * [.findGroupByID](#Group+findGroupByID) ⇒ [<code>Group</code>](#Group) \| <code>null</code>
        * [.findGroupsByTitle](#Group+findGroupsByTitle) ⇒ [<code>Array.&lt;Group&gt;</code>](#Group)
        * [.findEntriesByMeta](#Group+findEntriesByMeta) ⇒ [<code>Array.&lt;Entry&gt;</code>](#Entry)
        * [.findEntriesByProperty](#Group+findEntriesByProperty) ⇒ [<code>Array.&lt;Entry&gt;</code>](#Entry)
        * [.findGroupByID](#Group+findGroupByID) ⇒ [<code>Group</code>](#Group) \| <code>null</code>
        * [.findGroupsByTitle](#Group+findGroupsByTitle) ⇒ [<code>Array.&lt;Group&gt;</code>](#Group)
        * [.findEntriesByMeta](#Group+findEntriesByMeta) ⇒ [<code>Array.&lt;Entry&gt;</code>](#Entry)
        * [.findEntriesByProperty](#Group+findEntriesByProperty) ⇒ [<code>Array.&lt;Entry&gt;</code>](#Entry)
        * [.id](#ArchiveMember+id) : <code>String</code>
        * [.permissions](#ArchiveMember+permissions) : <code>Array.&lt;String&gt;</code>
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
        * [.inst.findEntryByID(id)](#Group+findEntryByID) ⇒ <code>null</code> \| [<code>Entry</code>](#Entry)
        * [.inst.findEntryByID(id)](#Group+findEntryByID) ⇒ <code>null</code> \| [<code>Entry</code>](#Entry)
        * [.grantPermission(perm)](#ArchiveMember+grantPermission)
        * [.hasPermission(perm)](#ArchiveMember+hasPermission) ⇒ <code>Boolean</code>
        * [.revokeAllPermissions()](#ArchiveMember+revokeAllPermissions)
        * [.revokePermission(perm)](#ArchiveMember+revokePermission)
        * [._getArchive()](#ArchiveMember+_getArchive) ⇒ [<code>Archive</code>](#Archive)
        * [._getRemoteObject()](#ArchiveMember+_getRemoteObject) ⇒ <code>Object</code>
        * [._getWestley()](#ArchiveMember+_getWestley) ⇒ <code>Westley</code>
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

<a name="ArchiveMember+id"></a>

### group.id : <code>String</code>
The ID of the entry

**Kind**: instance property of [<code>Group</code>](#Group)  
**Overrides**: [<code>id</code>](#ArchiveMember+id)  
**Read only**: true  
<a name="ArchiveMember+permissions"></a>

### group.permissions : <code>Array.&lt;String&gt;</code>
The current granted permissions

**Kind**: instance property of [<code>Group</code>](#Group)  
**Overrides**: [<code>permissions</code>](#ArchiveMember+permissions)  
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

<a name="Group+findEntryByID"></a>

### group.inst.findEntryByID(id) ⇒ <code>null</code> \| [<code>Entry</code>](#Entry)
Find an entry by its ID

**Kind**: instance method of [<code>Group</code>](#Group)  
**Mixes**: [<code>inst.findEntryByID</code>](#EntryCollection.inst.findEntryByID)  
**Returns**: <code>null</code> \| [<code>Entry</code>](#Entry) - Null if not found, or the Entry instance  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The ID to search for |

<a name="Group+findEntryByID"></a>

### group.inst.findEntryByID(id) ⇒ <code>null</code> \| [<code>Entry</code>](#Entry)
Find an entry by its ID

**Kind**: instance method of [<code>Group</code>](#Group)  
**Mixes**: [<code>inst.findEntryByID</code>](#EntryCollection.inst.findEntryByID)  
**Returns**: <code>null</code> \| [<code>Entry</code>](#Entry) - Null if not found, or the Entry instance  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The ID to search for |

<a name="ArchiveMember+grantPermission"></a>

### group.grantPermission(perm)
Grant a new permission to the member

**Kind**: instance method of [<code>Group</code>](#Group)  
**Overrides**: [<code>grantPermission</code>](#ArchiveMember+grantPermission)  

| Param | Type | Description |
| --- | --- | --- |
| perm | <code>String</code> | The permission to grant |

<a name="ArchiveMember+hasPermission"></a>

### group.hasPermission(perm) ⇒ <code>Boolean</code>
Check if the member has a permission

**Kind**: instance method of [<code>Group</code>](#Group)  
**Overrides**: [<code>hasPermission</code>](#ArchiveMember+hasPermission)  

| Param | Type | Description |
| --- | --- | --- |
| perm | <code>String</code> | The permission to check for |

<a name="ArchiveMember+revokeAllPermissions"></a>

### group.revokeAllPermissions()
Revoke all permissions

**Kind**: instance method of [<code>Group</code>](#Group)  
**Overrides**: [<code>revokeAllPermissions</code>](#ArchiveMember+revokeAllPermissions)  
<a name="ArchiveMember+revokePermission"></a>

### group.revokePermission(perm)
Revoke a single permission

**Kind**: instance method of [<code>Group</code>](#Group)  
**Overrides**: [<code>revokePermission</code>](#ArchiveMember+revokePermission)  

| Param | Type | Description |
| --- | --- | --- |
| perm | <code>String</code> | The permission to revoke |

<a name="ArchiveMember+_getArchive"></a>

### group.\_getArchive() ⇒ [<code>Archive</code>](#Archive)
Get the archive reference

**Kind**: instance method of [<code>Group</code>](#Group)  
**Overrides**: [<code>\_getArchive</code>](#ArchiveMember+_getArchive)  
**Returns**: [<code>Archive</code>](#Archive) - The Archive reference  
**Access**: protected  
<a name="ArchiveMember+_getRemoteObject"></a>

### group.\_getRemoteObject() ⇒ <code>Object</code>
Get the remote object that mirrors the data represented here

**Kind**: instance method of [<code>Group</code>](#Group)  
**Overrides**: [<code>\_getRemoteObject</code>](#ArchiveMember+_getRemoteObject)  
**Returns**: <code>Object</code> - The remote object (in-memory copy)  
**Access**: protected  
<a name="ArchiveMember+_getWestley"></a>

### group.\_getWestley() ⇒ <code>Westley</code>
Get the Westley reference

**Kind**: instance method of [<code>Group</code>](#Group)  
**Overrides**: [<code>\_getWestley</code>](#ArchiveMember+_getWestley)  
**Returns**: <code>Westley</code> - The internal Westley reference  
**Access**: protected  
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

<a name="MyButtercupClient"></a>

## MyButtercupClient ⇐ <code>EventEmitter</code>
My Buttercup client

**Kind**: global class  
**Extends**: <code>EventEmitter</code>  

* [MyButtercupClient](#MyButtercupClient) ⇐ <code>EventEmitter</code>
    * [new MyButtercupClient(clientID, clientSecret, accessToken, refreshToken)](#new_MyButtercupClient_new)
    * _instance_
        * [.accessToken](#MyButtercupClient+accessToken) : <code>String</code>
        * [.digest](#MyButtercupClient+digest) : [<code>MyButtercupDigest</code>](#MyButtercupDigest) \| <code>null</code>
        * [.refreshToken](#MyButtercupClient+refreshToken) : <code>String</code>
        * [.fetchShares(ids)](#MyButtercupClient+fetchShares) ⇒ <code>Promise.&lt;Object.&lt;String, MyButtercupEncryptedShare&gt;&gt;</code>
        * [.fetchUserArchive()](#MyButtercupClient+fetchUserArchive) ⇒ <code>Promise.&lt;{archive: String, updateID: Number}&gt;</code>
        * [.fetchUserArchiveDetails()](#MyButtercupClient+fetchUserArchiveDetails) ⇒ [<code>Promise.&lt;MyButtercupArchiveDetails&gt;</code>](#MyButtercupArchiveDetails)
        * [.retrieveDigest()](#MyButtercupClient+retrieveDigest) ⇒ [<code>Promise.&lt;MyButtercupDigest&gt;</code>](#MyButtercupDigest)
        * [.retrieveUsersList()](#MyButtercupClient+retrieveUsersList) ⇒ <code>Promise.&lt;Array.&lt;MyButtercupUsersListItem&gt;&gt;</code>
        * [.retrieveUsersListForOrganisation(orgID)](#MyButtercupClient+retrieveUsersListForOrganisation) ⇒ <code>Promise.&lt;Array.&lt;MyButtercupUsersListItem&gt;&gt;</code>
        * [.writeUserArchive(contents, previousUpdateID, newUpdateID)](#MyButtercupClient+writeUserArchive) ⇒ <code>Promise</code>
        * [._handleRequestFailure(err)](#MyButtercupClient+_handleRequestFailure) ⇒ <code>Promise</code>
        * [._performTokenRefresh()](#MyButtercupClient+_performTokenRefresh) ⇒ <code>Promise</code>
        * ["tokensUpdated"](#MyButtercupClient+event_tokensUpdated)
    * _static_
        * [.exchangeAuthCodeForTokens(authCode, clientID, clientSecret, redirectURI)](#MyButtercupClient.exchangeAuthCodeForTokens) ⇒ [<code>MyButtercupTokenResult</code>](#MyButtercupTokenResult)
        * [.generateAuthorisationURL(clientID)](#MyButtercupClient.generateAuthorisationURL) ⇒ <code>String</code>

<a name="new_MyButtercupClient_new"></a>

### new MyButtercupClient(clientID, clientSecret, accessToken, refreshToken)
Create a new client instance


| Param | Type | Description |
| --- | --- | --- |
| clientID | <code>String</code> | The client identifier |
| clientSecret | <code>String</code> | The client secret |
| accessToken | <code>String</code> | Access token |
| refreshToken | <code>String</code> | Refresh token |

<a name="MyButtercupClient+accessToken"></a>

### myButtercupClient.accessToken : <code>String</code>
The current access token

**Kind**: instance property of [<code>MyButtercupClient</code>](#MyButtercupClient)  
**Read only**: true  
<a name="MyButtercupClient+digest"></a>

### myButtercupClient.digest : [<code>MyButtercupDigest</code>](#MyButtercupDigest) \| <code>null</code>
The last client digest response

**Kind**: instance property of [<code>MyButtercupClient</code>](#MyButtercupClient)  
**Read only**: true  
<a name="MyButtercupClient+refreshToken"></a>

### myButtercupClient.refreshToken : <code>String</code>
The refresh token

**Kind**: instance property of [<code>MyButtercupClient</code>](#MyButtercupClient)  
**Read only**: true  
<a name="MyButtercupClient+fetchShares"></a>

### myButtercupClient.fetchShares(ids) ⇒ <code>Promise.&lt;Object.&lt;String, MyButtercupEncryptedShare&gt;&gt;</code>
Fetch user shares

**Kind**: instance method of [<code>MyButtercupClient</code>](#MyButtercupClient)  

| Param | Type | Description |
| --- | --- | --- |
| ids | <code>Array.&lt;String&gt;</code> | Share IDs |

<a name="MyButtercupClient+fetchUserArchive"></a>

### myButtercupClient.fetchUserArchive() ⇒ <code>Promise.&lt;{archive: String, updateID: Number}&gt;</code>
Fetch user vault contents

**Kind**: instance method of [<code>MyButtercupClient</code>](#MyButtercupClient)  
**Returns**: <code>Promise.&lt;{archive: String, updateID: Number}&gt;</code> - The user's
 vault contents  
<a name="MyButtercupClient+fetchUserArchiveDetails"></a>

### myButtercupClient.fetchUserArchiveDetails() ⇒ [<code>Promise.&lt;MyButtercupArchiveDetails&gt;</code>](#MyButtercupArchiveDetails)
Fetch the user's vault details

**Kind**: instance method of [<code>MyButtercupClient</code>](#MyButtercupClient)  
**Returns**: [<code>Promise.&lt;MyButtercupArchiveDetails&gt;</code>](#MyButtercupArchiveDetails) - The details of the vault  
<a name="MyButtercupClient+retrieveDigest"></a>

### myButtercupClient.retrieveDigest() ⇒ [<code>Promise.&lt;MyButtercupDigest&gt;</code>](#MyButtercupDigest)
Fetch and set account digest information

**Kind**: instance method of [<code>MyButtercupClient</code>](#MyButtercupClient)  
**Returns**: [<code>Promise.&lt;MyButtercupDigest&gt;</code>](#MyButtercupDigest) - Digest information  
<a name="MyButtercupClient+retrieveUsersList"></a>

### myButtercupClient.retrieveUsersList() ⇒ <code>Promise.&lt;Array.&lt;MyButtercupUsersListItem&gt;&gt;</code>
Get the list of users available to address for the user

**Kind**: instance method of [<code>MyButtercupClient</code>](#MyButtercupClient)  
<a name="MyButtercupClient+retrieveUsersListForOrganisation"></a>

### myButtercupClient.retrieveUsersListForOrganisation(orgID) ⇒ <code>Promise.&lt;Array.&lt;MyButtercupUsersListItem&gt;&gt;</code>
Get the list of users for an organisation
(User must be present in organisation, or this method will fail)

**Kind**: instance method of [<code>MyButtercupClient</code>](#MyButtercupClient)  

| Param | Type | Description |
| --- | --- | --- |
| orgID | <code>Number</code> | The ID of the organisation |

<a name="MyButtercupClient+writeUserArchive"></a>

### myButtercupClient.writeUserArchive(contents, previousUpdateID, newUpdateID) ⇒ <code>Promise</code>
Write the user vault contents back to the server

**Kind**: instance method of [<code>MyButtercupClient</code>](#MyButtercupClient)  
**Returns**: <code>Promise</code> - A promise that resolves once the write has
 been completed  

| Param | Type | Description |
| --- | --- | --- |
| contents | <code>String</code> | Encrypted vault contents |
| previousUpdateID | <code>Number</code> | The previous update ID received  from the server |
| newUpdateID | <code>Number</code> | The new update ID to set after a  successful write |

<a name="MyButtercupClient+_handleRequestFailure"></a>

### myButtercupClient.\_handleRequestFailure(err) ⇒ <code>Promise</code>
Handle a request failure (processes token expiration etc.)

**Kind**: instance method of [<code>MyButtercupClient</code>](#MyButtercupClient)  
**Returns**: <code>Promise</code> - Returns a promise if an action can be taken
 to remedy the situation  
**Throws**:

- <code>Error</code> Throws if the error was not catchable

**Access**: protected  

| Param | Type | Description |
| --- | --- | --- |
| err | <code>Error</code> | The received error from making a request |

<a name="MyButtercupClient+_performTokenRefresh"></a>

### myButtercupClient.\_performTokenRefresh() ⇒ <code>Promise</code>
Refresh tokens

**Kind**: instance method of [<code>MyButtercupClient</code>](#MyButtercupClient)  
**Emits**: [<code>tokensUpdated</code>](#MyButtercupClient+event_tokensUpdated)  
**Access**: protected  
<a name="MyButtercupClient+event_tokensUpdated"></a>

### "tokensUpdated"
On tokens updated

**Kind**: event emitted by [<code>MyButtercupClient</code>](#MyButtercupClient)  
<a name="MyButtercupClient.exchangeAuthCodeForTokens"></a>

### MyButtercupClient.exchangeAuthCodeForTokens(authCode, clientID, clientSecret, redirectURI) ⇒ [<code>MyButtercupTokenResult</code>](#MyButtercupTokenResult)
Exchange an auth code for tokens

**Kind**: static method of [<code>MyButtercupClient</code>](#MyButtercupClient)  

| Param | Type | Description |
| --- | --- | --- |
| authCode | <code>String</code> | OAuth2 auth code, retrieved from browser-  based OAuth2 flow using a user's username and password |
| clientID | <code>String</code> | The OAuth2 client ID |
| clientSecret | <code>String</code> | The OAuth2 client secret |
| redirectURI | <code>String</code> | The OAuth2 client redirect URI |

<a name="MyButtercupClient.generateAuthorisationURL"></a>

### MyButtercupClient.generateAuthorisationURL(clientID) ⇒ <code>String</code>
Generate an OAuth2 authorisation URL using the client ID of the current
application platform (eg. Buttercup browser extension)

**Kind**: static method of [<code>MyButtercupClient</code>](#MyButtercupClient)  
**Returns**: <code>String</code> - The generated URL  

| Param | Type | Description |
| --- | --- | --- |
| clientID | <code>String</code> | The OAuth2 client ID registered on  my.buttercup.pw |

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
    * [.channel](#Workspace+channel) : <code>Channel</code>
    * [.shares](#Workspace+shares) : <code>Array.&lt;Share&gt;</code>
    * [.localDiffersFromRemote()](#Workspace+localDiffersFromRemote) ⇒ <code>Promise.&lt;Boolean&gt;</code>
    * [.mergeFromRemote()](#Workspace+mergeFromRemote) ⇒ [<code>Promise.&lt;Archive&gt;</code>](#Archive)
    * [.save()](#Workspace+save) ⇒ <code>Promise</code>
    * [.setArchive(archive, datasource, masterCredentials)](#Workspace+setArchive)
    * [.update()](#Workspace+update) ⇒ <code>Promise</code>
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
<a name="Workspace+channel"></a>

### workspace.channel : <code>Channel</code>
The saving/updating channel for queuing workspace async actions

**Kind**: instance property of [<code>Workspace</code>](#Workspace)  
<a name="Workspace+shares"></a>

### workspace.shares : <code>Array.&lt;Share&gt;</code>
Current workspace share instances

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

<a name="Workspace+update"></a>

### workspace.update() ⇒ <code>Promise</code>
Update the archive

**Kind**: instance method of [<code>Workspace</code>](#Workspace)  
**Returns**: <code>Promise</code> - A promise that resolves once the update has
 completed  
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

<a name="flattenEntries"></a>

## flattenEntries(archives) ⇒ [<code>Array.&lt;EntrySearchInfo&gt;</code>](#EntrySearchInfo)
Flatten entries into a searchable structure

**Kind**: global function  
**Returns**: [<code>Array.&lt;EntrySearchInfo&gt;</code>](#EntrySearchInfo) - An array of searchable objects  

| Param | Type | Description |
| --- | --- | --- |
| archives | [<code>Array.&lt;Archive&gt;</code>](#Archive) | An array of archives |

<a name="generateNewUpdateID"></a>

## generateNewUpdateID() ⇒ <code>Number</code>
Generate a new update ID

**Kind**: global function  
**Returns**: <code>Number</code> - A randomly generated ID  
<a name="extractCommandComponents"></a>

## extractCommandComponents(command) ⇒ <code>Array.&lt;String&gt;</code>
Extract command components from a string

**Kind**: global function  
**Returns**: <code>Array.&lt;String&gt;</code> - The separated parts  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>String</code> | The command to extract from |

<a name="calculateCommonRecentCommand"></a>

## calculateCommonRecentCommand(historyA, historyB) ⇒ <code>null</code> \| <code>Object</code>
Calculate the common command indexes between 2 histories.
The common index is where a padding ID matches that of the other history,
at some point. If we assume one history may have been flattened, we cannot
assume that the entire past history will be the same, but
we can assume that at that point, the histories produce the same structure.
Because the histories may be different in the future, we use the newest
matching pad ID to create a common link between the 2 histories.

**Kind**: global function  
**Returns**: <code>null</code> \| <code>Object</code> - Returns
       null if no common point, or an object with the common information. `a` and `b`
       are the indexes where the common padding occurs.  

| Param | Type | Description |
| --- | --- | --- |
| historyA | <code>Array.&lt;String&gt;</code> | The original history |
| historyB | <code>Array.&lt;String&gt;</code> | The secondary history |

<a name="calculateHistoryDifferences"></a>

## calculateHistoryDifferences() ⇒ <code>Object</code> \| <code>Boolean</code>
Calculate the differences, in commands, between two histories

**Kind**: global function  
**Returns**: <code>Object</code> \| <code>Boolean</code> - Returns false if no common base
       is found, or the command differences as two arrays  
<a name="dedupe"></a>

## dedupe(arr) ⇒ <code>Array</code>
De-dupe an array

**Kind**: global function  
**Returns**: <code>Array</code> - The de-duped array  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | The array |

<a name="describeArchiveDataset"></a>

## describeArchiveDataset(dataset, parentGroupID) ⇒ <code>Array.&lt;String&gt;</code>
Describe an archive dataset - to history commands

**Kind**: global function  
**Returns**: <code>Array.&lt;String&gt;</code> - An array of commands  

| Param | Type | Description |
| --- | --- | --- |
| dataset | <code>Object</code> | The archive dataset |
| parentGroupID | <code>String</code> | The ID of the parent group |

<a name="decodeStringValue"></a>

## decodeStringValue(value) ⇒ <code>String</code>
Decode an encoded property/meta value

**Kind**: global function  
**Returns**: <code>String</code> - The decoded value  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> | The encoded value |

<a name="encodeStringValue"></a>

## encodeStringValue(value) ⇒ <code>String</code>
Encode a raw value into safe storage form
Uses base64 for encoding

**Kind**: global function  
**Returns**: <code>String</code> - The encoded result  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> | The raw value to encode |

<a name="getUniqueID"></a>

## getUniqueID() ⇒ <code>String</code>
Get a unique identifier (UUID v4)

**Kind**: global function  
**Returns**: <code>String</code> - A unique identifier  
<a name="isEncoded"></a>

## isEncoded(text) ⇒ <code>Boolean</code>
Check if a string value is encoded

**Kind**: global function  
**Returns**: <code>Boolean</code> - True if the text is encoded  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | The value to check |

<a name="getEntryURLs"></a>

## getEntryURLs(properties, preference)
Get URLs from an entry's properties
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

<a name="stripDestructiveCommands"></a>

## stripDestructiveCommands(history) ⇒ <code>Array.&lt;String&gt;</code>
Strip destructive commands from a history collection

**Kind**: global function  
**Returns**: <code>Array.&lt;String&gt;</code> - The history minus any destructive commands  

| Param | Type | Description |
| --- | --- | --- |
| history | <code>Array.&lt;String&gt;</code> | The history |

<a name="findGroupContainingEntryID"></a>

## findGroupContainingEntryID(groups, id) ⇒ [<code>FoundGroupResult</code>](#FoundGroupResult)
Find a raw group that contains an entry with an ID

**Kind**: global function  
**Returns**: [<code>FoundGroupResult</code>](#FoundGroupResult) - The parent group of the found entry  

| Param | Type | Description |
| --- | --- | --- |
| groups | <code>Array.&lt;Object&gt;</code> | An array of raw groups |
| id | <code>String</code> | The entry ID to search for |

<a name="findGroupContainingGroupID"></a>

## findGroupContainingGroupID(group, id) ⇒ [<code>FoundGroupResult</code>](#FoundGroupResult)
Find a raw group that contains a group with an ID

**Kind**: global function  
**Returns**: [<code>FoundGroupResult</code>](#FoundGroupResult) - The parent of the located group ID  

| Param | Type | Description |
| --- | --- | --- |
| group | <code>Object</code> | The group/archive to search in |
| id | <code>String</code> | The group ID to search for |

<a name="extractSharesFromHistory"></a>

## extractSharesFromHistory(history) ⇒ <code>Object</code>
Extract shares from a history collection

**Kind**: global function  
**Returns**: <code>Object</code> - The resulting separated histories. The object will
 always contain a `base` property containing the non-share history.
 Each share detected is set on the object under its share ID - being
 set to an array of history lines (non-prefixed) for that share.  

| Param | Type | Description |
| --- | --- | --- |
| history | <code>Array.&lt;String&gt;</code> | A history collection, containing shares |

<a name="moveGroupBetweenArchives"></a>

## moveGroupBetweenArchives(movingGroup, target)
Move a group between archives

**Kind**: global function  
**Throws**:

- <code>Error</code> Throws if the remote type is not recognised


| Param | Type | Description |
| --- | --- | --- |
| movingGroup | [<code>Group</code>](#Group) | The group to move |
| target | [<code>Group</code>](#Group) \| [<code>Archive</code>](#Archive) | The group to move to |

<a name="prependSharePrefix"></a>

## prependSharePrefix(history) ⇒ <code>Array.&lt;String&gt;</code>
Prepend the share prefix to every line that doesn't have it

**Kind**: global function  
**Returns**: <code>Array.&lt;String&gt;</code> - Prefixed history lines  

| Param | Type | Description |
| --- | --- | --- |
| history | <code>Array.&lt;String&gt;</code> | Array of history lines |

<a name="removeSharePrefix"></a>

## removeSharePrefix(history) ⇒ <code>Array.&lt;String&gt;</code>
Remove the share prefix to every line that has it

**Kind**: global function  
**Returns**: <code>Array.&lt;String&gt;</code> - Non-prefixed history lines  

| Param | Type | Description |
| --- | --- | --- |
| history | <code>Array.&lt;String&gt;</code> | Array of history lines |

<a name="generateUUID"></a>

## generateUUID() ⇒ <code>String</code>
Generate a UUID (v4)

**Kind**: global function  
**Returns**: <code>String</code> - The new UUID  
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

<a name="ArchiveSourceOptions"></a>

## ArchiveSourceOptions : <code>Object</code>
New source options

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [id] | <code>String</code> | Override source ID generation |
| [type] | <code>String</code> | Specify the source type |
| [meta] | <code>Object</code> | Optional additional meta data (stored unencrypted) |

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

<a name="EntryHistoryItem"></a>

## EntryHistoryItem : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | The type of history item |
| [origin] | <code>String</code> | The origin group ID for a moved-entry |
| [destination] | <code>String</code> | The destination group ID for a moved-entry |
| [property] | <code>String</code> | The property/attribute name of the change |
| [value] | <code>String</code> | The value that was changed (resulting) |

<a name="EntrySearchInfo"></a>

## EntrySearchInfo : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| entry | [<code>Entry</code>](#Entry) | The entry |
| archive | [<code>Archive</code>](#Archive) | The associated archive |

<a name="MyButtercupShareBase"></a>

## MyButtercupShareBase : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The share ID |
| title | <code>String</code> | The share title |
| perm_read | <code>Boolean</code> | Permission to read |
| perm_write | <code>Boolean</code> | Permission to write changes |
| perm_manage | <code>Boolean</code> | Permission to share with others, remove share access etc. |

<a name="MyButtercupIncomingShare"></a>

## MyButtercupIncomingShare : [<code>MyButtercupShareBase</code>](#MyButtercupShareBase)
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| share_password_enc | <code>String</code> | Encrypted password for the share |
| sharing_user_id | <code>Number</code> | The user that shared the item |
| sharing_user_key | <code>String</code> | The public key of the user for the share (used  for decrypting the share password) |

<a name="MyButtercupEncryptedShare"></a>

## MyButtercupEncryptedShare : [<code>MyButtercupShareBase</code>](#MyButtercupShareBase)
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| content | <code>String</code> | Encrypted share content |

<a name="MyButtercupOrganisation"></a>

## MyButtercupOrganisation : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>Number</code> | The organisation's ID |
| name | <code>String</code> | The organisation name |
| created | <code>String</code> | The creation date |

<a name="MyButtercupDigest"></a>

## MyButtercupDigest : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| archive_id | <code>Number</code> | The ID of the user's archive |
| public_key | <code>String</code> | The RSA public key for the user |
| messages | <code>Array.&lt;Object&gt;</code> | System messages for the user (internal processing) |
| new_shares | [<code>Array.&lt;MyButtercupIncomingShare&gt;</code>](#MyButtercupIncomingShare) | An array of new shares to process |
| organisations | [<code>Array.&lt;MyButtercupOrganisation&gt;</code>](#MyButtercupOrganisation) | An array of user organisations |

<a name="MyButtercupUsersListItem"></a>

## MyButtercupUsersListItem : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| user_id | <code>Number</code> | The ID of the user |
| organisation_id | <code>Number</code> | The organisation ID the user was found in |
| name | <code>String</code> | The name of the user |
| public_key | <code>String</code> | The public key for the user |

<a name="MyButtercupTokenResult"></a>

## MyButtercupTokenResult : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| accessToken | <code>String</code> | An OAuth2 access token for API requests |
| refreshToken | <code>String</code> | An OAuth2 refresh token |

<a name="MyButtercupArchiveDetails"></a>

## MyButtercupArchiveDetails : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>Number</code> | The remote vault ID |
| updateID | <code>Number</code> | The current update ID for the vault |
| created | <code>String</code> | The creation date |
| lastUpdate | <code>String</code> | The last update date |

<a name="FoundGroupResult"></a>

## FoundGroupResult : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| group | <code>Object</code> | The found group dataset |
| index | <code>Number</code> | The index the group was located at |

