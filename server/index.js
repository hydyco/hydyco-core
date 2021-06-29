"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HydycoServer = void 0;
/**
 * Server for hydyco
 * Powered by tinyhttp https://tinyhttp.v1rtl.site/
 */
var app_1 = require("@tinyhttp/app");
var logger_1 = require("@tinyhttp/logger");
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
        if (this.serverConfig.logger)
            this._hydycoServer.use(logger_1.logger());
    }
    /**
     * Register plugins
     * Plugins are instance of tinyhttp app , you are allowed to use express app as well
     * @param {App} - Instance of tinyhttp app or express app or even node http server
     */
    HydycoServer.prototype.registerPlugins = function (plugins) {
        var _this = this;
        if (this._isServerStarted)
            throw new Error("Server is running, cannot register plugin after server is started");
        plugins.forEach(function (plugin) { return _this._hydycoServer.use(plugin); });
    };
    /**
     * Start Hydyco Server
     */
    HydycoServer.prototype.start = function () {
        var _this = this;
        this._hydycoServer.listen(this.serverConfig.port, function () {
            _this._isServerStarted = true;
            console.log("Server started");
        });
    };
    return HydycoServer;
}());
exports.HydycoServer = HydycoServer;
//# sourceMappingURL=index.js.map