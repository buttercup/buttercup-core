## Modules

<dl>
<dt><a href="#module_Descriptor">Descriptor</a> ⇒ <code>Array</code></dt>
<dd><p>Describe an archive dataset - to history commands</p>
</dd>
<dt><a href="#module_command">command</a></dt>
<dd><p>Command related tools</p>
</dd>
<dt><a href="#module_design">design</a></dt>
<dd><p>Design related tools</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#Archive">Archive</a></dt>
<dd></dd>
<dt><a href="#Comparator">Comparator</a></dt>
<dd></dd>
<dt><a href="#Flattener">Flattener</a></dt>
<dd></dd>
<dt><a href="#ManagedEntry">ManagedEntry</a></dt>
<dd></dd>
<dt><a href="#ManagedGroup">ManagedGroup</a></dt>
<dd></dd>
<dt><a href="#OwnCloudDatasource">OwnCloudDatasource</a></dt>
<dd></dd>
<dt><a href="#Westley">Westley</a></dt>
<dd></dd>
<dt><a href="#Workspace">Workspace</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
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

<a name="module_design"></a>
## design
Design related tools

<a name="Archive"></a>
## Archive
**Kind**: global class  

* [Archive](#Archive)
    * [new Archive()](#new_Archive_new)
    * _instance_
        * [.createGroup([title])](#Archive+createGroup) ⇒ <code>[ManagedGroup](#ManagedGroup)</code>
        * [.getGroups()](#Archive+getGroups) ⇒ <code>Array.&lt;ManagedGroups&gt;</code>
        * [.getTrashGroup()](#Archive+getTrashGroup) ⇒ <code>[ManagedGroup](#ManagedGroup)</code> &#124; <code>null</code>
        * [.optimise()](#Archive+optimise)
        * [._getWestley()](#Archive+_getWestley) ⇒ <code>[Westley](#Westley)</code>
    * _static_
        * [.createWithDefaults()](#Archive.createWithDefaults) ⇒ <code>[Archive](#Archive)</code>

<a name="new_Archive_new"></a>
### new Archive()
The base Buttercup Archive class

<a name="Archive+createGroup"></a>
### archive.createGroup([title]) ⇒ <code>[ManagedGroup](#ManagedGroup)</code>
Create a new group

**Kind**: instance method of <code>[Archive](#Archive)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [title] | <code>string</code> | The title for the group |

<a name="Archive+getGroups"></a>
### archive.getGroups() ⇒ <code>Array.&lt;ManagedGroups&gt;</code>
Get all groups (root) in the archive

**Kind**: instance method of <code>[Archive](#Archive)</code>  
**Returns**: <code>Array.&lt;ManagedGroups&gt;</code> - An array of ManagedGroups  
<a name="Archive+getTrashGroup"></a>
### archive.getTrashGroup() ⇒ <code>[ManagedGroup](#ManagedGroup)</code> &#124; <code>null</code>
Get the trash group

**Kind**: instance method of <code>[Archive](#Archive)</code>  
<a name="Archive+optimise"></a>
### archive.optimise()
Perform archive optimisations

**Kind**: instance method of <code>[Archive](#Archive)</code>  
<a name="Archive+_getWestley"></a>
### archive._getWestley() ⇒ <code>[Westley](#Westley)</code>
Get the underlying Westley instance

**Kind**: instance method of <code>[Archive](#Archive)</code>  
**Access:** protected  
<a name="Archive.createWithDefaults"></a>
### Archive.createWithDefaults() ⇒ <code>[Archive](#Archive)</code>
Create an Archive with the default template

**Kind**: static method of <code>[Archive](#Archive)</code>  
**Returns**: <code>[Archive](#Archive)</code> - The new archive  
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
| originalArchive | <code>[Archive](#Archive)</code> | 
| secondaryArchive | <code>[Archive](#Archive)</code> | 

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
<a name="Flattener"></a>
## Flattener
**Kind**: global class  
<a name="new_Flattener_new"></a>
### new Flattener(westley)
Flatten archives


| Param | Type |
| --- | --- |
| westley | <code>[Westley](#Westley)</code> | 

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
    * _static_
        * [.createNew(archive, groupID)](#ManagedEntry.createNew) ⇒ <code>[ManagedEntry](#ManagedEntry)</code>

<a name="new_ManagedEntry_new"></a>
### new ManagedEntry(archive, remoteObj)
Managed entry class


| Param | Type | Description |
| --- | --- | --- |
| archive | <code>[Archive](#Archive)</code> | The main archive instance |
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
<a name="ManagedEntry.createNew"></a>
### ManagedEntry.createNew(archive, groupID) ⇒ <code>[ManagedEntry](#ManagedEntry)</code>
Create a new entry

**Kind**: static method of <code>[ManagedEntry](#ManagedEntry)</code>  

| Param | Type | Description |
| --- | --- | --- |
| archive | <code>[Archive](#Archive)</code> | The archive |
| groupID | <code>string</code> | The ID of the target group |

<a name="ManagedGroup"></a>
## ManagedGroup
**Kind**: global class  

* [ManagedGroup](#ManagedGroup)
    * [new ManagedGroup(archive, remoteObj)](#new_ManagedGroup_new)
    * _instance_
        * [.createEntry([title])](#ManagedGroup+createEntry) ⇒ <code>[ManagedEntry](#ManagedEntry)</code>
        * [.createGroup([title])](#ManagedGroup+createGroup) ⇒ <code>[ManagedGroup](#ManagedGroup)</code>
        * [.delete()](#ManagedGroup+delete)
        * [.deleteAttribute(attr)](#ManagedGroup+deleteAttribute) ⇒ <code>[ManagedGroup](#ManagedGroup)</code>
        * [.getAttribute(attributeName)](#ManagedGroup+getAttribute) ⇒ <code>string</code> &#124; <code>undefined</code>
        * [.getEntries()](#ManagedGroup+getEntries) ⇒ <code>[Array.&lt;ManagedEntry&gt;](#ManagedEntry)</code>
        * [.getGroups()](#ManagedGroup+getGroups) ⇒ <code>[Array.&lt;ManagedGroup&gt;](#ManagedGroup)</code>
        * [.getID()](#ManagedGroup+getID) ⇒ <code>string</code>
        * [.getTitle()](#ManagedGroup+getTitle) ⇒ <code>string</code>
        * [.isTrash()](#ManagedGroup+isTrash) ⇒ <code>boolean</code>
        * [.moveToGroup(group)](#ManagedGroup+moveToGroup) ⇒ <code>[ManagedGroup](#ManagedGroup)</code>
        * [.setAttribute(attributeName, value)](#ManagedGroup+setAttribute) ⇒ <code>[ManagedGroup](#ManagedGroup)</code>
        * [.toObject()](#ManagedGroup+toObject) ⇒ <code>Object</code>
        * [._getArchive()](#ManagedGroup+_getArchive) ⇒ <code>[Archive](#Archive)</code>
        * [._getRemoteObject()](#ManagedGroup+_getRemoteObject) ⇒ <code>Object</code>
        * [._getWestley()](#ManagedGroup+_getWestley) ⇒ <code>[Westley](#Westley)</code>
    * _static_
        * [.createNew(archive, [parentID])](#ManagedGroup.createNew) ⇒ <code>[ManagedGroup](#ManagedGroup)</code>

<a name="new_ManagedGroup_new"></a>
### new ManagedGroup(archive, remoteObj)
Managed group class


| Param | Type | Description |
| --- | --- | --- |
| archive | <code>[Archive](#Archive)</code> | The archive instance |
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
### managedGroup.delete()
Delete the group

**Kind**: instance method of <code>[ManagedGroup](#ManagedGroup)</code>  
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
<a name="ManagedGroup+getGroups"></a>
### managedGroup.getGroups() ⇒ <code>[Array.&lt;ManagedGroup&gt;](#ManagedGroup)</code>
Get the groups within the group

**Kind**: instance method of <code>[ManagedGroup](#ManagedGroup)</code>  
<a name="ManagedGroup+getID"></a>
### managedGroup.getID() ⇒ <code>string</code>
Get the group ID

**Kind**: instance method of <code>[ManagedGroup](#ManagedGroup)</code>  
<a name="ManagedGroup+getTitle"></a>
### managedGroup.getTitle() ⇒ <code>string</code>
Get the group title

**Kind**: instance method of <code>[ManagedGroup](#ManagedGroup)</code>  
<a name="ManagedGroup+isTrash"></a>
### managedGroup.isTrash() ⇒ <code>boolean</code>
Check if the current group is used for trash

**Kind**: instance method of <code>[ManagedGroup](#ManagedGroup)</code>  
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

<a name="ManagedGroup+toObject"></a>
### managedGroup.toObject() ⇒ <code>Object</code>
Export group to object

**Kind**: instance method of <code>[ManagedGroup](#ManagedGroup)</code>  
<a name="ManagedGroup+_getArchive"></a>
### managedGroup._getArchive() ⇒ <code>[Archive](#Archive)</code>
Get the archive instance reference

**Kind**: instance method of <code>[ManagedGroup](#ManagedGroup)</code>  
**Access:** protected  
<a name="ManagedGroup+_getRemoteObject"></a>
### managedGroup._getRemoteObject() ⇒ <code>Object</code>
Get the remotely-managed object (group)

**Kind**: instance method of <code>[ManagedGroup](#ManagedGroup)</code>  
**Access:** protected  
<a name="ManagedGroup+_getWestley"></a>
### managedGroup._getWestley() ⇒ <code>[Westley](#Westley)</code>
Get the delta managing instance for the archive

**Kind**: instance method of <code>[ManagedGroup](#ManagedGroup)</code>  
**Access:** protected  
<a name="ManagedGroup.createNew"></a>
### ManagedGroup.createNew(archive, [parentID]) ⇒ <code>[ManagedGroup](#ManagedGroup)</code>
Create a new ManagedGroup with a delta-manager and parent group ID

**Kind**: static method of <code>[ManagedGroup](#ManagedGroup)</code>  
**Returns**: <code>[ManagedGroup](#ManagedGroup)</code> - A new group  

| Param | Type | Description |
| --- | --- | --- |
| archive | <code>[Archive](#Archive)</code> |  |
| [parentID] | <code>string</code> | The parent group ID (default is root) |

<a name="OwnCloudDatasource"></a>
## OwnCloudDatasource
**Kind**: global class  
<a name="new_OwnCloudDatasource_new"></a>
### new OwnCloudDatasource(owncloudURL, path, username, password)
Datasource for Owncloud connections


| Param | Type | Description |
| --- | --- | --- |
| owncloudURL | <code>String</code> | The URL to the owncloud instance, without "remote.php/webdav" etc. |
| path | <code>String</code> | The file path |
| username | <code>String</code> | The username for owncloud |
| password | <code>String</code> | The password for owncloud |

<a name="Westley"></a>
## Westley
**Kind**: global class  

* [Westley](#Westley)
    * [new Westley()](#new_Westley_new)
    * [.clear()](#Westley+clear) ⇒ <code>[Westley](#Westley)</code>
    * [.execute(command)](#Westley+execute) ⇒ <code>[Westley](#Westley)</code>
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
    * [.getArchive()](#Workspace+getArchive) ⇒ <code>[Archive](#Archive)</code>
    * [.getDatasource()](#Workspace+getDatasource) ⇒ <code>Object</code>
    * [.getPassword()](#Workspace+getPassword) ⇒ <code>String</code>
    * [.mergeFromDatasource()](#Workspace+mergeFromDatasource) ⇒ <code>Promise</code>
    * [.save()](#Workspace+save) ⇒ <code>[Workspace](#Workspace)</code>
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
### workspace.getArchive() ⇒ <code>[Archive](#Archive)</code>
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
### workspace.save() ⇒ <code>[Workspace](#Workspace)</code>
Save the archive to the datasource

**Kind**: instance method of <code>[Workspace](#Workspace)</code>  
**Returns**: <code>[Workspace](#Workspace)</code> - Self  
<a name="Workspace+setArchive"></a>
### workspace.setArchive(archive) ⇒ <code>[Workspace](#Workspace)</code>
Set the archive instance

**Kind**: instance method of <code>[Workspace](#Workspace)</code>  
**Returns**: <code>[Workspace](#Workspace)</code> - Self  

| Param | Type |
| --- | --- |
| archive | <code>[Archive](#Archive)</code> | 

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

<a name="DisplayInfo"></a>
## DisplayInfo
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| title | <code>string</code> | The text to replace "title" |
| username | <code>string</code> | The text to replace "username" |
| password | <code>string</code> | The text to replace "password" |

