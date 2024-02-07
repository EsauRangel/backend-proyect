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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renew = exports.login = exports.create = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
const jwt_1 = require("../../../helpers/jwt");
const prisma = new client_1.PrismaClient();
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const salt = bcryptjs_1.default.genSaltSync();
        const hashPassword = bcryptjs_1.default.hashSync(password, salt);
        const token = yield (0, jwt_1.generateJWT)(user.id, user.name);
        user = yield prisma.user.update({
            where: {
                id: user.id
            },
            data: { password: hashPassword }
        });
        return res.json({
            success: true,
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
exports.create = create;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield prisma.user.findFirst({ where: { email: email } });
        if (!user) {
            return res.status(400).json({
                success: false,
                msg: "Usuario no existe."
            });
        }
        const encryptPassword = bcryptjs_1.default.compareSync(password, user.password);
        if (!encryptPassword) {
            return res.status(400).json({
                success: false,
                msg: "Correo y/o contrasena incorrectos."
            });
        }
        const token = yield (0, jwt_1.generateJWT)(user.id, user.name);
        return res.json({
            success: true,
            user,
            token,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            msg: error
        });
    }
});
exports.login = login;
const renew = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.id;
    const name = req.name;
    let token;
    if (id && name) {
        token = yield (0, jwt_1.generateJWT)(id, name);
    }
    return res.json({
        success: true,
        token
    });
});
exports.renew = renew;
//# sourceMappingURL=AuthUsersController.js.map