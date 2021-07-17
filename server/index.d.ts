/**
 * Server for hydyco
 */
import { Router } from "express";
export interface IServerConfig {
    port: number;
    logger: boolean;
}
export declare class HydycoServer {
    private serverConfig;
    /**
     * Init express server
     */
    private _hydycoServer;
    /**
     * Check if server is running or not
     */
    private _isServerStarted;
    /**
     * check if database is configured or not
     */
    private _dbAdded;
    /**
     * configuration
     */
    private _db;
    private _middleware;
    private _routes;
    constructor(serverConfig?: IServerConfig);
    /**
     * Register database
     * Database are instance of express app
     * @param {App} - Instance of express app or express app or even node http server
     */
    registerDatabase(database: Router): void;
    /**
     * Register middleware
     * middleware are instance of express app
     * @param {App} - Instance of express app or express app or even node http server
     */
    registerMiddleware(middleware: Array<Router>): void;
    /**
     * Register routes
     * @param {HydycoModel} - Type of HydycoModel
     */
    registerRoutes(routes: Array<any>): void;
    /**
     * Start Hydyco Server
     */
    start(): void;
}
