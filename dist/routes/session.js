"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var SessionController_1 = require("../controllers/SessionController");
var sessionRoutes = express_1.Router();
sessionRoutes.post('/', SessionController_1.login);
exports.default = sessionRoutes;
