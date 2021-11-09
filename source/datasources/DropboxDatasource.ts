import { createClient } from "@buttercup/dropbox-client";
import TextDatasource from "./TextDatasource";
import { fireInstantiationHandlers, registerDatasource } from "./register";
import Credentials from "../credentials/Credentials";
import { getCredentials } from "../credentials/channel";
import { DatasourceConfigurationDropbox, DatasourceLoadedData, EncryptedContent, History } from "../types";

/**
 * Datasource for Dropbox archives
 * @augments TextDatasource
 * @memberof module:Buttercup
 */
export default class DropboxDatasource extends TextDatasource {
    client: any;
    path: string;
    token: string;

    /**
     * Datasource for Dropbox accounts
     * @param credentials Credentials instance to configure the
     *  datsource with
     */
    constructor(credentials: Credentials) {
        super(credentials);
        const { data: credentialData } = getCredentials(credentials.id);
        const { datasource: datasourceConfig } = credentialData as { datasource: DatasourceConfigurationDropbox };
        const { token, path } = datasourceConfig;
        this.path = path;
        this.token = token;
        this.client = createClient(token);
        this.type = "dropbox";
        fireInstantiationHandlers("dropbox", this);
    }

    /**
     * Load an archive from the datasource
     * @param credentials The credentials for decryption
     * @returns A promise that resolves archive history
     * @memberof DropboxDatasource
     */
    load(credentials: Credentials): Promise<DatasourceLoadedData> {
        if (this.hasContent) {
            return super.load(credentials);
        }
        return this.client.getFileContents(this.path).then(content => {
            this.setContent(content);
            return super.load(credentials);
        });
    }

    /**
     * Save an archive using the datasource
     * @param history The archive history to save
     * @param credentials The credentials to save with
     * @returns A promise that resolves when saving has completed
     * @memberof DropboxDatasource
     */
    save(history: History, credentials: Credentials): Promise<EncryptedContent> {
        return super
            .save(history, credentials)
            .then((encryptedContent: EncryptedContent) => this.client.putFileContents(this.path, encryptedContent));
    }

    /**
     * Whether or not the datasource supports bypassing remote fetch operations
     * @returns True if content can be set to bypass fetch operations,
     *  false otherwise
     * @memberof DropboxDatasource
     */
    supportsRemoteBypass(): boolean {
        return true;
    }
}

registerDatasource("dropbox", DropboxDatasource);
