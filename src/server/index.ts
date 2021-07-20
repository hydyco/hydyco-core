/**
 * Server for hydyco
 */
import { Request, Response, NextFunction, Router, Application } from "express";
import * as express from "express";
import * as morgan from "morgan";
import * as boxen from "boxen";

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
  private _middleware: Array<any> = [];

  private _routes: Array<any> = [];

  constructor(
    private serverConfig: IServerConfig = {
      port: 3000,
      logger: true,
    }
  ) {
    this._hydycoServer.use(express.json()); // parse body json
    if (this.serverConfig.logger) {
      this._hydycoServer.use(morgan("combined"));
    }
  }

  /**
   * Register database
   * Database are instance of express app
   * @param {App} - Instance of express app or express app or even node http server
   */
  registerDatabase(database: Router) {
    this._dbAdded = true;
    this._db = database;
  }

  /**
   * Register middleware
   * middleware are instance of express app
   * @param {App} - Instance of express app or express app or even node http server
   */
  registerMiddleware(middleware: Array<Router>) {
    if (this._isServerStarted)
      throw new Error(
        "Server is running, cannot register plugin after server is started"
      );
    this._middleware = middleware;
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

    this._middleware.forEach((plugin) => this._hydycoServer.use(plugin));

    this._routes.forEach((route) => this._hydycoServer.use(route));

    this._hydycoServer.listen(this.serverConfig.port, () => {
      this._isServerStarted = true;
      console.log(
        boxen("Server started at http://localhost:" + this.serverConfig.port, {
          padding: 1,
          margin: 1,
          borderStyle: "double",
          borderColor: "yellow",
        })
      );
      console.log(
        boxen(
          "Admin ui at http://localhost:" +
            this.serverConfig.port +
            "/admin-ui",
          { padding: 1, margin: 1, borderStyle: "double", borderColor: "green" }
        )
      );
    });
  }
}
