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
exports.deleteProduct = exports.updateProduct = exports.saveProduct = exports.getProductsFilter = exports.getProductPagination = exports.getProduct = exports.getProducts = void 0;
var typeorm_1 = require("typeorm");
var enums_1 = require("../enums/enums");
var Product_1 = __importDefault(require("../models/Product"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var CreateProductService_1 = __importDefault(require("../services/CreateProductService"));
var FindProductsService_1 = __importDefault(require("../services/FindProductsService"));
var PaginationProductService_1 = __importDefault(require("../services/PaginationProductService"));
var UpdateProductService_1 = __importDefault(require("../services/UpdateProductService"));
var DeleteProductService_1 = __importDefault(require("../services/DeleteProductService"));
var CreateLoggerService_1 = __importDefault(require("../services/CreateLoggerService"));
exports.getProducts = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var productRepository, products, loggerService, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                productRepository = typeorm_1.getRepository(Product_1.default);
                return [4 /*yield*/, productRepository.find({
                        relations: ['category'],
                        order: {
                            name: 'ASC'
                        }
                    })];
            case 1:
                products = _a.sent();
                loggerService = new CreateLoggerService_1.default();
                return [4 /*yield*/, loggerService.execute({
                        user_id: request.user.id,
                        description: enums_1.LoggerDescription.SELECT_ALL,
                        table: 'products'
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, response.json(products)];
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
exports.getProduct = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, productRepository, product, loggerService, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = request.params.id;
                productRepository = typeorm_1.getRepository(Product_1.default);
                return [4 /*yield*/, productRepository.findOne(id, {
                        relations: ['category']
                    })];
            case 1:
                product = _a.sent();
                loggerService = new CreateLoggerService_1.default();
                return [4 /*yield*/, loggerService.execute({
                        user_id: request.user.id,
                        description: enums_1.LoggerDescription.SELECT_ONE,
                        table: 'products'
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, response.json(product)];
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
exports.getProductPagination = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, description, category_id, page, size, filterProduct, pageValue, sizeValue, offset, products, loggerService, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = request.query, name_1 = _a.name, description = _a.description, category_id = _a.category_id, page = _a.page, size = _a.size;
                filterProduct = new PaginationProductService_1.default();
                pageValue = page === undefined ? 0 : parseInt(page === null || page === void 0 ? void 0 : page.toString());
                sizeValue = size === undefined ? 10 : parseInt(size === null || size === void 0 ? void 0 : size.toString());
                offset = (pageValue - 1) * sizeValue;
                return [4 /*yield*/, filterProduct.execute({
                        name: name_1 === null || name_1 === void 0 ? void 0 : name_1.toString(),
                        category_id: category_id === null || category_id === void 0 ? void 0 : category_id.toString(),
                        description: description === null || description === void 0 ? void 0 : description.toString(),
                        page: offset,
                        size: sizeValue
                    })];
            case 1:
                products = _b.sent();
                loggerService = new CreateLoggerService_1.default();
                return [4 /*yield*/, loggerService.execute({
                        user_id: request.user.id,
                        description: enums_1.LoggerDescription.SELECT_PAGINATION,
                        table: 'products'
                    })];
            case 2:
                _b.sent();
                return [2 /*return*/, response.json(products)];
            case 3:
                err_3 = _b.sent();
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
exports.getProductsFilter = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_2, description, category_id, filterProduct, products, loggerService, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = request.query, name_2 = _a.name, description = _a.description, category_id = _a.category_id;
                filterProduct = new FindProductsService_1.default();
                return [4 /*yield*/, filterProduct.execute({
                        name: name_2 === null || name_2 === void 0 ? void 0 : name_2.toString(),
                        category_id: category_id === null || category_id === void 0 ? void 0 : category_id.toString(),
                        description: description === null || description === void 0 ? void 0 : description.toString()
                    })];
            case 1:
                products = _b.sent();
                loggerService = new CreateLoggerService_1.default();
                return [4 /*yield*/, loggerService.execute({
                        user_id: request.user.id,
                        description: enums_1.LoggerDescription.SELECT_FILTERS,
                        table: 'products'
                    })];
            case 2:
                _b.sent();
                return [2 /*return*/, response.json(products)];
            case 3:
                err_4 = _b.sent();
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
exports.saveProduct = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_3, description, category_id, price, stock, createProduct, product, loggerService, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = request.body, name_3 = _a.name, description = _a.description, category_id = _a.category_id, price = _a.price, stock = _a.stock;
                createProduct = new CreateProductService_1.default();
                return [4 /*yield*/, createProduct.execute({
                        name: name_3,
                        description: description,
                        category_id: category_id,
                        price: price,
                        stock: stock
                    })];
            case 1:
                product = _b.sent();
                loggerService = new CreateLoggerService_1.default();
                return [4 /*yield*/, loggerService.execute({
                        user_id: request.user.id,
                        description: enums_1.LoggerDescription.INSERT,
                        table: 'products'
                    })];
            case 2:
                _b.sent();
                return [2 /*return*/, response.json(product)];
            case 3:
                err_5 = _b.sent();
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
exports.updateProduct = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name_4, description, category_id, price, stock, updateProduct_1, product, loggerService, err_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                id = request.params.id;
                _a = request.body, name_4 = _a.name, description = _a.description, category_id = _a.category_id, price = _a.price, stock = _a.stock;
                updateProduct_1 = new UpdateProductService_1.default();
                return [4 /*yield*/, updateProduct_1.execute({
                        id: id,
                        name: name_4,
                        description: description,
                        category_id: category_id,
                        price: price,
                        stock: stock
                    })];
            case 1:
                product = _b.sent();
                loggerService = new CreateLoggerService_1.default();
                return [4 /*yield*/, loggerService.execute({
                        user_id: request.user.id,
                        description: enums_1.LoggerDescription.UPDATE,
                        table: 'products'
                    })];
            case 2:
                _b.sent();
                return [2 /*return*/, response.json(product)];
            case 3:
                err_6 = _b.sent();
                if (err_6 instanceof AppError_1.default) {
                    return [2 /*return*/, response.status(err_6.statuesCode).json({
                            status: 'error',
                            message: err_6.message
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
exports.deleteProduct = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deleteProduct_1, loggerService, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = request.params.id;
                deleteProduct_1 = new DeleteProductService_1.default();
                return [4 /*yield*/, deleteProduct_1.execute(id)];
            case 1:
                _a.sent();
                loggerService = new CreateLoggerService_1.default();
                return [4 /*yield*/, loggerService.execute({
                        user_id: request.user.id,
                        description: enums_1.LoggerDescription.DELETE,
                        table: 'products'
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, response.status(204).send()];
            case 3:
                err_7 = _a.sent();
                if (err_7 instanceof AppError_1.default) {
                    return [2 /*return*/, response.status(err_7.statuesCode).json({
                            status: 'error',
                            message: err_7.message
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
