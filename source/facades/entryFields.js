const { createFieldDescriptor, getEntryValue } = require("./tools.js");
const {
    ENTRY_TYPE_CREDITCARD,
    ENTRY_TYPE_LOGIN,
    ENTRY_TYPE_NOTE,
    ENTRY_TYPE_SSHKEY,
    ENTRY_TYPE_WEBSITE,
    FIELD_VALUE_TYPE_NOTE,
    FIELD_VALUE_TYPE_PASSWORD
} = require("./symbols.js");

const DIGIT = "\\d";

function createBaseFields(entry) {
    return [createFieldDescriptor(entry, "Title", "property", "title")];
}

function createCreditCardFields(entry) {
    return [
        ...createBaseFields(entry),
        createFieldDescriptor(entry, "Card Holder", "property", "username"),
        createFieldDescriptor(entry, "Card Number", "property", "password", {
            formatting: {
                format: [
                    { char: DIGIT, repeat: 4 },
                    { exactly: "-" },
                    { char: DIGIT, repeat: 4 },
                    { exactly: "-" },
                    { char: DIGIT, repeat: 4 },
                    { exactly: "-" },
                    { char: DIGIT, repeat: 4 }
                ],
                placeholder: "DDDD-DDDD-DDDD-DDDD"
            }
        }),
        createFieldDescriptor(entry, "Card Type", "property", "type", {
            formatting: {
                options: {
                    visa: "Visa",
                    mastercard: "Mastercard",
                    amex: "American Express",
                    discover: "Discover",
                    generic: "Generic"
                },
                defaultOption: "generic"
            }
        }),
        createFieldDescriptor(entry, "CVV", "property", "cvv", {
            formatting: {
                format: [{ char: DIGIT, repeat: 4 }],
                placeholder: "DDD or DDDD"
            },
            valueType: FIELD_VALUE_TYPE_PASSWORD
        }),
        createFieldDescriptor(entry, "Valid From", "property", "valid_from", {
            formatting: {
                format: [
                    { char: "[01]", repeat: 1 },
                    { char: DIGIT, repeat: 1 },
                    { exactly: "/" },
                    { char: "2", repeat: 1 },
                    { char: DIGIT, repeat: 3 }
                ],
                placeholder: "MM/YYYY"
            },
            valueType: FIELD_VALUE_TYPE_PASSWORD
        }),
        createFieldDescriptor(entry, "Expiry", "property", "expiry", {
            formatting: {
                format: [
                    { char: "[01]", repeat: 1 },
                    { char: DIGIT, repeat: 1 },
                    { exactly: "/" },
                    { char: "2", repeat: 1 },
                    { char: DIGIT, repeat: 3 }
                ],
                placeholder: "MM/YYYY"
            },
            valueType: FIELD_VALUE_TYPE_PASSWORD
        })
    ];
}

function createLoginFields(entry) {
    return [
        ...createBaseFields(entry),
        createFieldDescriptor(entry, "Username", "property", "username"),
        createFieldDescriptor(entry, "Password", "property", "password", {
            valueType: FIELD_VALUE_TYPE_PASSWORD
        })
    ];
}

function createNoteFields(entry) {
    return [
        ...createBaseFields(entry),
        createFieldDescriptor(entry, "Note", "property", "note", {
            valueType: FIELD_VALUE_TYPE_NOTE
        })
    ];
}

function createSSHKeyFields(entry) {
    return [
        ...createBaseFields(entry),
        createFieldDescriptor(entry, "Public key", "property", "publicKey"),
        createFieldDescriptor(entry, "Private key", "property", "privateKey", {
            valueType: FIELD_VALUE_TYPE_NOTE
        })
    ];
}

function createWebsiteFields(entry) {
    return [...createLoginFields(entry), createFieldDescriptor(entry, "URL", "property", "url")];
}

module.exports = {
    [ENTRY_TYPE_CREDITCARD]: createCreditCardFields,
    [ENTRY_TYPE_LOGIN]: createLoginFields,
    [ENTRY_TYPE_NOTE]: createNoteFields,
    [ENTRY_TYPE_SSHKEY]: createSSHKeyFields,
    [ENTRY_TYPE_WEBSITE]: createWebsiteFields
};
