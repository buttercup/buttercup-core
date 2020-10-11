import Vault from "../core/Vault";
import { mergeHistories } from "../tools/sharing";
import { hashHistory } from "../tools/hash";
import { History, ShareID, SharePermission } from "../types";

export default class Share {
    _dirty: boolean;
    _history: History;
    _id: ShareID;
    _lastHash: string;
    _permissions: Array<SharePermission>;

    constructor(shareID: ShareID, history: History, permissions: Array<SharePermission> = []) {
        this._id = shareID;
        this._history = [...history];
        this._lastHash = hashHistory(this._history);
        this._dirty = false;
        this._permissions = permissions;
    }

    get id() {
        return this._id;
    }

    get permissions() {
        return [...this._permissions];
    }

    applyToVault(archive: any) {
        if (this.vaultHasAppliedShare(archive)) {
            throw new Error("Target archive has already had share applied");
        }
        // const westley = archive._getWestley();
        // westley.executionOptions = {
        //     permissions: this.permissions
        // };
        // this.getPrefixedHistory().forEach(line => westley.execute(line));
        // westley.executionOptions = {};
    }

    vaultHasAppliedShare(vault: Vault) {
        return !!vault._getWestley().history.find(line => line.indexOf(`$${this.id}`) === 0);
    }

    updateHistory(history) {
        // const incoming = removeSharePrefix(history);
        // const incomingHash = hashHistory(incoming);
        // if (incomingHash === this._lastHash) {
        //     return false;
        // }
        // this._history = mergeHistories(this._history, incoming);
        // this._lastHash = hashHistory(this._history);
        // this._dirty = true;
        // return true;
    }
}
