import { Router } from "express";
import { AuthenticateUserController } from "./controllers/auth/AuthenticateUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

// users route
router.post("/users", createUserController.handle)

// auth routes
router.post("/auth", authenticateUserController.handle)

export { router }