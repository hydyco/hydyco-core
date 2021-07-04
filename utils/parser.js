/**
 * Data parsing required by the project
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ParserUtils = /** @class */ (function () {
    function ParserUtils() {
    }
    /**
     * Get model name = User
     * @return {string}
     */
    ParserUtils.prototype.getModelName = function (str) {
        str = str.toLowerCase();
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    return ParserUtils;
}());
exports.default = ParserUtils;
//# sourceMappingURL=parser.js.map