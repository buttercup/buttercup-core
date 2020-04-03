/**
 * Default entry type
 * @type {String}
 * @memberof module:ButtercupFacades
 */
const DEFAULT_ENTRY_TYPE = "login";
/**
 * Default entry field type
 * @type {String}
 * @memberof module:ButtercupFacades
 */
const DEFAULT_FIELD_TYPE = "text";

/**
 * Credit-card entry type
 * @type {String}
 * @memberof module:ButtercupFacades
 */
const ENTRY_TYPE_CREDITCARD = "credit_card";
/**
 * Login (default) entry type
 * @type {String}
 * @memberof module:ButtercupFacades
 */
const ENTRY_TYPE_LOGIN = "login";
/**
 * Note entry type
 * @type {String}
 * @memberof module:ButtercupFacades
 */
const ENTRY_TYPE_NOTE = "note";
/**
 * SSH public/private key-pair entry type
 * @type {String}
 * @memberof module:ButtercupFacades
 */
const ENTRY_TYPE_SSHKEY = "ssh_key";
/**
 * Website entry type (includes URL)
 * @type {String}
 * @memberof module:ButtercupFacades
 */
const ENTRY_TYPE_WEBSITE = "website";

/**
 * @typedef {Object} FlagSpecification
 * @property {String} title The title of the entry type
 * @property {String} slug The slug of the entry type
 */

/**
 * Entry types collection (all available)
 * @type {Object.<String,FlagSpecification>}
 * @memberof module:ButtercupFacades
 */
const ENTRY_TYPES = {
    [ENTRY_TYPE_CREDITCARD]: {
        title: "Credit Card",
        slug: ENTRY_TYPE_CREDITCARD
    },
    [ENTRY_TYPE_LOGIN]: {
        title: "Login",
        slug: ENTRY_TYPE_LOGIN
    },
    [ENTRY_TYPE_NOTE]: {
        title: "Note",
        slug: ENTRY_TYPE_NOTE
    },
    [ENTRY_TYPE_SSHKEY]: {
        title: "SSH Key Pair",
        slug: ENTRY_TYPE_SSHKEY
    },
    [ENTRY_TYPE_WEBSITE]: {
        title: "Website Login",
        slug: ENTRY_TYPE_WEBSITE
    }
};

/**
 * Note type entry field value
 * @type {String}
 * @memberof module:ButtercupFacades
 */
const FIELD_VALUE_TYPE_NOTE = "note";
/**
 * OTP (One Time Password) type entry field value
 * @type {String}
 * @memberof module:ButtercupFacades
 */
const FIELD_VALUE_TYPE_OTP = "otp";
/**
 * Password type entry field value
 * @type {String}
 * @memberof module:ButtercupFacades
 */
const FIELD_VALUE_TYPE_PASSWORD = "password";
/**
 * Text (default) type entry field value
 * @type {String}
 * @memberof module:ButtercupFacades
 */
const FIELD_VALUE_TYPE_TEXT = "text";

/**
 * Entry field value types collection (all available)
 * @type {Object.<String,FlagSpecification>}
 * @memberof module:ButtercupFacades
 */
const FIELD_VALUE_TYPES = {
    [FIELD_VALUE_TYPE_NOTE]: {
        title: "Note",
        slug: FIELD_VALUE_TYPE_NOTE
    },
    [FIELD_VALUE_TYPE_OTP]: {
        title: "OTP (One Time Password)",
        slug: FIELD_VALUE_TYPE_OTP
    },
    [FIELD_VALUE_TYPE_PASSWORD]: {
        title: "Password (secret)",
        slug: FIELD_VALUE_TYPE_PASSWORD
    },
    [FIELD_VALUE_TYPE_TEXT]: {
        title: "Text (default)",
        slug: FIELD_VALUE_TYPE_TEXT
    }
};

module.exports = {
    DEFAULT_ENTRY_TYPE,
    DEFAULT_FIELD_TYPE,
    ENTRY_TYPE_CREDITCARD,
    ENTRY_TYPE_LOGIN,
    ENTRY_TYPE_NOTE,
    ENTRY_TYPE_SSHKEY,
    ENTRY_TYPE_WEBSITE,
    ENTRY_TYPES,
    FIELD_VALUE_TYPE_NOTE,
    FIELD_VALUE_TYPE_OTP,
    FIELD_VALUE_TYPE_PASSWORD,
    FIELD_VALUE_TYPE_TEXT,
    FIELD_VALUE_TYPES
};
