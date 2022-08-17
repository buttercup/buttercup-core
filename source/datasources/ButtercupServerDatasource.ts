import { Layerr } from "layerr";
import { fireInstantiationHandlers, registerDatasource } from "./register";
import TextDatasource from "./TextDatasource";
import Credentials from "../credentials/Credentials";
import { getCredentials } from "../credentials/channel";
import { fetchVault, updateVault } from "../clients/ButtercupServerClient";
import { DatasourceLoadedData, History } from "../types";

export default class ButtercupServerDatasource extends TextDatasource {
    protected _accessToken: string;
    protected _client: any;
    protected _clientID: string;
    protected _clientSecret: string;
    protected _refreshToken: string;
    protected _serverAddress: string;
    protected _updateID: string; // ULID
    protected _url: string;
    protected _vaultID: number;

    constructor(credentials: Credentials) {
        super(credentials);
        const { data: credentialData } = getCredentials(credentials.id);
        const { datasource: datasourceConfig } = credentialData;
        const { accessToken, clientID, clientSecret, refreshToken, serverAddress, vaultID } = datasourceConfig;
        this._accessToken = accessToken;
        this._refreshToken = refreshToken;
        this._clientID = clientID;
        this._clientSecret = clientSecret;
        this._client = null;
        this._serverAddress = serverAddress;
        this._vaultID = vaultID;
        this._updateID = null;
        this.type = "bcupserver";
        fireInstantiationHandlers("bcupserver", this);
    }

    async load(credentials: Credentials): Promise<DatasourceLoadedData> {
        if (this.hasContent) return super.load(credentials);
        let result = await fetchVault(this._serverAddress, this._accessToken, this._vaultID);
        if (!result) {
            // TODO: Renew OAuth credentials
            result = await fetchVault(this._serverAddress, this._accessToken, this._vaultID);
            if (!result) {
                throw new Layerr("Failed fetching vault: Unable to renew credentials");
            }
        }
        this.setContent(result.vault);
        this._updateID = result.updateID;
        return super.load(credentials);
    }

    async save(history: History, credentials: Credentials): Promise<any> {
        const content = await super.save(history, credentials);
        let result = await updateVault(this._serverAddress, this._accessToken, this._vaultID, content, this._updateID);
        if (!result) {
            // TODO: Renew OAuth credentials
            result = await updateVault(this._serverAddress, this._accessToken, this._vaultID, content, this._updateID);
            if (!result) {
                throw new Layerr("Failed updating vault: Unable to renew credentials");
            }
        }
        this._updateID = result.updateID;
    }
}

registerDatasource("bcupserver", ButtercupServerDatasource);
