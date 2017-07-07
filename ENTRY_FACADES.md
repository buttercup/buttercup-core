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
            secret: false,
            multiline: false,
            formatting: false
        },
        {
            title: "Username",
            field: "property",
            property: "username",
            value: "user@system.org",
            secret: false,
            multiline: false,
            formatting: false
        },
        {
            title: "Password",
            field: "property",
            property: "password",
            value: "sI83.B19-z$",
            secret: true,
            multiline: false,
            formatting: false
        },
        {
            title: "URL",
            field: "meta",
            property: "url",
            value: "https://signin.system.org",
            secret: false,
            multiline: false,
            formatting: false
        }
    ]
}
```

This facade object allows other applications to easily and predictably edit entries in a dynamic nature. These facades can be generated on entries by using code like the following:

```javascript
const { createEntryFacade } = require("buttercup").entryFacade;

const facade = createEntryFacade(myEntry);
```

After editing a facade, it can be applied to an entry by using code like the following:

```javascript
const { consumeEntryFacade } = require("buttercup").entryFacade;

consumeEntryFacade(myEntry, facade);
```
