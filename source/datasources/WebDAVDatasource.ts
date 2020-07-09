import TextDatasource from "./TextDatasource";
import { fireInstantiationHandlers, registerDatasource } from "./register";
import { getSharedAppEnv } from "../env/appEnv";
import Credentials from "../credentials/Credentials";
import { getCredentials } from "../credentials/channel";
import { DatasourceLoadedData, EncryptedContent, History } from "../types";

/**
 * WebDAV datasource for reading and writing remote archives
 * @augments TextDatasource
 * @memberof module:Buttercup
 */
export default class WebDAVDatasource extends TextDatasource {
    _client: any;
    _path: string;

    /**
     * Constructor for the datasource
     * @param credentials Credentials for the datasource
     */
    constructor(credentials: Credentials) {
        super(credentials);
        const { data: credentialData } = getCredentials(credentials.id);
        const { datasource: datasourceConfig } = credentialData;
        const { endpoint, password, path, username } = datasourceConfig;
        this._path = path;
        const createClient = getSharedAppEnv().getProperty("net/webdav/v1/newClient");
        if (typeof username === "string" && typeof password === "string") {
            this._client = createClient(endpoint, {
                username,
                password
            });
        } else {
            this._client = createClient(endpoint);
        }
        this.type = "webdav";
        fireInstantiationHandlers("webdav", this);
    }

    /**
     * The WebDAV client instance
     * @memberof WebDAVDatasource
     */
    get client() {
        return this._client;
    }

    /**
     * The remote archive path
     * @memberof WebDAVDatasource
     */
    get path() {
        return this._path;
    }

    /**
     * Load archive history from the datasource
     * @param credentials The credentials for archive decryption
     * @returns A promise resolving archive history
     * @memberof WebDAVDatasource
     */
    load(credentials: Credentials): Promise<DatasourceLoadedData> {
        return this.hasContent
            ? super.load(credentials)
            : this.client.getFileContents(this.path, { format: "text" }).then(content => {
                  this.setContent(content);
                  return super.load(credentials);
              });
    }

    /**
     * Save archive contents to the WebDAV service
     * @param history Archive history
     * @param credentials The credentials for encryption
     * @returns A promise resolving when the save is complete
     * @memberof WebDAVDatasource
     */
    save(history: History, credentials: Credentials): Promise<EncryptedContent> {
        return super
            .save(history, credentials)
            .then(encrypted => this.client.putFileContents(this.path, encrypted));
    }

    /**
     * Whether or not the datasource supports bypassing remote fetch operations
     * @returns True if content can be set to bypass fetch operations,
     *  false otherwise
     * @memberof WebDAVDatasource
     */
    supportsRemoteBypass(): boolean {
        return true;
    }
}

registerDatasource("webdav", WebDAVDatasource);
