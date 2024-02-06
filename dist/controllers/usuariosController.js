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
exports.saveUsers = exports.getUsers = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const prisma = new client_1.PrismaClient();
const getUsers = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { per_page = '5', page = '1', q = '' } = req.query;
        //Pagination
        const take = parseInt(per_page, 10);
        const pageNumber = parseInt(page, 10);
        const skip = (take * pageNumber - take);
        let users = null;
        users = yield prisma.user.findMany({
            skip, take,
            where: {
                OR: [
                    {
                        name: {
                            contains: q,
                        },
                        email: {
                            contains: q,
                        },
                    }
                ]
            },
        });
        if (users) {
            return res.json({
                success: "ok",
                users
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Courrio un error." + error
        });
    }
});
exports.getUsers = getUsers;
const saveUsers = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const user = yield prisma.user.create({ data: req.body });
        return res.json({
            success: "ok",
            user
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.saveUsers = saveUsers;
//# sourceMappingURL=usuariosController.js.map