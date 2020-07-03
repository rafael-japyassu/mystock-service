"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = require("../controllers/UserController");
var usersRoutes = express_1.Router();
usersRoutes.get('/', UserController_1.getUsers);
usersRoutes.post('/', UserController_1.saveUser);
exports.default = usersRoutes;
