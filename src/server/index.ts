/**
 * Server for hydyco
 * Powered by tinyhttp https://tinyhttp.v1rtl.site/
 */
import { App, NextFunction, Request, Response } from "@tinyhttp/app";
import { logger } from "@tinyhttp/logger";
import { HydycoAdmin } from "@hydyco/admin-plugin";
export interface IServerConfig {
  port: number;
  logger: boolean;
}

const bodyParser = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let body = "";
  request.on("data", (chuck) => {
    body += chuck;
  });

  request.on("end", () => {
    body = body.length > 0 ? JSON.parse(body) : undefined;
    request.body = body;
    next();
  });
};

export class HydycoServer {
  /**
   * Init tinyhttp server
   */
  private _hydycoServer: App = new App({
    applyExtensions: (req: Request, res: Response, next: NextFunction) => {
      bodyParser(req, res, next);
    },
    noMatchHandler: (req: Request, res: Response) =>
      res.status(404).end("Not found :("),
    onError: (err, req, res) => {
      res.status(500).send({
        status: false,
        message: err.message,
      });
    },
  });

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

  constructor(
    private serverConfig: IServerConfig = {
      port: 3000,
      logger: true,
    }
  ) {
    this._hydycoServer.use(HydycoAdmin); // register admin ui
    if (this.serverConfig.logger) this._hydycoServer.use(logger());
  }

  /**
   * Register database
   * Database are instance of tinyhttp app , you are allowed to use express app as well
   * @param {App} - Instance of tinyhttp app or express app or even node http server
   */
  registerDatabase(database: App) {
    this._dbAdded = false;
    this._db = database;
  }

  /**
   * Register plugins
   * Plugins are instance of tinyhttp app , you are allowed to use express app as well
   * @param {App} - Instance of tinyhttp app or express app or even node http server
   */
  registerPlugins(plugins: Array<App>) {
    if (this._isServerStarted)
      throw new Error(
        "Server is running, cannot register plugin after server is started"
      );
    this._plugins = plugins;
  }

  /**
   * Start Hydyco Server
   */
  start() {
    if (!this._dbAdded)
      throw new Error("You need to register database before starting server");

    this._hydycoServer.use(this._db);

    this._plugins.forEach((plugin) => this._hydycoServer.use(plugin));

    this._hydycoServer.listen(this.serverConfig.port, () => {
      this._isServerStarted = true;
      console.log("Server started");
    });
  }
}
