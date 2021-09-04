import {
  asValue,
  asClass,
  InjectionMode,
  createContainer,
  listModules,
} from "awilix";

import { HydycoServer } from "../server";
import { checkHydyco } from "../main/path";
import { readObject, reduceIOCArray } from "../utils/ioc";

checkHydyco();

const kernelModules = listModules(["kernel/*.js"]);
const configModules = listModules(["config/*.js"]);

// Create the container and set the injectionMode to PROXY (which is also the default).
const HydycoContainer = createContainer({
  injectionMode: InjectionMode.PROXY,
});

// init
HydycoContainer.register({
  config: asValue(reduceIOCArray(configModules)),
  kernel: asValue(reduceIOCArray(kernelModules)),
  server: asClass(HydycoServer),
});

// boot and register database
const registeredDatabase: any = readObject(
  HydycoContainer.resolve("kernel"),
  "database.plugin"
);
HydycoContainer.register("database", asClass(registeredDatabase));

export const getConfig = (path: string | undefined) => {
  const config = HydycoContainer.resolve("config");
  return path ? readObject(config, path) : config;
};

export const server = HydycoContainer.resolve("server");
