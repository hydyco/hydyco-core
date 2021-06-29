"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.HydycoServer = void 0;
var app_1 = require("@tinyhttp/app");
var HydycoServer = /** @class */ (function (_super) {
    __extends(HydycoServer, _super);
    function HydycoServer() {
        return _super.call(this) || this;
    }
    HydycoServer.prototype.start = function () {
        this.listen(3001, function () {
            console.log("Server started at 3001");
        });
    };
    return HydycoServer;
}(app_1.App));
exports.HydycoServer = HydycoServer;
//# sourceMappingURL=server.js.map