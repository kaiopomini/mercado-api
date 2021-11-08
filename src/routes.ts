import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";

const router = Router();

const createUserController = new CreateUserController();

// users route
router.post("/users", createUserController.handle)

export { router }