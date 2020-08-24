import { CredentialsData } from "../types";

const __store = {};

export interface CredentialsPayload {
    data: CredentialsData;
    masterPassword: string | null;
    purposes: Array<string>;
    open: boolean;
}

export function credentialsAllowsPurpose(id: string, purpose: string): boolean {
    const { purposes } = getCredentials(id);
    return purposes.includes(purpose);
}

export function getCredentials(id: string): CredentialsPayload | null {
    return __store[id] || null;
}

export function removeCredentials(id: string) {
    __store[id] = null;
    delete __store[id];
}

export function setCredentials(id: string, value: CredentialsPayload) {
    __store[id] = value;
}
