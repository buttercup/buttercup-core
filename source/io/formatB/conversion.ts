import { newRawValue } from "./history";
import { FormatAEntry, FormatAGroup, FormatBEntry, FormatBGroup, FormatBKeyValueObject, PropertyKeyValueObject } from "../../types";

export function convertFormatAEntry(entry: FormatAEntry): FormatBEntry {
    return {
        id: entry.id,
        a: flatKeyValueObjectToValuesObject(entry.attributes || {}),
        p: flatKeyValueObjectToValuesObject(entry.properties || {}),
        g: entry.parentID
    };
}

export function convertFormatAGroup(group: FormatAGroup): FormatBGroup {
    return {
        id: group.id,
        a: flatKeyValueObjectToValuesObject(group.attributes || {}),
        t: group.title,
        g: group.parentID
    };
}

function flatKeyValueObjectToValuesObject(obj: PropertyKeyValueObject): FormatBKeyValueObject {
    return Object.keys(obj).reduce((output, key) => Object.assign(output, {
        [key]: newRawValue(obj[key])
    }), {});
}

export function isFormatBEntry(entry: FormatAEntry | FormatBEntry): entry is FormatBEntry {
    return (<FormatBEntry>entry).g !== undefined;
}

export function isFormatBGroup(group: FormatAGroup | FormatBGroup): group is FormatBGroup {
    return (<FormatBGroup>group).g !== undefined;
}

export function valuesObjectToKeyValueObject(valuesObj: FormatBKeyValueObject): PropertyKeyValueObject {
    return Object.keys(valuesObj).reduce((output, key) => Object.assign(output, {
        [key]: valuesObj[key].value
    }), {});
}
