const FuseImport = require("fuse.js");
const levenshtein = require("fast-levenshtein");
const { createVaultFacade } = require("../facades/vault.js");
const { fieldsToProperties } = require("../facades/entry.js");
const { ENTRY_URL_TYPE_GENERAL, getEntryURLs } = require("../tools/entry.js");
const StorageInterface = require("../storage/StorageInterface.js");

function domainsRelated(domain1, domain2) {
    if (domain1 === domain2) return true;
    if (domain1.length > domain2.length) {
        const ind = domain1.indexOf(domain2);
        return ind === domain1.length - domain2.length;
    } else {
        const ind = domain2.indexOf(domain1);
        return ind === domain2.length - domain1.length;
    }
}

function extractDomain(str) {
    const match = /^((https?|ftp):\/\/)?([^\/]+)/i.exec(str);
    return (match && match[3]) || "";
}

/**
 * @typedef {Object} SearchResult
 * @property {String} id The entry ID
 * @property {Object.<String, String>} properties Entry properties
 * @property {Array.<String>} urls Entry URLs
 * @property {String} vaultID The ID of the containing vault
 */

/**
 * Search class for searching entries
 * @memberof module:Buttercup
 */
class Search {
    constructor(vaults, memory = new StorageInterface()) {
        this._vaults = vaults;
        this._entries = [];
        this._fuse = null;
        this._memory = memory;
        this._scores = {};
        this._results = [];
    }

    /**
     * Last search results
     * @type {Array.<SearchResult>}
     */
    get results() {
        return this._results;
    }

    /**
     * Increment the score of a URL in an entry
     * @param {String} vaultID The vault ID
     * @param {String} entryID The entry ID
     * @param {String} url The URL to increment for
     */
    async incrementScore(vaultID, entryID, url) {
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
            const { entries } = createVaultFacade(vault);
            this._entries.push(
                ...entries.map(entry => {
                    const properties = fieldsToProperties(entry.fields);
                    const urls = getEntryURLs(properties, ENTRY_URL_TYPE_GENERAL);
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
     * @param {String} term
     * @returns {Array.<SearchResult>}
     */
    searchByTerm(term) {
        let Fuse = FuseImport;
        if (typeof BUTTERCUP_WEB === "boolean" && BUTTERCUP_WEB === true) {
            Fuse = FuseImport.default;
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
     * @param {String} url
     * @returns {Array.<SearchResult>}
     */
    searchByURL(url) {
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

module.exports = Search;
