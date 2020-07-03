"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import AppError from '../errors/AppError'
var jsonwebtoken_1 = require("jsonwebtoken");
function authentication(request, response, next) {
    var authHeader = request.headers.authorization;
    if (!authHeader) {
        return response.status(401).json({
            status: 'error',
            message: 'JWT token is missing!'
        });
    }
    var _a = authHeader.split(' '), token = _a[1];
    try {
        var decoded = jsonwebtoken_1.verify(token, process.env.APP_SECRET);
        var sub = decoded.sub;
        request.user = {
            id: sub
        };
        return next();
    }
    catch (_b) {
        return response.status(401).json({
            status: 'error',
            message: 'JWT token is invalid!'
        });
    }
}
exports.default = authentication;
