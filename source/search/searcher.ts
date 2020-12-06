import Fuse from "fuse.js";

export function buildSearcher(items: Array<any>) {
    return new Fuse(items, {
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
}
