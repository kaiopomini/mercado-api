import { Router } from "express";
import { AccessControlListController } from "./controllers/admin/AccessControlListController";
import { CostumerController } from "./controllers/admin/CostumerController";
import { PermissionController } from "./controllers/admin/PermissionController";
import { ProductController } from "./controllers/admin/ProductController";
import { ProductImageController } from "./controllers/file/ProductImageController";
import { RoleController } from "./controllers/admin/RoleController";
import { RolePermissionController } from "./controllers/admin/RolePermissionController";
import { AuthenticateUserController } from "./controllers/auth/AuthenticateUserController";
import { UserController } from "./controllers/user/UserController";
import { storeCostumerSchema, updateCostumerSchema } from "./dataModels/requests/Costumer";
import { storeProductSchema } from "./dataModels/requests/Product";
import { storeUserSchema } from "./dataModels/requests/User";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { validateRequest } from "./middlewares/validateRequest";
import multer from 'multer';
import multerConfig from './config/multer';
import { is } from "./middlewares/permissions";

const upload = multer(multerConfig)
const router = Router();

const userController = new UserController();
const authenticateUserController = new AuthenticateUserController();
const roleController = new RoleController();
const permissionController = new PermissionController();
const rolePermissionController = new RolePermissionController();
const accessControlListController = new AccessControlListController();
const productController = new ProductController();
const costumerController = new CostumerController();
const productImageController = new ProductImageController();

// users route
router.post("/auth", authenticateUserController.store);
router.post("/users", storeUserSchema, validateRequest, userController.store);

// auth routes
router.get("/me", ensureAuthenticated, authenticateUserController.show);

//admin routes
router.post("/admin/roles", ensureAuthenticated, roleController.store);
router.post("/admin/permissions", ensureAuthenticated, permissionController.store);
router.post("/admin/acl", ensureAuthenticated, accessControlListController.store);
router.post("/admin/roles-permissions", ensureAuthenticated, rolePermissionController.store);

router.post("/admin/products", ensureAuthenticated, storeProductSchema, validateRequest, productController.store);
router.get("/admin/products", ensureAuthenticated, productController.index);
router.get("/admin/products/:id", ensureAuthenticated, productController.show);
router.put("/admin/products/:id", ensureAuthenticated, storeProductSchema, validateRequest, productController.update);
router.delete("/admin/products/:id", ensureAuthenticated, productController.destroy);

router.post("/admin/costumers", ensureAuthenticated, storeCostumerSchema, validateRequest, costumerController.store);
router.get("/admin/costumers", ensureAuthenticated, costumerController.index);
router.get("/admin/costumers/:id", ensureAuthenticated, costumerController.show);
router.put("/admin/costumers/:id", ensureAuthenticated, updateCostumerSchema, validateRequest, costumerController.update);
router.delete("/admin/costumers/:id", ensureAuthenticated, costumerController.destroy);

// images route
router.post("/file/images", ensureAuthenticated, upload.single('image'), productImageController.store)
router.get("/file/images", ensureAuthenticated, productImageController.index)
router.get("/file/images/:filename", ensureAuthenticated, productImageController.show)
router.delete("/file/images/:filename" , ensureAuthenticated, productImageController.destroy)

export { router }