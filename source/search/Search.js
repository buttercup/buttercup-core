const Fuse = require("fuse.js");
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

class Search {
    constructor(vaults, memory = new StorageInterface()) {
        this._vaults = vaults;
        this._entries = [];
        this._fuse = null;
        this._memory = memory;
        this._scores = {};
        this._results = [];
    }

    get results() {
        return this._results;
    }

    async incrementScore(vaultID, entryID) {}

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
            // console.log(this._entries);
        }
    }

    searchByTerm(term) {
        this._fuse = new Fuse(this._entries, {
            includeScore: false,
            keys: [
                {
                    name: "properties.title",
                    weight: 0.65
                },
                {
                    name: "properties.username",
                    weight: 0.25
                },
                {
                    name: "urls",
                    weight: 0.1
                }
            ],
            shouldSort: true
        });
        const result = this._fuse.search(term);
    }

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
