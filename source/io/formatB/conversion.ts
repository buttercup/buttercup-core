import { FormatAEntry, FormatAGroup, FormatBEntry, FormatBGroup } from "../../types";

export function convertFormatAEntry(entry: FormatAEntry): FormatBEntry {
    return {
        id: entry.id,
        a: entry.attributes || {},
        p: entry.properties || {},
        g: entry.parentID
    };
}

export function convertFormatAGroup(group: FormatAGroup): FormatBGroup {
    return {
        id: group.id,
        a: group.attributes || {},
        t: group.title,
        g: group.parentID
    };
}

export function isFormatBEntry(entry: FormatAEntry | FormatBEntry): entry is FormatBEntry {
    return (<FormatBEntry>entry).g !== undefined;
}

export function isFormatBGroup(group: FormatAGroup | FormatBGroup): group is FormatBGroup {
    return (<FormatBGroup>group).g !== undefined;
}
