import { Router } from "express";
import { getUsers, getUserById } from "../controllers/users/usuariosController";
import { create, login, renew } from "../controllers/users/Auth/AuthUsersController";
import { validateJWT } from "../middlewares/validate-jwt"
const router: Router = Router();

router.get("/users", [
    validateJWT
], getUsers);


router.get("/users/:id", [validateJWT], getUserById);

router.post("/auth/users/create", create);
router.post("/auth/users/login", login);
router.post("/auth/users/renew", [validateJWT], renew);


export default router;

