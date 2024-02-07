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
router.get("/users/:id", [validate_jwt_1.validateJWT], usuariosController_1.getUserById);
router.post("/auth/users/create", AuthUsersController_1.create);
router.post("/auth/users/login", AuthUsersController_1.login);
router.post("/auth/users/renew", [validate_jwt_1.validateJWT], AuthUsersController_1.renew);
exports.default = router;
//# sourceMappingURL=usuarios.js.map