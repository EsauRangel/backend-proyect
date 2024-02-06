import { Router } from "express";
import { getUsers, saveUsers } from "../controllers/users/usuariosController";
import { login } from "../controllers/users/Auth/AuthUsersController";
import { validateJWT } from "../middlewares/validate-jwt"
const router: Router = Router();

router.get("/users", [
    validateJWT
], getUsers);
router.post("/users", saveUsers);

router.post("/auth/users", login);


export default router;

