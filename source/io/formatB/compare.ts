import { propsDiffer } from "../../tools/hash";
import {
    FormatBVault,
    History
} from "../../types";

export function historiesDiffer(historyA: History, historyB: History) {
    const vaultA = inflateHistory(historyA);
    const vaultB = inflateHistory(historyB);
    if (vaultA.e.length !== vaultB.e.length) return true;
    if (vaultA.g.length !== vaultB.g.length) return true;
    if (propsDiffer(vaultA.a, vaultB.a)) return true;
    return [
        [vaultA, vaultB],
        [vaultB, vaultA]
    ].some(([item1, item2]: Array<FormatBVault>) => {
        const diffEntries = item1.e.some(entry1 => {
            // Check entries
            const matching = item2.e.find(entry2 => entry2.id === entry1.id);
            if (!matching) return true;
            if (entry1.g !== matching.g) return true;
            // Check entry properties
            return propsDiffer(entry1.p, matching.p) || propsDiffer(entry1.a, matching.a);
        });
        if (diffEntries && item1.e.length > 0) return true;
        const diffGroups = item1.g.some(group1 => {
            const matching = item2.g.find(group2 => group2.id === group1.id);
            if (!matching) return true;
            if (group1.g !== matching.g) return true;
            // Check properties
            if (group1.t !== matching.t) return true;
            return propsDiffer(group1.a, matching.a);
        });
        if (diffGroups && item1.g.length > 0) return true;
        return false;
    });
}

function inflateHistory(history: History): FormatBVault {
    return JSON.parse(history[0]) as FormatBVault;
}
