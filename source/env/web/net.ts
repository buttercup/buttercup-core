import { createClient } from "webdav/web";

export function getNetResources() {
    return {
        "net/webdav/v1/newClient": createClient
    };
}
