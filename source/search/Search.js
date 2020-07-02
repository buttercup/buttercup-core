const Fuse = require("fuse.js");
const extractDomain = require("extract-domain");
const { createVaultFacade } = require("../facades/vault.js");
const { fieldsToProperties } = require("../facades/entry.js");
const { ENTRY_URL_TYPE_GENERAL, getEntryURLs } = require("../tools/entry.js");
const StorageInterface = require("../storage/StorageInterface.js");

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
                        urlScore: vaultScore[entry.id] || 0
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
        // const preparedURL = url.replace(/^https?:\/\//i, "");
        const domain = extractDomain(url);
        const items = [...this._entries];
        this._fuse = new Fuse(this._entries, {
            includeScore: true,
            keys: ["urls"],
            shouldSort: true,
            sortFn: (a, b) => {
                const itemA = items[a.idx];
                const itemB = items[b.idx];
                const aScore = 1 - a.score;
                const bScore = 1 - b.score;
                const aURLScore = Math.max(1, itemA.urlScore);
                const bURLScore = Math.max(1, itemB.urlScore);
                const av = aURLScore * aScore;
                const bv = bURLScore * bScore;
                console.log("A", itemA.properties.title, av, aScore, aURLScore);
                console.log("B", itemB.properties.title, bv, bScore, bURLScore);
                if (av > bv) {
                    return 1;
                } else if (bv > av) {
                    return -1;
                }
                return 0;
                // const scoreDiff = Math.abs(a.score - b.score);
                // // console.log('DIFF', scoreDiff);
                // if (scoreDiff > 0.3) {
                //     if (a.score > b.score) {
                //         return 1;
                //     } else if (b.score > a.score) {
                //         return -1;
                //     }
                // }
                // if (a.item.score > b.item.score) {
                //     return -1;
                // } else if (b.item.score > a.item.score) {
                //     return 1;
                // }
                // return 0;
            },
            threshold: 0.75
        });
        this._results = this._fuse.search(domain).map(result => result.item);
        return this._results;
    }
}

module.exports = Search;
