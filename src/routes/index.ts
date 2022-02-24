import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { adminRoutes } from "./admin.routes";

import multer from 'multer';
import multerConfig from '../config/multer';
import { can, is } from "../middlewares/permissions";

const router = Router();
const upload = multer(multerConfig)


import { UserController } from "../controllers/user/UserController";
import { AuthenticateUserController } from "../controllers/auth/AuthenticateUserController";
import { ProductImageController } from "../controllers/file/ProductImageController";
import { storeUserSchema } from "../dataModels/requests/User";
import { validateRequest } from "../middlewares/validateRequest";


const userController = new UserController();
const authenticateUserController = new AuthenticateUserController();
const productImageController = new ProductImageController();

// admin route
router.use('/admin', ensureAuthenticated, adminRoutes)

// users route
router.post("/auth", authenticateUserController.store);
router.post("/users", storeUserSchema, validateRequest, userController.store);

// auth routes
router.get("/me", ensureAuthenticated, authenticateUserController.show);


// files route
router.post("/file/images", ensureAuthenticated, upload.single('image'), productImageController.store)
router.get("/file/images", ensureAuthenticated, productImageController.index)
router.get("/file/images/:filename", ensureAuthenticated, productImageController.show)
router.delete("/file/images/:filename" , ensureAuthenticated, productImageController.destroy)


export { router }