/**
 * Server for hydyco
 */
import { Request, Response, NextFunction, Router, Application } from "express";
import * as express from "express";
const { HydycoAdmin } = require("@hydyco/admin-plugin");
export interface IServerConfig {
  port: number;
  logger: boolean;
}

export class HydycoServer {
  /**
   * Init express server
   */
  private _hydycoServer: Application = express();

  /**
   * Check if server is running or not
   */
  private _isServerStarted: boolean = false;

  /**
   * check if database is configured or not
   */
  private _dbAdded: boolean = false;

  /**
   * configuration
   */
  private _db: any;
  private _plugins: Array<any> = [];

  private _routes: Array<any> = [];

  constructor(
    private serverConfig: IServerConfig = {
      port: 3000,
      logger: true,
    }
  ) {
    this._hydycoServer.use(express.json()); // parse body json
  }

  /**
   * Register database
   * Database are instance of tinyhttp app , you are allowed to use express app as well
   * @param {App} - Instance of tinyhttp app or express app or even node http server
   */
  registerDatabase(database: Router) {
    this._dbAdded = true;
    this._db = database;
  }

  /**
   * Register plugins
   * Plugins are instance of tinyhttp app , you are allowed to use express app as well
   * @param {App} - Instance of tinyhttp app or express app or even node http server
   */
  registerPlugins(plugins: Array<Router>) {
    if (this._isServerStarted)
      throw new Error(
        "Server is running, cannot register plugin after server is started"
      );
    this._plugins = plugins;
  }

  /**
   * Register routes
   * @param {HydycoModel} - Type of HydycoModel
   */
  registerRoutes(routes: Array<any>): void {
    if (this._isServerStarted)
      throw new Error(
        "Server is running, cannot register routes after server is started"
      );
    this._routes = routes;
  }

  /**
   * Start Hydyco Server
   */
  start() {
    if (!this._dbAdded)
      throw new Error("You need to register database before starting server");

    this._hydycoServer.use("/admin", this._db);

    this._hydycoServer.use(HydycoAdmin);

    this._plugins.forEach((plugin) => this._hydycoServer.use(plugin));

    this._routes.forEach((route) => this._hydycoServer.use(route));

    this._hydycoServer.listen(this.serverConfig.port, () => {
      this._isServerStarted = true;
      console.log(
        "Server started at http://localhost:" + this.serverConfig.port
      );
    });
  }
}
