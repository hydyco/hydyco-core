/**
 * Server for hydyco
 */
import { Router, Application } from "express";
import express from "express";
import morgan from "morgan";
import boxen from "boxen";
import cors from "cors";
import { IConfig } from "../types/config";
import { IKernel } from "../types/kernel";
import { readObject } from "../utils/ioc";
import { readAllMappingFiles } from "../main/file";

export interface IServerConfig {
  port: number;
  logger: boolean;
  auth: {
    secretOrKey: string;
  };
  cors?: {};
}

export class HydycoServer {
  /**
   * Init express server
   */
  private _hydycoServer: Application = express();

  /**
   * configuration
   */
  private _config: IConfig;

  constructor({
    config,
    kernel,
    database,
  }: {
    config: IConfig;
    kernel: IKernel;
    database: any;
  }) {
    this._config = config;
    this._hydycoServer.use(express.json());

    const restModel = readObject(kernel, "routes.restModule");
    const overrides = readObject(kernel, "routes.overrides");
    const baseUrl = readObject(kernel, "routes.baseUrl");
    const routesHandler = readObject(kernel, "database.routesHandler");
    const namedMiddleware = readObject(kernel, "middleware.namedMiddleware");
    const customRoutes: any = readObject(kernel, "routes.customRoutes");
    const HydycoModel = readObject(kernel, "database.model");

    if (this._config.server.logger) {
      this._hydycoServer.use(morgan(config.server.loggerMode));
    }

    this._hydycoServer.use("/admin", database);

    this._hydycoServer.use([
      cors(this._config.cors),
      ...kernel.middleware.globalMiddleware,
    ]);

    if (Array.isArray(kernel.plugins)) {
      kernel.plugins.forEach((plugin: any) => {
        if (typeof plugin === "object") {
          plugin.serverPath = plugin.serverPath ? plugin.serverPath : "";
          let module = plugin.module;
          module = plugin.invoke ? module(plugin.config, HydycoModel) : module;
          this._hydycoServer.use(plugin.serverPath, module);
        }
      });
    }

    const routes = AutoRoutes(
      restModel,
      routesHandler,
      namedMiddleware["authMiddleware"],
      overrides
    );

    this._hydycoServer.use(`${baseUrl}`, [...routes, ...customRoutes]);
  }

  /**
   * Start Hydyco Server
   */
  start() {
    this._hydycoServer.listen(this._config.server.port, () => {
      console.log(
        boxen(
          "Server started at http://localhost:" + this._config.server.port,
          {
            padding: 1,
            margin: 1,
            borderStyle: "double",
            borderColor: "yellow",
          }
        )
      );
      console.log(
        boxen(
          "Admin ui at http://localhost:" +
            this._config.server.port +
            "/admin-ui",
          { padding: 1, margin: 1, borderStyle: "double", borderColor: "green" }
        )
      );
    });
  }
}

/**
 * Get all mongoose express routes
 */
const AutoRoutes = (restModule, routesHandler, authHandler, overRides = {}) => {
  const routes = {};
  const files = readAllMappingFiles();
  files.forEach((file: any) => {
    if (file.show) {
      if (overRides[file.name]) {
        const RestClass = overRides[file.name];
        routes[file.name] = new RestClass({
          modelName: file.name,
          routesHandler,
          authHandler,
        });
      } else {
        routes[file.name] = new restModule({
          modelName: file.name,
          routesHandler,
          authHandler,
        });
      }
    }
  });
  return Object.values(routes).map((r: any) => {
    return r.Routes();
  });
};
