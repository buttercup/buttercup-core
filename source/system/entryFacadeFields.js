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

function createCreditCardFields(entry) {
    return [
        ...createBaseFields(entry),
        createFieldDescriptor(
            entry,
            "Card Holder",
            "property",
            "username"
        ),
        createFieldDescriptor(
            entry,
            "Card Number",
            "property",
            "password",
            {
                formatting: {
                    placeholder: "XXXX-XXXX-XXXX-XXXX",
                    vendor: {
                        delimiter: "-",
                        blocks: [4, 4, 4, 4],
                        numericOnly: true
                    }
                }
            }
        ),
        createFieldDescriptor(
            entry,
            "Card Type",
            "meta",
            "type"
        ),
        createFieldDescriptor(
            entry,
            "CVV",
            "meta",
            "cvv",
            {
                maxLength: 4
            }
        ),
        createFieldDescriptor(
            entry,
            "Valid From",
            "meta",
            "valid_from",
            {
                formatting: {
                    placeholder: "MM/YYYY",
                    vendor: {
                        delimiter: "/",
                        blocks: [2, 4],
                        numericOnly: true
                    }
                },
                maxLength:
            }
        ),
        createFieldDescriptor(
            entry,
            "Expiry",
            "meta",
            "expiry",
            {
                formatting: {
                    placeholder: "MM/YYYY",
                    vendor: {
                        delimiter: "/",
                        blocks: [2, 4],
                        numericOnly: true
                    }
                }
            }
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
    credit_card: createCreditCardFields,
    login: createLoginFields,
    ssh_key: createSSHKeyFields,
    website: createWebsiteFields
};
