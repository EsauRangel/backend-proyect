import { Router } from "express";
import { saveCategory, getCategories } from "../controllers/categoryController";
import { validateJWT } from "../middlewares/validate-jwt";


const categoryRouter:Router = Router();

categoryRouter.get("/category", [validateJWT], getCategories);
categoryRouter.post("/category", [validateJWT], saveCategory);


export default categoryRouter;

