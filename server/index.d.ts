/**
 * Server for hydyco
 * Powered by tinyhttp https://tinyhttp.v1rtl.site/
 */
import { App } from "@tinyhttp/app";
export interface IServerConfig {
    port: number;
    logger: boolean;
}
export declare class HydycoServer {
    private serverConfig;
    /**
     * Init tinyhttp server
     */
    private _hydycoServer;
    /**
     * Check if server is running or not
     */
    private _isServerStarted;
    constructor(serverConfig?: IServerConfig);
    /**
     * Register plugins
     * Plugins are instance of tinyhttp app , you are allowed to use express app as well
     * @param {App} - Instance of tinyhttp app or express app or even node http server
     */
    registerPlugins(plugins: Array<App>): void;
    /**
     * Start Hydyco Server
     */
    start(): void;
}
