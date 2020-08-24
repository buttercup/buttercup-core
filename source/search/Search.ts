import FuseImport from "fuse.js";
import levenshtein from "fast-levenshtein";
import { createVaultFacade } from "../facades/vault";
import { fieldsToProperties } from "../facades/entry";
import { EntryURLType, getEntryURLs } from "../tools/entry";
import StorageInterface from "../storage/StorageInterface";
import Vault from "../core/Vault";
import { EntryID, VaultID } from "../types";

declare const BUTTERCUP_WEB: boolean;

interface DomainScores {
    [domain: string]: number;
}

interface ProcessedSearchEntry {
    id: EntryID;
    properties: { [property: string]: string };
    urls: Array<string>;
    vaultID: VaultID;
    domainScores: DomainScores;
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

/**
 * Search class for searching entries
 * @memberof module:Buttercup
 */
export default class Search {
    _entries: Array<ProcessedSearchEntry> = [];
    _fuse: any = null;
    _memory: StorageInterface;
    _results: Array<SearchResult> = [];
    _scores: SearchScores = {};
    _vaults: Array<Vault>;

    constructor(vaults: Array<Vault>, memory = new StorageInterface()) {
        this._vaults = vaults;
        this._memory = memory;
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
        for (const vault of this._vaults) {
            // Get scores
            const scoresRaw = await this._memory.getValue(`bcup_search_${vault.id}`);
            let vaultScore = {};
            if (scoresRaw) {
                try {
                    const scores = JSON.parse(scoresRaw);
                    vaultScore = this._scores[vault.id] = scores;
                } catch (err) {}
            }
            // Get entries
            const { entries } = createVaultFacade(vault, {
                includeTrash: false
            });
            this._entries.push(
                ...entries.map(entry => {
                    const properties = fieldsToProperties(entry.fields);
                    const urls = getEntryURLs(properties, EntryURLType.General);
                    return {
                        id: entry.id,
                        properties,
                        urls,
                        vaultID: vault.id,
                        domainScores: vaultScore[entry.id] || {}
                    };
                })
            );
        }
    }

    /**
     * Search for entries by term
     * @param term The term to search for
     * @returns An array of search results
     */
    searchByTerm(term: string): Array<SearchResult> {
        let Fuse = FuseImport;
        if (typeof BUTTERCUP_WEB === "boolean" && BUTTERCUP_WEB === true) {
            Fuse = (<any>FuseImport).default;
        }
        this._fuse = new Fuse(this._entries, {
            includeScore: true,
            keys: [
                {
                    name: "properties.title",
                    weight: 0.6
                },
                {
                    name: "properties.username",
                    weight: 0.25
                },
                {
                    name: "urls",
                    weight: 0.15
                }
            ],
            shouldSort: true,
            threshold: 0.5
        });
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
                } else if (b.domainScore > b.domainScore) {
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
