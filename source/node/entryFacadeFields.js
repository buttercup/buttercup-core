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
        createFieldDescriptor(entry, "Card Type", "meta", "type"),
        createFieldDescriptor(entry, "CVV", "meta", "cvv", {
            formatting: {
                format: [{ char: /\d/, repeat: 4 }],
                placeholder: "DDD or DDDD"
            }
        }),
        createFieldDescriptor(entry, "Valid From", "meta", "valid_from", {
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
        createFieldDescriptor(entry, "Expiry", "meta", "expiry", {
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

function createSSHKeyFields(entry) {
    return [
        ...createBaseFields(entry),
        createFieldDescriptor(entry, "Public key", "meta", "publicKey"),
        createFieldDescriptor(entry, "Private key", "meta", "privateKey", { multiline: true })
    ];
}

function createWebsiteFields(entry) {
    return [...createLoginFields(entry), createFieldDescriptor(entry, "URL", "meta", "url")];
}

module.exports = {
    credit_card: createCreditCardFields,
    login: createLoginFields,
    ssh_key: createSSHKeyFields,
    website: createWebsiteFields
};
