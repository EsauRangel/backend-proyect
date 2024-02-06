import { Router } from "express";
import { saveCategory, getCategories } from "../controllers/categoryController";


const categoryRouter:Router = Router();

categoryRouter.get("/category", getCategories);
categoryRouter.post("/category", saveCategory);


export default categoryRouter;

