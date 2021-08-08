"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HydycoServer = void 0;
var express = require("express");
var morgan = require("morgan");
var boxen = require("boxen");
var docs_plugin_1 = require("@hydyco/docs-plugin");
var file_plugin_1 = require("@hydyco/file-plugin");
var auth_1 = require("@hydyco/auth");
var HydycoAdmin = require("@hydyco/admin-plugin").HydycoAdmin;
var welcome_1 = require("./extra/welcome");
var HydycoServer = /** @class */ (function () {
    function HydycoServer(serverConfig) {
        if (serverConfig === void 0) { serverConfig = {
            port: 3000,
            logger: true,
            auth: {
                secretOrKey: "yourKey",
            },
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
        this._plugins = [file_plugin_1.default(), docs_plugin_1.default()];
        this._routes = [];
        this._hydycoServer.use(express.json()); // parse body json
        if (this.serverConfig.logger) {
            this._hydycoServer.use(morgan("combined"));
        }
        this._middleware.push(auth_1.useAuth({ secretOrKey: this.serverConfig.auth.secretOrKey }));
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
     * Register plugins
     * plugins are instance of express app
     * @param {App} - Instance of express app or express app or even node http server
     */
    HydycoServer.prototype.registerPlugins = function (plugins) {
        if (this._isServerStarted)
            throw new Error("Server is running, cannot register plugin after server is started");
        this._plugins = __spreadArray(__spreadArray([], this._plugins), plugins);
    };
    /**
     * Register middleware
     * middleware are instance of express app
     * @param {App} - Instance of express app or express app or even node http server
     */
    HydycoServer.prototype.registerMiddleware = function (middleware) {
        if (this._isServerStarted)
            throw new Error("Server is running, cannot register middleware after server is started");
        this._middleware = __spreadArray(__spreadArray([], this._middleware), middleware);
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
        this._plugins.forEach(function (plugin) { return _this._hydycoServer.use("/admin", plugin); });
        this._middleware.forEach(function (middleware) {
            return _this._hydycoServer.use(middleware);
        });
        this._routes.forEach(function (route) { return _this._hydycoServer.use(route); });
        this._hydycoServer.use(welcome_1.default);
        this._hydycoServer.listen(this.serverConfig.port, function () {
            _this._isServerStarted = true;
            console.log(boxen("Server started at http://localhost:" + _this.serverConfig.port, {
                padding: 1,
                margin: 1,
                borderStyle: "double",
                borderColor: "yellow",
            }));
            console.log(boxen("Admin ui at http://localhost:" +
                _this.serverConfig.port +
                "/admin-ui", { padding: 1, margin: 1, borderStyle: "double", borderColor: "green" }));
        });
    };
    return HydycoServer;
}());
exports.HydycoServer = HydycoServer;
//# sourceMappingURL=index.js.map