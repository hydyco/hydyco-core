"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HydycoServer = void 0;
var express = require("express");
var morgan = require("morgan");
var HydycoAdmin = require("@hydyco/admin-plugin").HydycoAdmin;
var HydycoServer = /** @class */ (function () {
    function HydycoServer(serverConfig) {
        if (serverConfig === void 0) { serverConfig = {
            port: 3000,
            logger: true,
        }; }
        this.serverConfig = serverConfig;
        /**
         * Init express server
         */
        this._hydycoServer = express();
        /**
         * Check if server is running or not
         */
        this._isServerStarted = false;
        /**
         * check if database is configured or not
         */
        this._dbAdded = false;
        this._middleware = [];
        this._routes = [];
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
    HydycoServer.prototype.registerDatabase = function (database) {
        this._dbAdded = true;
        this._db = database;
    };
    /**
     * Register middleware
     * middleware are instance of express app
     * @param {App} - Instance of express app or express app or even node http server
     */
    HydycoServer.prototype.registerMiddleware = function (middleware) {
        if (this._isServerStarted)
            throw new Error("Server is running, cannot register plugin after server is started");
        this._middleware = middleware;
    };
    /**
     * Register routes
     * @param {HydycoModel} - Type of HydycoModel
     */
    HydycoServer.prototype.registerRoutes = function (routes) {
        if (this._isServerStarted)
            throw new Error("Server is running, cannot register routes after server is started");
        this._routes = routes;
    };
    /**
     * Start Hydyco Server
     */
    HydycoServer.prototype.start = function () {
        var _this = this;
        if (!this._dbAdded)
            throw new Error("You need to register database before starting server");
        this._hydycoServer.use("/admin", this._db);
        this._hydycoServer.use(HydycoAdmin);
        this._middleware.forEach(function (plugin) { return _this._hydycoServer.use(plugin); });
        this._routes.forEach(function (route) { return _this._hydycoServer.use(route); });
        this._hydycoServer.listen(this.serverConfig.port, function () {
            _this._isServerStarted = true;
            console.log("Server started at http://localhost:" + _this.serverConfig.port);
        });
    };
    return HydycoServer;
}());
exports.HydycoServer = HydycoServer;
//# sourceMappingURL=index.js.map