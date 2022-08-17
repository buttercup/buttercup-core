import { request } from "cowl";
import joinURL from "url-join";

const API_ROOT = "/api/v1";
const API_ROUTE_VAULT = "/vault/[ID]";
const HEADER_VAULT_UPDATE_ID = "X-Bcup-Update-ID";

export async function fetchVault(
    serverAddress: string,
    token: string,
    vaultID: number
): Promise<{ vault: string; updateID: string }> {
    const url = joinURL(serverAddress, API_ROOT, API_ROUTE_VAULT).replace("[ID]", vaultID);
    try {
        const response = await request({
            url,
            method: "GET",
            headers: {
                Accept: "text/plain",
                Authorization: `Bearer ${token}`
            },
            responseType: "text"
        });
        return {
            vault: response.data,
            updateID: response.headers[HEADER_VAULT_UPDATE_ID]
        };
    } catch (err) {
        // Handle OAuth failure
    }
}

export async function updateVault(
    serverAddress: string,
    token: string,
    vaultID: number,
    vault: string,
    updateID: string
): Promise<{ updateID: string }> {
    const url = joinURL(serverAddress, API_ROOT, API_ROUTE_VAULT).replace("[ID]", vaultID);
    try {
        const response = await request({
            url,
            method: "PUT",
            headers: {
                Accept: "text/plain",
                Authorization: `Bearer ${token}`,
                "Content-Type": "text/plain",
                [HEADER_VAULT_UPDATE_ID]: updateID
            },
            body: vault,
            responseType: "text"
        });
        return {
            updateID: response.headers[HEADER_VAULT_UPDATE_ID]
        };
    } catch (err) {
        // Handle OAuth failure
    }
}
