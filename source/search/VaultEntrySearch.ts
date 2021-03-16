import { BaseSearch, ProcessedSearchEntry, SearcherFactory } from "./BaseSearch";
import Vault from "../core/Vault";
import Entry from "../core/Entry";
import { EntryURLType, getEntryURLs } from "../tools/entry";
import StorageInterface from "../storage/StorageInterface";

async function extractEntries(vault: Vault, memory: StorageInterface): Promise<Array<ProcessedSearchEntry>> {
    // Get scores
    const scoresRaw = await memory.getValue(`bcup_search_${vault.id}`);
    let vaultScore = {};
    if (scoresRaw) {
        try {
            const scores = JSON.parse(scoresRaw);
            vaultScore = scores;
        } catch (err) {}
    }
    // Get entries
    return vault
        .getAllEntries()
        .filter((entry: Entry) => entry.isInTrash() === false)
        .map((entry: Entry) => {
            const properties = entry.getProperties();
            const urls = getEntryURLs(properties, EntryURLType.General);
            return {
                id: entry.id,
                properties,
                entryType: entry.getType(),
                urls,
                vaultID: vault.id,
                domainScores: vaultScore[entry.id] || {}
            };
        });
}

export class VaultEntrySearch extends BaseSearch {
    constructor(vaults: Array<Vault>, memory?: StorageInterface, searcherFactory?: SearcherFactory) {
        super(vaults, extractEntries, memory, searcherFactory);
    }
}
