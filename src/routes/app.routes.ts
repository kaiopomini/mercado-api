import multer from 'multer';
import multerConfig from '../config/multer';

import { Router } from "express";
import { UserController } from "../controllers/app/UserController";
import { UserImageController } from "../controllers/file/UserImageController";
import { storeUserSchema, updateUserPasswordSchema, updateUserSchema } from "../inputValidations/app/User";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { validateRequest } from "../middlewares/validateRequest";

const upload = multer(multerConfig);

const router = Router();

const userController = new UserController();
const userImageController = new UserImageController();

//unauthenticated routes (create user)
router.post("/users", storeUserSchema, validateRequest, userController.store);

//authenticated routes
//user
router.put("/users", ensureAuthenticated, updateUserSchema, validateRequest, userController.update);
router.put("/users/password", ensureAuthenticated, updateUserPasswordSchema, validateRequest, userController.updatePassword);

//files
router.post("/files/images/users", ensureAuthenticated, upload.single('image'), userImageController.store);

export { router as appRoutes }