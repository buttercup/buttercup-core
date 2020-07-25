import { FormatAEntry, FormatAGroup, FormatBEntry, FormatBGroup } from "../../types";

export function convertFormatBEntry(entry: FormatAEntry): FormatBEntry {
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
