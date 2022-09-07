import { request } from "cowl";
import joinURL from "url-join";
import { Layerr } from "layerr";
import { default as createChallenge } from "pkce-challenge";
import { encodeBase64String } from "../tools/encoding";

export interface ButtercupServerAuthURLOptions {
    clientID: string;
    redirectURI: string;
    responseType?: "code" | "token";
    serverURL: string;
    state?: string;
}
export interface ButtercupServerCodeExchangeOptions {
    clientID: string;
    clientSecret: string;
    redirectURI: string;
    serverURL: string;
}

const API_ROOT = "/api/v1";
const API_ROUTE_VAULT = "/vault/[ID]";
const BASE_SCOPES = ["openid", "offline_access"];
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

export async function exchangeCodeForToken(
    options: ButtercupServerCodeExchangeOptions,
    pkceVerifier: string,
    authCode: string
): Promise<{
    accessToken: string;
    expiresIn: number;
    created: number;
    refreshToken: string;
    tokenType: string;
}> {
    const url = joinURL(options.serverURL, "/oauth/token");
    const created = Date.now();
    const response = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: "Basic " + encodeBase64String(`${options.clientID}:${options.clientSecret}`),
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: [
            "grant_type=authorization_code",
            `code=${encodeURIComponent(authCode)}`,
            `client_id=${options.clientID}`,
            `redirect_uri=${encodeURIComponent(options.redirectURI)}`,
            `code_verifier=${encodeURIComponent(pkceVerifier)}`
        ].join("&")
    });
    if (!response.ok) {
        throw new Layerr(`Token exchange failed: Invalid response: ${response.status} ${response.statusText}`);
    }
    const result = await response.json();
    return {
        accessToken: result.access_token,
        expiresIn: result.expires_in,
        created,
        refreshToken: result.refresh_token || null,
        tokenType: result.token_type
    };
}

export function getAuthorizationURL(options: ButtercupServerAuthURLOptions): { url: string; pkceVerifier: string } {
    const { code_verifier: codeVerifier, code_challenge: codeChallenge } = createChallenge(128);
    const { clientID, redirectURI, responseType = "code", serverURL, state } = options;
    const parameters = [
        `client_id=${encodeURIComponent(clientID)}`,
        `response_type=${responseType}`,
        `redirect_uri=${encodeURIComponent(redirectURI)}`,
        `code_challenge=${codeChallenge}`,
        "code_challenge_method=S256",
        `scope=${encodeURIComponent(BASE_SCOPES.join(" "))}`,
        "prompt=consent",
        state ? `state=${state}` : null
    ]
        .filter(Boolean)
        .join("&");
    const url = joinURL(serverURL, `/oauth/auth?${parameters}`);
    return {
        url,
        pkceVerifier: codeVerifier
    };
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
