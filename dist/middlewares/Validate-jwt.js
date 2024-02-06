"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateJWT = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            success: false,
            msg: "Unauthorized."
        });
    }
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.SECRET_JWT_SEED || "");
        req.id = user.id;
        req.name = user.name;
        next();
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Token no valido."
        });
    }
};
exports.validateJWT = validateJWT;
//# sourceMappingURL=validate-jwt.js.map