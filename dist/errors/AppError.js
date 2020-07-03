"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Error = /** @class */ (function () {
    function Error(message, statuesCode) {
        if (statuesCode === void 0) { statuesCode = 400; }
        this.message = message;
        this.statuesCode = statuesCode;
    }
    return Error;
}());
exports.default = Error;
