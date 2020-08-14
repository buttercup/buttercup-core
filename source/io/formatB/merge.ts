import { FormatBEntry, FormatBGroup, FormatBVault } from "../../types";

function cloneEntry(entry: FormatBEntry): FormatBEntry {
    return {
        id: entry.id,
        p: Object.assign({}, entry.p),
        a: Object.assign({}, entry.a),
        g: entry.g
    };
}

function cloneGroup(group: FormatBGroup): FormatBGroup {
    return {
        id: group.id,
        t: group.t,
        g: group.g,
        a: Object.assign({}, group.a)
    };
}

function mergeProperties(propsA: { [key: string]: string }, propsB: { [key: string]: string }): { [key: string]: string } {
    return Object.assign({}, propsA, propsB);
}

export function mergeRawVaults(base: FormatBVault, incoming: FormatBVault): FormatBVault {
    const newVault: FormatBVault = {
        id: base.id,
        a: mergeProperties(base.a, incoming.a),
        g: [],
        e: []
    };
    // Process unique (one vault only) groups
    const uniqueGroupsBase = base.g.filter(group => !incoming.g.find(inGroup => inGroup.id === group.id));
    const uniqueGroupsIncoming = incoming.g.filter(group => !base.g.find(baseGroup => baseGroup.id === group.id));
    [...uniqueGroupsBase, ...uniqueGroupsIncoming].forEach(group => {
        newVault.g.push(cloneGroup(group));
    });
    // Process all matching groups (on both vaults)
    base.g.forEach(baseGroup => {
        // Skip unique groups
        if (uniqueGroupsBase.indexOf(baseGroup) >= 0) return;
        // Find matching on incoming vault
        const incomingGroup = incoming.g.find(ing => ing.id === baseGroup.id);
        // Setup new group
        const newGroup = cloneGroup(incomingGroup);
        newGroup.a = mergeProperties(baseGroup.a, incomingGroup.a);
        newVault.g.push(newGroup);
    });
    // Process unique (one vault only) entries
    const uniqueEntriesBase = base.e.filter(entry => !incoming.e.find(inEntry => inEntry.id === entry.id));
    const uniqueEntriesIncoming = incoming.e.filter(entry => !base.e.find(baseEntry => baseEntry.id === entry.id));
    [...uniqueEntriesBase, ...uniqueEntriesIncoming].forEach(entry => {
        newVault.e.push(cloneEntry(entry));
    });
    // Process all matching entries (on both vaults)
    base.e.forEach(baseEntry => {
        // Skip unique groups
        if (uniqueEntriesBase.indexOf(baseEntry) >= 0) return;
        // Find matching on incoming vault
        const incomingEntry = incoming.e.find(ing => ing.id === baseEntry.id);
        // Setup new group
        const newEntry = cloneEntry(incomingEntry);
        newEntry.p = mergeProperties(baseEntry.p, incomingEntry.p);
        newEntry.a = mergeProperties(baseEntry.a, incomingEntry.a);
        newVault.e.push(newEntry);
    });
    return newVault;
}
