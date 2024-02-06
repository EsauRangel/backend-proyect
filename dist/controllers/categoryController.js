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
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveCategory = exports.getCategories = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const prisma = new client_1.PrismaClient();
const getCategories = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield prisma.category.findMany();
    return res.json({
        success: "ok",
        categories
    });
});
exports.getCategories = getCategories;
const saveCategory = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield prisma.category.create({ data: req.body });
    return res.status(201).json({
        success: "ok",
        category
    });
});
exports.saveCategory = saveCategory;
//# sourceMappingURL=categoryController.js.map