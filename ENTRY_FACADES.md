# Entry facades

Entries can come in different types (website logins, SSH keys, credit cards etc.), and facades help facilitate dynamic rendering of input fields for various Buttercup applications. A facade is an object that looks like the following:

```javascript
{
    type: "website",
    fields: [
        {
            title: "Title",
            field: "property",
            property: "title",
            value: "My sample entry",
            valueType: "text",
            secret: false,
            multiline: false,
            formatting: false
        },
        {
            title: "Username",
            field: "property",
            property: "username",
            value: "user@system.org",
            valueType: "text",
            secret: false,
            multiline: false,
            formatting: false
        },
        {
            title: "Password",
            field: "property",
            property: "password",
            value: "sI83.B19-z$",
            valueType: "password",
            secret: true,
            multiline: false,
            formatting: false
        },
        {
            title: "URL",
            field: "meta",
            property: "url",
            value: "https://signin.system.org",
            valueType: "text",
            secret: false,
            multiline: false,
            formatting: false
        }
    ]
}
```

This facade object allows other applications to easily and predictably edit entries in a dynamic nature. These facades can be generated on entries by using code like the following:

```javascript
const { createEntryFacade } = require("buttercup");

const facade = createEntryFacade(myEntry);
```

After editing a facade, it can be applied to an entry by using code like the following:

```javascript
const { consumeEntryFacade } = require("buttercup");

consumeEntryFacade(myEntry, facade);
```

## Property Value Types

All Buttercup entry **properties** have _value types_. A value type defines what kind of value the UI should believe the property stores, and this can change how the user is able to interact with the property value.

_Attributes cannot have value types._

While generating a facade for an entry, you may notice some ambiguity between a property's `valueType` value and the corresponding attribute field also storing the property's value type. This is internal to how Buttercup functions, and a helper function is made available to help you **set a new value type for a property within a facade**:

```typescript
import { setEntryFacadePropertyValueType } from "buttercup";

setEntryFacadePropertyValueType(facade, "secret-property", "password");
```
