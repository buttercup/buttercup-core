## Classes
<dl>
<dt><a href="#Archive">Archive</a></dt>
<dd></dd>
<dt><a href="#Westley">Westley</a></dt>
<dd></dd>
</dl>
<a name="Archive"></a>
## Archive
**Kind**: global class  

* [Archive](#Archive)
  * [new Archive()](#new_Archive_new)
  * [.createGroup([title])](#Archive+createGroup) ⇒ <code>ManagedGroup</code>
  * [.getGroups()](#Archive+getGroups) ⇒ <code>Array.&lt;ManagedGroups&gt;</code>
  * [._getWestley()](#Archive+_getWestley) ⇒ <code>[Westley](#Westley)</code>

<a name="new_Archive_new"></a>
### new Archive()
The base Buttercup Archive class

<a name="Archive+createGroup"></a>
### archive.createGroup([title]) ⇒ <code>ManagedGroup</code>
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
<a name="Westley"></a>
## Westley
**Kind**: global class  

* [Westley](#Westley)
  * [new Westley()](#new_Westley_new)
  * [.clear()](#Westley+clear) ⇒ <code>[Westley](#Westley)</code>
  * [.execute(command)](#Westley+execute)
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
### westley.execute(command)
Execute a command - stored in history and modifies the dataset

**Kind**: instance method of <code>[Westley](#Westley)</code>  

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
