import { createClient } from "webdav";

export function getNetResources() {
    return {
        "net/webdav/v1/newClient": createClient
    };
}
