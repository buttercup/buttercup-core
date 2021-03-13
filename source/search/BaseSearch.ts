import levenshtein from "fast-levenshtein";
import StorageInterface from "../storage/StorageInterface";
import { buildSearcher } from "./searcher";
import Vault from "../core/Vault";
import { EntryID, VaultFacade, VaultID } from "../types";

interface DomainScores {
    [domain: string]: number;
}

type EntryFetcher = (target: Vault | VaultFacade, memory: StorageInterface) => Promise<Array<ProcessedSearchEntry>>;

export interface ProcessedSearchEntry {
    id: EntryID;
    properties: { [property: string]: string };
    urls: Array<string>;
    vaultID: VaultID;
    domainScores: DomainScores;
}

export interface SearcherFactory {
    (items: Array<any>): any;
}

export interface SearchResult {
    id: EntryID;
    properties: { [property: string]: string };
    urls: Array<string>;
    vaultID: VaultID;
}

interface SearchScores {
    [vaultID: string]: {
        [entryID: string]: DomainScores;
    };
}

function domainsRelated(domain1: string, domain2: string): boolean {
    if (domain1 === domain2) return true;
    if (domain1.length > domain2.length) {
        const ind = domain1.indexOf(domain2);
        return ind === domain1.length - domain2.length;
    } else {
        const ind = domain2.indexOf(domain1);
        return ind === domain2.length - domain1.length;
    }
}

function extractDomain(str: string): string {
    const match = /^((https?|ftp):\/\/)?([^\/]+)/i.exec(str);
    return (match && match[3]) || "";
}

export class BaseSearch {
    _entries: Array<ProcessedSearchEntry> = [];
    _entryFetcher: EntryFetcher;
    _fuse: any = null;
    _memory: StorageInterface;
    _results: Array<SearchResult> = [];
    _searcherFactory: SearcherFactory;
    _scores: SearchScores = {};
    _targets: Array<Vault> | Array<VaultFacade>;

    constructor(
        targets: Array<Vault> | Array<VaultFacade>,
        entryFetcher: EntryFetcher,
        memory = new StorageInterface(),
        searcherFactory: SearcherFactory = buildSearcher
    ) {
        this._targets = targets;
        this._entryFetcher = entryFetcher;
        this._memory = memory;
        this._searcherFactory = searcherFactory;
    }

    /**
     * Last search results
     */
    get results(): Array<SearchResult> {
        return this._results;
    }

    /**
     * Increment the score of a URL in an entry
     * @param vaultID The vault ID
     * @param entryID The entry ID
     * @param url The URL to increment for
     */
    async incrementScore(vaultID: VaultID, entryID: EntryID, url: string) {
        const scoresRaw = await this._memory.getValue(`bcup_search_${vaultID}`);
        let vaultScore = {};
        if (scoresRaw) {
            try {
                vaultScore = JSON.parse(scoresRaw);
            } catch (err) {}
        }
        const domain = extractDomain(url);
        if (!domain) return;
        vaultScore[entryID] = vaultScore[entryID] || {};
        vaultScore[entryID][domain] = vaultScore[entryID][domain] ? vaultScore[entryID][domain] + 1 : 1;
        await this._memory.setValue(`bcup_search_${vaultID}`, JSON.stringify(vaultScore));
    }

    /**
     * Prepare the search instance by processing
     * entries
     */
    async prepare() {
        this._entries = [];
        this._scores = {};
        for (const target of this._targets) {
            // Get scores
            const scoresRaw = await this._memory.getValue(`bcup_search_${target.id}`);
            if (scoresRaw) {
                try {
                    const scores = JSON.parse(scoresRaw);
                    this._scores[target.id] = scores;
                } catch (err) {}
            }
            // Process entries
            const entries = await this._entryFetcher(target, this._memory);
            this._entries.push(...entries);
        }
        // for (const vault of this._vaults) {
        //     // Get scores
        //     const scoresRaw = await this._memory.getValue(`bcup_search_${vault.id}`);
        //     let vaultScore = {};
        //     if (scoresRaw) {
        //         try {
        //             const scores = JSON.parse(scoresRaw);
        //             vaultScore = this._scores[vault.id] = scores;
        //         } catch (err) {}
        //     }
            // Process entries
            // this._entries.push(
            //     ...vault
            //         .getAllEntries()
            //         .filter((entry: Entry) => entry.isInTrash() === false)
            //         .map((entry: Entry) => {
            //             const properties = entry.getProperties();
            //             const urls = getEntryURLs(properties, EntryURLType.General);
            //             return {
            //                 id: entry.id,
            //                 properties,
            //                 urls,
            //                 vaultID: vault.id,
            //                 domainScores: vaultScore[entry.id] || {}
            //             };
            //         })
            // );
        // }
        // Instantiate new searcher
        this._fuse = this._searcherFactory(this._entries);
    }

    /**
     * Search for entries by term
     * @param term The term to search for
     * @returns An array of search results
     */
    searchByTerm(term: string): Array<SearchResult> {
        if (!this._fuse) {
            throw new Error("Searching interface not prepared");
        }
        this._results = this._fuse.search(term).map(result => result.item);
        return this._results;
    }

    /**
     * Search for entries by URL
     * @param url The URL to search with
     * @returns An array of search results
     */
    searchByURL(url: string): Array<SearchResult> {
        const incomingDomain = extractDomain(url);
        if (!incomingDomain) {
            this._results = [];
            return this._results;
        }
        const results = this._entries.reduce((output, entryItem) => {
            let bestScore = Infinity;
            const bestURL = entryItem.urls.reduce((best, next) => {
                const thisDomain = extractDomain(next);
                if (!thisDomain) return best;
                if (!domainsRelated(thisDomain, incomingDomain)) return best;
                const score = levenshtein.get(next, url);
                if (score < bestScore) {
                    bestScore = score;
                    return next;
                }
                return best;
            }, null);
            if (!bestURL) return output;
            const resultDomain = extractDomain(bestURL);
            return [
                ...output,
                {
                    item: entryItem,
                    score: bestScore,
                    url: bestURL,
                    domainScore: Math.max(
                        entryItem.domainScores[incomingDomain] || 0,
                        entryItem.domainScores[resultDomain] || 0
                    )
                }
            ];
        }, []);
        this._results = results
            .sort((a, b) => {
                if (a.domainScore > b.domainScore) {
                    return -1;
                } else if (b.domainScore > a.domainScore) {
                    return 1;
                }
                if (a.score > b.score) {
                    return 1;
                } else if (b.score > a.score) {
                    return -1;
                }
                return 0;
            })
            .map(result => result.item);
        return this._results;
    }
}
