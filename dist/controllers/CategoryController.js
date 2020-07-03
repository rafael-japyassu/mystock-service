"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.saveCategory = exports.getCategory = exports.getCategories = void 0;
var typeorm_1 = require("typeorm");
var Category_1 = __importDefault(require("../models/Category"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var CreateLoggerService_1 = __importDefault(require("../services/CreateLoggerService"));
var enums_1 = require("../enums/enums");
exports.getCategories = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, categoryRepository, loggerService, categories, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = request.user.id;
                categoryRepository = typeorm_1.getRepository(Category_1.default);
                loggerService = new CreateLoggerService_1.default();
                return [4 /*yield*/, categoryRepository.find()];
            case 1:
                categories = _a.sent();
                return [4 /*yield*/, loggerService.execute({
                        user_id: id,
                        description: enums_1.LoggerDescription.SELECT_ALL,
                        table: 'categories'
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, response.json(categories)];
            case 3:
                err_1 = _a.sent();
                if (err_1 instanceof AppError_1.default) {
                    return [2 /*return*/, response.status(err_1.statuesCode).json({
                            status: 'error',
                            message: err_1.message
                        })];
                }
                return [2 /*return*/, response.status(500).json({
                        status: 'error',
                        message: 'Internal server error'
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getCategory = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, categoryRepository, category, loggerService, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = request.params.id;
                categoryRepository = typeorm_1.getRepository(Category_1.default);
                return [4 /*yield*/, categoryRepository.findOne(id)];
            case 1:
                category = _a.sent();
                loggerService = new CreateLoggerService_1.default();
                return [4 /*yield*/, loggerService.execute({
                        user_id: request.user.id,
                        description: enums_1.LoggerDescription.SELECT_ONE,
                        table: 'categories'
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, response.json(category)];
            case 3:
                err_2 = _a.sent();
                if (err_2 instanceof AppError_1.default) {
                    return [2 /*return*/, response.status(err_2.statuesCode).json({
                            status: 'error',
                            message: err_2.message
                        })];
                }
                return [2 /*return*/, response.status(500).json({
                        status: 'error',
                        message: 'Internal server error'
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.saveCategory = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var name_1, id, loggerService, categoryRepository, category, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                name_1 = request.body.name;
                id = request.user.id;
                loggerService = new CreateLoggerService_1.default();
                categoryRepository = typeorm_1.getRepository(Category_1.default);
                category = categoryRepository.create({
                    name: name_1
                });
                return [4 /*yield*/, categoryRepository.save(category)];
            case 1:
                _a.sent();
                return [4 /*yield*/, loggerService.execute({
                        user_id: id,
                        description: enums_1.LoggerDescription.INSERT,
                        table: 'categories'
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, response.json(category)];
            case 3:
                err_3 = _a.sent();
                console.log(err_3);
                if (err_3 instanceof AppError_1.default) {
                    return [2 /*return*/, response.status(err_3.statuesCode).json({
                            status: 'error',
                            message: err_3.message
                        })];
                }
                return [2 /*return*/, response.status(500).json({
                        status: 'error',
                        message: 'Internal server error'
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateCategory = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, name_2, categoryRepository, category, loggerService, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = request.params.id;
                name_2 = request.body.name;
                categoryRepository = typeorm_1.getRepository(Category_1.default);
                category = categoryRepository.create({
                    name: name_2
                });
                return [4 /*yield*/, categoryRepository.update(id, category)];
            case 1:
                _a.sent();
                loggerService = new CreateLoggerService_1.default();
                return [4 /*yield*/, loggerService.execute({
                        user_id: request.user.id,
                        description: enums_1.LoggerDescription.UPDATE,
                        table: 'categories'
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, response.json(category)];
            case 3:
                err_4 = _a.sent();
                if (err_4 instanceof AppError_1.default) {
                    return [2 /*return*/, response.status(err_4.statuesCode).json({
                            status: 'error',
                            message: err_4.message
                        })];
                }
                return [2 /*return*/, response.status(500).json({
                        status: 'error',
                        message: 'Internal server error'
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteCategory = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, categoryRepository, loggerService, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = request.params.id;
                categoryRepository = typeorm_1.getRepository(Category_1.default);
                return [4 /*yield*/, categoryRepository.delete(id)];
            case 1:
                _a.sent();
                loggerService = new CreateLoggerService_1.default();
                return [4 /*yield*/, loggerService.execute({
                        user_id: request.user.id,
                        description: enums_1.LoggerDescription.DELETE,
                        table: 'categories'
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, response.status(204).send()];
            case 3:
                err_5 = _a.sent();
                if (err_5 instanceof AppError_1.default) {
                    return [2 /*return*/, response.status(err_5.statuesCode).json({
                            status: 'error',
                            message: err_5.message
                        })];
                }
                return [2 /*return*/, response.status(500).json({
                        status: 'error',
                        message: 'Internal server error'
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
