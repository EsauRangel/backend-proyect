"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = require("../controllers/categoryController");
const categoryRouter = (0, express_1.Router)();
categoryRouter.get("/category", categoryController_1.getCategories);
categoryRouter.post("/category", categoryController_1.saveCategory);
exports.default = categoryRouter;
//# sourceMappingURL=category.js.map