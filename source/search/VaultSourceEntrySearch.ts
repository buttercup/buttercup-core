import { SearchResult, SearcherFactory } from "./BaseSearch.js";
import { VaultSource } from "../core/VaultSource.js";
import { Vault } from "../core/Vault.js";
import { StorageInterface } from "../storage/StorageInterface.js";
import { VaultEntrySearch } from "./VaultEntrySearch.js";
import { VaultSourceStatus } from "../types.js";

export class VaultSourceEntrySearch extends VaultEntrySearch {
    _sources: Array<VaultSource>;

    constructor(
        sources: Array<VaultSource>,
        memory?: StorageInterface,
        searcherFactory?: SearcherFactory
    ) {
        const vaults: Array<Vault> = sources.reduce((output, source) => {
            if (source.status === VaultSourceStatus.Unlocked) {
                return [...output, source.vault];
            }
            return output;
        }, []);
        super(vaults, memory, searcherFactory);
        this._sources = [...sources];
    }

    /**
     * Last search results
     */
    get results(): Array<SearchResult> {
        return this._results.map((res) => {
            const output = res;
            const source = this._sources.find((src) => src?.vault?.id === output.vaultID);
            if (source) {
                output.sourceID = source.id;
            }
            return output;
        });
    }
}
