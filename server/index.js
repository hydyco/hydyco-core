"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HydycoServer = void 0;
/**
 * Server for hydyco
 * Powered by tinyhttp https://tinyhttp.v1rtl.site/
 */
var app_1 = require("@tinyhttp/app");
var logger_1 = require("@tinyhttp/logger");
var admin_plugin_1 = require("@hydyco/admin-plugin");
var bodyParser = function (request, response, next) {
    var body = "";
    request.on("data", function (chuck) {
        body += chuck;
    });
    request.on("end", function () {
        body = body.length > 0 ? JSON.parse(body) : undefined;
        request.body = body;
        next();
    });
};
var HydycoServer = /** @class */ (function () {
    function HydycoServer(serverConfig) {
        if (serverConfig === void 0) { serverConfig = {
            port: 3000,
            logger: true,
        }; }
        this.serverConfig = serverConfig;
        /**
         * Init tinyhttp server
         */
        this._hydycoServer = new app_1.App({
            applyExtensions: function (req, res, next) {
                bodyParser(req, res, next);
            },
            noMatchHandler: function (req, res) {
                return res.status(404).end("Not found :(");
            },
            onError: function (err, req, res) {
                res.status(500).send({
                    status: false,
                    message: err.message,
                });
            },
        });
        /**
         * Check if server is running or not
         */
        this._isServerStarted = false;
        /**
         * check if database is configured or not
         */
        this._dbAdded = false;
        this._plugins = [];
        this._hydycoServer.use(admin_plugin_1.HydycoAdmin); // register admin ui
        if (this.serverConfig.logger)
            this._hydycoServer.use(logger_1.logger());
    }
    /**
     * Register database
     * Database are instance of tinyhttp app , you are allowed to use express app as well
     * @param {App} - Instance of tinyhttp app or express app or even node http server
     */
    HydycoServer.prototype.registerDatabase = function (database) {
        this._dbAdded = false;
        this._db = database;
    };
    /**
     * Register plugins
     * Plugins are instance of tinyhttp app , you are allowed to use express app as well
     * @param {App} - Instance of tinyhttp app or express app or even node http server
     */
    HydycoServer.prototype.registerPlugins = function (plugins) {
        if (this._isServerStarted)
            throw new Error("Server is running, cannot register plugin after server is started");
        this._plugins = plugins;
    };
    /**
     * Start Hydyco Server
     */
    HydycoServer.prototype.start = function () {
        var _this = this;
        if (!this._dbAdded)
            throw new Error("You need to register database before starting server");
        this._hydycoServer.use(this._db);
        this._plugins.forEach(function (plugin) { return _this._hydycoServer.use(plugin); });
        this._hydycoServer.listen(this.serverConfig.port, function () {
            _this._isServerStarted = true;
            console.log("Server started");
        });
    };
    return HydycoServer;
}());
exports.HydycoServer = HydycoServer;
//# sourceMappingURL=index.js.map