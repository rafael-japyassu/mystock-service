"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AppError_1 = __importDefault(require("../errors/AppError"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errors(err, request, response, _) {
    if (err instanceof AppError_1.default) {
        return response.status(err.statuesCode).json({
            status: 'error',
            message: err.message
        });
    }
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
}
exports.default = errors;
