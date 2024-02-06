"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT = (id, name) => {
    return new Promise((resolve, reject) => {
        const payload = { id, name };
        jsonwebtoken_1.default.sign(payload, process.env.SECRET_JWT_SEED || "", {
            expiresIn: '24h'
        }, (error, token) => {
            if (error) {
                console.log("first");
                reject("Nose pudo cargar.");
            }
            resolve(token);
        });
    });
};
exports.generateJWT = generateJWT;
module.exports = {
    generateJWT: exports.generateJWT
};
//# sourceMappingURL=jwt.js.map