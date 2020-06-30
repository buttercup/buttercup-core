## Modules

<dl>
<dt><a href="#module_Buttercup">Buttercup</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#VaultComparator">VaultComparator</a></dt>
<dd><p>Vault comparison class</p>
</dd>
<dt><a href="#VaultItem">VaultItem</a></dt>
<dd><p>Base vault member class (for Entry, Group etc.)</p>
</dd>
<dt><a href="#Flattener">Flattener</a></dt>
<dd><p>Flattener class for flattening archive history sets</p>
</dd>
<dt><a href="#EntryFinder">EntryFinder</a></dt>
<dd><p>Entry searching class</p>
</dd>
<dt><a href="#LocalStorageInterface">LocalStorageInterface</a> ⇐ <code>StorageInterface</code></dt>
<dd><p>Interface for localStorage</p>
</dd>
</dl>

## Functions

<dl>
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
<dt><a href="#createAppEnv">createAppEnv()</a> ⇒ <code><a href="#AppEnv">AppEnv</a></code></dt>
<dd><p>Create a new application environment</p>
</dd>
<dt><a href="#compress">compress(text)</a> ⇒ <code>String</code></dt>
<dd><p>Compress text using GZIP</p>
</dd>
<dt><a href="#decompress">decompress(text)</a> ⇒ <code>String</code></dt>
<dd><p>Decompress a compressed string (GZIP)</p>
</dd>
<dt><a href="#compress">compress(text)</a> ⇒ <code>String</code></dt>
<dd><p>Compress text using GZIP</p>
</dd>
<dt><a href="#decompress">decompress(text)</a> ⇒ <code>String</code></dt>
<dd><p>Decompress a compressed string (GZIP)</p>
</dd>
<dt><del><a href="#hashVaultFacade">hashVaultFacade(vaultFacade)</a> ⇒ <code>String</code></del></dt>
<dd><p>Generate a hash of a vault facade (useful for detecting
 if the vault differs from another copy)</p>
</dd>
<dt><del><a href="#getEntryValue">getEntryValue(entry, propertyType, name)</a> ⇒ <code>String</code></del></dt>
<dd><p>Get a value on an entry for a specific property type</p>
</dd>
<dt><a href="#getEntryValueType">getEntryValueType(entry, propertyName)</a> ⇒ <code>String</code></dt>
<dd><p>Get the entry value type</p>
</dd>
<dt><a href="#idSignifiesNew">idSignifiesNew(id)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Check if an ID signifies a new instance and not an
 existing one</p>
</dd>
<dt><a href="#setEntryValueType">setEntryValueType(entry, propertyName, valueType)</a></dt>
<dd><p>Set the value type attribute of an entry</p>
</dd>
<dt><a href="#getEntriesFacades">getEntriesFacades(vault)</a> ⇒ <code><a href="#EntryFacade">Array.&lt;EntryFacade&gt;</a></code></dt>
<dd><p>Get all entry facades for a vault</p>
</dd>
<dt><a href="#getGroupEntriesFacades">getGroupEntriesFacades(entryCollection, groupID)</a> ⇒ <code><a href="#EntryFacade">Array.&lt;EntryFacade&gt;</a></code></dt>
<dd><p>Convert an array of entries into an array of facades</p>
</dd>
<dt><a href="#getGroupsFacades">getGroupsFacades(groupCollection, [parentID])</a> ⇒ <code><a href="#GroupFacade">Array.&lt;GroupFacade&gt;</a></code></dt>
<dd><p>Convert an array of groups into an array of facades</p>
</dd>
<dt><a href="#describeVaultDataset">describeVaultDataset(dataset, parentGroupID)</a> ⇒ <code>Array.&lt;String&gt;</code></dt>
<dd><p>Describe a vault dataset - to history commands</p>
</dd>
<dt><a href="#getFormat">getFormat()</a> ⇒ <code>String</code></dt>
<dd><p>Get the current format</p>
</dd>
<dt><a href="#getSignature">getSignature()</a> ⇒ <code>String</code></dt>
<dd><p>Get the current signature</p>
</dd>
<dt><a href="#hasValidSignature">hasValidSignature(text)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Detect if a string has a valid signature</p>
</dd>
<dt><a href="#sign">sign(text)</a> ⇒ <code>String</code></dt>
<dd><p>Sign some text</p>
</dd>
<dt><a href="#stripSignature">stripSignature(text)</a> ⇒ <code>String</code></dt>
<dd><p>Strip the signature from some text</p>
</dd>
<dt><a href="#vaultContentsEncrypted">vaultContentsEncrypted(contents)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Check if vault contents are in encrypted form</p>
</dd>
<dt><a href="#extractCommandComponents">extractCommandComponents(command)</a> ⇒ <code>Array.&lt;String&gt;</code></dt>
<dd><p>Extract command components from a string</p>
</dd>
<dt><a href="#generateEntryHistoryItem">generateEntryHistoryItem(property, propertyType, originalValue, newValue)</a> ⇒ <code><a href="#EntryHistoryItem">EntryHistoryItem</a></code></dt>
<dd><p>Generate a new entry history item</p>
</dd>
<dt><a href="#stripDestructiveCommands">stripDestructiveCommands(history)</a> ⇒ <code>Array.&lt;String&gt;</code></dt>
<dd><p>Strip destructive commands from a history collection</p>
</dd>
<dt><a href="#generateNewUpdateID">generateNewUpdateID()</a> ⇒ <code>Number</code></dt>
<dd><p>Generate a new update ID</p>
</dd>
<dt><a href="#findEntriesByCheck">findEntriesByCheck(groups, compareFn)</a> ⇒ <code>Array.&lt;Entry&gt;</code></dt>
<dd><p>Find entry instances by filtering with a compare function</p>
</dd>
<dt><a href="#flattenEntries">flattenEntries(archives)</a> ⇒ <code><a href="#EntrySearchInfo">Array.&lt;EntrySearchInfo&gt;</a></code></dt>
<dd><p>Flatten entries into a searchable structure</p>
</dd>
<dt><a href="#findGroupsByCheck">findGroupsByCheck(groups, compareFn)</a> ⇒ <code>Array.&lt;Group&gt;</code></dt>
<dd><p>Find group instances within groups that satisfy some check</p>
</dd>
<dt><a href="#decodeStringValue">decodeStringValue(value)</a> ⇒ <code>String</code></dt>
<dd><p>Decode an encoded property value</p>
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
<dt><a href="#isValidProperty">isValidProperty(name)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Check if a property name is valid</p>
</dd>
<dt><a href="#findGroupContainingEntryID">findGroupContainingEntryID(groups, id)</a> ⇒ <code><a href="#FoundGroupResult">FoundGroupResult</a></code></dt>
<dd><p>Find a raw group that contains an entry with an ID</p>
</dd>
<dt><a href="#findGroupContainingGroupID">findGroupContainingGroupID(group, id)</a> ⇒ <code><a href="#FoundGroupResult">FoundGroupResult</a></code></dt>
<dd><p>Find a raw group that contains a group with an ID</p>
</dd>
<dt><a href="#moveGroupBetweenVaults">moveGroupBetweenVaults(movingGroup, targetGroup)</a></dt>
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
<dt><a href="#findEntriesByCheck">findEntriesByCheck(groups, compareFn)</a> ⇒ <code>Array.&lt;Entry&gt;</code></dt>
<dd><p>Find entry instances by filtering with a compare function</p>
</dd>
<dt><a href="#findGroupsByCheck">findGroupsByCheck(groups, compareFn)</a> ⇒ <code>Array.&lt;Group&gt;</code></dt>
<dd><p>Find group instances within groups that satisfy some check</p>
</dd>
<dt><a href="#getAllEntries">getAllEntries(groups)</a> ⇒ <code>Array.&lt;Entry&gt;</code></dt>
<dd><p>Get all entries within a collection of groups</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#AttachmentDetails">AttachmentDetails</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#VaultManagerOptions">VaultManagerOptions</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#AddSourceOptions">AddSourceOptions</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#RegisterDatasourcePostProcessorResult">RegisterDatasourcePostProcessorResult</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#AttachmentDetails">AttachmentDetails</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#LoadedVaultData">LoadedVaultData</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#AppEnv">AppEnv</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#AppEnvIntPrv">AppEnvIntPrv</a> : <code>Object</code></dt>
<dd><p>Internal private API</p>
</dd>
<dt><a href="#GetPropertyOptions">GetPropertyOptions</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#EntryHistoryItem">EntryHistoryItem</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#EntryFacade">EntryFacade</a> : <code>Object</code></dt>
<dd><p>Entry facade for data input</p>
</dd>
<dt><a href="#CreateEntryFacadeOptions">CreateEntryFacadeOptions</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#FlagSpecification">FlagSpecification</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#EntryFacadeFieldFormattingSegment">EntryFacadeFieldFormattingSegment</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#EntryFacadeFieldFormatting">EntryFacadeFieldFormatting</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#EntryFacadeField">EntryFacadeField</a> : <code>Object</code></dt>
<dd><p>Entry facade data field</p>
</dd>
<dt><a href="#VaultFacade">VaultFacade</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#GroupFacade">GroupFacade</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#VaultInsights">VaultInsights</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#Insights">Insights</a> : <code><a href="#VaultInsights">VaultInsights</a></code></dt>
<dd></dd>
<dt><a href="#EntryHistoryItem">EntryHistoryItem</a> : <code>Object</code></dt>
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
<dt><a href="#EntrySearchInfo">EntrySearchInfo</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#FoundGroupResult">FoundGroupResult</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="module_Buttercup"></a>

## Buttercup

* [Buttercup](#module_Buttercup)
    * _static_
        * [.Entry](#module_Buttercup.Entry) ⇐ [<code>VaultItem</code>](#VaultItem)
            * [.id](#VaultItem+id) : <code>String</code>
            * [.permissions](#VaultItem+permissions) : <code>Array.&lt;String&gt;</code>
            * [.vault](#VaultItem+vault) : <code>Vault</code>
            * [.grantPermission(perm)](#VaultItem+grantPermission)
            * [.hasPermission(perm)](#VaultItem+hasPermission) ⇒ <code>Boolean</code>
            * [.revokeAllPermissions()](#VaultItem+revokeAllPermissions)
            * [.revokePermission(perm)](#VaultItem+revokePermission)
            * [._cleanUp()](#VaultItem+_cleanUp)
        * [.Group](#module_Buttercup.Group) ⇐ [<code>VaultItem</code>](#VaultItem)
            * [.id](#VaultItem+id) : <code>String</code>
            * [.permissions](#VaultItem+permissions) : <code>Array.&lt;String&gt;</code>
            * [.vault](#VaultItem+vault) : <code>Vault</code>
            * [.setTitle(title)](#module_Buttercup.Group+setTitle) ⇒ <code>Group</code>
            * [.grantPermission(perm)](#VaultItem+grantPermission)
            * [.hasPermission(perm)](#VaultItem+hasPermission) ⇒ <code>Boolean</code>
            * [.revokeAllPermissions()](#VaultItem+revokeAllPermissions)
            * [.revokePermission(perm)](#VaultItem+revokePermission)
            * [._cleanUp()](#VaultItem+_cleanUp)
        * [.MyButtercupDatasource](#module_Buttercup.MyButtercupDatasource) ⇐ <code>TextDatasource</code>
            * [new MyButtercupDatasource(credentials)](#new_module_Buttercup.MyButtercupDatasource_new)
            * [.hasContent](#TextDatasource+hasContent) : <code>Boolean</code>
            * [.changePassword(newCredentials, preflight)](#module_Buttercup.MyButtercupDatasource+changePassword) ⇒ <code>Promise.&lt;(Boolean\|undefined)&gt;</code>
            * [.getAttachment(vaultID, attachmentID, [credentials])](#TextDatasource+getAttachment) ⇒ <code>Promise.&lt;(Buffer\|ArrayBuffer)&gt;</code>
            * [.getAttachmentDetails(vaultID, attachmentID)](#TextDatasource+getAttachmentDetails) ⇒ [<code>AttachmentDetails</code>](#AttachmentDetails)
            * [.getAvailableStorage()](#TextDatasource+getAvailableStorage) ⇒ <code>Number</code> \| <code>null</code>
            * [.getTotalStorage()](#TextDatasource+getTotalStorage) ⇒ <code>Number</code> \| <code>null</code>
            * [.getID()](#TextDatasource+getID) ⇒ <code>String</code>
            * [.load(credentials)](#TextDatasource+load) ⇒ [<code>Promise.&lt;LoadedVaultData&gt;</code>](#LoadedVaultData)
            * [.putAttachment(vaultID, attachmentID, buffer, [credentials])](#TextDatasource+putAttachment) ⇒ <code>Promise</code>
            * [.removeAttachment(vaultID, attachmentID)](#TextDatasource+removeAttachment) ⇒ <code>Promise</code>
            * [.save(history, credentials)](#TextDatasource+save) ⇒ <code>Promise.&lt;string&gt;</code>
            * [.setContent(content)](#TextDatasource+setContent) ⇒ <code>TextDatasource</code>
            * [.supportsAttachments()](#TextDatasource+supportsAttachments) ⇒ <code>Boolean</code>
            * [.supportsPasswordChange()](#TextDatasource+supportsPasswordChange) ⇒ <code>Boolean</code>
            * [.supportsRemoteBypass()](#TextDatasource+supportsRemoteBypass) ⇒ <code>Boolean</code>
        * [.StorageInterface](#module_Buttercup.StorageInterface)
        * [.DEFAULT_ENTRY_TYPE](#module_Buttercup.DEFAULT_ENTRY_TYPE) : <code>String</code>
        * [.DEFAULT_FIELD_TYPE](#module_Buttercup.DEFAULT_FIELD_TYPE) : <code>String</code>
        * [.ENTRY_TYPE_CREDITCARD](#module_Buttercup.ENTRY_TYPE_CREDITCARD) : <code>String</code>
        * [.ENTRY_TYPE_LOGIN](#module_Buttercup.ENTRY_TYPE_LOGIN) : <code>String</code>
        * [.ENTRY_TYPE_NOTE](#module_Buttercup.ENTRY_TYPE_NOTE) : <code>String</code>
        * [.ENTRY_TYPE_SSHKEY](#module_Buttercup.ENTRY_TYPE_SSHKEY) : <code>String</code>
        * [.ENTRY_TYPE_WEBSITE](#module_Buttercup.ENTRY_TYPE_WEBSITE) : <code>String</code>
        * [.ENTRY_TYPES](#module_Buttercup.ENTRY_TYPES) : <code>Object.&lt;String, FlagSpecification&gt;</code>
        * [.FIELD_VALUE_TYPE_NOTE](#module_Buttercup.FIELD_VALUE_TYPE_NOTE) : <code>String</code>
        * [.FIELD_VALUE_TYPE_OTP](#module_Buttercup.FIELD_VALUE_TYPE_OTP) : <code>String</code>
        * [.FIELD_VALUE_TYPE_PASSWORD](#module_Buttercup.FIELD_VALUE_TYPE_PASSWORD) : <code>String</code>
        * [.FIELD_VALUE_TYPE_TEXT](#module_Buttercup.FIELD_VALUE_TYPE_TEXT) : <code>String</code>
        * [.FIELD_VALUE_TYPES](#module_Buttercup.FIELD_VALUE_TYPES) : <code>Object.&lt;String, FlagSpecification&gt;</code>
        * [.registerDatasource(datasourceType, DSClass)](#module_Buttercup.registerDatasource)
        * [.getSharedAppEnv()](#module_Buttercup.getSharedAppEnv) ⇒ [<code>AppEnv</code>](#AppEnv)
        * [.isOTPURI(str)](#module_Buttercup.isOTPURI) ⇒ <code>Boolean</code>
        * [.isVaultFacade(obj)](#module_Buttercup.isVaultFacade) ⇒ <code>Boolean</code>
        * [.consumeEntryFacade(entry, facade)](#module_Buttercup.consumeEntryFacade)
        * [.createEntryFacade([entry], [ops])](#module_Buttercup.createEntryFacade) ⇒ [<code>EntryFacade</code>](#EntryFacade)
        * [.createFieldDescriptor(entry, title, entryPropertyType, entryPropertyName, options)](#module_Buttercup.createFieldDescriptor) ⇒ [<code>EntryFacadeField</code>](#EntryFacadeField)
        * [.consumeGroupFacade(group, facade)](#module_Buttercup.consumeGroupFacade)
        * [.consumeVaultFacade(vault, facade)](#module_Buttercup.consumeVaultFacade)
        * [.createVaultFacade(vault)](#module_Buttercup.createVaultFacade) ⇒ [<code>VaultFacade</code>](#VaultFacade)
        * [.createGroupFacade(group, [parentID])](#module_Buttercup.createGroupFacade)
        * [.init()](#module_Buttercup.init)
        * [.init()](#module_Buttercup.init)
    * _inner_
        * [~AttachmentManager](#module_Buttercup.AttachmentManager)
            * [new AttachmentManager(vaultSource, credentials)](#new_module_Buttercup.AttachmentManager_new)
        * [~Vault](#module_Buttercup.Vault) ⇐ <code>EventEmitter</code>
            * [new Vault([Format])](#new_module_Buttercup.Vault_new)
        * [~VaultManager](#module_Buttercup.VaultManager) ⇐ <code>EventEmitter</code>
            * [new VaultManager([opts])](#new_module_Buttercup.VaultManager_new)
        * [~VaultSource](#module_Buttercup.VaultSource) ⇐ <code>EventEmitter</code>
        * [~Credentials](#module_Buttercup.Credentials)
            * [new Credentials([obj], masterPassword)](#new_module_Buttercup.Credentials_new)
        * [~DatasourceAuthManager](#module_Buttercup.DatasourceAuthManager) ⇐ <code>EventEmitter</code>
            * [new DatasourceAuthManager()](#new_module_Buttercup.DatasourceAuthManager_new)
        * [~DropboxDatasource](#module_Buttercup.DropboxDatasource) ⇐ <code>TextDatasource</code>
            * [new DropboxDatasource(credentials)](#new_module_Buttercup.DropboxDatasource_new)
            * [.hasContent](#TextDatasource+hasContent) : <code>Boolean</code>
            * [.getAttachment(vaultID, attachmentID, [credentials])](#TextDatasource+getAttachment) ⇒ <code>Promise.&lt;(Buffer\|ArrayBuffer)&gt;</code>
            * [.getAttachmentDetails(vaultID, attachmentID)](#TextDatasource+getAttachmentDetails) ⇒ [<code>AttachmentDetails</code>](#AttachmentDetails)
            * [.getAvailableStorage()](#TextDatasource+getAvailableStorage) ⇒ <code>Number</code> \| <code>null</code>
            * [.getTotalStorage()](#TextDatasource+getTotalStorage) ⇒ <code>Number</code> \| <code>null</code>
            * [.getID()](#TextDatasource+getID) ⇒ <code>String</code>
            * [.load(credentials)](#TextDatasource+load) ⇒ [<code>Promise.&lt;LoadedVaultData&gt;</code>](#LoadedVaultData)
            * [.putAttachment(vaultID, attachmentID, buffer, [credentials])](#TextDatasource+putAttachment) ⇒ <code>Promise</code>
            * [.removeAttachment(vaultID, attachmentID)](#TextDatasource+removeAttachment) ⇒ <code>Promise</code>
            * [.save(history, credentials)](#TextDatasource+save) ⇒ <code>Promise.&lt;string&gt;</code>
            * [.setContent(content)](#TextDatasource+setContent) ⇒ <code>TextDatasource</code>
            * [.supportsAttachments()](#TextDatasource+supportsAttachments) ⇒ <code>Boolean</code>
            * [.supportsPasswordChange()](#TextDatasource+supportsPasswordChange) ⇒ <code>Boolean</code>
            * [.supportsRemoteBypass()](#TextDatasource+supportsRemoteBypass) ⇒ <code>Boolean</code>
        * [~FileDatasource](#module_Buttercup.FileDatasource) ⇐ <code>TextDatasource</code>
            * [new FileDatasource(credentials)](#new_module_Buttercup.FileDatasource_new)
            * [.hasContent](#TextDatasource+hasContent) : <code>Boolean</code>
            * [.getAttachment(vaultID, attachmentID, [credentials])](#TextDatasource+getAttachment) ⇒ <code>Promise.&lt;(Buffer\|ArrayBuffer)&gt;</code>
            * [.getAttachmentDetails(vaultID, attachmentID)](#TextDatasource+getAttachmentDetails) ⇒ [<code>AttachmentDetails</code>](#AttachmentDetails)
            * [.getAvailableStorage()](#TextDatasource+getAvailableStorage) ⇒ <code>Number</code> \| <code>null</code>
            * [.getTotalStorage()](#TextDatasource+getTotalStorage) ⇒ <code>Number</code> \| <code>null</code>
            * [.getID()](#TextDatasource+getID) ⇒ <code>String</code>
            * [.load(credentials)](#TextDatasource+load) ⇒ [<code>Promise.&lt;LoadedVaultData&gt;</code>](#LoadedVaultData)
            * [.putAttachment(vaultID, attachmentID, buffer, [credentials])](#TextDatasource+putAttachment) ⇒ <code>Promise</code>
            * [.removeAttachment(vaultID, attachmentID)](#TextDatasource+removeAttachment) ⇒ <code>Promise</code>
            * [.save(history, credentials)](#TextDatasource+save) ⇒ <code>Promise.&lt;string&gt;</code>
            * [.setContent(content)](#TextDatasource+setContent) ⇒ <code>TextDatasource</code>
            * [.supportsAttachments()](#TextDatasource+supportsAttachments) ⇒ <code>Boolean</code>
            * [.supportsPasswordChange()](#TextDatasource+supportsPasswordChange) ⇒ <code>Boolean</code>
            * [.supportsRemoteBypass()](#TextDatasource+supportsRemoteBypass) ⇒ <code>Boolean</code>
        * [~GoogleDriveDatasource](#module_Buttercup.GoogleDriveDatasource) ⇐ <code>TextDatasource</code>
            * [new GoogleDriveDatasource(credentials)](#new_module_Buttercup.GoogleDriveDatasource_new)
            * [.hasContent](#TextDatasource+hasContent) : <code>Boolean</code>
            * [.getAttachment(vaultID, attachmentID, [credentials])](#TextDatasource+getAttachment) ⇒ <code>Promise.&lt;(Buffer\|ArrayBuffer)&gt;</code>
            * [.getAttachmentDetails(vaultID, attachmentID)](#TextDatasource+getAttachmentDetails) ⇒ [<code>AttachmentDetails</code>](#AttachmentDetails)
            * [.getAvailableStorage()](#TextDatasource+getAvailableStorage) ⇒ <code>Number</code> \| <code>null</code>
            * [.getTotalStorage()](#TextDatasource+getTotalStorage) ⇒ <code>Number</code> \| <code>null</code>
            * [.getID()](#TextDatasource+getID) ⇒ <code>String</code>
            * [.load(credentials)](#TextDatasource+load) ⇒ [<code>Promise.&lt;LoadedVaultData&gt;</code>](#LoadedVaultData)
            * [.putAttachment(vaultID, attachmentID, buffer, [credentials])](#TextDatasource+putAttachment) ⇒ <code>Promise</code>
            * [.removeAttachment(vaultID, attachmentID)](#TextDatasource+removeAttachment) ⇒ <code>Promise</code>
            * [.save(history, credentials)](#TextDatasource+save) ⇒ <code>Promise.&lt;string&gt;</code>
            * [.setContent(content)](#TextDatasource+setContent) ⇒ <code>TextDatasource</code>
            * [.supportsAttachments()](#TextDatasource+supportsAttachments) ⇒ <code>Boolean</code>
            * [.supportsPasswordChange()](#TextDatasource+supportsPasswordChange) ⇒ <code>Boolean</code>
            * [.supportsRemoteBypass()](#TextDatasource+supportsRemoteBypass) ⇒ <code>Boolean</code>
        * [~MemoryDatasource](#module_Buttercup.MemoryDatasource) ⇐ <code>TextDatasource</code>
            * [new MemoryDatasource(credentials)](#new_module_Buttercup.MemoryDatasource_new)
            * [.hasContent](#TextDatasource+hasContent) : <code>Boolean</code>
            * [.getAttachment(vaultID, attachmentID, [credentials])](#TextDatasource+getAttachment) ⇒ <code>Promise.&lt;(Buffer\|ArrayBuffer)&gt;</code>
            * [.getAttachmentDetails(vaultID, attachmentID)](#TextDatasource+getAttachmentDetails) ⇒ [<code>AttachmentDetails</code>](#AttachmentDetails)
            * [.getAvailableStorage()](#TextDatasource+getAvailableStorage) ⇒ <code>Number</code> \| <code>null</code>
            * [.getTotalStorage()](#TextDatasource+getTotalStorage) ⇒ <code>Number</code> \| <code>null</code>
            * [.getID()](#TextDatasource+getID) ⇒ <code>String</code>
            * [.load(credentials)](#TextDatasource+load) ⇒ [<code>Promise.&lt;LoadedVaultData&gt;</code>](#LoadedVaultData)
            * [.putAttachment(vaultID, attachmentID, buffer, [credentials])](#TextDatasource+putAttachment) ⇒ <code>Promise</code>
            * [.removeAttachment(vaultID, attachmentID)](#TextDatasource+removeAttachment) ⇒ <code>Promise</code>
            * [.save(history, credentials)](#TextDatasource+save) ⇒ <code>Promise.&lt;string&gt;</code>
            * [.setContent(content)](#TextDatasource+setContent) ⇒ <code>TextDatasource</code>
            * [.supportsAttachments()](#TextDatasource+supportsAttachments) ⇒ <code>Boolean</code>
            * [.supportsPasswordChange()](#TextDatasource+supportsPasswordChange) ⇒ <code>Boolean</code>
            * [.supportsRemoteBypass()](#TextDatasource+supportsRemoteBypass) ⇒ <code>Boolean</code>
        * [~TextDatasource](#module_Buttercup.TextDatasource)
            * [new TextDatasource(credentials)](#new_module_Buttercup.TextDatasource_new)
            * [.credentials](#module_Buttercup.TextDatasource+credentials) : <code>Credentials</code>
        * [~WebDAVDatasource](#module_Buttercup.WebDAVDatasource) ⇐ <code>TextDatasource</code>
            * [new WebDAVDatasource(credentials)](#new_module_Buttercup.WebDAVDatasource_new)
            * [.hasContent](#TextDatasource+hasContent) : <code>Boolean</code>
            * [.getAttachment(vaultID, attachmentID, [credentials])](#TextDatasource+getAttachment) ⇒ <code>Promise.&lt;(Buffer\|ArrayBuffer)&gt;</code>
            * [.getAttachmentDetails(vaultID, attachmentID)](#TextDatasource+getAttachmentDetails) ⇒ [<code>AttachmentDetails</code>](#AttachmentDetails)
            * [.getAvailableStorage()](#TextDatasource+getAvailableStorage) ⇒ <code>Number</code> \| <code>null</code>
            * [.getTotalStorage()](#TextDatasource+getTotalStorage) ⇒ <code>Number</code> \| <code>null</code>
            * [.getID()](#TextDatasource+getID) ⇒ <code>String</code>
            * [.load(credentials)](#TextDatasource+load) ⇒ [<code>Promise.&lt;LoadedVaultData&gt;</code>](#LoadedVaultData)
            * [.putAttachment(vaultID, attachmentID, buffer, [credentials])](#TextDatasource+putAttachment) ⇒ <code>Promise</code>
            * [.removeAttachment(vaultID, attachmentID)](#TextDatasource+removeAttachment) ⇒ <code>Promise</code>
            * [.save(history, credentials)](#TextDatasource+save) ⇒ <code>Promise.&lt;string&gt;</code>
            * [.setContent(content)](#TextDatasource+setContent) ⇒ <code>TextDatasource</code>
            * [.supportsAttachments()](#TextDatasource+supportsAttachments) ⇒ <code>Boolean</code>
            * [.supportsPasswordChange()](#TextDatasource+supportsPasswordChange) ⇒ <code>Boolean</code>
            * [.supportsRemoteBypass()](#TextDatasource+supportsRemoteBypass) ⇒ <code>Boolean</code>
        * [~MyButtercupClient](#module_Buttercup.MyButtercupClient) ⇐ <code>EventEmitter</code>
            * [new MyButtercupClient(clientID, clientSecret, accessToken, refreshToken)](#new_module_Buttercup.MyButtercupClient_new)
            * [.accessToken](#module_Buttercup.MyButtercupClient+accessToken) : <code>String</code>
            * [.digest](#module_Buttercup.MyButtercupClient+digest) : [<code>MyButtercupDigest</code>](#MyButtercupDigest) \| <code>null</code>
            * [.refreshToken](#module_Buttercup.MyButtercupClient+refreshToken) : <code>String</code>
        * [~MemoryStorageInterface](#module_Buttercup.MemoryStorageInterface) ⇐ <code>StorageInterface</code>
            * [new MemoryStorageInterface()](#new_module_Buttercup.MemoryStorageInterface_new)
            * [.getAllKeys()](#StorageInterface+getAllKeys)
            * [.getValue()](#StorageInterface+getValue)
            * [.removeKey()](#StorageInterface+removeKey)
            * [.setValue()](#StorageInterface+setValue)
        * [~LocalFileDatasource](#module_Buttercup.LocalFileDatasource) ⇐ <code>TextDatasource</code>
            * [.hasContent](#TextDatasource+hasContent) : <code>Boolean</code>
            * [.getAttachment(vaultID, attachmentID, [credentials])](#TextDatasource+getAttachment) ⇒ <code>Promise.&lt;(Buffer\|ArrayBuffer)&gt;</code>
            * [.getAttachmentDetails(vaultID, attachmentID)](#TextDatasource+getAttachmentDetails) ⇒ [<code>AttachmentDetails</code>](#AttachmentDetails)
            * [.getAvailableStorage()](#TextDatasource+getAvailableStorage) ⇒ <code>Number</code> \| <code>null</code>
            * [.getTotalStorage()](#TextDatasource+getTotalStorage) ⇒ <code>Number</code> \| <code>null</code>
            * [.getID()](#TextDatasource+getID) ⇒ <code>String</code>
            * [.load(credentials)](#TextDatasource+load) ⇒ [<code>Promise.&lt;LoadedVaultData&gt;</code>](#LoadedVaultData)
            * [.putAttachment(vaultID, attachmentID, buffer, [credentials])](#TextDatasource+putAttachment) ⇒ <code>Promise</code>
            * [.removeAttachment(vaultID, attachmentID)](#TextDatasource+removeAttachment) ⇒ <code>Promise</code>
            * [.save(history, credentials)](#TextDatasource+save) ⇒ <code>Promise.&lt;string&gt;</code>
            * [.setContent(content)](#TextDatasource+setContent) ⇒ <code>TextDatasource</code>
            * [.supportsAttachments()](#TextDatasource+supportsAttachments) ⇒ <code>Boolean</code>
            * [.supportsPasswordChange()](#TextDatasource+supportsPasswordChange) ⇒ <code>Boolean</code>
            * [.supportsRemoteBypass()](#TextDatasource+supportsRemoteBypass) ⇒ <code>Boolean</code>

<a name="module_Buttercup.Entry"></a>

### Buttercup.Entry ⇐ [<code>VaultItem</code>](#VaultItem)
Entry class - some secret item, login or perhaps
even a credit card

**Kind**: static class of [<code>Buttercup</code>](#module_Buttercup)  
**Extends**: [<code>VaultItem</code>](#VaultItem)  

* [.Entry](#module_Buttercup.Entry) ⇐ [<code>VaultItem</code>](#VaultItem)
    * [.id](#VaultItem+id) : <code>String</code>
    * [.permissions](#VaultItem+permissions) : <code>Array.&lt;String&gt;</code>
    * [.vault](#VaultItem+vault) : <code>Vault</code>
    * [.grantPermission(perm)](#VaultItem+grantPermission)
    * [.hasPermission(perm)](#VaultItem+hasPermission) ⇒ <code>Boolean</code>
    * [.revokeAllPermissions()](#VaultItem+revokeAllPermissions)
    * [.revokePermission(perm)](#VaultItem+revokePermission)
    * [._cleanUp()](#VaultItem+_cleanUp)

<a name="VaultItem+id"></a>

#### entry.id : <code>String</code>
The ID of the entry or group

**Kind**: instance property of [<code>Entry</code>](#module_Buttercup.Entry)  
**Read only**: true  
<a name="VaultItem+permissions"></a>

#### entry.permissions : <code>Array.&lt;String&gt;</code>
The current granted permissions

**Kind**: instance property of [<code>Entry</code>](#module_Buttercup.Entry)  
<a name="VaultItem+vault"></a>

#### entry.vault : <code>Vault</code>
The vault this item belongs to

**Kind**: instance property of [<code>Entry</code>](#module_Buttercup.Entry)  
**Read only**: true  
<a name="VaultItem+grantPermission"></a>

#### entry.grantPermission(perm)
Grant a new permission to the member

**Kind**: instance method of [<code>Entry</code>](#module_Buttercup.Entry)  

| Param | Type | Description |
| --- | --- | --- |
| perm | <code>String</code> | The permission to grant |

<a name="VaultItem+hasPermission"></a>

#### entry.hasPermission(perm) ⇒ <code>Boolean</code>
Check if the member has a permission

**Kind**: instance method of [<code>Entry</code>](#module_Buttercup.Entry)  

| Param | Type | Description |
| --- | --- | --- |
| perm | <code>String</code> | The permission to check for |

<a name="VaultItem+revokeAllPermissions"></a>

#### entry.revokeAllPermissions()
Revoke all permissions

**Kind**: instance method of [<code>Entry</code>](#module_Buttercup.Entry)  
<a name="VaultItem+revokePermission"></a>

#### entry.revokePermission(perm)
Revoke a single permission

**Kind**: instance method of [<code>Entry</code>](#module_Buttercup.Entry)  

| Param | Type | Description |
| --- | --- | --- |
| perm | <code>String</code> | The permission to revoke |

<a name="VaultItem+_cleanUp"></a>

#### entry.\_cleanUp()
Clean up all of the data in the vault item

**Kind**: instance method of [<code>Entry</code>](#module_Buttercup.Entry)  
**Access**: protected  
<a name="module_Buttercup.Group"></a>

### Buttercup.Group ⇐ [<code>VaultItem</code>](#VaultItem)
Group class - contains Entrys

**Kind**: static class of [<code>Buttercup</code>](#module_Buttercup)  
**Extends**: [<code>VaultItem</code>](#VaultItem)  

* [.Group](#module_Buttercup.Group) ⇐ [<code>VaultItem</code>](#VaultItem)
    * [.id](#VaultItem+id) : <code>String</code>
    * [.permissions](#VaultItem+permissions) : <code>Array.&lt;String&gt;</code>
    * [.vault](#VaultItem+vault) : <code>Vault</code>
    * [.setTitle(title)](#module_Buttercup.Group+setTitle) ⇒ <code>Group</code>
    * [.grantPermission(perm)](#VaultItem+grantPermission)
    * [.hasPermission(perm)](#VaultItem+hasPermission) ⇒ <code>Boolean</code>
    * [.revokeAllPermissions()](#VaultItem+revokeAllPermissions)
    * [.revokePermission(perm)](#VaultItem+revokePermission)
    * [._cleanUp()](#VaultItem+_cleanUp)

<a name="VaultItem+id"></a>

#### group.id : <code>String</code>
The ID of the entry or group

**Kind**: instance property of [<code>Group</code>](#module_Buttercup.Group)  
**Read only**: true  
<a name="VaultItem+permissions"></a>

#### group.permissions : <code>Array.&lt;String&gt;</code>
The current granted permissions

**Kind**: instance property of [<code>Group</code>](#module_Buttercup.Group)  
<a name="VaultItem+vault"></a>

#### group.vault : <code>Vault</code>
The vault this item belongs to

**Kind**: instance property of [<code>Group</code>](#module_Buttercup.Group)  
**Read only**: true  
<a name="module_Buttercup.Group+setTitle"></a>

#### group.setTitle(title) ⇒ <code>Group</code>
Set the group title

**Kind**: instance method of [<code>Group</code>](#module_Buttercup.Group)  
**Returns**: <code>Group</code> - Returns self  

| Param | Type | Description |
| --- | --- | --- |
| title | <code>String</code> | The title of the group |

<a name="VaultItem+grantPermission"></a>

#### group.grantPermission(perm)
Grant a new permission to the member

**Kind**: instance method of [<code>Group</code>](#module_Buttercup.Group)  

| Param | Type | Description |
| --- | --- | --- |
| perm | <code>String</code> | The permission to grant |

<a name="VaultItem+hasPermission"></a>

#### group.hasPermission(perm) ⇒ <code>Boolean</code>
Check if the member has a permission

**Kind**: instance method of [<code>Group</code>](#module_Buttercup.Group)  

| Param | Type | Description |
| --- | --- | --- |
| perm | <code>String</code> | The permission to check for |

<a name="VaultItem+revokeAllPermissions"></a>

#### group.revokeAllPermissions()
Revoke all permissions

**Kind**: instance method of [<code>Group</code>](#module_Buttercup.Group)  
<a name="VaultItem+revokePermission"></a>

#### group.revokePermission(perm)
Revoke a single permission

**Kind**: instance method of [<code>Group</code>](#module_Buttercup.Group)  

| Param | Type | Description |
| --- | --- | --- |
| perm | <code>String</code> | The permission to revoke |

<a name="VaultItem+_cleanUp"></a>

#### group.\_cleanUp()
Clean up all of the data in the vault item

**Kind**: instance method of [<code>Group</code>](#module_Buttercup.Group)  
**Access**: protected  
<a name="module_Buttercup.MyButtercupDatasource"></a>

### Buttercup.MyButtercupDatasource ⇐ <code>TextDatasource</code>
My Buttercup datasource

**Kind**: static class of [<code>Buttercup</code>](#module_Buttercup)  
**Extends**: <code>TextDatasource</code>  

* [.MyButtercupDatasource](#module_Buttercup.MyButtercupDatasource) ⇐ <code>TextDatasource</code>
    * [new MyButtercupDatasource(credentials)](#new_module_Buttercup.MyButtercupDatasource_new)
    * [.hasContent](#TextDatasource+hasContent) : <code>Boolean</code>
    * [.changePassword(newCredentials, preflight)](#module_Buttercup.MyButtercupDatasource+changePassword) ⇒ <code>Promise.&lt;(Boolean\|undefined)&gt;</code>
    * [.getAttachment(vaultID, attachmentID, [credentials])](#TextDatasource+getAttachment) ⇒ <code>Promise.&lt;(Buffer\|ArrayBuffer)&gt;</code>
    * [.getAttachmentDetails(vaultID, attachmentID)](#TextDatasource+getAttachmentDetails) ⇒ [<code>AttachmentDetails</code>](#AttachmentDetails)
    * [.getAvailableStorage()](#TextDatasource+getAvailableStorage) ⇒ <code>Number</code> \| <code>null</code>
    * [.getTotalStorage()](#TextDatasource+getTotalStorage) ⇒ <code>Number</code> \| <code>null</code>
    * [.getID()](#TextDatasource+getID) ⇒ <code>String</code>
    * [.load(credentials)](#TextDatasource+load) ⇒ [<code>Promise.&lt;LoadedVaultData&gt;</code>](#LoadedVaultData)
    * [.putAttachment(vaultID, attachmentID, buffer, [credentials])](#TextDatasource+putAttachment) ⇒ <code>Promise</code>
    * [.removeAttachment(vaultID, attachmentID)](#TextDatasource+removeAttachment) ⇒ <code>Promise</code>
    * [.save(history, credentials)](#TextDatasource+save) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.setContent(content)](#TextDatasource+setContent) ⇒ <code>TextDatasource</code>
    * [.supportsAttachments()](#TextDatasource+supportsAttachments) ⇒ <code>Boolean</code>
    * [.supportsPasswordChange()](#TextDatasource+supportsPasswordChange) ⇒ <code>Boolean</code>
    * [.supportsRemoteBypass()](#TextDatasource+supportsRemoteBypass) ⇒ <code>Boolean</code>

<a name="new_module_Buttercup.MyButtercupDatasource_new"></a>

#### new MyButtercupDatasource(credentials)
Constructor for the datasource


| Param | Type | Description |
| --- | --- | --- |
| credentials | <code>Credentials</code> | Credentials for the datasource |

<a name="TextDatasource+hasContent"></a>

#### myButtercupDatasource.hasContent : <code>Boolean</code>
Whether the datasource currently has content
Used to check if the datasource has encrypted content that can be
loaded. May be used when attempting to open a vault in offline mode.

**Kind**: instance property of [<code>MyButtercupDatasource</code>](#module_Buttercup.MyButtercupDatasource)  
**Overrides**: [<code>hasContent</code>](#TextDatasource+hasContent)  
<a name="module_Buttercup.MyButtercupDatasource+changePassword"></a>

#### myButtercupDatasource.changePassword(newCredentials, preflight) ⇒ <code>Promise.&lt;(Boolean\|undefined)&gt;</code>
Change the master password for the vault
(Called with a preflight check to ensure that the datasource is
ready to change - if not ready, the method will return false)

**Kind**: instance method of [<code>MyButtercupDatasource</code>](#module_Buttercup.MyButtercupDatasource)  
**Returns**: <code>Promise.&lt;(Boolean\|undefined)&gt;</code> - A promise that resolves
 with a boolean value during preflight, or with simply undefined
 if performing the final change action.  

| Param | Type |
| --- | --- |
| newCredentials | <code>\*</code> | 
| preflight | <code>\*</code> | 

**Example**  
```js
const creds = Credentials.fromPassword("test");
 const isReady = await tds.changePassword(
     creds,
     true // preflight
 );
 if (!isReady) {
     throw new Error("Datasource unable to change password");
 }
 await tds.changePassword(creds, false);
```
<a name="TextDatasource+getAttachment"></a>

#### myButtercupDatasource.getAttachment(vaultID, attachmentID, [credentials]) ⇒ <code>Promise.&lt;(Buffer\|ArrayBuffer)&gt;</code>
Get attachment buffer
- Downloads the attachment contents into a buffer

**Kind**: instance method of [<code>MyButtercupDatasource</code>](#module_Buttercup.MyButtercupDatasource)  
**Overrides**: [<code>getAttachment</code>](#TextDatasource+getAttachment)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| vaultID | <code>String</code> |  | The ID of the vault |
| attachmentID | <code>String</code> |  | The ID of the attachment |
| [credentials] | <code>Credentials</code> | <code></code> | Credentials to decrypt  the buffer, defaults to null (no decryption) |

<a name="TextDatasource+getAttachmentDetails"></a>

#### myButtercupDatasource.getAttachmentDetails(vaultID, attachmentID) ⇒ [<code>AttachmentDetails</code>](#AttachmentDetails)
Get attachment details

**Kind**: instance method of [<code>MyButtercupDatasource</code>](#module_Buttercup.MyButtercupDatasource)  
**Overrides**: [<code>getAttachmentDetails</code>](#TextDatasource+getAttachmentDetails)  
**Returns**: [<code>AttachmentDetails</code>](#AttachmentDetails) - The attactment details  

| Param | Type | Description |
| --- | --- | --- |
| vaultID | <code>String</code> | The ID of the vault |
| attachmentID | <code>String</code> | The ID of the attachment |

<a name="TextDatasource+getAvailableStorage"></a>

#### myButtercupDatasource.getAvailableStorage() ⇒ <code>Number</code> \| <code>null</code>
Get the available storage space, in bytes

**Kind**: instance method of [<code>MyButtercupDatasource</code>](#module_Buttercup.MyButtercupDatasource)  
**Overrides**: [<code>getAvailableStorage</code>](#TextDatasource+getAvailableStorage)  
**Returns**: <code>Number</code> \| <code>null</code> - Bytes of free space, or null if not
 available  
<a name="TextDatasource+getTotalStorage"></a>

#### myButtercupDatasource.getTotalStorage() ⇒ <code>Number</code> \| <code>null</code>
Get the total storage space, in bytes

**Kind**: instance method of [<code>MyButtercupDatasource</code>](#module_Buttercup.MyButtercupDatasource)  
**Overrides**: [<code>getTotalStorage</code>](#TextDatasource+getTotalStorage)  
**Returns**: <code>Number</code> \| <code>null</code> - Bytes of free space, or null if not
 available  
<a name="TextDatasource+getID"></a>

#### myButtercupDatasource.getID() ⇒ <code>String</code>
Get the ID of the datasource
ID to uniquely identify the datasource and its parameters

**Kind**: instance method of [<code>MyButtercupDatasource</code>](#module_Buttercup.MyButtercupDatasource)  
**Overrides**: [<code>getID</code>](#TextDatasource+getID)  
**Returns**: <code>String</code> - A hasn of the datasource (unique ID)  
<a name="TextDatasource+load"></a>

#### myButtercupDatasource.load(credentials) ⇒ [<code>Promise.&lt;LoadedVaultData&gt;</code>](#LoadedVaultData)
Load from the stored content using a password to decrypt

**Kind**: instance method of [<code>MyButtercupDatasource</code>](#module_Buttercup.MyButtercupDatasource)  
**Overrides**: [<code>load</code>](#TextDatasource+load)  
**Returns**: [<code>Promise.&lt;LoadedVaultData&gt;</code>](#LoadedVaultData) - A promise that resolves with decrypted history  
**Throws**:

- <code>Error</code> Rejects if content is empty


| Param | Type | Description |
| --- | --- | --- |
| credentials | <code>Credentials</code> | The password or Credentials instance to decrypt with |

<a name="TextDatasource+putAttachment"></a>

#### myButtercupDatasource.putAttachment(vaultID, attachmentID, buffer, [credentials]) ⇒ <code>Promise</code>
Put attachment data

**Kind**: instance method of [<code>MyButtercupDatasource</code>](#module_Buttercup.MyButtercupDatasource)  
**Overrides**: [<code>putAttachment</code>](#TextDatasource+putAttachment)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| vaultID | <code>String</code> |  | The ID of the vault |
| attachmentID | <code>String</code> |  | The ID of the attachment |
| buffer | <code>Buffer</code> \| <code>ArrayBuffer</code> |  | The attachment data |
| [credentials] | <code>Credentials</code> | <code></code> | Credentials for  encrypting the buffer. If not provided, the buffer  is presumed to be in encrypted-form and will be  written as-is. |

<a name="TextDatasource+removeAttachment"></a>

#### myButtercupDatasource.removeAttachment(vaultID, attachmentID) ⇒ <code>Promise</code>
Remove an attachment

**Kind**: instance method of [<code>MyButtercupDatasource</code>](#module_Buttercup.MyButtercupDatasource)  
**Overrides**: [<code>removeAttachment</code>](#TextDatasource+removeAttachment)  

| Param | Type | Description |
| --- | --- | --- |
| vaultID | <code>String</code> | The ID of the vault |
| attachmentID | <code>String</code> | The ID of the attachment |

<a name="TextDatasource+save"></a>

#### myButtercupDatasource.save(history, credentials) ⇒ <code>Promise.&lt;string&gt;</code>
Save archive contents with a password

**Kind**: instance method of [<code>MyButtercupDatasource</code>](#module_Buttercup.MyButtercupDatasource)  
**Overrides**: [<code>save</code>](#TextDatasource+save)  
**Returns**: <code>Promise.&lt;string&gt;</code> - A promise resolving with the encrypted content  

| Param | Type | Description |
| --- | --- | --- |
| history | <code>Array.&lt;String&gt;</code> | Archive history to save |
| credentials | <code>Credentials</code> | The Credentials instance to encrypt with |

<a name="TextDatasource+setContent"></a>

#### myButtercupDatasource.setContent(content) ⇒ <code>TextDatasource</code>
Set the text content

**Kind**: instance method of [<code>MyButtercupDatasource</code>](#module_Buttercup.MyButtercupDatasource)  
**Overrides**: [<code>setContent</code>](#TextDatasource+setContent)  
**Returns**: <code>TextDatasource</code> - Self  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>String</code> | The encrypted text content |

<a name="TextDatasource+supportsAttachments"></a>

#### myButtercupDatasource.supportsAttachments() ⇒ <code>Boolean</code>
Whether or not the datasource supports attachments

**Kind**: instance method of [<code>MyButtercupDatasource</code>](#module_Buttercup.MyButtercupDatasource)  
**Overrides**: [<code>supportsAttachments</code>](#TextDatasource+supportsAttachments)  
<a name="TextDatasource+supportsPasswordChange"></a>

#### myButtercupDatasource.supportsPasswordChange() ⇒ <code>Boolean</code>
Whether or not the datasource supports the changing of the master password

**Kind**: instance method of [<code>MyButtercupDatasource</code>](#module_Buttercup.MyButtercupDatasource)  
**Overrides**: [<code>supportsPasswordChange</code>](#TextDatasource+supportsPasswordChange)  
**Returns**: <code>Boolean</code> - True if the datasource supports password changing  
<a name="TextDatasource+supportsRemoteBypass"></a>

#### myButtercupDatasource.supportsRemoteBypass() ⇒ <code>Boolean</code>
Whether or not the datasource supports bypassing remote fetch operations
 (offline support)

**Kind**: instance method of [<code>MyButtercupDatasource</code>](#module_Buttercup.MyButtercupDatasource)  
**Overrides**: [<code>supportsRemoteBypass</code>](#TextDatasource+supportsRemoteBypass)  
**Returns**: <code>Boolean</code> - True if content can be set to bypass fetch operations,
 false otherwise  
<a name="module_Buttercup.StorageInterface"></a>

### Buttercup.StorageInterface
Storage Interface (stub only)

**Kind**: static class of [<code>Buttercup</code>](#module_Buttercup)  
**See**: MemoryStorageInterface  
<a name="module_Buttercup.DEFAULT_ENTRY_TYPE"></a>

### Buttercup.DEFAULT\_ENTRY\_TYPE : <code>String</code>
Default entry type

**Kind**: static constant of [<code>Buttercup</code>](#module_Buttercup)  
<a name="module_Buttercup.DEFAULT_FIELD_TYPE"></a>

### Buttercup.DEFAULT\_FIELD\_TYPE : <code>String</code>
Default entry field type

**Kind**: static constant of [<code>Buttercup</code>](#module_Buttercup)  
<a name="module_Buttercup.ENTRY_TYPE_CREDITCARD"></a>

### Buttercup.ENTRY\_TYPE\_CREDITCARD : <code>String</code>
Credit-card entry type

**Kind**: static constant of [<code>Buttercup</code>](#module_Buttercup)  
<a name="module_Buttercup.ENTRY_TYPE_LOGIN"></a>

### Buttercup.ENTRY\_TYPE\_LOGIN : <code>String</code>
Login (default) entry type

**Kind**: static constant of [<code>Buttercup</code>](#module_Buttercup)  
<a name="module_Buttercup.ENTRY_TYPE_NOTE"></a>

### Buttercup.ENTRY\_TYPE\_NOTE : <code>String</code>
Note entry type

**Kind**: static constant of [<code>Buttercup</code>](#module_Buttercup)  
<a name="module_Buttercup.ENTRY_TYPE_SSHKEY"></a>

### Buttercup.ENTRY\_TYPE\_SSHKEY : <code>String</code>
SSH public/private key-pair entry type

**Kind**: static constant of [<code>Buttercup</code>](#module_Buttercup)  
<a name="module_Buttercup.ENTRY_TYPE_WEBSITE"></a>

### Buttercup.ENTRY\_TYPE\_WEBSITE : <code>String</code>
Website entry type (includes URL)

**Kind**: static constant of [<code>Buttercup</code>](#module_Buttercup)  
<a name="module_Buttercup.ENTRY_TYPES"></a>

### Buttercup.ENTRY\_TYPES : <code>Object.&lt;String, FlagSpecification&gt;</code>
Entry types collection (all available)

**Kind**: static constant of [<code>Buttercup</code>](#module_Buttercup)  
<a name="module_Buttercup.FIELD_VALUE_TYPE_NOTE"></a>

### Buttercup.FIELD\_VALUE\_TYPE\_NOTE : <code>String</code>
Note type entry field value

**Kind**: static constant of [<code>Buttercup</code>](#module_Buttercup)  
<a name="module_Buttercup.FIELD_VALUE_TYPE_OTP"></a>

### Buttercup.FIELD\_VALUE\_TYPE\_OTP : <code>String</code>
OTP (One Time Password) type entry field value

**Kind**: static constant of [<code>Buttercup</code>](#module_Buttercup)  
<a name="module_Buttercup.FIELD_VALUE_TYPE_PASSWORD"></a>

### Buttercup.FIELD\_VALUE\_TYPE\_PASSWORD : <code>String</code>
Password type entry field value

**Kind**: static constant of [<code>Buttercup</code>](#module_Buttercup)  
<a name="module_Buttercup.FIELD_VALUE_TYPE_TEXT"></a>

### Buttercup.FIELD\_VALUE\_TYPE\_TEXT : <code>String</code>
Text (default) type entry field value

**Kind**: static constant of [<code>Buttercup</code>](#module_Buttercup)  
<a name="module_Buttercup.FIELD_VALUE_TYPES"></a>

### Buttercup.FIELD\_VALUE\_TYPES : <code>Object.&lt;String, FlagSpecification&gt;</code>
Entry field value types collection (all available)

**Kind**: static constant of [<code>Buttercup</code>](#module_Buttercup)  
<a name="module_Buttercup.registerDatasource"></a>

### Buttercup.registerDatasource(datasourceType, DSClass)
Register a new datasource
This is called internally by the built-in datasources, but should be called if a
custom datasource is used.

**Kind**: static method of [<code>Buttercup</code>](#module_Buttercup)  

| Param | Type | Description |
| --- | --- | --- |
| datasourceType | <code>String</code> | The name (slug) of the datasource |
| DSClass | <code>Object</code> | The class for the new datasource |

<a name="module_Buttercup.getSharedAppEnv"></a>

### Buttercup.getSharedAppEnv() ⇒ [<code>AppEnv</code>](#AppEnv)
Get the shared app-environment configurator
(provides a controller for handling the substitution of
functions that need to work differently on different
environments)

**Kind**: static method of [<code>Buttercup</code>](#module_Buttercup)  
<a name="module_Buttercup.isOTPURI"></a>

### Buttercup.isOTPURI(str) ⇒ <code>Boolean</code>
Check if a string is an OTP URI

**Kind**: static method of [<code>Buttercup</code>](#module_Buttercup)  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | The string to check |

<a name="module_Buttercup.isVaultFacade"></a>

### Buttercup.isVaultFacade(obj) ⇒ <code>Boolean</code>
Check if an object is a vault facade

**Kind**: static method of [<code>Buttercup</code>](#module_Buttercup)  
**Returns**: <code>Boolean</code> - True if a vault facade  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> \| <code>\*</code> | The item to check |

<a name="module_Buttercup.consumeEntryFacade"></a>

### Buttercup.consumeEntryFacade(entry, facade)
Process a modified entry facade

**Kind**: static method of [<code>Buttercup</code>](#module_Buttercup)  

| Param | Type | Description |
| --- | --- | --- |
| entry | <code>Entry</code> | The entry to apply processed data on |
| facade | [<code>EntryFacade</code>](#EntryFacade) | The facade object |

<a name="module_Buttercup.createEntryFacade"></a>

### Buttercup.createEntryFacade([entry], [ops]) ⇒ [<code>EntryFacade</code>](#EntryFacade)
Create a data/input facade for an Entry instance

**Kind**: static method of [<code>Buttercup</code>](#module_Buttercup)  
**Returns**: [<code>EntryFacade</code>](#EntryFacade) - A newly created facade  

| Param | Type | Description |
| --- | --- | --- |
| [entry] | <code>Entry</code> | The Entry instance |
| [ops] | [<code>CreateEntryFacadeOptions</code>](#CreateEntryFacadeOptions) | Options for the entry facade creation |

<a name="module_Buttercup.createFieldDescriptor"></a>

### Buttercup.createFieldDescriptor(entry, title, entryPropertyType, entryPropertyName, options) ⇒ [<code>EntryFacadeField</code>](#EntryFacadeField)
Create a descriptor for a field to be used within a facade

**Kind**: static method of [<code>Buttercup</code>](#module_Buttercup)  
**Returns**: [<code>EntryFacadeField</code>](#EntryFacadeField) - The field descriptor  

| Param | Type | Description |
| --- | --- | --- |
| entry | <code>Entry</code> \| <code>null</code> | The entry instance to process or null if the initial value  should be empty |
| title | <code>String</code> | The field title |
| entryPropertyType | <code>String</code> | The type of entry property (property/attribute) |
| entryPropertyName | <code>String</code> | The name of the property |
| options | <code>Object</code> | The options for the field |

<a name="module_Buttercup.consumeGroupFacade"></a>

### Buttercup.consumeGroupFacade(group, facade)
Consume a group facade and apply the differences to a group instance

**Kind**: static method of [<code>Buttercup</code>](#module_Buttercup)  

| Param | Type | Description |
| --- | --- | --- |
| group | <code>Group</code> | The group instance to apply to |
| facade | [<code>GroupFacade</code>](#GroupFacade) | The facade to apply |

<a name="module_Buttercup.consumeVaultFacade"></a>

### Buttercup.consumeVaultFacade(vault, facade)
Consume a vault facade and apply the differences to the vault
instance

**Kind**: static method of [<code>Buttercup</code>](#module_Buttercup)  

| Param | Type | Description |
| --- | --- | --- |
| vault | <code>Vault</code> | The vault instance to apply to |
| facade | [<code>VaultFacade</code>](#VaultFacade) | The facade to apply |

<a name="module_Buttercup.createVaultFacade"></a>

### Buttercup.createVaultFacade(vault) ⇒ [<code>VaultFacade</code>](#VaultFacade)
Create a vault facade from an Vault instance

**Kind**: static method of [<code>Buttercup</code>](#module_Buttercup)  
**Returns**: [<code>VaultFacade</code>](#VaultFacade) - A vault facade  

| Param | Type | Description |
| --- | --- | --- |
| vault | <code>Vault</code> | A vault instance |

<a name="module_Buttercup.createGroupFacade"></a>

### Buttercup.createGroupFacade(group, [parentID])
Create a group facade from a Group instance

**Kind**: static method of [<code>Buttercup</code>](#module_Buttercup)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| group | <code>Group</code> |  | The group instance |
| [parentID] | <code>String</code> | <code>0</code> | The parent ID of the group |

<a name="module_Buttercup.init"></a>

### Buttercup.init()
Initialise the node/native environment

**Kind**: static method of [<code>Buttercup</code>](#module_Buttercup)  
<a name="module_Buttercup.init"></a>

### Buttercup.init()
Initialise the web environment

**Kind**: static method of [<code>Buttercup</code>](#module_Buttercup)  
<a name="module_Buttercup.AttachmentManager"></a>

### Buttercup~AttachmentManager
Attachment manager

**Kind**: inner class of [<code>Buttercup</code>](#module_Buttercup)  
<a name="new_module_Buttercup.AttachmentManager_new"></a>

#### new AttachmentManager(vaultSource, credentials)
Constructor for new attachment managers


| Param | Type | Description |
| --- | --- | --- |
| vaultSource | <code>VaultSource</code> | The vault source to attach to. This is  normally set by the VaultSource automatically when unlocking a source. |
| credentials | <code>Credentials</code> | The credentials to use for encrypting  and decrypting attachments. |

<a name="module_Buttercup.Vault"></a>

### Buttercup~Vault ⇐ <code>EventEmitter</code>
Vault class - Contains Groups and Entrys

**Kind**: inner class of [<code>Buttercup</code>](#module_Buttercup)  
**Extends**: <code>EventEmitter</code>  
<a name="new_module_Buttercup.Vault_new"></a>

#### new Vault([Format])
Create a new Vault instance


| Param | Type | Description |
| --- | --- | --- |
| [Format] | <code>VaultFormat</code> | Optional vault format specification.  Will use the default system format (recommended) if not  specified. |

<a name="module_Buttercup.VaultManager"></a>

### Buttercup~VaultManager ⇐ <code>EventEmitter</code>
Vault manager, to manage vault sources and their vaults

**Kind**: inner class of [<code>Buttercup</code>](#module_Buttercup)  
**Extends**: <code>EventEmitter</code>  
<a name="new_module_Buttercup.VaultManager_new"></a>

#### new VaultManager([opts])
Construct a new VaultManager


| Param | Type | Description |
| --- | --- | --- |
| [opts] | [<code>VaultManagerOptions</code>](#VaultManagerOptions) | Configuration options |

<a name="module_Buttercup.VaultSource"></a>

### Buttercup~VaultSource ⇐ <code>EventEmitter</code>
Vault source class for managing a single vault
within a vault manager

**Kind**: inner class of [<code>Buttercup</code>](#module_Buttercup)  
**Extends**: <code>EventEmitter</code>  
<a name="module_Buttercup.Credentials"></a>

### Buttercup~Credentials
Secure credentials storage/transfer class
- Allows for the safe transfer of credentials within the
Buttercup application environment. Will not allow
credentials to be shared or transferred outside of the
environment. Credential properties are stored in memory
and are inaccessible to public functions.

**Kind**: inner class of [<code>Buttercup</code>](#module_Buttercup)  
<a name="new_module_Buttercup.Credentials_new"></a>

#### new Credentials([obj], masterPassword)
Create a new Credentials instance


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [obj] | <code>Object</code> |  | Object data representing some credentials |
| masterPassword | <code>String</code> \| <code>null</code> | <code></code> | Optional master password to store with  the credentials data, which is used for generating secure strings. |

<a name="module_Buttercup.DatasourceAuthManager"></a>

### Buttercup~DatasourceAuthManager ⇐ <code>EventEmitter</code>
Authentication manager

**Kind**: inner class of [<code>Buttercup</code>](#module_Buttercup)  
**Extends**: <code>EventEmitter</code>  
<a name="new_module_Buttercup.DatasourceAuthManager_new"></a>

#### new DatasourceAuthManager()
Constructor for the auth manager

<a name="module_Buttercup.DropboxDatasource"></a>

### Buttercup~DropboxDatasource ⇐ <code>TextDatasource</code>
Datasource for Dropbox archives

**Kind**: inner class of [<code>Buttercup</code>](#module_Buttercup)  
**Extends**: <code>TextDatasource</code>  

* [~DropboxDatasource](#module_Buttercup.DropboxDatasource) ⇐ <code>TextDatasource</code>
    * [new DropboxDatasource(credentials)](#new_module_Buttercup.DropboxDatasource_new)
    * [.hasContent](#TextDatasource+hasContent) : <code>Boolean</code>
    * [.getAttachment(vaultID, attachmentID, [credentials])](#TextDatasource+getAttachment) ⇒ <code>Promise.&lt;(Buffer\|ArrayBuffer)&gt;</code>
    * [.getAttachmentDetails(vaultID, attachmentID)](#TextDatasource+getAttachmentDetails) ⇒ [<code>AttachmentDetails</code>](#AttachmentDetails)
    * [.getAvailableStorage()](#TextDatasource+getAvailableStorage) ⇒ <code>Number</code> \| <code>null</code>
    * [.getTotalStorage()](#TextDatasource+getTotalStorage) ⇒ <code>Number</code> \| <code>null</code>
    * [.getID()](#TextDatasource+getID) ⇒ <code>String</code>
    * [.load(credentials)](#TextDatasource+load) ⇒ [<code>Promise.&lt;LoadedVaultData&gt;</code>](#LoadedVaultData)
    * [.putAttachment(vaultID, attachmentID, buffer, [credentials])](#TextDatasource+putAttachment) ⇒ <code>Promise</code>
    * [.removeAttachment(vaultID, attachmentID)](#TextDatasource+removeAttachment) ⇒ <code>Promise</code>
    * [.save(history, credentials)](#TextDatasource+save) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.setContent(content)](#TextDatasource+setContent) ⇒ <code>TextDatasource</code>
    * [.supportsAttachments()](#TextDatasource+supportsAttachments) ⇒ <code>Boolean</code>
    * [.supportsPasswordChange()](#TextDatasource+supportsPasswordChange) ⇒ <code>Boolean</code>
    * [.supportsRemoteBypass()](#TextDatasource+supportsRemoteBypass) ⇒ <code>Boolean</code>

<a name="new_module_Buttercup.DropboxDatasource_new"></a>

#### new DropboxDatasource(credentials)
Datasource for Dropbox accounts


| Param | Type | Description |
| --- | --- | --- |
| credentials | <code>Credentials</code> | Credentials instance to configure the  datsource with |

<a name="TextDatasource+hasContent"></a>

#### dropboxDatasource.hasContent : <code>Boolean</code>
Whether the datasource currently has content
Used to check if the datasource has encrypted content that can be
loaded. May be used when attempting to open a vault in offline mode.

**Kind**: instance property of [<code>DropboxDatasource</code>](#module_Buttercup.DropboxDatasource)  
**Overrides**: [<code>hasContent</code>](#TextDatasource+hasContent)  
<a name="TextDatasource+getAttachment"></a>

#### dropboxDatasource.getAttachment(vaultID, attachmentID, [credentials]) ⇒ <code>Promise.&lt;(Buffer\|ArrayBuffer)&gt;</code>
Get attachment buffer
- Downloads the attachment contents into a buffer

**Kind**: instance method of [<code>DropboxDatasource</code>](#module_Buttercup.DropboxDatasource)  
**Overrides**: [<code>getAttachment</code>](#TextDatasource+getAttachment)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| vaultID | <code>String</code> |  | The ID of the vault |
| attachmentID | <code>String</code> |  | The ID of the attachment |
| [credentials] | <code>Credentials</code> | <code></code> | Credentials to decrypt  the buffer, defaults to null (no decryption) |

<a name="TextDatasource+getAttachmentDetails"></a>

#### dropboxDatasource.getAttachmentDetails(vaultID, attachmentID) ⇒ [<code>AttachmentDetails</code>](#AttachmentDetails)
Get attachment details

**Kind**: instance method of [<code>DropboxDatasource</code>](#module_Buttercup.DropboxDatasource)  
**Overrides**: [<code>getAttachmentDetails</code>](#TextDatasource+getAttachmentDetails)  
**Returns**: [<code>AttachmentDetails</code>](#AttachmentDetails) - The attactment details  

| Param | Type | Description |
| --- | --- | --- |
| vaultID | <code>String</code> | The ID of the vault |
| attachmentID | <code>String</code> | The ID of the attachment |

<a name="TextDatasource+getAvailableStorage"></a>

#### dropboxDatasource.getAvailableStorage() ⇒ <code>Number</code> \| <code>null</code>
Get the available storage space, in bytes

**Kind**: instance method of [<code>DropboxDatasource</code>](#module_Buttercup.DropboxDatasource)  
**Overrides**: [<code>getAvailableStorage</code>](#TextDatasource+getAvailableStorage)  
**Returns**: <code>Number</code> \| <code>null</code> - Bytes of free space, or null if not
 available  
<a name="TextDatasource+getTotalStorage"></a>

#### dropboxDatasource.getTotalStorage() ⇒ <code>Number</code> \| <code>null</code>
Get the total storage space, in bytes

**Kind**: instance method of [<code>DropboxDatasource</code>](#module_Buttercup.DropboxDatasource)  
**Overrides**: [<code>getTotalStorage</code>](#TextDatasource+getTotalStorage)  
**Returns**: <code>Number</code> \| <code>null</code> - Bytes of free space, or null if not
 available  
<a name="TextDatasource+getID"></a>

#### dropboxDatasource.getID() ⇒ <code>String</code>
Get the ID of the datasource
ID to uniquely identify the datasource and its parameters

**Kind**: instance method of [<code>DropboxDatasource</code>](#module_Buttercup.DropboxDatasource)  
**Overrides**: [<code>getID</code>](#TextDatasource+getID)  
**Returns**: <code>String</code> - A hasn of the datasource (unique ID)  
<a name="TextDatasource+load"></a>

#### dropboxDatasource.load(credentials) ⇒ [<code>Promise.&lt;LoadedVaultData&gt;</code>](#LoadedVaultData)
Load from the stored content using a password to decrypt

**Kind**: instance method of [<code>DropboxDatasource</code>](#module_Buttercup.DropboxDatasource)  
**Overrides**: [<code>load</code>](#TextDatasource+load)  
**Returns**: [<code>Promise.&lt;LoadedVaultData&gt;</code>](#LoadedVaultData) - A promise that resolves with decrypted history  
**Throws**:

- <code>Error</code> Rejects if content is empty


| Param | Type | Description |
| --- | --- | --- |
| credentials | <code>Credentials</code> | The password or Credentials instance to decrypt with |

<a name="TextDatasource+putAttachment"></a>

#### dropboxDatasource.putAttachment(vaultID, attachmentID, buffer, [credentials]) ⇒ <code>Promise</code>
Put attachment data

**Kind**: instance method of [<code>DropboxDatasource</code>](#module_Buttercup.DropboxDatasource)  
**Overrides**: [<code>putAttachment</code>](#TextDatasource+putAttachment)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| vaultID | <code>String</code> |  | The ID of the vault |
| attachmentID | <code>String</code> |  | The ID of the attachment |
| buffer | <code>Buffer</code> \| <code>ArrayBuffer</code> |  | The attachment data |
| [credentials] | <code>Credentials</code> | <code></code> | Credentials for  encrypting the buffer. If not provided, the buffer  is presumed to be in encrypted-form and will be  written as-is. |

<a name="TextDatasource+removeAttachment"></a>

#### dropboxDatasource.removeAttachment(vaultID, attachmentID) ⇒ <code>Promise</code>
Remove an attachment

**Kind**: instance method of [<code>DropboxDatasource</code>](#module_Buttercup.DropboxDatasource)  
**Overrides**: [<code>removeAttachment</code>](#TextDatasource+removeAttachment)  

| Param | Type | Description |
| --- | --- | --- |
| vaultID | <code>String</code> | The ID of the vault |
| attachmentID | <code>String</code> | The ID of the attachment |

<a name="TextDatasource+save"></a>

#### dropboxDatasource.save(history, credentials) ⇒ <code>Promise.&lt;string&gt;</code>
Save archive contents with a password

**Kind**: instance method of [<code>DropboxDatasource</code>](#module_Buttercup.DropboxDatasource)  
**Overrides**: [<code>save</code>](#TextDatasource+save)  
**Returns**: <code>Promise.&lt;string&gt;</code> - A promise resolving with the encrypted content  

| Param | Type | Description |
| --- | --- | --- |
| history | <code>Array.&lt;String&gt;</code> | Archive history to save |
| credentials | <code>Credentials</code> | The Credentials instance to encrypt with |

<a name="TextDatasource+setContent"></a>

#### dropboxDatasource.setContent(content) ⇒ <code>TextDatasource</code>
Set the text content

**Kind**: instance method of [<code>DropboxDatasource</code>](#module_Buttercup.DropboxDatasource)  
**Overrides**: [<code>setContent</code>](#TextDatasource+setContent)  
**Returns**: <code>TextDatasource</code> - Self  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>String</code> | The encrypted text content |

<a name="TextDatasource+supportsAttachments"></a>

#### dropboxDatasource.supportsAttachments() ⇒ <code>Boolean</code>
Whether or not the datasource supports attachments

**Kind**: instance method of [<code>DropboxDatasource</code>](#module_Buttercup.DropboxDatasource)  
**Overrides**: [<code>supportsAttachments</code>](#TextDatasource+supportsAttachments)  
<a name="TextDatasource+supportsPasswordChange"></a>

#### dropboxDatasource.supportsPasswordChange() ⇒ <code>Boolean</code>
Whether or not the datasource supports the changing of the master password

**Kind**: instance method of [<code>DropboxDatasource</code>](#module_Buttercup.DropboxDatasource)  
**Overrides**: [<code>supportsPasswordChange</code>](#TextDatasource+supportsPasswordChange)  
**Returns**: <code>Boolean</code> - True if the datasource supports password changing  
<a name="TextDatasource+supportsRemoteBypass"></a>

#### dropboxDatasource.supportsRemoteBypass() ⇒ <code>Boolean</code>
Whether or not the datasource supports bypassing remote fetch operations
 (offline support)

**Kind**: instance method of [<code>DropboxDatasource</code>](#module_Buttercup.DropboxDatasource)  
**Overrides**: [<code>supportsRemoteBypass</code>](#TextDatasource+supportsRemoteBypass)  
**Returns**: <code>Boolean</code> - True if content can be set to bypass fetch operations,
 false otherwise  
<a name="module_Buttercup.FileDatasource"></a>

### Buttercup~FileDatasource ⇐ <code>TextDatasource</code>
File datasource for loading and saving files

**Kind**: inner class of [<code>Buttercup</code>](#module_Buttercup)  
**Extends**: <code>TextDatasource</code>  

* [~FileDatasource](#module_Buttercup.FileDatasource) ⇐ <code>TextDatasource</code>
    * [new FileDatasource(credentials)](#new_module_Buttercup.FileDatasource_new)
    * [.hasContent](#TextDatasource+hasContent) : <code>Boolean</code>
    * [.getAttachment(vaultID, attachmentID, [credentials])](#TextDatasource+getAttachment) ⇒ <code>Promise.&lt;(Buffer\|ArrayBuffer)&gt;</code>
    * [.getAttachmentDetails(vaultID, attachmentID)](#TextDatasource+getAttachmentDetails) ⇒ [<code>AttachmentDetails</code>](#AttachmentDetails)
    * [.getAvailableStorage()](#TextDatasource+getAvailableStorage) ⇒ <code>Number</code> \| <code>null</code>
    * [.getTotalStorage()](#TextDatasource+getTotalStorage) ⇒ <code>Number</code> \| <code>null</code>
    * [.getID()](#TextDatasource+getID) ⇒ <code>String</code>
    * [.load(credentials)](#TextDatasource+load) ⇒ [<code>Promise.&lt;LoadedVaultData&gt;</code>](#LoadedVaultData)
    * [.putAttachment(vaultID, attachmentID, buffer, [credentials])](#TextDatasource+putAttachment) ⇒ <code>Promise</code>
    * [.removeAttachment(vaultID, attachmentID)](#TextDatasource+removeAttachment) ⇒ <code>Promise</code>
    * [.save(history, credentials)](#TextDatasource+save) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.setContent(content)](#TextDatasource+setContent) ⇒ <code>TextDatasource</code>
    * [.supportsAttachments()](#TextDatasource+supportsAttachments) ⇒ <code>Boolean</code>
    * [.supportsPasswordChange()](#TextDatasource+supportsPasswordChange) ⇒ <code>Boolean</code>
    * [.supportsRemoteBypass()](#TextDatasource+supportsRemoteBypass) ⇒ <code>Boolean</code>

<a name="new_module_Buttercup.FileDatasource_new"></a>

#### new FileDatasource(credentials)
Constructor for the file datasource


| Param | Type | Description |
| --- | --- | --- |
| credentials | <code>Credentials</code> | The credentials instance with which to  use to configure the datasource |

<a name="TextDatasource+hasContent"></a>

#### fileDatasource.hasContent : <code>Boolean</code>
Whether the datasource currently has content
Used to check if the datasource has encrypted content that can be
loaded. May be used when attempting to open a vault in offline mode.

**Kind**: instance property of [<code>FileDatasource</code>](#module_Buttercup.FileDatasource)  
**Overrides**: [<code>hasContent</code>](#TextDatasource+hasContent)  
<a name="TextDatasource+getAttachment"></a>

#### fileDatasource.getAttachment(vaultID, attachmentID, [credentials]) ⇒ <code>Promise.&lt;(Buffer\|ArrayBuffer)&gt;</code>
Get attachment buffer
- Downloads the attachment contents into a buffer

**Kind**: instance method of [<code>FileDatasource</code>](#module_Buttercup.FileDatasource)  
**Overrides**: [<code>getAttachment</code>](#TextDatasource+getAttachment)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| vaultID | <code>String</code> |  | The ID of the vault |
| attachmentID | <code>String</code> |  | The ID of the attachment |
| [credentials] | <code>Credentials</code> | <code></code> | Credentials to decrypt  the buffer, defaults to null (no decryption) |

<a name="TextDatasource+getAttachmentDetails"></a>

#### fileDatasource.getAttachmentDetails(vaultID, attachmentID) ⇒ [<code>AttachmentDetails</code>](#AttachmentDetails)
Get attachment details

**Kind**: instance method of [<code>FileDatasource</code>](#module_Buttercup.FileDatasource)  
**Overrides**: [<code>getAttachmentDetails</code>](#TextDatasource+getAttachmentDetails)  
**Returns**: [<code>AttachmentDetails</code>](#AttachmentDetails) - The attactment details  

| Param | Type | Description |
| --- | --- | --- |
| vaultID | <code>String</code> | The ID of the vault |
| attachmentID | <code>String</code> | The ID of the attachment |

<a name="TextDatasource+getAvailableStorage"></a>

#### fileDatasource.getAvailableStorage() ⇒ <code>Number</code> \| <code>null</code>
Get the available storage space, in bytes

**Kind**: instance method of [<code>FileDatasource</code>](#module_Buttercup.FileDatasource)  
**Overrides**: [<code>getAvailableStorage</code>](#TextDatasource+getAvailableStorage)  
**Returns**: <code>Number</code> \| <code>null</code> - Bytes of free space, or null if not
 available  
<a name="TextDatasource+getTotalStorage"></a>

#### fileDatasource.getTotalStorage() ⇒ <code>Number</code> \| <code>null</code>
Get the total storage space, in bytes

**Kind**: instance method of [<code>FileDatasource</code>](#module_Buttercup.FileDatasource)  
**Overrides**: [<code>getTotalStorage</code>](#TextDatasource+getTotalStorage)  
**Returns**: <code>Number</code> \| <code>null</code> - Bytes of free space, or null if not
 available  
<a name="TextDatasource+getID"></a>

#### fileDatasource.getID() ⇒ <code>String</code>
Get the ID of the datasource
ID to uniquely identify the datasource and its parameters

**Kind**: instance method of [<code>FileDatasource</code>](#module_Buttercup.FileDatasource)  
**Overrides**: [<code>getID</code>](#TextDatasource+getID)  
**Returns**: <code>String</code> - A hasn of the datasource (unique ID)  
<a name="TextDatasource+load"></a>

#### fileDatasource.load(credentials) ⇒ [<code>Promise.&lt;LoadedVaultData&gt;</code>](#LoadedVaultData)
Load from the stored content using a password to decrypt

**Kind**: instance method of [<code>FileDatasource</code>](#module_Buttercup.FileDatasource)  
**Overrides**: [<code>load</code>](#TextDatasource+load)  
**Returns**: [<code>Promise.&lt;LoadedVaultData&gt;</code>](#LoadedVaultData) - A promise that resolves with decrypted history  
**Throws**:

- <code>Error</code> Rejects if content is empty


| Param | Type | Description |
| --- | --- | --- |
| credentials | <code>Credentials</code> | The password or Credentials instance to decrypt with |

<a name="TextDatasource+putAttachment"></a>

#### fileDatasource.putAttachment(vaultID, attachmentID, buffer, [credentials]) ⇒ <code>Promise</code>
Put attachment data

**Kind**: instance method of [<code>FileDatasource</code>](#module_Buttercup.FileDatasource)  
**Overrides**: [<code>putAttachment</code>](#TextDatasource+putAttachment)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| vaultID | <code>String</code> |  | The ID of the vault |
| attachmentID | <code>String</code> |  | The ID of the attachment |
| buffer | <code>Buffer</code> \| <code>ArrayBuffer</code> |  | The attachment data |
| [credentials] | <code>Credentials</code> | <code></code> | Credentials for  encrypting the buffer. If not provided, the buffer  is presumed to be in encrypted-form and will be  written as-is. |

<a name="TextDatasource+removeAttachment"></a>

#### fileDatasource.removeAttachment(vaultID, attachmentID) ⇒ <code>Promise</code>
Remove an attachment

**Kind**: instance method of [<code>FileDatasource</code>](#module_Buttercup.FileDatasource)  
**Overrides**: [<code>removeAttachment</code>](#TextDatasource+removeAttachment)  

| Param | Type | Description |
| --- | --- | --- |
| vaultID | <code>String</code> | The ID of the vault |
| attachmentID | <code>String</code> | The ID of the attachment |

<a name="TextDatasource+save"></a>

#### fileDatasource.save(history, credentials) ⇒ <code>Promise.&lt;string&gt;</code>
Save archive contents with a password

**Kind**: instance method of [<code>FileDatasource</code>](#module_Buttercup.FileDatasource)  
**Overrides**: [<code>save</code>](#TextDatasource+save)  
**Returns**: <code>Promise.&lt;string&gt;</code> - A promise resolving with the encrypted content  

| Param | Type | Description |
| --- | --- | --- |
| history | <code>Array.&lt;String&gt;</code> | Archive history to save |
| credentials | <code>Credentials</code> | The Credentials instance to encrypt with |

<a name="TextDatasource+setContent"></a>

#### fileDatasource.setContent(content) ⇒ <code>TextDatasource</code>
Set the text content

**Kind**: instance method of [<code>FileDatasource</code>](#module_Buttercup.FileDatasource)  
**Overrides**: [<code>setContent</code>](#TextDatasource+setContent)  
**Returns**: <code>TextDatasource</code> - Self  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>String</code> | The encrypted text content |

<a name="TextDatasource+supportsAttachments"></a>

#### fileDatasource.supportsAttachments() ⇒ <code>Boolean</code>
Whether or not the datasource supports attachments

**Kind**: instance method of [<code>FileDatasource</code>](#module_Buttercup.FileDatasource)  
**Overrides**: [<code>supportsAttachments</code>](#TextDatasource+supportsAttachments)  
<a name="TextDatasource+supportsPasswordChange"></a>

#### fileDatasource.supportsPasswordChange() ⇒ <code>Boolean</code>
Whether or not the datasource supports the changing of the master password

**Kind**: instance method of [<code>FileDatasource</code>](#module_Buttercup.FileDatasource)  
**Overrides**: [<code>supportsPasswordChange</code>](#TextDatasource+supportsPasswordChange)  
**Returns**: <code>Boolean</code> - True if the datasource supports password changing  
<a name="TextDatasource+supportsRemoteBypass"></a>

#### fileDatasource.supportsRemoteBypass() ⇒ <code>Boolean</code>
Whether or not the datasource supports bypassing remote fetch operations
 (offline support)

**Kind**: instance method of [<code>FileDatasource</code>](#module_Buttercup.FileDatasource)  
**Overrides**: [<code>supportsRemoteBypass</code>](#TextDatasource+supportsRemoteBypass)  
**Returns**: <code>Boolean</code> - True if content can be set to bypass fetch operations,
 false otherwise  
<a name="module_Buttercup.GoogleDriveDatasource"></a>

### Buttercup~GoogleDriveDatasource ⇐ <code>TextDatasource</code>
Datasource for Google Drive archives

**Kind**: inner class of [<code>Buttercup</code>](#module_Buttercup)  
**Extends**: <code>TextDatasource</code>  

* [~GoogleDriveDatasource](#module_Buttercup.GoogleDriveDatasource) ⇐ <code>TextDatasource</code>
    * [new GoogleDriveDatasource(credentials)](#new_module_Buttercup.GoogleDriveDatasource_new)
    * [.hasContent](#TextDatasource+hasContent) : <code>Boolean</code>
    * [.getAttachment(vaultID, attachmentID, [credentials])](#TextDatasource+getAttachment) ⇒ <code>Promise.&lt;(Buffer\|ArrayBuffer)&gt;</code>
    * [.getAttachmentDetails(vaultID, attachmentID)](#TextDatasource+getAttachmentDetails) ⇒ [<code>AttachmentDetails</code>](#AttachmentDetails)
    * [.getAvailableStorage()](#TextDatasource+getAvailableStorage) ⇒ <code>Number</code> \| <code>null</code>
    * [.getTotalStorage()](#TextDatasource+getTotalStorage) ⇒ <code>Number</code> \| <code>null</code>
    * [.getID()](#TextDatasource+getID) ⇒ <code>String</code>
    * [.load(credentials)](#TextDatasource+load) ⇒ [<code>Promise.&lt;LoadedVaultData&gt;</code>](#LoadedVaultData)
    * [.putAttachment(vaultID, attachmentID, buffer, [credentials])](#TextDatasource+putAttachment) ⇒ <code>Promise</code>
    * [.removeAttachment(vaultID, attachmentID)](#TextDatasource+removeAttachment) ⇒ <code>Promise</code>
    * [.save(history, credentials)](#TextDatasource+save) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.setContent(content)](#TextDatasource+setContent) ⇒ <code>TextDatasource</code>
    * [.supportsAttachments()](#TextDatasource+supportsAttachments) ⇒ <code>Boolean</code>
    * [.supportsPasswordChange()](#TextDatasource+supportsPasswordChange) ⇒ <code>Boolean</code>
    * [.supportsRemoteBypass()](#TextDatasource+supportsRemoteBypass) ⇒ <code>Boolean</code>

<a name="new_module_Buttercup.GoogleDriveDatasource_new"></a>

#### new GoogleDriveDatasource(credentials)
Datasource for Google Drive connections


| Param | Type | Description |
| --- | --- | --- |
| credentials | <code>Credentials</code> | The credentials instance with which to  configure the datasource with |

<a name="TextDatasource+hasContent"></a>

#### googleDriveDatasource.hasContent : <code>Boolean</code>
Whether the datasource currently has content
Used to check if the datasource has encrypted content that can be
loaded. May be used when attempting to open a vault in offline mode.

**Kind**: instance property of [<code>GoogleDriveDatasource</code>](#module_Buttercup.GoogleDriveDatasource)  
**Overrides**: [<code>hasContent</code>](#TextDatasource+hasContent)  
<a name="TextDatasource+getAttachment"></a>

#### googleDriveDatasource.getAttachment(vaultID, attachmentID, [credentials]) ⇒ <code>Promise.&lt;(Buffer\|ArrayBuffer)&gt;</code>
Get attachment buffer
- Downloads the attachment contents into a buffer

**Kind**: instance method of [<code>GoogleDriveDatasource</code>](#module_Buttercup.GoogleDriveDatasource)  
**Overrides**: [<code>getAttachment</code>](#TextDatasource+getAttachment)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| vaultID | <code>String</code> |  | The ID of the vault |
| attachmentID | <code>String</code> |  | The ID of the attachment |
| [credentials] | <code>Credentials</code> | <code></code> | Credentials to decrypt  the buffer, defaults to null (no decryption) |

<a name="TextDatasource+getAttachmentDetails"></a>

#### googleDriveDatasource.getAttachmentDetails(vaultID, attachmentID) ⇒ [<code>AttachmentDetails</code>](#AttachmentDetails)
Get attachment details

**Kind**: instance method of [<code>GoogleDriveDatasource</code>](#module_Buttercup.GoogleDriveDatasource)  
**Overrides**: [<code>getAttachmentDetails</code>](#TextDatasource+getAttachmentDetails)  
**Returns**: [<code>AttachmentDetails</code>](#AttachmentDetails) - The attactment details  

| Param | Type | Description |
| --- | --- | --- |
| vaultID | <code>String</code> | The ID of the vault |
| attachmentID | <code>String</code> | The ID of the attachment |

<a name="TextDatasource+getAvailableStorage"></a>

#### googleDriveDatasource.getAvailableStorage() ⇒ <code>Number</code> \| <code>null</code>
Get the available storage space, in bytes

**Kind**: instance method of [<code>GoogleDriveDatasource</code>](#module_Buttercup.GoogleDriveDatasource)  
**Overrides**: [<code>getAvailableStorage</code>](#TextDatasource+getAvailableStorage)  
**Returns**: <code>Number</code> \| <code>null</code> - Bytes of free space, or null if not
 available  
<a name="TextDatasource+getTotalStorage"></a>

#### googleDriveDatasource.getTotalStorage() ⇒ <code>Number</code> \| <code>null</code>
Get the total storage space, in bytes

**Kind**: instance method of [<code>GoogleDriveDatasource</code>](#module_Buttercup.GoogleDriveDatasource)  
**Overrides**: [<code>getTotalStorage</code>](#TextDatasource+getTotalStorage)  
**Returns**: <code>Number</code> \| <code>null</code> - Bytes of free space, or null if not
 available  
<a name="TextDatasource+getID"></a>

#### googleDriveDatasource.getID() ⇒ <code>String</code>
Get the ID of the datasource
ID to uniquely identify the datasource and its parameters

**Kind**: instance method of [<code>GoogleDriveDatasource</code>](#module_Buttercup.GoogleDriveDatasource)  
**Overrides**: [<code>getID</code>](#TextDatasource+getID)  
**Returns**: <code>String</code> - A hasn of the datasource (unique ID)  
<a name="TextDatasource+load"></a>

#### googleDriveDatasource.load(credentials) ⇒ [<code>Promise.&lt;LoadedVaultData&gt;</code>](#LoadedVaultData)
Load from the stored content using a password to decrypt

**Kind**: instance method of [<code>GoogleDriveDatasource</code>](#module_Buttercup.GoogleDriveDatasource)  
**Overrides**: [<code>load</code>](#TextDatasource+load)  
**Returns**: [<code>Promise.&lt;LoadedVaultData&gt;</code>](#LoadedVaultData) - A promise that resolves with decrypted history  
**Throws**:

- <code>Error</code> Rejects if content is empty


| Param | Type | Description |
| --- | --- | --- |
| credentials | <code>Credentials</code> | The password or Credentials instance to decrypt with |

<a name="TextDatasource+putAttachment"></a>

#### googleDriveDatasource.putAttachment(vaultID, attachmentID, buffer, [credentials]) ⇒ <code>Promise</code>
Put attachment data

**Kind**: instance method of [<code>GoogleDriveDatasource</code>](#module_Buttercup.GoogleDriveDatasource)  
**Overrides**: [<code>putAttachment</code>](#TextDatasource+putAttachment)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| vaultID | <code>String</code> |  | The ID of the vault |
| attachmentID | <code>String</code> |  | The ID of the attachment |
| buffer | <code>Buffer</code> \| <code>ArrayBuffer</code> |  | The attachment data |
| [credentials] | <code>Credentials</code> | <code></code> | Credentials for  encrypting the buffer. If not provided, the buffer  is presumed to be in encrypted-form and will be  written as-is. |

<a name="TextDatasource+removeAttachment"></a>

#### googleDriveDatasource.removeAttachment(vaultID, attachmentID) ⇒ <code>Promise</code>
Remove an attachment

**Kind**: instance method of [<code>GoogleDriveDatasource</code>](#module_Buttercup.GoogleDriveDatasource)  
**Overrides**: [<code>removeAttachment</code>](#TextDatasource+removeAttachment)  

| Param | Type | Description |
| --- | --- | --- |
| vaultID | <code>String</code> | The ID of the vault |
| attachmentID | <code>String</code> | The ID of the attachment |

<a name="TextDatasource+save"></a>

#### googleDriveDatasource.save(history, credentials) ⇒ <code>Promise.&lt;string&gt;</code>
Save archive contents with a password

**Kind**: instance method of [<code>GoogleDriveDatasource</code>](#module_Buttercup.GoogleDriveDatasource)  
**Overrides**: [<code>save</code>](#TextDatasource+save)  
**Returns**: <code>Promise.&lt;string&gt;</code> - A promise resolving with the encrypted content  

| Param | Type | Description |
| --- | --- | --- |
| history | <code>Array.&lt;String&gt;</code> | Archive history to save |
| credentials | <code>Credentials</code> | The Credentials instance to encrypt with |

<a name="TextDatasource+setContent"></a>

#### googleDriveDatasource.setContent(content) ⇒ <code>TextDatasource</code>
Set the text content

**Kind**: instance method of [<code>GoogleDriveDatasource</code>](#module_Buttercup.GoogleDriveDatasource)  
**Overrides**: [<code>setContent</code>](#TextDatasource+setContent)  
**Returns**: <code>TextDatasource</code> - Self  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>String</code> | The encrypted text content |

<a name="TextDatasource+supportsAttachments"></a>

#### googleDriveDatasource.supportsAttachments() ⇒ <code>Boolean</code>
Whether or not the datasource supports attachments

**Kind**: instance method of [<code>GoogleDriveDatasource</code>](#module_Buttercup.GoogleDriveDatasource)  
**Overrides**: [<code>supportsAttachments</code>](#TextDatasource+supportsAttachments)  
<a name="TextDatasource+supportsPasswordChange"></a>

#### googleDriveDatasource.supportsPasswordChange() ⇒ <code>Boolean</code>
Whether or not the datasource supports the changing of the master password

**Kind**: instance method of [<code>GoogleDriveDatasource</code>](#module_Buttercup.GoogleDriveDatasource)  
**Overrides**: [<code>supportsPasswordChange</code>](#TextDatasource+supportsPasswordChange)  
**Returns**: <code>Boolean</code> - True if the datasource supports password changing  
<a name="TextDatasource+supportsRemoteBypass"></a>

#### googleDriveDatasource.supportsRemoteBypass() ⇒ <code>Boolean</code>
Whether or not the datasource supports bypassing remote fetch operations
 (offline support)

**Kind**: instance method of [<code>GoogleDriveDatasource</code>](#module_Buttercup.GoogleDriveDatasource)  
**Overrides**: [<code>supportsRemoteBypass</code>](#TextDatasource+supportsRemoteBypass)  
**Returns**: <code>Boolean</code> - True if content can be set to bypass fetch operations,
 false otherwise  
<a name="module_Buttercup.MemoryDatasource"></a>

### Buttercup~MemoryDatasource ⇐ <code>TextDatasource</code>
Memory datasource for temporary storage

**Kind**: inner class of [<code>Buttercup</code>](#module_Buttercup)  
**Extends**: <code>TextDatasource</code>  

* [~MemoryDatasource](#module_Buttercup.MemoryDatasource) ⇐ <code>TextDatasource</code>
    * [new MemoryDatasource(credentials)](#new_module_Buttercup.MemoryDatasource_new)
    * [.hasContent](#TextDatasource+hasContent) : <code>Boolean</code>
    * [.getAttachment(vaultID, attachmentID, [credentials])](#TextDatasource+getAttachment) ⇒ <code>Promise.&lt;(Buffer\|ArrayBuffer)&gt;</code>
    * [.getAttachmentDetails(vaultID, attachmentID)](#TextDatasource+getAttachmentDetails) ⇒ [<code>AttachmentDetails</code>](#AttachmentDetails)
    * [.getAvailableStorage()](#TextDatasource+getAvailableStorage) ⇒ <code>Number</code> \| <code>null</code>
    * [.getTotalStorage()](#TextDatasource+getTotalStorage) ⇒ <code>Number</code> \| <code>null</code>
    * [.getID()](#TextDatasource+getID) ⇒ <code>String</code>
    * [.load(credentials)](#TextDatasource+load) ⇒ [<code>Promise.&lt;LoadedVaultData&gt;</code>](#LoadedVaultData)
    * [.putAttachment(vaultID, attachmentID, buffer, [credentials])](#TextDatasource+putAttachment) ⇒ <code>Promise</code>
    * [.removeAttachment(vaultID, attachmentID)](#TextDatasource+removeAttachment) ⇒ <code>Promise</code>
    * [.save(history, credentials)](#TextDatasource+save) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.setContent(content)](#TextDatasource+setContent) ⇒ <code>TextDatasource</code>
    * [.supportsAttachments()](#TextDatasource+supportsAttachments) ⇒ <code>Boolean</code>
    * [.supportsPasswordChange()](#TextDatasource+supportsPasswordChange) ⇒ <code>Boolean</code>
    * [.supportsRemoteBypass()](#TextDatasource+supportsRemoteBypass) ⇒ <code>Boolean</code>

<a name="new_module_Buttercup.MemoryDatasource_new"></a>

#### new MemoryDatasource(credentials)
Constructor for the datasource


| Param | Type | Description |
| --- | --- | --- |
| credentials | <code>Credentials</code> | The credentials instance with which to  use to configure the datasource |

<a name="TextDatasource+hasContent"></a>

#### memoryDatasource.hasContent : <code>Boolean</code>
Whether the datasource currently has content
Used to check if the datasource has encrypted content that can be
loaded. May be used when attempting to open a vault in offline mode.

**Kind**: instance property of [<code>MemoryDatasource</code>](#module_Buttercup.MemoryDatasource)  
**Overrides**: [<code>hasContent</code>](#TextDatasource+hasContent)  
<a name="TextDatasource+getAttachment"></a>

#### memoryDatasource.getAttachment(vaultID, attachmentID, [credentials]) ⇒ <code>Promise.&lt;(Buffer\|ArrayBuffer)&gt;</code>
Get attachment buffer
- Downloads the attachment contents into a buffer

**Kind**: instance method of [<code>MemoryDatasource</code>](#module_Buttercup.MemoryDatasource)  
**Overrides**: [<code>getAttachment</code>](#TextDatasource+getAttachment)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| vaultID | <code>String</code> |  | The ID of the vault |
| attachmentID | <code>String</code> |  | The ID of the attachment |
| [credentials] | <code>Credentials</code> | <code></code> | Credentials to decrypt  the buffer, defaults to null (no decryption) |

<a name="TextDatasource+getAttachmentDetails"></a>

#### memoryDatasource.getAttachmentDetails(vaultID, attachmentID) ⇒ [<code>AttachmentDetails</code>](#AttachmentDetails)
Get attachment details

**Kind**: instance method of [<code>MemoryDatasource</code>](#module_Buttercup.MemoryDatasource)  
**Overrides**: [<code>getAttachmentDetails</code>](#TextDatasource+getAttachmentDetails)  
**Returns**: [<code>AttachmentDetails</code>](#AttachmentDetails) - The attactment details  

| Param | Type | Description |
| --- | --- | --- |
| vaultID | <code>String</code> | The ID of the vault |
| attachmentID | <code>String</code> | The ID of the attachment |

<a name="TextDatasource+getAvailableStorage"></a>

#### memoryDatasource.getAvailableStorage() ⇒ <code>Number</code> \| <code>null</code>
Get the available storage space, in bytes

**Kind**: instance method of [<code>MemoryDatasource</code>](#module_Buttercup.MemoryDatasource)  
**Overrides**: [<code>getAvailableStorage</code>](#TextDatasource+getAvailableStorage)  
**Returns**: <code>Number</code> \| <code>null</code> - Bytes of free space, or null if not
 available  
<a name="TextDatasource+getTotalStorage"></a>

#### memoryDatasource.getTotalStorage() ⇒ <code>Number</code> \| <code>null</code>
Get the total storage space, in bytes

**Kind**: instance method of [<code>MemoryDatasource</code>](#module_Buttercup.MemoryDatasource)  
**Overrides**: [<code>getTotalStorage</code>](#TextDatasource+getTotalStorage)  
**Returns**: <code>Number</code> \| <code>null</code> - Bytes of free space, or null if not
 available  
<a name="TextDatasource+getID"></a>

#### memoryDatasource.getID() ⇒ <code>String</code>
Get the ID of the datasource
ID to uniquely identify the datasource and its parameters

**Kind**: instance method of [<code>MemoryDatasource</code>](#module_Buttercup.MemoryDatasource)  
**Overrides**: [<code>getID</code>](#TextDatasource+getID)  
**Returns**: <code>String</code> - A hasn of the datasource (unique ID)  
<a name="TextDatasource+load"></a>

#### memoryDatasource.load(credentials) ⇒ [<code>Promise.&lt;LoadedVaultData&gt;</code>](#LoadedVaultData)
Load from the stored content using a password to decrypt

**Kind**: instance method of [<code>MemoryDatasource</code>](#module_Buttercup.MemoryDatasource)  
**Overrides**: [<code>load</code>](#TextDatasource+load)  
**Returns**: [<code>Promise.&lt;LoadedVaultData&gt;</code>](#LoadedVaultData) - A promise that resolves with decrypted history  
**Throws**:

- <code>Error</code> Rejects if content is empty


| Param | Type | Description |
| --- | --- | --- |
| credentials | <code>Credentials</code> | The password or Credentials instance to decrypt with |

<a name="TextDatasource+putAttachment"></a>

#### memoryDatasource.putAttachment(vaultID, attachmentID, buffer, [credentials]) ⇒ <code>Promise</code>
Put attachment data

**Kind**: instance method of [<code>MemoryDatasource</code>](#module_Buttercup.MemoryDatasource)  
**Overrides**: [<code>putAttachment</code>](#TextDatasource+putAttachment)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| vaultID | <code>String</code> |  | The ID of the vault |
| attachmentID | <code>String</code> |  | The ID of the attachment |
| buffer | <code>Buffer</code> \| <code>ArrayBuffer</code> |  | The attachment data |
| [credentials] | <code>Credentials</code> | <code></code> | Credentials for  encrypting the buffer. If not provided, the buffer  is presumed to be in encrypted-form and will be  written as-is. |

<a name="TextDatasource+removeAttachment"></a>

#### memoryDatasource.removeAttachment(vaultID, attachmentID) ⇒ <code>Promise</code>
Remove an attachment

**Kind**: instance method of [<code>MemoryDatasource</code>](#module_Buttercup.MemoryDatasource)  
**Overrides**: [<code>removeAttachment</code>](#TextDatasource+removeAttachment)  

| Param | Type | Description |
| --- | --- | --- |
| vaultID | <code>String</code> | The ID of the vault |
| attachmentID | <code>String</code> | The ID of the attachment |

<a name="TextDatasource+save"></a>

#### memoryDatasource.save(history, credentials) ⇒ <code>Promise.&lt;string&gt;</code>
Save archive contents with a password

**Kind**: instance method of [<code>MemoryDatasource</code>](#module_Buttercup.MemoryDatasource)  
**Overrides**: [<code>save</code>](#TextDatasource+save)  
**Returns**: <code>Promise.&lt;string&gt;</code> - A promise resolving with the encrypted content  

| Param | Type | Description |
| --- | --- | --- |
| history | <code>Array.&lt;String&gt;</code> | Archive history to save |
| credentials | <code>Credentials</code> | The Credentials instance to encrypt with |

<a name="TextDatasource+setContent"></a>

#### memoryDatasource.setContent(content) ⇒ <code>TextDatasource</code>
Set the text content

**Kind**: instance method of [<code>MemoryDatasource</code>](#module_Buttercup.MemoryDatasource)  
**Overrides**: [<code>setContent</code>](#TextDatasource+setContent)  
**Returns**: <code>TextDatasource</code> - Self  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>String</code> | The encrypted text content |

<a name="TextDatasource+supportsAttachments"></a>

#### memoryDatasource.supportsAttachments() ⇒ <code>Boolean</code>
Whether or not the datasource supports attachments

**Kind**: instance method of [<code>MemoryDatasource</code>](#module_Buttercup.MemoryDatasource)  
**Overrides**: [<code>supportsAttachments</code>](#TextDatasource+supportsAttachments)  
<a name="TextDatasource+supportsPasswordChange"></a>

#### memoryDatasource.supportsPasswordChange() ⇒ <code>Boolean</code>
Whether or not the datasource supports the changing of the master password

**Kind**: instance method of [<code>MemoryDatasource</code>](#module_Buttercup.MemoryDatasource)  
**Overrides**: [<code>supportsPasswordChange</code>](#TextDatasource+supportsPasswordChange)  
**Returns**: <code>Boolean</code> - True if the datasource supports password changing  
<a name="TextDatasource+supportsRemoteBypass"></a>

#### memoryDatasource.supportsRemoteBypass() ⇒ <code>Boolean</code>
Whether or not the datasource supports bypassing remote fetch operations
 (offline support)

**Kind**: instance method of [<code>MemoryDatasource</code>](#module_Buttercup.MemoryDatasource)  
**Overrides**: [<code>supportsRemoteBypass</code>](#TextDatasource+supportsRemoteBypass)  
**Returns**: <code>Boolean</code> - True if content can be set to bypass fetch operations,
 false otherwise  
<a name="module_Buttercup.TextDatasource"></a>

### Buttercup~TextDatasource
Datasource for text input and output

**Kind**: inner class of [<code>Buttercup</code>](#module_Buttercup)  

* [~TextDatasource](#module_Buttercup.TextDatasource)
    * [new TextDatasource(credentials)](#new_module_Buttercup.TextDatasource_new)
    * [.credentials](#module_Buttercup.TextDatasource+credentials) : <code>Credentials</code>

<a name="new_module_Buttercup.TextDatasource_new"></a>

#### new TextDatasource(credentials)
Constructor for the text datasource


| Param | Type | Description |
| --- | --- | --- |
| credentials | <code>Credentials</code> | The credentials and configuration for  the datasource |

<a name="module_Buttercup.TextDatasource+credentials"></a>

#### textDatasource.credentials : <code>Credentials</code>
Datasource credentials

**Kind**: instance property of [<code>TextDatasource</code>](#module_Buttercup.TextDatasource)  
**Read only**: true  
<a name="module_Buttercup.WebDAVDatasource"></a>

### Buttercup~WebDAVDatasource ⇐ <code>TextDatasource</code>
WebDAV datasource for reading and writing remote archives

**Kind**: inner class of [<code>Buttercup</code>](#module_Buttercup)  
**Extends**: <code>TextDatasource</code>  

* [~WebDAVDatasource](#module_Buttercup.WebDAVDatasource) ⇐ <code>TextDatasource</code>
    * [new WebDAVDatasource(credentials)](#new_module_Buttercup.WebDAVDatasource_new)
    * [.hasContent](#TextDatasource+hasContent) : <code>Boolean</code>
    * [.getAttachment(vaultID, attachmentID, [credentials])](#TextDatasource+getAttachment) ⇒ <code>Promise.&lt;(Buffer\|ArrayBuffer)&gt;</code>
    * [.getAttachmentDetails(vaultID, attachmentID)](#TextDatasource+getAttachmentDetails) ⇒ [<code>AttachmentDetails</code>](#AttachmentDetails)
    * [.getAvailableStorage()](#TextDatasource+getAvailableStorage) ⇒ <code>Number</code> \| <code>null</code>
    * [.getTotalStorage()](#TextDatasource+getTotalStorage) ⇒ <code>Number</code> \| <code>null</code>
    * [.getID()](#TextDatasource+getID) ⇒ <code>String</code>
    * [.load(credentials)](#TextDatasource+load) ⇒ [<code>Promise.&lt;LoadedVaultData&gt;</code>](#LoadedVaultData)
    * [.putAttachment(vaultID, attachmentID, buffer, [credentials])](#TextDatasource+putAttachment) ⇒ <code>Promise</code>
    * [.removeAttachment(vaultID, attachmentID)](#TextDatasource+removeAttachment) ⇒ <code>Promise</code>
    * [.save(history, credentials)](#TextDatasource+save) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.setContent(content)](#TextDatasource+setContent) ⇒ <code>TextDatasource</code>
    * [.supportsAttachments()](#TextDatasource+supportsAttachments) ⇒ <code>Boolean</code>
    * [.supportsPasswordChange()](#TextDatasource+supportsPasswordChange) ⇒ <code>Boolean</code>
    * [.supportsRemoteBypass()](#TextDatasource+supportsRemoteBypass) ⇒ <code>Boolean</code>

<a name="new_module_Buttercup.WebDAVDatasource_new"></a>

#### new WebDAVDatasource(credentials)
Constructor for the datasource


| Param | Type | Description |
| --- | --- | --- |
| credentials | <code>Credentials</code> | Credentials for the datasource |

<a name="TextDatasource+hasContent"></a>

#### webDAVDatasource.hasContent : <code>Boolean</code>
Whether the datasource currently has content
Used to check if the datasource has encrypted content that can be
loaded. May be used when attempting to open a vault in offline mode.

**Kind**: instance property of [<code>WebDAVDatasource</code>](#module_Buttercup.WebDAVDatasource)  
**Overrides**: [<code>hasContent</code>](#TextDatasource+hasContent)  
<a name="TextDatasource+getAttachment"></a>

#### webDAVDatasource.getAttachment(vaultID, attachmentID, [credentials]) ⇒ <code>Promise.&lt;(Buffer\|ArrayBuffer)&gt;</code>
Get attachment buffer
- Downloads the attachment contents into a buffer

**Kind**: instance method of [<code>WebDAVDatasource</code>](#module_Buttercup.WebDAVDatasource)  
**Overrides**: [<code>getAttachment</code>](#TextDatasource+getAttachment)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| vaultID | <code>String</code> |  | The ID of the vault |
| attachmentID | <code>String</code> |  | The ID of the attachment |
| [credentials] | <code>Credentials</code> | <code></code> | Credentials to decrypt  the buffer, defaults to null (no decryption) |

<a name="TextDatasource+getAttachmentDetails"></a>

#### webDAVDatasource.getAttachmentDetails(vaultID, attachmentID) ⇒ [<code>AttachmentDetails</code>](#AttachmentDetails)
Get attachment details

**Kind**: instance method of [<code>WebDAVDatasource</code>](#module_Buttercup.WebDAVDatasource)  
**Overrides**: [<code>getAttachmentDetails</code>](#TextDatasource+getAttachmentDetails)  
**Returns**: [<code>AttachmentDetails</code>](#AttachmentDetails) - The attactment details  

| Param | Type | Description |
| --- | --- | --- |
| vaultID | <code>String</code> | The ID of the vault |
| attachmentID | <code>String</code> | The ID of the attachment |

<a name="TextDatasource+getAvailableStorage"></a>

#### webDAVDatasource.getAvailableStorage() ⇒ <code>Number</code> \| <code>null</code>
Get the available storage space, in bytes

**Kind**: instance method of [<code>WebDAVDatasource</code>](#module_Buttercup.WebDAVDatasource)  
**Overrides**: [<code>getAvailableStorage</code>](#TextDatasource+getAvailableStorage)  
**Returns**: <code>Number</code> \| <code>null</code> - Bytes of free space, or null if not
 available  
<a name="TextDatasource+getTotalStorage"></a>

#### webDAVDatasource.getTotalStorage() ⇒ <code>Number</code> \| <code>null</code>
Get the total storage space, in bytes

**Kind**: instance method of [<code>WebDAVDatasource</code>](#module_Buttercup.WebDAVDatasource)  
**Overrides**: [<code>getTotalStorage</code>](#TextDatasource+getTotalStorage)  
**Returns**: <code>Number</code> \| <code>null</code> - Bytes of free space, or null if not
 available  
<a name="TextDatasource+getID"></a>

#### webDAVDatasource.getID() ⇒ <code>String</code>
Get the ID of the datasource
ID to uniquely identify the datasource and its parameters

**Kind**: instance method of [<code>WebDAVDatasource</code>](#module_Buttercup.WebDAVDatasource)  
**Overrides**: [<code>getID</code>](#TextDatasource+getID)  
**Returns**: <code>String</code> - A hasn of the datasource (unique ID)  
<a name="TextDatasource+load"></a>

#### webDAVDatasource.load(credentials) ⇒ [<code>Promise.&lt;LoadedVaultData&gt;</code>](#LoadedVaultData)
Load from the stored content using a password to decrypt

**Kind**: instance method of [<code>WebDAVDatasource</code>](#module_Buttercup.WebDAVDatasource)  
**Overrides**: [<code>load</code>](#TextDatasource+load)  
**Returns**: [<code>Promise.&lt;LoadedVaultData&gt;</code>](#LoadedVaultData) - A promise that resolves with decrypted history  
**Throws**:

- <code>Error</code> Rejects if content is empty


| Param | Type | Description |
| --- | --- | --- |
| credentials | <code>Credentials</code> | The password or Credentials instance to decrypt with |

<a name="TextDatasource+putAttachment"></a>

#### webDAVDatasource.putAttachment(vaultID, attachmentID, buffer, [credentials]) ⇒ <code>Promise</code>
Put attachment data

**Kind**: instance method of [<code>WebDAVDatasource</code>](#module_Buttercup.WebDAVDatasource)  
**Overrides**: [<code>putAttachment</code>](#TextDatasource+putAttachment)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| vaultID | <code>String</code> |  | The ID of the vault |
| attachmentID | <code>String</code> |  | The ID of the attachment |
| buffer | <code>Buffer</code> \| <code>ArrayBuffer</code> |  | The attachment data |
| [credentials] | <code>Credentials</code> | <code></code> | Credentials for  encrypting the buffer. If not provided, the buffer  is presumed to be in encrypted-form and will be  written as-is. |

<a name="TextDatasource+removeAttachment"></a>

#### webDAVDatasource.removeAttachment(vaultID, attachmentID) ⇒ <code>Promise</code>
Remove an attachment

**Kind**: instance method of [<code>WebDAVDatasource</code>](#module_Buttercup.WebDAVDatasource)  
**Overrides**: [<code>removeAttachment</code>](#TextDatasource+removeAttachment)  

| Param | Type | Description |
| --- | --- | --- |
| vaultID | <code>String</code> | The ID of the vault |
| attachmentID | <code>String</code> | The ID of the attachment |

<a name="TextDatasource+save"></a>

#### webDAVDatasource.save(history, credentials) ⇒ <code>Promise.&lt;string&gt;</code>
Save archive contents with a password

**Kind**: instance method of [<code>WebDAVDatasource</code>](#module_Buttercup.WebDAVDatasource)  
**Overrides**: [<code>save</code>](#TextDatasource+save)  
**Returns**: <code>Promise.&lt;string&gt;</code> - A promise resolving with the encrypted content  

| Param | Type | Description |
| --- | --- | --- |
| history | <code>Array.&lt;String&gt;</code> | Archive history to save |
| credentials | <code>Credentials</code> | The Credentials instance to encrypt with |

<a name="TextDatasource+setContent"></a>

#### webDAVDatasource.setContent(content) ⇒ <code>TextDatasource</code>
Set the text content

**Kind**: instance method of [<code>WebDAVDatasource</code>](#module_Buttercup.WebDAVDatasource)  
**Overrides**: [<code>setContent</code>](#TextDatasource+setContent)  
**Returns**: <code>TextDatasource</code> - Self  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>String</code> | The encrypted text content |

<a name="TextDatasource+supportsAttachments"></a>

#### webDAVDatasource.supportsAttachments() ⇒ <code>Boolean</code>
Whether or not the datasource supports attachments

**Kind**: instance method of [<code>WebDAVDatasource</code>](#module_Buttercup.WebDAVDatasource)  
**Overrides**: [<code>supportsAttachments</code>](#TextDatasource+supportsAttachments)  
<a name="TextDatasource+supportsPasswordChange"></a>

#### webDAVDatasource.supportsPasswordChange() ⇒ <code>Boolean</code>
Whether or not the datasource supports the changing of the master password

**Kind**: instance method of [<code>WebDAVDatasource</code>](#module_Buttercup.WebDAVDatasource)  
**Overrides**: [<code>supportsPasswordChange</code>](#TextDatasource+supportsPasswordChange)  
**Returns**: <code>Boolean</code> - True if the datasource supports password changing  
<a name="TextDatasource+supportsRemoteBypass"></a>

#### webDAVDatasource.supportsRemoteBypass() ⇒ <code>Boolean</code>
Whether or not the datasource supports bypassing remote fetch operations
 (offline support)

**Kind**: instance method of [<code>WebDAVDatasource</code>](#module_Buttercup.WebDAVDatasource)  
**Overrides**: [<code>supportsRemoteBypass</code>](#TextDatasource+supportsRemoteBypass)  
**Returns**: <code>Boolean</code> - True if content can be set to bypass fetch operations,
 false otherwise  
<a name="module_Buttercup.MyButtercupClient"></a>

### Buttercup~MyButtercupClient ⇐ <code>EventEmitter</code>
My Buttercup client

**Kind**: inner class of [<code>Buttercup</code>](#module_Buttercup)  
**Extends**: <code>EventEmitter</code>  

* [~MyButtercupClient](#module_Buttercup.MyButtercupClient) ⇐ <code>EventEmitter</code>
    * [new MyButtercupClient(clientID, clientSecret, accessToken, refreshToken)](#new_module_Buttercup.MyButtercupClient_new)
    * [.accessToken](#module_Buttercup.MyButtercupClient+accessToken) : <code>String</code>
    * [.digest](#module_Buttercup.MyButtercupClient+digest) : [<code>MyButtercupDigest</code>](#MyButtercupDigest) \| <code>null</code>
    * [.refreshToken](#module_Buttercup.MyButtercupClient+refreshToken) : <code>String</code>

<a name="new_module_Buttercup.MyButtercupClient_new"></a>

#### new MyButtercupClient(clientID, clientSecret, accessToken, refreshToken)
Create a new client instance


| Param | Type | Description |
| --- | --- | --- |
| clientID | <code>String</code> | The client identifier |
| clientSecret | <code>String</code> | The client secret |
| accessToken | <code>String</code> | Access token |
| refreshToken | <code>String</code> | Refresh token |

<a name="module_Buttercup.MyButtercupClient+accessToken"></a>

#### myButtercupClient.accessToken : <code>String</code>
The current access token

**Kind**: instance property of [<code>MyButtercupClient</code>](#module_Buttercup.MyButtercupClient)  
**Read only**: true  
<a name="module_Buttercup.MyButtercupClient+digest"></a>

#### myButtercupClient.digest : [<code>MyButtercupDigest</code>](#MyButtercupDigest) \| <code>null</code>
The last client digest response

**Kind**: instance property of [<code>MyButtercupClient</code>](#module_Buttercup.MyButtercupClient)  
**Read only**: true  
<a name="module_Buttercup.MyButtercupClient+refreshToken"></a>

#### myButtercupClient.refreshToken : <code>String</code>
The refresh token

**Kind**: instance property of [<code>MyButtercupClient</code>](#module_Buttercup.MyButtercupClient)  
**Read only**: true  
<a name="module_Buttercup.MemoryStorageInterface"></a>

### Buttercup~MemoryStorageInterface ⇐ <code>StorageInterface</code>
Storage interface for memory storage

**Kind**: inner class of [<code>Buttercup</code>](#module_Buttercup)  
**Extends**: <code>StorageInterface</code>  

* [~MemoryStorageInterface](#module_Buttercup.MemoryStorageInterface) ⇐ <code>StorageInterface</code>
    * [new MemoryStorageInterface()](#new_module_Buttercup.MemoryStorageInterface_new)
    * [.getAllKeys()](#StorageInterface+getAllKeys)
    * [.getValue()](#StorageInterface+getValue)
    * [.removeKey()](#StorageInterface+removeKey)
    * [.setValue()](#StorageInterface+setValue)

<a name="new_module_Buttercup.MemoryStorageInterface_new"></a>

#### new MemoryStorageInterface()
Constructor for the memory storage

<a name="StorageInterface+getAllKeys"></a>

#### memoryStorageInterface.getAllKeys()
Get all keys as an array

**Kind**: instance method of [<code>MemoryStorageInterface</code>](#module_Buttercup.MemoryStorageInterface)  
**Overrides**: [<code>getAllKeys</code>](#StorageInterface+getAllKeys)  
<a name="StorageInterface+getValue"></a>

#### memoryStorageInterface.getValue()
Get a value for a key

**Kind**: instance method of [<code>MemoryStorageInterface</code>](#module_Buttercup.MemoryStorageInterface)  
**Overrides**: [<code>getValue</code>](#StorageInterface+getValue)  
<a name="StorageInterface+removeKey"></a>

#### memoryStorageInterface.removeKey()
Remove a value for a key

**Kind**: instance method of [<code>MemoryStorageInterface</code>](#module_Buttercup.MemoryStorageInterface)  
**Overrides**: [<code>removeKey</code>](#StorageInterface+removeKey)  
<a name="StorageInterface+setValue"></a>

#### memoryStorageInterface.setValue()
Set a value for a key

**Kind**: instance method of [<code>MemoryStorageInterface</code>](#module_Buttercup.MemoryStorageInterface)  
**Overrides**: [<code>setValue</code>](#StorageInterface+setValue)  
<a name="module_Buttercup.LocalFileDatasource"></a>

### Buttercup~LocalFileDatasource ⇐ <code>TextDatasource</code>
Local file datasource, connecting via the desktop
application proxy from the browser

**Kind**: inner class of [<code>Buttercup</code>](#module_Buttercup)  
**Extends**: <code>TextDatasource</code>  

* [~LocalFileDatasource](#module_Buttercup.LocalFileDatasource) ⇐ <code>TextDatasource</code>
    * [.hasContent](#TextDatasource+hasContent) : <code>Boolean</code>
    * [.getAttachment(vaultID, attachmentID, [credentials])](#TextDatasource+getAttachment) ⇒ <code>Promise.&lt;(Buffer\|ArrayBuffer)&gt;</code>
    * [.getAttachmentDetails(vaultID, attachmentID)](#TextDatasource+getAttachmentDetails) ⇒ [<code>AttachmentDetails</code>](#AttachmentDetails)
    * [.getAvailableStorage()](#TextDatasource+getAvailableStorage) ⇒ <code>Number</code> \| <code>null</code>
    * [.getTotalStorage()](#TextDatasource+getTotalStorage) ⇒ <code>Number</code> \| <code>null</code>
    * [.getID()](#TextDatasource+getID) ⇒ <code>String</code>
    * [.load(credentials)](#TextDatasource+load) ⇒ [<code>Promise.&lt;LoadedVaultData&gt;</code>](#LoadedVaultData)
    * [.putAttachment(vaultID, attachmentID, buffer, [credentials])](#TextDatasource+putAttachment) ⇒ <code>Promise</code>
    * [.removeAttachment(vaultID, attachmentID)](#TextDatasource+removeAttachment) ⇒ <code>Promise</code>
    * [.save(history, credentials)](#TextDatasource+save) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.setContent(content)](#TextDatasource+setContent) ⇒ <code>TextDatasource</code>
    * [.supportsAttachments()](#TextDatasource+supportsAttachments) ⇒ <code>Boolean</code>
    * [.supportsPasswordChange()](#TextDatasource+supportsPasswordChange) ⇒ <code>Boolean</code>
    * [.supportsRemoteBypass()](#TextDatasource+supportsRemoteBypass) ⇒ <code>Boolean</code>

<a name="TextDatasource+hasContent"></a>

#### localFileDatasource.hasContent : <code>Boolean</code>
Whether the datasource currently has content
Used to check if the datasource has encrypted content that can be
loaded. May be used when attempting to open a vault in offline mode.

**Kind**: instance property of [<code>LocalFileDatasource</code>](#module_Buttercup.LocalFileDatasource)  
**Overrides**: [<code>hasContent</code>](#TextDatasource+hasContent)  
<a name="TextDatasource+getAttachment"></a>

#### localFileDatasource.getAttachment(vaultID, attachmentID, [credentials]) ⇒ <code>Promise.&lt;(Buffer\|ArrayBuffer)&gt;</code>
Get attachment buffer
- Downloads the attachment contents into a buffer

**Kind**: instance method of [<code>LocalFileDatasource</code>](#module_Buttercup.LocalFileDatasource)  
**Overrides**: [<code>getAttachment</code>](#TextDatasource+getAttachment)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| vaultID | <code>String</code> |  | The ID of the vault |
| attachmentID | <code>String</code> |  | The ID of the attachment |
| [credentials] | <code>Credentials</code> | <code></code> | Credentials to decrypt  the buffer, defaults to null (no decryption) |

<a name="TextDatasource+getAttachmentDetails"></a>

#### localFileDatasource.getAttachmentDetails(vaultID, attachmentID) ⇒ [<code>AttachmentDetails</code>](#AttachmentDetails)
Get attachment details

**Kind**: instance method of [<code>LocalFileDatasource</code>](#module_Buttercup.LocalFileDatasource)  
**Overrides**: [<code>getAttachmentDetails</code>](#TextDatasource+getAttachmentDetails)  
**Returns**: [<code>AttachmentDetails</code>](#AttachmentDetails) - The attactment details  

| Param | Type | Description |
| --- | --- | --- |
| vaultID | <code>String</code> | The ID of the vault |
| attachmentID | <code>String</code> | The ID of the attachment |

<a name="TextDatasource+getAvailableStorage"></a>

#### localFileDatasource.getAvailableStorage() ⇒ <code>Number</code> \| <code>null</code>
Get the available storage space, in bytes

**Kind**: instance method of [<code>LocalFileDatasource</code>](#module_Buttercup.LocalFileDatasource)  
**Overrides**: [<code>getAvailableStorage</code>](#TextDatasource+getAvailableStorage)  
**Returns**: <code>Number</code> \| <code>null</code> - Bytes of free space, or null if not
 available  
<a name="TextDatasource+getTotalStorage"></a>

#### localFileDatasource.getTotalStorage() ⇒ <code>Number</code> \| <code>null</code>
Get the total storage space, in bytes

**Kind**: instance method of [<code>LocalFileDatasource</code>](#module_Buttercup.LocalFileDatasource)  
**Overrides**: [<code>getTotalStorage</code>](#TextDatasource+getTotalStorage)  
**Returns**: <code>Number</code> \| <code>null</code> - Bytes of free space, or null if not
 available  
<a name="TextDatasource+getID"></a>

#### localFileDatasource.getID() ⇒ <code>String</code>
Get the ID of the datasource
ID to uniquely identify the datasource and its parameters

**Kind**: instance method of [<code>LocalFileDatasource</code>](#module_Buttercup.LocalFileDatasource)  
**Overrides**: [<code>getID</code>](#TextDatasource+getID)  
**Returns**: <code>String</code> - A hasn of the datasource (unique ID)  
<a name="TextDatasource+load"></a>

#### localFileDatasource.load(credentials) ⇒ [<code>Promise.&lt;LoadedVaultData&gt;</code>](#LoadedVaultData)
Load from the stored content using a password to decrypt

**Kind**: instance method of [<code>LocalFileDatasource</code>](#module_Buttercup.LocalFileDatasource)  
**Overrides**: [<code>load</code>](#TextDatasource+load)  
**Returns**: [<code>Promise.&lt;LoadedVaultData&gt;</code>](#LoadedVaultData) - A promise that resolves with decrypted history  
**Throws**:

- <code>Error</code> Rejects if content is empty


| Param | Type | Description |
| --- | --- | --- |
| credentials | <code>Credentials</code> | The password or Credentials instance to decrypt with |

<a name="TextDatasource+putAttachment"></a>

#### localFileDatasource.putAttachment(vaultID, attachmentID, buffer, [credentials]) ⇒ <code>Promise</code>
Put attachment data

**Kind**: instance method of [<code>LocalFileDatasource</code>](#module_Buttercup.LocalFileDatasource)  
**Overrides**: [<code>putAttachment</code>](#TextDatasource+putAttachment)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| vaultID | <code>String</code> |  | The ID of the vault |
| attachmentID | <code>String</code> |  | The ID of the attachment |
| buffer | <code>Buffer</code> \| <code>ArrayBuffer</code> |  | The attachment data |
| [credentials] | <code>Credentials</code> | <code></code> | Credentials for  encrypting the buffer. If not provided, the buffer  is presumed to be in encrypted-form and will be  written as-is. |

<a name="TextDatasource+removeAttachment"></a>

#### localFileDatasource.removeAttachment(vaultID, attachmentID) ⇒ <code>Promise</code>
Remove an attachment

**Kind**: instance method of [<code>LocalFileDatasource</code>](#module_Buttercup.LocalFileDatasource)  
**Overrides**: [<code>removeAttachment</code>](#TextDatasource+removeAttachment)  

| Param | Type | Description |
| --- | --- | --- |
| vaultID | <code>String</code> | The ID of the vault |
| attachmentID | <code>String</code> | The ID of the attachment |

<a name="TextDatasource+save"></a>

#### localFileDatasource.save(history, credentials) ⇒ <code>Promise.&lt;string&gt;</code>
Save archive contents with a password

**Kind**: instance method of [<code>LocalFileDatasource</code>](#module_Buttercup.LocalFileDatasource)  
**Overrides**: [<code>save</code>](#TextDatasource+save)  
**Returns**: <code>Promise.&lt;string&gt;</code> - A promise resolving with the encrypted content  

| Param | Type | Description |
| --- | --- | --- |
| history | <code>Array.&lt;String&gt;</code> | Archive history to save |
| credentials | <code>Credentials</code> | The Credentials instance to encrypt with |

<a name="TextDatasource+setContent"></a>

#### localFileDatasource.setContent(content) ⇒ <code>TextDatasource</code>
Set the text content

**Kind**: instance method of [<code>LocalFileDatasource</code>](#module_Buttercup.LocalFileDatasource)  
**Overrides**: [<code>setContent</code>](#TextDatasource+setContent)  
**Returns**: <code>TextDatasource</code> - Self  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>String</code> | The encrypted text content |

<a name="TextDatasource+supportsAttachments"></a>

#### localFileDatasource.supportsAttachments() ⇒ <code>Boolean</code>
Whether or not the datasource supports attachments

**Kind**: instance method of [<code>LocalFileDatasource</code>](#module_Buttercup.LocalFileDatasource)  
**Overrides**: [<code>supportsAttachments</code>](#TextDatasource+supportsAttachments)  
<a name="TextDatasource+supportsPasswordChange"></a>

#### localFileDatasource.supportsPasswordChange() ⇒ <code>Boolean</code>
Whether or not the datasource supports the changing of the master password

**Kind**: instance method of [<code>LocalFileDatasource</code>](#module_Buttercup.LocalFileDatasource)  
**Overrides**: [<code>supportsPasswordChange</code>](#TextDatasource+supportsPasswordChange)  
**Returns**: <code>Boolean</code> - True if the datasource supports password changing  
<a name="TextDatasource+supportsRemoteBypass"></a>

#### localFileDatasource.supportsRemoteBypass() ⇒ <code>Boolean</code>
Whether or not the datasource supports bypassing remote fetch operations
 (offline support)

**Kind**: instance method of [<code>LocalFileDatasource</code>](#module_Buttercup.LocalFileDatasource)  
**Overrides**: [<code>supportsRemoteBypass</code>](#TextDatasource+supportsRemoteBypass)  
**Returns**: <code>Boolean</code> - True if content can be set to bypass fetch operations,
 false otherwise  
<a name="VaultComparator"></a>

## VaultComparator
Vault comparison class

**Kind**: global class  

* [VaultComparator](#VaultComparator)
    * [new VaultComparator(originalVault, secondaryVault)](#new_VaultComparator_new)
    * [.calculateDifferences()](#VaultComparator+calculateDifferences) ⇒ <code>Object</code> \| <code>null</code>
    * [.vaultsDiffer()](#VaultComparator+vaultsDiffer) ⇒ <code>Boolean</code>

<a name="new_VaultComparator_new"></a>

### new VaultComparator(originalVault, secondaryVault)
Constructor for the vault comparator


| Param | Type | Description |
| --- | --- | --- |
| originalVault | <code>Vault</code> | The primary vault |
| secondaryVault | <code>Vault</code> | The secondary vault |

<a name="VaultComparator+calculateDifferences"></a>

### vaultComparator.calculateDifferences() ⇒ <code>Object</code> \| <code>null</code>
Calculate the differences, in commands, between the two vaults

**Kind**: instance method of [<code>VaultComparator</code>](#VaultComparator)  
**Returns**: <code>Object</code> \| <code>null</code> - Returns null if no common base
 is found, or the command differences as two arrays  
<a name="VaultComparator+vaultsDiffer"></a>

### vaultComparator.vaultsDiffer() ⇒ <code>Boolean</code>
Check if the current vaults differ

**Kind**: instance method of [<code>VaultComparator</code>](#VaultComparator)  
**Returns**: <code>Boolean</code> - True if the vaults are different  
<a name="VaultItem"></a>

## VaultItem
Base vault member class (for Entry, Group etc.)

**Kind**: global class  

* [VaultItem](#VaultItem)
    * [new VaultItem(vault, source)](#new_VaultItem_new)
    * _instance_
        * [.id](#VaultItem+id) : <code>String</code>
        * [.permissions](#VaultItem+permissions) : <code>Array.&lt;String&gt;</code>
        * [.vault](#VaultItem+vault) : <code>Vault</code>
        * [.grantPermission(perm)](#VaultItem+grantPermission)
        * [.hasPermission(perm)](#VaultItem+hasPermission) ⇒ <code>Boolean</code>
        * [.revokeAllPermissions()](#VaultItem+revokeAllPermissions)
        * [.revokePermission(perm)](#VaultItem+revokePermission)
        * [._cleanUp()](#VaultItem+_cleanUp)
    * _static_
        * [._vault](#VaultItem._vault)

<a name="new_VaultItem_new"></a>

### new VaultItem(vault, source)
Constructor for the vault member base class


| Param | Type | Description |
| --- | --- | --- |
| vault | <code>Vault</code> | Vault reference |
| source | <code>Object</code> | Remote source object reference |

<a name="VaultItem+id"></a>

### vaultItem.id : <code>String</code>
The ID of the entry or group

**Kind**: instance property of [<code>VaultItem</code>](#VaultItem)  
**Read only**: true  
<a name="VaultItem+permissions"></a>

### vaultItem.permissions : <code>Array.&lt;String&gt;</code>
The current granted permissions

**Kind**: instance property of [<code>VaultItem</code>](#VaultItem)  
<a name="VaultItem+vault"></a>

### vaultItem.vault : <code>Vault</code>
The vault this item belongs to

**Kind**: instance property of [<code>VaultItem</code>](#VaultItem)  
**Read only**: true  
<a name="VaultItem+grantPermission"></a>

### vaultItem.grantPermission(perm)
Grant a new permission to the member

**Kind**: instance method of [<code>VaultItem</code>](#VaultItem)  

| Param | Type | Description |
| --- | --- | --- |
| perm | <code>String</code> | The permission to grant |

<a name="VaultItem+hasPermission"></a>

### vaultItem.hasPermission(perm) ⇒ <code>Boolean</code>
Check if the member has a permission

**Kind**: instance method of [<code>VaultItem</code>](#VaultItem)  

| Param | Type | Description |
| --- | --- | --- |
| perm | <code>String</code> | The permission to check for |

<a name="VaultItem+revokeAllPermissions"></a>

### vaultItem.revokeAllPermissions()
Revoke all permissions

**Kind**: instance method of [<code>VaultItem</code>](#VaultItem)  
<a name="VaultItem+revokePermission"></a>

### vaultItem.revokePermission(perm)
Revoke a single permission

**Kind**: instance method of [<code>VaultItem</code>](#VaultItem)  

| Param | Type | Description |
| --- | --- | --- |
| perm | <code>String</code> | The permission to revoke |

<a name="VaultItem+_cleanUp"></a>

### vaultItem.\_cleanUp()
Clean up all of the data in the vault item

**Kind**: instance method of [<code>VaultItem</code>](#VaultItem)  
**Access**: protected  
<a name="VaultItem._vault"></a>

### VaultItem.\_vault
Reference to the containing vault

**Kind**: static property of [<code>VaultItem</code>](#VaultItem)  
**Access**: protected  
<a name="Flattener"></a>

## Flattener
Flattener class for flattening archive history sets

**Kind**: global class  

* [Flattener](#Flattener)
    * _instance_
        * [.canBeFlattened()](#Flattener+canBeFlattened) ⇒ <code>Boolean</code>
        * [.flatten([force])](#Flattener+flatten) ⇒ <code>Boolean</code>
    * _static_
        * [.FLATTENING_MIN_LINES](#Flattener.FLATTENING_MIN_LINES) : <code>Number</code>
        * [.PRESERVE_LINES](#Flattener.PRESERVE_LINES) : <code>Number</code>

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

**Kind**: static property of [<code>Flattener</code>](#Flattener)  
<a name="Flattener.PRESERVE_LINES"></a>

### Flattener.PRESERVE\_LINES : <code>Number</code>
Number of lines to preserve (most recent)

**Kind**: static property of [<code>Flattener</code>](#Flattener)  
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
| target | <code>Array.&lt;Archive&gt;</code> \| <code>Archive</code> | The archive or archives to search |

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
**Overrides**: [<code>getAllKeys</code>](#StorageInterface+getAllKeys)  
**Returns**: <code>Promise.&lt;Array.&lt;String&gt;&gt;</code> - A promise that resolves with an array of keys  
<a name="LocalStorageInterface+getValue"></a>

### localStorageInterface.getValue(name) ⇒ <code>Promise.&lt;String&gt;</code>
Get the value of a key

**Kind**: instance method of [<code>LocalStorageInterface</code>](#LocalStorageInterface)  
**Overrides**: [<code>getValue</code>](#StorageInterface+getValue)  
**Returns**: <code>Promise.&lt;String&gt;</code> - A promise that resolves with the value  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The key name |

<a name="LocalStorageInterface+removeKey"></a>

### localStorageInterface.removeKey(name) ⇒ <code>Promise</code>
Remove a key

**Kind**: instance method of [<code>LocalStorageInterface</code>](#LocalStorageInterface)  
**Overrides**: [<code>removeKey</code>](#StorageInterface+removeKey)  
**Returns**: <code>Promise</code> - A promise that resolves when the removal has completed  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The key name |

<a name="LocalStorageInterface+setValue"></a>

### localStorageInterface.setValue(name, value) ⇒ <code>Promise</code>
Set the value for a key

**Kind**: instance method of [<code>LocalStorageInterface</code>](#LocalStorageInterface)  
**Overrides**: [<code>setValue</code>](#StorageInterface+setValue)  
**Returns**: <code>Promise</code> - A promise that resolves when the value is set  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The key name |
| value | <code>String</code> | The value to set |

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

<a name="createAppEnv"></a>

## createAppEnv() ⇒ [<code>AppEnv</code>](#AppEnv)
Create a new application environment

**Kind**: global function  
<a name="compress"></a>

## compress(text) ⇒ <code>String</code>
Compress text using GZIP

**Kind**: global function  
**Returns**: <code>String</code> - Compressed text  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | The text to compress |

<a name="decompress"></a>

## decompress(text) ⇒ <code>String</code>
Decompress a compressed string (GZIP)

**Kind**: global function  
**Returns**: <code>String</code> - Decompressed text  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | The compressed text |

<a name="compress"></a>

## compress(text) ⇒ <code>String</code>
Compress text using GZIP

**Kind**: global function  
**Returns**: <code>String</code> - Compressed text  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | The text to compress |

<a name="decompress"></a>

## decompress(text) ⇒ <code>String</code>
Decompress a compressed string (GZIP)

**Kind**: global function  
**Returns**: <code>String</code> - Decompressed text  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | The compressed text |

<a name="hashVaultFacade"></a>

## ~~hashVaultFacade(vaultFacade) ⇒ <code>String</code>~~
***Deprecated***

Generate a hash of a vault facade (useful for detecting
 if the vault differs from another copy)

**Kind**: global function  
**Returns**: <code>String</code> - Hash string  

| Param | Type | Description |
| --- | --- | --- |
| vaultFacade | [<code>VaultFacade</code>](#VaultFacade) | A facade instance |

<a name="getEntryValue"></a>

## ~~getEntryValue(entry, propertyType, name) ⇒ <code>String</code>~~
***Deprecated***

Get a value on an entry for a specific property type

**Kind**: global function  
**Returns**: <code>String</code> - The property value  
**Throws**:

- <code>Error</code> Throws for unknown property types


| Param | Type | Description |
| --- | --- | --- |
| entry | <code>Entry</code> | The entry instance |
| propertyType | <code>String</code> | The type of entry property (property/attribute) |
| name | <code>String</code> | The property name |

<a name="getEntryValueType"></a>

## getEntryValueType(entry, propertyName) ⇒ <code>String</code>
Get the entry value type

**Kind**: global function  
**Returns**: <code>String</code> - The entry value type (returns default "text"
 if entry not specified)  

| Param | Type | Description |
| --- | --- | --- |
| entry | <code>Entry</code> \| <code>null</code> | Entry instance |
| propertyName | <code>String</code> | The entry property name |

<a name="idSignifiesNew"></a>

## idSignifiesNew(id) ⇒ <code>Boolean</code>
Check if an ID signifies a new instance and not an
 existing one

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> \| <code>Number</code> | The ID to check |

<a name="setEntryValueType"></a>

## setEntryValueType(entry, propertyName, valueType)
Set the value type attribute of an entry

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| entry | <code>Entry</code> | Entry instance |
| propertyName | <code>String</code> | The property name |
| valueType | <code>String</code> | The value type |

<a name="getEntriesFacades"></a>

## getEntriesFacades(vault) ⇒ [<code>Array.&lt;EntryFacade&gt;</code>](#EntryFacade)
Get all entry facades for a vault

**Kind**: global function  
**Returns**: [<code>Array.&lt;EntryFacade&gt;</code>](#EntryFacade) - An array of entry facades  

| Param | Type | Description |
| --- | --- | --- |
| vault | <code>Vault</code> | A vault instance |

<a name="getGroupEntriesFacades"></a>

## getGroupEntriesFacades(entryCollection, groupID) ⇒ [<code>Array.&lt;EntryFacade&gt;</code>](#EntryFacade)
Convert an array of entries into an array of facades

**Kind**: global function  
**Returns**: [<code>Array.&lt;EntryFacade&gt;</code>](#EntryFacade) - An array of entry facades  

| Param | Type | Description |
| --- | --- | --- |
| entryCollection | <code>Array.&lt;Entry&gt;</code> | An array of entries |
| groupID | <code>String</code> | The parent group ID |

<a name="getGroupsFacades"></a>

## getGroupsFacades(groupCollection, [parentID]) ⇒ [<code>Array.&lt;GroupFacade&gt;</code>](#GroupFacade)
Convert an array of groups into an array of facades

**Kind**: global function  
**Returns**: [<code>Array.&lt;GroupFacade&gt;</code>](#GroupFacade) - An array of group facades  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| groupCollection | <code>Array.&lt;Group&gt;</code> |  | An array of groups |
| [parentID] | <code>String</code> | <code>0</code> | The parent group ID (defaults to root) |

<a name="describeVaultDataset"></a>

## describeVaultDataset(dataset, parentGroupID) ⇒ <code>Array.&lt;String&gt;</code>
Describe a vault dataset - to history commands

**Kind**: global function  
**Returns**: <code>Array.&lt;String&gt;</code> - An array of commands  

| Param | Type | Description |
| --- | --- | --- |
| dataset | <code>Object</code> | The vault dataset |
| parentGroupID | <code>String</code> | The ID of the parent group |

<a name="getFormat"></a>

## getFormat() ⇒ <code>String</code>
Get the current format

**Kind**: global function  
**Returns**: <code>String</code> - The format  
<a name="getSignature"></a>

## getSignature() ⇒ <code>String</code>
Get the current signature

**Kind**: global function  
**Returns**: <code>String</code> - The signature  
<a name="hasValidSignature"></a>

## hasValidSignature(text) ⇒ <code>Boolean</code>
Detect if a string has a valid signature

**Kind**: global function  
**Returns**: <code>Boolean</code> - True if a valid signature is detected  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | The text to check |

<a name="sign"></a>

## sign(text) ⇒ <code>String</code>
Sign some text

**Kind**: global function  
**Returns**: <code>String</code> - The signed text  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | The text to sign |

<a name="stripSignature"></a>

## stripSignature(text) ⇒ <code>String</code>
Strip the signature from some text

**Kind**: global function  
**Returns**: <code>String</code> - The text with the signature removed  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | The text to strip the signature from |

<a name="vaultContentsEncrypted"></a>

## vaultContentsEncrypted(contents) ⇒ <code>Boolean</code>
Check if vault contents are in encrypted form

**Kind**: global function  
**Returns**: <code>Boolean</code> - True if encrypted, false otherwise  

| Param | Type | Description |
| --- | --- | --- |
| contents | <code>String</code> | The vault contents |

<a name="extractCommandComponents"></a>

## extractCommandComponents(command) ⇒ <code>Array.&lt;String&gt;</code>
Extract command components from a string

**Kind**: global function  
**Returns**: <code>Array.&lt;String&gt;</code> - The separated parts  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>String</code> | The command to extract from |

<a name="generateEntryHistoryItem"></a>

## generateEntryHistoryItem(property, propertyType, originalValue, newValue) ⇒ [<code>EntryHistoryItem</code>](#EntryHistoryItem)
Generate a new entry history item

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| property | <code>String</code> |  | The property/attribute name |
| propertyType | <code>String</code> |  | Either "property" or "attribute" |
| originalValue | <code>String</code> \| <code>null</code> | <code></code> | The original value or null if it did not exist  before this change |
| newValue | <code>String</code> \| <code>null</code> | <code></code> | The new value or null if it was deleted |

<a name="stripDestructiveCommands"></a>

## stripDestructiveCommands(history) ⇒ <code>Array.&lt;String&gt;</code>
Strip destructive commands from a history collection

**Kind**: global function  
**Returns**: <code>Array.&lt;String&gt;</code> - The history minus any destructive commands  

| Param | Type | Description |
| --- | --- | --- |
| history | <code>Array.&lt;String&gt;</code> | The history |

<a name="generateNewUpdateID"></a>

## generateNewUpdateID() ⇒ <code>Number</code>
Generate a new update ID

**Kind**: global function  
**Returns**: <code>Number</code> - A randomly generated ID  
<a name="findEntriesByCheck"></a>

## findEntriesByCheck(groups, compareFn) ⇒ <code>Array.&lt;Entry&gt;</code>
Find entry instances by filtering with a compare function

**Kind**: global function  
**Returns**: <code>Array.&lt;Entry&gt;</code> - An array of found entries  

| Param | Type | Description |
| --- | --- | --- |
| groups | <code>Array.&lt;Group&gt;</code> | The groups to check in |
| compareFn | <code>function</code> | The callback comparison function, return true to keep and false  to strip |

<a name="flattenEntries"></a>

## flattenEntries(archives) ⇒ [<code>Array.&lt;EntrySearchInfo&gt;</code>](#EntrySearchInfo)
Flatten entries into a searchable structure

**Kind**: global function  
**Returns**: [<code>Array.&lt;EntrySearchInfo&gt;</code>](#EntrySearchInfo) - An array of searchable objects  

| Param | Type | Description |
| --- | --- | --- |
| archives | <code>Array.&lt;Archive&gt;</code> | An array of archives |

<a name="findGroupsByCheck"></a>

## findGroupsByCheck(groups, compareFn) ⇒ <code>Array.&lt;Group&gt;</code>
Find group instances within groups that satisfy some check

**Kind**: global function  
**Returns**: <code>Array.&lt;Group&gt;</code> - An array of found groups  

| Param | Type | Description |
| --- | --- | --- |
| groups | <code>Array.&lt;Group&gt;</code> | The groups to check within |
| compareFn | <code>function</code> | A comparision function - return true to keep, false to strip |

<a name="decodeStringValue"></a>

## decodeStringValue(value) ⇒ <code>String</code>
Decode an encoded property value

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

<a name="isValidProperty"></a>

## isValidProperty(name) ⇒ <code>Boolean</code>
Check if a property name is valid

**Kind**: global function  
**Returns**: <code>Boolean</code> - True if the name is valid  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name to check |

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

<a name="moveGroupBetweenVaults"></a>

## moveGroupBetweenVaults(movingGroup, targetGroup)
Move a group between archives

**Kind**: global function  
**Throws**:

- <code>Error</code> Throws if the remote type is not recognised


| Param | Type | Description |
| --- | --- | --- |
| movingGroup | <code>Group</code> | The group to move |
| targetGroup | <code>Group</code> \| <code>Vault</code> | The group to move to |

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

<a name="AttachmentDetails"></a>

## AttachmentDetails : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The attachment ID |
| name | <code>String</code> | The name of the file |
| type | <code>String</code> | The MIME type |
| size | <code>Number</code> | The size of the file, before encryption |

<a name="VaultManagerOptions"></a>

## VaultManagerOptions : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [autoUpdate] | <code>Boolean</code> | Whether or not to auto update unlocked vaults |
| [autoUpdateDelay] | <code>Number</code> | Delay in milliseconds between auto-update  checks |
| [cacheStorage] | <code>StorageInterface</code> | Storage adapter for storing  cached vault contents for offline access |
| [sourceStorage] | <code>StorageInterface</code> | Storage adapter for storing  managed vault details so that they can be rehydrated upon startup |

<a name="AddSourceOptions"></a>

## AddSourceOptions : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [order] | <code>Number</code> | Optional order override |

<a name="RegisterDatasourcePostProcessorResult"></a>

## RegisterDatasourcePostProcessorResult : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| remove | <code>function</code> | Function to call to remove the handler |

<a name="AttachmentDetails"></a>

## AttachmentDetails : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The attachment ID |
| vaultID | <code>String</code> | The vault ID |
| name | <code>String</code> | Base filename |
| filename | <code>String</code> | Full filename and path |
| size | <code>Number</code> | Size in bytes (0 if invalid) |
| mime | <code>String</code> \| <code>null</code> | MIME type if available |

<a name="LoadedVaultData"></a>

## LoadedVaultData : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| Format | <code>VaultFormat</code> | The vault format class that was detected  when reading encrypted vault contents |
| history | <code>Array.&lt;String&gt;</code> | Decrypted vault data |

<a name="AppEnv"></a>

## AppEnv : <code>Object</code>
**Kind**: global typedef  

* [AppEnv](#AppEnv) : <code>Object</code>
    * [.getProperty](#AppEnv.getProperty) ⇒ <code>\*</code>
    * [.hasProperty](#AppEnv.hasProperty) ⇒ <code>Boolean</code>
    * [.setProperties](#AppEnv.setProperties)
    * [.setProperty](#AppEnv.setProperty)

<a name="AppEnv.getProperty"></a>

### AppEnv.getProperty ⇒ <code>\*</code>
Get a property from the environment

**Kind**: static property of [<code>AppEnv</code>](#AppEnv)  
**this**: [<code>AppEnvIntPrv</code>](#AppEnvIntPrv)  

| Param | Type | Description |
| --- | --- | --- |
| propertyName | <code>String</code> | The property to fetch |
| [options] | [<code>GetPropertyOptions</code>](#GetPropertyOptions) |  |

<a name="AppEnv.hasProperty"></a>

### AppEnv.hasProperty ⇒ <code>Boolean</code>
Detect if the environment has a property set

**Kind**: static property of [<code>AppEnv</code>](#AppEnv)  
**Returns**: <code>Boolean</code> - True if the property has been set  
**this**: [<code>AppEnvIntPrv</code>](#AppEnvIntPrv)  

| Param | Type | Description |
| --- | --- | --- |
| propertyName | <code>String</code> | The property to check |

<a name="AppEnv.setProperties"></a>

### AppEnv.setProperties
Set several properties on the environment

**Kind**: static property of [<code>AppEnv</code>](#AppEnv)  
**this**: [<code>AppEnvIntPrv</code>](#AppEnvIntPrv)  
**See**: setProperty  

| Param | Type | Description |
| --- | --- | --- |
| propertyList | <code>Object.&lt;String, (function()\|\*)&gt;</code> | The items to set |

<a name="AppEnv.setProperty"></a>

### AppEnv.setProperty
Set a property on the environment

**Kind**: static property of [<code>AppEnv</code>](#AppEnv)  
**this**: [<code>AppEnvIntPrv</code>](#AppEnvIntPrv)  

| Param | Type | Description |
| --- | --- | --- |
| propertyName | <code>String</code> | The property to set |
| propertyValue | <code>function</code> \| <code>\*</code> | The value to set |

<a name="AppEnvIntPrv"></a>

## AppEnvIntPrv : <code>Object</code>
Internal private API

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| properties | <code>Object</code> | Index of set environment properties |

<a name="GetPropertyOptions"></a>

## GetPropertyOptions : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [defaultValue] | <code>\*</code> | The default value to return (default: null) |
| [failIfNotExist] | <code>Boolean</code> | Fail if the property doesn't exist (default: true) |

<a name="EntryHistoryItem"></a>

## EntryHistoryItem : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| property | <code>String</code> | The property/attribute name |
| propertyType | <code>String</code> | Either "property" or "attribute" |
| originalValue | <code>String</code> \| <code>null</code> | The original value or null if it did not exist  before this change |
| newValue | <code>String</code> \| <code>null</code> | The new value or null if it was deleted |

<a name="EntryFacade"></a>

## EntryFacade : <code>Object</code>
Entry facade for data input

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The entry ID |
| type | <code>String</code> | The type of the facade |
| fields | [<code>Array.&lt;EntryFacadeField&gt;</code>](#EntryFacadeField) | An array of fields |
| parentID | <code>String</code> | The parent group ID |
| _history | [<code>Array.&lt;EntryHistoryItem&gt;</code>](#EntryHistoryItem) | Array of changes for all properties of  the entry |

<a name="CreateEntryFacadeOptions"></a>

## CreateEntryFacadeOptions : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [type] | <code>String</code> | Optionally override the created facade type |

<a name="FlagSpecification"></a>

## FlagSpecification : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| title | <code>String</code> | The title of the entry type |
| slug | <code>String</code> | The slug of the entry type |

<a name="EntryFacadeFieldFormattingSegment"></a>

## EntryFacadeFieldFormattingSegment : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [char] | <code>RegExp</code> | A character to match with a regular expression |
| [repeat] | <code>Number</code> | Number of times to repeat the character match (required for `char`) |
| [exactly] | <code>String</code> | The exact character match (operates in opposition to `char`) |

<a name="EntryFacadeFieldFormatting"></a>

## EntryFacadeFieldFormatting : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [format] | [<code>Array.&lt;EntryFacadeFieldFormattingSegment&gt;</code>](#EntryFacadeFieldFormattingSegment) | The segmented formatting of the value |
| [placeholder] | <code>String</code> | Optional placeholder for the input (ties in to `format`) |
| options | <code>Object</code> \| <code>Array</code> | Options for a dropdown: either an array of option values or an object  (key:value) of values and titles |
| [defaultOption] | <code>String</code> | The default option value if none set |

<a name="EntryFacadeField"></a>

## EntryFacadeField : <code>Object</code>
Entry facade data field

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | A randomly generated ID (UUID) for identifying this field during editing |
| title | <code>String</code> | The user-friendly title of the field |
| propertyType | <code>String</code> | The type of data to map back to on the Entry instance (property/attribute) |
| property | <code>String</code> | The property name within the field type of the Entry instance |
| value | <code>String</code> | The value of the property (read/write) |
| [valueType] | <code>String</code> | The type of value (rendering) (null for attributes) |
| formatting | [<code>EntryFacadeFieldFormatting</code>](#EntryFacadeFieldFormatting) \| <code>Boolean</code> | Vendor formatting options object, or false if no formatting necessary |
| removeable | <code>Boolean</code> | Whether or not the field can be removed or have its key changed |

<a name="VaultFacade"></a>

## VaultFacade : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | The facade type: "vault" |
| id | <code>String</code> | The vault ID |
| attributes | <code>Object</code> | A key/value list of all the vault attributes |
| groups | [<code>Array.&lt;GroupFacade&gt;</code>](#GroupFacade) | An array of group facades |
| entries | [<code>Array.&lt;EntryFacade&gt;</code>](#EntryFacade) | An array of entry facades |
| _tag | <code>String</code> | The UUID tag for the generation of the facade |

<a name="GroupFacade"></a>

## GroupFacade : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | The facade type: "group" |
| id | <code>String</code> \| <code>null</code> | The group ID. Will be set to null if  the group is a new one |
| title | <code>String</code> | The group title |
| attributes | <code>Object</code> | A key/value list of group attributes |
| parentID | <code>String</code> \| <code>null</code> | The parent group ID. Set to "0" if  it is to be created in the root. |

<a name="VaultInsights"></a>

## VaultInsights : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [avgPassLen] | <code>Number</code> | Average password length |
| [entries] | <code>Number</code> | Number of entries in the vault |
| [groups] | <code>Number</code> | Number of groups in the vault |
| [longPassLen] | <code>Number</code> | Longest password length |
| [shortPassLen] | <code>Number</code> | Shortest password length |
| [trashEntries] | <code>Number</code> | Number of entries in trash |
| [trashGroups] | <code>Number</code> | Number of groups in trash |

<a name="Insights"></a>

## Insights : [<code>VaultInsights</code>](#VaultInsights)
**Kind**: global typedef  
<a name="EntryHistoryItem"></a>

## EntryHistoryItem : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| property | <code>String</code> | The property/attribute name |
| propertyType | <code>String</code> | Either "property" or "attribute" |
| originalValue | <code>String</code> \| <code>null</code> | The original value or null if it did not exist  before this change |
| newValue | <code>String</code> \| <code>null</code> | The new value or null if it was deleted |

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

<a name="EntrySearchInfo"></a>

## EntrySearchInfo : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| entry | <code>Entry</code> | The entry |
| archive | <code>Archive</code> | The associated archive |

<a name="FoundGroupResult"></a>

## FoundGroupResult : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| group | <code>Object</code> | The found group dataset |
| index | <code>Number</code> | The index the group was located at |

