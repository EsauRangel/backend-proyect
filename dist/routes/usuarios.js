"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosController_1 = require("../controllers/users/usuariosController");
const AuthUsersController_1 = require("../controllers/users/Auth/AuthUsersController");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const router = (0, express_1.Router)();
router.get("/users", [
    validate_jwt_1.validateJWT
], usuariosController_1.getUsers);
router.post("/users", usuariosController_1.saveUsers);
router.post("/auth/users", AuthUsersController_1.login);
exports.default = router;
//# sourceMappingURL=usuarios.js.map