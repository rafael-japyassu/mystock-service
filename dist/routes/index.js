"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_1 = __importDefault(require("./users"));
var session_1 = __importDefault(require("./session"));
var categories_1 = __importDefault(require("./categories"));
var products_1 = __importDefault(require("./products"));
var authentication_1 = __importDefault(require("../middlewares/authentication"));
var routes = express_1.Router();
routes.get('/', function (request, response) {
    return response.json({ message: 'Hello Challenge Adopets' });
});
routes.use('/api/v1/session', session_1.default);
routes.use('/api/v1/users', users_1.default);
routes.use(authentication_1.default);
routes.use('/api/v1/categories', categories_1.default);
routes.use('/api/v1/products', products_1.default);
exports.default = routes;
