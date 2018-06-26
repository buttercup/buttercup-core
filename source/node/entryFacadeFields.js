const { createFieldDescriptor, getEntryValue } = require("./tools/entry.js");

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
                    { char: /\d/, repeat: 4 },
                    { exactly: "-" },
                    { char: /\d/, repeat: 4 },
                    { exactly: "-" },
                    { char: /\d/, repeat: 4 },
                    { exactly: "-" },
                    { char: /\d/, repeat: 4 }
                ],
                placeholder: "DDDD-DDDD-DDDD-DDDD"
            }
        }),
        createFieldDescriptor(entry, "Card Type", "property", "type"),
        createFieldDescriptor(entry, "CVV", "property", "cvv", {
            formatting: {
                format: [{ char: /\d/, repeat: 4 }],
                placeholder: "DDD or DDDD"
            }
        }),
        createFieldDescriptor(entry, "Valid From", "property", "valid_from", {
            formatting: {
                format: [
                    { char: /[01]/, repeat: 1 },
                    { char: /\d/, repeat: 1 },
                    { exactly: "/" },
                    { char: /2/, repeat: 1 },
                    { char: /\d/, repeat: 3 }
                ],
                placeholder: "MM/YYYY"
            }
        }),
        createFieldDescriptor(entry, "Expiry", "property", "expiry", {
            formatting: {
                format: [
                    { char: /[01]/, repeat: 1 },
                    { char: /\d/, repeat: 1 },
                    { exactly: "/" },
                    { char: /2/, repeat: 1 },
                    { char: /\d/, repeat: 3 }
                ],
                placeholder: "MM/YYYY"
            }
        })
    ];
}

function createLoginFields(entry) {
    return [
        ...createBaseFields(entry),
        createFieldDescriptor(entry, "Username", "property", "username"),
        createFieldDescriptor(entry, "Password", "property", "password", { secret: true })
    ];
}

function createNoteFields(entry) {
    return [...createBaseFields(entry), createFieldDescriptor(entry, "Note", "property", "note", { multiline: true })];
}

function createSSHKeyFields(entry) {
    return [
        ...createBaseFields(entry),
        createFieldDescriptor(entry, "Public key", "property", "publicKey"),
        createFieldDescriptor(entry, "Private key", "property", "privateKey", { multiline: true })
    ];
}

function createWebsiteFields(entry) {
    return [...createLoginFields(entry), createFieldDescriptor(entry, "URL", "property", "url")];
}

module.exports = {
    credit_card: createCreditCardFields,
    login: createLoginFields,
    note: createNoteFields,
    ssh_key: createSSHKeyFields,
    website: createWebsiteFields
};
