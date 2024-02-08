"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = require("../controllers/categoryController");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const categoryRouter = (0, express_1.Router)();
categoryRouter.get("/category", [validate_jwt_1.validateJWT], categoryController_1.getCategories);
categoryRouter.post("/category", [validate_jwt_1.validateJWT], categoryController_1.saveCategory);
exports.default = categoryRouter;
//# sourceMappingURL=category.js.map