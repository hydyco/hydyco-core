import { HydycoFile, HydycoParser, HydycoPath } from "./utils";
import { HydycoServer } from "./server";
export { HydycoServer, HydycoFile, HydycoParser, HydycoPath };

const parser = new HydycoFile();
parser.checkHydyco();
