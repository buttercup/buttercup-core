import hashJS from "hash.js";

export function hashHistory(history) {
    return hashJS
        .sha256()
        .update(history.join("\n"))
        .digest("hex");
}

export function propsDiffer(obj1: { [key: string]: string }, obj2: { [key: string]: string }) {
    const keys = new Set(Object.keys(obj1));
    if (!setsAreRequal(keys, new Set(Object.keys(obj2)))) return true;
    if (keys.size === 0) return false;
    return [...keys].some(key => obj1[key] !== obj2[key]);
}

function setsAreRequal(as, bs) {
    if (as.size !== bs.size) return false;
    for (const a of as) {
        if (!bs.has(a)) return false;
    }
    return true;
}
