import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { adminRoutes } from "./admin.routes";

import multer from 'multer';
import multerConfig from '../config/multer';
import { can, is } from "../middlewares/permissions";

const router = Router();
const upload = multer(multerConfig);

import { AuthenticateUserController } from "../controllers/auth/AuthenticateUserController";
import { UserImageController } from "../controllers/file/UserImageController";
import { appRoutes } from "./app.routes";

const authenticateUserController = new AuthenticateUserController();
const userImageController = new UserImageController();

// admin route
router.use('/admin', ensureAuthenticated, adminRoutes)

// app route
router.use('/app', appRoutes)

// auth routes
router.post("/auth", authenticateUserController.store);
router.get("/me", ensureAuthenticated, authenticateUserController.show);

//todo
// router.get("/file/images", ensureAuthenticated, productImageController.index);
// router.get("/file/images/:filename", ensureAuthenticated, productImageController.show);
// router.delete("/file/images/:filename" , ensureAuthenticated, productImageController.destroy);

export { router }