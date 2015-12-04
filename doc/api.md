## Modules
<dl>
<dt><a href="#module_command">command</a></dt>
<dd><p>Command related tools</p>
</dd>
</dl>
## Classes
<dl>
<dt><a href="#Archive">Archive</a></dt>
<dd></dd>
<dt><a href="#ManagedEntry">ManagedEntry</a></dt>
<dd></dd>
<dt><a href="#ManagedGroup">ManagedGroup</a></dt>
<dd></dd>
<dt><a href="#Westley">Westley</a></dt>
<dd></dd>
</dl>
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

<a name="Archive"></a>
## Archive
**Kind**: global class  

* [Archive](#Archive)
  * [new Archive()](#new_Archive_new)
  * [.createGroup([title])](#Archive+createGroup) ⇒ <code>[ManagedGroup](#ManagedGroup)</code>
  * [.getGroups()](#Archive+getGroups) ⇒ <code>Array.&lt;ManagedGroups&gt;</code>
  * [._getWestley()](#Archive+_getWestley) ⇒ <code>[Westley](#Westley)</code>

<a name="new_Archive_new"></a>
### new Archive()
The base Buttercup Archive class

<a name="Archive+createGroup"></a>
### archive.createGroup([title]) ⇒ <code>[ManagedGroup](#ManagedGroup)</code>
Create a new group

**Kind**: instance method of <code>[Archive](#Archive)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [title] | <code>String</code> | The title for the group |

<a name="Archive+getGroups"></a>
### archive.getGroups() ⇒ <code>Array.&lt;ManagedGroups&gt;</code>
Get all groups (root) in the archive

**Kind**: instance method of <code>[Archive](#Archive)</code>  
**Returns**: <code>Array.&lt;ManagedGroups&gt;</code> - An array of ManagedGroups  
<a name="Archive+_getWestley"></a>
### archive._getWestley() ⇒ <code>[Westley](#Westley)</code>
Get the underlying Westley instance

**Kind**: instance method of <code>[Archive](#Archive)</code>  
**Access:** protected  
<a name="ManagedEntry"></a>
## ManagedEntry
**Kind**: global class  

* [ManagedEntry](#ManagedEntry)
  * [new ManagedEntry(westley, remoteObj)](#new_ManagedEntry_new)
  * [.delete()](#ManagedEntry+delete)
  * [.deleteMeta(property)](#ManagedEntry+deleteMeta) ⇒ <code>[ManagedEntry](#ManagedEntry)</code>
  * [.getID()](#ManagedEntry+getID) ⇒ <code>String</code>
  * [.toObject()](#ManagedEntry+toObject) ⇒ <code>Object</code>

<a name="new_ManagedEntry_new"></a>
### new ManagedEntry(westley, remoteObj)
Managed entry class


| Param | Type | Description |
| --- | --- | --- |
| westley | <code>[Westley](#Westley)</code> | The Westley instance |
| remoteObj | <code>Object</code> | The remote object reference |

<a name="ManagedEntry+delete"></a>
### managedEntry.delete()
Delete the entry - removes from the archive

**Kind**: instance method of <code>[ManagedEntry](#ManagedEntry)</code>  
<a name="ManagedEntry+deleteMeta"></a>
### managedEntry.deleteMeta(property) ⇒ <code>[ManagedEntry](#ManagedEntry)</code>
Delete a meta item

**Kind**: instance method of <code>[ManagedEntry](#ManagedEntry)</code>  
**Throws**:

- <code>Error</code> Throws if property doesn't exist, or cannot be deleted


| Param | Type | Description |
| --- | --- | --- |
| property | <code>String</code> | The property name |

<a name="ManagedEntry+getID"></a>
### managedEntry.getID() ⇒ <code>String</code>
Get the entry ID

**Kind**: instance method of <code>[ManagedEntry](#ManagedEntry)</code>  
<a name="ManagedEntry+toObject"></a>
### managedEntry.toObject() ⇒ <code>Object</code>
Export entry to object

**Kind**: instance method of <code>[ManagedEntry](#ManagedEntry)</code>  
<a name="ManagedGroup"></a>
## ManagedGroup
**Kind**: global class  

* [ManagedGroup](#ManagedGroup)
  * [new ManagedGroup(westley, remoteObj)](#new_ManagedGroup_new)
  * [.toObject()](#ManagedGroup+toObject) ⇒ <code>Object</code>

<a name="new_ManagedGroup_new"></a>
### new ManagedGroup(westley, remoteObj)
Managed group class


| Param | Type | Description |
| --- | --- | --- |
| westley | <code>[Westley](#Westley)</code> | The Westley instance |
| remoteObj | <code>Object</code> | The remote object reference |

<a name="ManagedGroup+toObject"></a>
### managedGroup.toObject() ⇒ <code>Object</code>
Export group to object

**Kind**: instance method of <code>[ManagedGroup](#ManagedGroup)</code>  
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
