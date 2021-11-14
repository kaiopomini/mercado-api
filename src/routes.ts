import { Router } from "express";
import { AccessControlListController } from "./controllers/admin/AccessControlListController";
import { PermissionController } from "./controllers/admin/PermissionController";
import { ProductController } from "./controllers/admin/ProductController";
import { RoleController } from "./controllers/admin/RoleController";
import { RolePermissionController } from "./controllers/admin/RolePermissionController";
import { AuthenticateUserController } from "./controllers/auth/AuthenticateUserController";
import { UserController } from "./controllers/user/UserController";
import { storeProductSchema } from "./dataModels/requests/Product";
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
const productController = new ProductController();

// users route
router.post("/users", storeUserSchema, validateRequest, userController.store);

// auth routes
router.post("/auth", authenticateUserController.store);

//admin routes
router.post("/admin/roles", ensureAuthenticated, roleController.store);
router.post("/admin/permissions", ensureAuthenticated, permissionController.store);
router.post("/admin/acl", ensureAuthenticated, accessControlListController.store);
router.post("/admin/roles-permissions", ensureAuthenticated, rolePermissionController.store);

router.post("/admin/products", ensureAuthenticated, storeProductSchema, validateRequest, productController.store);
router.get("/admin/products", ensureAuthenticated, productController.index);
router.get("/admin/products/:id", ensureAuthenticated, productController.show);
// router.put("/admin/products", ensureAuthenticated, storeProductSchema, validateRequest, productController.update);
// router.delete("/admin/products", ensureAuthenticated, productController.destroy);

export { router }