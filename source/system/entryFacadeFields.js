const {
    createFieldDescriptor,
    getEntryValue
} = require("../tools/entry.js");

function createBaseFields(entry) {
    return [
        createFieldDescriptor(
            entry,
            "Title",
            "property",
            "title"
        )
    ];
}

function createLoginFields(entry) {
    return [
        ...createBaseFields(entry),
        createFieldDescriptor(
            entry,
            "Username",
            "property",
            "username"
        ),
        createFieldDescriptor(
            entry,
            "Password",
            "property",
            "password",
            { secret: true }
        )
    ];
}

function createSSHKeyFields(entry) {
    return [
        ...createBaseFields(entry),
        createFieldDescriptor(
            entry,
            "Public key",
            "meta",
            "publicKey"
        ),
        createFieldDescriptor(
            entry,
            "Private key",
            "meta",
            "privateKey",
            { multiline: true }
        )
    ];
}

function createWebsiteFields(entry) {
    return [
        ...createLoginFields(entry),
        createFieldDescriptor(
            entry,
            "URL",
            "meta",
            "url"
        )
    ];
}

module.exports = {
    login: createLoginFields,
    ssh_key: createSSHKeyFields,
    website: createWebsiteFields
};
