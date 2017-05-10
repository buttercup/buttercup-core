const EntryFacade = require("./EntryFacade.js");
const { SSH_KEY } = require("./types.js");

class SSHKeyFacade extends EntryFacade {

    get fields() {
        return [
            createFieldDescriptor(
                this.entry,
                "Public key",
                "meta",
                "publicKey"
            ),
            createFieldDescriptor(
                this.entry,
                "Private key",
                "meta",
                "privateKey",
                {
                    multiline: true
                }
            )
        ];
    }

    get type() {
        return SSH_KEY;
    }

}

module.exports = SSHKeyFacade;
