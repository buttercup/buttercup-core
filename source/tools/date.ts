import { DateString } from "../types";

export function getDateFromDateString(dateString: DateString): Date {
    return new Date(dateString);
}

export function getDateString(date: Date = new Date()): DateString {
    return date.toISOString();
}
