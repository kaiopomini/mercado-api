import { Router } from "express";
import { AuthenticateUserController } from "./controllers/auth/AuthenticateUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { storeUserSchema } from "./dataModels/requests/User";
import { validateRequest } from "./middlewares/validateRequest";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

// users route
router.post("/users", storeUserSchema, validateRequest, createUserController.handle);

// auth routes
router.post("/auth", authenticateUserController.handle);

export { router }