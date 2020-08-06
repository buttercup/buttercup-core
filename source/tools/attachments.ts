import { getSharedAppEnv } from "../env/appEnv";
import { getCredentials } from "../credentials/channel";
import Credentials from "../credentials/Credentials";
import { BufferLike } from "../types";

export const ATTACHMENT_EXT = "bcatt";

export function decryptAttachment(buff: BufferLike, credentials: Credentials): Promise<BufferLike> {
    const { masterPassword } = getCredentials(credentials.id);
    const decrypt = getSharedAppEnv().getProperty("crypto/v1/decryptBuffer");
    return decrypt(buff, masterPassword);
}

export function encryptAttachment(buff: BufferLike, credentials: Credentials): Promise<BufferLike> {
    const { masterPassword } = getCredentials(credentials.id);
    const encrypt = getSharedAppEnv().getProperty("crypto/v1/encryptBuffer");
    return encrypt(buff, masterPassword);
}

export function getBufferSize(buff: BufferLike): number {
    if (typeof buff.byteLength !== "undefined") {
        return buff.byteLength;
    }
    return (<Buffer>buff).length;
}
