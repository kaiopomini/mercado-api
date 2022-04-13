import { Router } from "express";
import { UserController } from "../controllers/app/UserController";
import { storeUserSchema, updateUserPasswordSchema, updateUserSchema } from "../inputValidations/app/User";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

const userController = new UserController();

//unauthenticated routes (create user)
router.post("/users", storeUserSchema, validateRequest, userController.store);

//authenticated routes
//user
router.put("/users", ensureAuthenticated, updateUserSchema, validateRequest, userController.update);
router.put("/users/password", ensureAuthenticated, updateUserPasswordSchema, validateRequest, userController.updatePassword);


export { router as appRoutes }