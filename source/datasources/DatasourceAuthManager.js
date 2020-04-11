const EventEmitter = require("events");
const { forEachAsync } = require("foreachasync");
const globals = require("global");

function markGlobalPresence() {
    if (typeof globals._bcupAuthMgr !== "undefined") {
        console.warn(
            "Detected multiple Buttercup authentication managers for datasources: Multiple copies of the same library may have been bundled together"
        );
    }
    globals._bcupAuthMgr = true;
}

let __sharedManager;

/**
 * Authentication manager
 * @augments EventEmitter
 */
class DatasourceAuthManager extends EventEmitter {
    constructor() {
        super();
        this._handlers = {};
    }

    /**
     * Execute auth handlers for a datasource
     * @param {String} datasourceType The type of datasource (slug)
     * @param {TextDatasource} datasourceInst The datasource instance
     * @returns {Promise} A promise that resolves once execution has completed
     * @throws {Error} Throws if no handlers have been specified
     * @memberof DatasourceAuthManager
     */
    executeAuthHandlers(datasourceType, datasourceInst) {
        const handlers = this._handlers[datasourceType];
        if (!Array.isArray(handlers)) {
            return Promise.reject(
                new Error(
                    `Failed executing auth handlers: No handlers registered for datasource type: ${datasourceType}`
                )
            );
        }
        return Promise.resolve()
            .then(() => forEachAsync(handlers, handler => handler(datasourceInst)))
            .then(() => {
                /**
                 * Event for when the handlers have been fired
                 */
                this.emit("authHandlersExecuted", {
                    datasource: datasourceInst,
                    datasourceType
                });
            });
    }

    /**
     * Register an auth handler
     * @param {String} datasourceType The datasource type
     * @param {Function} handler The handler function
     * @example
     *  authManager.registerHandler("googledrive", datasource => {
     *      return renewTokens().then(({ accessToken, refreshToken }) => {
     *          datasource.token = accessToken;
     *          datasource.refreshToken = refreshToken;
     *      });
     *  });
     * @memberof DatasourceAuthManager
     * @throws {Error} Throws if the handler argument is not a function
     */
    registerHandler(datasourceType, handler) {
        if (typeof handler !== "function") {
            throw new Error("Failed registering handler: Argument was not a function");
        }
        this._handlers[datasourceType] = this._handlers[datasourceType] || [];
        this._handlers[datasourceType].push(handler);
    }
}

/**
 * Get the shared DatasourceAuthManager instance
 * @returns {DatasourceAuthManager} The shared auth manager instance
 * @static
 * @memberof DatasourceAuthManager
 */
DatasourceAuthManager.getSharedManager = function getSharedManager() {
    if (!__sharedManager) {
        __sharedManager = new DatasourceAuthManager();
        markGlobalPresence();
    }
    return __sharedManager;
};

module.exports = DatasourceAuthManager;
