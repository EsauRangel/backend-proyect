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
exports.login = void 0;
const express_1 = require("express");
const bcrypt = require("bcryptjs");
const client_1 = require("@prisma/client");
const jwt_1 = require("../../../helpers/jwt");
const prisma = new client_1.PrismaClient();
const login = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let user = yield prisma.user.findFirst({ where: { email: email } });
        if (user) {
            return res.status(400).json({
                error: {
                    msg: "Usuario ya existe."
                }
            });
        }
        user = yield prisma.user.create({ data: req.body });
        //encriptar cpassword
        const salt = bcrypt.genSaltSync();
        const hashPassword = bcrypt.hashSync(password, salt);
        const token = yield (0, jwt_1.generateJWT)(user.id, user.name);
        user = yield prisma.user.update({
            where: {
                id: user.id
            },
            data: { password: hashPassword }
        });
        return res.json({
            user,
            token
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: error
        });
    }
});
exports.login = login;
//# sourceMappingURL=AuthUsersController.js.map