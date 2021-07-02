"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HydycoPath = exports.HydycoParser = exports.HydycoFile = exports.HydycoServer = void 0;
var utils_1 = require("./utils");
Object.defineProperty(exports, "HydycoFile", { enumerable: true, get: function () { return utils_1.HydycoFile; } });
Object.defineProperty(exports, "HydycoParser", { enumerable: true, get: function () { return utils_1.HydycoParser; } });
Object.defineProperty(exports, "HydycoPath", { enumerable: true, get: function () { return utils_1.HydycoPath; } });
var server_1 = require("./server");
Object.defineProperty(exports, "HydycoServer", { enumerable: true, get: function () { return server_1.HydycoServer; } });
var parser = new utils_1.HydycoFile();
parser.checkHydyco();
//# sourceMappingURL=index.js.map