/**
 * Server for hydyco
 * Powered by tinyhttp https://tinyhttp.v1rtl.site/
 */
import { App, Request, Response } from "@tinyhttp/app";
import { logger } from "@tinyhttp/logger";

export interface IServerConfig {
  port: number;
  logger: boolean;
}

export class HydycoServer {
  /**
   * Init tinyhttp server
   */
  private _hydycoServer: App = new App({
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

  constructor(
    private serverConfig: IServerConfig = {
      port: 3000,
      logger: true,
    }
  ) {
    if (this.serverConfig.logger) this._hydycoServer.use(logger());
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
    plugins.forEach((plugin) => this._hydycoServer.use(plugin));
  }

  /**
   * Start Hydyco Server
   */
  start() {
    this._hydycoServer.listen(this.serverConfig.port, () => {
      this._isServerStarted = true;
      console.log("Server started");
    });
  }
}
