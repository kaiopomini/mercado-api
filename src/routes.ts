import { Router } from "express";
import { AccessControlListController } from "./controllers/admin/AccessControlListController";
import { PermissionController } from "./controllers/admin/PermissionController";
import { RoleController } from "./controllers/admin/RoleController";
import { RolePermissionController } from "./controllers/admin/RolePermissionController";
import { AuthenticateUserController } from "./controllers/auth/AuthenticateUserController";
import { UserController } from "./controllers/user/UserController";
import { storeUserSchema } from "./dataModels/requests/User";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { validateRequest } from "./middlewares/validateRequest";

const router = Router();

const userController = new UserController();
const authenticateUserController = new AuthenticateUserController();
const roleController = new RoleController();
const permissionController = new PermissionController();
const rolePermissionController = new RolePermissionController();
const accessControlListController = new AccessControlListController();

// users route
router.post("/users", storeUserSchema, validateRequest, userController.store);

// auth routes
router.post("/auth", authenticateUserController.store);

//admin routes
router.post("/admin/roles", ensureAuthenticated, roleController.store);
router.post("/admin/permissions", ensureAuthenticated, permissionController.store);
router.post("/admin/acl", ensureAuthenticated, accessControlListController.store);
router.post("/admin/roles-permissions", ensureAuthenticated, rolePermissionController.store);

export { router }